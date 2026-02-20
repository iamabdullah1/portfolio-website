export const myProjects = [
    {
    id: 1,
    title: "Personal AI Chatbot (RAG)",
    description:
      "An AI-powered personal assistant using Retrieval-Augmented Generation (RAG) to answer questions about me.",
    subDescription: [
      "Built a production-ready AI chatbot using Retrieval-Augmented Generation (RAG) that answers questions based on real, structured data instead of relying only on generic LLM training.",
      "The system retrieves relevant information from personal or business documents, injects that context into the prompt, and generates accurate, data-backed responses. It can act as a digital AI version of you — answering questions about your background, skills, experience, CV, LinkedIn, or portfolio.",
      "This chatbot is fully customizable and can be adapted for businesses like restaurants (orders, menu queries, complaints), real estate, SaaS, e-commerce, or consultants by simply replacing the knowledge base with their data.",
      "Tech stack: Next.js 14, TypeScript, Tailwind CSS (frontend), Python + FastAPI + LangChain (backend), ChromaDB/Pinecone (vector database), OpenAI GPT-4 — deployed on Vercel with Railway/Render.",
    ],
    href: {
      code: "https://github.com/iamabdullah1/personal-rag-llm-app/tree/main/personal-rag-app",
      live: "https://abdullahllm.vercel.app/"
    },
    logo: "",
    images: ["/assets/projects/llm2.png","/assets/projects/llm1.png"],
    tags: [
      {
        id: 1,
        name: "Python",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
      },
      {
        id: 2,
        name: "FastAPI",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg",
      },
      {
        id: 3,
        name: "LangChain",
        path: "",
      },
      {
        id: 4,
        name: "Pinecone",
        path: "",
      },
      {
        id: 5,
        name: "OpenAI GPT-4",
        path: "",
      },
    {
        id: 6,
        name: "HuggingFace Inference API",
        path: "",
      },
      {
        id: 7,
        name: "Next.js 14",
        path: "/assets/logos/nextjs.svg",
      },
      {
        id: 8,
        name: "TypeScript",
        path: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
      },
      {
        id: 9,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 7,
    title: "Education Consultancy Website",
    description:
      "Provides guidance for students aspiring to study abroad, offering consultancy services for university admissions, visa processes, and international career counseling. The platform connects students with verified consultants and resources to simplify their study abroad journey.",
    subDescription: [
      "Built with React (frontend), Node.js (backend), and Tailwind CSS",
      "Smooth GSAP animations with ScrollTrigger for engaging UI",
      "Role-based authentication & authorization for students, consultants, and admins",
      "Features like appointment booking, document management, and live chat",
      "Admin dashboards to monitor student progress and consultant performance"
    ],
    href: "https://socraticaliconsultants.com/",
    logo: "",
    images: ["/assets/projects/p1.png"],
    tags: [
      {
        id: 1,
        name: "ReactJs",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "GSAP",
        path: "/assets/logos/gsap.png",
      },
      {
        id: 3,
        name: "Node.js",
        path: "/assets/logos/nodejs.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
          {
        id: 5,
        name: "MongoDB",
        path: "/assets/logos/mongodb.svg",
      },
      {
        id: 6,
        name: "Express.js",
        path: "/assets/logos/Express-js.png",
      },
    ],
  },
  {
    id: 2,
    title: "Authentication & Authorization System",
    description:
      "A secure authentication and authorization system using Auth0 for seamless user management.",
    subDescription: [
      "Integrated Auth0 for authentication, supporting OAuth, JWT, and multi-factor authentication.",
      "Implemented role-based access control (RBAC) for fine-grained user permissions.",
      "Developed a React-based frontend with Tailwind CSS for a sleek user experience.",
      "Connected to a secure SQLite database for user data storage.",
    ],
    href: "",
    logo: "",
    images: ["/assets/projects/auth-system.jpg"],
    tags: [
      {
        id: 1,
        name: "Auth0",
        path: "/assets/logos/auth0.svg",
      },
      {
        id: 2,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 3,
        name: "SQLite",
        path: "/assets/logos/sqlite.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 3,
    title: "Management Information System (MIS) for Software Company",
    description:
      "A comprehensive platform for managing employee attendance, payroll, leave, projects, CRM , and complaints in a software company.",
    subDescription: [
      " Attendance tracking, Payroll management, Leave applications, Project and task management, CRM with leads and campaigns, Complaint handling",
"Built with React (frontend), Node.js and Express (backend), MongoDB, and Tailwind CSS",
"Role-based dashboards for Admin and Employee with data visualization and automation",
"Secure authentication with JWT, file uploads, and scheduled tasks for efficiency"
],
    href: "https://github.com/iamabdullah1/Management-Information-Software-MIS",
    logo: "",
    images: ["/assets/projects/1.png","/assets/projects/2.png","/assets/projects/3.png","/assets/projects/4.png","/assets/projects/5.png"],
    tags: [
           {
        id: 1,
        name: "ReactJs",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "GSAP",
        path: "/assets/logos/gsap.png",
      },
      {
        id: 3,
        name: "Node.js",
        path: "/assets/logos/nodejs.png",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
      {
        id: 5,
        name: "MongoDB",
        path: "/assets/logos/mongodb.svg",
      },
      {
        id: 6,
        name: "Express.js",
        path: "/assets/logos/Express-js.png",
      },
    ],
  },
  {
    id: 4,
    title: "Visitor Management System",
    description:
      "Role-based visitor management system built with React.js for organizations to track visitors, manage users, and ensure security through features like pass generation and real-time monitoring.",
    subDescription: [
      "Implements three-tier role-based access control (Admin, Receptionist, Security Guard) for dynamic permissions.",
      "Manages visitor lifecycle including registration with image capture, check-in/out, and historical tracking.",
      "Handles user creation, profile management, role assignment, and password resets.",
      "Generates digital passes with QR codes, templates, expiry, and usage analytics.",
      "Provides advanced reporting with filtering, CSV export, and visual analytics",
      "Configures zones, keys, readers, and IoT devices for access control.",
      "Supports real-time visitor tracking and data synchronization via WebSocket."
    ],
    href: {
      code: "https://github.com/iamabdullah1/Visitor-management-system",
      live: "https://visitor-management-system-nine.vercel.app/login"
    },
    logo: "",
    images: ["/assets/projects/v1.png","/assets/projects/v2.png","/assets/projects/v3.png","/assets/projects/v4.png"],
    tags: [
       {
        id: 1,
        name: "ReactJs",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "GSAP",
        path: "/assets/logos/gsap.png",
      },
   
      {
        id: 3,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 5,
    title: "WordPress Custom Theme",
    description:
      "A fully customizable WordPress theme optimized for performance and SEO.",
    subDescription: [
      "Developed a responsive WordPress theme using HTML5, CSS3, and JavaScript.",
      "Integrated Tailwind CSS for modern styling and UI enhancements.",
      "Optimized SEO and page speed using Vite.js for fast builds.",
      "Implemented custom widgets and plugin compatibility for extended functionality.",
    ],
   
    logo: "",
    image: "/assets/projects/wordpress-theme.jpg",
    tags: [
      {
        id: 1,
        name: "WordPress",
        path: "/assets/logos/wordpress.svg",
      },
      {
        id: 2,
        name: "HTML5",
        path: "/assets/logos/html5.svg",
      },
      {
        id: 3,
        name: "CSS3",
        path: "/assets/logos/css3.svg",
      },
      {
        id: 4,
        name: "Vite.js",
        path: "/assets/logos/vitejs.svg",
      },
    ],
  },
  {
    id: 6,
    title: "Online Learning Platform",
    description:
      "A web application that allows users to enroll in courses, watch video lectures, and take quizzes.",
    subDescription: [
      "Built using Blazor WebAssembly for a seamless SPA experience.",
      "Implemented video streaming with Azure Media Services.",
      "Added a quiz system with dynamic question generation and real-time grading.",
      "Integrated Stripe API for secure payment processing.",
    ],
    href: "",
    logo: "",
    image: "/assets/projects/elearning.jpg",
    tags: [
      {
        id: 1,
        name: "Blazor",
        path: "/assets/logos/blazor.svg",
      },
      {
        id: 2,
        name: "Azure",
        path: "/assets/logos/azure.svg",
      },
      {
        id: 3,
        name: "Stripe",
        path: "/assets/logos/stripe.svg",
      },
      {
        id: 4,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },

];

export const mySocials = [
  {
    name: "WhatsApp",
    href: "",
    icon: "/assets/socials/whatsApp.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/abdullah-akram-a8b213318/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "GitHub",
    href: "https://github.com/iamabdullah1",
    icon: "/assets/logos/github.svg",
  },
];

export const experiences = [
  {
    title: "Frontend Developer",
    job: "Meldin, Lahore",
    date: "2023 - 2024",
    contents: [
      "Developed scalable and responsive UIs using React.js, Tailwind CSS, and modern frontend practices.",
      "Built a fully functional Employee Management Dashboard with protected routes, JWT-based authentication, and Chart.js visualizations for performance tracking.",
      "Integrated REST APIs with frontend components, ensuring smooth and secure data communication.",
      "Enhanced user experience by implementing GSAP animations and ScrollTrigger for interactive interfaces.",
      "Optimized frontend performance, reducing initial load times by ~30% through code splitting and asset optimization.",
    ],
  },
  {
    title: "Full-Stack Developer (MERN)",
    job: "Apexez, Lahore",
    date: "2024 - 2025",
    contents: [
      "Designed and developed RESTful APIs with Node.js and Express.js, enabling robust backend services.",
      "Implemented **role-based authentication and authorization using JWT**, ensuring secure access across different user types.",
      "Designed MongoDB schemas and queries optimized for high-volume transactional data.",
      "Built advanced features such as automated bilty generation, invoice systems, and dynamic form validation for logistics applications.",
      "Collaborated in Agile sprints, fixing backend issues and improving API reliability by ~20%.",
    ],
  },
  {
    title: "Full-Stack Developer (Next.js & MERN)",
    job: "Freeelance & Personal Projects",
    date: "2025 - Present",
    contents: [
       "Specialized in building production-ready web applications with **Next.js, MERN stack, and Tailwind CSS**.",
    "Created interactive portfolios and client projects featuring **3D models with Three.js, Sketchfab integration, and GSAP animations**.",
    "Developed secure, full-stack applications with **API routes, server-side rendering (SSR), dynamic routing, and authentication in Next.js**.",
    "Implemented **real-time features** like chat apps and live dashboards using WebSockets and REST API integrations.",
    "Explored **physics engines (Matter.js)** and **3D interactions** to build immersive web experiences with collision effects and draggable components.",
    "Optimized frontend performance with Next.js features like **Image Optimization, ISR (Incremental Static Regeneration), and code splitting**.",
    "Continuously enhancing technical expertise and contributing to freelance projects with **cutting-edge web technologies and AI-powered integrations**.",
    ],
  },
];


 export const reviews = [
  {
    name: "Emily Johnson",
    username: "@emily_nyc",
    body: "Working with Abdullah was smooth from start to finish. Even though he is based in Pakistan and I’m in New York, he was always available during my working hours. His communication is crystal clear, he’s very cooperative, and he solved every problem with patience. Truly felt like he was part of our in-house team.",
    img: "https://robohash.org/emily",
  },
  {
    name: "Daniel Roberts",
    username: "@dan_aus",
    body: "I was initially concerned about working with someone in a different time zone, but Abdullah made himself available at flexible hours. His cooperative attitude and willingness to adjust made collaboration effortless. The Next.js features he implemented worked flawlessly in production.",
    img: "https://robohash.org/daniel",
  },
  {
    name: "Ayesha Malik",
    username: "@ayesha_dxb",
    body: "Abdullah is very cooperative and has excellent communication skills. Whenever we needed a quick fix or an urgent update, he was available immediately — even late at night. His backend knowledge helped streamline our workflows, saving us hours every week.",
    img: "https://robohash.org/ayesha",
  },
  {
    name: "Jonathan Smith",
    username: "@jon_smith",
    body: "He delivered a clean and secure full-stack solution using MongoDB and Next.js. I especially appreciated that he was available on short notice and didn’t let the time difference slow progress. He’s cooperative, detail-oriented, and easy to collaborate with.",
    img: "https://robohash.org/jonathan",
  },
  {
    name: "Fatima Noor",
    username: "@fatima_pk",
    body: "Abdullah handled our MIS system like a pro. He explained everything in simple terms, was extremely cooperative, and made sure we were comfortable with the technical aspects. What impressed me most was his constant availability — it felt like I could reach him 24/7.",
    img: "https://robohash.org/fatima",
  },
  {
    name: "Lucas Almeida",
    username: "@lucas_br",
    body: "Abdullah’s flexibility and commitment stood out. Despite the 8-hour time difference, he adjusted his schedule to join our standups. He was cooperative, maintained great communication, and kept us updated at every stage. The final product exceeded our expectations.",
    img: "https://robohash.org/lucas",
  },
  {
    name: "Sophie Laurent",
    username: "@sophie_paris",
    body: "It was refreshing to work with someone who not only delivers great code but also understands client needs so well. Abdullah was very cooperative, responded to changes quickly, and even stayed late to help us meet a campaign deadline. Highly recommended!",
    img: "https://robohash.org/sophie",
  },
  {
    name: "Michael Nguyen",
    username: "@mike_tx",
    body: "Excellent communication and strong technical skills. Abdullah implemented Next.js API optimizations and helped integrate third-party services without hiccups. The final product was stable, fast, and scalable.",
    img: "https://robohash.org/michael",
  },
  {
    name: "Priya Sharma",
    username: "@priya_in",
    body: "Built a complex inventory sync and admin panel for our small e-commerce platform. Clean code, thoughtful API design, and solid testing — saved our team weeks of work. Very cooperative and always ready to jump on a call, even late due to time zones.",
    img: "https://robohash.org/priya",
  },
  {
    name: "Yuki Tanaka",
    username: "@yuki_tokyo",
    body: "Provided well-structured APIs, thoughtful error handling, and database indexing that improved query times dramatically. A pleasure to work with from a technical standpoint, and always available despite the Japan–Pakistan time difference.",
    img: "https://robohash.org/yuki",
  }
];
