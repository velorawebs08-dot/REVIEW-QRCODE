import { siteData } from '../siteData';

/**
 * Clean phone number for WhatsApp wa.me links (digits only, no +, -, or spaces)
 */
export function getWhatsAppUrl(customMessage?: string): string {
  const rawNumber = siteData.review.whatsappNumber || '';
  const cleanNumber = rawNumber.replace(/\D/g, '');
  const message = customMessage || siteData.review.whatsappMessage || 'Hi False Nine, I would like to inquire.';
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
}

/**
 * Returns formatted Instagram URL
 */
export function getInstagramUrl(): string {
  const url = siteData.review.instagramUrl || '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  // If handle only (e.g. "@falsenine")
  const handle = url.replace(/^@/, '').trim();
  return `https://instagram.com/${handle}`;
}

/**
 * Returns direct Google review URL untouched, with dev verification check.
 */
export function getGoogleReviewUrl(): string {
  const url = siteData.review.googleReviewUrl || '';

  // Console warning if googleReviewUrl does not start with "https://search.google.com/local/writereview?placeid=ChIJ"
  if (url && !url.startsWith('https://search.google.com/local/writereview?placeid=ChIJ')) {
    console.warn(
      '[Review QR App] Warning: googleReviewUrl does not start with "https://search.google.com/local/writereview?placeid=ChIJ". Direct review links must point straight to the review box.'
    );
  }

  return url;
}

// Immediate check on load
if (
  siteData.review.googleReviewUrl &&
  !siteData.review.googleReviewUrl.startsWith('https://search.google.com/local/writereview?placeid=ChIJ')
) {
  console.warn(
    '[Review QR App] Warning: googleReviewUrl does not start with "https://search.google.com/local/writereview?placeid=ChIJ". Direct review links must point straight to the review box.'
  );
}

/**
 * Returns tel: link
 */
export function getPhoneUrl(): string | null {
  if (!siteData.review.phone) return null;
  const digits = siteData.review.phone.replace(/[^\d+]/g, '');
  return `tel:${digits}`;
}

/**
 * Returns Maps URL
 */
export function getMapsUrl(): string | null {
  return siteData.review.mapsUrl || null;
}

/**
 * Returns Website URL
 */
export function getWebsiteUrl(): string | null {
  return siteData.review.website || null;
}
