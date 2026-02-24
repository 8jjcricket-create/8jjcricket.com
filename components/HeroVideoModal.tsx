"use client";

import { useEffect } from "react";
import IconButton from "./ui/IconButton";
import { X } from "lucide-react";

interface HeroVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl: string;
  latestEvent?: any;
}

export default function HeroVideoModal({
  isOpen,
  onClose,
  videoUrl,
  latestEvent,
}: HeroVideoModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
    >
      <div
        className="relative w-full max-w-5xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <IconButton
          onClick={onClose}
          ariaLabel="Close"
          className="absolute right-4 top-4 z-50 hover:bg-red-600 hover:scale-110 active:scale-95"
          size="md"
          icon={<X size={24} />}
        />

        {/* Main Content */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl border-4 border-india-gold/30 bg-black">
          {latestEvent ? (
            <a
              href={`/news/${latestEvent.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-0 block group/event"
            >
              <img
                src={latestEvent.image_url}
                alt={latestEvent.title}
                className="h-full w-full object-contain sm:object-cover transition-transform duration-500 group-hover/event:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover/event:bg-black/0 transition-colors" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
                <h2 className="text-xl md:text-2xl font-bold text-india-gold line-clamp-2">
                  {latestEvent.title}
                </h2>
                <span className="mt-2 inline-block text-sm font-semibold text-white/80 group-hover/event:text-white transition-colors">
                  Click to read more →
                </span>
              </div>
            </a>
          ) : (
            <video
              src={videoUrl}
              autoPlay
              loop
              muted={false}
              playsInline
              controls
              className="absolute inset-0 h-full w-full object-contain sm:object-cover"
            />
          )}
          
          {/* Animated Background Pattern (behind video) */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(251,191,36,0.1),transparent_50%)]" />
          </div>
        </div>
      </div>
    </div>
  );
}
