import { getDb, generateId } from "./mongodb";
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
} from "@shared/types";
import type { IStorage } from "./storage";

function docToEntity<T>(doc: any): T {
  if (!doc) return doc;
  const { _id, ...rest } = doc;
  return { id: _id.toString(), ...rest } as T;
}

function docsToEntities<T>(docs: any[]): T[] {
  return docs.map((doc) => docToEntity<T>(doc));
}

export class MongoStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const db = await getDb();
    const doc = await db.collection("users").findOne({ _id: id as any });
    return doc ? docToEntity<User>(doc) : undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const db = await getDb();
    const doc = await db.collection("users").findOne({ username });
    return doc ? docToEntity<User>(doc) : undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const db = await getDb();
    const id = generateId();
    const user = {
      _id: id,
      ...insertUser,
      role: insertUser.role || "participant",
      createdAt: new Date(),
    };
    await db.collection("users").insertOne(user as any);
    return docToEntity<User>(user);
  }

  async getAllUsers(): Promise<User[]> {
    const db = await getDb();
    const docs = await db.collection("users").find().toArray();
    return docsToEntities<User>(docs);
  }

  async getHomeContent(): Promise<HomeContent | undefined> {
    const db = await getDb();
    const doc = await db.collection("homeContent").findOne({});
    return doc ? docToEntity<HomeContent>(doc) : undefined;
  }

  async updateHomeContent(content: InsertHomeContent): Promise<HomeContent> {
    const db = await getDb();
    const existing = await this.getHomeContent();
    
    const homeContent = {
      _id: existing?.id || generateId(),
      heroTitle: content.heroTitle,
      heroSubtitle: content.heroSubtitle,
      heroDescription: content.heroDescription,
      participantsCount: content.participantsCount ?? 0,
      projectsCount: content.projectsCount ?? 0,
      yearsCount: content.yearsCount ?? 0,
      judgesCount: content.judgesCount ?? 0,
      updatedAt: new Date(),
    };

    await db.collection("homeContent").replaceOne(
      {},
      homeContent as any,
      { upsert: true }
    );
    return docToEntity<HomeContent>(homeContent);
  }

  async getAboutContent(): Promise<AboutContent | undefined> {
    const db = await getDb();
    const doc = await db.collection("aboutContent").findOne({});
    return doc ? docToEntity<AboutContent>(doc) : undefined;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    const db = await getDb();
    const existing = await this.getAboutContent();
    
    const aboutContent = {
      _id: existing?.id || generateId(),
      mission: content.mission,
      vision: content.vision,
      founderName: content.founderName,
      founderBio: content.founderBio,
      founderImage: content.founderImage ?? null,
      historyContent: content.historyContent,
      updatedAt: new Date(),
    };

    await db.collection("aboutContent").replaceOne(
      {},
      aboutContent as any,
      { upsert: true }
    );
    return docToEntity<AboutContent>(aboutContent);
  }

  async getBoardMembers(): Promise<BoardMember[]> {
    const db = await getDb();
    const docs = await db.collection("boardMembers").find().sort({ order: 1 }).toArray();
    return docsToEntities<BoardMember>(docs);
  }

  async createBoardMember(member: InsertBoardMember): Promise<BoardMember> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image ?? null,
      order: member.order ?? 0,
      createdAt: new Date(),
    };
    await db.collection("boardMembers").insertOne(doc as any);
    return docToEntity<BoardMember>(doc);
  }

  async updateBoardMember(id: string, member: InsertBoardMember): Promise<BoardMember | undefined> {
    const db = await getDb();
    const result = await db.collection("boardMembers").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          name: member.name,
          position: member.position,
          bio: member.bio,
          image: member.image ?? null,
          order: member.order ?? 0,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<BoardMember>(result) : undefined;
  }

  async deleteBoardMember(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("boardMembers").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getCategories(): Promise<Category[]> {
    const db = await getDb();
    const docs = await db.collection("categories").find().sort({ order: 1 }).toArray();
    return docsToEntities<Category>(docs);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      order: category.order ?? 0,
      createdAt: new Date(),
    };
    await db.collection("categories").insertOne(doc as any);
    return docToEntity<Category>(doc);
  }

  async updateCategory(id: string, category: InsertCategory): Promise<Category | undefined> {
    const db = await getDb();
    const result = await db.collection("categories").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          name: category.name,
          description: category.description,
          icon: category.icon,
          color: category.color,
          order: category.order ?? 0,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<Category>(result) : undefined;
  }

  async deleteCategory(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("categories").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getScheduleItems(): Promise<ScheduleItem[]> {
    const db = await getDb();
    const docs = await db.collection("scheduleItems").find().sort({ date: 1, startTime: 1 }).toArray();
    return docsToEntities<ScheduleItem>(docs);
  }

  async createScheduleItem(item: InsertScheduleItem): Promise<ScheduleItem> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      ...item,
      createdAt: new Date(),
    };
    await db.collection("scheduleItems").insertOne(doc as any);
    return docToEntity<ScheduleItem>(doc);
  }

  async updateScheduleItem(id: string, item: InsertScheduleItem): Promise<ScheduleItem | undefined> {
    const db = await getDb();
    const result = await db.collection("scheduleItems").findOneAndUpdate(
      { _id: id as any },
      { $set: item },
      { returnDocument: "after" }
    );
    return result ? docToEntity<ScheduleItem>(result) : undefined;
  }

  async deleteScheduleItem(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("scheduleItems").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getJudges(): Promise<Judge[]> {
    const db = await getDb();
    const docs = await db.collection("judges").find().toArray();
    return docsToEntities<Judge>(docs);
  }

  async createJudge(judge: InsertJudge): Promise<Judge> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      name: judge.name,
      expertise: judge.expertise,
      organization: judge.organization,
      bio: judge.bio,
      image: judge.image ?? null,
      createdAt: new Date(),
    };
    await db.collection("judges").insertOne(doc as any);
    return docToEntity<Judge>(doc);
  }

  async deleteJudge(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("judges").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    const db = await getDb();
    const docs = await db.collection("galleryImages").find().sort({ order: 1 }).toArray();
    return docsToEntities<GalleryImage>(docs);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      title: image.title,
      description: image.description ?? null,
      imageUrl: image.imageUrl,
      category: image.category ?? null,
      order: image.order ?? 0,
      createdAt: new Date(),
    };
    await db.collection("galleryImages").insertOne(doc as any);
    return docToEntity<GalleryImage>(doc);
  }

  async updateGalleryImage(id: string, image: InsertGalleryImage): Promise<GalleryImage | undefined> {
    const db = await getDb();
    const result = await db.collection("galleryImages").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          title: image.title,
          description: image.description ?? null,
          imageUrl: image.imageUrl,
          category: image.category ?? null,
          order: image.order ?? 0,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<GalleryImage>(result) : undefined;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("galleryImages").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    const db = await getDb();
    const docs = await db.collection("blogPosts").find().sort({ publishedAt: -1 }).toArray();
    return docsToEntities<BlogPost>(docs);
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    const db = await getDb();
    const doc = await db.collection("blogPosts").findOne({ _id: id as any });
    return doc ? docToEntity<BlogPost>(doc) : undefined;
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage ?? null,
      author: post.author,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    await db.collection("blogPosts").insertOne(doc as any);
    return docToEntity<BlogPost>(doc);
  }

  async updateBlogPost(id: string, post: InsertBlogPost): Promise<BlogPost | undefined> {
    const db = await getDb();
    const result = await db.collection("blogPosts").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          title: post.title,
          excerpt: post.excerpt,
          content: post.content,
          featuredImage: post.featuredImage ?? null,
          author: post.author,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<BlogPost>(result) : undefined;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("blogPosts").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getNews(): Promise<News[]> {
    const db = await getDb();
    const docs = await db.collection("news").find().sort({ publishedAt: -1 }).toArray();
    return docsToEntities<News>(docs);
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      externalLink: newsItem.externalLink ?? null,
      source: newsItem.source ?? null,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    await db.collection("news").insertOne(doc as any);
    return docToEntity<News>(doc);
  }

  async updateNews(id: string, newsItem: InsertNews): Promise<News | undefined> {
    const db = await getDb();
    const result = await db.collection("news").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          title: newsItem.title,
          excerpt: newsItem.excerpt,
          content: newsItem.content,
          externalLink: newsItem.externalLink ?? null,
          source: newsItem.source ?? null,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<News>(result) : undefined;
  }

  async deleteNews(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("news").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getNotices(): Promise<Notice[]> {
    const db = await getDb();
    const docs = await db.collection("notices").find().sort({ isPinned: -1, publishedAt: -1 }).toArray();
    return docsToEntities<Notice>(docs);
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned ?? false,
      isUrgent: notice.isUrgent ?? false,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    await db.collection("notices").insertOne(doc as any);
    return docToEntity<Notice>(doc);
  }

  async updateNotice(id: string, notice: Partial<Notice>): Promise<Notice | undefined> {
    const db = await getDb();
    const result = await db.collection("notices").findOneAndUpdate(
      { _id: id as any },
      { $set: notice },
      { returnDocument: "after" }
    );
    return result ? docToEntity<Notice>(result) : undefined;
  }

  async deleteNotice(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("notices").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getVideos(): Promise<Video[]> {
    const db = await getDb();
    const docs = await db.collection("videos").find().sort({ order: 1 }).toArray();
    return docsToEntities<Video>(docs);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      title: video.title,
      description: video.description ?? null,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail ?? null,
      order: video.order ?? 0,
      createdAt: new Date(),
    };
    await db.collection("videos").insertOne(doc as any);
    return docToEntity<Video>(doc);
  }

  async updateVideo(id: string, video: InsertVideo): Promise<Video | undefined> {
    const db = await getDb();
    const result = await db.collection("videos").findOneAndUpdate(
      { _id: id as any },
      {
        $set: {
          title: video.title,
          description: video.description ?? null,
          youtubeUrl: video.youtubeUrl,
          thumbnail: video.thumbnail ?? null,
          order: video.order ?? 0,
        },
      },
      { returnDocument: "after" }
    );
    return result ? docToEntity<Video>(result) : undefined;
  }

  async deleteVideo(id: string): Promise<boolean> {
    const db = await getDb();
    const result = await db.collection("videos").deleteOne({ _id: id as any });
    return result.deletedCount > 0;
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    const db = await getDb();
    const docs = await db.collection("contactMessages").find().sort({ createdAt: -1 }).toArray();
    return docsToEntities<ContactMessage>(docs);
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const db = await getDb();
    const id = generateId();
    const doc = {
      _id: id,
      name: message.name,
      email: message.email,
      subject: message.subject,
      message: message.message,
      isRead: false,
      status: "new",
      priority: "medium",
      tags: null,
      notes: null,
      assignedTo: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await db.collection("contactMessages").insertOne(doc as any);
    return docToEntity<ContactMessage>(doc);
  }

  async markMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const db = await getDb();
    const result = await db.collection("contactMessages").findOneAndUpdate(
      { _id: id as any },
      { $set: { isRead: true, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result ? docToEntity<ContactMessage>(result) : undefined;
  }

  async updateContactMessage(id: string, data: Partial<ContactMessage>): Promise<ContactMessage | undefined> {
    const db = await getDb();
    const result = await db.collection("contactMessages").findOneAndUpdate(
      { _id: id as any },
      { $set: { ...data, updatedAt: new Date() } },
      { returnDocument: "after" }
    );
    return result ? docToEntity<ContactMessage>(result) : undefined;
  }

  async getFooterContent(): Promise<FooterContent | undefined> {
    const db = await getDb();
    const doc = await db.collection("footerContent").findOne({});
    return doc ? docToEntity<FooterContent>(doc) : undefined;
  }

  async updateFooterContent(content: InsertFooterContent): Promise<FooterContent> {
    const db = await getDb();
    const existing = await this.getFooterContent();
    
    const footerContent = {
      _id: existing?.id || generateId(),
      aboutText: content.aboutText,
      email: content.email,
      phone: content.phone,
      address: content.address,
      facebookUrl: content.facebookUrl ?? null,
      twitterUrl: content.twitterUrl ?? null,
      instagramUrl: content.instagramUrl ?? null,
      linkedinUrl: content.linkedinUrl ?? null,
      updatedAt: new Date(),
    };

    await db.collection("footerContent").replaceOne(
      {},
      footerContent as any,
      { upsert: true }
    );
    return docToEntity<FooterContent>(footerContent);
  }

  async getSiteSettings(): Promise<SiteSettings | undefined> {
    const db = await getDb();
    const doc = await db.collection("siteSettings").findOne({});
    return doc ? docToEntity<SiteSettings>(doc) : undefined;
  }

  async updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    const db = await getDb();
    const existing = await this.getSiteSettings();
    
    const siteSettings = {
      _id: existing?.id || generateId(),
      registrationLink: settings.registrationLink ?? null,
      updatedAt: new Date(),
    };

    await db.collection("siteSettings").replaceOne(
      {},
      siteSettings as any,
      { upsert: true }
    );
    return docToEntity<SiteSettings>(siteSettings);
  }
}
