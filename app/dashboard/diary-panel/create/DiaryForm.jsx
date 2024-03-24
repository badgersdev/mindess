"use client";
import { useForm } from "react-hook-form";
import { DiaryEntrySchema } from "@/app/schemas/DiaryEntrySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SaveItem } from "@/app/utils/saveItem";
import { useRouter } from "next/navigation";
// components && ui
import PopoverHelper from "@/components/PopoverHelper";
import SaveBtn from "@/components/SaveBtn";

import { LiaHandHoldingHeartSolid } from "react-icons/lia";
import { AiFillDislike } from "react-icons/ai";
import { AiFillLike } from "react-icons/ai";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import AlertHelper from "@/components/AlertHelper";
import { sarpanch } from "@/fonts/googleFonts";
import { useState } from "react";
import SpinnerBtn from "@/components/SpinnerBtn";

const today = new Date().toLocaleDateString();
const DiaryForm = ({ todayEntries, error }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(DiaryEntrySchema),
    defaultValues: {
      gratefulThing: "",
      ratherBad: "",
      ratherGood: "",
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    if (data.ratherBad === "") {
      data.ratherBad = "Nothing bad happend this day. Yay!";
    }

    const diaryEntry = {
      ...data,
    };
    console.log(diaryEntry);

    const { json } = await SaveItem(
      diaryEntry,
      "https://mindess-git-main-badgersdevs-projects.vercel.app/api/diary"
    );

    if (json.error) {
      console.log(json.error.message);
      setIsLoading(false);
    }

    if (json.data) {
      router.refresh();
      router.push("/dashboard");
    }
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        {todayEntries && (
          <div>
            <AlertHelper
              title={"Hey, over here!"}
              text={"You already have an entry from today in your diary!"}
              link={"/dashboard"}
            />
          </div>
        )}
        <h1
          className={`text-2xl flex flex-col max-w-fit ml-auto mr-2 text-customGreenLight p-2 pl-2 mb-2 rounded-lg bg-[#00000011]`}
        >
          <span className="text-sm text-white ml-1 tracking-widest">
            today:
          </span>
          <span className={`${sarpanch.className} tracking-wider`}>
            {today.toLowerCase()}
          </span>
        </h1>
        <div className=" customCard p-4">
          <FormField
            control={form.control}
            name="gratefulThing"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base flex gap-4">
                  <LiaHandHoldingHeartSolid className="text-customBrightViolet text-3xl" />
                  <div>
                    {form.formState.errors.gratefulThing ? (
                      <p className="text-customRose text-sm">
                        {form.formState.errors.gratefulThing.message}
                      </p>
                    ) : (
                      <p>Grateful thing:</p>
                    )}
                  </div>
                  <div className="flex justify-center text-lg">
                    <PopoverHelper content={"Grateful Thing info"} />
                  </div>
                </FormLabel>
                <FormControl>
                  <Input
                    className="bg-customInputBg placeholder:text-stone-300 border-none text-base tracking-wider focus:text-white focus:bg-customNavy"
                    placeholder="one thing you are grateful for today..."
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-6 mt-4">
          <div className="customCard p-4">
            <Accordion
              type="single"
              collapsible
              className="flex flex-col lg:flex-row gap-4 w-full"
            >
              <AccordionItem value="item-1" className="w-full border-b">
                <AccordionTrigger className="">
                  <div className="flex gap-2 items-center">
                    <AiFillLike className="text-customGreenDark text-lg" />

                    <p className="text-start">Rather positive</p>
                    {form.formState.errors.ratherGood && (
                      <p className="text-customRose text-xs">
                        {form.formState.errors.ratherGood.message}
                      </p>
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <FormField
                      control={form.control}
                      name="ratherGood"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className="min-h-fit p-2 h-48 border-none bg-customInputBg focus:text-customGreenLight focus:bg-customNavy text-base"
                              placeholder="rather good things from today..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="w-full border-b">
                <AccordionTrigger className="flex">
                  <div className="flex gap-2 items-center">
                    <AiFillDislike className="text-lg text-customRose" />

                    <p>Rather negative</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-2">
                    <FormField
                      control={form.control}
                      name="ratherBad"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              className="min-h-fit p-2 h-48 border-none bg-customInputBg focus:text-customRose focus:bg-customNavy text-base"
                              placeholder="rather bad things from today..."
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
        {!isLoading ? (
          <div className="mx-auto">
            <SaveBtn type={"submit"} />
          </div>
        ) : (
          <SpinnerBtn />
        )}
      </form>
    </Form>
  );
};

export default DiaryForm;
