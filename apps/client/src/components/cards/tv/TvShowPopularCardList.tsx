import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { trpc } from "@utils/trpc";

import TvShowCard from "./TvShowCard";
import ChevronLeft from "@components/svgs/ChevronLeft";
import ChevronRight from "@components/svgs/ChevronRight";
import CardSkeleton from "@components/skeleton/CardSkeleton";

import type { TmdbTvShow } from "@my/api";

export const TvShowPopularCardList: React.FC<{
  className?: string;
}> = ({ className }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    containScroll: "trimSnaps",
    dragFree: true,
  });

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.tvShows.getPopularTvShows.useInfiniteQuery(
      { cursor: 1 },
      {
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.page + 1;
          return nextPage <= lastPage.total_pages ? nextPage : undefined;
        },
        initialCursor: 1,
      }
    );

  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  useEffect(() => {
    if (!emblaApi) return;

    const updateState = () => {
      setIsAtStart(emblaApi.canScrollPrev() === false);
      setIsAtEnd(emblaApi.canScrollNext() === false);

      if (
        emblaApi.canScrollNext() === false &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    updateState();
    emblaApi.on("select", updateState);
    emblaApi.on("scroll", updateState);
  }, [emblaApi, fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className={`w-full relative ${className}`}>
        <h2 className="text-xl font-bold font-inter mb-2 ml-2">Popular</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[...Array(10)].map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <div className={`w-full relative ${className}`}>
      <h2 className="text-xl font-bold font-inter mb-2 ml-2">Popular</h2>

      {!isAtStart && (
        <button
          onClick={scrollPrev}
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/90 rounded-full flex items-center justify-center w-[40px] h-[40px]"
        >
          <ChevronLeft />
        </button>
      )}

      {!isAtEnd && (
        <button
          onClick={scrollNext}
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/90 rounded-full flex items-center justify-center w-[40px] h-[40px]"
        >
          <ChevronRight />
        </button>
      )}

      <div ref={emblaRef} className="overflow-hidden w-full">
        <div className="flex" style={{ gap: "1rem" }}>
          {movies.map((tvShow: TmdbTvShow, idx) => (
            <div
              key={tvShow.id ?? idx}
              className="flex-shrink-0"
              style={{
                width: "100%",
                maxWidth: "200px",
              }}
            >
              <TvShowCard tvShow={tvShow} />
            </div>
          ))}

          {isFetchingNextPage &&
            [...Array(3)].map((_, idx) => (
              <div
                key={`skeleton-${idx}`}
                className="flex-shrink-0"
                style={{ maxWidth: "200px" }}
              >
                <CardSkeleton />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TvShowPopularCardList;
