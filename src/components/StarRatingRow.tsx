import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Star, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/links';

interface StarRatingRowProps {
  rating: number; // 0 = none selected, 1-5 = selected
  onRatingChange: (rating: number) => void;
}

const RATING_LABELS: Record<number, string> = {
  5: 'Excellent',
  4: 'Very good',
  3: 'Good',
  2: 'Could be better',
  1: 'Poor',
};

export const StarRatingRow: React.FC<StarRatingRowProps> = ({
  rating,
  onRatingChange,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const issueWhatsAppUrl = getWhatsAppUrl(
    rating > 0
      ? `Hi False Nine, I gave a rating of ${rating} stars and wanted to share my feedback privately.`
      : `Hi False Nine, I had an issue during my visit and wanted to share my feedback privately.`
  );

  const handleStarClick = (starValue: number) => {
    // Tapping the same star again clears the rating
    if (rating === starValue) {
      onRatingChange(0);
    } else {
      onRatingChange(starValue);
    }
  };

  const isLowRating = rating >= 1 && rating <= 3;

  return (
    <div
      aria-label="Experience rating"
      className="w-full flex flex-col items-center text-center py-1"
    >
      {/* Title only (no border box) */}
      <span className="text-xs uppercase font-bold tracking-wider text-[#0A0A0A] font-heading">
        TAP YOUR RATING
      </span>

      {/* 5 Stars Row (36px stars with 8px gaps) */}
      <div
        className="flex items-center justify-center gap-2 mt-1.5 mb-1"
        role="radiogroup"
        aria-label="Rating in stars"
      >
        {[1, 2, 3, 4, 5].map((starValue) => {
          const isFilled = rating > 0 && starValue <= rating;
          return (
            <motion.button
              key={starValue}
              type="button"
              role="radio"
              aria-checked={rating === starValue}
              aria-label={`${starValue} star${starValue > 1 ? 's' : ''}${
                RATING_LABELS[starValue] ? ` - ${RATING_LABELS[starValue]}` : ''
              }`}
              onClick={() => handleStarClick(starValue)}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
              transition={{ type: 'spring', stiffness: 500, damping: 22 }}
              className="p-1 flex items-center justify-center rounded-[2px] cursor-pointer select-none focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
            >
              <Star
                className={`w-[36px] h-[36px] transition-colors ${
                  isFilled
                    ? 'fill-[#0A0A0A] stroke-[#0A0A0A] text-[#0A0A0A]'
                    : 'fill-[#FFFFFF] stroke-[#0A0A0A] text-[#0A0A0A] stroke-[2]'
                }`}
                aria-hidden="true"
              />
            </motion.button>
          );
        })}
      </div>

      {/* Word label and Google note: ONLY shown AFTER a star is tapped */}
      {rating > 0 && (
        <div className="flex flex-col items-center mt-0.5">
          <span className="text-sm font-semibold tracking-wide uppercase text-[#0A0A0A] font-heading">
            {RATING_LABELS[rating]}
          </span>
          <span className="text-[11px] text-[#737373] mt-0.5">
            Choose the same stars on Google.
          </span>
        </div>
      )}

      {/* Show ONLY for 1 to 3 stars */}
      {isLowRating && (
        <div className="mt-2 text-xs text-[#737373] flex items-center justify-center gap-1">
          <span>Had an issue?</span>
          <a
            href={issueWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#0A0A0A] font-medium underline underline-offset-2 hover:opacity-80 inline-flex items-center gap-1"
          >
            <MessageCircle className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Tell us privately on WhatsApp</span>
          </a>
        </div>
      )}
    </div>
  );
};
