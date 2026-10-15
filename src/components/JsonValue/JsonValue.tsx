import "./JsonValue.css";

interface Props {
  value: unknown;
  highlight?: boolean;
}

export const JsonValue = ({ value, highlight = false }: Props) => {
  const className = highlight
    ? "json-value json-value--highlight"
    : "json-value";

  if (value === null) {
    return <span className={`${className} json-value--null`}>null</span>;
  }

  switch (typeof value) {
    case "string":
      return <span className={`${className} json-value--string`}>{value}</span>;
    case "number":
      return <span className={`${className} json-value--number`}>{value}</span>;
    case "boolean":
      return (
        <span className={`${className} json-value--boolean`}>
          {String(value)}
        </span>
      );
    default:
      return <span className={className}>{String(value)}</span>;
  }
};
