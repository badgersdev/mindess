import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
// components
import BottomMenuMobile from "./components/BottomMenuMobile";
import { moodsUtils } from "../utils/Moods";
import MoodSection from "./components/MoodSection";
import DiaryList from "./components/DiaryList";
import {
  Accordion,
  AccordionItem,
  AccordionContent,
  AccordionTrigger,
} from "@/components/ui/accordion";
// fonts
import { montserrat } from "@/fonts/googleFonts";
import SessionList from "./components/SessionList";
import Footer from "@/components/Footer";

async function getUserData() {
  const supabase = createServerComponentClient({ cookies });
  const { data: session } = await supabase.auth.getSession();

  const currentUser = session.session.user.user_metadata.displayName;

  const { data: prints, error: printError } = await supabase
    .from("prints")
    .select("*")
    .eq("user", currentUser);

  const { data: diaryEntries, error: diaryError } = await supabase
    .from("diary")
    .select("*")
    .eq("user", currentUser);
  return { prints, diaryEntries, diaryError, printError };
}

const Dashboard = async () => {
  const { prints, diaryEntries, diaryError, printError } = await getUserData();
  const { moods } = await moodsUtils(prints);

  return (
    <div className="py-4 flex flex-col gap-8 mb-[10vh]">
      <Accordion
        type="multiple"
        collapsible="true"
        className="lg:hidden w-full flex flex-col gap-4"
      >
        <div className="flex w-full my-6">
          <h1
            className={`${montserrat.className} uppercase tracking-wide text-xl text-customGreenLight border-l-2 border-customDarkLine p-2 ml-2`}
          >
            Sessions
          </h1>
          {/* <FavPrints prints={prints} /> */}
        </div>
        <AccordionItem value="item-1">
          <AccordionTrigger className="bg-customSemiTransparent p-4 rounded-md">
            <div className="flex w-full items-center">
              <p className="text-customTextDark font-light text-sm">
                Sessions so far:
                <span className="text-customGreenLight text-xl">
                  {" "}
                  {prints.length}
                </span>
              </p>
              <p className="ml-auto mr-2">See sessions list:</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <SessionList prints={prints} />
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2">
          <AccordionTrigger className="w-full bg-customSemiTransparent p-4 rounded-md">
            {/* CAUSING A PROBLEM with displaying mood charts whether session is favourite or not */}
            {/* {MoodsUI.map((mood) => {
              if (latestPrint.mood == mood.value) {
                return (
                  <div
                    key={mood.value}
                    className="flex items-center gap-2 w-full"
                  >
                    <p className="text-sm font-light text-customTextDark">
                      Your latest mood:{" "}
                      <span className="text-white font-normal">
                        {mood.label}
                      </span>
                    </p>
                    <div className="text-3xl">{mood.icon}</div>
                    <p className="ml-auto mr-2">See mood chart:</p>
                  </div>
                );
              }
            })} */}
            <p className="text-customTextDark font-light text-sm">
              See your{" "}
              <span className="text-customGreenLight text-xl">mood chart:</span>
            </p>
          </AccordionTrigger>
          <AccordionContent>
            <MoodSection prints={prints} moods={moods} />
          </AccordionContent>
        </AccordionItem>

        <div className="w-full flex my-6">
          <h3 className="uppercase tracking-wide text-xl text-customGreenLight border-l-2 border-customDarkLine p-2 ml-2 mb-4">
            Diary
          </h3>
          {/* <FavDiaryEntries /> */}
        </div>

        <AccordionItem value="item-3">
          <AccordionTrigger className="bg-customSemiTransparent rounded-md p-4">
            <div className="flex w-full items-center">
              <p className="text-customTextDark font-light text-sm">
                Total entries:
                <span className="text-customGreenLight text-xl">
                  {" "}
                  {diaryEntries.length}
                </span>
              </p>
              <p className="ml-auto mr-2">See all entries:</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <DiaryList diaryEntries={diaryEntries} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <JustList data={diary} collectionName={"diary"} /> */}
      <div className="hidden lg:flex flex-col">
        <MoodSection prints={prints} moods={moods} />

        {/* <SessionTable prints={prints} /> */}
        <DiaryList diaryEntries={diaryEntries} />
      </div>
      <div className="mt-12">
        <Footer />
      </div>
      <BottomMenuMobile />
    </div>
  );
};

export default Dashboard;
