/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useRef, useState } from "react";
import { Canvas, extend, useFrame } from "@react-three/fiber";
import { useGLTF, useTexture, Environment, Lightformer } from "@react-three/drei";
import {
  BallCollider,
  CuboidCollider,
  Physics,
  RigidBody,
  useRopeJoint,
  useSphericalJoint,
  RigidBodyProps,
  RapierRigidBody,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import * as THREE from "three";
import { other } from "@/lib/illustrations";

// Paths to your public assets
const CARD_GLB_PATH = "/assets/lanyard/card2.glb";
const LANYARD_PNG_PATH = other.lanyard;

extend({ MeshLineGeometry, MeshLineMaterial });

interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  // Called every frame (while mounted) with the current extra stretch beyond the initial rest length (>= 0)
  onStretchChange?: (extension: number) => void;
  // Called when the user starts dragging the card
  onDragStart?: () => void;
  // Called when the user ends dragging the card
  onDragEnd?: () => void;
}

export default function Lanyard({
  position = [0, 0, 30],
  gravity = [0, -40, 0],
  fov = 20,
  transparent = true,
  onStretchChange,
  onDragStart,
  onDragEnd,
}: LanyardProps) {
  return (
    <div className="relative z-0 w-full h-screen flex justify-center items-center transform scale-100 origin-center">
      <Canvas
        camera={{ position, fov }}
        gl={{ alpha: transparent }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={Math.PI} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band onStretchChange={onStretchChange} onDragStart={onDragStart} onDragEnd={onDragEnd} />
        </Physics>
        <Environment blur={0.75}>
          <Lightformer
            intensity={2}
            color="white"
            position={[0, -1, 5]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[-1, -1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={3}
            color="white"
            position={[1, 1, 1]}
            rotation={[0, 0, Math.PI / 3]}
            scale={[100, 0.1, 1]}
          />
          <Lightformer
            intensity={10}
            color="white"
            position={[-10, 0, 14]}
            rotation={[0, Math.PI / 2, Math.PI / 3]}
            scale={[100, 10, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
}

interface BandProps {
  maxSpeed?: number;
  minSpeed?: number;
  onStretchChange?: (extension: number) => void;
  onDragStart?: () => void;
  onDragEnd?: () => void;
}

function Band({ maxSpeed = 50, minSpeed = 10, onStretchChange, onDragStart, onDragEnd }: BandProps) {
  const band = useRef<THREE.Mesh | null>(null);
  const fixed = useRef<RapierRigidBody | null>(null);
  const j1 = useRef<RapierRigidBody | null>(null);
  const j2 = useRef<RapierRigidBody | null>(null);
  const j3 = useRef<RapierRigidBody | null>(null);
  const card = useRef<RapierRigidBody | null>(null);
  const baseLenRef = useRef<number | null>(null);

  const vec = new THREE.Vector3();
  const ang = new THREE.Vector3();
  const rot = new THREE.Vector3();
  const dir = new THREE.Vector3();

  const segmentProps: Partial<Record<string, unknown>> = {
    type: "dynamic" as RigidBodyProps["type"],
    canSleep: true,
    colliders: false,
    angularDamping: 4,
    linearDamping: 4,
  };

  const { nodes, materials } = useGLTF(CARD_GLB_PATH) as any;
  const texture = useTexture(LANYARD_PNG_PATH) as THREE.Texture;
  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
        new THREE.Vector3(),
      ])
  );
  const [dragged, drag] = useState<false | THREE.Vector3>(false);
  const [hovered, hover] = useState(false);

  const [isSmall, setIsSmall] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 1024;
    }
    return false;
  });

  // Detect touch support so we can disable touch interactions on mobile
  const [isTouch, setIsTouch] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return (
        typeof (window as any).ontouchstart !== "undefined" ||
        (navigator.maxTouchPoints ?? 0) > 0 ||
        ((navigator as any).msMaxTouchPoints ?? 0) > 0
      );
    }
    return false;
  });

  useEffect(() => {
    const handleResize = (): void => {
      setIsSmall(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return (): void => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Update touch detection on mount (and in case browser capabilities change)
    if (typeof window !== "undefined") {
      setIsTouch(
        typeof (window as any).ontouchstart !== "undefined" ||
          (navigator.maxTouchPoints ?? 0) > 0 ||
          ((navigator as any).msMaxTouchPoints ?? 0) > 0
      );
    }
  }, []);

  // Joints setup
  useRopeJoint(
    fixed as unknown as React.RefObject<any>,
    j1 as unknown as React.RefObject<any>,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );
  useRopeJoint(
    j1 as unknown as React.RefObject<any>,
    j2 as unknown as React.RefObject<any>,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );
  useRopeJoint(
    j2 as unknown as React.RefObject<any>,
    j3 as unknown as React.RefObject<any>,
    [
      [0, 0, 0],
      [0, 0, 0],
      1,
    ]
  );
  useSphericalJoint(
    j3 as unknown as React.RefObject<any>,
    card as unknown as React.RefObject<any>,
    [
      [0, 0, 0],
      [0, 1.45, 0],
    ]
  );

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? "grabbing" : "grab";
      return () => {
        document.body.style.cursor = "auto";
      };
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged && typeof dragged !== "boolean") {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach((ref) => {
        const cur = ref.current as any;
        if (cur && typeof cur.wakeUp === "function") cur.wakeUp();
      });
      card.current?.setNextKinematicTranslation?.({
        x: vec.x - dragged.x,
        y: vec.y - dragged.y,
        z: vec.z - dragged.z,
      });
    }
    if (fixed.current) {
      [j1, j2].forEach((ref) => {
        const cur = ref.current as any;
        if (!cur.lerped) cur.lerped = new THREE.Vector3().copy(cur.translation());
        const clampedDistance = Math.max(
          0.1,
          Math.min(1, cur.lerped.distanceTo(cur.translation()))
        );
        cur.lerped.lerp(
          cur.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      const j3c = j3.current as any;
      const j2c = j2.current as any;
      const j1c = j1.current as any;
      const fixedc = fixed.current as any;
      const cardc = card.current as any;
      curve.points[0].copy(j3c.translation());
      curve.points[1].copy(j2c.lerped);
      curve.points[2].copy(j1c.lerped);
      curve.points[3].copy(fixedc.translation());

      // TYPE PATCH: fix TS error by casting as any
      if (band.current) {
        (band.current.geometry as any).setPoints(curve.getPoints(32));
      }
      ang.copy(cardc.angvel());
      rot.copy(cardc.rotation());
      cardc.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

      // Compute and report stretch extension beyond the initial rest length
      const fx = fixedc.translation();
      const cx = cardc.translation();
      const dist = Math.sqrt(
        Math.pow(cx.x - fx.x, 2) + Math.pow(cx.y - fx.y, 2) + Math.pow(cx.z - fx.z, 2)
      );
      if (baseLenRef.current == null) {
        // Initialize base length once when both bodies are available
        baseLenRef.current = dist;
      }
      const extension = Math.max(0, dist - (baseLenRef.current ?? dist));
      if (typeof onStretchChange === "function") {
        onStretchChange(extension);
      }
    }
  });

  curve.curveType = "chordal";
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type={"fixed" as RigidBodyProps["type"]} />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps} type={"dynamic" as RigidBodyProps["type"]}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody
          position={[2, 0, 0]}
          ref={card}
          {...segmentProps}
          type={dragged ? ("kinematicPosition" as RigidBodyProps["type"]) : ("dynamic" as RigidBodyProps["type"])}
        >
          <CuboidCollider args={[0.8, 1.125, 0.01]} />
          <group scale={2.25} position={[0, -1.2, -0.05]}
            {...(!isTouch
              ? {
                  onPointerOver: () => hover(true),
                  onPointerOut: () => hover(false),
                  onPointerUp: (e: React.PointerEvent) => {
                    (e.target as any).releasePointerCapture(e.pointerId);
                    drag(false);
                    // Allow subsequent drags to have a fresh baseline after physics settles
                    baseLenRef.current = null;
                    if (typeof onDragEnd === "function") onDragEnd();
                  },
                  onPointerDown: (e: React.PointerEvent) => {
                    (e.target as any).setPointerCapture(e.pointerId);
                    drag(
                      new THREE.Vector3()
                        .copy((e as any).point)
                        .sub(vec.copy((card.current as any).translation()))
                    );
                    if (typeof onDragStart === "function") onDragStart();
                  },
                }
              : {})}
          >
            <mesh geometry={nodes.card.geometry}>
              <meshPhysicalMaterial
                map={materials.base.map}
                map-anisotropy={16}
                clearcoat={1}
                clearcoatRoughness={0.15}
                roughness={0.9}
                metalness={0.8}
              />
            </mesh>
            <mesh geometry={nodes.clip.geometry} material={materials.metal} material-roughness={0.3} />
            <mesh geometry={nodes.clamp.geometry} material={materials.metal} />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <primitive object={new MeshLineGeometry()} attach="geometry" />
        <primitive
          object={
            new MeshLineMaterial({
              color: new THREE.Color("white"),
              resolution: new THREE.Vector2(isSmall ? 1000 : 1000, isSmall ? 2000 : 1000),
              useMap: 1,
              map: texture,
              repeat: new THREE.Vector2(-4, 1),
              lineWidth: 1,
            } as any)
          }
          attach="material"
        />
      </mesh>
    </>
  );
}
