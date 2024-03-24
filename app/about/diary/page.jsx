import { comfortaa } from "@/fonts/googleFonts";
// icons
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { BsPencilSquare, BsBuildingAdd } from "react-icons/bs";
import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { FaBalanceScale } from "react-icons/fa";

// components
import { Button } from "@/components/ui/button";

// utils
import Link from "next/link";

const MediPrintPanel = async () => {
  return (
    <section className="flex flex-col gap-8 h-screen">
      <div>
        <h1
          className={`${comfortaa.className} ml-6 my-4 pl-4 text-3xl md:text-4xl border-l-2 border-customDarkLine text-customGreenLight`}
        >
          Diary
        </h1>
        <h3 className="text-lg px-10 text-customTextDark">
          this feature helps you being grateful, reach for hapiness and track
          your achivements.
          <br />
          Go ahead and create your first entry!
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <LiaHandHoldingHeartSolid className="text-customPurple text-3xl" />
          <p className="p-4 w-[80%]">
            <span className="font-bold tracking-wider">Be grateful! </span>
            Never underestimate what you have. Go ahead and help yourself with
            finding something you are grateful for!
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <FaBalanceScale className="text-customPurple text-3xl" />
          <p className="p-4 w-[80%]">
            <span className="font-bold tracking-wider">Reflect! </span>
            Wether good or bad things happend to you, must be a reason for it.
            Write those things down, reflect and learn.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-10">
        <div>
          <Button
            variant="outline"
            className="p-0 text-lg text-customTextDark w-full h-fit hover:bg-customHoverBtn border-2 border-customGreenDark hover:text-white hover:border-customGreenLight"
          >
            <Link
              href="/dashboard/diary-panel/create"
              className="flex flex-col gap-2 items-center w-fit h-fit p-4"
            >
              <HiOutlineViewGridAdd className="text-5xl" />
              <p className="text-base">
                Create your
                <span className="tracking-wide text-lg ml-2">Diary Entry</span>
              </p>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MediPrintPanel;
