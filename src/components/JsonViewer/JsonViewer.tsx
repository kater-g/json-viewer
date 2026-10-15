import { useState } from "react";
import { JsonNode } from "../JsonNode/JsonNode";
import "./JsonViewer.css";

interface Props {
  data: unknown;
  searchQuery: string;
  onPathSelect: (path: string) => void;
}

export const JsonViewer = ({ data, searchQuery, onPathSelect }: Props) => {
  const [expandAll, setExpandAll] = useState(false);

  return (
    <div className="json-viewer">
      <div className="json-viewer__controls">
        <button
          className="json-viewer__btn"
          onClick={() => setExpandAll(!expandAll)}
        >
          {expandAll ? "▼ Свернуть всё" : "▶ Развернуть всё"}
        </button>
      </div>

      <div className="json-viewer__tree">
        <JsonNode
          key={expandAll ? "expanded" : "collapsed"}
          name="root"
          value={data}
          forceExpand={expandAll}
          searchQuery={searchQuery}
          onPathSelect={onPathSelect}
        />
      </div>
    </div>
  );
};
