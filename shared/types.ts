import { z } from "zod";

// User types
export interface User {
  id: string;
  username: string;
  password: string;
  role: string;
  createdAt: Date;
}

export const insertUserSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
  role: z.string().default("participant"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;

// Home Content types
export interface HomeContent {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  participantsCount: number;
  projectsCount: number;
  yearsCount: number;
  judgesCount: number;
  updatedAt: Date;
}

export const insertHomeContentSchema = z.object({
  heroTitle: z.string().min(1),
  heroSubtitle: z.string().min(1),
  heroDescription: z.string().min(1),
  participantsCount: z.number().default(0),
  projectsCount: z.number().default(0),
  yearsCount: z.number().default(0),
  judgesCount: z.number().default(0),
});

export type InsertHomeContent = z.infer<typeof insertHomeContentSchema>;

// About Content types
export interface AboutContent {
  id: string;
  mission: string;
  vision: string;
  founderName: string;
  founderBio: string;
  founderImage: string | null;
  historyContent: string;
  updatedAt: Date;
}

export const insertAboutContentSchema = z.object({
  mission: z.string().min(1),
  vision: z.string().min(1),
  founderName: z.string().min(1),
  founderBio: z.string().min(1),
  founderImage: z.string().nullable().optional(),
  historyContent: z.string().min(1),
});

export type InsertAboutContent = z.infer<typeof insertAboutContentSchema>;

// Board Member types
export interface BoardMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  image: string | null;
  order: number;
  createdAt: Date;
}

export const insertBoardMemberSchema = z.object({
  name: z.string().min(1),
  position: z.string().min(1),
  bio: z.string().min(1),
  image: z.string().nullable().optional(),
  order: z.number().default(0),
});

export type InsertBoardMember = z.infer<typeof insertBoardMemberSchema>;

// Category types
export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  order: number;
  createdAt: Date;
}

export const insertCategorySchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  icon: z.string().min(1),
  color: z.string().min(1),
  order: z.number().default(0),
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;

// Schedule Item types
export interface ScheduleItem {
  id: string;
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  date: string;
  location: string;
  type: string;
  createdAt: Date;
}

export const insertScheduleItemSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
  date: z.string().min(1),
  location: z.string().min(1),
  type: z.string().min(1),
});

export type InsertScheduleItem = z.infer<typeof insertScheduleItemSchema>;

// Judge types
export interface Judge {
  id: string;
  name: string;
  expertise: string;
  organization: string;
  bio: string;
  image: string | null;
  createdAt: Date;
}

export const insertJudgeSchema = z.object({
  name: z.string().min(1),
  expertise: z.string().min(1),
  organization: z.string().min(1),
  bio: z.string().min(1),
  image: z.string().nullable().optional(),
});

export type InsertJudge = z.infer<typeof insertJudgeSchema>;

// Gallery Image types
export interface GalleryImage {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  category: string | null;
  order: number;
  createdAt: Date;
}

export const insertGalleryImageSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  imageUrl: z.string().min(1),
  category: z.string().nullable().optional(),
  order: z.number().default(0),
});

export type InsertGalleryImage = z.infer<typeof insertGalleryImageSchema>;

// Blog Post types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  author: string;
  publishedAt: Date;
  createdAt: Date;
}

export const insertBlogPostSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  featuredImage: z.string().nullable().optional(),
  author: z.string().min(1),
});

export type InsertBlogPost = z.infer<typeof insertBlogPostSchema>;

// News types
export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  externalLink: string | null;
  source: string | null;
  publishedAt: Date;
  createdAt: Date;
}

export const insertNewsSchema = z.object({
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(1),
  externalLink: z.string().nullable().optional(),
  source: z.string().nullable().optional(),
});

export type InsertNews = z.infer<typeof insertNewsSchema>;

// Notice types
export interface Notice {
  id: string;
  title: string;
  content: string;
  isPinned: boolean;
  isUrgent: boolean;
  publishedAt: Date;
  createdAt: Date;
}

export const insertNoticeSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  isPinned: z.boolean().optional().default(false),
  isUrgent: z.boolean().optional().default(false),
});

export type InsertNotice = z.infer<typeof insertNoticeSchema>;

// Video types
export interface Video {
  id: string;
  title: string;
  description: string | null;
  youtubeUrl: string;
  thumbnail: string | null;
  order: number;
  createdAt: Date;
}

export const insertVideoSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional(),
  youtubeUrl: z.string().min(1),
  thumbnail: z.string().nullable().optional(),
  order: z.number().default(0),
});

export type InsertVideo = z.infer<typeof insertVideoSchema>;

// Contact Message types
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  isRead: boolean;
  status: string;
  priority: string;
  tags: string | null;
  notes: string | null;
  assignedTo: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export const insertContactMessageSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  subject: z.string().min(1),
  message: z.string().min(1),
});

export type InsertContactMessage = z.infer<typeof insertContactMessageSchema>;

// Footer Content types
export interface FooterContent {
  id: string;
  aboutText: string;
  email: string;
  phone: string;
  address: string;
  facebookUrl: string | null;
  twitterUrl: string | null;
  instagramUrl: string | null;
  linkedinUrl: string | null;
  updatedAt: Date;
}

export const insertFooterContentSchema = z.object({
  aboutText: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  facebookUrl: z.string().nullable().optional(),
  twitterUrl: z.string().nullable().optional(),
  instagramUrl: z.string().nullable().optional(),
  linkedinUrl: z.string().nullable().optional(),
});

export type InsertFooterContent = z.infer<typeof insertFooterContentSchema>;

// Site Settings types
export interface SiteSettings {
  id: string;
  registrationLink: string | null;
  updatedAt: Date;
}

export const insertSiteSettingsSchema = z.object({
  registrationLink: z.string().nullable().optional(),
});

export type InsertSiteSettings = z.infer<typeof insertSiteSettingsSchema>;
