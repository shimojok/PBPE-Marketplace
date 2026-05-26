import React from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

export const GHGStackedBar = ({ data }) => {
  const chartData = data.sources.map(s => ({
    name: s.name,
    value: s.tco2e_per_year,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="value" stackId="a" fill="#4CAF50" />
      </BarChart>
    </ResponsiveContainer>
  );
};
