/**
 * Centralized offers data for the Student Offers section.
 * Moving the array here keeps the component lean and makes
 * it easier to reuse or test the data separately.
 */
import { logos } from '@/lib/illustrations';
export interface Offer {
  id: number;
  title: string;
  description: string;
  company: string;
  color: string;
  logo: string;
  link?: string;
  secondaryLink?: string;
  tags: string[];
  textColor?: 'light' | 'dark';
}

// Unified header style: light gradient so most logos (dark or colorful)
// pop consistently. Header text will be dark.
export const offers: Offer[] = [
  {
    id: 1,
    title: 'GitHub Student Developer Pack',
    description:
      'Get access to the best developer tools in one place with free access to 80+ tools and services.',
    company: 'GitHub',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.github,
    link: 'https://education.github.com/pack',
    tags: ['Development', 'Cloud', 'CI/CD'],
  },
  {
    id: 2,
    title: 'Google Cloud Credits',
    description:
      '$300 in free credits for Google Cloud Platform to build and deploy applications.',
    company: 'Google Cloud',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.googleCloud,
    link: 'https://cloud.google.com/free',
    tags: ['Cloud', 'Infrastructure', 'AI/ML'],
  },
  {
    id: 3,
    title: 'JetBrains Student License',
    description:
      'Free access to all JetBrains IDEs including IntelliJ IDEA, PyCharm, WebStorm, and more.',
    company: 'JetBrains',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.jetbrains,
    link: 'https://www.jetbrains.com/community/education/',
    tags: ['IDE', 'Development', 'Tools'],
  },
  {
    id: 4,
    title: 'Microsoft Azure for Students',
    description:
      '$100 Azure credit and access to free services. No credit card required!',
    company: 'Microsoft',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.azure,
    link: 'https://azure.microsoft.com/en-us/free/students/',
    tags: ['Cloud', 'Azure', 'AI'],
  },
  {
    id: 5,
    title: 'Figma Education',
    description:
      'Free Figma Professional for students and educators with unlimited files and version history.',
    company: 'Figma',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.figma,
    link: 'https://www.figma.com/education/',
    tags: ['Design', 'UI/UX', 'Collaboration'],
  },
  {
    id: 6,
    title: 'Notion Education',
    description:
      'Get Notion Plus for free as a student with unlimited blocks and file uploads.',
    company: 'Notion',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.notion,
    link: 'https://www.notion.so/product/notion-for-education',
    tags: ['Productivity', 'Notes', 'Organization'],
  },
  {
    id: 7,
    title: 'Canva Pro for Education',
    description:
      'Free Canva Pro with access to premium templates, photos, and design tools.',
    company: 'Canva',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.canva,
    link: 'https://www.canva.com/education/',
    tags: ['Design', 'Graphics', 'Templates'],
  },
  {
    id: 8,
    title: 'AWS Educate',
    description:
      'Free cloud learning resources and AWS credits for students to learn cloud computing.',
    company: 'Amazon',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.aws,
    link: 'https://aws.amazon.com/education/awseducate/',
    tags: ['Cloud', 'AWS', 'Learning'],
  },
  {
    id: 9,
    title: 'Perplexity Pro (1 month)',
    description:
      'Get 1 month of Perplexity Pro for faster, more capable AI responses and advanced features. Requires a college ID (rcciit.org or rcciit.in) to redeem.',
    company: 'Perplexity',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.perplexity,
    link: 'https://plex.it/referrals/LZDCJIN0',
    tags: ['AI', 'Chat', 'Productivity'],
  },
  {
    id: 10,
    title: 'Perplexity Comet Browser (1 month Pro)',
    description:
      'One month of Perplexity Comet Browser Pro for an enhanced web+AI browsing experience. Requires a college ID (rcciit.org or rcciit.in) to redeem.',
    company: 'Perplexity',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.perplexityComet,
    link: 'https://pplx.ai/cse202313427978',
    secondaryLink: 'https://pplx.ai/gdgrccit',
    tags: ['AI', 'Browser', 'Productivity'],
  },
  {
    id: 11,
    title: 'Gemini Pro for Students',
    description:
      'Free access to Gemini Pro for eligible students — advanced AI features for study, coding, and creativity. Verify with your student email to redeem.',
    company: 'Google',
    color: 'from-white to-gray-100',
    textColor: 'dark',
    logo: logos.googleDevelopersLogo,
    link: 'https://gemini.google/students/',
    tags: ['AI', 'Chat', 'Productivity'],
  },
];

export default offers;
