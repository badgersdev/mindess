import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { BsPatchQuestion } from "react-icons/bs";

const PopoverHelper = ({ content }) => {
  return (
    <Popover>
      <PopoverTrigger className="mr-2">
        <BsPatchQuestion className="text-xl text-customLime" />
      </PopoverTrigger>
      <PopoverContent>
        <p>input info: {content}</p>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverHelper;
