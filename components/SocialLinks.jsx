import Link from "next/link";
import { FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const SocialLinks = () => {
  return (
    <div className="flex justify-center gap-4">
      <Link
        href="https://github.com/badgersdev"
        target="blank"
        className="p-4 hover:bg-customHoverBtn hover:text-customGreenLight rounded-full transition-all duration-300"
      >
        <FaGithub className="text-3xl" />
      </Link>

      <Link
        href="https://www.facebook.com/"
        target="blank"
        className="p-4 hover:bg-customHoverBtn hover:text-customGreenLight rounded-full transition-all duration-300"
      >
        <FaFacebook className="text-3xl" />
      </Link>
      <Link
        href="https://www.instagram.com/"
        target="blank"
        className="p-4 hover:bg-customHoverBtn hover:text-customGreenLight rounded-full transition-all duration-300"
      >
        <FaInstagram className="text-3xl" />
      </Link>
    </div>
  );
};

export default SocialLinks;
