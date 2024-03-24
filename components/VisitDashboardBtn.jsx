import Link from "next/link";
import { RxDashboard } from "react-icons/rx";
import { IoIosArrowForward } from "react-icons/io";

const VisitDashboardBtn = () => {
  return (
    <Link
      className="mx-auto text-sm flex min-w-fit items-center justify-center bg-customDarkBg p-4 rounded-lg hover:scale-110 transition-all duration-400"
      href="/dashboard"
    >
      <p className="flex wrap max-w-[80px]">Visit your dashboard</p>
      <IoIosArrowForward className="text-customGreenLight" />
      <RxDashboard className="text-4xl text-customGreenLight" />
    </Link>
  );
};

export default VisitDashboardBtn;
