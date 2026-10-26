import { siteData } from '../siteData';

/**
 * Replace template placeholders like {shop} and {city} with values from siteData.business.
 */
export function fillTemplate(template: string): string {
  const shopName = siteData.business.name || "our shop";
  const cityName = siteData.business.city || "town";

  return template
    .replace(/\{shop\}/g, shopName)
    .replace(/\{city\}/g, cityName);
}
