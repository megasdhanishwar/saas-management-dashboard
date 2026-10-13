import React, { useState } from "react";
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Download,
  Gauge,
  MousePointer2,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { revenueData, usageData } from "../data/mockData";

export default function Analytics({ onToast }) {
  const [range, setRange] = useState("6 months");
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">DATA & PERFORMANCE</div>
          <h1>Analytics</h1>
          <p>
            Understand revenue performance, customer growth, and product usage.
          </p>
        </div>
        <div className="heading-actions">
          <label className="select-button date-range">
            <CalendarDays size={15} />
            <select value={range} onChange={(e) => setRange(e.target.value)}>
              <option>6 months</option>
              <option>30 days</option>
              <option>90 days</option>
            </select>
          </label>
          <button
            className="button button-secondary"
            onClick={() => onToast("Analytics report exported.", "success")}
          >
            <Download size={16} /> Export
          </button>
        </div>
      </div>
      <div className="stat-grid">
        <div className="stat-card">
          <div className="stat-top">
            <span>Gross revenue</span>
            <div className="stat-icon blue">
              <Wallet size={19} />
            </div>
          </div>
          <div className="stat-value">$213,480</div>
          <div className="stat-foot">
            <span className="change-pill">
              <ArrowUpRight size={14} /> 18.6%
            </span>
            <span className="stat-detail">vs. previous period</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <span>Customer growth</span>
            <div className="stat-icon green">
              <Users size={19} />
            </div>
          </div>
          <div className="stat-value">+24.8%</div>
          <div className="stat-foot">
            <span className="change-pill">
              <ArrowUpRight size={14} /> 4.2%
            </span>
            <span className="stat-detail">vs. previous period</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <span>Churn rate</span>
            <div className="stat-icon orange">
              <MousePointer2 size={19} />
            </div>
          </div>
          <div className="stat-value">2.4%</div>
          <div className="stat-foot">
            <span className="change-pill">
              <ArrowDownRight size={14} /> 0.8%
            </span>
            <span className="stat-detail">Improved this month</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-top">
            <span>API usage</span>
            <div className="stat-icon violet">
              <Zap size={19} />
            </div>
          </div>
          <div className="stat-value">8.42M</div>
          <div className="stat-foot">
            <span className="change-pill">
              <ArrowUpRight size={14} /> 14.2%
            </span>
            <span className="stat-detail">Requests this month</span>
          </div>
        </div>
      </div>
      <div className="dashboard-grid analytics-charts">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Revenue comparison</h2>
              <p>Current revenue compared to previous period</p>
            </div>
            <span className="chart-tag">USD</span>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-current" /> Current period
            </span>
            <span>
              <i className="legend-previous" /> Previous period
            </span>
          </div>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient
                    id="analyticsFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#5578f6" stopOpacity={0.18} />
                    <stop offset="100%" stopColor="#5578f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf0f6" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 12 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v) => [`$${Number(v).toLocaleString()}`]}
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#b9c4e4"
                  strokeDasharray="5 5"
                  fill="transparent"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5578f6"
                  fill="url(#analyticsFill)"
                  strokeWidth={2.5}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Product usage</h2>
              <p>API calls and storage utilization</p>
            </div>
            <span className="chart-tag">This week</span>
          </div>
          <div className="usage-kpis">
            <div>
              <span className="usage-dot api-dot" />
              API calls<strong>68%</strong>
            </div>
            <div>
              <span className="usage-dot storage-dot" />
              Storage<strong>42%</strong>
            </div>
          </div>
          <div className="analytics-chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={usageData}
                barGap={5}
                margin={{ top: 8, right: 4, left: -18, bottom: 0 }}
              >
                <CartesianGrid stroke="#edf0f6" vertical={false} />
                <XAxis
                  dataKey="day"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 12 }}
                  dy={8}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 11 }}
                  tickFormatter={(v) => `${v}%`}
                />
                <Tooltip formatter={(v) => [`${v}%`]} />
                <Bar
                  dataKey="api"
                  name="API calls"
                  fill="#5578f6"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={22}
                />
                <Bar
                  dataKey="storage"
                  name="Storage"
                  fill="#9b8afb"
                  radius={[5, 5, 0, 0]}
                  maxBarSize={22}
                />
                <Legend
                  iconType="circle"
                  wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
      <div className="dashboard-grid analytics-bottom">
        <section className="panel">
          <div className="panel-heading">
            <div>
              <h2>Key business metrics</h2>
              <p>Performance at a glance</p>
            </div>
          </div>
          <div className="metric-rows">
            <div>
              <span>
                <i className="metric-dot blue-dot" />
                Average revenue per user
              </span>
              <strong>
                $16.84 <small className="positive">+6.2%</small>
              </strong>
            </div>
            <div>
              <span>
                <i className="metric-dot green-dot" />
                Lifetime value (LTV)
              </span>
              <strong>
                $482.20 <small className="positive">+9.8%</small>
              </strong>
            </div>
            <div>
              <span>
                <i className="metric-dot orange-dot" />
                Customer acquisition cost
              </span>
              <strong>
                $32.40 <small className="negative">−2.1%</small>
              </strong>
            </div>
            <div>
              <span>
                <i className="metric-dot violet-dot" />
                Trial conversion rate
              </span>
              <strong>
                18.7% <small className="positive">+3.4%</small>
              </strong>
            </div>
          </div>
        </section>
        <section className="panel usage-callout">
          <div className="usage-callout-icon">
            <Gauge size={22} />
          </div>
          <div>
            <h2>You're using 84.6% of your monthly capacity</h2>
            <p>
              Your workspace is performing well. Consider upgrading before
              reaching your usage limit.
            </p>
            <div className="usage-progress">
              <span />
            </div>
            <div className="usage-progress-label">
              <span>Monthly capacity</span>
              <strong>84.6%</strong>
            </div>
            <button
              className="text-link"
              onClick={() =>
                onToast("Plan recommendations are ready to review.", "info")
              }
            >
              Review recommendations <span>→</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
