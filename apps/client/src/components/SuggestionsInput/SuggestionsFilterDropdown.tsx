import React from "react";

import CheckmarkIcon from "@components/svgs/CheckmarkIcon";
import ChevronDownIcon from "@components/svgs/ChevronDownIcon";

import { filterOptions, FilterOptionEnum } from "./suggestions-input.helpers";

export const SuggestionsFilterDropdown: React.FC<{
  activeFilter: string;
  setActiveFilter: (value: FilterOptionEnum) => void;
}> = ({ activeFilter, setActiveFilter }) => {
  const activeFilterLabel = filterOptions.find(
    (option) => option.value === activeFilter
  )?.label;

  return (
    <div className="dropdown dropdown-bottom min-w-[120px] w-[120px] border-lume-primary-dark border-l-[1px]">
      <div
        tabIndex={0}
        role="button"
        className="font-poppins font-[200] capitalize px-4 py-[10px] rounded-bl-none rounded-tl-none rounded-tr-full rounded-br-full flex items-center justify-end bg-lume-secondary-dark text-white mr-2 cursor-pointer"
      >
        {activeFilterLabel}
        <ChevronDownIcon className="ml-2 w-5 h-5 min-w-[20px] min-h-[20px]" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-lume-secondary-dark rounded-box z-1 w-52 shadow-sm mt-2 p-0"
      >
        {filterOptions.map((option) => (
          <li
            key={option.id}
            className={
              activeFilter === option.value ? "bg-lume-primary-dark/50" : ""
            }
          >
            <button
              type="button"
              className="hover:bg-lume-primary-dark/50 text-lume-primary-light p-2 px-4 font-poppins font-[200] text-base flex items-center justify-between"
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
              {activeFilter === option.value && (
                <CheckmarkIcon strokeWidth="1" />
              )}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsFilterDropdown;
