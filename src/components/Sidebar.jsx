import React from "react";
import {
  Activity,
  BarChart3,
  Boxes,
  CreditCard,
  LayoutDashboard,
  LifeBuoy,
  Settings,
  Users,
  User,
  X,
  Zap,
} from "lucide-react";

const navItems = [
  { label: "Overview", icon: LayoutDashboard },
  { label: "Users", icon: Users },
  { label: "Subscriptions", icon: CreditCard },
  { label: "Plans", icon: Boxes },
  { label: "Analytics", icon: BarChart3 },
];

export default function Sidebar({
  activePage,
  onNavigate,
  mobileOpen,
  onClose,
}) {
  return (
    <>
      {mobileOpen && (
        <button
          className="mobile-scrim"
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
      <aside className={`sidebar ${mobileOpen ? "sidebar-open" : ""}`}>
        <div className="brand-row">
          <div className="brand-mark">
            <Zap size={20} fill="currentColor" />
          </div>
          <div className="brand-name">
            stack<span>saas</span>
          </div>
          <button
            className="icon-button sidebar-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X size={19} />
          </button>
        </div>
        <div className="workspace-switch">
          <div className="workspace-avatar">O</div>
          <div className="workspace-copy">
            <strong>Stackly Workspace</strong>
            <small>Free workspace</small>
          </div>
          {/* <span className="chevrons">⌃<br />⌄</span> */}
        </div>
        <div className="nav-caption">WORKSPACE</div>
        <nav className="nav-list">
          {navItems.map(({ label, icon: Icon }) => (
            <button
              key={label}
              className={`nav-item ${activePage === label ? "active" : ""}`}
              onClick={() => {
                onNavigate(label);
                onClose();
              }}
            >
              <Icon size={18} strokeWidth={1.8} />
              <span>{label}</span>
              {label === "Subscriptions" && (
                <span className="nav-count">9</span>
              )}
            </button>
          ))}
        </nav>
        {/* <div className="nav-caption tools-caption">TOOLS</div>
        <button className="nav-item" onClick={() => onNavigate("Analytics")}><Activity size={18} /><span>Usage insights</span></button>
        <button className="nav-item" onClick={() => onNavigate("Plans")}><LifeBuoy size={18} /><span>Billing & plans</span></button> */}
        <div className="sidebar-bottom">
          {/* <div className="upgrade-card">
            <div className="upgrade-icon"><Zap size={16} /></div>
            <strong>Unlock more with Pro</strong>
            <p>Get deeper insights and automate your workflow.</p>
            <button onClick={() => onNavigate("Plans")}>Explore plans <span>→</span></button>
          </div> */}
          <button
            className="nav-item settings-item"
            onClick={() => onNavigate("Analytics")}
          >
            <Settings size={18} />
            <span>Settings</span>
          </button>
          <div className="profile-row">
            <div className="profile-avatar">
              <User size={20} />
            </div>
            <div className="profile-copy">
              <strong>Admin</strong>
              <small>Admin account</small>
            </div>
            <span className="profile-menu">•••</span>
          </div>
        </div>
      </aside>
    </>
  );
}
