import React from "react";
import { Bell, ChevronDown, Menu, Search, User } from "lucide-react";

export default function Topbar({ activePage, onMenu, searchValue, onSearch }) {
  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="icon-button menu-button"
          onClick={onMenu}
          aria-label="Open menu"
        >
          <Menu size={21} />
        </button>
        <div className="breadcrumbs">
          <span>Workspace</span>
          <b>/</b>
          <strong>{activePage}</strong>
        </div>
      </div>
      <div className="topbar-actions">
        <label className="global-search">
          <Search size={17} />
          <input
            value={searchValue}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search anything..."
          />
          {/* <kbd>⌘ K</kbd> */}
        </label>
        <button
          className="icon-button notification-button"
          aria-label="Notifications"
        >
          <Bell size={19} />
          <i />
        </button>
        <div className="topbar-divider" />
        <button className="top-profile">
          <span className="profile-avatar small-avatar">
            <User size={20} />
          </span>
          <span className="top-profile-name">Admin</span>
          <ChevronDown size={15} />
        </button>
      </div>
    </header>
  );
}
