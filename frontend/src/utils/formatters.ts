/**
 * Indian Public Service Formatting Utilities
 *
 * Provides standardized date/time displays for Indian administrative contexts:
 * - Dates: DD/MM/YYYY (Standard Indian official format)
 * - Times: HH:MM IST (Indian Standard Time)
 *
 * Strictly operates on display layers; does NOT alter underlying ISO 8601 data models.
 */

/**
 * Formats an ISO date string (YYYY-MM-DD or full ISO) into Indian standard display format (DD/MM/YYYY).
 * If already formatted or invalid, returns gracefully without throwing.
 */
export function formatIndianDate(dateStr?: string | null): string {
  if (!dateStr) return '';
  
  // Already in DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    return dateStr;
  }

  // Matches YYYY-MM-DD
  const isoMatch = dateStr.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (isoMatch) {
    const [, yyyy, mm, dd] = isoMatch;
    return `${dd}/${mm}/${yyyy}`;
  }

  // Fallback parsing for other valid date strings
  try {
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    }
  } catch {
    // Return original if parsing fails
  }

  return dateStr;
}

/**
 * Ensures timestamp carries explicit Indian Standard Time (IST) indication.
 */
export function formatIndianTimestamp(timeStr?: string | null): string {
  if (!timeStr) return '';
  const trimmed = timeStr.trim();
  if (trimmed.toUpperCase().includes('IST')) {
    return trimmed;
  }
  return `${trimmed} IST`;
}
