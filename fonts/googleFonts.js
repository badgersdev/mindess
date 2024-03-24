import {
  Montserrat,
  Proza_Libre,
  Raleway,
  Comfortaa,
  Sarpanch,
} from "next/font/google";

export const proza_Libre = Proza_Libre({
  subsets: ["latin-ext"],
  weight: ["400", "500"],
  style: ["italic", "normal"],
});
export const montserrat = Montserrat({
  subsets: ["latin-ext"],
  weight: ["300", "400"],
});
export const raleway = Raleway({
  subsets: ["latin-ext"],
  weight: ["200", "400", "300"],
});
export const comfortaa = Comfortaa({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500"],
});
export const sarpanch = Sarpanch({
  subsets: ["latin-ext"],
  weight: ["400", "500"],
  style: ["normal"],
});
