interface ErrorStateProps {
  title: string;
  description: string;
}

export function ErrorState({ title, description }: ErrorStateProps) {
  return (
    <div className="error-state">
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
