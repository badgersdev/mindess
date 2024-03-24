"use client";
import { motion } from "framer-motion";
import { AiOutlineMenu } from "react-icons/ai";

const Hamburger = ({ handleHamburger, isOpen }) => {
  const handleClick = () => {
    handleHamburger();
  };

  return (
    <motion.div
      onClick={handleClick}
      className="md:hidden ml-auto"
      animate={isOpen ? { rotateZ: -90 } : { rotateZ: 0 }}
      transition={{ duration: 0.2 }}
    >
      <AiOutlineMenu className="text-4xl" />
      <p className="text-white"></p>
    </motion.div>
  );
};

export default Hamburger;
