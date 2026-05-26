import React from "react";
import {
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer
} from "recharts";

export const PBPEIssuanceChart = ({ data }) => {
  const chartData = [
    { name: "Carbon", value: data.components.carbon_pbpe },
    { name: "Soil", value: data.components.soil_pbpe },
    { name: "Water", value: data.components.water_pbpe },
    { name: "Health", value: data.components.health_pbpe },
  ];

  const COLORS = ["#4CAF50", "#8BC34A", "#03A9F4", "#FF9800"];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          innerRadius={70}
          outerRadius={120}
          paddingAngle={3}
          dataKey="value"
        >
          {chartData.map((_, i) => (
            <Cell key={i} fill={COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
};
