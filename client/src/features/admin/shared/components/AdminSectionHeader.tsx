import type { PropsWithChildren } from "react";

interface AdminSectionHeaderProps extends PropsWithChildren {
  title: string;
  description: string;
}

export function AdminSectionHeader({
  children,
  description,
  title,
}: AdminSectionHeaderProps) {
  return (
    <div className="admin-section-header">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      {children ? <div className="admin-section-header__actions">{children}</div> : null}
    </div>
  );
}
