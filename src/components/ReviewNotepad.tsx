import React, { useState, useRef, useEffect } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';

interface ReviewNotepadProps {
  text: string;
  onChangeText: (newText: string) => void;
  onClear: () => void;
  onToast: (message: string) => void;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export const ReviewNotepad: React.FC<ReviewNotepadProps> = ({
  text,
  onChangeText,
  onClear,
  onToast,
  containerRef,
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // Automatically grow textarea if text is longer than 4 rows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const scrollHeight = textareaRef.current.scrollHeight;
      textareaRef.current.style.height = `${Math.max(105, scrollHeight)}px`;
    }
  }, [text]);

  const handleCopyReview = async () => {
    if (!text.trim()) {
      onToast('Notepad is empty. Tap ADD on messages below first.');
      return;
    }
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      onToast('Review copied. Paste it on Google.');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section
      ref={containerRef}
      aria-label="Your editable review"
      className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-3.5 sm:p-4 rounded-[2px] transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base sm:text-lg font-bold font-heading uppercase text-[#0A0A0A] tracking-wide">
            YOUR REVIEW
          </h2>
          <span className="text-xs text-[#737373] font-normal">
            Edit as you like
          </span>
        </div>
      </div>

      {/* Textarea (4 rows by default, grows automatically if longer) */}
      <div className="relative">
        <textarea
          ref={textareaRef}
          rows={4}
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Tap ADD on messages below, or write your own review here."
          className="w-full min-h-[105px] p-3 text-[15px] font-sans leading-relaxed text-[#0A0A0A] placeholder:text-[#737373] placeholder:text-sm bg-[#FFFFFF] border border-[#0A0A0A] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-black overflow-hidden resize-none transition-[height] duration-150"
        />
      </div>

      {/* Footer info & Actions */}
      <div className="flex items-center justify-between gap-2 pt-2">
        {/* Live character count */}
        <span className="text-xs text-[#737373] font-mono tabular-nums">
          {text.length} {text.length === 1 ? 'character' : 'characters'}
        </span>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          {text.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              className="text-xs text-[#737373] hover:text-[#0A0A0A] underline underline-offset-2 transition-colors inline-flex items-center gap-1 py-1 cursor-pointer"
            >
              <Trash2 className="w-3 h-3" aria-hidden="true" />
              <span>CLEAR</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyReview}
            aria-label="Copy review notepad text"
            className="min-h-[38px] px-3.5 py-1.5 bg-[#0A0A0A] hover:bg-black/85 text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider font-heading rounded-[2px] inline-flex items-center gap-1.5 transition-transform active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 cursor-pointer"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                <span>COPIED ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>COPY REVIEW</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
