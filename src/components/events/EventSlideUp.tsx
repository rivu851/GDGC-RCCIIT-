
"use client";
"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useDragControls } from "framer-motion";
import { events, Event } from "@/data/events";
import { Calendar, MapPin, Tag, X, ChevronLeft, ChevronRight, ExternalLink, User } from "lucide-react";
import Image from "next/image";
import { BGPattern } from "../ui/bg-pattern";

interface EventSlideUpProps {
  open: boolean;
  onClose: () => void;
  year?: number;
  title?: string;
  children?: React.ReactNode;
}

const EventSlideUp: React.FC<EventSlideUpProps> = ({ open, onClose, year, title, children }) => {
  const dragControls = useDragControls();
  const panelRef = useRef<HTMLDivElement>(null);
  const lastFocusedRef = useRef<HTMLElement | null>(null);
  const scrollYRef = useRef<number>(0);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Filter events by year and sort by date (newest first)
  const filteredEvents = year 
    ? events
        .filter(event => new Date(event.date).getFullYear() === year)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    : events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // Reset selected event when year changes
  useEffect(() => {
    setSelectedEvent(null);
  }, [year]);

  // Reset image index and loading state when event changes
  useEffect(() => {
    setCurrentImageIndex(0);
    setImageLoading(true);
  }, [selectedEvent]);

  // Reset loading state when image index changes
  useEffect(() => {
    setImageLoading(true);
  }, [currentImageIndex]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // Save existing inline styles to restore later
    const prevOverflow = document.body.style.overflow;
    const prevPosition = document.body.style.position;
    const prevTop = document.body.style.top;
    const prevLeft = document.body.style.left;
    const prevRight = document.body.style.right;
    const prevWidth = document.body.style.width;
    const prevPaddingRight = document.body.style.paddingRight;
    const prevHtmlOverscroll = (document.documentElement.style as any).overscrollBehavior;
    const prevBodyOverscroll = (document.body.style as any).overscrollBehavior;

    // Lock body scroll by fixing position and preserving scroll
    scrollYRef.current = window.scrollY || window.pageYOffset || 0;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden"; // fallback
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
    // Prevent scroll chaining to background
    (document.documentElement.style as any).overscrollBehavior = "none";
    (document.body.style as any).overscrollBehavior = "none";
    // Save focus and move focus into panel
    lastFocusedRef.current = (document.activeElement as HTMLElement) ?? null;
    // Focus the handle button or first focusable within panel when mounted
    const focusIntoPanel = () => {
      const container = panelRef.current;
      if (!container) return;
      const focusables = container.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusables.length > 0) {
        focusables[0].focus();
      } else {
        container.focus();
      }
    };
    // Delay to ensure elements are in DOM
    setTimeout(focusIntoPanel, 0);

    // Trap focus within panel
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const container = panelRef.current;
      if (!container) return;
      if (!container.contains(document.activeElement)) return;
      const focusables = Array.from(
        container.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter(el => !el.hasAttribute('disabled') && el.tabIndex !== -1 && el.offsetParent !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener('keydown', onKeyDown, true);
      // Restore body styles
      document.body.style.overflow = prevOverflow;
      document.body.style.position = prevPosition;
      document.body.style.top = prevTop;
      document.body.style.left = prevLeft;
      document.body.style.right = prevRight;
      document.body.style.width = prevWidth;
      document.body.style.paddingRight = prevPaddingRight;
      (document.documentElement.style as any).overscrollBehavior = prevHtmlOverscroll;
      (document.body.style as any).overscrollBehavior = prevBodyOverscroll;
      // Restore scroll position
      if (typeof scrollYRef.current === 'number') {
        window.scrollTo(0, scrollYRef.current);
      }
      // Restore focus
      if (lastFocusedRef.current) {
        try {
          lastFocusedRef.current.focus();
        } catch {}
      }
    };
  }, [open, onClose]);

  return (
    
    <AnimatePresence>
 
      {open && (
        <motion.div
          className="fixed inset-0 z-9999"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 "
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            ref={panelRef}
            tabIndex={-1}
            className="absolute inset-0 h-full rounded-none shadow-2xl overflow-auto overscroll-contain bg-white backdrop-blur-md"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragElastic={0.25}
            dragMomentum={false}
            dragConstraints={{ top: 0, bottom: 1000 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 0 || info.velocity.y > 800) onClose();
            }}
          >
            {/* Google-colored top accent bar (sticky) */}
            <div className="sticky top-0 z-20 h-0.5 w-full overflow-hidden">
              <motion.div
                className="h-full w-full bg-linear-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]"
                animate={{
                  backgroundPosition: ["200% 0%", "0% 0%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{
                  backgroundSize: "200% 100%",
                }}
              />
            </div>
            <div className="sticky top-1 z-100 px-4 py-1 bg-white/95">
              <div className="mx-auto flex items-center justify-center">
                <button
                  aria-label="Drag to close"
                  onPointerDown={(e) => dragControls.start(e)}
                  className="group relative h-8 w-32 flex items-center justify-center cursor-grab active:cursor-grabbing touch-none select-none gap-1.5 border-0 focus:outline-none focus-visible:ring-0"
                >
                  {/* Google-colored dots as drag handle */}
                  <span className="h-2 w-2 rounded-full bg-[#4285F4] group-hover:scale-110 transition-transform" />
                  <span className="h-2 w-2 rounded-full bg-[#EA4335] group-hover:scale-110 transition-transform" />
                  <span className="h-2 w-2 rounded-full bg-[#FBBC04] group-hover:scale-110 transition-transform" />
                  <span className="h-2 w-2 rounded-full bg-[#34A853] group-hover:scale-110 transition-transform" />
                </button>
              </div>
            </div>
            {/* Content */}
            <div className="relative px-6 pb-8">
              <BGPattern
        variant="grid"
        mask="fade-edges"
        fill="#E0E7FF"
        size={60}
        className="pointer-events-none absolute inset-0 -z-10"
      />
              {/* Header */}
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {title || (year ? `${year} Events` : 'All Events')}
                </h2>
                <p className="text-gray-600">
                  {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'} found
                </p>
              </div>

              {/* Events Grid */}
              {filteredEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredEvents.map((event) => (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={() => setSelectedEvent(event)}
                      className="group cursor-pointer"
                    >
                      {/* Polaroid-style card */}
                      <div className="bg-white rounded-2xl p-4 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1">
                        {/* Image Container */}
                        {event.images && Object.keys(event.images).length > 0 ? (
                          <div className="relative w-full aspect-4/3 mb-4 rounded-xl overflow-hidden bg-linear-to-br from-gray-900 to-gray-800">
                            <Image
                              src={Object.values(event.images)[0]}
                              alt={event.title}
                              fill
                              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Type Badge - floating */}
                            {event.type && (
                              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-gray-800 capitalize shadow-lg border-2 border-gray-200">
                                {event.type}
                              </div>
                            )}
                            {/* Image count indicator */}
                            {Object.keys(event.images).length > 1 && (
                              <div className="absolute bottom-4 right-4 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-xs font-semibold text-white">
                                📸 {Object.keys(event.images).length}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div className="relative w-full aspect-4/3 mb-4 rounded-xl overflow-hidden bg-linear-to-br from-blue-100 via-purple-100 to-pink-100 flex items-center justify-center">
                          <span className="text-6xl"><Image src="https://i.postimg.cc/1zTf5XYw/google-developers-logo-brandlogos-net-dcdpg-512x512.png" alt="Default" fill className="object-cover" /></span>
                            {event.type && (
                              <div className="absolute top-4 right-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-full text-xs font-bold text-gray-800 capitalize shadow-lg">
                                {event.type}
                              </div>
                            )}
                          </div>
                        )}
                        
                        {/* Event Content */}
                        <div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2 leading-tight">
                            {event.title}
                          </h3>
                          
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4 text-blue-500 shrink-0" />
                              <span className="font-medium">{new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                            </div>
                            
                            {event.location && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                                <span className="line-clamp-1">{event.location}</span>
                              </div>
                            )}
                          </div>
                          
                          <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                            {event.summary}
                          </p>
                          
                          <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                            <button className="text-blue-600 font-bold text-sm group-hover:text-blue-700 flex items-center gap-1.5">
                              View Details
                              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {event.speakers && event.speakers.length > 0 && (
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <User className="w-3 h-3" />
                                <span>{event.speakers.length} speaker{event.speakers.length > 1 ? 's' : ''}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <div className="text-7xl mb-6 animate-bounce">📅</div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No events found</h3>
                  <p className="text-gray-600">There are no events for {year || 'this period'}.</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Event Detail Modal */}
          <AnimatePresence>
            {selectedEvent && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-10000 flex items-center justify-center p-4"
                onClick={() => setSelectedEvent(null)}
              >
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                
                <motion.div
                  initial={{ scale: 0.9, y: 20 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.9, y: 20 }}
                  onClick={(e) => e.stopPropagation()}
                  className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden"
                >
                  {/* Close Button */}
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-gray-700" />
                  </button>

                  {/* Scrollable Content */}
                  <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                    {/* Image Carousel - Enhanced */}
                    {selectedEvent.images && Object.keys(selectedEvent.images).length > 0 && (
                      <div className="relative bg-linear-to-br from-blue-50 via-purple-50 to-pink-50">
                        {/* Main Image Container with artistic frame */}
                        <div className="relative w-full">
                          <div className="relative w-full h-[70vh] overflow-hidden bg-linear-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                            {/* Loading Spinner */}
                            {imageLoading && (
                              <div className="absolute inset-0 flex items-center justify-center bg-linear-to-br from-gray-100 to-gray-200 z-10">
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                                  className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full"
                                />
                              </div>
                            )}
                            <Image
                              src={Object.values(selectedEvent.images)[currentImageIndex]}
                              alt={selectedEvent.title}
                              fill
                              sizes="100vw"
                              className="object-contain"
                              onLoad={() => setImageLoading(false)}
                            />
                          </div>
                          
                          {/* Image Navigation - Modern arrows */}
                          {Object.keys(selectedEvent.images).length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex((prev) => 
                                    prev === 0 ? Object.keys(selectedEvent.images!).length - 1 : prev - 1
                                  );
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all transform hover:scale-110 z-10"
                                aria-label="Previous image"
                              >
                                <ChevronLeft className="w-6 h-6 text-gray-800" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setCurrentImageIndex((prev) => 
                                    prev === Object.keys(selectedEvent.images!).length - 1 ? 0 : prev + 1
                                  );
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-2xl transition-all transform hover:scale-110 z-10"
                                aria-label="Next image"
                              >
                                <ChevronRight className="w-6 h-6 text-gray-800" />
                              </button>
                              
                              {/* Image Counter & Indicators */}
                              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
                                <div className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sm font-bold text-gray-800">
                                  {currentImageIndex + 1} / {Object.keys(selectedEvent.images).length}
                                </div>
                                <div className="flex gap-2">
                                  {Object.keys(selectedEvent.images).map((_, index) => (
                                    <button
                                      key={index}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                      }}
                                      className={`h-2.5 rounded-full transition-all ${
                                        index === currentImageIndex 
                                          ? 'w-10 bg-linear-to-r from-blue-500 to-purple-500 shadow-lg' 
                                          : 'w-2.5 bg-white/80 hover:bg-white'
                                      }`}
                                      aria-label={`Go to image ${index + 1}`}
                                    />
                                  ))}
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                       
                     
                      </div>
                    )}

                    {/* Event Details */}
                    <div className="p-8">
                      {/* Title & Type */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <h2 className="text-4xl font-bold text-gray-900">
                          {selectedEvent.title}
                        </h2>
                        {selectedEvent.type && (
                          <span className="px-4 py-2 bg-linear-to-r from-blue-500 to-purple-500 text-white rounded-full text-sm font-semibold capitalize whitespace-nowrap">
                            {selectedEvent.type}
                          </span>
                        )}
                      </div>

                      {/* Meta Information */}
                      <div className="flex flex-wrap gap-6 mb-6 text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-5 h-5 text-blue-500" />
                          <span className="font-medium">
                            {new Date(selectedEvent.date).toLocaleDateString('en-US', { 
                              weekday: 'long',
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        {selectedEvent.location && (
                          <div className="flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-red-500" />
                            <span>{selectedEvent.location}</span>
                          </div>
                        )}
                      </div>

                      {/* Divider */}
                      <div className="h-px bg-linear-to-r from-transparent via-gray-300 to-transparent mb-6" />

                      {/* Summary */}
                      <div className="mb-6">
                        <p className="text-lg text-gray-700 leading-relaxed">
                          {selectedEvent.summary}
                        </p>
                      </div>

                      {/* Description */}
                      {selectedEvent.description && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3">About This Event</h3>
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                            {selectedEvent.description}
                          </p>
                        </div>
                      )}

                      {/* Speakers */}
                      {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <User className="w-5 h-5" />
                            Speakers
                          </h3>
                          <div className="flex flex-wrap gap-3">
                            {selectedEvent.speakers.map((speaker, index) => (
                              <div
                                key={index}
                                className="px-4 py-2 bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-full text-gray-800 font-medium"
                              >
                                {speaker}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {selectedEvent.tags && selectedEvent.tags.length > 0 && (
                        <div className="mb-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Tags
                          </h3>
                          <div className="flex flex-wrap gap-2">
                            {selectedEvent.tags.map((tag, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm text-gray-700 transition-colors"
                              >
                                #{tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* External Link */}
                      {selectedEvent.link && (
                        <div>
                          <a
                            href={selectedEvent.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                          >
                            Learn More
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EventSlideUp;
