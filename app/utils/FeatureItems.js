import { PiBookBookmarkLight, PiFlowerLotus } from "react-icons/pi";
import { TbMapHeart } from "react-icons/tb";

export const featureItems = [
  {
    label: "medi-print",
    header: "Medi print",
    dashboardHref: "/dashboard/medi-print-panel/create",
    aboutHref: "/about/medi-print",
    icon: <PiFlowerLotus />,
  },
  {
    label: "diary",
    header: "Diary",
    dashboardHref: "/dashboard/diary-panel/create",
    aboutHref: "/about/diary",
    icon: <PiBookBookmarkLight />,
  },
  // {
  //   label: "dream-map",
  //   header: "Dream Map",
  //   dashboardHref: "/dashboard/dream-map-panel",
  //   aboutHref: "/about/dream-map",
  //   icon: <TbMapHeart />,
  // },
];
