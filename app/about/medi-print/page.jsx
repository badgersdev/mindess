import { comfortaa } from "@/fonts/googleFonts";
// icons
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { AiOutlineTags } from "react-icons/ai";
import { BsPencilSquare, BsBuildingAdd } from "react-icons/bs";

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
          Medi Print
        </h1>
        <h3 className="text-lg px-10 text-customTextDark">
          a feature that helps tracking your medidation sessions
          <br />
          Go ahead and create your session!
        </h3>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <AiOutlineTags className="text-customPurple text-3xl" />
          <p className="p-4 w-[80%]">
            <span className="font-bold tracking-wider">Tag it! </span>
            Create your own tag and save your session with specific tag.
          </p>
        </div>
        <div className="flex gap-4 items-center">
          <BsPencilSquare className="text-customPurple text-3xl" />
          <p className="p-4 w-[80%]">
            <span className="font-bold tracking-wider">Write it! </span>
            Write down any conclusions about your last session. That might be
            any tought came to your mind after meditation...
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
              href="/dashboard/medi-print-panel/create"
              className="flex flex-col gap-2 items-center w-fit h-fit p-4"
            >
              <HiOutlineViewGridAdd className="text-5xl" />
              <p className="text-base">
                Create your
                <span className="tracking-wide text-lg ml-2">Medi Print</span>
              </p>
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default MediPrintPanel;
