import { useState, useMemo } from "react";
import { JsonViewer } from "./components/JsonViewer/JsonViewer";
import { SearchPanel } from "./components/SearchPanel/SearchPanel";
import { PathBar } from "./components/PathBar/PathBar";
import './App.css';

const EXAMPLE = {
  users: [
    { id: 1, name: "Анна", active: true, email: "anna@example.com" },
    { id: 2, name: "Борис", active: false, email: "boris@example.com" },
  ],
  metadata: {
    version: "1.0.0",
    generated: "2026-10-10",
    tags: ["test", "demo"],
  },
};

type ParseResult =
  | { success: true; data: unknown }
  | { success: false; error: string };

export default function App() {
  const [rawInput, setRawInput] = useState(JSON.stringify(EXAMPLE, null, 2));
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  const parseResult: ParseResult = useMemo(() => {
    try {
      return {
        success: true,
        data: JSON.parse(rawInput),
      };
    } catch (e) {
      return {
        success: false,
        error: (e as Error).message,
      };
    }
  }, [rawInput]);

  return (
    <main className="app">
      <h1>JSON Viewer</h1>

      <div className="app__grid">
        <section className="panel">
          <h2>Ввод</h2>
          <textarea
            className="app__textarea"
            value={rawInput}
            onChange={(e) => setRawInput(e.target.value)}
            placeholder='{"hello": "world"}'
            spellCheck={false}
          />
          {!parseResult.success && (
            <p className="app__error">Ошибка: {parseResult.error}</p>
          )}
        </section>

        <section className="panel">
          <h2>Визуализация</h2>

          {parseResult.success ? (
            <>
              <SearchPanel value={searchQuery} onChange={setSearchQuery} />

              <PathBar
                path={selectedPath}
                onClear={() => setSelectedPath(null)}
              />

              <div className="app__viewer">
                <JsonViewer
                  data={parseResult.data}
                  searchQuery={searchQuery}
                  onPathSelect={setSelectedPath}
                />
              </div>
            </>
          ) : (
            <p className="app__placeholder">
              Исправьте ошибку JSON, чтобы увидеть дерево
            </p>
          )}
        </section>
      </div>
    </main>
  );
}
