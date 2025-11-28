import { migrate } from "drizzle-orm/neon-serverless/migrator";
import { db, pool } from "./db";

async function main() {
  console.log("Running migrations...");
  
  try {
    await db.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        username TEXT NOT NULL UNIQUE,
        password TEXT NOT NULL,
        role TEXT NOT NULL DEFAULT 'participant',
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS home_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        hero_title TEXT NOT NULL,
        hero_subtitle TEXT NOT NULL,
        hero_description TEXT NOT NULL,
        participants_count INTEGER NOT NULL DEFAULT 0,
        projects_count INTEGER NOT NULL DEFAULT 0,
        years_count INTEGER NOT NULL DEFAULT 0,
        judges_count INTEGER NOT NULL DEFAULT 0,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS about_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mission TEXT NOT NULL,
        vision TEXT NOT NULL,
        founder_name TEXT NOT NULL,
        founder_bio TEXT NOT NULL,
        founder_image TEXT,
        history_content TEXT NOT NULL,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS board_members (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        position TEXT NOT NULL,
        bio TEXT NOT NULL,
        image TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        description TEXT NOT NULL,
        icon TEXT NOT NULL,
        color TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS schedule_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        start_time TEXT NOT NULL,
        end_time TEXT NOT NULL,
        date TEXT NOT NULL,
        location TEXT NOT NULL,
        type TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS judges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        expertise TEXT NOT NULL,
        organization TEXT NOT NULL,
        bio TEXT NOT NULL,
        image TEXT,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS gallery_images (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL,
        category TEXT NOT NULL,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS blog_posts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        featured_image TEXT NOT NULL,
        author TEXT NOT NULL,
        published_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS news (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        excerpt TEXT NOT NULL,
        content TEXT NOT NULL,
        external_link TEXT,
        source TEXT NOT NULL,
        published_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS notices (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        is_pinned BOOLEAN NOT NULL DEFAULT FALSE,
        is_urgent BOOLEAN NOT NULL DEFAULT FALSE,
        published_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS videos (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        youtube_url TEXT NOT NULL,
        thumbnail TEXT,
        "order" INTEGER NOT NULL DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS contact_messages (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT NOT NULL,
        message TEXT NOT NULL,
        is_read BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW() NOT NULL
      );

      CREATE TABLE IF NOT EXISTS footer_content (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        about_text TEXT NOT NULL,
        email TEXT NOT NULL,
        phone TEXT NOT NULL,
        address TEXT NOT NULL,
        facebook_url TEXT,
        twitter_url TEXT,
        instagram_url TEXT,
        linkedin_url TEXT,
        updated_at TIMESTAMP DEFAULT NOW() NOT NULL
      );
    `);

    console.log("✅ Migrations completed successfully!");
  } catch (error) {
    console.error("❌ Migration failed:", error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

main();
