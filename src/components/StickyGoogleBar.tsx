import React from 'react';
import { getGoogleReviewUrl, getWhatsAppUrl } from '../lib/links';
import { copySynchronously } from '../lib/clipboard';

interface StickyGoogleBarProps {
  isVisible?: boolean;
  hasCopied?: boolean;
  notepadText: string;
}

export const StickyGoogleBar: React.FC<StickyGoogleBarProps> = ({
  isVisible = true,
  notepadText,
}) => {
  const reviewUrl = getGoogleReviewUrl();
  const issueWhatsAppUrl = getWhatsAppUrl("Hi False Nine, I had an issue during my visit that I'd like to share directly.");

  // Synchronously ensure notepad text is copied on tap without delaying window opening
  const handleAnchorClick = () => {
    if (notepadText && notepadText.trim()) {
      copySynchronously(notepadText.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E5E5] px-4 pt-2.5 pb-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-[480px] mx-auto w-full flex flex-col gap-1.5">
        {/* Clear instructions for customer on Google */}
        <div className="flex items-center justify-between text-[11px] text-[#737373] px-1 font-normal leading-tight">
          <span>On Google: tap your stars, paste (long-press, Paste), then Post.</span>
          <a
            href={issueWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-[#0A0A0A] transition-colors shrink-0 ml-2"
          >
            Had an issue? Tell us
          </a>
        </div>

        {/* Direct Google Review Anchor */}
        <a
          href={reviewUrl}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleAnchorClick}
          aria-label="Open Google review box directly in new tab"
          className="w-full min-h-[48px] px-5 py-3 bg-[#0A0A0A] hover:bg-black/90 text-[#FFFFFF] text-sm font-semibold tracking-wide uppercase font-heading rounded-[2px] flex items-center justify-center gap-1.5 transition-transform active:scale-[0.99] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
        >
          <span>OPEN GOOGLE REVIEW &rarr;</span>
        </a>
      </div>
    </div>
  );
};
