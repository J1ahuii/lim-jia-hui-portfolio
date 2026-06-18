export const portfolio = {
  name: "LIM JIA HUI",
  role: "CS (AI) Student",
  intro:
    "Bridging the gap between academic rigor and practical creativity through clean code and thoughtful design architecture.",

  socials: {
    instagram: "https://www.instagram.com/jiahui_304/",
    linkedin: "https://www.linkedin.com/in/jia-hui-lim-834b26304/",
    github: "https://github.com/J1ahuii",
  },

  about: {
    title: "About Me",
    paragraphs: [
      "Hi! I'm a Computer Science student passionate about turning ideas into real, useful products. I love the moment when an empty editor becomes something people can actually click, tap, and enjoy.",
      "Outside of class, I'm constantly exploring new tools, sketching interfaces, and rebuilding things just to understand how they work.",
    ],
    interests: ["Basketball", "Listening to music", "UI / UX design", "Reading sci‑fi"],
    careerGoal:
      "To become a full‑stack engineer who builds beautiful, accessible products that quietly make people's lives easier.",
  },

  motto: ["Stay curious.", "Keep creating.", "Never stop learning."],

  education: [
{
period: "2024 — Present",
title: "Bachelor of Computer Science (Artificial Intelligence)",
place: "UNIVERSITI TEKNIKAL MALAYSIA MELAKA (UTeM)",
description:
"Currently pursuing a Bachelor of Computer Science (Artificial Intelligence), focusing on artificial intelligence, machine learning, software development, and intelligent systems.",
},
{
period: "2022 — 2024",
title: "STPM (Art Stream)",
place: "SMK TAMAN KLUANG BARAT",
description:
"Completed Pre-University studies (STPM) in the Art Stream, developing strong analytical thinking, communication, and problem-solving skills.",
},
{
period: "2017 — 2021",
title: "SPM (Pure Science)",
place: "SMK CANOSSIAN CONVENT KLUANG",
description:
"Completed secondary education in the Pure Science stream, building a solid foundation in Mathematics, Science, and academic excellence.",
},
],

  skills: [
    "C++",
    "Python",
    "Java",
    "R",
    "Figma",
    "Photoshop",
    "Canva",
    "MySQL",
    "Microsoft Office",
  ],

  projects: [
    {
  slug: "workshop-1",

  title: "Workshop 1",

  image: "/projects/workshop.jpg",

  description:
    "Terminal-based Hotel Management System built using C++ and MySQL.",

  tags: ["C++", "MySQL"],

  overview:
    "A terminal-based Hotel Management System developed using C++ and MySQL for managing customer records, room information, and hotel operations.",

  caseStudy:
    "Hotel Management System is a terminal-based application developed using C++ and MySQL. The system was designed to manage hotel operations such as customer records, room information, and booking management through a command-line interface. The project implements CRUD (Create, Read, Update, Delete) functionalities, allowing users to efficiently add, view, update, and delete hotel-related data stored in a MySQL database. Through this project, I gained practical experience in database integration, structured programming, and building real-world management systems using C++.",

  gallery: [
    "/projects/hotel1.png",
    "/projects/hotel2.png",
    "/projects/hotel3.png",
    "/projects/hotel4.png",
    "/projects/hotel5.png",
    "/projects/hotel6.png",
    "/projects/hotel7.png",
    "/projects/hotel8.png",
  ],

  techStack: [
    "C++",
    "MySQL",
    "CRUD Operations",
    "Database Management",
    "Terminal Application",
  ],

  skills: [
    "C++ Programming",
    "MySQL Integration",
    "CRUD Development",
    "Database Design",
    "Console Application Development",
  ],

  outcome: "",
},
    {
      slug: "hackathon",
      title: "Loveable Vibeathon KL (ft. OpenClaw KL)",
      image: "/projects/lovable.jpg",
      description:
        "AI-powered insurance claim eligibility checking system.",
      tags: ["Lovable"],
      overview:
        "A 10-hour team build where we scoped, designed, and shipped a working product around a single brief. I led the front-end and helped tie our Python services together into a cohesive demo.",
      caseStudy:
        "This project was developed during the Lovable Vibeathon KL hackathon. The system assists users in determining whether a medical expense or insurance claim is eligible for reimbursement. Users can submit claim information and supporting documents, while the AI analyzes policy conditions, identifies relevant coverage clauses, and provides an eligibility assessment with explanations. The goal was to simplify the claim-checking process, reduce confusion, and help users make informed decisions before submitting an official claim.",
      video: "/videos/claimwiseAI.mp4",
      gallery: [] as string[],
      techStack: ["Python", "OpenClaw", "Lovable", "Tailwind CSS"],
      skills: ["AI Integration",
  "Prompt Engineering",
  "Frontend Development",
  "Rapid Prototyping",
  "Team Collaboration"],
      outcome:
        "Delivered a polished demo within the deadline and learned how to make sharp scope decisions under pressure — what to build well, what to fake convincingly, and what to cut.",
    },
  ],

  wins: [
    {
      title: "Lovable Vibeathon",
      award: "Track Winner",
      date: "May 2026",
      description:
        "Track: Healthcare Operations Automation",
      technologies: ["React", "TanStack Start", "Tailwind", "Lovable Cloud"],
      image: "/projects/win1.JPG",
    },
  ],

  certificates: [
    {
      title: "AI Singapore",
      organization: "",
      date: "2025",
      image: "/projects/AISG.pdf",
      issueDate: "16 JUNE 2025",
      credentialId: "",
      verificationUrl: "",
    },
    {
      title: "Claude 101",
      organization: "ANTROPHIC",
      date: "2026",
      image: "/projects/LIM JIA HUI_Claude 101.pdf",
      issueDate: "30 MAY 2026",
      credentialId: "",
      verificationUrl: "",
    },
    {
      title: "Claude Code 101",
      organization: "ANTROPHIC",
      date: "2026",
      image: "/projects/claude-code-101.pdf",
      issueDate: "30 MAY 2026",
      credentialId: "",
      verificationUrl: "",
    },
  ],

  others: [
    {
      key: "photography",
      title: "Photography",
      description: "Capturing moments on film and digital — a visual diary across cities and skies.",
      href: "/others/photography",
    },
    {
      key: "experience",
      title: "Working Experience",
      description: "Internships, freelance, and side gigs that shaped how I build.",
      href: "/others/working-experience",
    },
  ] as const,

  photography: [
    { title: "Nebula Skies", caption: "Twilight, rooftop", image: "", aspect: "4/5" },
    { title: "Quiet Streets", caption: "Old town walk", image: "", aspect: "1/1" },
    { title: "Soft Bloom", caption: "Spring, in passing", image: "", aspect: "3/4" },
    { title: "Studio Light", caption: "Window self-portrait", image: "", aspect: "4/5" },
    { title: "Long Drive", caption: "Coastal road", image: "", aspect: "16/10" },
    { title: "Late Train", caption: "Last carriage", image: "", aspect: "3/4" },
    { title: "Paper Notes", caption: "Sketchbook details", image: "", aspect: "1/1" },
    { title: "City Glow", caption: "From the bridge", image: "", aspect: "4/5" },
    { title: "Garden Frame", caption: "Soft greens", image: "", aspect: "3/4" },
  ],

  experience: [
    {
      role: "Front-End Engineering Intern",
      company: "Studio Placeholder",
      period: "Jun 2025 – Aug 2025",
      summary:
        "Shipped components used across the product's onboarding flow and contributed to a refresh of the design system.",
      bullets: [
        "Built reusable React components with strict TypeScript and shared design tokens.",
        "Partnered with design on motion guidelines and accessibility passes.",
        "Reduced first-contentful-paint on the marketing site by 28%.",
      ],
    },
    {
      role: "UI/UX Freelancer",
      company: "Independent",
      period: "2024",
      summary:
        "Designed product surfaces for early-stage founders — from landing pages to internal tools.",
      bullets: [
        "Translated raw briefs into clickable Figma prototypes within days.",
        "Established small but thoughtful design systems each project could grow into.",
      ],
    },
    {
      role: "Student Tech Lead",
      company: "Campus Club",
      period: "2023 – 2024",
      summary:
        "Led a small team building workshops, hack nights, and a club site that doubled signups.",
      bullets: [
        "Mentored juniors through their first deploys and pull requests.",
        "Organised three campus events focused on craft and shipping.",
      ],
    },
  ],

  contact: {
    email: "jiahuii0304@gmail.com",
    location: "Your City, Country",
  },
};
