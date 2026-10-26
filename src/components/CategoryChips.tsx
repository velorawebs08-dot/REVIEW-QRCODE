import React from 'react';
import { ReviewCategory } from '../siteData';

interface CategoryChipsProps {
  categories: ReviewCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export const CategoryChips: React.FC<CategoryChipsProps> = ({
  categories,
  activeCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="w-full relative">
      <div
        className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2 px-4 -mx-4 scroll-smooth"
        role="tablist"
        aria-label="Review Categories"
      >
        {categories.map((cat) => {
          const isSelected = cat.id === activeCategoryId;
          return (
            <button
              key={cat.id}
              role="tab"
              aria-selected={isSelected}
              aria-pressed={isSelected}
              onClick={() => onSelectCategory(cat.id)}
              className={`min-h-[44px] px-4 py-2 text-sm font-medium whitespace-nowrap shrink-0 transition-colors duration-150 rounded-[2px] outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2 ${
                isSelected
                  ? 'bg-[#0A0A0A] text-[#FFFFFF] border border-[#0A0A0A]'
                  : 'bg-[#FFFFFF] text-[#0A0A0A] border border-[#0A0A0A] hover:bg-[#F5F5F4]'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </div>
  );
};
