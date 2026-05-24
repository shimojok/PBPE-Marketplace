import React from "react";

export const CreditsMarketTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Type</th>
        <th>Volume (PBPE)</th>
        <th>Price (USD)</th>
        <th>Value (USD)</th>
      </tr>
    </thead>
    <tbody>
      {data.map((row, i) => (
        <tr key={i}>
          <td>{row.type}</td>
          <td>{row.volume_pbpe}</td>
          <td>{row.price_usd}</td>
          <td>{row.value_usd}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
