import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Check, Plus } from 'lucide-react';

interface MessageCardProps {
  message: string;
  isAdded: boolean;
  onToggleAdd: (message: string) => void;
  index: number;
}

export const MessageCard: React.FC<MessageCardProps> = ({
  message,
  isAdded,
  onToggleAdd,
  index,
}) => {
  const shouldReduceMotion = useReducedMotion();

  const handleCardClick = () => {
    onToggleAdd(message);
  };

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.18, delay: index * 0.04 }}
      className={`relative p-4 rounded-[2px] transition-all duration-150 ${
        isAdded
          ? 'bg-[#FFFFFF] border-2 border-[#0A0A0A]'
          : 'bg-[#FFFFFF] border border-[#E5E5E5] hover:border-[#737373]'
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Review text */}
        <p className="text-[15px] leading-snug text-[#0A0A0A] line-clamp-2 font-normal flex-1">
          &ldquo;{message}&rdquo;
        </p>

        {/* Action Button: ADD (Plus) or ADDED ✓ (Check) */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={handleCardClick}
            aria-pressed={isAdded}
            aria-label={isAdded ? `Remove review: ${message}` : `Add review: ${message}`}
            className={`min-h-[44px] min-w-[104px] px-4 py-2 text-xs font-semibold uppercase tracking-wider rounded-[2px] inline-flex items-center justify-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2 active:scale-[0.98] cursor-pointer ${
              isAdded
                ? 'bg-[#0A0A0A] text-[#FFFFFF]'
                : 'bg-[#0A0A0A] text-[#FFFFFF] hover:bg-black/85'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                <span>ADDED ✓</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
