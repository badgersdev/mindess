"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { IoAlertCircleOutline } from "react-icons/io5";
import { comfortaa } from "@/fonts/googleFonts";
import Link from "next/link";

const AlertHelper = ({ title, text, link }) => {
  return (
    <Alert className={`bg-customNavy`}>
      <div className="flex flex-row gap-4">
        <IoAlertCircleOutline className="w-12 h-12 text-[#e8af7d]" />
        <div className="flex flex-col">
          <AlertTitle className="text-white">{title}</AlertTitle>
          <AlertDescription className="text-stone-300">{text}</AlertDescription>
          {link && (
            <Link href={link} className="text-[#e8af7d]">
              Check here...
            </Link>
          )}
        </div>
      </div>
    </Alert>
  );
};

export default AlertHelper;
