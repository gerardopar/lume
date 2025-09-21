import React from "react";
import _ from "lodash";

import { buildImageUrl, config } from "../../helpers/tmdb-image.helpers";
import { getVisibleWatchProviders } from "../../helpers/watch-providers.helpers";
import WatchProvidersListSkeleton from "@components/skeleton/WatchProvidersListSkeleton";

import type { WatchProviderRegion } from "@my/api";

export const WatchProvidersList: React.FC<{
  watchProviders: WatchProviderRegion;
  isLoading?: boolean;
  className?: string;
}> = ({ watchProviders, isLoading, className }) => {
  const { visibleWatchProviders, remainder } = getVisibleWatchProviders(
    [watchProviders?.flatrate, watchProviders?.free].flat().filter(Boolean),
    [watchProviders?.buy, watchProviders?.rent].flat().filter(Boolean),
    3,
    5
  );

  if (isLoading) {
    return <WatchProvidersListSkeleton count={5} className={className} />;
  }

  return (
    <div className={`avatar-group -space-x-4 ${className}`}>
      {visibleWatchProviders?.map((w) => {
        const logoPath = buildImageUrl(
          config,
          "logo",
          w?.logo_path!,
          "original"
        );
        return (
          <div key={w?.provider_id} className="avatar border-[1px]">
            <div className="w-10">
              <img src={logoPath!} />
            </div>
          </div>
        );
      })}

      {remainder > 0 && (
        <div className="avatar avatar-placeholder border-[1px]">
          <div className="bg-neutral text-neutral-content w-10">
            <span>+{remainder}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchProvidersList;
