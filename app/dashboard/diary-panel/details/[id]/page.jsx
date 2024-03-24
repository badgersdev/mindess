import DetailsError from "@/app/dashboard/components/DetailsError";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { sarpanch } from "@/fonts/googleFonts";
import { ScrollArea } from "@/components/ui/scroll-area";
import GoBackBtn from "@/app/dashboard/components/GoBackBtn";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { FaHeartCircleCheck } from "react-icons/fa6";

const DiaryDetailsPage = async ({ params }) => {
  const supabase = createServerComponentClient({ cookies });
  const id = params.id;
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const { data: entries, error } = await supabase
    .from("diary")
    .select("*")
    .eq("user", session.user.user_metadata.displayName)
    .eq("id", id);

  if (!entries.length || error) {
    return <DetailsError message={"Sorry... Entry does not exists."} />;
  }

  return entries.map((entry) => (
    <div key={entry.id} className="w-full flex flex-col gap-6">
      <div className="mx-4 customCard mt-10 p-4 min-h-[50vh] flex flex-col gap-4 relative">
        {entry.isFavourite && (
          <div className="absolute right-1 -top-2 bg-customDarkBg p-2 rounded-xl">
            <FaHeartCircleCheck className="text-base text-customGreenDark" />
          </div>
        )}
        <div>
          <p className="text-customTextDark text-sm">Entry from:</p>
          <p className={`${sarpanch.className}`}>
            {new Date(entry.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <h2 className="pl-2 mx-auto border-l-2 border-customGreenLight text-smd uppercase">
            Happened this day...
          </h2>
          <div className="flex flex-col gap-4">
            <div className="relative">
              <h4 className="pb-1 text-sm text-customTextDark">
                Rather good things:
              </h4>
              <ScrollArea className="h-[180px] w-full rounded-md border-none bg-customInputBg p-4 relative">
                <AiFillLike className="absolute right-3 -top-3 text-2xl text-customGreenDark" />
                <p className="break-all italic">{entry.ratherGood}</p>
              </ScrollArea>
            </div>
            <div>
              <h4 className="pb-1 text-sm text-customTextDark">
                Rather bad things:
              </h4>
              <ScrollArea className="h-[180px] w-full rounded-md border-none bg-customInputBg p-4 relative">
                <AiFillDislike className="absolute right-3 -top-3 text-2xl text-customRose " />
                <p className="break-all italic">{entry.ratherBad}</p>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>
      <GoBackBtn url={"/dashboard"} />
    </div>
  ));
};

export default DiaryDetailsPage;
