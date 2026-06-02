import type { PropsWithChildren } from "react";

interface SectionHeadingProps extends PropsWithChildren {
  eyebrow: string;
  title: string;
}

export function SectionHeading({ children, eyebrow, title }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <span className="section-heading__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
