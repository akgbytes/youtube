import { db } from "@/db";
import { categoriesTable } from "@/db/schema/categories";

const categories = [
  "Film & Animation",
  "Autos & Vehicles",
  "Music",
  "Pets & Animals",
  "Sports",
  "Short Movies",
  "Travel & Events",
  "Gaming",
  "Video Blogging (Vlogging)",
  "People & Blogs",
  "Comedy",
  "Entertainment",
  "News & Politics",
  "How-to & Style",
  "Education",
  "Science & Technology",
  "Nonprofits & Activism",
  "Movies",
  "Anime / Animation",
  "Action / Adventure",
  "Classics",
  "Comedy (Sub-category)",
  "Documentary",
  "Drama",
  "Family",
  "Foreign",
  "Horror",
  "Sci-Fi / Fantasy",
  "Thriller",
  "Shorts",
  "Shows",
  "Trailers",
];

async function main() {
  try {
    const data = categories.map((name) => ({ name }));
    await db.insert(categoriesTable).values(data);
    console.log("Categories seeded successfully!");
  } catch (error) {
    console.error("Error seeding categories:", error);
  }
}

main();

// pnpm exec tsx -r dotenv/config src/scripts/seed-categories.ts
