import React, { useMemo, useState } from "react";
import {
  CalendarDays,
  Download,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import DataTable, { Avatar, StatusBadge } from "../components/DataTable";

export default function Subscriptions({
  subscriptions,
  onToast,
  globalSearch,
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const [range, setRange] = useState("all");
  const [sort, setSort] = useState("renewal");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = useMemo(
    () =>
      subscriptions
        .filter((s) => {
          const q = (query || globalSearch).toLowerCase();
          const date = new Date(s.renewal);
          const inRange =
            range === "all" ||
            (range === "30" &&
              date >= new Date("2026-10-13") &&
              date <= new Date("2026-11-12")) ||
            (range === "7" &&
              date >= new Date("2026-10-13") &&
              date <= new Date("2026-10-20"));
          return (
            (!q ||
              `${s.customer} ${s.email} ${s.id} ${s.plan}`
                .toLowerCase()
                .includes(q)) &&
            (status === "All status" || s.status === status) &&
            inRange
          );
        })
        .sort((a, b) =>
          sort === "amount"
            ? b.amount - a.amount
            : sort === "customer"
              ? a.customer.localeCompare(b.customer)
              : a.renewal.localeCompare(b.renewal),
        ),
    [subscriptions, query, globalSearch, status, range, sort],
  );
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">BILLING MANAGEMENT</div>
          <h1>Subscriptions</h1>
          <p>Monitor renewals, plan changes, and billing status.</p>
        </div>
        <div className="heading-actions">
          <button
            className="button button-secondary"
            onClick={() => onToast("Subscription report exported.", "success")}
          >
            <Download size={16} /> Export report
          </button>
        </div>
      </div>
      <div className="stat-grid compact-stats">
        <div className="mini-stat">
          <span>Monthly recurring revenue</span>
          <strong>$42,680</strong>
          <small className="positive">↑ 12.8% vs last month</small>
        </div>
        <div className="mini-stat">
          <span>Active subscriptions</span>
          <strong>
            {subscriptions
              .filter((s) => s.status === "Active")
              .length.toLocaleString()}
          </strong>
          <small>Across all plans</small>
        </div>
        <div className="mini-stat">
          <span>Renewing in 7 days</span>
          <strong>
            {
              subscriptions.filter(
                (s) => s.renewal >= "2026-10-13" && s.renewal <= "2026-10-20",
              ).length
            }
          </strong>
          <small>Upcoming renewals</small>
        </div>
        <div className="mini-stat">
          <span>Past due</span>
          <strong>
            {subscriptions.filter((s) => s.status === "Past due").length}
          </strong>
          <small className="warning-text">Payment follow-up</small>
        </div>
      </div>
      <section className="panel table-panel">
        <div className="table-panel-heading">
          <div>
            <h2>
              All subscriptions{" "}
              <span className="count-badge">{filtered.length}</span>
            </h2>
            <p>Manage billing status and upcoming renewals.</p>
          </div>
          <button
            className="button button-secondary button-small"
            onClick={() => {
              setQuery("");
              setStatus("All status");
              setRange("all");
              setPage(1);
            }}
          >
            <SlidersHorizontal size={15} /> Reset
          </button>
        </div>
        <div className="table-toolbar">
          <label className="table-search">
            <Search size={16} />
            <input
              placeholder="Search subscriptions..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <div className="filter-controls">
            <label className="filter-select">
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
              >
                <option>All status</option>
                <option>Active</option>
                <option>Trial</option>
                <option>Past due</option>
                <option>Canceled</option>
              </select>
            </label>
            <label className="filter-select">
              <CalendarDays size={14} />
              <select
                value={range}
                onChange={(e) => {
                  setRange(e.target.value);
                  setPage(1);
                }}
              >
                <option value="all">Any renewal date</option>
                <option value="7">Next 7 days</option>
                <option value="30">Next 30 days</option>
              </select>
            </label>
            <select
              className="filter-select plain-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="renewal">Renewal date</option>
              <option value="amount">Amount high-low</option>
              <option value="customer">Customer A–Z</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={[
            {
              key: "customer",
              label: "Customer",
              render: (s, i) => (
                <div className="table-person">
                  <Avatar name={s.customer} index={i} />
                  <div>
                    <strong>{s.customer}</strong>
                    <span>{s.email}</span>
                  </div>
                </div>
              ),
            },
            {
              key: "id",
              label: "Subscription ID",
              render: (s) => <span className="id-cell">{s.id}</span>,
            },
            {
              key: "plan",
              label: "Plan",
              render: (s) => (
                <span className={`plan-chip plan-${s.plan.toLowerCase()}`}>
                  {s.plan}
                </span>
              ),
            },
            {
              key: "amount",
              label: "Amount",
              render: (s) => (
                <strong>
                  ${s.amount.toLocaleString()}
                  <span className="per-month">
                    {" "}
                    / {s.billing === "Yearly" ? "yr" : "mo"}
                  </span>
                </strong>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (s) => <StatusBadge status={s.status} />,
            },
            {
              key: "renewal",
              label: "Next renewal",
              render: (s) => (
                <span className="muted-cell">
                  {s.renewal === "—"
                    ? "—"
                    : new Date(s.renewal + "T00:00:00").toLocaleDateString(
                        "en-US",
                        { month: "short", day: "numeric", year: "numeric" },
                      )}
                </span>
              ),
            },
          ]}
          rows={filtered.slice((page - 1) * pageSize, page * pageSize)}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPage={setPage}
        />
      </section>
    </div>
  );
}
