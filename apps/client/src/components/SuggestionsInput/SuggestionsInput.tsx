import React, { useState, useMemo, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";
import { trpc } from "@utils/trpc";

import SearchIcon from "@components/svgs/SearchIcon";
import XIcon from "@components/svgs/X";

export const SuggestionsInput: React.FC = () => {
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");

  const [open, setOpen] = useState<boolean>(false);
  const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);

  const debouncedUpdate = useMemo(
    () =>
      debounce((value: string) => {
        setDebouncedSearch(value);
      }, 400),
    []
  );

  useEffect(() => {
    debouncedUpdate(search);
  }, [search, debouncedUpdate]);

  const { data, isLoading } = trpc.movies.searchKeywords.useQuery(
    { query: debouncedSearch },
    { enabled: debouncedSearch.length > 0 }
  );

  const results = data?.results ?? [];

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (!open || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : 0
        );
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev > 0 ? prev - 1 : results.length - 1
        );
      }

      if (e.key === "Enter" && highlightedIndex >= 0) {
        e.preventDefault();
        setSearch(results[highlightedIndex].name);
        setOpen(false);
        setHighlightedIndex(-1);

        // on enter redirect to search result
        // or , open a modal with the search results
      }

      if (e.key === "Escape") {
        setOpen(false);
        setHighlightedIndex(-1);
      }
    },
    [open, results, highlightedIndex]
  );

  const getInputDecoration = () => {
    switch (true) {
      case isLoading:
        return (
          <div className="absolute right-4 top-1/2 -translate-y-1/2">
            <span className="loading loading-ring loading-xl" />
          </div>
        );
      case search.length > 0:
        return (
          <button onClick={() => setSearch("")}>
            <XIcon className="absolute right-4 top-1/2 -translate-y-1/2" />
          </button>
        );
      default:
        return (
          <SearchIcon className="h-5 w-5 text-lume-primary-light absolute right-4 top-1/2 -translate-y-1/2" />
        );
    }
  };

  const inputDecoration = getInputDecoration();

  return (
    <div className="flex items-center flex-1 max-w-[60%] relative">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setOpen(true);
          setHighlightedIndex(-1);
        }}
        onFocus={() => setOpen(true)}
        onBlur={() => setTimeout(() => setOpen(false), 150)}
        onKeyDown={handleKeyDown}
        type="text"
        placeholder="Search"
        className={`
              w-full bg-lume-secondary-dark rounded-full p-2 py-[10px] placeholder:text-lume-primary-light 
              focus:outline-none placeholder:font-poppins placeholder:font-[200] placeholder:text-[16px] pl-4
              font-poppins font-[200] text-base
              ${
                open && results.length > 0
                  ? "rounded-b-none rounded-t-[16px]"
                  : ""
              }
            `}
      />

      {inputDecoration}

      {open && results.length > 0 && (
        <ul className="absolute top-full w-full bg-lume-secondary-dark rounded-b-xl shadow-lg z-50 overflow-hidden max-h-[200px] overflow-y-scroll touch-pan-up">
          {results.map((item, idx) => (
            <li key={item.id}>
              <button
                type="button"
                className={`w-full text-base font-poppins font-[200] text-left px-4 py-2 capitalize
                      ${
                        idx === highlightedIndex
                          ? "bg-lume-primary-dark/70 text-white"
                          : "hover:bg-lume-primary-dark/50 text-lume-primary-light"
                      }
                    `}
                onClick={() => {
                  setSearch(item.name);
                  setOpen(false);
                  setHighlightedIndex(-1);
                }}
              >
                {item.name}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SuggestionsInput;
