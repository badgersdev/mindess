import { Button } from "./ui/button";
import { ImSpinner6 } from "react-icons/im";

const SpinnerBtn = () => {
  return (
    <Button disabled className="mx-auto w-36 h-16 p-6 text-lg flex gap-2">
      Loading
      <ImSpinner6 className="text-2xl animate-spin" />
    </Button>
  );
};

export default SpinnerBtn;
