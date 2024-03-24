import Link from "next/link";

import { HiOutlineEmojiSad } from "react-icons/hi";
import { BsArrowBarLeft } from "react-icons/bs";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";

const DetailsError = ({ message }) => {
  return (
    <div className="w-full justify-center items-center mx-auto flex flex-col p-6 gap-6 mt-10">
      <p>{message}</p>
      <div className="p-4 min-w-fit bg-customDarkBg rounded-full">
        <HiOutlineEmojiSad className="text-6xl text-[#d6b7f4] animate-pulse duration-6000" />
      </div>
      <br />
      <div className="flex gap-4 items-center">
        <Link href="/dashboard" className="font-bold flex items-center gap-1">
          <BsArrowBarLeft className="text-xl text-customGreenLight" />
          Go back
        </Link>{" "}
        <p className="text-sm">to your dashboard</p>
      </div>

      <div className="mt-24">
        <SocialLinks />
        <Footer />
      </div>
    </div>
  );
};

export default DetailsError;
