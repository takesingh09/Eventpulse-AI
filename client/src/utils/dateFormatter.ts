/**
 * Format a time string like "2:30 PM"
 */
export function formatTime(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

/**
 * Format a date like "Mon, Jan 15"
 */
export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Format full date-time like "Mon, Jan 15 at 2:30 PM"
 */
export function formatDateTime(dateStr: string): string {
  return `${formatDate(dateStr)} at ${formatTime(dateStr)}`;
}

/**
 * Get relative time string like "5 minutes ago", "in 2 hours"
 */
export function getRelativeTime(dateStr: string): string {
  const now = Date.now();
  const target = new Date(dateStr).getTime();
  const diffMs = target - now;
  const absDiff = Math.abs(diffMs);

  const minutes = Math.floor(absDiff / 60000);
  const hours = Math.floor(absDiff / 3600000);
  const days = Math.floor(absDiff / 86400000);

  const isFuture = diffMs > 0;

  if (minutes < 1) return 'just now';
  if (minutes < 60) {
    const label = `${minutes} minute${minutes === 1 ? '' : 's'}`;
    return isFuture ? `in ${label}` : `${label} ago`;
  }
  if (hours < 24) {
    const label = `${hours} hour${hours === 1 ? '' : 's'}`;
    return isFuture ? `in ${label}` : `${label} ago`;
  }
  const label = `${days} day${days === 1 ? '' : 's'}`;
  return isFuture ? `in ${label}` : `${label} ago`;
}

/**
 * Check if a session is currently live
 */
export function isSessionLive(startTime: string, endTime: string): boolean {
  const now = Date.now();
  return now >= new Date(startTime).getTime() && now <= new Date(endTime).getTime();
}

/**
 * Check if a session is in the past
 */
export function isSessionPast(endTime: string): boolean {
  return Date.now() > new Date(endTime).getTime();
}

/**
 * Get the day number (1, 2, 3) for a date relative to event start
 */
export function getEventDay(dateStr: string, eventStartDate: string): number {
  const d = new Date(dateStr);
  const start = new Date(eventStartDate);
  const diff = Math.floor((d.getTime() - start.getTime()) / 86400000);
  return diff + 1;
}

/**
 * Format duration between two times like "45 min" or "1h 30min"
 */
export function formatDuration(startTime: string, endTime: string): string {
  const diffMs = new Date(endTime).getTime() - new Date(startTime).getTime();
  const totalMinutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours === 0) return `${minutes}min`;
  if (minutes === 0) return `${hours}h`;
  return `${hours}h ${minutes}min`;
}
