import React from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  CreditCard,
  Download,
  MoreHorizontal,
  Plus,
  Users,
  Wallet,
  Zap,
} from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import StatCard from "../components/StatCard";
import { Avatar, StatusBadge } from "../components/DataTable";
import { revenueData, initialUsers } from "../data/mockData";

const planMix = [
  { name: "Starter", value: 1284, color: "#9b8afb" },
  { name: "Pro", value: 864, color: "#5685f7" },
  { name: "Business", value: 342, color: "#f6a45c" },
  { name: "Enterprise", value: 86, color: "#38bfa1" },
];
const activities = [
  {
    title: "New subscription",
    text: "Olivia Rhye subscribed to Business",
    time: "2 min ago",
    type: "green",
  },
  {
    title: "Payment received",
    text: "$249.00 payment from Orbit Labs",
    time: "18 min ago",
    type: "blue",
  },
  {
    title: "Trial started",
    text: "Lana Steiner started a 14-day trial",
    time: "42 min ago",
    type: "purple",
  },
  {
    title: "Payment failed",
    text: "Candice Wu's payment needs attention",
    time: "1 hr ago",
    type: "orange",
  },
];

export default function Overview({ onNavigate, onToast }) {
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">TUESDAY, OCTOBER 13, 2026</div>
          <h1>
            Good afternoon, Admin <span className="wave">✦</span>
          </h1>
          <p>Here's what's happening with your SaaS business today.</p>
        </div>
        <div className="heading-actions">
          <button
            className="button button-secondary"
            onClick={() =>
              onToast("Your report is ready to export.", "success")
            }
          >
            <Download size={16} /> Export report
          </button>
          <button
            className="button button-primary"
            onClick={() => onNavigate("Plans")}
          >
            <Plus size={17} /> Manage plans
          </button>
        </div>
      </div>
      <div className="stat-grid">
        <StatCard
          label="Total revenue"
          value="$42,680"
          change="12.8%"
          detail="vs. last month"
          icon={Wallet}
          tone="blue"
        />
        <StatCard
          label="Active subscriptions"
          value="2,576"
          change="8.2%"
          detail="vs. last month"
          icon={CreditCard}
          tone="violet"
        />
        <StatCard
          label="Total customers"
          value="3,842"
          change="6.4%"
          detail="vs. last month"
          icon={Users}
          tone="green"
        />
        <StatCard
          label="Usage this month"
          value="84.6%"
          change="2.1%"
          detail="vs. last month"
          icon={Zap}
          tone="orange"
        />
      </div>
      <div className="dashboard-grid main-charts">
        <section className="panel revenue-panel">
          <div className="panel-heading">
            <div>
              <h2>Revenue overview</h2>
              <p>Track your recurring revenue over time</p>
            </div>
            <button className="select-button">
              Last 6 months <span>⌄</span>
            </button>
          </div>
          <div className="revenue-summary">
            <strong>$42,680</strong>
            <span className="positive">
              <ArrowUpRight size={15} /> 12.8%
            </span>
            <small>vs. $37,850 last month</small>
          </div>
          <div className="chart-legend">
            <span>
              <i className="legend-current" /> This period
            </span>
            <span>
              <i className="legend-previous" /> Previous period
            </span>
          </div>
          <div className="chart-area">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={revenueData}
                margin={{ top: 8, right: 5, left: -18, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#5578f6" stopOpacity={0.18} />
                    <stop offset="95%" stopColor="#5578f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf0f6" vertical={false} />
                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 12 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#9299aa", fontSize: 11 }}
                  tickFormatter={(v) => `$${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v) => [
                    `$${Number(v).toLocaleString()}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    border: "1px solid #edf0f6",
                    borderRadius: 12,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="previous"
                  stroke="#b9c4e4"
                  strokeDasharray="5 5"
                  strokeWidth={2}
                  fill="transparent"
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#5578f6"
                  strokeWidth={2.5}
                  fill="url(#revenueFill)"
                  activeDot={{ r: 5, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </section>
        <section className="panel plan-panel">
          <div className="panel-heading">
            <div>
              <h2>Subscription mix</h2>
              <p>Customers by pricing plan</p>
            </div>
            <button
              className="icon-button"
              aria-label="More subscription options"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
          <div className="donut-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={planMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="67%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="none"
                  cornerRadius={4}
                >
                  {planMix.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(v) => [v.toLocaleString(), "Subscribers"]}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="donut-center">
              <strong>2,576</strong>
              <span>Subscribers</span>
            </div>
          </div>
          <div className="plan-legend">
            {planMix.map((plan) => (
              <div key={plan.name}>
                <span>
                  <i style={{ background: plan.color }} />
                  {plan.name}
                </span>
                <strong>{plan.value.toLocaleString()}</strong>
                <small>{((plan.value / 2576) * 100).toFixed(1)}%</small>
              </div>
            ))}
          </div>
          <button
            className="text-link full-link"
            onClick={() => onNavigate("Plans")}
          >
            View all plans <ArrowRight size={15} />
          </button>
        </section>
      </div>
      <div className="dashboard-grid lower-grid">
        <section className="panel activity-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Latest updates across your workspace</p>
            </div>
            <button
              className="text-link"
              onClick={() => onNavigate("Subscriptions")}
            >
              View all <ArrowRight size={15} />
            </button>
          </div>
          <div className="activity-list">
            {activities.map((item) => (
              <div className="activity-item" key={item.title}>
                <div className={`activity-symbol ${item.type}`}>
                  {item.type === "green" ? (
                    <CreditCard size={17} />
                  ) : item.type === "blue" ? (
                    <Wallet size={17} />
                  ) : item.type === "purple" ? (
                    <Users size={17} />
                  ) : (
                    <ArrowDownRight size={17} />
                  )}
                </div>
                <div className="activity-copy">
                  <strong>{item.title}</strong>
                  <span>{item.text}</span>
                </div>
                <time>{item.time}</time>
              </div>
            ))}
          </div>
        </section>
        <section className="panel customers-panel">
          <div className="panel-heading">
            <div>
              <h2>New customers</h2>
              <p>Recently joined your platform</p>
            </div>
            <button className="text-link" onClick={() => onNavigate("Users")}>
              View all <ArrowRight size={15} />
            </button>
          </div>
          <div className="new-customer-list">
            {initialUsers.slice(0, 5).map((user, index) => (
              <div className="new-customer" key={user.id}>
                <Avatar name={user.name} index={index} />
                <div className="customer-identity">
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <div className="customer-plan">
                  <strong>{user.plan}</strong>
                  <StatusBadge status={user.status} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
