import React from "react";
import _ from "lodash";

import { getVisibleCast } from "../../helpers/cast.helpers";
import CastListSkeleton from "@components/skeleton/CastListSkeleton";
import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";

import type { CastMember } from "@my/api";

export const CastList: React.FC<{
  cast: CastMember[];
  className?: string;
  isLoading?: boolean;
}> = ({ cast, className, isLoading }) => {
  const { visibleCast, remainder: remainderCast } = getVisibleCast(cast, 3, 6);

  if (isLoading) {
    return <CastListSkeleton count={6} className={className} />;
  }

  return (
    <div className={`avatar-group -space-x-4 ${className}`}>
      {visibleCast?.map((c) => {
        const profilePath = buildImageUrl(
          config,
          "profile",
          c.profile_path!,
          "original"
        );
        return (
          <div key={c.id} className="avatar border-[1px]">
            <div className="w-10">
              <img src={profilePath!} />
            </div>
          </div>
        );
      })}

      {remainderCast > 0 && (
        <div className="avatar avatar-placeholder border-[1px]">
          <div className="bg-neutral text-neutral-content w-10">
            <span>+{remainderCast}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default CastList;
