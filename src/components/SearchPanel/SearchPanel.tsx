import "./SearchPanel.css";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export const SearchPanel = ({ value, onChange }: Props) => {
  return (
    <div className="search-panel">
      <input
        type="text"
        className="search-panel__input"
        placeholder="Поиск по ключам и значениям..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button
          className="search-panel__clear"
          onClick={() => onChange("")}
          aria-label="Очистить поиск"
        >
          ✕
        </button>
      )}
    </div>
  );
};
