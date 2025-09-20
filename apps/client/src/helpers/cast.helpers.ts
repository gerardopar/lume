import type { CastMember } from "@my/api";

interface VisibleCastResult {
  visibleCast: CastMember[];
  remainder: number;
}

/**
 * Ensures you always show at least `min` cast members,
 * at most `max`, and collapses the rest into remainder.
 */
export function getVisibleCast(
  cast: CastMember[],
  min = 3,
  max = 6
): VisibleCastResult {
  if (!cast) return { visibleCast: [], remainder: 0 };

  const countToShow = Math.min(Math.max(cast?.length ?? 0, min), max);
  return {
    visibleCast: cast?.slice(0, countToShow),
    remainder: Math.max((cast?.length ?? 0) - countToShow, 0),
  };
}
