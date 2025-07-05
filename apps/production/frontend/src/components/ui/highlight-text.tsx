interface HighlightTextProps {
  text: string;
  query: string;
  className?: string;
}

export function HighlightText({
  text,
  query,
  className = "",
}: HighlightTextProps) {
  if (!query.trim()) return <span className={className}>{text}</span>;

  const parts = text.split(new RegExp(`(${query})`, "gi"));

  return (
    <span className={className}>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark
            key={i}
            className="bg-yellow-100 text-yellow-900 rounded px-0.5 mx-0.5"
          >
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </span>
  );
}
