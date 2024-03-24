"use client";

import { featureItems } from "@/app/utils/FeatureItems";
import Link from "next/link";
import { usePathname } from "next/navigation";

const DashboardNav = () => {
  const currentPath = usePathname();

  return (
    <nav className="hidden w-full min-h-[60vh] lg:flex flex-col gap-2 basis-1/12">
      <div className="">
        <h3 className="p-4">Your Dashboard</h3>
      </div>
      <div className="flex flex-col gap-16 items-center justify-center mt-auto bg-customSemiTransparent rounded-full py-10">
        {featureItems.map((feature) => (
          <div key={feature.label} className="text-[40px]">
            <Link
              className={
                feature.dashboardHref === currentPath
                  ? "text-customPurple text-[40px] xl:text-[50px]"
                  : "text-customBright text-[40px] xl:text-[50px]"
              }
              href={feature.dashboardHref}
            >
              {feature.icon}
            </Link>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default DashboardNav;
