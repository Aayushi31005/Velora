interface AdminMetricCardProps {
  label: string;
  value: string | number;
  tone?: "default" | "warning" | "success";
}

export function AdminMetricCard({ label, tone = "default", value }: AdminMetricCardProps) {
  return (
    <article className={`admin-metric admin-metric--${tone}`}>
      <span className="metric-label">{label}</span>
      <strong className="metric-value">{value}</strong>
    </article>
  );
}
