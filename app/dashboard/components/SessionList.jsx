"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import PrintCard from "./PrintCard";
import { TbMoodX } from "react-icons/tb";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const SessionList = ({ prints }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [listLoader, setListLoader] = useState(false);

  useEffect(() => {
    const channel = supabase
      .channel("all-changes-diary-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prints" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, router]);

  return (
    <div className="flex flex-col my-4">
      {listLoader && (
        <div className="customCard h-[80px] w-[200px] mx-auto my-4 flex flex-col justify-center items-center text-xl text-customTextDark">
          Loading...
        </div>
      )}
      {!listLoader && (
        <ScrollArea className="h-[460px] min-w-fit border-[1px] border-customDarkLine rounded-md px-4 py-6 bg-[#0000004d] flex flex-col gap-6">
          {prints.length ? (
            <div className="flex flex-col gap-6">
              {prints.map((print) => (
                <PrintCard
                  key={print.id}
                  print={print}
                  setListLoader={setListLoader}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center gap-4 mt-6">
              <p className="text-xl w-full flex flex-col items-center gap-2">
                You have no Meditation Prints at the moment{" "}
                <TbMoodX className="text-4xl text-center" />
              </p>
              <p className="text-sm text-customTextDark">
                Please visit{" "}
                <Link
                  href="/dashboard/medi-print-panel/create"
                  className="font-extrabold text-xl text-customGreenDark"
                >
                  Medi Print
                </Link>{" "}
                creation panel.
              </p>
            </div>
          )}
        </ScrollArea>
      )}
    </div>
  );
};

export default SessionList;
