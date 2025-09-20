import _ from "lodash";

import type { WatchProvider } from "@my/api";

/**
 * Ensures you always show at least `min` watch providers,
 * at most `max`, and collapses the rest into remainder.
 */
export function getVisibleWatchProviders(
  watchProviders: WatchProvider[],
  fallbackProviders: WatchProvider[],
  min = 5,
  max = 10
) {
  if (!watchProviders) return null;

  const providers =
    watchProviders?.length > 0
      ? _.uniqBy(watchProviders, "provider_id")
      : _.uniqBy(fallbackProviders, "provider_id");

  const countToShow = Math.min(Math.max(providers?.length ?? 0, min), max);
  return {
    visibleWatchProviders: providers?.slice(0, countToShow),
    remainder: Math.max((providers?.length ?? 0) - countToShow, 0),
  };
}
