"use client";
import { CiLogout } from "react-icons/ci";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const LogoutButton = ({ handleHamburger }) => {
  const router = useRouter();

  const handleLogout = async () => {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.signOut();

    if (!error) {
      handleHamburger();
      router.push("/login");
      router.refresh();
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="flex justify-center items-center pt-3 border-t-[1px] border-t-customRose md:border-t-0 md:border-l-[1px] md:border-l-customRose md:pt-0 md:pl-4 md: ml-2"
    >
      <span className="text-sm">logout</span>
      <CiLogout className="text-3xl text-customRose" />
    </button>
  );
};

export default LogoutButton;
