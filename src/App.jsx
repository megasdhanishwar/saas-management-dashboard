import React, { useCallback, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Menu, RefreshCw } from "lucide-react";
import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";
import Toast from "./components/Toast";
import Overview from "./pages/Overview";
import UsersPage from "./pages/Users";
import Subscriptions from "./pages/Subscriptions";
import Plans from "./pages/Plans";
import Analytics from "./pages/Analytics";
import {
  initialPlans,
  initialSubscriptions,
  initialUsers,
} from "./data/mockData";

export default function App() {
  const [activePage, setActivePage] = useState("Overview");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [users] = useState(initialUsers);
  const [subscriptions] = useState(initialSubscriptions);
  const [plans, setPlans] = useState(initialPlans);
  const [loading, setLoading] = useState(false);
  const showToast = useCallback(
    (message, type = "success") => setToast({ message, type, id: Date.now() }),
    [],
  );
  const closeToast = useCallback(() => setToast(null), []);
  const navigate = useCallback((page) => {
    setActivePage(page);
    setGlobalSearch("");
  }, []);
  const pageContent = useMemo(() => {
    switch (activePage) {
      case "Users":
        return (
          <UsersPage
            users={users}
            onNavigate={navigate}
            onToast={showToast}
            globalSearch={globalSearch}
          />
        );
      case "Subscriptions":
        return (
          <Subscriptions
            subscriptions={subscriptions}
            onToast={showToast}
            globalSearch={globalSearch}
          />
        );
      case "Plans":
        return (
          <Plans
            plans={plans}
            setPlans={setPlans}
            onToast={showToast}
            globalSearch={globalSearch}
          />
        );
      case "Analytics":
        return <Analytics onToast={showToast} />;
      default:
        return <Overview onNavigate={navigate} onToast={showToast} />;
    }
  }, [
    activePage,
    users,
    subscriptions,
    plans,
    globalSearch,
    navigate,
    showToast,
  ]);
  const simulateRefresh = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      showToast("Dashboard data refreshed.", "success");
    }, 650);
  };
  return (
    <div className="app-shell">
      <Sidebar
        activePage={activePage}
        onNavigate={navigate}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <div className="main-shell">
        <Topbar
          activePage={activePage}
          onMenu={() => setMobileOpen(true)}
          searchValue={globalSearch}
          onSearch={setGlobalSearch}
        />
        <main className="main-content">
          <div className="content-toolbar">
            <div className="live-indicator">
              <span /> All systems operational
            </div>
            <button
              className="refresh-button"
              onClick={simulateRefresh}
              disabled={loading}
            >
              {loading ? (
                <RefreshCw className="spin" size={14} />
              ) : (
                <RefreshCw size={14} />
              )}{" "}
              {loading ? "Refreshing..." : "Refresh data"}
            </button>
          </div>
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner" />
              <strong>Refreshing your workspace</strong>
              <span>Getting the latest metrics...</span>
            </div>
          ) : (
            pageContent
          )}
          <footer className="app-footer">
            <span>© 2026 Orbit SaaS, Inc.</span>
            <span>
              <i /> All systems normal <b>·</b>{" "}
              <a
                href="#support"
                onClick={(e) => {
                  e.preventDefault();
                  showToast("Support center coming soon.", "info");
                }}
              >
                Help & support
              </a>
            </span>
          </footer>
        </main>
      </div>
      <Toast toast={toast} onClose={closeToast} />
    </div>
  );
}
