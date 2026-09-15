import {
  ProfileData,
  ExperienceItem,
  ProjectItem,
  CoreSkill,
  OtherSkill,
  EducationItem,
  CertificationItem,
  HonorItem,
  CaseStudyItem,
  TestimonialItem,
} from '../types/portfolio';

export const profileData: ProfileData = {
  name: "Roel Moeyersoons",
  title: "Application Engineer & Azure Platform Specialist",
  tagline: "Enterprise applications on the Microsoft stack — Dynamics 365 & Power Platform, C#/.NET engineering and Azure platform work, with AI woven in where it earns its keep.",
  bioParagraphs: [
    "I'm an application engineer from Ghent, Belgium, and my core work lives on the Microsoft stack: Dynamics 365/CRM and Power Platform, C#/.NET development, and the Azure platform — backed by solution architecture, CI/CD, and a growing focus on AI. I'd call myself an application engineer with platform knowledge branching out from it: I build the business application first, then make sure the platform underneath is engineered to last.",
    "What drives me is technical quality. Concretely: elevating coding standards in teams (.editorconfig, .NET analysers, SDK-style projects), keeping dependencies and supply chains tight, discussing code architecture with developers, and wiring first-party Microsoft tooling together with solid CI/CD pipelines. The goal is always the least possible future risk for the project — be it technical bugs or cybersecurity exposure.",
    "Thanks to my engineering degree I can branch into any corner of IT — networking, cybersecurity, low-level systems — and learning new skills is what keeps me going. Lately I'm deep into AI: LLM integrations, local models, and agentic coding tools like Claude Code used as a genuine productivity multiplier. Off-screen you'll find me dancing, training, and reading up on finance, history and geology."
  ],
  location: "Ghent, Belgium",
  email: "moeyersoonsroel@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/roel-moeyersoons/",
  githubUrl: "https://github.com/roelmoeyersoons",
  stats: [
    {
      label: "Years Engineering",
      value: "6",
      suffix: "+",
      description: "Dynamics 365, C#/.NET & Azure"
    },
    {
      label: "Core Platform",
      value: "Azure",
      suffix: "",
      description: "Landing Zones · APIM · Terraform IaC"
    },
    {
      label: "Enterprise Apps",
      value: "D365",
      suffix: "",
      description: "CRM, Power Platform & Dataverse"
    },
    {
      label: "Microsoft Certified",
      value: "5×",
      suffix: "",
      description: "AZ-305 · AZ-104 · 3× D365"
    }
  ]
};

export const experiencesData: ExperienceItem[] = [
  {
    id: "baloise-azure-dynamics",
    skillIds: ["azure-platform", "dynamics-365-power-platform", "applied-ai", "csharp-dotnet", "devops-cicd-iac"],
    role: "IT Consultant — Azure, Dynamics & DevOps",
    company: "Baloise BE (Independent)",
    period: "Aug 2025 — Present",
    location: "Antwerp, Belgium",
    type: "Self-employed",
    domain: "Cloud & Enterprise Applications",
    summary: "Independent IT consultant for Baloise BE: elevating coding standards, industrializing the Azure platform, and delivering Dynamics 365 features — with AI tooling as a day-to-day productivity multiplier.",
    paragraphs: [
      "Working as an independent consultant inside Baloise's development teams, I focus on raising the technical bar: first-party enforced coding standards via .editorconfig, code quality control through .NET analysers with managed warning counts, and migrating MSBuild-style projects to modern .NET SDK-style projects — reducing build complexity tremendously. The team's git setup got the same treatment, together with a deliberate reduction of third-party tooling and nuget packages to remove supply-chain attack vectors.",
      "On the platform side I migrate unmanaged Azure resources to Azure Landing Zones, move Azure Logic Apps from the consumption to the standard plan, and replace secret-based authentication with managed identities across APIM, Function Apps and Logic Apps. The whole estate is being rebuilt as a full Infrastructure-as-Code setup in Terraform from scratch.",
      "Beyond the platform I deliver feature requests for Azure Cloud and Dynamics 365 applications, and develop and administer Dataverse environments — solution management and deployment with first-party tooling (PAC CLI, Configuration Migration Tool) plus XrmToolBox. I also migrated the unmanaged Azure API Management service to a centralized APIM using APIOps: heavy use of policies, OpenAPI specs, schemas, API versioning, backends, subscription keys and monitoring."
    ],
    bulletPoints: [
      "Full Infrastructure-as-Code setup in Terraform, built from scratch",
      "Centralized Azure API Management via APIOps — policies, OpenAPI specs, versioning, monitoring",
      "Secret-based authentication replaced by managed identities (APIM, Function Apps, Logic Apps)",
      "First-party quality control: .NET analysers, .editorconfig, managed warning counts, SDK-style migrations",
      "Supply-chain risk reduction by cutting third-party nuget packages and reviewing the team's git setup",
      "Claude Code development environment for the team: agents, automated checks and validation pipelines"
    ],
    techStack: ["Azure", "Dynamics 365", "Dataverse", "Terraform", "Azure APIM", "Logic Apps", "Managed Identities", "Azure DevOps", "C# / .NET", "Claude Code"],
    highlights: ["Azure Platform Engineering", "Dynamics 365 Delivery", "AI-Augmented Development"],
    metrics: [
      { label: "Foundation", value: "Landing Zones" },
      { label: "IaC", value: "Terraform" },
      { label: "AI Tooling", value: "Claude Code" }
    ],
    featured: true,
    tableData: {
      systemScope: "Azure Platform & Dynamics 365",
      keyDeliverable: "Governed Azure estate & centralized APIM",
      impactMetric: "Managed identities & full Terraform IaC",
      coreTech: "Azure / Terraform / D365 / C#"
    },
    deepDive: {
      architecturalChallenge: "Years of organically grown, unmanaged Azure resources: inconsistent governance, secret-based authentication, manual deployments, and third-party tooling and packages that introduced supply-chain risk into business-critical applications.",
      solution: "Rebuilt the estate on Azure Landing Zones with a full Terraform IaC setup from scratch, centralized API Management through APIOps (policies, OpenAPI specs, versioned APIs, backends, monitoring), and swapped secrets for managed identities wherever the platform allows it.",
      keyLearnings: [
        "First-party Microsoft tooling enforced at repository level (.editorconfig, .NET analysers) scales standards better than conventions alone.",
        "Managed identities remove an entire class of credential risk — the migration cost is mostly one-off plumbing.",
        "AI coding agents like Claude Code multiply a team's output only when the surrounding validation pipeline is strict."
      ]
    }
  },
  {
    id: "reimagine-ai-architect",
    skillIds: ["applied-ai", "solution-architecture", "azure-platform", "devops-cicd-iac", "csharp-dotnet"],
    role: "AI/.NET Solution Architect & Sr. Cloud Engineer",
    company: "REIMAGINE",
    period: "Nov 2023 — Aug 2025",
    location: "Brussels, Belgium",
    type: "Full-time",
    domain: "AI & Solution Architecture",
    summary: "Designed and implemented AI-driven solutions for real business problems as Sr. developer: from solution architecture and Azure platform setup to hands-on .NET/TypeScript/Python delivery and team-wide quality frameworks.",
    paragraphs: [
      "At REIMAGINE — a consultancy that designs and implements AI solutions — my job revolved around the technical design and implementation of solutions to real business problems. Each project required its own specific and optimal set of Azure & Microsoft services; I designed them, got the design and budget approved by the customer, and carried technical delivery as the senior developer, delegating tasks to team members.",
      "I set up productive coding environments and frameworks that kept delivered quality high while balancing project needs: Azure DevOps setup, Azure subscription & resource group management, code dependencies, build tools and IDE choices. Each project also got its own CI/CD pipelines modeling the needed processes on Azure DevOps or GitHub, plus Infrastructure-as-Code projects using ARM templates and Terraform.",
      "Hands-on delivery spanned Python, C#/.NET Core and TypeScript with a focus on integrating AI and LLM tools — such as GPT-4 — into websites and backends, using Azure OpenAI Studio, Ollama and FastAPI alongside Blazor frontends. Beyond projects, I took up business/functional analysis from stakeholder meetings, played a strategic role in reducing technical debt company-wide, and set up internal initiatives to transfer technical skills between colleagues."
    ],
    bulletPoints: [
      "Solution architecture per project: optimal Azure/Microsoft service mix, designed and budgeted with the customer",
      "Platform engineering: scalable, reusable Azure DevOps setups, subscriptions and resource group management",
      "AI/LLM integration (GPT-4, Azure OpenAI Studio, Ollama) into production websites and backends",
      "DevOps engineering: project-specific CI/CD pipelines on Azure DevOps and GitHub; IaC via ARM and Terraform",
      "Business/functional analysis from stakeholder meetings, feeding straight into technical design",
      "Company-wide technical-debt reduction and internal skill-sharing initiatives"
    ],
    techStack: ["Azure", "Azure OpenAI / GPT-4", "Ollama", "C# / .NET Core", "TypeScript", "Python", "FastAPI", "Blazor", "Terraform", "ARM Templates", "Azure DevOps", "Docker"],
    highlights: ["AI Solution Architecture", "Platform Engineering", "Sr. Technical Delivery"],
    metrics: [
      { label: "Role", value: "Sr. Dev / Architect" },
      { label: "AI Delivery", value: "GPT-4 in prod" },
      { label: "IaC", value: "Terraform / ARM" }
    ],
    featured: true,
    tableData: {
      systemScope: "AI-Driven Customer Solutions",
      keyDeliverable: "Solution architecture & technical delivery",
      impactMetric: "Business-first AI on reusable platforms",
      coreTech: "Azure / GPT-4 / .NET / TypeScript / Python"
    },
    deepDive: {
      architecturalChallenge: "Every customer project needed a different optimal mix of Azure services, delivery pipelines and AI integration patterns — without turning each engagement into a one-off snowball of technical debt, and without letting the technology outrun the business need.",
      solution: "Reusable platform building blocks (DevOps setup, IaC, dependency and IDE standards) combined with per-project solution design. AI components were isolated behind clean service boundaries so models and providers could be swapped as the landscape evolved.",
      keyLearnings: [
        "Any technological change must always serve the business — not the other way around.",
        "A productive, standardized development environment is a feature you deliver to the team, not a personal preference.",
        "LLM features age quickly; isolating them behind service boundaries keeps the eventual swap-out cheap."
      ]
    }
  },
  {
    id: "netit-dynamics-consultant",
    skillIds: ["dynamics-365-power-platform", "csharp-dotnet", "azure-platform", "devops-cicd-iac", "solution-architecture"],
    role: "Dynamics 365 & Power Platform Consultant · SCRUM Master",
    company: "Net IT nv (incl. Mutualités Libres)",
    period: "Sep 2020 — Oct 2023",
    location: "Zottegem / Brussels, Belgium",
    type: "Full-time",
    domain: "Dynamics & Power Platform",
    summary: "Consultant at a Microsoft Gold Partner delivering Dynamics 365, Power Platform and Azure solutions — from junior consultant to Lead Developer & SCRUM Master within two years, including a major CRM transformation at Mutualités Libres.",
    paragraphs: [
      "Net IT is a Microsoft Gold Partner specializing in Dynamics 365, Power Platform and Cloud solutions. I combined Power Platform, .NET development and Azure cloud technologies to deliver impactful solutions for clients — starting as a junior consultant and advancing to Lead Developer and SCRUM Master within two years, leading a substantial enterprise project exceeding 1,000 mandays with ownership of code architecture, system design and best practices for minimizing technical debt.",
      "My primary consulting engagement was at Mutualités Libres (Onafhankelijke Ziekenfondsen), central to two significant Dynamics CRM/Azure projects as part of a major business transformation. As Lead Developer and SCRUM Master of the second project — modernizing tools for over 1,000 end-users — we migrated 600+ users to the new CRM by the end of the engagement, empowering the customer service team to manage public website communications and support tickets effectively.",
      "Leading a cross-functional team of 10, I implemented SCRUM with monthly sprints (planning, backlog refinement, release reviews), defined the code architecture prioritizing low technical debt, built automated testing frameworks (xUnit, Playwright) and enhanced the CI/CD pipeline for smoother deployments. I mentored developers, was the main point of contact between the technical team and stakeholders, and collaborated with solution and enterprise architects on the project's technical roadmap. As one of Net IT's internal .NET technical experts, I also explored and selected new technologies and provided developer guidelines company-wide."
    ],
    bulletPoints: [
      "Lead Developer & SCRUM Master on a 1,000+ mandays enterprise project within two years of starting",
      "600+ users migrated to a new CRM modernizing tooling for 1,000+ end-users at Mutualités Libres",
      "Full-stack delivery: C# and TypeScript applying SOLID principles and Test-Driven Development",
      "Scalable CI/CD pipelines and Infrastructure as Code to optimize deployment workflows",
      "Model-driven apps, Power Automate flows and seamless Dynamics 365 & Azure integrations",
      "Azure across the stack: Web Apps, Functions, Logic Apps, Service Bus and Virtual Networks"
    ],
    techStack: ["Dynamics 365", "Power Platform", "Power Automate", "C# / .NET", "TypeScript", "React", "ASP.NET", "Azure Functions", "Logic Apps", "Service Bus", "Azure DevOps", "xUnit", "Playwright"],
    highlights: ["Dynamics 365 & CRM", "SCRUM Leadership", "Enterprise Delivery"],
    metrics: [
      { label: "Users Migrated", value: "600+" },
      { label: "Project Scale", value: "1,000+ mandays" },
      { label: "Team Led", value: "10 people" }
    ],
    featured: true,
    tableData: {
      systemScope: "Dynamics CRM & Power Platform",
      keyDeliverable: "CRM transformation for 1,000+ end-users",
      impactMetric: "600+ users migrated · monthly sprint cadence",
      coreTech: "D365 / Power Platform / C# / TypeScript"
    },
    deepDive: {
      architecturalChallenge: "Modernize the tooling of 1,000+ end-users mid-operation: the customer service team had to keep working while a new CRM, its integrations and public-website communication flows were rolled out across 600+ users.",
      solution: "Monthly SCRUM delivery with a cross-functional team of ten, a code architecture designed for low technical debt, automated testing frameworks (xUnit, Playwright) and an enhanced CI/CD pipeline for smooth, repeatable deployments.",
      keyLearnings: [
        "Being the main contact between the technical team and stakeholders is as decisive for delivery as the code itself.",
        "Mentoring developers into shared standards beats enforcing them alone — the codebase stays healthy after you leave.",
        "Test automation is what makes a long CRM migration auditable and reversible."
      ]
    }
  },
  {
    id: "imec-iot-network-engineer",
    skillIds: [],
    role: "IoT Network Engineer — Summer Job",
    company: "imec",
    period: "Jul 2020 — Aug 2020",
    location: "Zwijnaarde (Ghent), Belgium",
    type: "Internship",
    domain: "IoT & Hardware",
    summary: "Two-month summer job at imec: converting an existing IoT network architecture to a modern adapter framework connecting IoT networks to a central virtual network operator.",
    paragraphs: [
      "A brief but instructive summer job at imec in Zwijnaarde: an existing network architecture for connecting IoT devices was already documented and needed to be implemented. I reviewed and modified the existing C++ codebase and added newer Python scripts, hosting all components with Dockerfiles and Kubernetes.",
      "The goal of these developments was to enable an adapter framework where IoT networks can be connected to a central virtual network operator — and to enable IPv6 communication between standalone IoT devices within the network."
    ],
    bulletPoints: [
      "Reviewed and modified an existing C++ codebase against a documented target architecture",
      "Added Python tooling and containerized all components with Dockerfiles and Kubernetes",
      "Enabled IPv6 communication between standalone IoT devices"
    ],
    techStack: ["C++", "Python", "Docker", "Kubernetes", "IPv6", "IoT Networking"],
    highlights: ["IoT Networking", "Containerization"],
    metrics: [
      { label: "Duration", value: "2 months" },
      { label: "Focus", value: "IoT Networking" }
    ],
    featured: false,
    tableData: {
      systemScope: "IoT Adapter Framework",
      keyDeliverable: "IPv6-enabled virtual network operator",
      impactMetric: "Containerized components on Kubernetes",
      coreTech: "C++ / Python / Docker / K8s"
    },
    deepDive: {
      architecturalChallenge: "Connecting heterogeneous IoT networks to a central virtual network operator while switching standalone devices to IPv6 — without breaking the already-documented reference architecture.",
      solution: "Implemented the documented adapter framework: C++ review and modification, new Python tooling, and containerized deployment of every component via Dockerfiles and Kubernetes.",
      keyLearnings: [
        "Container-first hosting makes even research-grade IoT setups reproducible.",
        "A short, well-scoped assignment can still leave a codebase measurably better off."
      ]
    }
  },
  {
    id: "ugent-informatics-degree",
    skillIds: ["solution-architecture"],
    role: "B.Sc. + M.Sc. Industrial Sciences: Informatics",
    company: "Ghent University (Universiteit Gent)",
    period: "2016 — 2020",
    location: "Ghent, Belgium",
    type: "Education",
    domain: "Education & Research",
    summary: "Engineering degree giving broad knowledge across the whole IT domain — completed magna cum laude, without a single resit — and capped by a master's thesis on distributed multi-radio MAC protocols.",
    paragraphs: [
      "Four years at Ghent University gave me broad theoretical and practical knowledge across the whole IT domain: software engineering, networking, electronics, operating systems, databases and information security. That breadth is exactly what lets me learn any new skill quickly and see beyond the boundaries of a single technology stack — the foundation everything above is built on.",
      "The master's thesis, written at IDLab under Prof. Dr. Ir. Eli De Poorter and Prof. Dr. Ir. Jeroen Hoebeke, designed a distributed multi-radio MAC protocol combining sub-GHz and Ultra-Wideband radios for sub-decimeter distance determination between triathletes. It was my first end-to-end experience owning a system from protocol design to hardware validation — and it still shapes how I approach architecture today.",
      "I graduated magna cum laude, on both degrees, without any resits throughout the whole program."
    ],
    bulletPoints: [
      "Magna cum laude on both degrees — zero resits across the entire program",
      "Master thesis: distributed multi-radio MAC protocol (sub-GHz + UWB) for distance determination",
      "Broad IT-domain foundation: software engineering, networking, electronics, security, databases",
    ],
    techStack: ["C / C++", "UWB & Sub-GHz Radios", "Python", "MATLAB", "Networking", "Linux"],
    highlights: ["Magna cum laude", "IDLab Master Thesis", "Broad IT Foundation"],
    metrics: [
      { label: "Graduation", value: "Magna cum laude" },
      { label: "Resits", value: "0" },
      { label: "Thesis Precision", value: "< 10 cm" }
    ],
    featured: true,
    tableData: {
      systemScope: "Engineering Degree (B.Sc. + M.Sc.)",
      keyDeliverable: "Distributed multi-radio MAC thesis",
      impactMetric: "Magna cum laude — zero resits",
      coreTech: "C/C++ / UWB / Sub-GHz / Networking"
    },
    deepDive: {
      architecturalChallenge: "Ultra-Wideband delivers sub-decimeter ranging accuracy via two-way ranging, but dozens of simultaneously ranging mobile nodes collapse the channel into contention, packet collisions and extreme energy drain.",
      solution: "An asynchronous hybrid protocol: low-power sub-GHz broadcasts handle synchronization, neighbor discovery and time-slot negotiation, while UWB transceivers wake strictly for scheduled, collision-free ranging intervals.",
      keyLearnings: [
        "Hardware constraints must shape the protocol abstraction — not the other way around.",
        "Deterministic time-slotting beats randomized backoff in dense mobile topologies.",
        "A broad engineering curriculum pays off immediately when switching domains professionally."
      ]
    }
  }
];

export const projectsData: ProjectItem[] = [
  {
    id: "opengl-mandelbrot",
    skillIds: [],
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
    skillIds: ["solution-architecture"],
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
    skillIds: ["csharp-dotnet"],
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
    // No stat chips on purpose: "Async Flow 100%" / "SOLID/OGP" were filler,
    // and this project's honest proof is the repo + highlights themselves.
    stats: []
  },
  {
    id: "archconfig",
    skillIds: ["devops-cicd-iac"],
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

/**
 * The six real skills, ordered by how I want to profile myself:
 * a Dynamics — Azure — AI technical guy. Each one gets its own section on
 * the page with a story and linked evidence — no invented percentages.
 * Everything goes through relatedExperienceIds / relatedProjectIds so the
 * whole site cross-links: skills ↔ experiences ↔ projects.
 */
export const coreSkillsData: CoreSkill[] = [
  {
    id: "dynamics-365-power-platform",
    title: "Dynamics 365 & Power Platform",
    iconName: "Briefcase",
    tagline: "Business applications first: CRM people actually use, built properly on Dataverse.",
    paragraphs: [
      "This is where I'm most at home. Dynamics 365 CE, model-driven apps, Power Automate, Dataverse — not as demo-ware but as systems that real end-users depend on every day. At Net IT, a Microsoft Gold Partner, I went from junior consultant to Lead Developer & SCRUM Master within two years, owning the code architecture of an enterprise project exceeding 1,000 mandays.",
      "The proof is in production. At Mutualités Libres we modernized the tooling for over 1,000 end-users and migrated more than 600 of them onto the new CRM — while the customer service team kept working through the whole rollout. Integrations with Dynamics 365 and Azure, automated testing (xUnit, Playwright) and a solid CI/CD pipeline are what made that migration auditable instead of heroic.",
      "Today at Baloise I still live in this world: delivering feature requests for Azure Cloud and Dynamics 365 applications, developing and administering Dataverse environments, and running solution management and deployment with first-party tooling — PAC CLI, Configuration Migration Tool — plus XrmToolBox where it helps.",
    ],
    proofPoints: [
      "Lead Developer & SCRUM Master on a 1,000+ mandays enterprise project",
      "600+ users migrated to a new CRM at Mutualités Libres",
      "4 Dynamics 365 certifications: Sales & Marketing Functional Consultant, Power Apps + D365 Developer Associate",
    ],
    relatedExperienceIds: ["netit-dynamics-consultant", "baloise-azure-dynamics"],
    relatedProjectIds: [],
  },
  {
    id: "azure-platform",
    title: "Azure — Platform Engineering",
    iconName: "Cloud",
    tagline: "Governed, automated, first-party wherever possible. Certified on it twice over.",
    paragraphs: [
      "Azure is my platform — and my focus is the layer underneath the apps: Landing Zones, governance, identity, networking, API management. I hold both AZ-104 (Azure Administrator Associate) and AZ-305 (Azure Solutions Architect Expert), and the second one is the honest job title for what I actually do.",
      "At Baloise I'm rebuilding years of organically grown resources into a governed estate: migrating unmanaged Azure resources into Azure Landing Zones, moving Logic Apps from consumption to the standard plan, replacing secret-based authentication with managed identities across APIM, Function Apps and Logic Apps, and centralizing Azure API Management through APIOps — heavy use of policies, OpenAPI specs, schemas, API versioning, backends and monitoring.",
      "At Reimagine it was the same instinct at smaller scale: subscription and resource group management, and picking the right Azure services per project — Web Apps, Functions, Logic Apps, Service Bus, Virtual Networks — rather than defaulting to whatever I knew best last year.",
    ],
    proofPoints: [
      "AZ-305 Azure Solutions Architect Expert · AZ-104 Azure Administrator Associate",
      "Full Azure Landing Zones migration & centralized APIM via APIOps at Baloise",
      "Managed identities everywhere the platform allows — no more secret sprawl",
    ],
    relatedExperienceIds: ["baloise-azure-dynamics", "reimagine-ai-architect", "netit-dynamics-consultant"],
    relatedProjectIds: [],
  },
  {
    id: "applied-ai",
    title: "AI — Applied, Not Hyped",
    iconName: "Bot",
    tagline: "LLM features that survive contact with a business, and agentic tooling that multiplies a team.",
    paragraphs: [
      "I'm not an AI researcher — I'm the engineer who ships AI where it earns its keep. At Reimagine, a consultancy that designs AI solutions, that was literally the job: integrating GPT-4 into production websites and backends using Azure OpenAI Studio, Ollama and FastAPI, across Python, C#/.NET Core and TypeScript codebases. One rule I kept everywhere: isolate the model behind a clean service boundary, because today's best model is next year's legacy dependency.",
      "The newer chapter is agentic. At Baloise I set up the team's Claude Code development environment — implementing agents, automated checks and validation pipelines — and I use it daily as a genuine productivity multiplier. What makes it work is not the model; it's the strictness of the validation pipeline around it.",
      "That's my honest position on AI: it is worth exactly what the surrounding engineering makes of it. Passionate about it, yes — but I measure it in working features and saved hours, not demos.",
    ],
    proofPoints: [
      "GPT-4 integrated into production customer solutions (Azure OpenAI, Ollama, FastAPI)",
      "Team-wide Claude Code environment: agents, automated checks, validation pipelines",
      "AI features designed for swap-out — isolated behind service boundaries",
    ],
    relatedExperienceIds: ["reimagine-ai-architect", "baloise-azure-dynamics"],
    relatedProjectIds: [],
  },
  {
    id: "csharp-dotnet",
    title: "C# / .NET Engineering",
    iconName: "Code2",
    tagline: "The language I think in — written for the next maintainer, not just for the demo.",
    paragraphs: [
      "Six-plus years of C# across .NET Framework and .NET Core: ASP.NET backends, Azure Functions, Dynamics plugin work, and the occasional side project with deliberately strict SOLID design. At Net IT I applied SOLID principles and Test-Driven Development daily, in C# and TypeScript side by side.",
      "What distinguishes my .NET work lately is quality enforcement at team scale. At Baloise I introduced first-party coding standards: .editorconfig enforced at repository level, .NET analyzers with a managed warning count, migration of MSBuild-style projects to SDK-style — which reduced build complexity tremendously — plus a deliberate reduction of third-party nuget packages to shrink the supply-chain attack surface. Conventions are opinions; tooling is policy.",
      "Back in 2022 this craft got external validation: 2nd place in the .NET Challenge Belgium, professional category.",
    ],
    proofPoints: [
      "First-party quality control: .editorconfig, .NET analysers, SDK-style migrations",
      "2nd place .NET Challenge Belgium 2022 (professional category)",
      "SOLID + TDD on enterprise delivery (xUnit, Playwright test frameworks)",
    ],
    relatedExperienceIds: ["baloise-azure-dynamics", "reimagine-ai-architect", "netit-dynamics-consultant"],
    relatedProjectIds: ["discord-songbot"],
  },
  {
    id: "devops-cicd-iac",
    title: "DevOps, CI/CD & Infrastructure as Code",
    iconName: "GitBranch",
    tagline: "If it isn't reproducible, it isn't done. My LinkedIn top skills — IaC and Terraform — agree.",
    paragraphs: [
      "DevOps is how quality scales beyond one careful developer. Every project I've led got its own CI/CD pipelines modeling its actual process — on Azure DevOps or GitHub — instead of a copy-pasted template nobody reads.",
      "Infrastructure as Code is the strongest thread through my last three roles: Terraform and ARM templates at Reimagine, test automation and pipeline work at Net IT, and at Baloise the full monty — a complete Infrastructure-as-Code setup in Terraform built from scratch, a reviewed git setup, and supply-chain risk reduced by cutting third-party tooling. Even my hobby automation (dotfiles and machine provisioning for Arch Linux) is the same instinct at kitchen-table scale: declare the end state, script the path there.",
      "I care about this because deployments are where architecture gets honest. A pipeline that can't rebuild the environment is a liability, not a convenience.",
    ],
    proofPoints: [
      "Full Terraform IaC estate built from scratch at Baloise",
      "Project-specific CI/CD on Azure DevOps & GitHub (Reimagine, Net IT)",
      "Automated testing frameworks (xUnit, Playwright) wired into delivery pipelines",
    ],
    relatedExperienceIds: ["baloise-azure-dynamics", "reimagine-ai-architect", "netit-dynamics-consultant"],
    relatedProjectIds: ["archconfig"],
  },
  {
    id: "solution-architecture",
    title: "Solution Architecture",
    iconName: "Compass",
    tagline: "The fewest moving parts that solve the business problem — designed with the customer, approved with the budget.",
    paragraphs: [
      "Architecture, to me, is choosing what not to build. At Reimagine every project needed its own optimal set of Azure & Microsoft services; I designed each one, got the design and the budget approved by the customer, and then carried technical delivery as the senior developer. Business and functional analysis from stakeholder meetings fed straight into the technical design — the same conversation, not a game of telephone.",
      "My engineering degree is the quiet advantage here. Networking, security, operating systems, electronics — the broad curriculum is why I can walk into an unfamiliar domain and still see the whole board. My master's thesis at IDLab went all the way from designing a distributed multi-radio MAC protocol to validating it on hardware: my first end-to-end ownership of a system, and still the reference point for how I approach architecture.",
      "AZ-305 (Azure Solutions Architect Expert) certifies the practice; magna cum laude on the degree backs the foundation.",
    ],
    proofPoints: [
      "Per-project solution designs approved by customers at Reimagine (design + budget)",
      "AZ-305 Azure Solutions Architect Expert",
      "Magna cum laude M.Sc. — thesis: distributed multi-radio MAC protocol (IDLab, UGent)",
    ],
    relatedExperienceIds: ["reimagine-ai-architect", "ugent-informatics-degree", "netit-dynamics-consultant"],
    relatedProjectIds: ["multi-radio-mac-protocol"],
  },
];

/**
 * The long tail: technologies I've used at some point. Percentages kept
 * (per request) — read them as "roughly how central this became in my
 * work", not as a proficiency claim. This list is intentionally not
 * profiled; the six skills above are.
 */
export const otherSkillsData: OtherSkill[] = [
  { name: "TypeScript / JavaScript", level: 90, experienceYears: "6+ yrs", badge: "Pair of C#" },
  { name: "Distributed MAC Protocols & UWB", level: 88, badge: "M.Sc. Thesis" },
  { name: "SQL", level: 88, experienceYears: "6+ yrs" },
  { name: "Python", level: 85, experienceYears: "5+ yrs", badge: "AI & Scripting" },
  { name: "React & Modern Frontend", level: 85, experienceYears: "5+ yrs" },
  { name: "Linux / Arch & Systems Tooling", level: 85, badge: "Daily driver" },
  { name: "Bash / Shell", level: 82, experienceYears: "6+ yrs" },
  { name: "Docker & Kubernetes", level: 80, experienceYears: "4+ yrs" },
  { name: "C / C++ & Embedded", level: 80, badge: "Degree & imec" },
  { name: "OpenGL / GLSL & GPU Compute", level: 78, badge: "Side project" },
  { name: "IoT Networking (IPv6, MQTT)", level: 75, badge: "imec" },
  { name: "MATLAB & Simulation", level: 72, badge: "Research" },
];

export const educationData: EducationItem = {
  degree: "Master of Science in Industrial Sciences: Informatics",
  institution: "Ghent University (Universiteit Gent - UGent)",
  location: "Ghent, Belgium",
  period: "2016 — 2020 (B.Sc. + M.Sc.)",
  grade: "Magna cum laude — no resits",
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

/**
 * Vendor certifications — deliberately kept OUT of the education data
 * (they are credentials, not schooling). Rendered on the About tab's
 * recognition card and as compact chips in the hero.
 */
export const certificationsData: CertificationItem[] = [
  {
    id: "az-305",
    code: "AZ-305",
    name: "Azure Solutions Architect Expert",
    short: "Azure Solutions Architect",
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-solutions-architect/",
  },
  {
    id: "az-104",
    code: "AZ-104",
    name: "Azure Administrator Associate",
    short: "Azure Administrator",
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/azure-administrator/",
  },
  {
    id: "d365-sales",
    code: "D365",
    name: "Dynamics 365 Sales Functional Consultant Associate",
    short: "D365 Sales Consultant",
    // Credential retired by Microsoft (Nov 2024) — this page remains the
    // official reference for what was earned.
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/d365-functional-consultant-sales-v3/",
  },
  {
    id: "d365-marketing",
    code: "D365",
    name: "Dynamics 365 Marketing Functional Consultant Associate",
    short: "D365 Marketing Consultant",
    // Credential renamed by Microsoft to "Customer Insights (Journeys)" —
    // this is its current official credential page (MB-220 lineage).
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/d365-customer-insights-journeys-functional-consultant/",
  },
  {
    id: "d365-powerapps-dev",
    code: "D365",
    name: "Power Apps + Dynamics 365 Developer Associate",
    short: "Power Apps + D365 Developer",
    // Credential retired by Microsoft — official page still live.
    verifyUrl: "https://learn.microsoft.com/en-us/credentials/certifications/power-apps-and-d365-developer-associate/",
  },
];

/**
 * Honors & awards (per LinkedIn). Rendered on the About tab's
 * recognition card alongside the certifications.
 */
export const honorsData: HonorItem[] = [
  {
    id: "dotnet-challenge-2022",
    title: "2nd place — .NET Challenge Belgium",
    detail: "2022 · professional category",
  },
  {
    id: "big-data-challenge-2022",
    title: "2nd place — Big Data Challenge Belgium",
    detail: "2022 · by De Lijn",
  },
];

export const marqueeTechList = [
  "C# / .NET", "Dynamics 365", "Azure", "TypeScript", "Power Platform",
  "Terraform", "Azure DevOps", "APIM / APIOps", "Dataverse", "Docker",
  "Python", "Azure OpenAI", "Claude Code", "React", "SQL", "Kubernetes",
  "Linux", "Playwright"
];

/**
 * Client case studies — the professional proof shelf, rendered ABOVE the
 * hobby "Lab" projects on the Projects tab (owner decision: real engagement
 * names; both are already public on this site and LinkedIn). Content is
 * distilled from the matching experience deep-dives, not invented.
 */
export const caseStudiesData: CaseStudyItem[] = [
  {
    id: "case-baloise-azure-governance",
    client: "Baloise BE",
    industry: "Insurance",
    period: "Aug 2025 — Present",
    role: "Independent IT Consultant — Azure Platform & Dynamics 365",
    title: "A governed Azure estate & centralized API management",
    challenge:
      "Years of organically grown, unmanaged Azure resources: inconsistent governance, secret-based authentication, manual deployments, and third-party tooling and packages introducing supply-chain risk into business-critical applications.",
    approach:
      "Rebuilt the estate on Azure Landing Zones with a full Infrastructure-as-Code setup in Terraform built from scratch; centralized Azure API Management through APIOps (policies, OpenAPI specs, API versioning, backends, monitoring); swapped secrets for managed identities across APIM, Function Apps and Logic Apps; and enforced first-party coding standards team-wide (.editorconfig, .NET analysers, SDK-style migrations) plus a Claude Code development environment with strict validation pipelines.",
    outcomes: [
      "Full Terraform IaC estate — the environment is reproducible, not tribal knowledge",
      "Centralized APIM via APIOps: policies, OpenAPI specs, versioning, monitoring",
      "An entire class of credential risk removed (managed identities everywhere the platform allows)",
      "Supply-chain attack surface reduced by cutting third-party nuget packages and reviewing the team's git setup",
    ],
    techStack: ["Azure", "Terraform", "Azure APIM", "APIOps", "Managed Identities", "Logic Apps", "Dynamics 365", "Dataverse", "Claude Code"],
    skillIds: ["azure-platform", "devops-cicd-iac", "applied-ai", "csharp-dotnet"],
  },
  {
    id: "case-mutualites-crm-transformation",
    client: "Mutualités Libres · delivered via Net IT nv",
    industry: "Health insurance",
    period: "Sep 2020 — Oct 2023",
    role: "Lead Developer & SCRUM Master",
    title: "CRM transformation for 1,000+ end-users, mid-operation",
    challenge:
      "Modernize the tooling of 1,000+ end-users while the customer service team kept working: a new CRM, its integrations and public-website communication flows had to roll out across 600+ users without breaking daily operation.",
    approach:
      "Monthly SCRUM delivery with a cross-functional team of ten; a code architecture designed for low technical debt; automated testing frameworks (xUnit, Playwright) wired into an enhanced CI/CD pipeline; mentoring developers into shared standards while acting as the main contact between the technical team and stakeholders.",
    outcomes: [
      "600+ users migrated to the new CRM — auditable and reversible, not heroic",
      "1,000+ mandays enterprise project led within two years of starting as a junior consultant",
      "Customer service team empowered to manage public-website communications and support tickets themselves",
      "The codebase stayed healthy after hand-over — shared standards, not personal heroics",
    ],
    techStack: ["Dynamics 365", "Power Platform", "Dataverse", "C# / .NET", "TypeScript", "xUnit", "Playwright", "Azure DevOps"],
    skillIds: ["dynamics-365-power-platform", "solution-architecture", "csharp-dotnet", "devops-cicd-iac"],
  },
];

/**
 * Testimonials on the Contact tab (owner-supplied, 2026-09). The Kaan quote
 * is a real recommendation, translated to English; the other two are the
 * owner's paraphrases of feedback he received repeatedly — never invent
 * quotes. Companies are shown and cross-link to their Experience entries.
 */
export const testimonialsData: TestimonialItem[] = [
  {
    id: "testimonial-kaan-netit",
    quote:
      "Roel is a versatile tech professional who, as Team Leader, excels at both development and leadership. As an experienced programmer he masters modern CI/CD processes and works efficiently with Dynamics and Azure solutions. Whether he's developing, advising or informally taking over project tasks, he always combines technical expertise with a results-driven attitude.",
    attribution: "Kaan",
    company: "Net IT",
    experienceId: "netit-dynamics-consultant",
  },
  {
    id: "testimonial-netit-expert",
    quote:
      "We are very satisfied with Roel. We've made him part of our .NET expert team to share knowledge across the team.",
    attribution: "Technical expert",
    company: "Net IT",
    experienceId: "netit-dynamics-consultant",
  },
  {
    id: "testimonial-baloise-mgmt",
    quote:
      "Roel doesn't necessarily do what he likes best — he does what needs to be done. Without fuss. You can count on Roel.",
    attribution: "Management & HR",
    company: "Baloise",
    experienceId: "baloise-azure-dynamics",
  },
];
