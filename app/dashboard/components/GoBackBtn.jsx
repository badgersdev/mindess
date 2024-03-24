import Link from "next/link";
import { RiArrowGoBackFill } from "react-icons/ri";

const GoBackBtn = ({ url }) => {
  return (
    <div className="mx-auto">
      <Link
        href={url}
        className="flex items-center gap-2 bg-customDarkBg py-2 px-4 rounded-md"
      >
        <RiArrowGoBackFill className="text-customGreenLight" />
        <p>Go back</p>
      </Link>
    </div>
  );
};

export default GoBackBtn;
