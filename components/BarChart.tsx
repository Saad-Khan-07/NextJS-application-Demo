import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface UserProps {
  usercount: number[];
  users: string[];
  text: string;
}

const getColor = (index: number) => {
  const colors = [
    "rgba(255, 99, 132, 0.7)",   // red
    "rgba(54, 162, 235, 0.7)",   // blue
    "rgba(255, 206, 86, 0.7)",   // yellow
    "rgba(75, 192, 192, 0.7)",   // teal
    "rgba(153, 102, 255, 0.7)",  // purple
    "rgba(255, 159, 64, 0.7)",   // orange
  ];
  return colors[index % colors.length];
};

function BarChart({ users, usercount, text}: UserProps) {
  const data = {
    labels: users,
    datasets: [
      {
        label: "Number Of Users",
        data: usercount,
        backgroundColor: users.map((_, i) => getColor(i)),
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: {
        display: true,
        text: text,
        color: "#A9A9A9f",
        font: { size: 18 },
      },
    },
    scales: {
      x: {
        ticks: { color: "#d1d5db" }, // Tailwind gray-300
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      y: {
        ticks: { color: "#d1d5db" },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
    },
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-white/10">
      <h2 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4">
        User Statistics
      </h2>
      <Bar data={data} options={options} />
    </div>
  );
}

export default BarChart;
