"use client";

import { RxDashboard } from "react-icons/rx";

import Link from "next/link";
import { featureItems } from "@/app/utils/FeatureItems";
import { usePathname } from "next/navigation";
const BottomMenuMobile = () => {
  const currentPath = usePathname();

  return (
    <div className="lg:hidden w-screen fixed bottom-0 left-0 h-[8vh] flex justify-evenly items-center gap-2 bg-customNavy">
      <div className="flex justify-evenly gap-2 items-center">
        <Link
          className={
            currentPath === "/dashboard"
              ? "text-[28px] text-customGreenLight"
              : "text-[28px] text-customTextDark"
          }
          href={"/dashboard"}
        >
          <div className="flex flex-col justify-center items-center">
            <RxDashboard />
            <p className="text-xs text-center">Dashboard</p>
          </div>
        </Link>
      </div>
      {featureItems.map((feature) => (
        <div className="flex justify-center items-center" key={feature.label}>
          <Link
            className={
              feature.dashboardHref === currentPath
                ? "text-customGreenLight text-[30px]"
                : "text-customTextDark text-[30px]"
            }
            href={feature.dashboardHref}
          >
            <div className="flex flex-col justify-center items-center">
              {feature.icon}
              <p className="text-xs text-center">{feature.header}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BottomMenuMobile;
