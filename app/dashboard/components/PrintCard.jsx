"use client";

import { useState } from "react";
import { MoodsUI } from "@/app/utils/Moods";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

import { FaRegCheckCircle } from "react-icons/fa";
import { FaHeartCircleXmark, FaHeartCircleCheck } from "react-icons/fa6";

import { TiZoomOutline } from "react-icons/ti";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteItem } from "@/app/utils/deleteItem";
import Link from "next/link";

const PrintCard = ({ print, setListLoader }) => {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const setFavourite = async (favState, id) => {
    console.log(favState);
    setListLoader(true);
    const supabase = createClientComponentClient();

    const { data, error } = await supabase
      .from("prints")
      .update({ isFavourite: favState })
      .eq("id", id)
      .select();

    if (!error) {
      setTimeout(() => {
        toast({
          title: (
            <div className="flex flex-row gap-2">
              <FaRegCheckCircle className="text-4xl text-customGreenDark" />
              {favState ? (
                <p>Print has been successfuly added to Favourites!</p>
              ) : (
                <p>Print has been successfuly removed from favourites.</p>
              )}
            </div>
          ),
        });
        setListLoader(false);
      }, 1000);
    }
    return { data, error };
  };

  return (
    <div className="customCard h-[146px] p-2 mt-2 flex flex-col relative">
      <div className="flex">
        <div className="w-full mb-auto gap-1">
          <div>
            <p className="text-sm text-customTextDark">Session date:</p>
            <p className="pl-6">{print.sessionDate}</p>
          </div>
          <div>
            <p className="text-sm  text-customTextDark">Session time:</p>
            <p className="t pl-6">{`${print.sessionTime} min`}</p>
          </div>
        </div>
        <div className="w-1/2">
          <p className="text-left text-sm text-customTextDark">Mood:</p>
          {MoodsUI.map((mood) => {
            if (mood.value === print.mood) {
              return (
                <div
                  key={mood.value}
                  className="flex items-center gap-2 text-2xl mt-1"
                >
                  <p className="ml-auto text-base uppercase">{print.mood}</p>
                  {mood.icon}
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className="flex-auto w-full flex flex-col border-t-[1px] border-customSemiTransparent">
        <div className="flex flex-row w-full justify-end self-end mt-auto">
          <Button
            variant="ghost"
            className="flex-auto flex gap-1 hover:bg-customHoverBtn p-0"
            onClick={() => setFavourite(!print.isFavourite, print.id)}
          >
            {print.isFavourite ? (
              <>
                <p className="text-xs text-customTextDark">Remove</p>

                <FaHeartCircleXmark className="text-base text-[#b1b173]" />
              </>
            ) : (
              <>
                <p className="text-xs text-customTextDark">Make favourite</p>
                <FaHeartCircleCheck className="text-base text-customGreenDark" />
              </>
            )}
          </Button>
          <Link
            variant="ghost"
            className="flex-auto flex items-center justify-center gap-1 hover:bg-customHoverBtn p-0"
            href={`/dashboard/medi-print-panel/details/${print.id}`}
          >
            <p className="text-xs text-customTextDark">Details</p>
            <TiZoomOutline className="text-base text-customGreenLight" />
          </Link>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="ghost"
                className="flex-auto flex gap-1 hover:bg-customHoverBtn p-0"
              >
                <p className="text-xs text-customTextDark">Delete</p>
                <RiDeleteBin6Line className="text-base text-customRose" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-[#f1f1f1]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-customRose">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="bg-customRose"
                  onClick={() => {
                    setListLoader(true);
                    deleteItem(
                      "https://mindess-git-main-badgersdevs-projects.vercel.app/api/prints",
                      {
                        id: print.id,
                      }
                    );
                    setTimeout(() => {
                      toast({
                        title: (
                          <div className="flex flex-row gap-2">
                            <p>Diary Entry has been successfuly removed</p>
                            <FaRegCheckCircle className="text-4xl text-customGreenDark" />
                          </div>
                        ),
                      });
                      setListLoader(false);
                    }, 1000);
                  }}
                >
                  {loading ? "loading..." : "Delete"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {print.isFavourite && (
        <div className="absolute right-1 -top-2 bg-customDarkBg p-2 rounded-xl">
          <FaHeartCircleCheck className="text-base text-customGreenDark" />
        </div>
      )}
    </div>
  );
};

export default PrintCard;
