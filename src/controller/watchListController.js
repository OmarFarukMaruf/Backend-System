import { prisma } from '../config/db.js';

const addToWatchList = async (req, res) => {
    const { movieId, status } = req.body;

    // check if the movie exits in the database
    const movieExists = await prisma.movie.findUnique({
        where: { id: movieId }
    });

    if (!movieExists) {
        return res.status(404).json({ message: "Movie not found" });
    }

    // check if the movie is already in the user's watchlist
    const alreadyInWatchList = await prisma.wachingListItem.findUnique({
        where: {
            userId_movieId: {
                userId: req.userId,
                movieId
            }
        }
    });

    if (alreadyInWatchList) {
        return res.status(400).json({ message: "Movie already in watchlist" });
    }

    // add the movie to the user's watchlist
    const watchListEntry = await prisma.wachingListItem.create({
        data: {
            userId: req.userId,
            movieId,
            status: status || "to watch",
            // name of the movie
            title: movieExists.title
        }
    });
    res.status(201).json(
        {
            status: "success",
            data: {
                watchListEntry
            }
        }
    );
};

const getWatchList = async (req, res) => {
    const watchList = await prisma.wachingListItem.findMany({
        where: {
            userId: req.userId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    res.status(200).json({
        status: "success",
        data: {
            watchList
        }
    });
};

export { addToWatchList, getWatchList };