/**
 * Generate a unique redeemable gift card code from transaction ID
 * Format: DHC-{amount}-{unique identifier from transaction ID}
 * 
 * Example: DHC-25-A1B2C3D4E5F6
 * - DHC = Delhi House Café prefix
 * - 25 = Gift card amount
 * - A1B2C3D4E5F6 = Extracted unique identifier from transaction ID
 */

export function generateGiftCardCode(transactionId: string, amount: number): string {
  // Round amount to avoid decimals
  const roundedAmount = Math.round(amount);
  
  // Remove common prefixes and keep alphanumeric characters only
  const cleanId = transactionId
    .replace(/^cs_(test|live)_/, '') // Remove cs_test_ or cs_live_ prefix
    .replace(/[^a-zA-Z0-9]/g, '') // Keep only alphanumeric
    .toUpperCase();

  // Extract meaningful characters from different positions for uniqueness
  // This ensures we get a good mix of characters from different parts of the ID
  const chars: string[] = [];
  const seen = new Set<string>();
  
  // First pass: extract characters at evenly spaced intervals
  if (cleanId.length >= 12) {
    const step = Math.floor(cleanId.length / 12);
    for (let i = 0; i < cleanId.length && chars.length < 12; i += step) {
      const char = cleanId[i];
      if (char && /[A-Z0-9]/.test(char) && !seen.has(char)) {
        chars.push(char);
        seen.add(char);
      }
    }
  }

  // Second pass: fill remaining slots with any unique characters
  if (chars.length < 12) {
    for (let i = 0; i < cleanId.length && chars.length < 12; i++) {
      const char = cleanId[i];
      if (char && /[A-Z0-9]/.test(char) && !seen.has(char)) {
        chars.push(char);
        seen.add(char);
      }
    }
  }

  // Third pass: if still not enough, allow duplicates (shouldn't happen often)
  if (chars.length < 12) {
    for (let i = 0; i < cleanId.length && chars.length < 12; i++) {
      const char = cleanId[i];
      if (char && /[A-Z0-9]/.test(char)) {
        chars.push(char);
      }
    }
  }

  // Ensure we have exactly 12 characters (pad if necessary)
  while (chars.length < 12) {
    chars.push(cleanId[chars.length % cleanId.length] || 'X');
  }

  // Take first 12 characters
  const identifier = chars.slice(0, 12).join('');

  // Format: DHC-{amount}-{identifier}
  return `DHC-${roundedAmount}-${identifier}`;
}

/**
 * Validate a gift card code format
 */
export function isValidGiftCardCodeFormat(code: string): boolean {
  // Format: DHC-{amount}-{12 character identifier}
  const pattern = /^DHC-\d+(\.\d+)?-[A-Z0-9]{12}$/;
  return pattern.test(code);
}

/**
 * Extract amount from gift card code
 */
export function extractAmountFromCode(code: string): number | null {
  const match = code.match(/^DHC-(\d+(\.\d+)?)-/);
  return match ? parseFloat(match[1]) : null;
}

