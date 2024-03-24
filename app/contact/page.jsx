import { montserrat } from "@/fonts/googleFonts";

// components & ui
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineAlternateEmail } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { RiMailCheckLine } from "react-icons/ri";
import contact from "@/app/assets/contact.svg";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/components/Footer";

import Image from "next/image";
import SocialLinks from "@/components/SocialLinks";

const Contact = async () => {
  return (
    <main className="flex flex-col overflow-y-hidden">
      <div className="flex flex-col justify-center gap-10 pt-10">
        <div className="flex items-center justify-center gap-6">
          <h1
            className={`${montserrat.className} text-xl text-customGreenLight pl-4 border-l-2 border-customDarkLine uppercase tracking-widest`}
          >
            Contact
          </h1>
          <Image
            src={contact}
            alt="contact"
            height="0"
            width="0"
            className="w-[74px] h-[74px]"
          />
        </div>

        <section className="p-4 h-full">
          <p className="px-2 text-customTextDark">
            Whether you have inquiries about our services, want to provide
            feedback, or simply want to say hello, we are here to help. Do not
            hesitate to get in touch - we look forward to connecting with you!
          </p>
          <Tabs
            defaultValue="email"
            className="flex mx-auto flex-col w-[268px] pt-16"
          >
            <TabsList className="bg-customDarkBg text-customTextDark">
              <TabsTrigger className="w-full" value="email">
                <div className="flex gap-2 items-center">
                  <MdOutlineAlternateEmail className="text-2xl" />
                  email
                </div>
              </TabsTrigger>
              <TabsTrigger className="w-full" value="whatsapp">
                <div className="flex gap-2 items-center">
                  <FaWhatsapp className="text-2xl" />
                  Whatsapp
                </div>
              </TabsTrigger>
            </TabsList>
            <TabsContent className="mx-auto" value="whatsapp">
              <div className="flex items-center gap-2 p-6">
                <IoChatboxEllipses className="text-xl" />
                00 00 123 456 789
              </div>
            </TabsContent>
            <TabsContent className="mx-auto" value="email">
              <div className="flex items-center gap-2 p-6">
                <RiMailCheckLine className="text-xl" />
                badgersdev@gmail.com
              </div>
            </TabsContent>
          </Tabs>
        </section>

        <section className="flex flex-col max-w-[500px] justify-evenly gap-4 bg-customInputBg p-4">
          <div className="mx-auto">
            <p className="pl-2 border-l border-customDarkLine uppercase tracking-widest text-sm text-customTextDark">
              Links
            </p>
          </div>
          <SocialLinks />
        </section>
      </div>
      <Footer />
    </main>
  );
};

export default Contact;
