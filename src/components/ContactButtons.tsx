import React from 'react';
import { Instagram, MessageCircle, Phone, MapPin, Globe } from 'lucide-react';
import { siteData } from '../siteData';
import {
  getInstagramUrl,
  getWhatsAppUrl,
  getPhoneUrl,
  getMapsUrl,
  getWebsiteUrl,
} from '../lib/links';

export const ContactButtons: React.FC = () => {
  const instagramUrl = getInstagramUrl();
  const whatsappUrl = getWhatsAppUrl();
  const phoneUrl = getPhoneUrl();
  const mapsUrl = getMapsUrl();
  const websiteUrl = getWebsiteUrl();

  return (
    <div className="w-full flex flex-col gap-4">
      {/* Section Divider */}
      <div className="relative flex items-center justify-center my-2">
        <div className="border-t border-[#E5E5E5] w-full" aria-hidden="true" />
        <span className="bg-[#FFFFFF] px-3 text-xs tracking-wider uppercase font-semibold text-[#737373] font-heading whitespace-nowrap">
          STAY CONNECTED
        </span>
        <div className="border-t border-[#E5E5E5] w-full" aria-hidden="true" />
      </div>

      {/* Primary 2-column actions */}
      <div className="grid grid-cols-1 xs:grid-cols-2 gap-2.5">
        <a
          href={instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-3 py-2.5 bg-[#FFFFFF] hover:bg-[#F5F5F4] text-[#0A0A0A] border border-[#0A0A0A] rounded-[2px] text-xs font-semibold uppercase tracking-wider font-heading flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2"
        >
          <Instagram className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">FOLLOW ON INSTAGRAM</span>
        </a>

        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] px-3 py-2.5 bg-[#FFFFFF] hover:bg-[#F5F5F4] text-[#0A0A0A] border border-[#0A0A0A] rounded-[2px] text-xs font-semibold uppercase tracking-wider font-heading flex items-center justify-center gap-2 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A] focus-visible:outline-offset-2"
        >
          <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span className="truncate">CHAT ON WHATSAPP</span>
        </a>
      </div>

      {/* Optional Secondary actions (Only shown if defined in siteData) */}
      {(phoneUrl || mapsUrl || websiteUrl) && (
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {phoneUrl && (
            <a
              href={phoneUrl}
              className="min-h-[40px] px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F5F5F4] text-[#737373] hover:text-[#0A0A0A] border border-[#E5E5E5] rounded-[2px] text-xs font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
            >
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Call ({siteData.business.name})</span>
            </a>
          )}

          {mapsUrl && (
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F5F5F4] text-[#737373] hover:text-[#0A0A0A] border border-[#E5E5E5] rounded-[2px] text-xs font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
            >
              <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Directions</span>
            </a>
          )}

          {websiteUrl && (
            <a
              href={websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="min-h-[40px] px-3 py-1.5 bg-[#FFFFFF] hover:bg-[#F5F5F4] text-[#737373] hover:text-[#0A0A0A] border border-[#E5E5E5] rounded-[2px] text-xs font-medium inline-flex items-center gap-1.5 transition-colors focus-visible:outline-2 focus-visible:outline-[#0A0A0A]"
            >
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Official Website</span>
            </a>
          )}
        </div>
      )}
    </div>
  );
};
