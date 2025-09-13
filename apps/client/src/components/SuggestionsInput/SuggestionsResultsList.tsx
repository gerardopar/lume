import React from "react";
import moment from "moment";

import ChevronRight from "@components/svgs/ChevronRight";

import {
  FilterOptionEnum,
  normalizeResultByFilter,
  MediaTypeEnum,
} from "./suggestions-input.helpers";
import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";

import type { MultiSearchResult } from "@my/api";

export const SuggestionsResultsList: React.FC<{
  results: MultiSearchResult[];
  activeFilter: FilterOptionEnum;
  highlightedIndex: number;
  setHighlightedIndex: (index: number) => void;
  setSearch: (value: string) => void;
  setOpen: (value: boolean) => void;
  mediaType: MediaTypeEnum;
}> = ({
  results,
  activeFilter,
  highlightedIndex,
  setHighlightedIndex,
  setSearch,
  setOpen,
  mediaType,
}) => {
  return (
    <>
      {results.map((item, idx) => {
        const itemByMediaType = normalizeResultByFilter(activeFilter, item);

        let image = null;

        const releaseYear = moment(
          itemByMediaType?.release_date || itemByMediaType?.first_air_date
        ).format("YYYY");

        if (itemByMediaType?.poster_path) {
          image = buildImageUrl(
            config,
            "poster",
            itemByMediaType?.poster_path!,
            "original"
          );
        } else if (itemByMediaType?.backdrop_path) {
          image = buildImageUrl(
            config,
            "backdrop",
            itemByMediaType?.backdrop_path!,
            "original"
          );
        }

        return (
          <li
            key={item.id}
            className="flex items-center justify-between w-full"
          >
            <div
              role="button"
              className={`flex items-center cursor-pointer w-full text-base font-poppins font-[200] text-left px-4 py-2 capitalize
                ${
                  idx === highlightedIndex
                    ? "bg-lume-primary-dark/70 text-white"
                    : "hover:bg-lume-primary-dark/50 text-lume-primary-light"
                }
              `}
              onClick={() => {
                setSearch(itemByMediaType.name);
                setOpen(false);
                setHighlightedIndex(-1);
              }}
            >
              <img
                src={image!}
                alt={itemByMediaType.name}
                className="w-[40px] h-[60px] min-w-[40px] min-h-[60px] max-w-[40px] max-h-[60px] mr-2 object-contain"
              />

              <div className="flex items-start flex-col justify-start flex-1">
                <p className="text-base line-clamp-2">{itemByMediaType.name}</p>
                <p className="text-xs text-lume-primary-light/70 font-medium">
                  {releaseYear}
                </p>
              </div>

              <ChevronRight className="text-lume-primary-light/70" />
            </div>
          </li>
        );
      })}
    </>
  );
};

export default SuggestionsResultsList;
