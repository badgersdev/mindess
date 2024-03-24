"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LogoutButton from "../LogoutButton";
import { CiLogin } from "react-icons/ci";

const menuVariants = {
  hidden: {
    x: 800,
    opacity: 0,
    transition: {
      duration: 0.4,
    },
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  hover: {
    scale: 1.2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10,
    },
  },
};

const MobileNav = ({ isOpen, handleHamburger, session }) => {
  // const { session } = useAuthContext();
  return (
    <div>
      <AnimatePresence>
        <motion.div
          className={
            "md:hidden bg-customNavy tracking-wide absolute flex flex-col items-center gap-16 top-[10vh] left-0 min-w-full h-[100vh] p-24 blobs-var-4"
          }
          initial="hidden"
          animate={isOpen ? "visible" : "hidden"}
          variants={menuVariants}
          exit="hidden"
        >
          <motion.div
            className="text-center relative"
            whileHover={menuVariants.hover}
          >
            <Link
              onClick={handleHamburger}
              className=" text-xl text-white font-extrabold"
              href="/about"
            >
              About
            </Link>
          </motion.div>

          <motion.div className="text-center" whileHover={menuVariants.hover}>
            <Link
              onClick={handleHamburger}
              className="text-xl text-white font-extrabold"
              href="/contact"
            >
              Contact
            </Link>
          </motion.div>

          <motion.div className="text-center" whileHover={menuVariants.hover}>
            <Link
              onClick={handleHamburger}
              className="text-xl text-white font-extrabold"
              href="/blog"
            >
              Blog
            </Link>
          </motion.div>

          {!session && (
            <motion.div className="text-center border-t p-2 border-t-customGreenDark">
              <Link
                onClick={handleHamburger}
                className=" text-lg text-white font-extrabold flex items-center"
                href="/login"
              >
                Login
                <CiLogin className="text-[40px] text-customGreenDark ml-2" />
              </Link>
            </motion.div>
          )}

          {session && <LogoutButton handleHamburger={handleHamburger} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
