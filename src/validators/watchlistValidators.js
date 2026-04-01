import { z } from "zod";

export const addToWatchListSchema = z.object({
    movieId: z.string().trim().min(1, "Movie ID is required"),
    status: z.enum(["WATCHING", "COMPLETED", "PLANNING"], { message: "Status must be one of: WATCHING, COMPLETED, PLANNING" }).optional(),
});