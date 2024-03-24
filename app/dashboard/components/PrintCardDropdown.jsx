"use client";
import { useEffect } from "react";

import { deleteItem } from "@/app/utils/deleteItem";
import { addFavourite } from "@/app/utils/addFavourite";

// components & ui
import { LuHeartOff } from "react-icons/lu";
import { PiHeartBold } from "react-icons/pi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FaRegCheckCircle } from "react-icons/fa";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { IoIosMore } from "react-icons/io";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const PrintCardDropdown = ({ print }) => {
  const router = useRouter();
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("all-changes-prints-channel")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "prints" },
        () => {
          router.refresh();
        }
      )
      .subscribe();

    return () => supabase.removeChannel(channel);
  }, [supabase, router, toast]);

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="border-none h-8 w-8 p-0 mr-2 rounded-sm"
          >
            <IoIosMore className="text-2xl" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="bg-[#3a2f42] text-customTextDark w-full p-4 flex flex-col gap-4"
        >
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => {
              addFavourite("https://mindess.vercel.app/api/prints", {
                id: print.id,
                isFav: print.isFavourite,
              });
              toast({
                title: print.isFavourite ? (
                  <div className="flex flex-row gap-2">
                    <p>Session has been removed from favourites</p>
                    <FaRegCheckCircle className="text-xl text-customGreenDark" />
                  </div>
                ) : (
                  <div className="flex flex-row gap-2">
                    <p>Session has been added to your favourites</p>
                    <FaRegCheckCircle className="text-xl text-customGreenDark" />
                  </div>
                ),
              });
            }}
          >
            {print.isFavourite ? (
              <span className="flex gap-2">
                Remove
                <LuHeartOff className="text-2xl text-[#dca15a]" />
              </span>
            ) : (
              <span className="flex gap-2">
                Add to favourites
                <PiHeartBold className="text-[#43ffba] text-2xl" />
              </span>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer">
            Details
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <AlertDialogTrigger>
            <DropdownMenuItem className="cursor-pointer">
              <div className="flex gap-4 items-end">
                <span>Delete Session</span>
                <RiDeleteBin6Line className="text-customRose text-2xl" />
              </div>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-customRose">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete session
            and remove all its data from the server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-black">Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-customRose"
            onClick={() => {
              deleteItem("https://mindess.vercel.app/api/prints", {
                id: print.id,
              });
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PrintCardDropdown;
