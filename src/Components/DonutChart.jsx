import React from "react";
import {
  PieChart,
  Cell,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// #region Sample data
const data = [
  { name: "Group A", value: 400, fill: "#0088FE" },
  { name: "Group B", value: 300, fill: "#00C49F" },
  { name: "Group C", value: 300, fill: "#FFBB28" },
  { name: "Group D", value: 200, fill: "#FF8042" },
];

// #endregion

const renderLabel = (entry) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const percentage = ((entry.value / total) * 100).toFixed(1);
  return `${entry.name} (${percentage}%)`;
};

export default function DonutChart({ isAnimationActive = true }) {
  return (
    <PieChart
      style={{
        width: "100%",
        maxWidth: "500px",
        maxHeight: "80vh",
        aspectRatio: 1,
      }}
      responsive
    >
      <Pie
        data={data}
        innerRadius="80%"
        outerRadius="100%"
        // Corner radius is the rounded edge of each pie slice
        cornerRadius="50%"
        fill="#8884d8"
        // padding angle is the gap between each pie slice
        paddingAngle={5}
        dataKey="value"
        label={renderLabel}
        isAnimationActive={isAnimationActive}
      />
      <Tooltip
        formatter={(value) => {
          const total = data.reduce((sum, item) => sum + item.value, 0);
          const percentage = ((value / total) * 100).toFixed(1);
          return `${value} (${percentage}%)`;
        }}
      />
      {/* <RechartsDevtools /> */}
    </PieChart>
  );
}
