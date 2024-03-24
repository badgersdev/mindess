import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// components
import DashboardNav from "./DashboardNav";
import { redirect } from "next/navigation";
import BottomMenuMobile from "./components/BottomMenuMobile";

const DashboardLayout = async ({ children }) => {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <main className="md:flex justify-center items-center max-w-screen-2xl mx-auto px-2 mb-[10vh] lg:mb-0">
      <DashboardNav />
      {children}
      <BottomMenuMobile />
    </main>
  );
};

export default DashboardLayout;
