import { pgTable, text, integer, boolean, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("participant"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const homeContent = pgTable("home_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  heroTitle: text("hero_title").notNull(),
  heroSubtitle: text("hero_subtitle").notNull(),
  heroDescription: text("hero_description").notNull(),
  participantsCount: integer("participants_count").notNull().default(0),
  projectsCount: integer("projects_count").notNull().default(0),
  yearsCount: integer("years_count").notNull().default(0),
  judgesCount: integer("judges_count").notNull().default(0),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const aboutContent = pgTable("about_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  mission: text("mission").notNull(),
  vision: text("vision").notNull(),
  founderName: text("founder_name").notNull(),
  founderBio: text("founder_bio").notNull(),
  founderImage: text("founder_image"),
  historyContent: text("history_content").notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const boardMembers = pgTable("board_members", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  position: text("position").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const categories = pgTable("categories", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  color: text("color").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const scheduleItems = pgTable("schedule_items", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  date: text("date").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const judges = pgTable("judges", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  expertise: text("expertise").notNull(),
  organization: text("organization").notNull(),
  bio: text("bio").notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const galleryImages = pgTable("gallery_images", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  imageUrl: text("image_url").notNull(),
  category: text("category"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const blogPosts = pgTable("blog_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  featuredImage: text("featured_image"),
  author: text("author").notNull(),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const news = pgTable("news", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  content: text("content").notNull(),
  externalLink: text("external_link"),
  source: text("source"),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const notices = pgTable("notices", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  isPinned: boolean("is_pinned").notNull().default(false),
  isUrgent: boolean("is_urgent").notNull().default(false),
  publishedAt: timestamp("published_at").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const videos = pgTable("videos", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  youtubeUrl: text("youtube_url").notNull(),
  thumbnail: text("thumbnail"),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").notNull().default(false),
  status: text("status").notNull().default("new"),
  priority: text("priority").notNull().default("medium"),
  tags: text("tags"),
  notes: text("notes"),
  assignedTo: text("assigned_to"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const footerContent = pgTable("footer_content", {
  id: uuid("id").primaryKey().defaultRandom(),
  aboutText: text("about_text").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  facebookUrl: text("facebook_url"),
  twitterUrl: text("twitter_url"),
  instagramUrl: text("instagram_url"),
  linkedinUrl: text("linkedin_url"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const siteSettings = pgTable("site_settings", {
  id: uuid("id").primaryKey().defaultRandom(),
  registrationLink: text("registration_link"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type SiteSettings = typeof siteSettings.$inferSelect;
export type HomeContent = typeof homeContent.$inferSelect;
export type AboutContent = typeof aboutContent.$inferSelect;
export type BoardMember = typeof boardMembers.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type ScheduleItem = typeof scheduleItems.$inferSelect;
export type Judge = typeof judges.$inferSelect;
export type GalleryImage = typeof galleryImages.$inferSelect;
export type BlogPost = typeof blogPosts.$inferSelect;
export type News = typeof news.$inferSelect;
export type Notice = typeof notices.$inferSelect;
export type Video = typeof videos.$inferSelect;
export type ContactMessage = typeof contactMessages.$inferSelect;
export type FooterContent = typeof footerContent.$inferSelect;

export const insertUserSchema = createInsertSchema(users).omit({ id: true, createdAt: true });
export const insertHomeContentSchema = createInsertSchema(homeContent).omit({ id: true, updatedAt: true });
export const insertAboutContentSchema = createInsertSchema(aboutContent).omit({ id: true, updatedAt: true });
export const insertBoardMemberSchema = createInsertSchema(boardMembers).omit({ id: true, createdAt: true });
export const insertCategorySchema = createInsertSchema(categories).omit({ id: true, createdAt: true });
export const insertScheduleItemSchema = createInsertSchema(scheduleItems).omit({ id: true, createdAt: true });
export const insertJudgeSchema = createInsertSchema(judges).omit({ id: true, createdAt: true });
export const insertGalleryImageSchema = createInsertSchema(galleryImages).omit({ id: true, createdAt: true });
export const insertBlogPostSchema = createInsertSchema(blogPosts).omit({ id: true, publishedAt: true, createdAt: true });
export const insertNewsSchema = createInsertSchema(news).omit({ id: true, publishedAt: true, createdAt: true });
export const insertNoticeSchema = createInsertSchema(notices).omit({ id: true, isPinned: true, isUrgent: true, publishedAt: true, createdAt: true }).extend({
  isPinned: z.boolean().optional().default(false),
  isUrgent: z.boolean().optional().default(false),
});
export const insertVideoSchema = createInsertSchema(videos).omit({ id: true, createdAt: true });
export const insertContactMessageSchema = createInsertSchema(contactMessages).omit({ id: true, isRead: true, status: true, priority: true, createdAt: true, updatedAt: true });
export const insertFooterContentSchema = createInsertSchema(footerContent).omit({ id: true, updatedAt: true });
export const insertSiteSettingsSchema = createInsertSchema(siteSettings).omit({ id: true, updatedAt: true });

export type InsertUser = z.infer<typeof insertUserSchema>;
export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
export type InsertHomeContent = z.infer<typeof insertHomeContentSchema>;
export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;
export type InsertBoardMember = z.infer<typeof insertBoardMemberSchema>;
export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type InsertScheduleItem = z.infer<typeof insertScheduleItemSchema>;
export type InsertJudge = z.infer<typeof insertJudgeSchema>;
export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;
export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;
export type InsertNews = z.infer<typeof insertNewsSchema>;
export type InsertNotice = z.infer<typeof insertNoticeSchema>;
export type InsertVideo = z.infer<typeof insertVideoSchema>;
export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;
export type InsertFooterContent = z.infer<typeof insertFooterContentSchema>;
