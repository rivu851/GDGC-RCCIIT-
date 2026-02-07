'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Mascot image will be loaded from public/gdg-mascot.png

// Keyword to page URL mapping
const pageMap: { [key: string]: string } = {
  "teams": "/teams",
  "team page": "/teams",
  "team members": "/teams",
  "team": "/teams",
  "members": "/teams",
  "who are in the team": "/teams",
  "show team": "/teams",
  "view team": "/teams",
  "our team": "/teams",
  
  // Event-related redirects intentionally removed to allow the chatbot to
  // provide event-specific details (e.g., ShowCaseX) instead of navigating.
  
  "gallery": "/gallery",
  "photos": "/gallery",
  "pictures": "/gallery",
  "images": "/gallery",
  "event gallery": "/gallery",
  "photo gallery": "/gallery",
  
  "offers": "/explore",
  "explore": "/explore",
  "opportunities": "/explore",
  "study jam": "/studyjam",
  "studyjam": "/studyjam",
  
  "about": "/about",
  "about us": "/about",
  "about gdg": "/about",
  "about page": "/about",
  
  "home": "/",
  "homepage": "/",
  "main page": "/",
};

// Function to detect page keywords in user query
const detectPageRedirect = (query: string): string | null => {
  const lowerQuery = query.toLowerCase();
  // If the user is asking for a link/form/registration, do not redirect
  const linkKeywords = ['form', 'link', 'register', 'registration', 'bevy', 'how to register', 'signup', 'sign up'];
  for (const lk of linkKeywords) {
    if (lowerQuery.includes(lk)) return null;
  }
  // If the user is asking specifically about ShowCaseX or its pre-event, do not redirect
  const eventKeywords = ['showcasex', 'showcasex pre-event', 'showcasex pre event', 'showcase x', 'pre-event', 'pre event'];
  for (const ek of eventKeywords) {
    if (lowerQuery.includes(ek)) return null;
  }
  
  for (const [keyword, url] of Object.entries(pageMap)) {
    if (lowerQuery.includes(keyword)) {
      return url;
    }
  }
  
  return null;
};

// Client-side constants for quick link responses
const PRE_EVENT_BEVY_LINK = 'https://gdg.community.dev/e/mr7zsw/';
const PRE_EVENT_KEYWORDS = ['showcasex pre-event', 'showcasex pre event', 'showcasex preevent', 'pre-event', 'pre event', 'preevent', 'pree-event', 'pree event'];
const JOIN_KEYWORDS = ['join', 'where to join', 'from where', 'how to join', 'bevy', 'bevy link', 'bevyLink', 'register', 'registration'];

const renderMessageContent = (content: string, isUser: boolean) => {
  // Regular expressions to detect URLs and bold text patterns
  const urlRegex = /(https?:\/\/[^\s]+)/g;
  const boldRegex = /\*\*([^*]+)\*\*/g;
  
  // First, protect URLs from being split by bold processing
  const urlPlaceholders: { [key: string]: string } = {};
  let urlIndex = 0;
  let processedContent = content.replace(urlRegex, (url) => {
    const placeholder = `__URL_${urlIndex}__`;
    urlPlaceholders[placeholder] = url;
    urlIndex++;
    return placeholder;
  });

  // Process bold text
  const segments: Array<{ text: string; isBold: boolean; isUrl: boolean }> = [];
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(processedContent)) !== null) {
    // Add text before the bold
    if (match.index > lastIndex) {
      segments.push({
        text: processedContent.substring(lastIndex, match.index),
        isBold: false,
        isUrl: false
      });
    }
    // Add the bold text
    segments.push({
      text: match[1],
      isBold: true,
      isUrl: false
    });
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < processedContent.length) {
    segments.push({
      text: processedContent.substring(lastIndex),
      isBold: false,
      isUrl: false
    });
  }

  // If no bold text was found, add the whole content
  if (segments.length === 0) {
    segments.push({ text: processedContent, isBold: false, isUrl: false });
  }

  // Restore URLs and render
  return segments.map((segment, segIndex) => {
    const urlPattern = /__URL_(\d+)__/g;
    const parts: React.ReactNode[] = [];
    let lastUrlIndex = 0;
    let urlMatch;

    while ((urlMatch = urlPattern.exec(segment.text)) !== null) {
      // Add text before URL
      if (urlMatch.index > lastUrlIndex) {
        const textPart = segment.text.substring(lastUrlIndex, urlMatch.index);
        parts.push(
          segment.isBold ? (
            <strong key={`${segIndex}-${parts.length}`}>{textPart}</strong>
          ) : (
            <span key={`${segIndex}-${parts.length}`}>{textPart}</span>
          )
        );
      }

      // Add URL
      const url = urlPlaceholders[urlMatch[0]];
      parts.push(
        <a
          key={`${segIndex}-${parts.length}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`underline break-all ${
            isUser 
              ? 'hover:text-blue-200' 
              : 'text-[#4285F4] hover:text-[#185ABC] dark:text-[#8AB4F8] dark:hover:text-[#4285F4]'
          }`}
        >
          {url}
        </a>
      );
      lastUrlIndex = urlMatch.index + urlMatch[0].length;
    }

    // Add remaining text
    if (lastUrlIndex < segment.text.length) {
      const textPart = segment.text.substring(lastUrlIndex);
      parts.push(
        segment.isBold ? (
          <strong key={`${segIndex}-${parts.length}`} className="font-semibold">{textPart}</strong>
        ) : (
          <span key={`${segIndex}-${parts.length}`}>{textPart}</span>
        )
      );
    }

    // If no URLs were found in this segment
    if (parts.length === 0) {
      return segment.isBold ? (
        <strong key={segIndex} className="font-semibold">{segment.text}</strong>
      ) : (
        <span key={segIndex}>{segment.text}</span>
      );
    }

    return <span key={segIndex}>{parts}</span>;
  });
};

export default function ChatbotWidget() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I can help you learn about our team members. Ask me anything about our domains, team leads, or specific members!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when user sends a message, but not when answer arrives
  useEffect(() => {
    if (messages.length > 0 && messages[messages.length - 1].role === 'user') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning! ☀️";
    if (hour < 17) return "Hey there! 👋";
    return "Good evening! 🌙";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
      const lowerMsg = userMessage.toLowerCase();

      // If the user asks where to join the ShowCaseX pre-event, return the Bevy link directly
      const isPreEventQuery = PRE_EVENT_KEYWORDS.some(k => lowerMsg.includes(k));
      const isJoinQuery = JOIN_KEYWORDS.some(k => lowerMsg.includes(k));
      if (isPreEventQuery && isJoinQuery) {
        setMessages(prev => [
          ...prev,
          { role: 'user', content: userMessage },
          { role: 'assistant', content: `**ShowCaseX Pre-Event** — Join on Bevy: ${PRE_EVENT_BEVY_LINK} \nRegister there to attend.` }
        ]);
        setInput('');
        return;
      }
    
    // Check if the query matches any page redirect
    const redirectUrl = detectPageRedirect(userMessage);
    if (redirectUrl) {
      setMessages(prev => [
        ...prev, 
        { role: 'user', content: userMessage },
        { role: 'assistant', content: `Sure! Taking you to the ${redirectUrl === '/' ? 'home page' : redirectUrl.replace('/', '') + ' page'}...` }
      ]);
      setInput('');
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push(redirectUrl);
        setIsOpen(false);
      }, 1000);
      return;
    }
    
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Get last 2 messages for context (excluding the current user message)
      const recentMessages = messages.slice(-4); // Last 2 exchanges (4 messages)
      
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          message: userMessage,
          conversationHistory: recentMessages
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const data = await response.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat button - Modern GDG */}
      <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
        {!isOpen && (
          <div className="absolute bottom-full right-0 mb-2 md:mb-4 animate-bounce hidden sm:block">
            <div className="relative bg-white text-gray-800 text-xs md:text-sm font-medium px-3 py-1.5 md:px-4 md:py-2 rounded-2xl shadow-lg border-2 border-gray-100 whitespace-nowrap">
              How may I assist you today?
              <div className="absolute top-full right-6 md:right-8 w-0 h-0 border-l-6 md:border-l-8 border-l-transparent border-r-6 md:border-r-8 border-r-transparent border-t-6 md:border-t-8 border-t-white"></div>
              <div className="absolute top-full right-6 md:right-8 w-0 h-0 border-l-[7px] md:border-l-[9px] border-l-transparent border-r-[7px] md:border-r-[9px] border-r-transparent border-t-[7px] md:border-t-[9px] border-t-gray-100 translate-y-px"></div>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:scale-110 transition-transform duration-200 animate-float"
          aria-label="Open chatbot"
        >
          {isOpen ? (
            <div className="bg-white hover:bg-gray-50 rounded-full p-2 shadow-2xl border-2 border-gray-100">
              <X size={20} className="text-gray-700 md:w-6 md:h-6" />
            </div>
          ) : (
            <img src="/widget.jpg" alt="Chatbot" className="w-20 h-20 md:w-32 md:h-32 object-contain drop-shadow-2xl hover:drop-shadow-[0_20px_35px_rgba(0,0,0,0.35)]" />
          )}
        </button>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 md:bottom-24 md:right-6 z-50 w-96 h-128 bg-white rounded-lg shadow-2xl flex flex-col border border-gray-200 max-md:inset-0 max-md:w-full max-md:h-dvh max-md:rounded-none max-md:bottom-auto max-md:flex max-md:flex-col">
          {/* Header - Modern GDG Design */}
          <div className="bg-white border-b-2 border-[#4285F4] p-4 max-md:p-3 max-md:shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-100 overflow-hidden">
                  <img src="/widget.jpg" alt="GDG mascot" className="w-9 h-9 object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-900">Giddy</h3>
                  <p className="text-xs text-gray-500">{getGreeting()} I'm here to help!</p>
                </div>
              </div>
              {/* Close button for mobile */}
              <button
                onClick={() => setIsOpen(false)}
                className="md:hidden text-gray-600 hover:bg-gray-100 rounded-full p-2 max-md:text-gray-900"
                aria-label="Close chatbot"
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pt-0 max-md:bg-white max-md:p-3 max-md:pt-3 max-md:pb-2 max-md:space-y-3 max-md:min-h-0">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3.5 ${
                    message.role === 'user'
                      ? 'bg-[#4285F4] text-white shadow-lg shadow-[#4285F4]/20'
                      : 'bg-white text-gray-900 border-2 border-gray-100 shadow-sm max-md:bg-white'
                  }`}
                >
                  {message.role === 'assistant' && (
                    <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100">
                      <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <img src="/widget.jpg" alt="GDG mascot" className="w-4 h-4 object-cover" />
                      </div>
                      <span className="text-xs font-semibold text-gray-600">Giddy</span>
                    </div>
                  )}
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{renderMessageContent(message.content, message.role === 'user')}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white rounded-2xl p-3.5 border-2 border-gray-100 shadow-sm max-md:bg-white">
                  <div className="flex items-center gap-2">
                    <Loader2 className="animate-spin text-[#4285F4]" size={18} />
                    <span className="text-xs text-gray-500">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 bg-gray-50 border-t-2 border-gray-200 max-md:bg-white max-md:border-gray-200 max-md:shrink-0 max-md:p-3">
            <div className="flex gap-2 items-center bg-white rounded-full p-1.5 shadow-sm border-2 border-gray-100">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about the team..."
                className="flex-1 px-4 py-2.5 bg-transparent focus:outline-none text-gray-900 placeholder:text-gray-400 max-md:py-2"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="bg-[#4285F4] hover:bg-[#185ABC] text-white p-2.5 rounded-full disabled:opacity-50 disabled:cursor-not-allowed shadow-md shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
          
          </form>
        </div>
      )}
    </>
  );
}
