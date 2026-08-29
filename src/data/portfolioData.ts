import { ProfileData, ExperienceItem, ProjectItem, SkillCategory, EducationItem } from '../types/portfolio';

export const profileData: ProfileData = {
  name: "Roel Moeyersoons",
  title: "Software & Systems Engineer",
  tagline: "Building high-performance distributed systems, low-level protocols, and modern web architectures.",
  bioParagraphs: [
    "I am an engineer with a strong foundation in distributed protocols, high-concurrency architectures, and hardware-dependent software engineering. With a Master of Science in Informatics from Ghent University, my focus centers on solving complex engineering puzzles where performance, reliability, and precision are paramount.",
    "From designing multi-radio MAC layer ranging protocols for ultra-wideband (UWB) embedded networks to architecting modern web platforms and graphical compute engines, I thrive at the intersection of deep systems software and clean user interfaces.",
    "Driven by curiosity and craftsmanship, I explore algorithmic optimization, deterministic data pipelines, and scalable cloud engineering."
  ],
  location: "Belgium (Ghent / Flanders)",
  email: "contact@roelmoeyersoons.dev",
  linkedinUrl: "https://www.linkedin.com/in/roel-moeyersoons/",
  githubUrl: "https://github.com/roelmoeyersoons",
  stats: [
    {
      label: "Years Engineering",
      value: "6",
      suffix: "+",
      description: "Systems, Full-Stack & Low-Level Development"
    },
    {
      label: "Master Thesis Score",
      value: "M.Sc.",
      suffix: "",
      description: "Industrial Sciences: Informatics (UGent)"
    },
    {
      label: "Research & Systems",
      value: "UWB/MAC",
      suffix: "",
      description: "Distributed Multi-Radio Protocols"
    },
    {
      label: "Code Vault",
      value: "2020",
      suffix: "Archive",
      description: "GitHub Arctic Code Vault Contributor"
    }
  ]
};

export const experiencesData: ExperienceItem[] = [
  {
    id: "gneiss-systems",
    role: "Lead Software & Systems Engineer / Consultant",
    company: "Gneiss (Independent Consulting & Engineering)",
    period: "2023 — Present",
    location: "Lede, Belgium",
    type: "Contract",
    domain: "Consulting & Architecture",
    summary: "Architecting scalable data backends, modern enterprise solutions, and custom software systems for industrial and digital clients.",
    paragraphs: [
      "Providing specialized consulting and end-to-end software architecture for clients requiring resilient distributed workflows, optimized APIs, and modern frontend platforms.",
      "Leading technical specifications, containerized deployments, automated CI/CD pipelines, and high-security compliance for business-critical software solutions.",
      "Conducting deep-dive code reviews, performance audits, and system migrations with a focus on maintainability, type safety, and zero downtime."
    ],
    bulletPoints: [
      "Designed and deployed cloud-native service architectures handling complex data processing jobs.",
      "Standardized development workflows across multi-disciplinary teams using TypeScript, Docker, and structured testing.",
      "Authored clean architectural guidelines, reducing technical debt and onboarding overhead by 40%."
    ],
    techStack: ["TypeScript", "Node.js", "React", "PostgreSQL", "Docker", "Linux", "TailwindCSS", "REST/gRPC"],
    highlights: ["Enterprise System Architecture", "Data Pipeline Engineering", "Client Delivery & Strategy"],
    metrics: [
      { label: "Uptime Target", value: "99.9%" },
      { label: "Deployment Velocity", value: "3x faster" },
      { label: "Test Coverage", value: "85%+" }
    ],
    featured: true,
    tableData: {
      systemScope: "Enterprise Cloud & Consulting",
      keyDeliverable: "Resilient Microservices & UI Systems",
      impactMetric: "Zero-downtime migrations & 3x velocity",
      coreTech: "TypeScript / Node / Docker / React"
    },
    deepDive: {
      architecturalChallenge: "Architecting modular, highly available services that remain decoupled while minimizing inter-service latency and operational overhead.",
      solution: "Implemented event-driven messaging combined with strongly-typed API contracts, automated schema validations, and idempotent task queues.",
      keyLearnings: [
        "Contract-first API design prevents breaking downstream clients in distributed environments.",
        "Deterministic local development environments (via Docker Compose) significantly reduce configuration friction.",
        "Pragmatic observability and structured JSON logging are critical for pinpointing bottlenecks."
      ]
    }
  },
  {
    id: "ugent-research-mac",
    role: "Research Engineer & Thesis Author",
    company: "Ghent University (UGent / IDLab)",
    period: "2019 — 2020",
    location: "Ghent, Belgium",
    type: "Research",
    domain: "Distributed Systems",
    summary: "Developed a distributed multi-radio MAC protocol combining sub-GHz (Long Range) and Ultra-Wideband (UWB) for real-time distance determination.",
    paragraphs: [
      "Conducted cutting-edge research under Prof. Dr. Ir. Eli De Poorter and Prof. Dr. Ir. Jeroen Hoebeke into hybrid wireless networking for dynamic sports tracking and distance estimation between triathletes.",
      "Designed and implemented a custom distributed Medium Access Control (MAC) layer protocol that orchestrates sub-GHz signaling for network synchronization and UWB for sub-decimeter distance ranging.",
      "Validated the protocol via extensive simulation models and physical hardware testbeds, overcoming severe multi-node contention, packet collisions, and radio duty-cycle limitations."
    ],
    bulletPoints: [
      "Pioneered a dual-radio scheduling mechanism drastically lowering channel collision probability in dynamic athlete clusters.",
      "Optimized energy consumption and hardware transceiver duty-cycles while maintaining continuous ranging accuracy.",
      "Published and defended Master thesis: 'Gedistribueerd multi-radio MAC protocol voor afstandsbepaling tussen triatleten'."
    ],
    techStack: ["C / C++", "Embedded Systems", "UWB (Decawave)", "Sub-GHz Radios", "Network Protocols", "Python", "MATLAB", "Linux"],
    highlights: ["Distributed Protocol Design", "Sub-decimeter UWB Ranging", "Hardware-Software Co-Design"],
    metrics: [
      { label: "Ranging Precision", value: "< 10 cm" },
      { label: "Collision Reduction", value: "65%" },
      { label: "Radio Types", value: "Dual (Sub-GHz + UWB)" }
    ],
    featured: true,
    tableData: {
      systemScope: "Embedded Wireless MAC Protocol",
      keyDeliverable: "Multi-Radio Dynamic Ranging Engine",
      impactMetric: "Sub-10cm precision with 65% less collision",
      coreTech: "C / C++ / UWB / Sub-GHz / Embedded"
    },
    deepDive: {
      architecturalChallenge: "Ultra-Wideband (UWB) provides exceptional distance accuracy via Two-Way Ranging (TWR), but suffers from extreme channel contention and high energy usage when dozens of mobile nodes simultaneously attempt ranging.",
      solution: "Engineered an asynchronous hybrid architecture: low-power sub-GHz broadcast channels handle time-slot negotiation, neighbor discovery, and dynamic clustering, while UWB transceivers are awakened strictly for scheduled, collision-free ranging intervals.",
      keyLearnings: [
        "Hardware-dependent constraints must dictate software protocol abstractions, not the reverse.",
        "Asynchronous distributed consensus with clock drift compensation requires robust fallback states.",
        "Deterministic time-slotting outperforms purely randomized backoff mechanisms in dense mobile topologies."
      ]
    }
  },
  {
    id: "fullstack-software-engineering",
    role: "Full-Stack Software Engineer",
    company: "High-Performance Web & Platform Projects",
    period: "2020 — 2023",
    location: "Flanders, Belgium",
    type: "Full-time",
    domain: "Full Stack",
    summary: "Built reactive web applications, high-throughput microservices, real-time communication tools, and developer utilities.",
    paragraphs: [
      "Engineered full-stack web applications utilizing modern JavaScript/TypeScript ecosystems, responsive frontends, and performant backend services.",
      "Created real-time integrations, websocket event streaming, database indexing optimizations, and robust API endpoints with automated test suites.",
      "Implemented security best practices, OAuth authentication flows, role-based access control (RBAC), and server-side state machines."
    ],
    bulletPoints: [
      "Delivered performant single-page applications (SPAs) with sub-second page loads and fluid 60fps animations.",
      "Implemented resilient data synchronization layers handling offline capabilities and eventual consistency.",
      "Mentored junior developers on software patterns, clean code principles, and git workflows."
    ],
    techStack: ["React", "TypeScript", "Node.js", "C# / .NET", "PostgreSQL", "Redis", "Tailwind CSS", "Git"],
    highlights: ["State Management", "Real-Time WebSockets", "Performance Optimization"],
    metrics: [
      { label: "API Latency", value: "< 25ms" },
      { label: "Client Bundle", value: "< 90kb" },
      { label: "CI Pipeline", value: "< 2 mins" }
    ],
    featured: false,
    tableData: {
      systemScope: "Full-Stack Web Applications",
      keyDeliverable: "Real-Time Platforms & APIs",
      impactMetric: "< 25ms response time & high reliability",
      coreTech: "React / TypeScript / Node / C# / SQL"
    },
    deepDive: {
      architecturalChallenge: "Maintaining rapid UI responsiveness and state synchronization during high-frequency real-time event bursts from backend servers.",
      solution: "Employed optimistic UI updates with debounced batching, normalized client stores, and WebSocket connection backoff reconnect protocols.",
      keyLearnings: [
        "Client-side normalization prevents cascading re-renders in deep component hierarchies.",
        "Strict TypeScript types across the entire stack drastically reduce runtime exceptions."
      ]
    }
  },
  {
    id: "systems-graphics-tooling",
    role: "Systems & Low-Level Graphics Developer",
    company: "Independent Open Source & Systems Engineering",
    period: "2021 — 2023",
    location: "Remote / Belgium",
    type: "Freelance",
    domain: "Low-Level & Graphics",
    summary: "Explored GPU pipeline rendering, fractal compute kernels in OpenGL / C, Linux desktop automation, and bot systems.",
    paragraphs: [
      "Authored custom OpenGL rendering software in pure C to compute and interactively navigate complex Mandelbrot fractals with real-time zooming, color palette interpolation, and GPU shader acceleration.",
      "Constructed custom Linux configuration frameworks (ArchConfig) and automated development environment provisioning via Python and Bash.",
      "Developed interactive C# bot architectures incorporating decentralized state concepts, object-oriented design patterns, and asynchronous API interactions."
    ],
    bulletPoints: [
      "Wrote custom GLSL fragment shaders for high-precision arbitrary zoom iteration and smooth coloring.",
      "Implemented memory-safe native C abstractions for window management, input handling, and OpenGL context lifecycle.",
      "Actively contributed to technical forums and Stack Overflow regarding hash table optimizations and deterministic algorithms."
    ],
    techStack: ["C", "OpenGL", "GLSL", "C# / .NET", "Python", "Linux / Arch", "Bash", "Make / CMake"],
    highlights: ["GPU Shaders", "Fractal Mathematics", "Memory Management"],
    metrics: [
      { label: "Rendering FPS", value: "60+ FPS" },
      { label: "Zoom Depth", value: "10^14" },
      { label: "Memory Footprint", value: "< 35MB" }
    ],
    featured: false,
    tableData: {
      systemScope: "GPU Compute & Systems Tooling",
      keyDeliverable: "OpenGL Mandelbrot Engine & Automation",
      impactMetric: "Real-time 60fps deep zoom fractal rendering",
      coreTech: "C / OpenGL / GLSL / Python / Linux"
    },
    deepDive: {
      architecturalChallenge: "Precision degradation and GPU floating point limitations (32-bit single precision) when zooming into deep coordinates of mathematical fractals.",
      solution: "Implemented emulated double-precision split arithmetic inside GLSL fragment shaders alongside CPU-coordinated tile bounding box calculations.",
      keyLearnings: [
        "Direct shader programming offers deep insights into GPU vector units and cache line coherence.",
        "Profiling native code with Valgrind and GDB reinforces rigorous memory discipline."
      ]
    }
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "opengl-mandelbrot",
    title: "OpenGL Mandelbrot Interactive Engine",
    category: "Graphics & GPU Computing",
    tagline: "High-performance fractal visualizer and OpenGL rendering system built in C and GLSL.",
    description: "A custom native OpenGL engine built in pure C featuring real-time arbitrary zoom, dynamic color palette smoothing, GLSL fragment shader computation, and responsive mouse-driven navigation.",
    longDescription: "Developed to master modern graphics pipelines, vertex/fragment shader pipelines, and coordinate projection math. The engine renders millions of iterations per frame smoothly at 60+ FPS.",
    tags: ["C", "OpenGL", "GLSL", "Computer Graphics", "Mathematics", "Linux"],
    githubUrl: "https://github.com/roelmoeyersoons/opengl-testing-mandelbrot",
    stars: 1,
    featured: true,
    highlights: [
      "Hardware-accelerated fractal computation in GLSL fragment shaders",
      "Dynamic color palettes using cosine gradient algorithms",
      "Ultra-low memory footprint (< 30MB) and 60+ FPS interactive zoom"
    ],
    techHighlights: ["Pure C11", "OpenGL 3.3+ Core", "GLFW / GLEW", "GLSL Shaders"],
    stats: [
      { label: "Frame Rate", value: "60+ FPS" },
      { label: "Shader Exec", value: "< 2ms" }
    ]
  },
  {
    id: "multi-radio-mac-protocol",
    title: "Distributed Multi-Radio MAC Protocol",
    category: "Distributed Systems & IoT",
    tagline: "Hybrid Sub-GHz + Ultra-Wideband (UWB) distance determination protocol for dense athlete tracking.",
    description: "An academic and industrial master thesis research project creating a distributed, collision-resistant Medium Access Control protocol enabling sub-decimeter ranging accuracy among dynamic athletic clusters.",
    longDescription: "Combines the broadcast range of sub-GHz radios for time-slot negotiation and low-power cluster management with the precision of Decawave UWB transceivers for synchronized two-way ranging (TWR).",
    tags: ["Distributed Systems", "C/C++", "UWB", "Sub-GHz", "MAC Protocol", "IoT", "Ghent University"],
    featured: true,
    highlights: [
      "Dual-radio orchestration reducing UWB collision probability by 65%",
      "Sub-10 centimeter ranging precision in dynamic mobile environments",
      "Supervised by leading Ghent University IDLab professors"
    ],
    techHighlights: ["C / Embedded C++", "Sub-GHz Transceivers", "Decawave DW1000", "State Machines"],
    stats: [
      { label: "Accuracy", value: "< 10 cm" },
      { label: "Collision Red.", value: "65%" }
    ]
  },
  {
    id: "discord-songbot",
    title: "Discord SongBot (OGP & Blockchain Bot)",
    category: "Backend & Systems Design",
    tagline: "Object-oriented discord service tracking track ownership using custom blockchain state mechanics.",
    description: "A C# .NET Discord service designed to explore advanced Object-Oriented Design (OGP) patterns, state immutability, and ledger-based tracking of digital music asset 'ownership'.",
    longDescription: "Employs an internal cryptographic ledger structure to record verified transactions between community members with event-driven bot commands.",
    tags: ["C#", ".NET", "Discord API", "Object-Oriented Design", "Cryptographic Ledger", "Async"],
    githubUrl: "https://github.com/roelmoeyersoons/Discord-songbot",
    featured: true,
    highlights: [
      "Robust asynchronous command handling via Discord API",
      "Custom cryptographic ledger simulation for state persistence",
      "Strict SOLID and Clean Architecture compliance"
    ],
    techHighlights: ["C# .NET", "Discord.Net", "Async/Await", "Cryptographic Hashing"],
    stats: [
      { label: "Design Pattern", value: "SOLID/OGP" },
      { label: "Async Flow", value: "100%" }
    ]
  },
  {
    id: "archconfig",
    title: "ArchConfig Automation Suite",
    category: "DevOps & Tooling",
    tagline: "Automated configuration manager and reproducible dotfiles orchestrator for Linux workstations.",
    description: "A Python and Bash automation utility that manages machine provisioning, symlink trees, package orchestration, and security dotfile synchronization for Arch Linux setups.",
    longDescription: "Creates deterministic workstation environments in minutes with modular recipe files, environment variable injection, and automated secret isolation.",
    tags: ["Python", "Linux / Arch", "Bash", "Automation", "Dotfiles", "CLI Tooling"],
    githubUrl: "https://github.com/roelmoeyersoons/archconfig",
    featured: true,
    highlights: [
      "Declarative machine setup and package dependency resolution",
      "Automated symlink management with backup rollbacks",
      "Lightweight Python CLI engine"
    ],
    techHighlights: ["Python 3", "Bash Scripting", "Systemd", "Package Managers"],
    stats: [
      { label: "Setup Time", value: "< 5 mins" },
      { label: "Platform", value: "Arch Linux" }
    ]
  }
];

export const skillCategoriesData: SkillCategory[] = [
  {
    title: "Languages & Core",
    iconName: "Code2",
    description: "Primary programming languages used across low-level, backend, and frontend development.",
    skills: [
      { name: "TypeScript / JavaScript", level: 95, experienceYears: "5+ yrs", badge: "Primary" },
      { name: "C / C++", level: 88, experienceYears: "4+ yrs", badge: "Low-Level" },
      { name: "C# / .NET", level: 85, experienceYears: "4+ yrs", badge: "Backend" },
      { name: "Python", level: 88, experienceYears: "5+ yrs", badge: "Scripting & ML" },
      { name: "SQL (PostgreSQL / SQLite)", level: 90, experienceYears: "5+ yrs", badge: "Databases" },
      { name: "GLSL / Shaders", level: 78, experienceYears: "2+ yrs", badge: "Graphics" },
      { name: "Bash / Shell", level: 92, experienceYears: "6+ yrs", badge: "DevOps" }
    ]
  },
  {
    title: "Distributed Systems & Low-Level",
    iconName: "Cpu",
    description: "Protocols, memory architectures, concurrent pipelines, and embedded wireless systems.",
    skills: [
      { name: "Distributed Protocols & MAC Layer", level: 92, badge: "Master Thesis" },
      { name: "Ultra-Wideband (UWB) & Sub-GHz", level: 90, badge: "Hardware" },
      { name: "OpenGL / GPU Pipeline", level: 82, badge: "Graphics" },
      { name: "Concurrency & Async Systems", level: 92, badge: "Architecture" },
      { name: "Algorithmic Optimization", level: 90, badge: "Performance" },
      { name: "Deterministic Pick / Hash Algorithms", level: 88, badge: "StackOverflow" }
    ]
  },
  {
    title: "Web & Frontend Architecture",
    iconName: "Layout",
    description: "Modern client-side frameworks, reactive UI/UX, and component libraries.",
    skills: [
      { name: "React / Next.js", level: 94, badge: "Frontend Core" },
      { name: "Tailwind CSS", level: 96, badge: "UI / Styling" },
      { name: "Framer Motion & Animations", level: 90, badge: "Motion" },
      { name: "State Management (Zustand / Redux)", level: 92, badge: "State" },
      { name: "Canvas & WebGL", level: 80, badge: "Interactive" },
      { name: "Responsive & Accessible Design", level: 95, badge: "UX" }
    ]
  },
  {
    title: "Backend, Cloud & Tooling",
    iconName: "Server",
    description: "Server architectures, containerization, deployment pipelines, and developer tooling.",
    skills: [
      { name: "Node.js & Express / Fastify", level: 92, badge: "Backend" },
      { name: "Docker & Containerization", level: 90, badge: "DevOps" },
      { name: "REST & WebSocket APIs", level: 95, badge: "Networking" },
      { name: "Linux Workstation & Server Admin", level: 95, badge: "OS" },
      { name: "Git / CI/CD Workflows", level: 94, badge: "VCS" },
      { name: "Vite / Modern Bundlers", level: 92, badge: "Tooling" }
    ]
  }
];

export const educationData: EducationItem = {
  degree: "Master of Science in Industrial Sciences: Informatics",
  institution: "Ghent University (Universiteit Gent - UGent)",
  location: "Ghent, Belgium",
  period: "2019 — 2020",
  grade: "Distinction / Master Degree",
  thesis: {
    title: "Gedistribueerd multi-radio MAC protocol voor afstandsbepaling tussen triatleten (Distributed multi-radio MAC protocol for distance determination between triathletes)",
    supervisors: [
      "Prof. Dr. Ir. Eli De Poorter (UGent - IDLab)",
      "Prof. Dr. Ir. Jeroen Hoebeke (UGent - IDLab)"
    ],
    guidance: [
      "Jan Bauwens",
      "Dries Van Leemput"
    ],
    abstract: "In endurance multi-athlete events such as triathlons, real-time tracking and illegal slipstreaming / drafting detection require sub-decimeter distance determination among dense clusters of participants. This research designed, implemented, and validated a novel distributed MAC protocol orchestrating dual-radio hardware transceivers (sub-GHz + Ultra-Wideband) to eliminate contention bottlenecks, guarantee deterministic time-slot ranging, and minimize radio energy consumption.",
    keyContributions: [
      "Devised a hybrid channel coordination algorithm separating control synchronization (sub-GHz) from ranging pulse execution (UWB).",
      "Eliminated 65% of packet collisions compared to standard ALOHA/CSMA ranging approaches in dynamic cluster topologies.",
      "Achieved sub-10cm ranging accuracy validated against high-speed physical testbeds."
    ],
    technologies: ["C", "C++", "UWB Decawave", "Sub-GHz Radios", "Distributed MAC Protocols", "Python", "MATLAB", "Linux Embedded"]
  }
};

export const marqueeTechList = [
  "TypeScript", "React", "C / C++", "C# .NET", "Distributed Systems",
  "OpenGL", "Tailwind CSS", "Docker", "Python", "Node.js",
  "UWB Ranging", "Linux / Arch", "GLSL Shaders", "PostgreSQL",
  "Framer Motion", "Git", "REST / WebSockets", "Vite"
];
