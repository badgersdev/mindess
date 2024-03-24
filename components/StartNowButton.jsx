import Link from "next/link";

import { Button } from "./ui/button";
import { CiLogin } from "react-icons/ci";

const StartNowButton = () => {
  return (
    <div className="w-full flex justify-center items-start">
      <Link className="flex justify-start" href="/login">
        <Button
          className="border-2 border-customGreenLight text-center font-semibold text-xl p-7 rounded-2xl tracking-widest hover:bg-customDarkBg hover:text-white hover:border-customGreenLight hover:scale-110 transition-all duration-300"
          variant="outline"
        >
          Start Now
          <CiLogin className="text-5xl ml-2" />
        </Button>
      </Link>
    </div>
  );
};

export default StartNowButton;
