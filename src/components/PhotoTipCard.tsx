import React, { useRef, useState, useEffect } from 'react';
import { Camera, X } from 'lucide-react';

interface SelectedPhoto {
  id: string;
  url: string;
}

export const PhotoTipCard: React.FC = () => {
  const [photos, setPhotos] = useState<SelectedPhoto[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      photos.forEach((p) => {
        if (p.url.startsWith('blob:')) {
          URL.revokeObjectURL(p.url);
        }
      });
    };
  }, [photos]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const availableSlots = 5 - photos.length;
    if (availableSlots <= 0) return;

    const newFiles = Array.from(files).slice(0, availableSlots);
    const newPhotos: SelectedPhoto[] = newFiles.map((file) => ({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      url: URL.createObjectURL(file),
    }));

    setPhotos((prev) => [...prev, ...newPhotos]);

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemovePhoto = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPhotos((prev) => {
      const target = prev.find((p) => p.id === id);
      if (target && target.url.startsWith('blob:')) {
        URL.revokeObjectURL(target.url);
      }
      return prev.filter((p) => p.id !== id);
    });
  };

  return (
    <div className="w-full flex flex-col gap-1">
      {/* Slim Row */}
      <div className="w-full bg-[#FFFFFF] border border-[#E5E5E5] px-3 py-2 rounded-[2px] flex items-center justify-between gap-3">
        {/* Native phone gallery picker: NO capture attribute, multiple allowed */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          className="hidden"
          aria-hidden="true"
        />

        {/* Left: [camera icon] Label / Count */}
        <div className="flex items-center gap-2 text-xs font-medium text-[#0A0A0A] shrink-0">
          <Camera className="w-4 h-4 text-[#0A0A0A] shrink-0" aria-hidden="true" />
          <span>
            {photos.length === 0
              ? 'Add a photo (optional)'
              : `${photos.length} ${photos.length === 1 ? 'photo' : 'photos'} selected`}
          </span>
        </div>

        {/* Right: Small 40px square thumbnails in a row + "Choose photos" button */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {photos.map((photo) => (
            <div key={photo.id} className="relative group shrink-0">
              <img
                src={photo.url}
                alt="Selected photo"
                className="w-10 h-10 object-cover border border-[#0A0A0A] rounded-[2px]"
              />
              <button
                type="button"
                onClick={(e) => handleRemovePhoto(photo.id, e)}
                aria-label="Remove photo"
                className="absolute -top-1 -right-1 w-4 h-4 bg-[#0A0A0A] text-[#FFFFFF] rounded-full flex items-center justify-center hover:bg-black transition-colors shadow-sm focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
              >
                <X className="w-2.5 h-2.5 stroke-[2.5]" />
              </button>
            </div>
          ))}

          {photos.length < 5 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs font-semibold uppercase tracking-wider text-[#0A0A0A] font-heading underline underline-offset-2 hover:opacity-80 py-1 px-1 cursor-pointer whitespace-nowrap focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
            >
              Choose photos
            </button>
          )}
        </div>
      </div>

      {/* Tiny gray label under the row */}
      <p className="text-[11px] text-[#737373] px-1 font-normal leading-tight">
        On Google, tap &lsquo;Add photos &amp; videos&rsquo; and pick the same photos.
      </p>
    </div>
  );
};
