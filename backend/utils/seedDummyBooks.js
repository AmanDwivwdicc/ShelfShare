import User from "../models/User.js";
import Book from "../models/Book.js";

const DEMO_EMAIL = "demo@shelfshare.com";

const DEMO_BOOKS = [
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    genre: "Fiction",
    description:
      "A magical story about following your dreams. Santiago, a young shepherd, travels from Spain to Egypt in search of treasure and discovers the importance of listening to his heart.",
    type: "sell",
    price: 150,
    image: "/books/alchemist.jpg",
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    genre: "Self Help",
    description:
      "An easy and proven way to build good habits and break bad ones. Learn how tiny changes in behaviour can lead to remarkable results over time.",
    type: "sell",
    price: 250,
    image: "/books/atomic_habits.jpg",
  },
  {
    title: "Harry Potter and the Philosopher's Stone",
    author: "J.K Rowling",
    genre: "Fantasy",
    description:
      "Harry Potter discovers he is a wizard on his eleventh birthday and begins his journey at Hogwarts School of Witchcraft and Wizardry.",
    type: "exchange",
    price: null,
    image: "/books/harrypotterjpg",
  },
  {
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    genre: "Finance",
    description:
      "What the rich teach their kids about money that the poor and middle class do not. A personal finance classic for building wealth mindset.",
    type: "sell",
    price: 200,
    image: "https://covers.openlibrary.org/b/isbn/1612680194-L.jpg",
  },
  {
    title: "The 5 AM Club",
    author: "Robin Sharma",
    genre: "Self Improvement",
    description:
      "Own your morning, elevate your life. A story-based guide to waking up early, building a morning routine, and maximizing productivity.",
    type: "exchange",
    price: null,
    image: "https://covers.openlibrary.org/b/isbn/1443456622-L.jpg",
  },
  {
    title: "Deep Work",
    author: "Cal Newport",
    genre: "Productivity",
    description:
      "Rules for focused success in a distracted world. Learn how to cultivate deep focus and produce valuable work in an age of constant interruption.",
    type: "sell",
    price: 220,
    image: "https://covers.openlibrary.org/b/isbn/1455586692-L.jpg",
  },
];

const seedDummyBooks = async () => {
  const demoUser = await User.findOne({ email: DEMO_EMAIL });

  if (!demoUser) {
    return;
  }

  const bookCount = await Book.countDocuments({ owner: demoUser._id });

  if (bookCount > 0) {
    console.log(`Demo user already has ${bookCount} book(s) — skipping seed`);
    return;
  }

  const booksToInsert = DEMO_BOOKS.map((book) => ({
    ...book,
    owner: demoUser._id,
    status: "available",
  }));

  await Book.insertMany(booksToInsert);
  console.log(`Seeded ${booksToInsert.length} dummy books for demo user`);
};

export default seedDummyBooks;
