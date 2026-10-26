import React, { useRef, useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';

export const PhotoTipCard: React.FC = () => {
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    return () => {
      if (photoPreview && photoPreview.startsWith('blob:')) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }

    const localUrl = URL.createObjectURL(file);
    setPhotoPreview(localUrl);
  };

  const handleClearPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (photoPreview && photoPreview.startsWith('blob:')) {
      URL.revokeObjectURL(photoPreview);
    }
    setPhotoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 rounded-[2px] flex items-center justify-between gap-3">
      {/* Hidden native camera capture input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
        aria-hidden="true"
      />

      {/* Left: [camera icon] "Add a photo (optional)" */}
      <div className="flex items-center gap-2 text-xs font-medium text-[#0A0A0A]">
        <Camera className="w-4 h-4 text-[#0A0A0A] shrink-0" aria-hidden="true" />
        <span>Add a photo (optional)</span>
      </div>

      {/* Right: small "Take photo" text button OR 40px thumbnail with X */}
      <div className="flex items-center shrink-0">
        {!photoPreview ? (
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] font-heading underline underline-offset-2 hover:opacity-80 py-1 px-1 cursor-pointer"
          >
            Take photo
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src={photoPreview}
              alt="Photo preview"
              className="w-10 h-10 object-cover border border-[#0A0A0A] rounded-[2px]"
            />
            <button
              type="button"
              onClick={handleClearPhoto}
              aria-label="Remove photo"
              className="p-1 text-[#737373] hover:text-[#0A0A0A] transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
