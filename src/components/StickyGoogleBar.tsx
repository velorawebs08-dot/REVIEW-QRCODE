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
  const issueWhatsAppUrl = getWhatsAppUrl(
    "Hi False Nine, I had an issue during my visit and wanted to tell you privately."
  );

  // Synchronously ensure notepad text is copied on tap without delaying window opening
  const handleAnchorClick = () => {
    if (notepadText && notepadText.trim()) {
      copySynchronously(notepadText.trim());
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#FFFFFF]/95 backdrop-blur-md border-t border-[#E5E5E5] px-4 pt-2.5 pb-3 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
      <div className="max-w-[480px] mx-auto w-full flex flex-col gap-1.5">
        {/* Step line: Step 1 reads "On Google, tap your stars" (no star icons, no number). Steps 2 and 3: paste the review, tap Post */}
        <div className="text-center text-[11px] text-[#737373] px-0.5 font-normal leading-tight">
          <span>On Google, tap your stars &middot; paste the review &middot; tap Post</span>
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

        {/* Small gray text link under COPY & OPEN GOOGLE button, always visible */}
        <div className="text-center">
          <a
            href={issueWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#737373] hover:text-[#0A0A0A] underline underline-offset-2 transition-colors inline-block py-0.5"
          >
            Had an issue? Tell us privately on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
