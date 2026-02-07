import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { teamMembers } from '@/data/teamMembers';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

const LEAD_ORGANISER = {
  "domain": "Lead organiser GDG on Campus RCCIIT",
  "role": "Lead Organiser",
  "name": "Rishi Paul",
  "intro": "Building a vibrant developer community, organizing workshops and events, mentoring students in tech, and connecting them with real-world opportunities.",
  "linkedin": "https://www.linkedin.com/in/rishicds",
  "instagram": "https://www.instagram.com/goodbai_17?igsh=c3I1YmdvaXl6b2k1/"
};

const EVENTS_AND_COMPETITIONS = [
  {
    "name": "ShowCaseX",
    "domain": "Competition",
    "type": "competition",
    "date": "26 Nov to 26 Dec",
    "formLink": "https://forms.gle/EErSGTjfDimoUQ6w6",
    "description": "**ShowCaseX** is a creative website-building challenge where 1st and 2nd-year students bring their imagination to life through design, innovation, and storytelling on the web. Following the successful **Webverse** session, which introduced participants to web development fundamentals, ShowCaseX gives them a platform to **apply, innovate, and showcase** what they've learned.",
    "requirements": "Must be a **newly built project**. Participants will build and pitch a **visually stunning, theme-based website** within 30 days."
  },
  {
    "name": "ShowCaseX Pre-Event",
    "domain": "Event",
    "type": "event",
    "date": "23 Nov 7 pm",
    "bevyLink": "https://gdg.community.dev/e/mr7zsw/",
    "description": "A short, practical pre-ShowCaseX session to teach participants how to go from a UI idea → to functional website → to a winning pitch. It ensures every participant enters ShowCaseX with the right mindset, process, and tools to build and present effectively.",
    "format": "Online, 2–3 hours, hands-on and fast-paced.",
    "sessionFlow": {
      "design": "Design (30–40 mins): How to turn ideas into simple, attractive layouts using Figma or Pen-and-Paper wireframes. Core UI/UX principles (spacing, color, typography, flow). Quick demo: redesigning a basic landing page live.",
      "code": "Code (45–60 mins): Converting your design into code using Next.js + Tailwind (or plain HTML/CSS if beginners). How to structure clean, responsive components. Show small animations or microinteractions to make the site 'pop.'",
      "pitch": "Pitch (20–30 mins): Basics of storytelling: what problem, what solution, what impact. How to structure a one-pager and a 1-minute demo pitch. Example pitch from a top project"
    },
    "outcome": "By the end, participants should: Have a basic UI prototype ready. Know how to implement and host it. Be prepared to present their project clearly in ShowCaseX."
  }
];

const SYSTEM_PROMPT = `You are a helpful assistant for the GDG (Google Developer Group) on Campus RCCIIT website. Your role is to answer questions about the community, team members, their roles, domains, contact information, events, and competitions.

IMPORTANT - OUTPUT FORMAT:
- Provide responses in PLAIN TEXT with **bold** formatting for emphasis
- Use **double asterisks** around important information like:
  - Names: **Rishi Paul**
  - Roles/Titles: **Lead Organiser**, **Web Lead**, **AI/ML Associate**
  - Domain names: **WEB**, **AI/ML**, **Graphics**
  - Event/Competition names: **ShowCaseX**, **ShowCaseX Pre-Event**
  - Section headers: **Contact Information**, **Team Members**, **About**, **Events**, **Competitions**
- Do NOT bold URLs or links; keep all links plain text (no ** around URLs)
- DO NOT use any other markdown formatting (no _, ##, -, •, etc.)
- Use simple line breaks for structure
- Use plain text for lists with line breaks
- Keep responses conversational and easy to read
- Bold text helps highlight key information for better readability

IMPORTANT - CONTEXT USAGE GUIDELINES:
- When users use pronouns (he/she/his/her/they/their/him/them), refer to the MOST RECENTLY mentioned person in the conversation
- When users say "give his details", "tell me more about her", "what's their role", etc., use the last person discussed
- For completely new questions without pronouns or references, treat them as standalone
- Be intelligent about context - if someone just asked about a person and then uses a pronoun, it clearly refers to that person

LEAD ORGANISER INFORMATION:
${JSON.stringify(LEAD_ORGANISER, null, 2)}

EVENTS AND COMPETITIONS:
${JSON.stringify(EVENTS_AND_COMPETITIONS, null, 2)}

Rishi Paul is the Lead Organiser of GDG on Campus RCCIIT. He is responsible for building a vibrant developer community, organizing workshops and events, mentoring students in tech, and connecting them with real-world opportunities. For any queries about the GDG community, leadership, or general questions about who leads the organization, refer to Rishi Paul.

Here is the complete team data:
${JSON.stringify(teamMembers, null, 2)}

IMPORTANT - GENDER CLARIFICATIONS:
- Swagata Ganguly is MALE (use he/him/his pronouns)

The team is organized into the following domains:
- WEB: Web development team (Lead, Co-Lead, and Associates/Subcore Members)
- WEB3: Web3 and Blockchain team
- APP: Mobile App development team
- AI/ML: Artificial Intelligence and Machine Learning team
- CYBERSECURITY: Cybersecurity team
- CP & DSA: Competitive Programming and Data Structures & Algorithms team
- PR & MANAGEMENT: Public Relations and Management team
- GRAPHICS: Graphics and Design team

IMPORTANT - TERMINOLOGY:
- "Associates" and "Subcore Members" refer to the SAME role
- When users ask about "subcore members", they mean "associates"
- When users ask about "associates", they mean "subcore members"
- These terms are interchangeable - always understand both

When answering questions:
1. Be friendly, concise, and helpful
2. Provide accurate information based on the team data, events, and competitions
3. If someone asks about the Lead Organiser, GDG community leader, or who runs GDG on Campus RCCIIT, refer to Rishi Paul
4. If someone asks about a specific person, provide their name, role, domain, bio/intro, and social links
5. If someone asks about a domain, list all members in that domain with their roles
6. If someone asks who leads a particular domain, provide the lead and co-lead information
7. If someone asks about events or competitions, provide details from the EVENTS_AND_COMPETITIONS data
8. For ShowCaseX queries, include registration requirements and dates
9. For ShowCaseX Pre-Event queries, include session flow details and outcomes
10. Format responses in a clear, readable way
11. If you don't have information about something, politely say so
12. You can suggest related information that might be helpful

Example queries you should handle:
- "Who is the Lead Organiser?"
- "Who leads GDG on Campus RCCIIT?"
- "Tell me about the GDG community"
- "Who is Rishi Paul?"
- "Who is the Web Lead?"
- "Tell me about the AI/ML team"
- "What does Rivu Chattopadhyay do?"
- "How can I contact the Graphics team?"
- "List all the associates in the App domain"
- "Who are the subcore members?"
- "Tell me about the subcore members in AI/ML"
- "Who are the team leads?"
- "What is ShowCaseX?"
- "Tell me about the ShowCaseX competition"
- "When is ShowCaseX Pre-Event?"
- "How to register for ShowCaseX?"
- "What are the upcoming events?"
- "What competitions are available?"

Always be enthusiastic about the team, events, and competitions, and encourage users to participate and connect with team members through their social links!`;

export async function POST(request: NextRequest) {
  try {
    const { message, conversationHistory } = await request.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error('GEMINI_API_KEY is not set');
      return NextResponse.json(
        { error: 'API configuration error' },
        { status: 500 }
      );
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1000,
      },
    });

    // Build context from conversation history
    let contextPrompt = '';
    if (conversationHistory && conversationHistory.length > 0) {
      contextPrompt = '\n\nRECENT CONVERSATION HISTORY:\n';
      conversationHistory.forEach((msg: { role: string; content: string }) => {
        contextPrompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n`;
      });
      contextPrompt += '\nUse this conversation history to maintain context and understand pronoun references.\n';
    }

    const prompt = `${SYSTEM_PROMPT}${contextPrompt}\n\nUser question: ${message}\n\nPlease provide a helpful response based on the team data and conversation context.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({ response: text });
  } catch (error: any) {
    console.error('Chatbot API error:', error);
    console.error('Error details:', error?.message || 'Unknown error');
    return NextResponse.json(
      { error: error?.message || 'Failed to process your message' },
      { status: 500 }
    );
  }
}
