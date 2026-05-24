import React from "react";

export const BondsTable = ({ data }) => (
  <table>
    <thead>
      <tr>
        <th>Bond ID</th>
        <th>Outstanding (USD)</th>
        <th>Coupon (%)</th>
        <th>PBPE Floor</th>
        <th>Maturity</th>
      </tr>
    </thead>
    <tbody>
      {data.map((b, i) => (
        <tr key={i}>
          <td>{b.id}</td>
          <td>{b.outstanding_usd}</td>
          <td>{b.coupon_percent}</td>
          <td>{b.linked_to.pbpe_floor}</td>
          <td>{b.maturity_year}</td>
        </tr>
      ))}
    </tbody>
  </table>
);
