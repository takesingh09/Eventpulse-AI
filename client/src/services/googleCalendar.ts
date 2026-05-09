import type { Session } from '../types';

/**
 * Generates a Google Calendar "Add Event" URL for a session.
 */
export function getGoogleCalendarUrl(session: Session): string {
  const startDate = formatDateForGCal(session.startTime);
  const endDate = formatDateForGCal(session.endTime);

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: session.title,
    dates: `${startDate}/${endDate}`,
    details: `Speaker: ${session.speaker}\nTrack: ${session.track}\n\n${session.description}`,
    location: `${session.room} - TechVerse 2026`,
    sf: 'true',
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

function formatDateForGCal(dateStr: string): string {
  const d = new Date(dateStr);
  return d.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');
}

/**
 * Opens Google Calendar in a new tab to add the session.
 */
export function addToGoogleCalendar(session: Session): void {
  const url = getGoogleCalendarUrl(session);
  window.open(url, '_blank', 'noopener,noreferrer');
}
