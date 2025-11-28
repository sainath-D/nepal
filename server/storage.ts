import { randomUUID } from "crypto";
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

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getAllUsers(): Promise<User[]>;

  getHomeContent(): Promise<HomeContent | undefined>;
  updateHomeContent(content: InsertHomeContent): Promise<HomeContent>;

  getAboutContent(): Promise<AboutContent | undefined>;
  updateAboutContent(content: InsertAboutContent): Promise<AboutContent>;

  getBoardMembers(): Promise<BoardMember[]>;
  createBoardMember(member: InsertBoardMember): Promise<BoardMember>;
  updateBoardMember(id: string, member: InsertBoardMember): Promise<BoardMember | undefined>;
  deleteBoardMember(id: string): Promise<boolean>;

  getCategories(): Promise<Category[]>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: InsertCategory): Promise<Category | undefined>;
  deleteCategory(id: string): Promise<boolean>;

  getScheduleItems(): Promise<ScheduleItem[]>;
  createScheduleItem(item: InsertScheduleItem): Promise<ScheduleItem>;
  updateScheduleItem(id: string, item: InsertScheduleItem): Promise<ScheduleItem | undefined>;
  deleteScheduleItem(id: string): Promise<boolean>;

  getJudges(): Promise<Judge[]>;
  createJudge(judge: InsertJudge): Promise<Judge>;
  deleteJudge(id: string): Promise<boolean>;

  getGalleryImages(): Promise<GalleryImage[]>;
  createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage>;
  updateGalleryImage(id: string, image: InsertGalleryImage): Promise<GalleryImage | undefined>;
  deleteGalleryImage(id: string): Promise<boolean>;

  getBlogPosts(): Promise<BlogPost[]>;
  getBlogPost(id: string): Promise<BlogPost | undefined>;
  createBlogPost(post: InsertBlogPost): Promise<BlogPost>;
  updateBlogPost(id: string, post: InsertBlogPost): Promise<BlogPost | undefined>;
  deleteBlogPost(id: string): Promise<boolean>;

  getNews(): Promise<News[]>;
  createNews(news: InsertNews): Promise<News>;
  updateNews(id: string, news: InsertNews): Promise<News | undefined>;
  deleteNews(id: string): Promise<boolean>;

  getNotices(): Promise<Notice[]>;
  createNotice(notice: InsertNotice): Promise<Notice>;
  updateNotice(id: string, notice: Partial<Notice>): Promise<Notice | undefined>;
  deleteNotice(id: string): Promise<boolean>;

  getVideos(): Promise<Video[]>;
  createVideo(video: InsertVideo): Promise<Video>;
  updateVideo(id: string, video: InsertVideo): Promise<Video | undefined>;
  deleteVideo(id: string): Promise<boolean>;

  getContactMessages(): Promise<ContactMessage[]>;
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  markMessageAsRead(id: string): Promise<ContactMessage | undefined>;
  updateContactMessage(id: string, data: Partial<ContactMessage>): Promise<ContactMessage | undefined>;

  getFooterContent(): Promise<FooterContent | undefined>;
  updateFooterContent(content: InsertFooterContent): Promise<FooterContent>;

  getSiteSettings(): Promise<SiteSettings | undefined>;
  updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private homeContent: HomeContent | undefined;
  private aboutContent: AboutContent | undefined;
  private boardMembers: Map<string, BoardMember>;
  private categories: Map<string, Category>;
  private scheduleItems: Map<string, ScheduleItem>;
  private judges: Map<string, Judge>;
  private galleryImages: Map<string, GalleryImage>;
  private blogPosts: Map<string, BlogPost>;
  private news: Map<string, News>;
  private notices: Map<string, Notice>;
  private videos: Map<string, Video>;
  private contactMessages: Map<string, ContactMessage>;
  private footerContent: FooterContent | undefined;
  private siteSettings: SiteSettings | undefined;

  constructor() {
    this.users = new Map();
    this.boardMembers = new Map();
    this.categories = new Map();
    this.scheduleItems = new Map();
    this.judges = new Map();
    this.galleryImages = new Map();
    this.blogPosts = new Map();
    this.news = new Map();
    this.notices = new Map();
    this.videos = new Map();
    this.contactMessages = new Map();

    this.initializeMockData();
  }

  private initializeMockData() {
    this.homeContent = {
      id: randomUUID(),
      heroTitle: "Igniting Innovation Through Science",
      heroSubtitle: "Empowering Young Minds to Explore, Discover & Transform",
      heroDescription:
        "Join Nepal's premier science fair competition where students showcase groundbreaking projects in physics, chemistry, biology, robotics, and more.",
      participantsCount: 500,
      projectsCount: 250,
      yearsCount: 10,
      judgesCount: 45,
      updatedAt: new Date(),
    };

    this.aboutContent = {
      id: randomUUID(),
      mission:
        "To inspire and empower young scientists in Nepal by providing a platform for innovation, discovery, and scientific excellence.",
      vision:
        "A nation of curious minds where every student has the opportunity to explore science and contribute to Nepal's technological advancement.",
      founderName: "Dr. Rajesh Sharma",
      founderBio:
        "Dr. Sharma is an accomplished physicist with over 20 years of experience in science education. His passion for nurturing young talent led to the founding of NSN Science Fair in 2014.",
      founderImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rajesh",
      historyContent:
        "Founded in 2014, Nepal Science Navigators has grown from a small regional event to the country's most prestigious science fair competition. Over the past decade, we've supported thousands of students in their scientific journeys, fostering innovation and discovery across Nepal.",
      updatedAt: new Date(),
    };

    const mockBoardMembers = [
      {
        name: "Dr. Sita Devi",
        position: "Board President",
        bio: "Expert in educational policy with 15 years of experience in STEM education development.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sita",
        order: 1,
      },
      {
        name: "Eng. Anil Thapa",
        position: "Technical Director",
        bio: "Senior engineer specializing in robotics and automation systems.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anil",
        order: 2,
      },
      {
        name: "Prof. Maya Gurung",
        position: "Academic Advisor",
        bio: "Professor of Chemistry at Tribhuvan University, passionate about student mentorship.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
        order: 3,
      },
      {
        name: "Dr. Bikram Rana",
        position: "Research Coordinator",
        bio: "Biologist focused on environmental conservation and sustainable practices.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Bikram",
        order: 4,
      },
      {
        name: "Ms. Sunita Karki",
        position: "Communications Lead",
        bio: "Science communicator dedicated to making science accessible to all.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sunita",
        order: 5,
      },
      {
        name: "Mr. Ramesh Adhikari",
        position: "Finance Director",
        bio: "Financial expert ensuring the sustainability of our programs.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ramesh",
        order: 6,
      },
    ];

    mockBoardMembers.forEach((member) => {
      const id = randomUUID();
      this.boardMembers.set(id, { id, ...member, createdAt: new Date() });
    });

    const mockCategories = [
      {
        name: "Physics",
        description: "Explore the fundamental laws governing matter, energy, and the universe.",
        icon: "atom",
        color: "#1ECBE1",
        order: 1,
      },
      {
        name: "Chemistry",
        description: "Investigate chemical reactions, compounds, and molecular structures.",
        icon: "flask",
        color: "#D7A028",
        order: 2,
      },
      {
        name: "Biology",
        description: "Study living organisms, ecosystems, and the diversity of life.",
        icon: "leaf",
        color: "#1ECBE1",
        order: 3,
      },
      {
        name: "Computer Science",
        description: "Develop innovative software solutions and explore computational thinking.",
        icon: "code",
        color: "#D7A028",
        order: 4,
      },
      {
        name: "Robotics",
        description: "Design and build intelligent machines and automated systems.",
        icon: "bot",
        color: "#1ECBE1",
        order: 5,
      },
      {
        name: "Environmental Science",
        description: "Address ecological challenges and promote sustainable solutions.",
        icon: "recycle",
        color: "#D7A028",
        order: 6,
      },
    ];

    mockCategories.forEach((category) => {
      const id = randomUUID();
      this.categories.set(id, { id, ...category, createdAt: new Date() });
    });

    const mockSchedule = [
      {
        title: "Registration & Check-in",
        description: "Participants arrive and register for the science fair competition.",
        startTime: "08:00 AM",
        endTime: "09:00 AM",
        date: "2025-03-15",
        location: "Main Hall",
        type: "Registration",
      },
      {
        title: "Opening Ceremony",
        description: "Welcome address and introduction to the science fair program.",
        startTime: "09:00 AM",
        endTime: "10:00 AM",
        date: "2025-03-15",
        location: "Auditorium",
        type: "Ceremony",
      },
      {
        title: "Project Setup",
        description: "Students set up their project displays and presentations.",
        startTime: "10:00 AM",
        endTime: "11:30 AM",
        date: "2025-03-15",
        location: "Exhibition Hall",
        type: "Setup",
      },
      {
        title: "Lunch Break",
        description: "Networking opportunity and refreshments for all participants.",
        startTime: "12:00 PM",
        endTime: "01:00 PM",
        date: "2025-03-15",
        location: "Cafeteria",
        type: "Break",
      },
      {
        title: "First Round Judging",
        description: "Judges evaluate projects across all categories.",
        startTime: "01:00 PM",
        endTime: "03:30 PM",
        date: "2025-03-15",
        location: "Exhibition Hall",
        type: "Judging",
      },
      {
        title: "Public Exhibition",
        description: "Open exhibition for public viewing and student presentations.",
        startTime: "03:30 PM",
        endTime: "05:00 PM",
        date: "2025-03-15",
        location: "Exhibition Hall",
        type: "Exhibition",
      },
      {
        title: "Final Round Judging",
        description: "Top projects advance to final evaluation.",
        startTime: "09:00 AM",
        endTime: "11:00 AM",
        date: "2025-03-16",
        location: "Main Stage",
        type: "Judging",
      },
      {
        title: "Award Ceremony",
        description: "Announcement of winners and distribution of awards.",
        startTime: "11:30 AM",
        endTime: "01:00 PM",
        date: "2025-03-16",
        location: "Auditorium",
        type: "Ceremony",
      },
    ];

    mockSchedule.forEach((item) => {
      const id = randomUUID();
      this.scheduleItems.set(id, { id, ...item, createdAt: new Date() });
    });

    const mockJudges = [
      {
        name: "Dr. Krishna Prasad",
        expertise: "Quantum Physics",
        organization: "Nepal Academy of Science",
        bio: "Leading researcher in quantum mechanics with numerous international publications.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Krishna",
      },
      {
        name: "Prof. Laxmi Sharma",
        expertise: "Organic Chemistry",
        organization: "Tribhuvan University",
        bio: "Professor specializing in organic synthesis and pharmaceutical research.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laxmi",
      },
      {
        name: "Dr. Suresh Bajracharya",
        expertise: "Artificial Intelligence",
        organization: "Tech Innovation Lab",
        bio: "AI researcher focused on machine learning and computer vision applications.",
        image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Suresh",
      },
    ];

    mockJudges.forEach((judge) => {
      const id = randomUUID();
      this.judges.set(id, { id, ...judge, createdAt: new Date() });
    });

    const mockGallery = Array.from({ length: 16 }, (_, i) => ({
      title: `Science Fair ${2024 - Math.floor(i / 4)} - Event ${(i % 4) + 1}`,
      description: "Students showcasing innovative projects and discoveries",
      imageUrl: `https://picsum.photos/seed/${i + 100}/800/600`,
      category: ["Physics", "Chemistry", "Biology", "Robotics"][i % 4],
      order: i + 1,
    }));

    mockGallery.forEach((image) => {
      const id = randomUUID();
      this.galleryImages.set(id, { id, ...image, createdAt: new Date() });
    });

    const mockBlog = [
      {
        title: "How to Prepare for Your First Science Fair",
        excerpt:
          "Essential tips and strategies for students participating in their first science fair competition.",
        content:
          "Participating in your first science fair can be both exciting and nerve-wracking. Here are some key tips to help you succeed: Start early with your research, choose a topic you're passionate about, maintain detailed records of your experiments, and practice your presentation skills. Remember, the judges want to see your enthusiasm and understanding of your project.",
        featuredImage: "https://picsum.photos/seed/blog1/1200/600",
        author: "Dr. Rajesh Sharma",
        publishedAt: new Date("2025-01-15"),
      },
      {
        title: "Top 10 Science Fair Projects of 2024",
        excerpt:
          "Highlighting the most innovative and impressive projects from last year's competition.",
        content:
          "The 2024 NSN Science Fair showcased exceptional talent and creativity. From a water purification system using natural materials to an AI-powered plant disease detector, our participants demonstrated remarkable problem-solving skills. These projects not only impressed the judges but also addressed real-world challenges facing our communities.",
        featuredImage: "https://picsum.photos/seed/blog2/1200/600",
        author: "Maya Gurung",
        publishedAt: new Date("2025-01-20"),
      },
      {
        title: "The Impact of Science Fairs on Student Development",
        excerpt:
          "Research shows how science fair participation enhances critical thinking and creativity.",
        content:
          "Studies have consistently shown that students who participate in science fairs develop stronger analytical skills, better time management, and increased confidence in public speaking. Beyond the competition itself, the experience of conducting independent research and presenting findings to judges provides invaluable preparation for future academic and professional endeavors.",
        featuredImage: "https://picsum.photos/seed/blog3/1200/600",
        author: "Sita Devi",
        publishedAt: new Date("2025-02-01"),
      },
    ];

    mockBlog.forEach((post) => {
      const id = randomUUID();
      this.blogPosts.set(id, { id, ...post, createdAt: new Date() });
    });

    const mockNews = [
      {
        title: "Breakthrough in Renewable Energy Research",
        excerpt:
          "Scientists develop new solar panel technology that increases efficiency by 40%.",
        content:
          "Researchers at a leading technology institute have announced a major breakthrough in solar panel technology. The new design uses a novel arrangement of photovoltaic cells that can capture a broader spectrum of sunlight, resulting in a 40% increase in energy conversion efficiency. This development could revolutionize renewable energy adoption worldwide.",
        externalLink: "https://example.com/solar-breakthrough",
        source: "Nature Science Journal",
        publishedAt: new Date("2025-02-10"),
      },
      {
        title: "Young Scientist Discovers New Species of Butterfly",
        excerpt: "15-year-old student identifies previously unknown butterfly species in Nepal's forests.",
        content:
          "A young naturalist's keen observation during a school field trip has led to the discovery of a new butterfly species in the Himalayan region. The student's detailed documentation and photographs caught the attention of lepidopterists, who confirmed it as a previously undocumented species.",
        externalLink: "https://example.com/butterfly-discovery",
        source: "Science Daily",
        publishedAt: new Date("2025-02-15"),
      },
    ];

    mockNews.forEach((newsItem) => {
      const id = randomUUID();
      this.news.set(id, { id, ...newsItem, createdAt: new Date() });
    });

    const mockNotices = [
      {
        title: "Registration Deadline Extended",
        content:
          "Due to high demand, we've extended the registration deadline to March 1st, 2025. Don't miss this opportunity to participate in Nepal's premier science fair!",
        isPinned: true,
        isUrgent: true,
        publishedAt: new Date("2025-02-20"),
      },
      {
        title: "Workshop: Scientific Method & Research Design",
        content:
          "Join us for a free workshop on February 25th covering research methodology, experiment design, and data analysis. Limited seats available - register now!",
        isPinned: true,
        isUrgent: false,
        publishedAt: new Date("2025-02-18"),
      },
      {
        title: "Volunteer Opportunities Available",
        content:
          "We're looking for volunteers to help with event coordination, registration, and setup. If you're interested in supporting young scientists, please contact us.",
        isPinned: false,
        isUrgent: false,
        publishedAt: new Date("2025-02-15"),
      },
    ];

    mockNotices.forEach((notice) => {
      const id = randomUUID();
      this.notices.set(id, { id, ...notice, createdAt: new Date() });
    });

    const mockVideos = [
      {
        title: "NSN Science Fair 2024 Highlights",
        description: "Watch the best moments from our annual science fair competition.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video1/1280/720",
        order: 1,
      },
      {
        title: "Student Interview: Award-Winning Robotics Project",
        description: "Meet the student behind the first-place robotics project.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video2/1280/720",
        order: 2,
      },
      {
        title: "Behind the Scenes: Organizing a Science Fair",
        description: "See what goes into planning and executing a successful science fair event.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video3/1280/720",
        order: 3,
      },
      {
        title: "Physics Project: Renewable Energy System",
        description: "Students showcase their innovative solar panel prototype design.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video4/1280/720",
        order: 4,
      },
      {
        title: "Chemistry Experiment: Water Purification",
        description: "Learn about a student-designed water filtration system.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video5/1280/720",
        order: 5,
      },
      {
        title: "Biology Research: Plant Growth Study",
        description: "Explore how students investigated the effects of different nutrients on plant growth.",
        youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        thumbnail: "https://picsum.photos/seed/video6/1280/720",
        order: 6,
      },
    ];

    mockVideos.forEach((video) => {
      const id = randomUUID();
      this.videos.set(id, { id, ...video, createdAt: new Date() });
    });

    this.footerContent = {
      id: randomUUID(),
      aboutText:
        "Empowering young minds through scientific exploration and innovation. Building the future, one discovery at a time.",
      email: "info@nsnsciencefair.org",
      phone: "+977 1-234-5678",
      address: "Kathmandu, Nepal",
      facebookUrl: "https://facebook.com/nsnsciencefair",
      twitterUrl: "https://twitter.com/nsnsciencefair",
      instagramUrl: "https://instagram.com/nsnsciencefair",
      linkedinUrl: "https://linkedin.com/company/nsnsciencefair",
      updatedAt: new Date(),
    };

    this.siteSettings = {
      id: randomUUID(),
      registrationLink: null,
      updatedAt: new Date(),
    };
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.username === username);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      role: insertUser.role || "participant",
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async getAllUsers(): Promise<User[]> {
    return Array.from(this.users.values());
  }

  async getHomeContent(): Promise<HomeContent | undefined> {
    return this.homeContent;
  }

  async updateHomeContent(content: InsertHomeContent): Promise<HomeContent> {
    this.homeContent = {
      id: this.homeContent?.id || randomUUID(),
      heroTitle: content.heroTitle,
      heroSubtitle: content.heroSubtitle,
      heroDescription: content.heroDescription,
      participantsCount: content.participantsCount ?? 0,
      projectsCount: content.projectsCount ?? 0,
      yearsCount: content.yearsCount ?? 0,
      judgesCount: content.judgesCount ?? 0,
      updatedAt: new Date(),
    };
    return this.homeContent;
  }

  async getAboutContent(): Promise<AboutContent | undefined> {
    return this.aboutContent;
  }

  async updateAboutContent(content: InsertAboutContent): Promise<AboutContent> {
    this.aboutContent = {
      id: this.aboutContent?.id || randomUUID(),
      mission: content.mission,
      vision: content.vision,
      founderName: content.founderName,
      founderBio: content.founderBio,
      founderImage: content.founderImage ?? null,
      historyContent: content.historyContent,
      updatedAt: new Date(),
    };
    return this.aboutContent;
  }

  async getBoardMembers(): Promise<BoardMember[]> {
    return Array.from(this.boardMembers.values()).sort((a, b) => a.order - b.order);
  }

  async createBoardMember(member: InsertBoardMember): Promise<BoardMember> {
    const id = randomUUID();
    const newMember: BoardMember = {
      id,
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image ?? null,
      order: member.order ?? 0,
      createdAt: new Date(),
    };
    this.boardMembers.set(id, newMember);
    return newMember;
  }

  async updateBoardMember(id: string, member: InsertBoardMember): Promise<BoardMember | undefined> {
    const existing = this.boardMembers.get(id);
    if (!existing) return undefined;
    
    const updated: BoardMember = {
      ...existing,
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image ?? null,
      order: member.order ?? existing.order,
    };
    this.boardMembers.set(id, updated);
    return updated;
  }

  async deleteBoardMember(id: string): Promise<boolean> {
    return this.boardMembers.delete(id);
  }

  async getCategories(): Promise<Category[]> {
    return Array.from(this.categories.values()).sort((a, b) => a.order - b.order);
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const id = randomUUID();
    const newCategory: Category = {
      id,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      order: category.order ?? 0,
      createdAt: new Date(),
    };
    this.categories.set(id, newCategory);
    return newCategory;
  }

  async updateCategory(id: string, category: InsertCategory): Promise<Category | undefined> {
    const existing = this.categories.get(id);
    if (!existing) return undefined;
    
    const updated: Category = {
      ...existing,
      name: category.name,
      description: category.description,
      icon: category.icon,
      color: category.color,
      order: category.order ?? existing.order,
    };
    this.categories.set(id, updated);
    return updated;
  }

  async deleteCategory(id: string): Promise<boolean> {
    return this.categories.delete(id);
  }

  async getScheduleItems(): Promise<ScheduleItem[]> {
    return Array.from(this.scheduleItems.values()).sort((a, b) => {
      if (a.date !== b.date) return a.date.localeCompare(b.date);
      return a.startTime.localeCompare(b.startTime);
    });
  }

  async createScheduleItem(item: InsertScheduleItem): Promise<ScheduleItem> {
    const id = randomUUID();
    const newItem: ScheduleItem = {
      id,
      ...item,
      createdAt: new Date(),
    };
    this.scheduleItems.set(id, newItem);
    return newItem;
  }

  async updateScheduleItem(id: string, item: InsertScheduleItem): Promise<ScheduleItem | undefined> {
    const existing = this.scheduleItems.get(id);
    if (!existing) return undefined;
    
    const updated: ScheduleItem = {
      ...existing,
      ...item,
    };
    this.scheduleItems.set(id, updated);
    return updated;
  }

  async deleteScheduleItem(id: string): Promise<boolean> {
    return this.scheduleItems.delete(id);
  }

  async getJudges(): Promise<Judge[]> {
    return Array.from(this.judges.values());
  }

  async createJudge(judge: InsertJudge): Promise<Judge> {
    const id = randomUUID();
    const newJudge: Judge = {
      id,
      name: judge.name,
      expertise: judge.expertise,
      organization: judge.organization,
      bio: judge.bio,
      image: judge.image ?? null,
      createdAt: new Date(),
    };
    this.judges.set(id, newJudge);
    return newJudge;
  }

  async deleteJudge(id: string): Promise<boolean> {
    return this.judges.delete(id);
  }

  async getGalleryImages(): Promise<GalleryImage[]> {
    return Array.from(this.galleryImages.values()).sort((a, b) => a.order - b.order);
  }

  async createGalleryImage(image: InsertGalleryImage): Promise<GalleryImage> {
    const id = randomUUID();
    const newImage: GalleryImage = {
      id,
      title: image.title,
      description: image.description ?? null,
      imageUrl: image.imageUrl,
      category: image.category ?? null,
      order: image.order ?? 0,
      createdAt: new Date(),
    };
    this.galleryImages.set(id, newImage);
    return newImage;
  }

  async updateGalleryImage(id: string, image: InsertGalleryImage): Promise<GalleryImage | undefined> {
    const existing = this.galleryImages.get(id);
    if (!existing) return undefined;
    
    const updated: GalleryImage = {
      ...existing,
      title: image.title,
      description: image.description ?? null,
      imageUrl: image.imageUrl,
      category: image.category ?? null,
      order: image.order ?? existing.order,
    };
    this.galleryImages.set(id, updated);
    return updated;
  }

  async deleteGalleryImage(id: string): Promise<boolean> {
    return this.galleryImages.delete(id);
  }

  async getBlogPosts(): Promise<BlogPost[]> {
    return Array.from(this.blogPosts.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async getBlogPost(id: string): Promise<BlogPost | undefined> {
    return this.blogPosts.get(id);
  }

  async createBlogPost(post: InsertBlogPost): Promise<BlogPost> {
    const id = randomUUID();
    const newPost: BlogPost = {
      id,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage ?? null,
      author: post.author,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.blogPosts.set(id, newPost);
    return newPost;
  }

  async updateBlogPost(id: string, post: InsertBlogPost): Promise<BlogPost | undefined> {
    const existing = this.blogPosts.get(id);
    if (!existing) return undefined;
    
    const updated: BlogPost = {
      ...existing,
      title: post.title,
      excerpt: post.excerpt,
      content: post.content,
      featuredImage: post.featuredImage ?? null,
      author: post.author,
    };
    this.blogPosts.set(id, updated);
    return updated;
  }

  async deleteBlogPost(id: string): Promise<boolean> {
    return this.blogPosts.delete(id);
  }

  async getNews(): Promise<News[]> {
    return Array.from(this.news.values()).sort(
      (a, b) => b.publishedAt.getTime() - a.publishedAt.getTime()
    );
  }

  async createNews(newsItem: InsertNews): Promise<News> {
    const id = randomUUID();
    const newNews: News = {
      id,
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      externalLink: newsItem.externalLink ?? null,
      source: newsItem.source ?? null,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.news.set(id, newNews);
    return newNews;
  }

  async updateNews(id: string, newsItem: InsertNews): Promise<News | undefined> {
    const existing = this.news.get(id);
    if (!existing) return undefined;
    
    const updated: News = {
      ...existing,
      title: newsItem.title,
      excerpt: newsItem.excerpt,
      content: newsItem.content,
      externalLink: newsItem.externalLink ?? null,
      source: newsItem.source ?? null,
    };
    this.news.set(id, updated);
    return updated;
  }

  async deleteNews(id: string): Promise<boolean> {
    return this.news.delete(id);
  }

  async getNotices(): Promise<Notice[]> {
    return Array.from(this.notices.values()).sort((a, b) => {
      if (a.isPinned !== b.isPinned) return a.isPinned ? -1 : 1;
      return b.publishedAt.getTime() - a.publishedAt.getTime();
    });
  }

  async createNotice(notice: InsertNotice): Promise<Notice> {
    const id = randomUUID();
    const newNotice: Notice = {
      id,
      title: notice.title,
      content: notice.content,
      isPinned: notice.isPinned ?? false,
      isUrgent: notice.isUrgent ?? false,
      publishedAt: new Date(),
      createdAt: new Date(),
    };
    this.notices.set(id, newNotice);
    return newNotice;
  }

  async updateNotice(id: string, notice: Partial<Notice>): Promise<Notice | undefined> {
    const existing = this.notices.get(id);
    if (!existing) return undefined;
    
    const updated: Notice = { ...existing, ...notice };
    this.notices.set(id, updated);
    return updated;
  }

  async deleteNotice(id: string): Promise<boolean> {
    return this.notices.delete(id);
  }

  async getVideos(): Promise<Video[]> {
    return Array.from(this.videos.values()).sort((a, b) => a.order - b.order);
  }

  async createVideo(video: InsertVideo): Promise<Video> {
    const id = randomUUID();
    const newVideo: Video = {
      id,
      title: video.title,
      description: video.description ?? null,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail ?? null,
      order: video.order ?? 0,
      createdAt: new Date(),
    };
    this.videos.set(id, newVideo);
    return newVideo;
  }

  async updateVideo(id: string, video: InsertVideo): Promise<Video | undefined> {
    const existing = this.videos.get(id);
    if (!existing) return undefined;
    
    const updated: Video = {
      ...existing,
      title: video.title,
      description: video.description ?? null,
      youtubeUrl: video.youtubeUrl,
      thumbnail: video.thumbnail ?? null,
      order: video.order ?? existing.order,
    };
    this.videos.set(id, updated);
    return updated;
  }

  async deleteVideo(id: string): Promise<boolean> {
    return this.videos.delete(id);
  }

  async getContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values()).sort(
      (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
    );
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const newMessage: ContactMessage = {
      id,
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
    this.contactMessages.set(id, newMessage);
    return newMessage;
  }

  async markMessageAsRead(id: string): Promise<ContactMessage | undefined> {
    const existing = this.contactMessages.get(id);
    if (!existing) return undefined;
    
    const updated: ContactMessage = { ...existing, isRead: true, updatedAt: new Date() };
    this.contactMessages.set(id, updated);
    return updated;
  }

  async updateContactMessage(id: string, data: Partial<ContactMessage>): Promise<ContactMessage | undefined> {
    const existing = this.contactMessages.get(id);
    if (!existing) return undefined;
    
    const updated: ContactMessage = { ...existing, ...data, updatedAt: new Date() };
    this.contactMessages.set(id, updated);
    return updated;
  }

  async getFooterContent(): Promise<FooterContent | undefined> {
    return this.footerContent;
  }

  async updateFooterContent(content: InsertFooterContent): Promise<FooterContent> {
    this.footerContent = {
      id: this.footerContent?.id || randomUUID(),
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
    return this.footerContent;
  }

  async getSiteSettings(): Promise<SiteSettings | undefined> {
    return this.siteSettings;
  }

  async updateSiteSettings(settings: InsertSiteSettings): Promise<SiteSettings> {
    this.siteSettings = {
      id: this.siteSettings?.id || randomUUID(),
      registrationLink: settings.registrationLink ?? null,
      updatedAt: new Date(),
    };
    return this.siteSettings;
  }
}

export const storage: IStorage = new MemStorage();
