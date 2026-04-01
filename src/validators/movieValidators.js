import { z } from "zod";

export const createMovieSchema = z.object({
    title: z.string().trim().min(1, "Title is required"),
    description: z.string().trim().min(1, "Description is required"),
    releaseDate: z.string().trim().min(1, "Release date is required"),
    genre: z.array(z.string(), {message: "All genres must be strings"}).optional(),
    posterURL: z.string().url("Please provide a valid URL for the poster").optional(),
});

export const updateMovieSchema = z.object({
    title: z.string().trim().min(1, "Title is required").optional(),
    description: z.string().trim().min(1, "Description is required").optional(),
    releaseDate: z.string().trim().min(1, "Release date is required").optional(),
    genre: z.array(z.string(), {message: "All genres must be strings"}).optional(),
    posterURL: z.string().url("Please provide a valid URL for the poster").optional(),
});

export { createMovieSchema, updateMovieSchema };