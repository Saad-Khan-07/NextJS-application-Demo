import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

interface MobileChartProps {
  usercount: number[];
  users: string[];
  text: string;
}

const getColor = (index: number) => {
  const colors = [
    "rgba(255, 99, 132, 0.8)",   // red
    "rgba(54, 162, 235, 0.8)",   // blue
    "rgba(255, 206, 86, 0.8)",   // yellow
    "rgba(75, 192, 192, 0.8)",   // teal
    "rgba(153, 102, 255, 0.8)",  // purple
    "rgba(255, 159, 64, 0.8)",   // orange
  ];
  return colors[index % colors.length];
};

const getBorderColor = (index: number) => {
  const colors = [
    "rgba(255, 99, 132, 1)",   // red
    "rgba(54, 162, 235, 1)",   // blue
    "rgba(255, 206, 86, 1)",   // yellow
    "rgba(75, 192, 192, 1)",   // teal
    "rgba(153, 102, 255, 1)",  // purple
    "rgba(255, 159, 64, 1)",   // orange
  ];
  return colors[index % colors.length];
};

function MobileChart({ users, usercount, text }: MobileChartProps) {
  const data = {
    labels: users.map(user => user.charAt(0).toUpperCase() + user.slice(1)),
    datasets: [
      {
        label: "Users",
        data: usercount,
        backgroundColor: users.map((_, i) => getColor(i)),
        borderColor: users.map((_, i) => getBorderColor(i)),
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          padding: 15,
          usePointStyle: true,
          pointStyle: 'circle',
          font: {
            size: 12,
          },
          color: "#374151", // Tailwind gray-700
        },
      },
      title: {
        display: true,
        text: text,
        color: "#6B7280", // Tailwind gray-500
        font: { 
          size: 14,
          weight: 'bold' as const,
        },
        padding: {
          top: 10,
          bottom: 20,
        },
      },
      tooltip: {
        backgroundColor: "rgba(255, 255, 255, 0.95)",
        titleColor: "#374151",
        bodyColor: "#374151",
        borderColor: "#E5E7EB",
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
            const percentage = ((context.parsed / total) * 100).toFixed(1);
            return `${context.label}: ${context.parsed} (${percentage}%)`;
          }
        }
      },
    },
    cutout: '60%', // Creates a doughnut chart
  };

  // Calculate total for the center display
  const total = usercount.reduce((sum, count) => sum + count, 0);

  return (
    <div className="space-y-4">
      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 gap-3">
        {users.map((user, index) => (
          <div key={user} className="bg-white rounded-lg p-3 shadow-sm border border-gray-200">
            <div className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-2 flex-shrink-0" 
                style={{ backgroundColor: getColor(index) }}
              ></div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 truncate capitalize">
                  {user}
                </p>
                <p className="text-lg font-bold text-gray-900">
                  {usercount[index] || 0}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Doughnut Chart */}
      <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/10">
        <h2 className="text-lg font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-4 text-center">
          User Distribution
        </h2>
        <div className="relative" style={{ height: '250px' }}>
          <Doughnut data={data} options={options} />
          {/* Center text showing total */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-800">{total}</div>
              <div className="text-sm text-gray-600">Total Users</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobileChart;