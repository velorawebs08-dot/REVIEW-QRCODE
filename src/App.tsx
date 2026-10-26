/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { ExternalLink } from 'lucide-react';
import { siteData } from './siteData';
import { fillTemplate } from './lib/fillTemplate';
import { getGoogleReviewUrl } from './lib/links';
import { copySynchronously } from './lib/clipboard';
import { CategoryChips } from './components/CategoryChips';
import { MessageCard } from './components/MessageCard';
import { ReviewNotepad } from './components/ReviewNotepad';
import { StickyGoogleBar } from './components/StickyGoogleBar';
import { ContactButtons } from './components/ContactButtons';
import { Toast } from './components/Toast';

export default function App() {
  // Selected Category ID (remembered in localStorage)
  const [activeCategoryId, setActiveCategoryId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem('fn_review_active_cat');
      if (saved && siteData.reviewMessages.some((c) => c.id === saved)) {
        return saved;
      }
    } catch {
      // Storage unavailable or disabled
    }
    return siteData.reviewMessages[0]?.id || '';
  });

  // State for which message is currently copied
  const [copiedMessageText, setCopiedMessageText] = useState<string | null>(null);
  const [hasCopiedAtLeastOnce, setHasCopiedAtLeastOnce] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable Notepad review draft state
  const [notepadText, setNotepadText] = useState<string>('');
  const [appendToReview, setAppendToReview] = useState<boolean>(false);

  // Sync category changes to localStorage safely
  const handleSelectCategory = (id: string) => {
    setActiveCategoryId(id);
    try {
      localStorage.setItem('fn_review_active_cat', id);
    } catch {
      // Ignore storage errors in strict private browsing modes
    }
  };

  // Find active category messages
  const activeCategory = useMemo(() => {
    return (
      siteData.reviewMessages.find((c) => c.id === activeCategoryId) ||
      siteData.reviewMessages[0]
    );
  }, [activeCategoryId]);

  // Handle successful copy from message cards
  const handleCopySuccess = (text: string) => {
    setCopiedMessageText(text);
    setHasCopiedAtLeastOnce(true);

    if (appendToReview && notepadText.trim().length > 0) {
      const combined = `${notepadText.trim()}\n${text}`;
      setNotepadText(combined);
      copySynchronously(combined);
    } else {
      setNotepadText(text);
    }

    setToastMessage('Copied! Now open Google and paste.');
  };

  const googleReviewDirectUrl = getGoogleReviewUrl();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#0A0A0A] selection:text-[#FFFFFF]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Centered Content (Max width 480px, perfect at 360px without horizontal scroll) */}
      <main className="w-full max-w-[480px] mx-auto px-4 pt-6 pb-28 sm:pb-32 flex flex-col gap-5">
        {/* 1. Header */}
        <header className="flex flex-col items-center text-center pt-2 pb-1">
          {/* Logo */}
          <div className="mb-3.5 flex items-center justify-center">
            <img
              src={siteData.business.logo}
              alt={`${siteData.business.name} Logo`}
              referrerPolicy="no-referrer"
              loading="eager"
              decoding="async"
              className="h-24 w-auto object-contain transition-transform hover:scale-105 duration-200"
              onError={(e) => {
                // Graceful fallback if image network fails
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
          </div>

          {/* Business Name */}
          <span className="text-xs uppercase font-bold tracking-widest text-[#737373] font-heading">
            {siteData.business.name}
          </span>

          {/* Heading */}
          <h1 className="text-2xl sm:text-[28px] font-bold font-heading tracking-wide uppercase text-[#0A0A0A] mt-1 leading-tight">
            HOW WAS YOUR EXPERIENCE?
          </h1>

          {/* Subtitle / instruction */}
          <p className="text-xs sm:text-[13px] text-[#737373] mt-1 font-normal max-w-[340px]">
            Tap <strong className="text-[#0A0A0A] font-semibold">COPY</strong> on a message that matches your visit.
          </p>
        </header>

        {/* 2. Editable Review Notepad Box (Placed on the upper side above review options) */}
        <ReviewNotepad
          text={notepadText}
          onChangeText={(newText) => {
            setNotepadText(newText);
            if (newText.trim().length > 0) {
              setHasCopiedAtLeastOnce(true);
            }
          }}
          onClear={() => {
            setNotepadText('');
            setCopiedMessageText(null);
            setToastMessage('Review draft cleared.');
          }}
          appendToReview={appendToReview}
          onToggleAppend={setAppendToReview}
          onToast={(msg) => setToastMessage(msg)}
        />

        {/* 3. Category Chips (Where all review options names are present) */}
        <section aria-label="Review Categories" className="w-full">
          <CategoryChips
            categories={siteData.reviewMessages}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {/* 4. Message Cards (4 per category) */}
        <section
          aria-label="Pre-written review templates"
          className="flex flex-col gap-2.5 w-full"
        >
          {activeCategory?.messages.map((rawMessage, index) => {
            const formattedMessage = fillTemplate(rawMessage);
            const isCopied = copiedMessageText === formattedMessage;

            return (
              <MessageCard
                key={`${activeCategory.id}-${index}`}
                index={index}
                message={formattedMessage}
                isCopied={isCopied}
                onCopySuccess={handleCopySuccess}
              />
            );
          })}
        </section>

        {/* 5. Link: Prefer to write your own? */}
        <div className="text-center pt-1 pb-1">
          <a
            href={googleReviewDirectUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => {
              if (notepadText && notepadText.trim()) {
                copySynchronously(notepadText.trim());
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs text-[#737373] hover:text-[#0A0A0A] underline underline-offset-4 font-medium transition-colors p-2"
          >
            <span>Prefer to write your own review?</span>
            <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        {/* 6. Stay Connected & Contact Buttons */}
        <ContactButtons />

        {/* 7. Footer Notes & Policies */}
        <footer className="mt-4 pt-4 border-t border-[#E5E5E5] text-center flex flex-col items-center gap-2">
          <p className="text-[11px] leading-relaxed text-[#737373] max-w-[360px]">
            Pick only what matches your experience. Honest reviews help everyone.
          </p>

          {siteData.poweredBy.show && (
            <div className="text-[10px] text-[#737373] tracking-wide">
              {siteData.poweredBy.text}
            </div>
          )}
        </footer>
      </main>

      {/* Sticky Bottom Bar (Always visible for everyone) */}
      <StickyGoogleBar
        isVisible={true}
        hasCopied={Boolean(copiedMessageText || notepadText.trim().length > 0)}
        notepadText={notepadText}
      />
    </div>
  );
}
