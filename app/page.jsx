import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// components
import Features from "@/components/Features";
import GreetingSection from "@/components/GreetingSection";
import useQuote from "./hooks/useQuote";

import { raleway } from "@/fonts/googleFonts";
import Footer from "@/components/Footer";
import SocialLinks from "@/components/SocialLinks";

export default async function Home() {
  const supabase = createServerComponentClient({ cookies });
  const { data } = await supabase.auth.getSession();
  const { getQuote } = useQuote();
  const quote = await getQuote();

  return (
    <div className="w-full">
      <main
        className={`${raleway.className} p-6 w-screen max-w-screen-xl mx-auto h-full`}
      >
        <GreetingSection quote={quote} session={data.session} />
      </main>
      <div className="bg-customDarkBg pt-2">
        <SocialLinks />
        <Footer />
      </div>
    </div>
  );
}
