export type Event = {
  id: string;
  title: string;
  date: string; // ISO date when possible
  originalDate?: string; // if source date was ambiguous
  summary: string;
  description?: string;
  speakers?: string[];
  location?: string;
  type?: 'workshop' | 'study-jam' | 'hackathon' | 'session' | 'showcase' | 'talk' | 'other';
  tags?: string[];
  link?: string;
  images?: {
    [key: string]: string;
  };
};

export const events: Event[] = [
  {
    id: 'pre-event-showcase-2025',
    title: 'ShowcaseX Pre-Event',
    date: '2025-11-30',
    originalDate: '31 Nov 2025 (listed)',
    summary:
      'Online pre-event introducing the key phases of ShowcaseX — Design, Code, and Pitch.',
    description:
      'Join us for the official ShowcaseX Pre-Event, organized by GDG on Campus RCCIIT and RCC TechZ. This online session introduces the key phases of the challenge — Design, Code, and Pitch — and helps participants prepare effectively for ShowcaseX.',
    speakers: [
      // Speaker names were listed online; add actual names here when available
    ],
    location: 'Online',
    type: 'showcase',
    images: {'img1': 'https://i.postimg.cc/HWJsqpnT/1000150775.jpg','img2': 'https://i.postimg.cc/c1K4psCq/1000150828.jpg'},
  },

  {
    id: 'webverse-1-0-2025',
    title: 'Webverse 1.0',
    date: '2025-11-19',
    summary:
      'An interactive, beginner-friendly workshop to learn web fundamentals and discover AI tools and internship pathways.',
    description:
      'Join us for an interactive and beginner-friendly workshop where you’ll learn how the internet works, build your own website, explore AI tools to enhance your workflow, and discover how to find and land tech internships.',
    location: 'Online / Workshop',
    type: 'workshop',
    images: {'img1': 'https://i.postimg.cc/NfmG0pRS/1000150784.jpg','img2': 'https://i.postimg.cc/Vs3L130L/1000150785.jpg','img3': 'https://i.postimg.cc/MZhKxhf6/1000150786.jpg','img4': 'https://i.postimg.cc/1RL5PLV1/1000150792.jpg','img5': 'https://i.postimg.cc/fTmWbBYX/1000150827-jpg.png','img6': 'https://i.postimg.cc/bYKN8KSh/1000150830.jpg'},
  },

  {
    id: 'study-jams-cloud-2025',
    title: 'Study Jams: All About Cloud',
    date: '2025-10-25',
    summary:
      'Hands-on study jam to learn cloud technologies through guided learning and coding challenges.',
    description:
      'A study jam designed to help students learn, build, and innovate through hands-on development and guided learning. The event combines coding challenges, technical sessions, and collaborative study jams to empower participants to explore new technologies, enhance problem-solving skills, and transform ideas into impactful projects — bridging learning with real-world application.',
    location: 'Online / Hybrid',
    type: 'study-jam',
  },

  {
    id: 'hello-world-hacks-2025',
    title: 'Hello World Hacks (Hybrid hackathon)',
    date: '2025-09-09',
    summary: 'A hybrid, month-long hackathon focused on building and learning.',
    description:
      'HelloWorld Hacks is a hybrid, month-long hackathon that brings together students to build projects, collaborate, and learn through hands-on challenges and mentoring.',
    location: 'Hybrid',
    type: 'hackathon',
    images: {'img1': 'https://i.postimg.cc/GhG3pqvk/1000150810.jpg','img2': 'https://i.postimg.cc/m2CZr877/1000150809.jpg','img3': 'https://i.postimg.cc/TYg2PCnV/1000150808.jpg', img4: 'https://i.postimg.cc/WpQbjQqp/1000150807.jpg',img6: 'https://i.postimg.cc/8PMkCtLH/1000150803.jpg',img7: 'https://i.postimg.cc/02D5Nc7B/1000150800.jpg',img8: 'https://i.postimg.cc/jdPqjZy9/1000150799.jpg'},
  },

  {
    id: 'tech-verse-2025',
    title: 'Tech Verse',
    date: '2025-04-09',
    summary:
      'Event recap celebrating the success of TechVerse — talks, highlights and community moments.',
    description:
      'Reliving the magic of TECHVERSE — a day filled with inspiration, innovation, and energy from amazing speakers and enthusiastic attendees. Watch the highlights and enjoy the community vibe. Proudly organized by RCCTechz & GDG on Campus RCCIIT.',
    location: 'RCCIIT / Organized by RCCTechz & GDG',
    type: 'talk',
    images: {img1: 'https://i.postimg.cc/WpQbjQqp/1000150807.jpg'},
  },

  // ---- 2024 & earlier (past events) ----
  {
    id: 'Tech Kotha-2024',
    title: 'Tech-কথা',
    date: '2024-11-18',
    summary:
      'Techকথা is an engaging tech session focused on learning, innovation, and exploration.It’s designed to help students kickstart their journey in the world of technology.',
    description:
      'The session covers DSA vs Development to help you choose the right path, along with Python basics for beginners.This ia an interactive event to learn, connect, and grow in a fun tech-driven environment.',
    speakers: ['Debopam banerjee'],
      type: 'Discussion',
    images: {img1: 'https://i.postimg.cc/wjsHT8b1/tech-kotha.jpg'},
  },


  {
    id: 'github-session-2024',
    title: 'GitHub Session',
    date: '2024-11-10',
    summary:
      'Beginner-friendly session introducing Git and GitHub fundamentals, commits, pull requests, and collaboration workflows.',
    description:
      'A beginner-friendly session aimed at introducing the fundamentals of Git and GitHub, including version control, commits, pull requests, and collaboration workflows. The session helped students build a strong foundation for open-source contributions, teamwork, and project management using GitHub.',
    speakers: ['Anirban Majumder'],
      type: 'session',
    images: {img1: 'https://i.postimg.cc/qB9M0968/1000150867.jpg'},
  },

  {
    id: 'web-dev-hack-your-brain-2024',
    title: 'Web dev - Hack Your Brain',
    date: '2024-10-25',
    summary:
      'Session focusing on problem solving and DSA fundamentals (arrays & strings focused).',
    description:
      'Strengthening problem-solving skills through Data Structures and Algorithms, with a special emphasis on arrays and strings. Speakers simplified core DSA concepts, shared coding strategies, and demonstrated how logical thinking and structured approaches can improve competitive programming and interview performance.',
    type: 'session',
    images: {img1: 'https://i.postimg.cc/NGWfYW2H/1000150868.jpg',img2: 'https://i.postimg.cc/dQztvzZT/1000150869.jpg'},
  },

  {
    id: 'build-with-ai-2024',
    title: 'Build with AI',
    date: '2024-10-17',
    summary:
      'Workshop on Generative AI and chatbot development using Google Gemini.',
    description:
      'Introduced participants to Generative AI, covering chatbot development using Google Gemini and hands-on AI experimentation. The session provided practical exposure to Google\'s GenAI ecosystem and encouraged participants to explore AI-driven solutions through guided examples and study jams.',
    type: 'workshop',
    images: {img1: 'https://i.postimg.cc/Vs3L130r/1000150954.jpg'},
  },

  {
    id: 'path-to-gsoc-2024',
    title: 'Path to Google GSoC',
    date: '2024-09-28',
    summary:
      'Guidance session on Google Summer of Code — proposal writing, open-source contributions, and mentor expectations.',
    description:
      'Designed to guide students through the journey of Google Summer of Code (GSoC). Speaker Soham Banerjee shared insights on open-source contributions, proposal writing, mentor expectations, and preparation strategies.',
    speakers: ['Soham Banerjee'],
    type: 'talk',
    images: {img1: 'https://i.postimg.cc/h4pphXkg/gsoc.jpg'},
  },

  {
    id: 'dev-with-copilot-2024',
    title: 'Dev with Copilot',
    date: '2024-09-26',
    summary:
      'Hands-on session for building real-world apps with CopilotKit and modern AI-assisted workflows.',
    description:
      'A hands-on session focused on building real-world applications using CopilotKit, helping participants understand how AI-assisted development can boost productivity and innovation. Led by Harsh Prakash, the session covered practical implementation strategies and hackathon insights.',
    speakers: ['Harsh Prakash'],
    type: 'workshop',
    images: {img1: 'https://i.postimg.cc/sftDytG2/1000150953.jpg'},
  },
];
