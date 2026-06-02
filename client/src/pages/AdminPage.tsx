import { Link } from "react-router-dom";

import { useAnalyticsSummary } from "../features/admin/analytics/hooks/useAnalyticsSummary";
import { AdminMetricCard } from "../features/admin/shared/components/AdminMetricCard";
import { AdminSectionHeader } from "../features/admin/shared/components/AdminSectionHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AdminPage() {
  useDocumentTitle("Admin");
  const analyticsQuery = useAnalyticsSummary();

  return (
    <div className="stack">
      <section className="panel">
        <AdminSectionHeader
          description="This dashboard prioritizes clarity, workflow speed, and operational visibility."
          title="Admin overview"
        >
          <Link className="button-primary" to="/admin/products">
            Manage catalog
          </Link>
        </AdminSectionHeader>
      </section>
      {analyticsQuery.data ? (
        <div className="admin-metric-grid">
          <AdminMetricCard label="Products" value={analyticsQuery.data.totalProducts} />
          <AdminMetricCard label="Orders" value={analyticsQuery.data.totalOrders} />
          <AdminMetricCard
            label="Revenue"
            tone="success"
            value={`$${analyticsQuery.data.revenue.toFixed(2)}`}
          />
          <AdminMetricCard
            label="Low stock"
            tone="warning"
            value={analyticsQuery.data.lowStockCount}
          />
        </div>
      ) : null}
      <section className="panel">
        <AdminSectionHeader
          description="The dashboard modules below map directly to backend admin APIs and protected workflows."
          title="Operational surfaces"
        />
        <div className="admin-shortcuts">
          <Link className="admin-shortcut" to="/admin/products">
            Product management
          </Link>
          <Link className="admin-shortcut" to="/admin/categories">
            Category management
          </Link>
          <Link className="admin-shortcut" to="/admin/orders">
            Order operations
          </Link>
          <Link className="admin-shortcut" to="/admin/analytics">
            Analytics overview
          </Link>
        </div>
      </section>
    </div>
  );
}
