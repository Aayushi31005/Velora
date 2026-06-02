interface QuantitySelectorProps {
  disabled?: boolean;
  max?: number;
  min?: number;
  onChange: (nextValue: number) => void;
  value: number;
}

export function QuantitySelector({
  disabled = false,
  max = 99,
  min = 1,
  onChange,
  value,
}: QuantitySelectorProps) {
  return (
    <div className="quantity-selector">
      <button
        className="quantity-selector__button"
        disabled={disabled || value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        type="button"
      >
        -
      </button>
      <span>{value}</span>
      <button
        className="quantity-selector__button"
        disabled={disabled || value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        type="button"
      >
        +
      </button>
    </div>
  );
}
