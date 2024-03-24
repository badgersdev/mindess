import {
  TbMoodAngry,
  TbMoodSad,
  TbMoodEmpty,
  TbMoodSmile,
  TbMoodHappy,
  TbMoodCrazyHappy,
} from "react-icons/tb";

export const MoodsUI = [
  {
    value: "disaster",
    label: "DISASTER",
    icon: <TbMoodAngry className="text-[#CF7B83]" />,
    color: "#CF7B83",
  },
  {
    value: "bad",
    label: "BAD",
    icon: <TbMoodSad className="text-[#DD903F]" />,
    color: "#DD903F",
  },
  {
    value: "ok",
    label: "OK",
    icon: <TbMoodEmpty className="text-[#6b98f9]" />,
    color: "#6b98f9",
  },
  {
    value: "good",
    label: "GOOD",
    icon: <TbMoodSmile className="text-[#9bf7ab]" />,
    color: "#9bf7ab",
  },
  {
    value: "excelent",
    label: "EXCELENT",
    icon: <TbMoodHappy className="text-[#3ed06f]" />,
    color: "#3ed06f",
  },
  {
    value: "love3000",
    label: "LOVE 3000",
    icon: <TbMoodCrazyHappy className="text-[#C777EC]" />,
    color: "#C777EC",
  },
];

export async function moodsUtils(prints) {
  const moods = MoodsUI.map((item) => {
    return { ...item, quantity: 0 };
  });

  if (prints) {
    prints.forEach((print) => {
      moods.map((item) => {
        if (item.value === print.mood) {
          item.quantity += 1;
        }
      });
    });
  }

  return { moods };
}
