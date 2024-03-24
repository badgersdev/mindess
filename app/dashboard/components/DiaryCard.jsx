"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

// components
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

const DiaryCard = ({ entry, setListLoader }) => {
  const x = 5;
  const { toast } = useToast();

  const setFavourite = async (favState, id) => {
    setListLoader(true);
    const supabase = createClientComponentClient();

    const { data, error } = await supabase
      .from("diary")
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
                <p>Entry has been successfuly added to Favourites!</p>
              ) : (
                <p>Entry has been successfuly removed from favourites.</p>
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
    <div className="customCard h-[146px] p-2 mt-2 flex gap-2 flex-col relative">
      <div>
        <p className="text-sm text-customTextDark">Created at:</p>

        <p className="text-sm pl-6">
          {new Date(entry.created_at).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="text-end text-xl text-customGreenLight">
          {entry.gratefulThing}
        </p>
      </div>
      <div className="flex-auto w-full flex flex-col border-t-[1px] border-customSemiTransparent">
        <div className="flex flex-row w-full justify-end self-end mt-auto">
          <Button
            variant="ghost"
            className="flex-auto flex gap-1 hover:bg-customHoverBtn p-0"
            onClick={() => setFavourite(!entry.isFavourite, entry.id)}
          >
            {entry.isFavourite ? (
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
            href={`/dashboard/diary-panel/details/${entry.id}`}
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
                    deleteItem("https://mindess.vercel.app/api/diary", {
                      id: entry.id,
                    });
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
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      {entry.isFavourite && (
        <div className="absolute right-1 -top-2 bg-customDarkBg p-2 rounded-xl">
          <FaHeartCircleCheck className="text-base text-customGreenDark" />
        </div>
      )}
    </div>
  );
};

export default DiaryCard;
