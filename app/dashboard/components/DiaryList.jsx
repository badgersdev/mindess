"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import Link from "next/link";
// components
import DiaryCard from "./DiaryCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { TbMoodEmpty, TbMoodSad, TbMoodX } from "react-icons/tb";
import { useRouter } from "next/navigation";

const DiaryList = ({ diaryEntries }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("all-changes-diary-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "diary" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, router]);

  return (
    <div className="flex flex-col mb-[10vh] mt-4">
      {listLoader && (
        <div className="customCard h-[80px] w-[200px] mx-auto my-4 flex flex-col justify-center items-center text-xl text-customTextDark">
          Loading...
        </div>
      )}
      {!listLoader && (
        <ScrollArea className="h-[400px] min-w-fit border-[1px] border-customDarkLine rounded-md px-4 py-6 bg-[#0000004d]">
          {!diaryEntries.length && (
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <p className="text-xl w-full flex flex-col items-center gap-2">
                You have no diary entries at the moment{" "}
                <TbMoodX className="text-4xl text-center" />
              </p>
              <p className="text-sm text-customTextDark">
                Please visit{" "}
                <Link
                  href="/dashboard/diary-panel/create"
                  className="font-extrabold text-xl text-customGreenDark"
                >
                  Diary Panel
                </Link>{" "}
                to add your first entry!
              </p>
            </div>
          )}
          <div className="flex flex-col gap-6">
            {diaryEntries.map((entry) => (
              <DiaryCard
                key={entry.id}
                entry={entry}
                setListLoader={setListLoader}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
};

export default DiaryList;
