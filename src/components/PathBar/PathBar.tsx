import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import "./PathBar.css";

interface Props {
  path: string | null;
  onClear: () => void;
}

export const PathBar = ({ path, onClear }: Props) => {
  const { copy, showCopied } = useCopyToClipboard();

  if (!path) {
    return (
      <div className="path-bar path-bar--empty">
        Кликните на ключ элемента, чтобы увидеть путь
      </div>
    );
  }

  const handleCopyPath = () => copy(path);

  return (
    <div className="path-bar">
      <span className="path-bar__label">Путь:</span>
      <code
        className="path-bar__path"
        onClick={handleCopyPath}
        title="Кликните, чтобы скопировать"
      >
        {path}
      </code>

      <div className="path-bar__actions">
        <span className="path-bar__btn-wrapper">
          <button
            className="path-bar__btn"
            onClick={handleCopyPath}
            title="Копировать путь"
            aria-label="Копировать путь"
            type="button"
          >
            📋
          </button>
          {showCopied && (
            <span
              className="path-bar__copied-tooltip"
              role="status"
              aria-live="polite"
            >
              Скопировано!
            </span>
          )}
        </span>

        <button
          className="path-bar__btn path-bar__btn--clear"
          onClick={onClear}
          title="Очистить"
          aria-label="Очистить путь"
          type="button"
        >
          ✕
        </button>
      </div>
    </div>
  );
};
