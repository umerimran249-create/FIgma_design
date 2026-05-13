export const siteConfig = {
  name: "Vista Logica",
  tagline: "Optimize. Innovate. Lead.",
  description:
    "Optimising business outcomes through technology and digital enablement. Cloud, data, and digital solutions from Melbourne, Australia.",
  email: "hello@vistalogica.com.au",
  phone: "+61 3 0000 0000",
  social: {
    linkedin: "https://www.linkedin.com/company/vista-logica",
  },
};

export const locations = [
  {
    id: "melbourne",
    city: "Melbourne",
    country: "Australia",
    role: "Global HQ",
    address: "Level 23, Collins Square, 727 Collins St, Docklands VIC 3008",
    lat: -37.8201,
    lng: 144.9446,
    // Position on the simplified world map (in %)
    mapX: 87,
    mapY: 78,
  },
  {
    id: "sydney",
    city: "Sydney",
    country: "Australia",
    role: "Engagement Studio",
    address: "Barangaroo, Sydney NSW 2000",
    lat: -33.8688,
    lng: 151.2093,
    mapX: 89,
    mapY: 76,
  },
  {
    id: "singapore",
    city: "Singapore",
    country: "Singapore",
    role: "APAC Hub",
    address: "Raffles Place, Central Singapore",
    lat: 1.2839,
    lng: 103.8519,
    mapX: 76,
    mapY: 55,
  },
];

export const servicesData = [
  {
    slug: "data-analytics-insights",
    title: "Data, Analytics & Insights",
    short: "Boosting organisational performance with actionable insights.",
    long: "Unlock the power of data with advanced analytics solutions. From big data and predictive analytics to actionable insights, we help you make data-driven decisions that keep you ahead in today's competitive landscape.",
    accent: "#2563EB",
    gradient: "linear-gradient(135deg, #2563EB, #06B6D4)",
    pillars: [
      {
        name: "Strategy & Advisory",
        items: [
          "Advisory and Assessment",
          "Data, AI & Gen AI Strategy & Roadmap",
          "Operating Model",
        ],
      },
      {
        name: "Data Modernisation",
        items: [
          "Data Architecture & Design",
          "Data Governance & Management",
          "Data as a Product",
        ],
      },
      {
        name: "Analytics & Insights",
        items: [
          "Machine learning & advanced analytics",
          "Gen AI application development",
          "Data engineering & visualisation",
        ],
      },
    ],
  },
  {
    slug: "cloud-enablement",
    title: "Cloud Enablement",
    short: "Drive innovation and optimisation through technology modernisation.",
    long: "Transform your operations with comprehensive cloud enablement services. From strategy through migration to optimisation, we leverage deep, experience-based learnings to help you seamlessly transition to cloud-based technologies — maximising agility and minimising cost.",
    accent: "#7C3AED",
    gradient: "linear-gradient(135deg, #7C3AED, #2563EB)",
    pillars: [
      {
        name: "Cloud Strategy",
        items: [
          "Cloud Readiness Assessment",
          "Cloud Strategy & Roadmap",
          "Cloud Operating Model",
        ],
      },
      {
        name: "Cloud Foundations",
        items: [
          "Security and architecture design",
          "Automation and tooling",
          "Cloud Integration Roadmap",
        ],
      },
      {
        name: "Migration / Optimisation",
        items: [
          "Cloud Migration Business Case",
          "Cloud migration & modernisation",
          "Cloud Cost Optimisation",
        ],
      },
    ],
  },
  {
    slug: "digital-experience-design",
    title: "Digital Experience & Design",
    short: "Captivate and convert by streamlining cohesive experiences.",
    long: "Elevate your digital presence and connect with customers like never before. Our digital experience solutions blend creativity with innovative technology to deliver smooth, personalised experiences across web, mobile, and emerging platforms.",
    accent: "#06B6D4",
    gradient: "linear-gradient(135deg, #06B6D4, #10B981)",
    pillars: [
      {
        name: "Strategy & Advisory",
        items: [
          "Digital Strategy",
          "Digital Product Discovery",
          "Prototyping and integration",
        ],
      },
      {
        name: "CX / UX",
        items: [
          "UX need and journey mapping",
          "User experience & interface design",
          "Personalisation and Marketing Automation",
        ],
      },
      {
        name: "Digital Products",
        items: [
          "Product design & market fit simulation",
          "Ad Tech and channel monetisation",
          "Application development",
        ],
      },
    ],
  },
];

export const flairs = [
  {
    slug: "responsible-ai-by-design",
    category: "AI & Governance",
    title: "Responsible AI by Design: A Framework for Execution",
    excerpt:
      "AI success now hinges on governance, not just great models: leaders need a risk-based operating system that assigns ownership, embeds controls, and produces audit-ready evidence by default.",
    author: "Laura Bennett",
    date: "14/10/2025",
    accent: "#2563EB",
  },
  {
    slug: "telecoms-product-market-fit",
    category: "Telecoms",
    title: "Simulating product market fit for targeted product design in Telecoms",
    excerpt:
      "Lessons from the field — a case study on the use of AI for efficient product design leading to enhanced uptake and adoption in the Telecommunications sector.",
    author: "James Calder",
    date: "26/10/2024",
    accent: "#7C3AED",
  },
  {
    slug: "ai-driven-data-monetization",
    category: "Data Strategy",
    title:
      "Harnessing Data as a Strategic Asset: The Emerging Power of AI-Driven Monetization",
    excerpt:
      "Learn how businesses are turning data into revenue with AI-powered insights, automation, and scalable personalisation.",
    author: "Madi Almadi",
    date: "01/07/2025",
    accent: "#06B6D4",
  },
  {
    slug: "cloud-economics-assessment",
    category: "Cloud",
    title:
      "Cloud economics assessment — a pathway to cost / benefit analysis for cloud migration",
    excerpt:
      "Understanding cloud costs and benefits to inform the strategic migration of your data and analytics ecosystem to cloud.",
    author: "Hammad Khan",
    date: "15/07/2024",
    accent: "#10B981",
  },
  {
    slug: "cloud-data-analytics-modernization",
    category: "Cloud Modernisation",
    title:
      "Empowering insights and innovation through cloud-based data and analytics modernization",
    excerpt:
      "A structured approach to uplifting your data and analytics ecosystem through cloud modernisation.",
    author: "Brett Willoughby",
    date: "15/07/2024",
    accent: "#10B981",
  },
  {
    slug: "ai-in-healthcare",
    category: "Healthcare",
    title:
      "Application of artificial intelligence to uplift patient experiences and clinical decision making",
    excerpt:
      "Enhancing the efficacy, personalization and cost-effectiveness of healthcare by harnessing the potential of Artificial Intelligence.",
    author: "Fana Anwar",
    date: "26/10/2024",
    accent: "#2563EB",
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/vista-flair", label: "VistaFlair" },
  { href: "/contact", label: "Contact" },
];
