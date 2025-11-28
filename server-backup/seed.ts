import { DbStorage } from "./db-storage";

const storage = new DbStorage();

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    const existing = await storage.getHomeContent();
    if (existing) {
      console.log("✅ Database already seeded. Skipping...");
      return;
    }

    await storage.updateHomeContent({
      heroTitle: "Igniting Innovation Through Science",
      heroSubtitle: "Empowering Young Minds to Explore, Discover & Transform",
      heroDescription:
        "Join Nepal's premier science fair competition where students showcase groundbreaking projects in physics, chemistry, biology, robotics, and more.",
      participantsCount: 500,
      projectsCount: 250,
      yearsCount: 10,
      judgesCount: 45,
    });

    await storage.updateAboutContent({
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
    });

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

    for (const member of mockBoardMembers) {
      await storage.createBoardMember(member);
    }

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

    for (const category of mockCategories) {
      await storage.createCategory(category);
    }

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

    for (const item of mockSchedule) {
      await storage.createScheduleItem(item);
    }

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

    for (const judge of mockJudges) {
      await storage.createJudge(judge);
    }

    const mockGallery = Array.from({ length: 16 }, (_, i) => ({
      title: `Science Fair ${2024 - Math.floor(i / 4)} - Event ${(i % 4) + 1}`,
      description: "Students showcasing innovative projects and discoveries",
      imageUrl: `https://picsum.photos/seed/${i + 100}/800/600`,
      category: ["Physics", "Chemistry", "Biology", "Robotics"][i % 4],
      order: i + 1,
    }));

    for (const image of mockGallery) {
      await storage.createGalleryImage(image);
    }

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

    for (const post of mockBlog) {
      await storage.createBlogPost(post);
    }

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

    for (const news of mockNews) {
      await storage.createNews(news);
    }

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

    for (const notice of mockNotices) {
      await storage.createNotice(notice);
    }

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
    ];

    for (const video of mockVideos) {
      await storage.createVideo(video);
    }

    await storage.updateFooterContent({
      aboutText:
        "Empowering young minds through scientific exploration and innovation. Building the future, one discovery at a time.",
      email: "info@nsnsciencefair.org",
      phone: "+977 1-234-5678",
      address: "Kathmandu, Nepal",
      facebookUrl: "https://facebook.com/nsnsciencefair",
      twitterUrl: "https://twitter.com/nsnsciencefair",
      instagramUrl: "https://instagram.com/nsnsciencefair",
      linkedinUrl: "https://linkedin.com/company/nsnsciencefair",
    });

    console.log("✅ Database seeding completed!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
