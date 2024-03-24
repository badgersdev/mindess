"use client";

import { Button } from "./ui/button";

import { BsClipboardCheck } from "react-icons/bs";

const SaveBtn = ({ type }) => {
  return (
    <Button
      type={type}
      variant="outline"
      className="border-2 border-customGreenDark text-customTextDark w-36 h-16 flex gap-2 mt-2 justify-center items-center p-8 text-lg hover:border-customGreenLight hover:bg-customHoverBtn hover:text-white"
    >
      <span className="text-xl">Save!</span>
      <div className="flex justify-center items-center gap-2">
        <BsClipboardCheck className="text-4xl" />
      </div>
    </Button>
  );
};

export default SaveBtn;
