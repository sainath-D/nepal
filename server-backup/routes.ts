import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, hashPassword } from "./auth";
import { seedDatabase } from "./seed-mongo";
import {
  insertContactMessageSchema,
  insertHomeContentSchema,
  insertAboutContentSchema,
  insertBoardMemberSchema,
  insertCategorySchema,
  insertScheduleItemSchema,
  insertJudgeSchema,
  insertGalleryImageSchema,
  insertBlogPostSchema,
  insertNewsSchema,
  insertNoticeSchema,
  insertVideoSchema,
  insertFooterContentSchema,
  insertSiteSettingsSchema,
} from "@shared/types";

export async function registerRoutes(app: Express): Promise<Server> {
  await seedDatabase();
  
  const users = await storage.getAllUsers();
  if (!users || users.length === 0) {
    const hashedPassword = await hashPassword("admin123");
    await storage.createUser({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    });
    console.log("✅ Default admin account initialized (username: admin, password: admin123)");
  }
  
  setupAuth(app);
  app.get("/api/home", async (_req: Request, res: Response) => {
    try {
      const content = await storage.getHomeContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch home content" });
    }
  });

  app.post("/api/home", async (req: Request, res: Response) => {
    try {
      const data = insertHomeContentSchema.parse(req.body);
      const content = await storage.updateHomeContent(data);
      res.json(content);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/about", async (_req: Request, res: Response) => {
    try {
      const content = await storage.getAboutContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch about content" });
    }
  });

  app.post("/api/about", async (req: Request, res: Response) => {
    try {
      const data = insertAboutContentSchema.parse(req.body);
      const content = await storage.updateAboutContent(data);
      res.json(content);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/board-members", async (_req: Request, res: Response) => {
    try {
      const members = await storage.getBoardMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch board members" });
    }
  });

  app.post("/api/board-members", async (req: Request, res: Response) => {
    try {
      const data = insertBoardMemberSchema.parse(req.body);
      const member = await storage.createBoardMember(data);
      res.json(member);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/board-members/:id", async (req: Request, res: Response) => {
    try {
      const data = insertBoardMemberSchema.parse(req.body);
      const member = await storage.updateBoardMember(req.params.id, data);
      if (member) {
        res.json(member);
      } else {
        res.status(404).json({ error: "Board member not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/board-members/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteBoardMember(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Board member not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete board member" });
    }
  });

  app.get("/api/categories", async (_req: Request, res: Response) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  app.post("/api/categories", async (req: Request, res: Response) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(data);
      res.json(category);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const data = insertCategorySchema.parse(req.body);
      const category = await storage.updateCategory(req.params.id, data);
      if (category) {
        res.json(category);
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/categories/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteCategory(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Category not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete category" });
    }
  });

  app.get("/api/schedule", async (_req: Request, res: Response) => {
    try {
      const items = await storage.getScheduleItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch schedule" });
    }
  });

  app.post("/api/schedule", async (req: Request, res: Response) => {
    try {
      const data = insertScheduleItemSchema.parse(req.body);
      const item = await storage.createScheduleItem(data);
      res.json(item);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/schedule/:id", async (req: Request, res: Response) => {
    try {
      const data = insertScheduleItemSchema.parse(req.body);
      const item = await storage.updateScheduleItem(req.params.id, data);
      if (item) {
        res.json(item);
      } else {
        res.status(404).json({ error: "Schedule item not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/schedule/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteScheduleItem(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Schedule item not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete schedule item" });
    }
  });

  app.get("/api/judges", async (_req: Request, res: Response) => {
    try {
      const judges = await storage.getJudges();
      res.json(judges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch judges" });
    }
  });

  app.post("/api/judges", async (req: Request, res: Response) => {
    try {
      const data = insertJudgeSchema.parse(req.body);
      const judge = await storage.createJudge(data);
      res.json(judge);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/judges/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteJudge(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Judge not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete judge" });
    }
  });

  app.get("/api/gallery", async (_req: Request, res: Response) => {
    try {
      const images = await storage.getGalleryImages();
      res.json(images);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch gallery images" });
    }
  });

  app.post("/api/gallery", async (req: Request, res: Response) => {
    try {
      const data = insertGalleryImageSchema.parse(req.body);
      const image = await storage.createGalleryImage(data);
      res.json(image);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const data = insertGalleryImageSchema.parse(req.body);
      const image = await storage.updateGalleryImage(req.params.id, data);
      if (image) {
        res.json(image);
      } else {
        res.status(404).json({ error: "Gallery image not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/gallery/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteGalleryImage(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Gallery image not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete gallery image" });
    }
  });

  app.get("/api/blog", async (_req: Request, res: Response) => {
    try {
      const posts = await storage.getBlogPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog posts" });
    }
  });

  app.get("/api/blog/:id", async (req: Request, res: Response) => {
    try {
      const post = await storage.getBlogPost(req.params.id);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch blog post" });
    }
  });

  app.post("/api/blog", async (req: Request, res: Response) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.createBlogPost(data);
      res.json(post);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/blog/:id", async (req: Request, res: Response) => {
    try {
      const data = insertBlogPostSchema.parse(req.body);
      const post = await storage.updateBlogPost(req.params.id, data);
      if (post) {
        res.json(post);
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/blog/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteBlogPost(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Blog post not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete blog post" });
    }
  });

  app.get("/api/news", async (_req: Request, res: Response) => {
    try {
      const news = await storage.getNews();
      res.json(news);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch news" });
    }
  });

  app.post("/api/news", async (req: Request, res: Response) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const news = await storage.createNews(data);
      res.json(news);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/news/:id", async (req: Request, res: Response) => {
    try {
      const data = insertNewsSchema.parse(req.body);
      const newsItem = await storage.updateNews(req.params.id, data);
      if (newsItem) {
        res.json(newsItem);
      } else {
        res.status(404).json({ error: "News not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/news/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteNews(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "News not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete news" });
    }
  });

  app.get("/api/notices", async (_req: Request, res: Response) => {
    try {
      const notices = await storage.getNotices();
      res.json(notices);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch notices" });
    }
  });

  app.post("/api/notices", async (req: Request, res: Response) => {
    try {
      const data = insertNoticeSchema.parse(req.body);
      const notice = await storage.createNotice(data);
      res.json(notice);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/notices/:id", async (req: Request, res: Response) => {
    try {
      const notice = await storage.updateNotice(req.params.id, req.body);
      if (notice) {
        res.json(notice);
      } else {
        res.status(404).json({ error: "Notice not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update notice" });
    }
  });

  app.delete("/api/notices/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteNotice(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Notice not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete notice" });
    }
  });

  app.get("/api/videos", async (_req: Request, res: Response) => {
    try {
      const videos = await storage.getVideos();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch videos" });
    }
  });

  app.post("/api/videos", async (req: Request, res: Response) => {
    try {
      const data = insertVideoSchema.parse(req.body);
      const video = await storage.createVideo(data);
      res.json(video);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/videos/:id", async (req: Request, res: Response) => {
    try {
      const data = insertVideoSchema.parse(req.body);
      const video = await storage.updateVideo(req.params.id, data);
      if (video) {
        res.json(video);
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.delete("/api/videos/:id", async (req: Request, res: Response) => {
    try {
      const deleted = await storage.deleteVideo(req.params.id);
      if (deleted) {
        res.json({ success: true });
      } else {
        res.status(404).json({ error: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to delete video" });
    }
  });

  app.get("/api/contact-messages", async (_req: Request, res: Response) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contact messages" });
    }
  });

  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const data = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(data);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.patch("/api/contact-messages/:id/read", async (req: Request, res: Response) => {
    try {
      const message = await storage.markMessageAsRead(req.params.id);
      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to mark message as read" });
    }
  });

  app.patch("/api/contact-messages/:id", async (req: Request, res: Response) => {
    try {
      const message = await storage.updateContactMessage(req.params.id, req.body);
      if (message) {
        res.json(message);
      } else {
        res.status(404).json({ error: "Message not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Failed to update message" });
    }
  });

  app.get("/api/footer", async (_req: Request, res: Response) => {
    try {
      const content = await storage.getFooterContent();
      res.json(content);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch footer content" });
    }
  });

  app.post("/api/footer", async (req: Request, res: Response) => {
    try {
      const data = insertFooterContentSchema.parse(req.body);
      const content = await storage.updateFooterContent(data);
      res.json(content);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  app.get("/api/site-settings", async (_req: Request, res: Response) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings || { registrationLink: null });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch site settings" });
    }
  });

  app.post("/api/site-settings", async (req: Request, res: Response) => {
    try {
      const data = insertSiteSettingsSchema.parse(req.body);
      const settings = await storage.updateSiteSettings(data);
      res.json(settings);
    } catch (error) {
      res.status(400).json({ error: "Invalid request data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
