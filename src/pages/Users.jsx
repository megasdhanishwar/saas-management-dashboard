import React, { useMemo, useState } from "react";
import {
  Download,
  Filter,
  Plus,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import DataTable, { Avatar, StatusBadge } from "../components/DataTable";

export default function UsersPage({
  users,
  onNavigate,
  onToast,
  globalSearch,
}) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All status");
  const [plan, setPlan] = useState("All plans");
  const [sort, setSort] = useState("newest");
  const [page, setPage] = useState(1);
  const pageSize = 6;
  const filtered = useMemo(
    () =>
      users
        .filter((u) => {
          const q = (query || globalSearch).toLowerCase();
          return (
            (!q ||
              `${u.name} ${u.email} ${u.company} ${u.id}`
                .toLowerCase()
                .includes(q)) &&
            (status === "All status" || u.status === status) &&
            (plan === "All plans" || u.plan === plan)
          );
        })
        .sort((a, b) =>
          sort === "oldest"
            ? a.joined.localeCompare(b.joined)
            : sort === "name"
              ? a.name.localeCompare(b.name)
              : b.joined.localeCompare(a.joined),
        ),
    [users, query, globalSearch, status, plan, sort],
  );
  const pageRows = filtered.slice((page - 1) * pageSize, page * pageSize);
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">CUSTOMER RELATIONSHIPS</div>
          <h1>Users</h1>
          <p>Manage your customers and their account access.</p>
        </div>
        <div className="heading-actions">
          <button
            className="button button-secondary"
            onClick={() => onToast("Customer export prepared.", "success")}
          >
            <Download size={16} /> Export
          </button>
          <button
            className="button button-primary"
            onClick={() =>
              onToast(
                "Connect your user creation API to invite customers.",
                "info",
              )
            }
          >
            <Plus size={17} /> Add user
          </button>
        </div>
      </div>
      <div className="stat-grid compact-stats">
        <div className="mini-stat">
          <span>Total users</span>
          <strong>{users.length.toLocaleString()}</strong>
          <small>
            <i className="mini-dot green-dot" /> All accounts
          </small>
        </div>
        <div className="mini-stat">
          <span>Active users</span>
          <strong>
            {users.filter((u) => u.status === "Active").length.toLocaleString()}
          </strong>
          <small className="positive">↑ 8.4% this month</small>
        </div>
        <div className="mini-stat">
          <span>Trial accounts</span>
          <strong>{users.filter((u) => u.status === "Trial").length}</strong>
          <small>Free trial users</small>
        </div>
        <div className="mini-stat">
          <span>Past due</span>
          <strong>{users.filter((u) => u.status === "Past due").length}</strong>
          <small className="warning-text">Needs attention</small>
        </div>
      </div>
      <section className="panel table-panel">
        <div className="table-panel-heading">
          <div>
            <h2>
              All customers{" "}
              <span className="count-badge">{filtered.length}</span>
            </h2>
            <p>A complete list of people using your product.</p>
          </div>
          <button
            className="button button-secondary button-small"
            onClick={() => {
              setStatus("All status");
              setPlan("All plans");
              setQuery("");
              setPage(1);
            }}
          >
            <SlidersHorizontal size={15} /> Reset filters
          </button>
        </div>
        <div className="table-toolbar">
          <label className="table-search">
            <Search size={16} />
            <input
              placeholder="Search customers..."
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
            />
          </label>
          <div className="filter-controls">
            <label className="filter-select">
              <Filter size={14} />
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
                <option>Inactive</option>
              </select>
            </label>
            <select
              className="filter-select plain-select"
              value={plan}
              onChange={(e) => {
                setPlan(e.target.value);
                setPage(1);
              }}
            >
              <option>All plans</option>
              <option>Starter</option>
              <option>Pro</option>
              <option>Business</option>
              <option>Enterprise</option>
            </select>
            <select
              className="filter-select plain-select"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="name">Name A–Z</option>
            </select>
          </div>
        </div>
        <DataTable
          columns={[
            {
              key: "name",
              label: "Customer",
              render: (u, i) => (
                <div className="table-person">
                  <Avatar name={u.name} index={i} />
                  <div>
                    <strong>{u.name}</strong>
                    <span>{u.email}</span>
                  </div>
                </div>
              ),
            },
            { key: "company", label: "Company" },
            {
              key: "plan",
              label: "Plan",
              render: (u) => (
                <span className={`plan-chip plan-${u.plan.toLowerCase()}`}>
                  {u.plan}
                </span>
              ),
            },
            {
              key: "status",
              label: "Status",
              render: (u) => <StatusBadge status={u.status} />,
            },
            {
              key: "joined",
              label: "Date joined",
              render: (u) => (
                <span className="muted-cell">
                  {new Date(u.joined + "T00:00:00").toLocaleDateString(
                    "en-US",
                    { month: "short", day: "numeric", year: "numeric" },
                  )}
                </span>
              ),
            },
            {
              key: "spend",
              label: "Revenue",
              render: (u) => <strong>${u.spend.toLocaleString()}.00</strong>,
            },
          ]}
          rows={pageRows}
          page={page}
          pageSize={pageSize}
          total={filtered.length}
          onPage={setPage}
        />
      </section>
    </div>
  );
}
