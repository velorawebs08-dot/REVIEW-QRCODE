import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Copy } from 'lucide-react';
import { copyToClipboard } from '../lib/clipboard';

interface MessageCardProps {
  message: string;
  isCopied: boolean;
  onCopySuccess: (text: string) => void;
  index: number;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isCopied,
  onCopySuccess,
  index,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const [copyFailed, setCopyFailed] = useState(false);

  const handleCopy = async () => {
    const success = await copyToClipboard(message);
    if (success) {
      setCopyFailed(false);
      onCopySuccess(message);
    } else {
      setCopyFailed(true);
      onCopySuccess(message);
    }
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.04 }}
      className={`relative p-4 rounded-[2px] transition-all duration-150 ${
        isCopied
          ? 'bg-[#FFFFFF] border-2 border-[#0A0A0A]'
          : 'bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#737373]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Review text */}
        <p className="text-[15px] leading-snug text-[#0A0A0A] line-clamp-2 font-normal flex-1">
          &ldquo;{message}&rdquo;
        </p>

        {/* Action Button */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCopy}
            aria-label={isCopied ? "Message copied" : `Copy review: ${message}`}
            className={`min-h-[44px] min-w-[104px] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[2px] inline-flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 active:scale-[0.98] ${
                isCopied
                  ? 'bg-[#0A0A0A] text-[#FFFFFF]'
                  : 'bg-[#0A0A0A] text-[#FFFFFF] hover:bg-black/85'
              }`}
          >
            {isCopied ? (
              <>
                <Check className="w-3.5 h-3.5" aria-hidden="true" />
                <span>COPIED ✓</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                <span>COPY</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Fallback box if browser clipboard was blocked */}
      {copyFailed && (
        <div className="mt-3 p-2.5 bg-[#F5F5F4] border border-[#E5E5E5] text-xs text-[#0A0A0A] rounded-[2px]">
          <p className="font-semibold mb-1 text-[#737373]">
            Automatic copy blocked by browser. Long-press to copy:
          </p>
          <div className="select-all p-2 bg-[#FFFFFF] border border-[#0A0A0A] font-mono text-xs">
            {message}
          </div>
        </div>
      )}
    </motion.div>
  );
};
