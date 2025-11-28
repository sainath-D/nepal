import { eq, desc, asc } from "drizzle-orm";
import { db } from "./db";
import * as schema from "@shared/schema";
import type {
  User,
  InsertUser,
  HomeContent,
  InsertHomeContent,
  AboutContent,
  InsertAboutContent,
  BoardMember,
  InsertBoardMember,
  Category,
  InsertCategory,
  ScheduleItem,
  InsertScheduleItem,
  Judge,
  InsertJudge,
  GalleryImage,
  InsertGalleryImage,
  BlogPost,
  InsertBlogPost,
  News,
  InsertNews,
  Notice,
  InsertNotice,
  Video,
  InsertVideo,
  ContactMessage,
  InsertContactMessage,
  FooterContent,
  InsertFooterContent,
  SiteSettings,
  InsertSiteSettings,
} from "@shared/schema";
import type { IStorage } from "./storage";

export class DbStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(schema.users).where(eq(schema.users.username, username));
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(schema.users).values(insertUser).returning();
    return result[0];
  }

  async getAllUsers(): Promise<User[]> {
    return await db.select().from(schema.users);
  }

  async getHomeContent(): Promise<HomeContent | undefined> {
    const result = await db.select().from(schema.homeContent).limit(1);
    return result[0];
  }

  async updateHomeContent(content: InsertHomeContent): Promise<HomeContent> {
    const existing = await this.getHomeContent();
    
    if (existing) {
      const result = await db
        .update(schema.homeContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(schema.homeContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.homeContent).values(content).returning();
      return result[0];
    }
  }

  async getAboutContent(): Promise<AboutContent | undefined> {
    const result = await db.select().from(schema.aboutContent).limit(1);
    return result[0];
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const existing = await this.getAboutContent();
    
    if (existing) {
      const result = await db
        .update(schema.aboutContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(schema.aboutContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.aboutContent).values(content).returning();
      return result[0];
    }
  }

  async getBoardMembers(): Promise<BoardMember[]> {
    return await db.select().from(schema.boardMembers).orderBy(asc(schema.boardMembers.order));
  }

  async createBoardMember(member: InsertBoardMember): Promise<BoardMember> {
    const result = await db.insert(schema.boardMembers).values(member).returning();
    return result[0];
  }

  async updateBoardMember(id: string, member: InsertBoardMember): Promise<BoardMember | undefined> {
    const result = await db
      .update(schema.boardMembers)
      .set(member)
      .where(eq(schema.boardMembers.id, id))
      .returning();
    return result[0];
  }

  async deleteBoardMember(id: string): Promise<boolean> {
    const result = await db.delete(schema.boardMembers).where(eq(schema.boardMembers.id, id)).returning();
    return result.length > 0;
  }

  async getCategories(): Promise<Category[]> {
    return await db.select().from(schema.categories).orderBy(asc(schema.categories.order));
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const result = await db.insert(schema.categories).values(category).returning();
    return result[0];
  }

  async updateCategory(id: string, category: InsertCategory): Promise<Category | undefined> {
    const result = await db
      .update(schema.categories)
      .set(category)
      .where(eq(schema.categories.id, id))
      .returning();
    return result[0];
  }

  async deleteCategory(id: string): Promise<boolean> {
    const result = await db.delete(schema.categories).where(eq(schema.categories.id, id)).returning();
    return result.length > 0;
  }

  async getScheduleItems(): Promise<ScheduleItem[]> {
    return await db.select().from(schema.scheduleItems).orderBy(asc(schema.scheduleItems.date), asc(schema.scheduleItems.startTime));
  }

  async createScheduleItem(item: InsertScheduleItem): Promise<ScheduleItem> {
    const result = await db.insert(schema.scheduleItems).values(item).returning();
    return result[0];
  }

  async updateScheduleItem(id: string, item: InsertScheduleItem): Promise<ScheduleItem | undefined> {
    const result = await db
      .update(schema.scheduleItems)
      .set(item)
      .where(eq(schema.scheduleItems.id, id))
      .returning();
    return result[0];
  }

  async deleteScheduleItem(id: string): Promise<boolean> {
    const result = await db.delete(schema.scheduleItems).where(eq(schema.scheduleItems.id, id)).returning();
    return result.length > 0;
  }

  async getJudges(): Promise<Judge[]> {
    return await db.select().from(schema.judges);
  }

  async createJudge(judge: InsertJudge): Promise<Judge> {
    const result = await db.insert(schema.judges).values(judge).returning();
    return result[0];
  }

  async deleteJudge(id: string): Promise<boolean> {
    const result = await db.delete(schema.judges).where(eq(schema.judges.id, id)).returning();
    return result.length > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return await db.select().from(schema.galleryImages).orderBy(asc(schema.galleryImages.order));
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const result = await db.insert(schema.galleryImages).values(image).returning();
    return result[0];
  }

  async updateGalleryImage(id: string, image: InsertGalleryImage): Promise<GalleryImage | undefined> {
    const result = await db
      .update(schema.galleryImages)
      .set(image)
      .where(eq(schema.galleryImages.id, id))
      .returning();
    return result[0];
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const result = await db.delete(schema.galleryImages).where(eq(schema.galleryImages.id, id)).returning();
    return result.length > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return await db.select().from(schema.blogPosts).orderBy(desc(schema.blogPosts.publishedAt));
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const result = await db.select().from(schema.blogPosts).where(eq(schema.blogPosts.id, id));
    return result[0];
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const result = await db.insert(schema.blogPosts).values(post).returning();
    return result[0];
  }

  async updateBlogPost(id: string, post: InsertBlogPost): Promise<BlogPost | undefined> {
    const result = await db
      .update(schema.blogPosts)
      .set(post)
      .where(eq(schema.blogPosts.id, id))
      .returning();
    return result[0];
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const result = await db.delete(schema.blogPosts).where(eq(schema.blogPosts.id, id)).returning();
    return result.length > 0;
  }

  async getNews(): Promise<News[]> {
    return await db.select().from(schema.news).orderBy(desc(schema.news.publishedAt));
  }

  async createNews(news: InsertNews): Promise<News> {
    const result = await db.insert(schema.news).values(news).returning();
    return result[0];
  }

  async updateNews(id: string, news: InsertNews): Promise<News | undefined> {
    const result = await db
      .update(schema.news)
      .set(news)
      .where(eq(schema.news.id, id))
      .returning();
    return result[0];
  }

  async deleteNews(id: string): Promise<boolean> {
    const result = await db.delete(schema.news).where(eq(schema.news.id, id)).returning();
    return result.length > 0;
  }

  async getNotices(): Promise<Notice[]> {
    return await db.select().from(schema.notices).orderBy(desc(schema.notices.isPinned), desc(schema.notices.publishedAt));
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const result = await db.insert(schema.notices).values(notice).returning();
    return result[0];
  }

  async updateNotice(id: string, notice: Partial<Notice>): Promise<Notice | undefined> {
    const result = await db
      .update(schema.notices)
      .set(notice)
      .where(eq(schema.notices.id, id))
      .returning();
    return result[0];
  }

  async deleteNotice(id: string): Promise<boolean> {
    const result = await db.delete(schema.notices).where(eq(schema.notices.id, id)).returning();
    return result.length > 0;
  }

  async getVideos(): Promise<Video[]> {
    return await db.select().from(schema.videos).orderBy(asc(schema.videos.order));
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const result = await db.insert(schema.videos).values(video).returning();
    return result[0];
  }

  async updateVideo(id: string, video: InsertVideo): Promise<Video | undefined> {
    const result = await db
      .update(schema.videos)
      .set(video)
      .where(eq(schema.videos.id, id))
      .returning();
    return result[0];
  }

  async deleteVideo(id: string): Promise<boolean> {
    const result = await db.delete(schema.videos).where(eq(schema.videos.id, id)).returning();
    return result.length > 0;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return await db.select().from(schema.contactMessages).orderBy(desc(schema.contactMessages.createdAt));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(schema.contactMessages).values(message).returning();
    return result[0];
  }

  async markMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const result = await db
      .update(schema.contactMessages)
      .set({ isRead: true })
      .where(eq(schema.contactMessages.id, id))
      .returning();
    return result[0];
  }

  async updateContactMessage(id: string, data: Partial<ContactMessage>): Promise<ContactMessage | undefined> {
    const result = await db
      .update(schema.contactMessages)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(schema.contactMessages.id, id))
      .returning();
    return result[0];
  }

  async getFooterContent(): Promise<FooterContent | undefined> {
    const result = await db.select().from(schema.footerContent).limit(1);
    return result[0];
  }

  async updateFooterContent(content: InsertFooterContent): Promise<FooterContent> {
    const existing = await this.getFooterContent();
    
    if (existing) {
      const result = await db
        .update(schema.footerContent)
        .set({ ...content, updatedAt: new Date() })
        .where(eq(schema.footerContent.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.footerContent).values(content).returning();
      return result[0];
    }
  }

  async getSiteSettings(): Promise<SiteSettings | undefined> {
    const result = await db.select().from(schema.siteSettings).limit(1);
    return result[0];
  }

  async updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    const existing = await this.getSiteSettings();
    
    if (existing) {
      const result = await db
        .update(schema.siteSettings)
        .set({ ...settings, updatedAt: new Date() })
        .where(eq(schema.siteSettings.id, existing.id))
        .returning();
      return result[0];
    } else {
      const result = await db.insert(schema.siteSettings).values(settings).returning();
      return result[0];
    }
  }
}
