import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useJiraIssuePicker } from "../../features/searchBar/hooks/useSearch";
import { useDebouncedValue } from "../../features/searchBar/hooks/useDebouncedValue";


export default function SearchBar() {
  const navigate = useNavigate();

  const [q, setQ] = useState("");
  const dq = useDebouncedValue(q, 300);

  const { data: items = [], isFetching, isError } = useJiraIssuePicker(dq);

 

  const showDropdown = dq.trim().length > 0 && (isFetching || items.length > 0);

  return (
    <form
      className="md:min-w-96"
      onSubmit={(e) => {
        e.preventDefault();
        if (!q.trim()) return;
        navigate(`/issues/${encodeURIComponent(q.trim())}`);
      }}
    >
      <label className="block mb-2.5 text-sm font-medium text-heading sr-only">
        Search
      </label>

      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-body"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
              d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <input
          type="search"
          id="search"
          className="block w-full p-3 ps-9 bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand shadow-xs placeholder:text-body"
          placeholder="Search issue (KEY-123, summary...)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoComplete="off"
        />

        {showDropdown && (
          <div className="absolute left-0 right-0 mt-2 rounded-xl border bg-white shadow-lg overflow-hidden z-50">
            {isFetching && (
              <div className="px-3 py-2 text-sm text-gray-500">Searching…</div>
            )}

            {items.slice(0, 8).map((it: any) => (
              <button
                key={it.id ?? it.key}
                type="button"
                onClick={() => {
                  const key = it.key ?? it.issueKey;
                  if (key) navigate(`/issues/${encodeURIComponent(key)}`);
                  setQ(key ?? q);
                }}
                
                className="w-full text-left px-3 py-2 hover:bg-gray-50 flex items-center gap-2"
              >
                <span className="font-medium text-sm">{it.key ?? it.issueKey}</span>
                <span className="text-sm text-gray-600 truncate">
                  {it.summary ?? it.title ?? it.name}
                </span>
              </button>
            ))}

            {!isFetching && items.length === 0 && (
              <div className="px-3 py-2 text-sm text-gray-500">No results</div>
            )}
          </div>
        )}
      </div>
    </form>
  );
}
