import React, { useState } from 'react';
import { Copy, Check, Trash2 } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';

interface ReviewNotepadProps {
  text: string;
  onChangeText: (newText: string) => void;
  onClear: () => void;
  appendToReview: boolean;
  onToggleAppend: (append: boolean) => void;
  onToast: (message: string) => void;
}

export const ReviewNotepad: React.FC<ReviewNotepadProps> = ({
  text,
  onChangeText,
  onClear,
  appendToReview,
  onToggleAppend,
  onToast,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyNotepad = async () => {
    if (!text.trim()) {
      onToast('Notepad is empty. Tap COPY on a message below first.');
      return;
    }
    const success = await copyToClipboard(text);
    if (success) {
      setIsCopied(true);
      onToast('Notepad copied! Now open Google and paste.');
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <section
      aria-label="Your editable review"
      className="w-full bg-[#FFFFFF] border border-[#E5E5E5] p-4 rounded-[2px] transition-all"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 pb-2.5">
        <div className="flex items-baseline gap-2">
          <h2 className="text-base sm:text-lg font-bold font-heading uppercase text-[#0A0A0A] tracking-wide">
            YOUR REVIEW
          </h2>
          <span className="text-xs text-[#737373] font-normal">
            Edit as you like
          </span>
        </div>

        {/* Append vs Replace Toggle */}
        <label
          htmlFor="append-toggle"
          className="inline-flex items-center gap-1.5 cursor-pointer select-none text-xs"
          title="When enabled, copying another message appends to your draft instead of replacing"
        >
          <span className="text-[11px] sm:text-xs text-[#737373] font-medium whitespace-nowrap">
            Add to my review
          </span>
          <div className="relative inline-flex items-center">
            <input
              id="append-toggle"
              type="checkbox"
              checked={appendToReview}
              onChange={(e) => onToggleAppend(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-8 h-4 bg-[#E5E5E5] peer-focus:outline-none rounded-[2px] peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-[1px] after:h-3 after:w-3.5 after:transition-all peer-checked:bg-[#0A0A0A]" />
          </div>
        </label>
      </div>

      {/* Textarea */}
      <div className="relative">
        <textarea
          rows={4}
          value={text}
          onChange={(e) => onChangeText(e.target.value)}
          placeholder="Tap COPY on a message below, or write your own review here."
          className="w-full min-h-[110px] p-3 text-[15px] font-sans leading-relaxed text-[#0A0A0A] placeholder:text-[#737373] placeholder:text-sm bg-[#FFFFFF] border border-[#0A0A0A] rounded-[2px] focus:outline-none focus:ring-1 focus:ring-black resize-y"
        />
      </div>

      {/* Footer info & Actions */}
      <div className="flex items-center justify-between gap-2 pt-2.5">
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
              className="text-xs text-[#737373] hover:text-[#0A0A0A] underline underline-offset-2 transition-colors inline-flex items-center gap-1 py-1"
            >
              <Trash2 className="w-3 h-3" aria-hidden="true" />
              <span>CLEAR</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopyNotepad}
            aria-label="Copy review notepad text"
            className="min-h-[38px] px-3.5 py-1.5 bg-[#0A0A0A] hover:bg-black/85 text-[#FFFFFF] text-xs font-semibold uppercase tracking-wider font-heading rounded-[2px] inline-flex items-center gap-1.5 transition-transform active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-1"
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>COPIED ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>COPY TEXT</span>
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};
