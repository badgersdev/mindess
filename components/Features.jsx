import { Button } from "./ui/button";
import Link from "next/link";

import { montserrat } from "@/fonts/googleFonts";
import { featureItems } from "../app/utils/FeatureItems";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import StartNowButton from "./StartNowButton";
import VisitDashboardBtn from "./VisitDashboardBtn";

const Features = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();

  return (
    <div className="mt-8 flex justify-center flex-col gap-12">
      <section className="flex flex-col gap-6">
        <h1
          className={`${montserrat.className} text-xl text-customGreenLight p-2 pl-6 border-l-2 border-customDarkLine uppercase tracking-widest`}
        >
          Features
        </h1>
        {featureItems.map((feature) => (
          <div key={feature.label} className="flex w-full justify-around">
            <div className="bg-customInputBg p-4 rounded-full">
              <div className="text-[84px] text-[#d6b7f4]">
                <div className="animate-pulse">{feature.icon}</div>
              </div>
            </div>

            <div className="flex flex-col justify-evenly items-start w-[120px]">
              <h3 className={`text-xl`}>{feature.header}</h3>
              <Button
                variant="outline"
                className="border-customGreenDark hover:bg-customDarkBg hover:text-white"
              >
                <Link href={feature.aboutHref}>read more</Link>
              </Button>
            </div>
          </div>
        ))}
      </section>
      <section className="flex flex-col gap-10">
        <h2
          className={`${montserrat.className} text-xl text-customGreenLight p-2 pl-6 border-l-2 border-customDarkLine uppercase tracking-widest`}
        >
          About project
        </h2>
        <div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
          facilis illum cupiditate fuga optio deleniti voluptates explicabo a
          doloribus quia obcaecati placeat iusto, omnis
        </div>
        {!data.session ? <StartNowButton /> : <VisitDashboardBtn />}
      </section>
    </div>
  );
};

export default Features;
