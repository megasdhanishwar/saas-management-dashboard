import React, { useMemo, useState } from "react";
import {
  Check,
  Edit3,
  MoreHorizontal,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import Modal from "../components/Modal";
import { StatusBadge } from "../components/DataTable";

const emptyPlan = {
  name: "",
  description: "",
  price: "",
  interval: "month",
  users: "5",
  features: "",
  status: "Active",
  subscribers: 0,
  color: "blue",
};

export default function Plans({ plans, setPlans, onToast, globalSearch }) {
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyPlan);
  const [errors, setErrors] = useState({});
  const [confirm, setConfirm] = useState(null);
  const filtered = useMemo(
    () =>
      plans.filter((p) =>
        `${p.name} ${p.description}`
          .toLowerCase()
          .includes((query || globalSearch).toLowerCase()),
      ),
    [plans, query, globalSearch],
  );
  const openAdd = () => {
    setEditing(null);
    setForm(emptyPlan);
    setErrors({});
    setModal(true);
  };
  const openEdit = (plan) => {
    setEditing(plan.id);
    setForm({ ...plan, price: String(plan.price), users: String(plan.users) });
    setErrors({});
    setModal(true);
  };
  const update = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };
  const save = (e) => {
    e.preventDefault();
    const next = {};
    if (!form.name.trim()) next.name = "Enter a plan name.";
    if (
      form.price === "" ||
      !Number.isFinite(Number(form.price)) ||
      Number(form.price) < 0
    )
      next.price = "Enter a valid price.";
    if (!form.description.trim()) next.description = "Add a short description.";
    if (!form.features.trim()) next.features = "Add at least one feature.";
    if (!form.users || Number(form.users) < 1)
      next.users = "Seat limit must be at least 1.";
    if (Object.keys(next).length) {
      setErrors(next);
      return;
    }
    if (editing) {
      setPlans((prev) =>
        prev.map((p) =>
          p.id === editing
            ? {
                ...p,
                ...form,
                price: Number(form.price),
                users: Number(form.users),
              }
            : p,
        ),
      );
      onToast("Plan updated successfully.");
    } else {
      setPlans((prev) => [
        ...prev,
        {
          ...form,
          id: `PLN-${String(Date.now()).slice(-5)}`,
          price: Number(form.price),
          users: Number(form.users),
          subscribers: 0,
        },
      ]);
      onToast("New plan created successfully.");
    }
    setModal(false);
  };
  const remove = () => {
    setPlans((prev) => prev.filter((p) => p.id !== confirm.id));
    onToast(`${confirm.name} plan deleted.`);
    setConfirm(null);
  };
  return (
    <div className="page-content">
      <div className="page-heading">
        <div>
          <div className="eyebrow">PRODUCT & BILLING</div>
          <h1>Pricing plans</h1>
          <p>
            Create flexible plans that fit every stage of your customer's
            journey.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button button-primary" onClick={openAdd}>
            <Plus size={17} /> Create plan
          </button>
        </div>
      </div>
      <div className="plans-toolbar">
        <div className="plans-intro">
          <div className="plans-title-icon">
            <Users size={20} />
          </div>
          <div>
            <strong>{plans.length} pricing plans</strong>
            <span>Manage your products, pricing, and included features.</span>
          </div>
        </div>
        <label className="table-search">
          <Search size={16} />
          <input
            placeholder="Search plans..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      </div>
      {filtered.length ? (
        <div className="plans-grid">
          {filtered.map((plan) => (
            <article
              className={`plan-card ${plan.color || "blue"}`}
              key={plan.id}
            >
              <div className="plan-card-top">
                <div className={`plan-symbol ${plan.color || "blue"}`}>
                  {plan.name.slice(0, 1)}
                </div>
                <button
                  className="icon-button"
                  aria-label={`Edit ${plan.name}`}
                  onClick={() => openEdit(plan)}
                >
                  <MoreHorizontal size={19} />
                </button>
              </div>
              <div className="plan-name-row">
                <h2>{plan.name}</h2>
                <StatusBadge status={plan.status} />
              </div>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-price">
                <strong>${Number(plan.price).toLocaleString()}</strong>
                <span> / {plan.interval}</span>
              </div>
              <div className="plan-subscribers">
                <Users size={15} />
                <strong>{plan.subscribers.toLocaleString()}</strong> subscribers
              </div>
              <div className="plan-divider" />
              <div className="plan-feature-heading">What's included</div>
              <ul className="feature-list">
                {plan.features.split(",").map((feature) => (
                  <li key={feature}>
                    <span>
                      <Check size={13} />
                    </span>
                    {feature.trim()}
                  </li>
                ))}
              </ul>
              <div className="plan-seats">
                <span>Seat limit</span>
                <strong>
                  {Number(plan.users) >= 999 ? "Unlimited" : plan.users} users
                </strong>
              </div>
              <div className="plan-card-actions">
                <button
                  className="button button-secondary"
                  onClick={() => openEdit(plan)}
                >
                  <Edit3 size={15} /> Edit plan
                </button>
                <button
                  className="icon-button delete-plan"
                  onClick={() => setConfirm(plan)}
                  aria-label={`Delete ${plan.name}`}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="panel plans-empty">
          <div className="empty-icon">
            <Search size={22} />
          </div>
          <strong>No plans found</strong>
          <span>Try another search or create a new plan.</span>
          <button className="button button-primary" onClick={openAdd}>
            <Plus size={16} /> Create plan
          </button>
        </div>
      )}
      {modal && (
        <Modal
          title={editing ? "Edit pricing plan" : "Create pricing plan"}
          subtitle="Set the details and features included in this subscription."
          onClose={() => setModal(false)}
        >
          <form className="plan-form" onSubmit={save} noValidate>
            <div className="form-field">
              <label htmlFor="plan-name">
                Plan name <span>*</span>
              </label>
              <input
                id="plan-name"
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Growth"
              />
              {errors.name && (
                <small className="field-error">{errors.name}</small>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="plan-description">
                Description <span>*</span>
              </label>
              <input
                id="plan-description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
                placeholder="Who is this plan for?"
              />
              {errors.description && (
                <small className="field-error">{errors.description}</small>
              )}
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="plan-price">
                  Price (USD) <span>*</span>
                </label>
                <div className="input-prefix">
                  <span>$</span>
                  <input
                    id="plan-price"
                    type="number"
                    min="0"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="49"
                  />
                </div>
                {errors.price && (
                  <small className="field-error">{errors.price}</small>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="plan-interval">Billing interval</label>
                <select
                  id="plan-interval"
                  value={form.interval}
                  onChange={(e) => update("interval", e.target.value)}
                >
                  <option value="month">Monthly</option>
                  <option value="year">Yearly</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="plan-users">Seat limit</label>
                <input
                  id="plan-users"
                  type="number"
                  min="1"
                  value={form.users}
                  onChange={(e) => update("users", e.target.value)}
                />
                {errors.users && (
                  <small className="field-error">{errors.users}</small>
                )}
              </div>
              <div className="form-field">
                <label htmlFor="plan-status">Plan status</label>
                <select
                  id="plan-status"
                  value={form.status}
                  onChange={(e) => update("status", e.target.value)}
                >
                  <option>Active</option>
                  <option>Draft</option>
                  <option>Archived</option>
                </select>
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="plan-features">
                Features <span>*</span>
              </label>
              <textarea
                id="plan-features"
                rows="3"
                value={form.features}
                onChange={(e) => update("features", e.target.value)}
                placeholder="Separate features with commas"
              />
              <small className="field-hint">
                Separate each feature with a comma.
              </small>
              {errors.features && (
                <small className="field-error">{errors.features}</small>
              )}
            </div>
            <div className="form-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setModal(false)}
              >
                Cancel
              </button>
              <button type="submit" className="button button-primary">
                {editing ? "Save changes" : "Create plan"}
              </button>
            </div>
          </form>
        </Modal>
      )}
      {confirm && (
        <Modal
          title="Delete pricing plan?"
          subtitle={`Are you sure you want to delete ${confirm.name}? This action cannot be undone.`}
          onClose={() => setConfirm(null)}
        >
          <div className="confirm-actions">
            <button
              className="button button-secondary"
              onClick={() => setConfirm(null)}
            >
              Cancel
            </button>
            <button className="button button-danger" onClick={remove}>
              <Trash2 size={15} /> Delete plan
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
