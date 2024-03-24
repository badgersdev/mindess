export default function useQuote() {
  const getQuote = async () => {
    try {
      const res = await fetch(
        "https://api.quotable.io/quotes/random?tags=wisdom",
        {
          next: {
            revalidate: 60,
          },
        }
      );
      const data = await res.json();
      return data[0];
    } catch (error) {
      console.log(error.message);
      return error;
    }
  };

  return { getQuote };
}
