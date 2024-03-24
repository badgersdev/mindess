"use client";

import { ImSpinner9 } from "react-icons/im";
import { motion } from "framer-motion";
// components
import { Button } from "@/components/ui/button";

const Loading = () => {
  return (
    <div className="text-center mt-20 flex flex-col min-w-[100vw]">
      <Button
        className="p-8 text-6xl flex flex-col justify-center"
        disabled
        variant="loading"
      >
        <motion.span
          animate={{
            rotateZ: 360,
          }}
          transition={{
            repeat: Infinity,
            delay: -1,
            duration: 0.7,
          }}
          className="p-4"
        >
          <ImSpinner9 />
        </motion.span>
        <span className="text-base">loading</span>
      </Button>
    </div>
  );
};

export default Loading;
