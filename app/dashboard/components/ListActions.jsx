"use client";
import { deleteItem } from "@/app/utils/deleteItem";
import { IoIosMore } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { PiHeartBold } from "react-icons/pi";
import { LuHeartOff } from "react-icons/lu";
import { useToast } from "@/components/ui/use-toast";

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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addFavourite } from "@/app/utils/addFavourite";

const ListActions = ({ data }) => {
  const { toast } = useToast();

  return (
    <>
      <AlertDialog>
        <DropdownMenu className="">
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0 mr-2 rounded-sm">
              <IoIosMore className="text-2xl" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="bg-[#3a2f42] text-customTextDark"
          >
            <DropdownMenuItem
              onClick={() => {
                addFavourite("https://mindess.vercel.app/api/prints", {
                  id: data.original.id,
                  isFav: data.original.isFavourite,
                });
                toast({
                  title: data.original.isFavourite
                    ? "Session has been REMOVED from favourites"
                    : "Session has been ADDED to your favourites",
                });
              }}
            >
              {data.original.isFavourite ? (
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
            <DropdownMenuItem>Details</DropdownMenuItem>
            <AlertDialogTrigger>
              <DropdownMenuItem>
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
                deleteItem(
                  "https://mindess-git-main-badgersdevs-projects.vercel.app/prints",
                  {
                    id: data.original.id,
                  }
                );
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ListActions;
