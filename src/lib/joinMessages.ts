import { siteData } from '../siteData';

const CONNECTORS = [
  '',        // 1st message: as it is
  'Also, ',  // 2nd message
  'Plus, ',  // 3rd message
  'And ',    // 4th message
];

export function getConnectorForIndex(index: number): string {
  if (index < CONNECTORS.length) {
    return CONNECTORS[index];
  }
  return 'Additionally, ';
}

/**
 * Formats a single message with its natural connector and proper casing.
 */
export function formatSingleMessage(
  message: string,
  connector: string,
  shopName: string,
  cityName: string
): string {
  const trimmed = message.trim();
  if (!trimmed) return '';

  // Clean trailing punctuation and ensure it ends with a period
  const baseWithoutPunctuation = trimmed.replace(/[.!?]+$/, '');

  if (!connector) {
    return `${baseWithoutPunctuation}.`;
  }

  // Check if first word should retain capitalisation
  const words = baseWithoutPunctuation.split(/\s+/);
  const firstWord = words[0] || '';
  const cleanFirstWord = firstWord.replace(/[^a-zA-Z']/g, '');

  const isPronounI =
    cleanFirstWord === 'I' ||
    cleanFirstWord.startsWith("I'") ||
    cleanFirstWord.startsWith('I’');

  const matchesShop =
    shopName &&
    baseWithoutPunctuation.toLowerCase().startsWith(shopName.toLowerCase());

  const matchesCity =
    cityName &&
    baseWithoutPunctuation.toLowerCase().startsWith(cityName.toLowerCase());

  let processedMessage: string;
  if (isPronounI || matchesShop || matchesCity) {
    processedMessage = baseWithoutPunctuation;
  } else {
    // Lowercase only the first letter
    processedMessage =
      baseWithoutPunctuation.charAt(0).toLowerCase() +
      baseWithoutPunctuation.slice(1);
  }

  return `${connector}${processedMessage}.`;
}

/**
 * Builds one cohesive paragraph from a list of selected review messages.
 */
export function joinReviewMessages(
  messages: string[],
  shopName: string = siteData.business.name,
  cityName: string = siteData.business.city
): string {
  if (!messages || messages.length === 0) return '';

  return messages
    .map((msg, idx) => {
      const connector = getConnectorForIndex(idx);
      return formatSingleMessage(msg, connector, shopName, cityName);
    })
    .filter(Boolean)
    .join(' ');
}
