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
