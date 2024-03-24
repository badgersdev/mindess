import { proza_Libre } from "@/fonts/googleFonts";

const Quote = ({ quote }) => {
  if (quote) {
    return (
      <div
        className={`${proza_Libre.className} p-4 italic rounded-lg bg-customSemiTransparent`}
      >
        <p>{`"${quote.content}"`}</p>
        <p className="mt-2 text-customGreenLight font-bold">-{quote.author}</p>
      </div>
    );
  }
};

export default Quote;
