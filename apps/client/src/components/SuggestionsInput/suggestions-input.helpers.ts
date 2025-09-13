export enum FilterOptionEnum {
  All = "all",
  Movies = "movies",
  TV = "tv",
}

export interface FilterOption {
  id: number;
  value: FilterOptionEnum;
  label: string;
}

export const filterOptions: FilterOption[] = [
  { id: 1, value: FilterOptionEnum.All, label: "All" },
  { id: 2, value: FilterOptionEnum.Movies, label: "Movies" },
  { id: 3, value: FilterOptionEnum.TV, label: "TV" },
];

export const normalizeResultByFilter = (
  filter: FilterOptionEnum,
  item: any
) => {
  if (filter === FilterOptionEnum.All)
    return { ...item, name: item.name || item.title };
  return { ...item, name: item.name || item.title, media_type: filter };
};
