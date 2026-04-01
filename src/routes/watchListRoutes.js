import express from "express";
import { addToWatchList, getWatchList, updateWatchlistItem, removeFromWatchList } from "../controller/watchListController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validateRequest.js";
import { addToWatchListSchema} from "../validators/watchlistValidators.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateRequest(addToWatchListSchema), addToWatchList);

router.get("/", getWatchList);

router.put("/:id", updateWatchlistItem);

router.delete("/:id", removeFromWatchList);

export default router;