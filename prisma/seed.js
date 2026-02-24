import { prisma, disconnectDB } from "../src/config/db.js";

const creatorId = "020455c7-ad45-41a1-8a99-9646e6de2e79";

const movies = [
  {
    title: "The Godfather",
    creatorId: creatorId,
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genre: ["Crime", "Drama"],
    posterURL: "https://m.media-amazon.com/images/I/41+eK8zBwQL._AC_.jpg",
    createdAt: new Date(),
  },
  {
    title: "Inception",
    creatorId: creatorId,
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    releaseYear: 2010,
    genre: ["Action", "Sci-Fi", "Adventure"],
    posterURL: "https://m.media-amazon.com/images/I/81p+S9DQ1sL._AC_SY679_.jpg",
    createdAt: new Date(),
  },
  {
    title: "The Shawshank Redemption",
    creatorId: creatorId,
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genre: ["Drama"],
    posterURL: "https://m.media-amazon.com/images/I/51NiGlPAtXL._AC_.jpg",
    createdAt: new Date(),
  },
  {
    title: "Pulp Fiction",
    creatorId: creatorId,
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genre: ["Crime", "Drama"],
    posterURL: "https://m.media-amazon.com/images/I/71c08lth2aL._AC_SY679_.jpg",
    createdAt: new Date(),

  },
  {
    title: "The Dark Knight",
    creatorId: creatorId,
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genre: ["Action", "Crime", "Drama"],
    posterURL: "https://m.media-amazon.com/images/I/818jj6v902L._AC_SY679_.jpg",
    createdAt: new Date()
  },
  {
    title: "Spirited Away",
    creatorId: creatorId,
    description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.",
    releaseYear: 2001,
    genre: ["Animation", "Adventure", "Family"],
    posterURL: "https://m.media-amazon.com/images/I/719f6XvSfcL._AC_SY679_.jpg",
    createdAt: new Date()
  },
  {
    title: "The Matrix",
    creatorId: creatorId,
    description: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    releaseYear: 1999,
    genre: ["Action", "Sci-Fi"],
    posterURL: "https://m.media-amazon.com/images/I/51EG732BV3L._AC_.jpg",
    createdAt: new Date(),
  },
  {
    title: "Parasite",
    creatorId: creatorId,
    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.",
    releaseYear: 2019,
    genre: ["Drama", "Thriller"],
    posterURL: "https://m.media-amazon.com/images/I/91K98sCL6iL._AC_SY679_.jpg",
    createdAt: new Date()
  },
  {
    title: "Interstellar",
    creatorId: creatorId,
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    releaseYear: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    posterURL: "https://m.media-amazon.com/images/I/91kFYSeSaVL._AC_SY679_.jpg",
    createdAt: new Date()
  },
  {
    title: "Everything Everywhere All at Once",
    creatorId: creatorId,
    description: "A middle-aged Chinese immigrant is swept up into an insane adventure in which she alone can save existence by exploring other universes and connecting with the lives she could have led.",
    releaseYear: 2022,
    genre: ["Action", "Adventure", "Sci-Fi"],
    posterURL: "https://m.media-amazon.com/images/I/81WjGytz7ML._AC_SY679_.jpg",
    createdAt: new Date()
  }
];

const main = async () => {
  console.log("Seeding database with movies...");
  for (const movie of movies) {
    await prisma.movie.create({
      data: movie
    });
    console.log(`Inserted movie: ${movie.title}`);
  }
  console.log("Database seeding completed.");
};

main()
  .catch((err) => {
    console.error("Error seeding database:", err);
    process.exit(1);
  })
  .finally(async () => {
    await disconnectDB();
  });