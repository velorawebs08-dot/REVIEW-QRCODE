import React, { useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Check, X } from 'lucide-react';

interface ToastProps {
  message: string | null;
  onClose: () => void;
  duration?: number;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onClose,
  duration = 3500,
}) => {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -16, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className="fixed top-4 left-4 right-4 z-50 flex justify-center pointer-events-none"
        >
          <div
            role="status"
            aria-live="polite"
            className="pointer-events-auto max-w-[420px] w-full bg-[#0A0A0A] text-[#FFFFFF] border border-[#0A0A0A] px-4 py-3 rounded-[2px] shadow-lg flex items-center justify-between gap-3 text-sm font-medium"
          >
            <div className="flex items-center gap-2.5">
              <span className="p-1 bg-[#FFFFFF] text-[#0A0A0A] rounded-[2px] flex items-center justify-center shrink-0">
                <Check className="w-3.5 h-3.5 stroke-[2.5]" aria-hidden="true" />
              </span>
              <span className="text-xs sm:text-sm font-medium">{message}</span>
            </div>
            <button
              onClick={onClose}
              type="button"
              aria-label="Dismiss notification"
              className="p-1 text-[#737373] hover:text-[#FFFFFF] transition-colors rounded-[2px] focus-visible:ring-1 focus-visible:ring-white"
            >
              <X className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
