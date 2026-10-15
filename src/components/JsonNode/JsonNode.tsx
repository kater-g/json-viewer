import { useState } from "react";
import { JsonValue } from "../JsonValue/JsonValue";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import "./JsonNode.css";

interface Props {
  name: string;
  value: unknown;
  depth?: number;
  path?: string;
  forceExpand?: boolean;
  searchQuery?: string;
  onPathSelect?: (path: string) => void;
}

export const JsonNode = ({
  name,
  value,
  depth = 0,
  path = "root",
  forceExpand = false,
  searchQuery = "",
  onPathSelect,
}: Props) => {
  const [isCollapsed, setIsCollapsed] = useState(depth > 0 && !forceExpand);

  const { copy, showCopied } = useCopyToClipboard({ duration: 2000 });

  const isArray = Array.isArray(value);
  const isObject = value !== null && typeof value === "object";

  const matchesSearch =
    searchQuery.length > 0 &&
    (name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (typeof value === "string" &&
        value.toLowerCase().includes(searchQuery.toLowerCase())));

  const handleCopyPath = () => copy(path);

  const handleSelect = () => {
    onPathSelect?.(path);
  };

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleCollapse();
    }
  };

  const renderKey = () => (
    <span className="json-key-wrapper">
      <span
        className="json-key"
        onClick={(e) => {
          e.stopPropagation();
          handleCopyPath();
        }}
        title="Кликните, чтобы скопировать путь"
      >
        {name}:
      </span>
      <button
        className="json-copy-btn"
        onClick={(e) => {
          e.stopPropagation();
          handleCopyPath();
        }}
        aria-label="Копировать путь"
        type="button"
      >
        📋
      </button>
      {showCopied && (
        <span className="json-copied-tooltip" role="status" aria-live="polite">
          Скопировано!
        </span>
      )}
    </span>
  );

  if (!isObject) {
    return (
      <div
        className={`json-node json-node--primitive ${matchesSearch ? "json-node--highlight" : ""}`}
        onClick={handleSelect}
      >
        {renderKey()}
        <JsonValue value={value} highlight={matchesSearch} />
      </div>
    );
  }

  const entries = isArray
    ? (value as unknown[]).map((v, i) => [i, v] as const)
    : Object.entries(value as Record<string, unknown>);

  const preview = isArray
    ? `Array(${entries.length})`
    : `Object{${entries.length}}`;

  return (
    <div className={`json-node ${matchesSearch ? "json-node--highlight" : ""}`}>
      <div
        className="json-node__header"
        onClick={toggleCollapse}
        onKeyDown={handleKeyDown}
        role="button"
        tabIndex={0}
        aria-expanded={!isCollapsed}
      >
        <span className="json-node__arrow">{isCollapsed ? "▶" : "▼"}</span>
        {renderKey()}
        <span className="json-node__preview">{preview}</span>
      </div>

      {!isCollapsed && (
        <div className="json-node__children">
          {entries.map(([key, val]) => {
            const childPath = isArray ? `${path}[${key}]` : `${path}.${key}`;

            return (
              <JsonNode
                key={key}
                name={String(key)}
                value={val}
                depth={depth + 1}
                path={childPath}
                forceExpand={forceExpand}
                searchQuery={searchQuery}
                onPathSelect={onPathSelect}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};
