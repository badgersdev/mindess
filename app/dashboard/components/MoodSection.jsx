import MoodChart from "./MoodChart";

const MoodSection = ({ prints, moods }) => {
  const chartData = {
    labels: moods.map((item) => item.label),
    datasets: [
      {
        label: ` % of all Moods`,
        data: moods.map((item) =>
          Math.round((item.quantity / prints.length) * 100)
        ),
        backgroundColor: moods.map((mood) => mood.color),
        borderColor: "white",
      },
    ],
  };

  return (
    <div className="flex mt-10 gap-4 justify-center items-center mx-auto">
      <div>
        <ul className="customCard p-2 w-[160px]">
          {moods.map((mood) => (
            <li key={mood.label} className={`flex items-center mb-1`}>
              <p>
                <span className={`text-[${mood.color}] text-sm font-semibold`}>
                  {mood.label} :{" "}
                </span>
                <span>{`${mood.quantity}`}</span>
                {mood.quantity > 0 ? (
                  <span>{` (${Math.round(
                    (mood.quantity / prints.length) * 100
                  )}%)`}</span>
                ) : (
                  ""
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <MoodChart data={chartData} />
      </div>
    </div>
  );
};

export default MoodSection;
