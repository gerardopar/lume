import React from "react";

import ChevronDownIcon from "@components/svgs/ChevronDownIcon";

import { filterOptions, FilterOptionEnum } from "./suggestions-input.helpers";

export const SuggestionsFilterDropdown: React.FC<{
  activeFilter: string;
  setActiveFilter: (value: FilterOptionEnum) => void;
}> = ({ activeFilter, setActiveFilter }) => {
  return (
    <div className="dropdown dropdown-bottom">
      <div
        tabIndex={0}
        role="button"
        className="font-poppins font-[200] capitalize px-4 py-[10px] rounded-full flex items-center justify-center bg-lume-secondary-dark text-white mr-2"
      >
        {activeFilter}
        <ChevronDownIcon className="ml-2" />
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu bg-lume-secondary-dark rounded-box z-1 w-52 shadow-sm mt-2 p-0"
      >
        {filterOptions.map((option) => (
          <li key={option.id}>
            <button
              type="button"
              className="hover:bg-lume-primary-dark/50 text-lume-primary-light p-2 pl-4 font-poppins font-[200] text-base"
              onClick={() => setActiveFilter(option.value)}
            >
              {option.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SuggestionsFilterDropdown;
