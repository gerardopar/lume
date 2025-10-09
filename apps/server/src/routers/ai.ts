import { z } from "zod";
import { openaiClient } from "../services/openAi";
import { publicProcedure, router } from "../trpc";

import { tmdbSearch } from "../services/tmdb-service";

import { FilterOptionEnum } from "../types/tmdb.types";

export const aiRouter = router({
  getAiRecommendations: publicProcedure
    .input(
      z.object({
        type: z.enum([FilterOptionEnum.Movies, FilterOptionEnum.TV]),
        genres: z.array(z.string()).optional(),
        vibe: z.string().min(3, "Please describe the vibe a bit more."),
      })
    )
    .mutation(async ({ input }) => {
      const { type, genres = [], vibe } = input;

      const prompt = `
      You are a movie recommendation engine. 
      Given the following user preferences, return a JSON array of 5 real ${type}s that exist on TMDB.
      
      Preferences:
      - Type: ${type}
      - Genres: ${genres.length ? genres.join(", ") : "any"}
      - Vibe: ${vibe}
      
      Rules:
      - Only include real, existing titles.
      - Return as a valid JSON array like ["Title 1", "Title 2", "Title 3"].
      - Do not include commentary, numbers, or explanations.
      `;

      const completion = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Return the list now." },
        ],
        temperature: 0.7,
      });

      let titles: string[] = [];
      const raw = completion.choices[0].message?.content?.trim() || "[]";

      try {
        titles = JSON.parse(raw);
      } catch {
        titles = raw
          .split("\n")
          .map((t) => t.replace(/^-/, "").trim())
          .filter(Boolean);
      }

      const results = [];

      for (const title of titles) {
        const res = await tmdbSearch(title, 1, type as FilterOptionEnum);
        if (res?.results?.[0]) {
          results.push(res?.results[0]);
        }
      }

      return { titles, results };
    }),

  reRollRecommendations: publicProcedure
    .input(
      z.object({
        type: z.enum([FilterOptionEnum.Movies, FilterOptionEnum.TV]),
        genres: z.array(z.string()).optional(),
        vibe: z.string().min(3),
        previousTitles: z.array(z.string()).min(1),
      })
    )
    .mutation(async ({ input }) => {
      const { type, genres = [], vibe, previousTitles } = input;

      const prompt = `
      You are a movie recommendation engine.
      Based on the following preferences, return a JSON array of 5 real ${type}s that are **not** in the excluded list.

      Preferences:
      - Type: ${type}
      - Genres: ${genres.length ? genres.join(", ") : "any"}
      - Vibe: ${vibe}

      Excluded titles:
      - ${previousTitles.join("\n- ")}

      Rules:
      - Recommend 5 real, existing titles that are **not** in the excluded list.
      - Return the result as a valid JSON array like ["Title A", "Title B"].
      - Do not include any commentary, explanation, or numbering.
      `;

      const completion = await openaiClient.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: "Return the list now." },
        ],
        temperature: 0.8,
      });

      let titles: string[] = [];
      const raw = completion.choices[0].message?.content?.trim() || "[]";

      try {
        titles = JSON.parse(raw);
      } catch {
        titles = raw
          .split("\n")
          .map((t) => t.replace(/^-/, "").trim())
          .filter(Boolean)
          .filter((title) => !previousTitles.includes(title));
      }

      const results = [];

      for (const title of titles) {
        const res = await tmdbSearch(title, 1, type as FilterOptionEnum);
        if (res?.results?.[0]) {
          results.push(res.results[0]);
        }
      }

      return { titles, results };
    }),
});
