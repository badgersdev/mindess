"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip);

ChartJS.defaults.responsive = true;

const MoodChart = ({ data }) => {
  return (
    <div className="relative h-[130px] flex justify-center max-w-md">
      <Doughnut data={data} />
    </div>
  );
};

export default MoodChart;
