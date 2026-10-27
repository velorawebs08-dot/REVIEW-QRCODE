import React from 'react';
import { getGoogleReviewUrl, getWhatsAppUrl } from '../lib/links';
import { copySynchronously } from '../lib/clipboard';

interface StickyGoogleBarProps {
  isVisible?: boolean;
  hasCopied?: boolean;
  notepadText: string;
  rating?: number;
}

export const StickyGoogleBar: React.FC<StickyGoogleBarProps> = ({
  isVisible = true,
  notepadText,
  rating = 0,
}) => {
  const reviewUrl = getGoogleReviewUrl();
  const issueWhatsAppUrl = getWhatsAppUrl(
    rating > 0
      ? `Hi False Nine, I gave a rating of ${rating} stars and wanted to share my feedback privately.`
      : `Hi False Nine, I had an issue during my visit and wanted to share my feedback privately.`
  );

  // Synchronously ensure notepad text is copied on tap without delaying window opening
  const handleAnchorClick = () => {
    if (notepadText && notepadText.trim()) {
      copySynchronously(notepadText.trim());
    }
  };

  const isLowRating = rating >= 1 && rating <= 3;

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E5E5] px-4 pt-2.5 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-[480px] mx-auto w-full flex flex-col gap-1.5">
        {/* Hint above the bar + WhatsApp link for 1-3 stars */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[#737373] px-0.5 font-normal leading-tight gap-1">
          <span className="truncate">
            Your review is copied. On Google: tap stars, paste, then Post.
          </span>
          {isLowRating && (
            <a
              href={issueWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-[#0A0A0A] font-semibold transition-colors shrink-0 whitespace-nowrap hover:opacity-80"
            >
              Tell us privately on WhatsApp
            </a>
          )}
        </div>

        {/* Direct Google Review Anchor: COPY & OPEN GOOGLE */}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAnchorClick}
          aria-label="Copy review and open Google review box in new tab"
          className="w-full min-h-[48px] px-5 py-3 bg-[#0A0A0A] hover:bg-black/90 text-[#FFFFFF] text-sm font-semibold tracking-wide uppercase font-heading rounded-[2px] flex items-center justify-center gap-1.5 transition-transform active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
        >
          <span>COPY &amp; OPEN GOOGLE &rarr;</span>
        </a>
      </div>
    </div>
  );
};
