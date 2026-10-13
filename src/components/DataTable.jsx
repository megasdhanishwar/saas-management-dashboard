import React from "react";
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Search,
} from "lucide-react";

export function StatusBadge({ status }) {
  const key = String(status || "")
    .toLowerCase()
    .replace(/\s+/g, "-");
  return (
    <span className={`status-badge status-${key}`}>
      <i />
      {status}
    </span>
  );
}

export function Avatar({ name, index = 0 }) {
  const colors = [
    "avatar-lilac",
    "avatar-peach",
    "avatar-mint",
    "avatar-blue",
    "avatar-pink",
  ];
  const initials = String(name || "?")
    .split(/[\s@._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
  return (
    <span className={`person-avatar ${colors[index % colors.length]}`}>
      {initials}
    </span>
  );
}

export default function DataTable({
  columns,
  rows,
  rowKey = "id",
  page,
  pageSize,
  total,
  onPage,
  emptyText = "No matching records found",
}) {
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return (
    <div className="table-shell">
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key}>
                  {col.label}
                  {col.sortable && <ChevronDown size={13} />}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length ? (
              rows.map((row, index) => (
                <tr key={row[rowKey] || index}>
                  {columns.map((col) => (
                    <td key={col.key}>
                      {col.render ? col.render(row, index) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>
                  <div className="empty-state">
                    <div className="empty-icon">
                      <Search size={22} />
                    </div>
                    <strong>{emptyText}</strong>
                    <span>Try adjusting your search or filters.</span>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="table-footer">
        <span>
          Showing{" "}
          <strong>
            {total ? (page - 1) * pageSize + 1 : 0}–
            {Math.min(page * pageSize, total)}
          </strong>{" "}
          of <strong>{total}</strong> results
        </span>
        <div className="pagination">
          <button
            onClick={() => onPage(Math.max(1, page - 1))}
            disabled={page <= 1}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>
          <span>
            Page {page} of {pageCount}
          </span>
          <button
            onClick={() => onPage(Math.min(pageCount, page + 1))}
            disabled={page >= pageCount}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export function TableActions({ onView, onEdit, onDelete }) {
  return (
    <div className="row-actions">
      {onView && (
        <button onClick={onView} title="View details">
          View
        </button>
      )}
      {onEdit && (
        <button onClick={onEdit} title="Edit">
          Edit
        </button>
      )}
      {onDelete && (
        <button className="danger-action" onClick={onDelete} title="Delete">
          <MoreHorizontal size={17} />
        </button>
      )}
    </div>
  );
}
