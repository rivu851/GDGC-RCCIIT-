// Provide minimal JSX types for meshline (meshline library) so TSX compiles
declare global {
  namespace JSX {
    interface IntrinsicElements {
      // Use a generic record of unknown to avoid `any` lint errors while still allowing props
      meshLineGeometry: Record<string, unknown>;
      meshLineMaterial: Record<string, unknown>;
    }
  }
}

export {};
