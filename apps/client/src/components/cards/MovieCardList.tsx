import React, { useRef, useEffect } from "react";
import { trpc } from "@utils/trpc";
import MovieCard from "./MovieCard";
import { inView } from "motion";
import type { TmdbMovie } from "@my/api";

export const MovieCardList: React.FC<{
  title?: string;
  genreId: number;
}> = ({ title, genreId }) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    trpc.movies.getPopularMoviesByGenre.useInfiniteQuery(
      { genreId },
      {
        getNextPageParam: (lastPage) => {
          const nextPage = lastPage.page + 1;
          return nextPage <= lastPage.total_pages ? nextPage : undefined;
        },
        initialCursor: 1,
      }
    );

  // Auto-fetch when scrolling near the bottom
  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      if (timeoutId) clearTimeout(timeoutId);

      timeoutId = setTimeout(() => {
        if (!hasNextPage || isFetchingNextPage) return;

        // Check if we're near the bottom of the page (within 200px)
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

  const movies = data?.pages.flatMap((p) => p.results) ?? [];
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // Arrow navigation (with auto-fetch if near end)
  const scrollByAmount = (amount: number) => {
    if (scrollRef.current) {
      const el = scrollRef.current;
      el.scrollBy({ left: amount, behavior: "smooth" });

      // Check if user reached near the end after arrow scroll
      const isNearEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 300;
      if (isNearEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  // Animate cards once
  useEffect(() => {
    const cards = document.querySelectorAll(".movie-card:not(.animated)");
    cards.forEach((card, idx) => {
      inView(card, () => {
        // Animate using CSS classes instead of motion.animate
        card.animate(
          [
            { opacity: 0, transform: "translateY(20px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          {
            duration: 300,
            delay: idx * 30,
            easing: "ease-out",
            fill: "forwards",
          }
        );
        card.classList.add("animated");
      });
    });
  }, [movies]);

  // Auto-fetch next page when scrolling manually to the end
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = () => {
      const { scrollLeft, clientWidth, scrollWidth } = el;
      const isAtEnd = scrollLeft + clientWidth >= scrollWidth - 50;
      if (isAtEnd && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", handleScroll);
    return () => el.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="w-full relative">
      {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}

      {/* Arrows */}
      <button
        onClick={() => scrollByAmount(-300)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full"
      >
        {"<"}
      </button>

      <button
        onClick={() => scrollByAmount(300)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 p-2 rounded-full"
      >
        {">"}
      </button>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto scroll-smooth pb-4 no-scrollbar"
      >
        {movies.map((movie: TmdbMovie) => (
          <div key={movie.id} className="movie-card opacity-0">
            <MovieCard movie={movie} />
          </div>
        ))}
      </div>

      {/* Indicators */}
      {/* {isFetchingNextPage && (
        <p className="text-sm text-center opacity-60 mt-2">Loading more…</p>
      )}
      {!hasNextPage && (
        <p className="text-sm text-center opacity-60 mt-2">No more movies</p>
      )} */}
    </div>
  );
};

export default MovieCardList;
