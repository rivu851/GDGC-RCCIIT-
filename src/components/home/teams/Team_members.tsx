import { motion, useInView } from "framer-motion";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import { IconType } from "react-icons";
import { FiDollarSign, FiEye, FiPlay, FiSearch } from "react-icons/fi";
import { other } from "@/lib/illustrations";

const Example = () => {
  return (
    <div className="bg-white ">
        <h1 className='text-black relative top-12 md:top-20 text-2xl md:text-5xl flex justify-center font-bold'><span className="text-blue-400">&lt;</span>Upcoming Events       <span className="text-red-500">&gt;</span></h1>
      <SwapColumnFeatures />
    </div>
  );
};

const SwapColumnFeatures = () => {
  const [featureInView, setFeatureInView] = useState<FeatureType>(features[0]);

  return (
    <section className=" relative mx-auto max-w-7xl px-4 py-8 md:px-6 lg:px-8">
      <SlidingFeatureDisplay featureInView={featureInView} />

      {/* Offsets the height of SlidingFeatureDisplay so that it renders on top of Content to start */}
      <div className="-mt-[100vh] hidden md:block" />

      {features.map((s) => (
        <Content
          key={s.id}
          featureInView={s}
          setFeatureInView={setFeatureInView}
          {...s}
        />
      ))}
    </section>
  );
};

const SlidingFeatureDisplay = ({
  featureInView,
}: {
  featureInView: FeatureType;
}) => {
  return (
    <div
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-end" : "flex-start",
      }}
      className="pointer-events-none sticky top-0 z-10 hidden h-screen w-full items-center justify-center md:flex px-4"
    >
      <motion.div
        layout
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 25,
        }}
        className="h-fit w-full md:w-3/5 rounded-xl p-4 md:p-8"
      >
        <ExampleFeature featureInView={featureInView} />
      </motion.div>
    </div>
  );
};

const Content = ({
  setFeatureInView,
  featureInView,
}: {
  setFeatureInView: Dispatch<SetStateAction<FeatureType>>;
  featureInView: FeatureType;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    margin: "-150px",
  });

  useEffect(() => {
    if (isInView) {
      setFeatureInView(featureInView);
    }
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative z-0 flex h-fit md:h-screen py-6 md:py-0"
      style={{
        justifyContent:
          featureInView.contentPosition === "l" ? "flex-start" : "flex-end",
      }}
    >
        
      <div className="grid h-full w-full place-content-center px-4 py-12 md:w-2/5 md:px-8 md:py-8 z-100">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          <span className={`rounded-full  px-10 py-2 text-xs font-medium text-white ${featureInView.color}`}>
            {featureInView.callout}
          </span>
          <p className="my-3 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900">
            {featureInView.title}
          </p>
          <p className="text-slate-600 text-sm md:text-base">
            {featureInView.description}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="mt-8 block md:hidden"
        >
          <ExampleFeature featureInView={featureInView} />
        </motion.div>
      </div>
    </section>
  );
};

const ExampleFeature = ({ featureInView }: { featureInView: FeatureType }) => {
  return (
    <div className="relative h-64 md:h-116 w-full rounded-xl bg-slate-800 shadow-xl">
      <img src={`${featureInView.profPic}`} alt={featureInView.title} className="object-cover w-full h-full rounded-xl"/>

      
    </div>
  );
};

export default Example;

type FeatureType = {
  id: number;
  callout: string;
  title: string;
  description: string;
  contentPosition: "l" | "r";
  Icon: IconType;
  color: string;
  profPic?: string;
};

const features: FeatureType[] = [
  {
    id: 1,
    callout: "Coming Soon",
    title: "Stay Tuned",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "r",
    Icon: FiEye,
    color: "bg-blue-400",
     profPic: other.comingSoon,

  },
  {
    id: 2,
    callout: "Coming Soon",
    title: "Stay Tuned",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "l",
    Icon: FiSearch,
    color: "bg-red-400",
      profPic: other.comingSoon,
  },
  {
    id: 3,
    callout: "Coming Soon",
    title: "Stay Tuned",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "r",
    Icon: FiPlay,
    color: "bg-yellow-400",
     profPic: other.comingSoon,

  },
  {
    id: 4,
    callout: "Coming Soon",
    title: "Stay Tuned",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolor iusto quaerat qui, illo incidunt suscipit fugiat distinctio officia earum eius quae officiis quis harum animi.",
    contentPosition: "l",
    Icon: FiDollarSign,
    color: "bg-green-400",
     profPic: other.comingSoon,

  },
];