import { ErrorState } from "../components/ErrorState";
import { useAnalyticsSummary } from "../features/admin/analytics/hooks/useAnalyticsSummary";
import { AdminMetricCard } from "../features/admin/shared/components/AdminMetricCard";
import { AdminSectionHeader } from "../features/admin/shared/components/AdminSectionHeader";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

export function AdminAnalyticsPage() {
  useDocumentTitle("Admin analytics");
  const analyticsQuery = useAnalyticsSummary();

  if (analyticsQuery.isError) {
    return (
      <ErrorState
        description="Analytics depends on the database-backed admin summary endpoint."
        title="Unable to load analytics"
      />
    );
  }

  const analytics = analyticsQuery.data;

  return (
    <section className="stack">
      <section className="panel">
        <AdminSectionHeader
          description="Simple operational metrics are better here than fake enterprise complexity."
          title="Analytics overview"
        />
      </section>
      {analytics ? (
        <div className="admin-metric-grid">
          <AdminMetricCard label="Total products" value={analytics.totalProducts} />
          <AdminMetricCard label="Total orders" value={analytics.totalOrders} />
          <AdminMetricCard label="Revenue" tone="success" value={`$${analytics.revenue.toFixed(2)}`} />
          <AdminMetricCard label="Low stock count" tone="warning" value={analytics.lowStockCount} />
        </div>
      ) : null}
    </section>
  );
}
