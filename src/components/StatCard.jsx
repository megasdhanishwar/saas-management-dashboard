import React from "react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function StatCard({
  label,
  value,
  change,
  detail,
  icon: Icon,
  tone = "blue",
  negative = false,
}) {
  return (
    <article className="stat-card">
      <div className="stat-top">
        <span>{label}</span>
        <div className={`stat-icon ${tone}`}>
          <Icon size={19} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-foot">
        <span className={`change-pill ${negative ? "down" : ""}`}>
          {negative ? <ArrowDownRight size={14} /> : <ArrowUpRight size={14} />}
          {change}
        </span>
        <span className="stat-detail">{detail}</span>
      </div>
    </article>
  );
}
