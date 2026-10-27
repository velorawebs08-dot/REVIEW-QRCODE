/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { ExternalLink, Camera } from 'lucide-react';
import { siteData } from './siteData';
import { fillTemplate } from './lib/fillTemplate';
import { getGoogleReviewUrl } from './lib/links';
import { copySynchronously } from './lib/clipboard';
import { joinReviewMessages, formatSingleMessage, getConnectorForIndex } from './lib/joinMessages';
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

  // Selected messages list in tap order (up to 4 messages)
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);

  // Track whether customer edited the notepad text manually
  const [isManuallyEdited, setIsManuallyEdited] = useState<boolean>(false);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Editable Notepad review draft state
  const [notepadText, setNotepadText] = useState<string>('');

  // Ref for the YOUR REVIEW notepad card to check if it is scrolled out of view
  const notepadContainerRef = useRef<HTMLDivElement | null>(null);

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

  // Toggle adding or removing a message (cumulative list, max 4)
  const handleToggleAdd = (message: string) => {
    if (selectedMessages.includes(message)) {
      // Tapping an added card removes only that one
      const nextSelected = selectedMessages.filter((m) => m !== message);
      setSelectedMessages(nextSelected);
      setIsManuallyEdited(false);
      const newParagraph = joinReviewMessages(nextSelected);
      setNotepadText(newParagraph);
      setToastMessage('Removed from review');
    } else {
      // Maximum 4 messages
      if (selectedMessages.length >= 4) {
        setToastMessage('You can add up to 4 messages.');
        return;
      }

      // If customer edited by hand, append with connector to their edited text
      if (isManuallyEdited && notepadText.trim().length > 0) {
        const connector = getConnectorForIndex(selectedMessages.length);
        const formattedNew = formatSingleMessage(
          message,
          connector,
          siteData.business.name,
          siteData.business.city
        );
        const currentTrimmed = notepadText.trim().replace(/[.!?]*$/, '') + '.';
        const combined = `${currentTrimmed} ${formattedNew}`;
        setSelectedMessages((prev) => [...prev, message]);
        setNotepadText(combined);
        setToastMessage('Added to your review');
      } else {
        const nextSelected = [...selectedMessages, message];
        setSelectedMessages(nextSelected);
        setIsManuallyEdited(false);
        const newParagraph = joinReviewMessages(nextSelected);
        setNotepadText(newParagraph);
        setToastMessage('Added to your review');
      }

      // Scroll page up slightly only if the notepad card is scrolled above the visible viewport
      if (notepadContainerRef.current) {
        const rect = notepadContainerRef.current.getBoundingClientRect();
        if (rect.top < 10) {
          notepadContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
  };

  const handleClearNotepad = () => {
    setNotepadText('');
    setSelectedMessages([]);
    setIsManuallyEdited(false);
    setToastMessage('Review cleared.');
  };

  const googleReviewDirectUrl = getGoogleReviewUrl();

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#0A0A0A] flex flex-col justify-between selection:bg-[#0A0A0A] selection:text-[#FFFFFF]">
      {/* Toast Notification */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />

      {/* Main Centered Content:
          1. Header
          2. YOUR REVIEW Notepad
          3. Category Chips
          4. Message Cards
          5. Contact Buttons & Footer
          pb-[148px] ensures a full 56px+ clearance above the fixed bottom bar
      */}
      <main className="w-full max-w-[480px] mx-auto px-4 pt-6 pb-[148px] flex flex-col gap-4">
        {/* 1. Header (Logo + Heading + Small Line) */}
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

          {/* Subtitle / instruction line: Tap ADD */}
          <p className="text-xs sm:text-[13px] text-[#737373] mt-1 font-normal max-w-[340px]">
            Tap <strong className="text-[#0A0A0A] font-semibold">ADD</strong> on messages that match your visit.
          </p>
        </header>

        {/* 2. "YOUR REVIEW" Notepad Card (Placed right under the heading) */}
        <ReviewNotepad
          containerRef={notepadContainerRef}
          text={notepadText}
          onChangeText={(newText) => {
            setNotepadText(newText);
            setIsManuallyEdited(true);
          }}
          onClear={handleClearNotepad}
          onToast={(msg) => setToastMessage(msg)}
        />

        {/* 3. Category Chips */}
        <section aria-label="Review Categories" className="w-full">
          <CategoryChips
            categories={siteData.reviewMessages}
            activeCategoryId={activeCategoryId}
            onSelectCategory={handleSelectCategory}
          />
        </section>

        {/* 4. Message Cards (4 per category) with ADD / ADDED ✓ toggling */}
        <section
          aria-label="Pre-written review templates"
          className="flex flex-col gap-2.5 w-full"
        >
          {activeCategory?.messages.map((rawMessage, index) => {
            const formattedMessage = fillTemplate(rawMessage);
            const isAdded = selectedMessages.includes(formattedMessage);

            return (
              <MessageCard
                key={`${activeCategory.id}-${index}`}
                index={index}
                message={formattedMessage}
                isAdded={isAdded}
                onToggleAdd={handleToggleAdd}
              />
            );
          })}
        </section>

        {/* Optional: Prefer to write your own review? */}
        <div className="text-center pt-0.5 pb-0.5">
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

        {/* Optional: Photo Tip Line */}
        <div className="flex items-center justify-center gap-1.5 text-xs text-[#737373] text-center px-2 py-0.5 leading-normal">
          <Camera className="w-3.5 h-3.5 shrink-0 text-[#737373]" aria-hidden="true" />
          <span>
            Tip: On Google tap &lsquo;Add photos &amp; videos&rsquo; to add a photo of your jersey. Your latest photos appear first.
          </span>
        </div>

        {/* 5. Stay Connected & Contact Buttons */}
        <ContactButtons />

        {/* Footer Notes & Policies */}
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

      {/* Fixed Bottom Bar: COPY & OPEN GOOGLE (Always reachable while scrolling) */}
      <StickyGoogleBar
        isVisible={true}
        hasCopied={selectedMessages.length > 0 || notepadText.trim().length > 0}
        notepadText={notepadText}
      />
    </div>
  );
}
