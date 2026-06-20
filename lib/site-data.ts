export const siteConfig = {
  name: "Vista Logica",
  tagline: "Innovate. Collaborate. Accelerate.",
  description:
    "Bringing strategy, technology, and expertise together to help organisations design smarter solutions, scale capabilities, and achieve measurable business outcomes.",
  email: "hello@vistalogica.com.au",
  phone: "+61 3 0000 0000",
  social: {
    linkedin: "https://www.linkedin.com/company/vista-logica",
  },
};

export const homeHero = {
  lines: ["Innovate.", "Collaborate.", "Accelerate."],
  subtext:
    "Bringing strategy, technology, and expertise together to help organisations design smarter solutions and scale with confidence.",
};

export const executionStatement = {
  headline: "The Future Doesn't Need More Ideas.",
  headlineAccent: "It Needs Better Execution.",
  body: "AI, cloud, data, and digital initiatives create value when strategy, technology, and delivery move together. Vista Logica helps organisations plan, build, and scale capabilities that improve operations, customer experiences, and business performance.",
  cta: "Start A Conversation",
};

export const servicesPageHero = {
  title: "Capability that compounds at",
  titleAccent: "every layer.",
  subtext:
    "Four connected disciplines, one continuous practice — strategy, cloud, emerging AI, and experience design working as a single system.",
};

export const servicesProcessSteps = [
  {
    title: "Discover",
    body: "Assess where you are, what's possible, and what's worth doing first.",
  },
  {
    title: "Design",
    body: "Architect the platform, strategy, or experience around your real constraints.",
  },
  {
    title: "Build",
    body: "Implement with the team you already have, or alongside ours.",
  },
  {
    title: "Scale",
    body: "Hand over a system your team can run, extend, and trust.",
  },
];

export const servicesBottomHero = {
  headline: "Build The Capability.",
  headlineAccent: "Not The Hype.",
  body: "AI, cloud, data, and digital initiatives succeed when strategy, technology, and execution work together. Vista Logica delivers advisory, architecture, implementation, and AI solutions designed to solve real operational and commercial challenges. By combining consulting expertise with products built for practical deployment, we help organisations accelerate adoption and realise value sooner.",
};

export type ServiceItem = {
  title: string;
  summary: string;
  detail: string;
};

export type ServicePillar = {
  slug: string;
  title: string;
  tagline: string;
  accent: string;
  gradient: string;
  items: ServiceItem[];
};

export const servicePillars: ServicePillar[] = [
  {
    slug: "ai-ml-industry-guidance",
    title: "AI / ML Industry Guidance",
    tagline:
      "Turn AI opportunities into practical business outcomes through strategy, intelligent operations, and industry-focused solutions.",
    accent: "#ffde5a",
    gradient: "linear-gradient(135deg, #ffde5a, #ffb648)",
    items: [
      {
        title: "Strategy & Value Advisory",
        summary:
          "Align AI, cloud, data, and digital initiatives with business priorities through structured assessment, roadmap development, and execution planning.",
        detail:
          "We help organisations identify high-value opportunities, define delivery priorities, and establish the foundations required for successful AI adoption.",
      },
      {
        title: "Agentic Driven Operations",
        summary:
          "Improve operational performance through intelligent agents, connected systems, and real-time data.",
        detail:
          "By combining IoT, smart devices, Machine Learning, and automation, organisations can improve asset visibility, reduce downtime, and support more reliable operations.",
      },
      {
        title: "Industry Focused Solutions",
        summary:
          "Apply AI solutions built around industry requirements and operational needs.",
        detail:
          "Our industry-focused approach combines domain expertise with custom Generative AI and Retrieval-Augmented Generation (RAG) libraries to support faster delivery and trusted knowledge access.",
      },
    ],
  },
  {
    slug: "cloud-enablement-for-ai",
    title: "Cloud Enablement For AI",
    tagline:
      "Build the cloud foundations required for AI, data platforms, and modern digital capabilities.",
    accent: "#ffe888",
    gradient: "linear-gradient(135deg, #ffe888, #ffde5a)",
    items: [
      {
        title: "Cloud For AI",
        summary:
          "Prepare cloud environments for AI workloads, Machine Learning, and advanced analytics.",
        detail:
          "We assess cloud readiness, define platform requirements, and establish the technical foundations needed for scalable AI delivery.",
      },
      {
        title: "Platform Foundations",
        summary:
          "Design secure platforms that support AI and data-driven applications.",
        detail:
          "Our services include cloud architecture, platform engineering, DevOps, automation, and MLOps foundations that support reliable delivery.",
      },
      {
        title: "Cloud Migration",
        summary:
          "Modernise technology environments through structured cloud migration.",
        detail:
          "We support application, infrastructure, and data migration programs focused on security, optimisation, performance, and operational continuity.",
      },
    ],
  },
  {
    slug: "ai-driven-emerging-services",
    title: "AI Driven Emerging Services",
    tagline:
      "Create new opportunities through data, AI, and emerging digital capabilities.",
    accent: "#ffb648",
    gradient: "linear-gradient(135deg, #ffb648, #f5a020)",
    items: [
      {
        title: "Data / AI Strategy",
        summary:
          "Create a clear direction for using data and AI across the organisation.",
        detail:
          "We define data priorities, governance models, operating structures, and implementation pathways that support measurable business outcomes.",
      },
      {
        title: "GTM & Emerging Services",
        summary:
          "Develop new digital offerings through cloud and AI-enabled business models.",
        detail:
          "We support service design, market planning, and delivery approaches that help organisations introduce emerging services.",
      },
      {
        title: "Conversational AI",
        summary:
          "Improve interactions through AI-powered digital experiences.",
        detail:
          "Conversational AI solutions use Large Language Models (LLMs), Natural Language Processing (NLP), Machine Learning, and Generative AI to support information access, automation, and decision-making.",
      },
    ],
  },
  {
    slug: "digital-experience-design",
    title: "Digital Experience & Design",
    tagline:
      "Create digital experiences that connect customer needs with business objectives.",
    accent: "#f5a020",
    gradient: "linear-gradient(135deg, #f5a020, #ffde5a)",
    items: [
      {
        title: "Digital Strategy",
        summary:
          "Define digital priorities that improve customer engagement and service delivery.",
        detail:
          "We combine customer insights, business requirements, and technology planning to create effective digital strategies.",
      },
      {
        title: "Experience Design",
        summary:
          "Design digital experiences based on customer behaviour and business goals.",
        detail:
          "From customer journeys and research through prototyping and implementation, we create experiences designed for usability and measurable impact.",
      },
      {
        title: "Digital Products",
        summary:
          "Build digital products that support users and business operations.",
        detail:
          "We combine design thinking, technical delivery, and product development practices to validate ideas, build scalable products, and support ongoing improvement.",
      },
    ],
  },
];

/** Legacy shape for pages still importing servicesData */
export const servicesData = servicePillars.map((p) => ({
  slug: p.slug,
  title: p.title,
  short: p.tagline,
  long: p.tagline,
  accent: p.accent,
  gradient: p.gradient,
  pillars: p.items.map((item) => ({
    name: item.title,
    items: [item.summary, item.detail],
  })),
}));

export const locations = [
  {
    id: "melbourne",
    city: "Melbourne",
    country: "Australia",
    role: "Global HQ",
    address: "Level 23, Collins Square, 727 Collins St, Docklands VIC 3008",
    lat: -37.8201,
    lng: 144.9446,
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

export const flairs = [
  {
    slug: "responsible-ai-by-design",
    category: "AI & Governance",
    title: "Responsible AI by Design: A Framework for Execution",
    excerpt:
      "AI success now hinges on governance, not just great models: leaders need a risk-based operating system that assigns ownership, embeds controls, and produces audit-ready evidence by default.",
    author: "Laura Bennett",
    date: "14/10/2025",
    accent: "#ffde5a",
  },
  {
    slug: "telecoms-product-market-fit",
    category: "Telecoms",
    title: "Simulating product market fit for targeted product design in Telecoms",
    excerpt:
      "Lessons from the field — a case study on the use of AI for efficient product design leading to enhanced uptake and adoption in the Telecommunications sector.",
    author: "James Calder",
    date: "26/10/2024",
    accent: "#ffe888",
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
    accent: "#ffb648",
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
    accent: "#f5a020",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  company: string;
  industry: string;
  accent: string;
  rating: number;
};

export const testimonials: Testimonial[] = [
  {
    id: "james-mitchell",
    quote:
      "Vista Logica cut our cloud spend by 40% while doubling analytics throughput. They didn't just migrate — they redesigned how we operate.",
    name: "James Mitchell",
    role: "Chief Technology Officer",
    company: "Meridian Financial Group",
    industry: "Financial Services",
    accent: "#ffde5a",
    rating: 5,
  },
  {
    id: "sarah-rodriguez",
    quote:
      "Our mobile conversion rate tripled in six weeks. The team moved from strategy to shipped product with zero handoff friction.",
    name: "Sarah Rodriguez",
    role: "Head of Digital",
    company: "Arcadia Retail Co.",
    industry: "Retail",
    accent: "#ffe888",
    rating: 5,
  },
  {
    id: "david-park",
    quote:
      "We needed audit-ready AI governance without slowing delivery. Vista Logica built controls into the pipeline from day one.",
    name: "David Park",
    role: "Chief Technology Officer",
    company: "Northbridge Health",
    industry: "Healthcare",
    accent: "#ffb648",
    rating: 5,
  },
  {
    id: "lisa-nguyen",
    quote:
      "99.99% uptime across APAC from a single pane of glass. Their cloud architecture gave us reliability we couldn't buy off the shelf.",
    name: "Lisa Nguyen",
    role: "IT Director",
    company: "Pacific Freight Systems",
    industry: "Logistics",
    accent: "#f5a020",
    rating: 5,
  },
  {
    id: "michael-chen",
    quote:
      "World-class execution on every milestone. They think like operators, not consultants — and that made all the difference.",
    name: "Michael Chen",
    role: "Chief Executive Officer",
    company: "Vertex SaaS",
    industry: "Technology",
    accent: "#ffde5a",
    rating: 5,
  },
  {
    id: "emma-walsh",
    quote:
      "Agentic operations went from pilot to production in one quarter. Vista Logica understood our network constraints better than we did.",
    name: "Emma Walsh",
    role: "Chief Operating Officer",
    company: "TelstraWave",
    industry: "Telecoms",
    accent: "#ffe888",
    rating: 5,
  },
  {
    id: "priya-sharma",
    quote:
      "Our data platform finally serves the business, not the other way around. Clear roadmap, clean architecture, measurable ROI.",
    name: "Priya Sharma",
    role: "VP Data & Analytics",
    company: "Guardian Insurance",
    industry: "Insurance",
    accent: "#ffb648",
    rating: 5,
  },
  {
    id: "tom-andrews",
    quote:
      "The design system they delivered is still the backbone of every product we ship. Consistency at scale — finally achievable.",
    name: "Tom Andrews",
    role: "Product Director",
    company: "Streamline Media",
    industry: "Media",
    accent: "#f5a020",
    rating: 5,
  },
  {
    id: "rachel-kim",
    quote:
      "A complex public-sector migration delivered on time and under budget. Rare in our world — and entirely down to their discipline.",
    name: "Rachel Kim",
    role: "Chief Information Officer",
    company: "State Digital Services",
    industry: "Government",
    accent: "#ffde5a",
    rating: 5,
  },
  {
    id: "omar-hassan",
    quote:
      "ML pipelines that actually reach production. Vista Logica bridged our data science team and engineering in ways we couldn't internally.",
    name: "Omar Hassan",
    role: "Head of Analytics",
    company: "Solaris Energy",
    industry: "Energy",
    accent: "#ffe888",
    rating: 5,
  },
  {
    id: "nina-petrov",
    quote:
      "Conversational AI that customers trust. Governance, guardrails, and a UX that feels human — all shipped in twelve weeks.",
    name: "Nina Petrov",
    role: "Director of Customer Experience",
    company: "Horizon Banking",
    industry: "Banking",
    accent: "#ffb648",
    rating: 5,
  },
  {
    id: "alex-turner",
    quote:
      "They turned our AI strategy from a slide deck into a operating model. Every executive now knows who owns what and why.",
    name: "Alex Turner",
    role: "Chief Strategy Officer",
    company: "Apex Manufacturing",
    industry: "Manufacturing",
    accent: "#f5a020",
    rating: 5,
  },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/vista-flair", label: "VistaFlair" },
  { href: "/contact", label: "Contact" },
];
