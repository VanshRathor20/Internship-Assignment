import React from "react";
import {
  PieChart,
  Cell,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Label,
} from "recharts";

// Color palette for nutrients
const nutrientColors = {
  proteins: "#FF6B6B",
  carbohydrates: "#FFD93D",
  fat: "#A569BD",
  fiber: "#6BCB77",
  sugars: "#4D96FF",
  salt: "#FF9FF3",
};

const DonutChart = ({ product, isAnimationActive = true }) => {
  // Transform product nutrients into chart data
  const getNutritionData = () => {
    if (!product || !product.nutriments) {
      return [];
    }

    const nutrients = [];

    // Add main nutrients
    if (product.nutriments.proteins && product.nutriments.proteins > 0) {
      nutrients.push({
        name: `Proteins (${product.nutriments.proteins}g)`,
        value: product.nutriments.proteins,
        fill: nutrientColors.proteins,
      });
    }

    if (
      product.nutriments.carbohydrates &&
      product.nutriments.carbohydrates > 0
    ) {
      nutrients.push({
        name: `Carbohydrates (${product.nutriments.carbohydrates}g)`,
        value: product.nutriments.carbohydrates,
        fill: nutrientColors.carbohydrates,
      });
    }

    if (product.nutriments.fat && product.nutriments.fat > 0) {
      nutrients.push({
        name: `Total Fat (${product.nutriments.fat}g)`,
        value: product.nutriments.fat,
        fill: nutrientColors.fat,
      });
    }

    if (product.nutriments.fiber && product.nutriments.fiber > 0) {
      nutrients.push({
        name: `Fiber (${product.nutriments.fiber}g)`,
        value: product.nutriments.fiber,
        fill: nutrientColors.fiber,
      });
    }

    if (product.nutriments.sugars && product.nutriments.sugars > 0) {
      nutrients.push({
        name: `Sugars (${product.nutriments.sugars}g)`,
        value: product.nutriments.sugars,
        fill: nutrientColors.sugars,
      });
    }

    if (product.nutriments.salt && product.nutriments.salt > 0) {
      nutrients.push({
        name: `Salt (${product.nutriments.salt}g)`,
        value: product.nutriments.salt,
        fill: nutrientColors.salt,
      });
    }

    return nutrients;
  };

  const chartData = getNutritionData();

  if (!chartData || chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-96">
        <p className="text-gray-500">No nutritional data available</p>
      </div>
    );
  }

  const renderLabel = (entry) => {
    const total = chartData.reduce((sum, item) => sum + item.value, 0);
    const percentage = ((entry.value / total) * 100).toFixed(1);
    return `${percentage}%`;
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart
        style={{
          width: "100%",
          maxWidth: "800px",
          aspectRatio: 1,
        }}
      >
        <Pie
          data={chartData}
          innerRadius={80}
          outerRadius={120}
          cornerRadius="50%"
          paddingAngle={5}
          dataKey="value"
          label={renderLabel}
          isAnimationActive={isAnimationActive}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => {
            const total = chartData.reduce((sum, item) => sum + item.value, 0);
            const percentage = ((value / total) * 100).toFixed(1);
            return `${value}g (${percentage}%)`;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DonutChart;
