import DetailsError from "@/app/dashboard/components/DetailsError";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { sarpanch } from "@/fonts/googleFonts";
import Link from "next/link";
import { TfiThought } from "react-icons/tfi";
import { FaHeartCircleCheck } from "react-icons/fa6";

import { MoodsUI } from "@/app/utils/Moods";
import { BiTimer } from "react-icons/bi";
import { TbMoodX } from "react-icons/tb";

import { ScrollArea } from "@/components/ui/scroll-area";
import GoBackBtn from "@/app/dashboard/components/GoBackBtn";

const PrintDetailsPage = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const id = params.id;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: prints, error } = await supabase
    .from("prints")
    .select("*")
    .eq("user", session.user.user_metadata.displayName)
    .eq("id", id);

  if (!prints.length || error) {
    return (
      <DetailsError
        message={"We are sorry... This medi print does not exists!"}
      />
    );
  }

  return prints.map((print) => (
    <div key={print.id} className="w-full flex flex-col gap-6">
      <div className="mx-4 customCard mt-10 p-4 min-h-[50vh] flex flex-col gap-6 relative">
        {print.isFavourite && (
          <div className="absolute right-1 -top-2 bg-customDarkBg p-2 rounded-xl">
            <FaHeartCircleCheck className="text-base text-customGreenDark" />
          </div>
        )}
        <div>
          <p className="text-customTextDark text-sm">Date of Session:</p>
          <p className={`${sarpanch.className}`}>{print.sessionDate}</p>
        </div>
        <div className="flex w-full justify-around">
          <div className="flex flex-col items-center">
            <BiTimer className="text-6xl" />
            <div>
              <p className="text-sm text-customTextDark">Session length:</p>
              <p className="pl-2 border-l border-customGreenLight mt-1">{`${print.sessionTime} min`}</p>
            </div>
          </div>
          {MoodsUI.map((mood) => {
            if (mood.value === print.mood) {
              return (
                <div key={mood.value} className="flex flex-col items-center">
                  <div className="text-6xl">{mood.icon}</div>
                  <div>
                    <p className="text-sm text-customTextDark">Your mood:</p>
                    <p className="pl-2 border-l border-customGreenLight mt-1">
                      {mood.label}
                    </p>
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="flex flex-col gap-1">
          <h4 className="pb-1 text-sm text-customTextDark">Golden Tought:</h4>
          <ScrollArea className="h-[146px] w-full rounded-md border-none bg-customInputBg p-4 relative">
            <TfiThought className="absolute right-3 -top-4 text-3xl text-customGreenLight " />
            {print.goldenThought.length ? (
              <p className="break-words">{print.goldenThought}</p>
            ) : (
              <div className="flex flex-col justify-center items-center">
                <p className="text-sm italic">
                  You did not write any toughts after this lesson...
                </p>
                <div className="text-[84px] text-[#d6b7f4]">
                  <div className="animate-pulse">
                    <TbMoodX className="text-4xl text-center" />
                  </div>
                </div>
              </div>
            )}
          </ScrollArea>
        </div>
      </div>
      <GoBackBtn url={"/dashboard"} />
    </div>
  ));
};

export default PrintDetailsPage;
