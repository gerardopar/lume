import React, { useRef, useEffect, useState } from "react";
import { trpc } from "@utils/trpc";

import MovieCard from "./MovieCard";
import ChevronLeft from "@components/svgs/ChevronLeft";
import ChevronRight from "@components/svgs/ChevronRight";
import MovieCardSkeleton from "@components/skeleton/CardSkeleton";

import type { TmdbMovie } from "@my/api";

export const MoviePopularCardList: React.FC<{
  className?: string;
}> = ({ className }) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.movies.getPopularMovies.useInfiniteQuery(
      {},
      {
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.page + 1;
          return nextPage <= lastPage.total_pages ? nextPage : undefined;
        },
        initialCursor: 1,
      }
    );

  const movies = data?.pages.flatMap((p) => p.results) ?? [];

  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollBy({ left: amount, behavior: "smooth" });
      updateScrollState();

      const isNearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 300;
      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const updateScrollState = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setIsAtStart(scrollLeft < 10);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 10);
    }
  };

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        const scrollPosition =
          window.innerHeight + document.documentElement.scrollTop;
        const bottomPosition = document.documentElement.offsetHeight - 200;

        if (scrollPosition >= bottomPosition) {
          fetchNextPage().catch(console.error);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      updateScrollState();

      const { scrollLeft, clientWidth, scrollWidth } = el;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
      if (isAtEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", handleScroll);
    // Initial check
    updateScrollState();

    return () => el.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className={`w-full relative ${className}`}>
        <h2 className="text-xl font-bold font-inter mb-2 ml-2">Popular</h2>
        <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
          {[...Array(10)].map((_, idx) => (
            <MovieCardSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`w-full relative ${className}`}>
      <h2 className="text-xl font-bold font-inter mb-2 ml-2">Popular</h2>

      {!isAtStart && (
        <button
          onClick={() => scrollByAmount(-300)}
          className="cursor-pointer absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/90 rounded-full flex items-center justify-center w-[40px] h-[40px] transition-opacity duration-300"
        >
          <ChevronLeft />
        </button>
      )}

      {!isAtEnd && (
        <button
          onClick={() => scrollByAmount(300)}
          className="cursor-pointer absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/90 rounded-full flex items-center justify-center w-[40px] h-[40px] transition-opacity duration-300"
        >
          <ChevronRight />
        </button>
      )}

      <div
        ref={scrollRef}
        className="flex gap-4 max-mobile-425:gap-2 max-mobile-375:gap-1 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
      >
        {movies.map((movie: TmdbMovie) => (
          <MovieCard movie={movie} />
        ))}
        {isFetchingNextPage && (
          <>
            {[...Array(3)].map((_, idx) => (
              <MovieCardSkeleton key={`skeleton-${idx}`} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default MoviePopularCardList;
