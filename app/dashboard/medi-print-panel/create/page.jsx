"use client";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SaveItem } from "@/app/utils/saveItem";
import { MoodsUI } from "@/app/utils/Moods";

// schema
import { MediPrintSchema } from "@/app/schemas/MediPrintSchema";

// ui components && icons
import { FiClock } from "react-icons/fi";
import { TfiThought } from "react-icons/tfi";
import { BiBrain } from "react-icons/bi";

import { Calendar } from "@/components/ui/calendar";
import { BsCalendar2Heart, BsClipboardCheck } from "react-icons/bs";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import PopoverHelper from "@/components/PopoverHelper";
import SaveBtn from "@/components/SaveBtn";
import { useState } from "react";
import SpinnerBtn from "@/components/SpinnerBtn";

const today = new Date();
const priorDate = new Date(new Date().setDate(today.getDate() - 30));

const Create = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(MediPrintSchema),
    defaultValues: {
      sessionTime: "5",
      mood: "",
      goldenThought: "",
      sessionDate: new Date(),
    },
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    let print = {
      sessionTime: parseInt(data.sessionTime),
      mood: data.mood,
      goldenThought: data.goldenThought,
      sessionDate: new Date(data.sessionDate).toLocaleDateString(),
    };

    if (
      print.sessionDate === "undefined" ||
      print.sessionDate === "Invalid Date"
    ) {
      print = { ...print, sessionDate: new Date().toLocaleDateString() };
    }

    const { json } = await SaveItem(
      print,
      `https://mindess-git-main-badgersdevs-projects.vercel.app/api/prints`
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
    <div className="relative">
      <div className="absolute top-[25%] right-[10%] w-32 h-32 -z-50 insertGradientDark rounded-3xl blur-2xl" />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col min-h-fit items-center gap-6  w-full md:max-w-[75%] mb-[8vh]"
        >
          <>
            <FormField
              control={form.control}
              name="sessionTime"
              render={({ field }) => (
                <FormItem className="w-full flex  items-start gap-2 border-b pb-4 border-b-customFrosty customCard p-2">
                  <FormLabel className="my-auto text-base flex gap-4 items-center ">
                    <div className="">
                      <FiClock className="text-[26px] text-white" />
                    </div>
                    <div className="flex gap-2">
                      {form.formState.errors.sessionTime ? (
                        <p className="text-customRose">
                          {form.formState.errors.sessionTime.message}
                        </p>
                      ) : (
                        <p>Chilling time (minutes):</p>
                      )}
                      <div className="flex justify-center text-lg">
                        <PopoverHelper content={"SessionTime info"} />
                      </div>
                    </div>
                  </FormLabel>
                  {/* <FormMessage className="text-customRose flex items-center justify-center max-w-[100px]" /> */}
                  <FormControl>
                    <Input
                      className="bg-customInputBg h-14 w-20 text-lg border-none text-customFrosty focus:bg-customNavy focus:text-white"
                      type="number"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="mood"
              render={({ field }) => (
                <FormItem className="w-full border-b pb-4 border-b-customFrosty customCard p-2">
                  <FormLabel className="my-auto text-base flex gap-4 items-center">
                    <BiBrain className="text-[26px] text-white" />
                    <div className="flex justify-center items-center gap-2">
                      {form.formState.errors.mood ? (
                        <p className="text-customRose">
                          Please share your mood!
                        </p>
                      ) : (
                        <p className="flex gap-6">Your Mood:</p>
                      )}
                      <div className=" flex justify-center text-lg">
                        <PopoverHelper content={"Mood info"} />
                      </div>
                    </div>
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="">
                      <SelectValue
                        placeholder={
                          <p className="text-[14px] text-customFrosty">
                            General mood after session..
                          </p>
                        }
                      />
                    </SelectTrigger>

                    <SelectContent>
                      {MoodsUI.map((mood) => (
                        <SelectItem
                          key={mood.value}
                          value={mood.value}
                          className="w-full"
                        >
                          <div className="flex justify-start items-center">
                            <p className="w-[100px] text-normal mr-4">
                              {mood.label}
                            </p>
                            <div className="ml-auto text-3xl">{mood.icon}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage className="text-customRose" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="goldenThought"
              render={({ field }) => (
                <FormItem className="w-full border-b pb-4 border-b-customFrosty customCard p-2">
                  <FormLabel className="text-base flex gap-4">
                    <TfiThought className="text-[26px] text-white" />
                    <div className="flex gap-2">
                      {form.formState.errors.goldenThought ? (
                        <p className="text-customRose">
                          {form.formState.errors.goldenThought.message}
                        </p>
                      ) : (
                        <p className="flex">Golden Thought:</p>
                      )}

                      <div className="flex justify-center text-lg">
                        <PopoverHelper content={"Thought info"} />
                      </div>
                    </div>
                  </FormLabel>
                  <Textarea
                    {...field}
                    className="bg-customInputBg text-lg text-customFrosty min-h-[160px] border-none focus:bg-customNavy focus:text-white"
                    placeholder="anything for you to read in the future..."
                  />
                </FormItem>
              )}
            />
            <div>
              <FormField
                control={form.control}
                name="sessionDate"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Popover>
                      <div className="flex items-center justify-center gap-2">
                        <FormLabel className="text-lg flex items-center">
                          Date of session:
                          <span className="mx-2 flex justify-center text-lg">
                            <PopoverHelper content={"date input info"} />
                          </span>
                        </FormLabel>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="py-7 ml-auto hover:bg-customHoverBtn hover:border-customDarkLine hover:text-white"
                          >
                            <div className="flex gap-4 items-center">
                              <p className="text-lg">
                                {field.value.toLocaleDateString()}
                              </p>
                              <BsCalendar2Heart className="text-customGreenDark text-2xl" />
                            </div>
                          </Button>
                        </PopoverTrigger>
                      </div>
                      <PopoverContent className="bg-customNavy">
                        <Calendar
                          id="calendar"
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          fromDate={priorDate}
                          toDate={new Date()}
                        />
                      </PopoverContent>
                    </Popover>
                  </FormItem>
                )}
              />
            </div>
          </>
          {!isLoading ? <SaveBtn type={"submit"} /> : <SpinnerBtn />}
        </form>
      </Form>
    </div>
  );
};

export default Create;
