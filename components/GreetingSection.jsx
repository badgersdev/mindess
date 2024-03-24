"use client";
import Link from "next/link";

// components && ui
import StartNowButton from "@/components/StartNowButton";
import Quote from "./Quote";
import { MdKeyboardArrowRight } from "react-icons/md";

import VisitDashboardBtn from "./VisitDashboardBtn";

const GreetingSection = ({ quote, session }) => {
  return (
    <section
      className={
        "flex flex-col gap-10 mb-8 pt-10 md:basis-3/5 lg:justify-end lg:pt-0"
      }
    >
      <div className="">
        <div className="mb-8 border-l-2 border-customDarkLine p-4">
          <h1 className="text-xl">be better with</h1>
          <h1 className="text-3xl text-customGreenLight mt-2 font-bold tracking-widest">
            MINDESS.
          </h1>
        </div>
        <div>
          <p className="text-lg text-[#c7c7c7]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam,
            eaque sequi autem voluptatem culpa soluta dolores id, voluptates.
            <span className="flex gap-[2px] text-white items-center ml-auto mt-10">
              <Link
                className=" flex gap-2 items-center mx-auto border-l-[1px] border-customDarkLine pl-2"
                href="/about"
              >
                About features
                <MdKeyboardArrowRight className="text-customDarkLine" />
              </Link>
            </span>
          </p>
        </div>
      </div>
      {quote && <Quote quote={quote} />}
      {session ? <VisitDashboardBtn /> : <StartNowButton />}
    </section>
  );
};

export default GreetingSection;
