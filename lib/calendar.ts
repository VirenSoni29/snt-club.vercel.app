// lib/calendar.ts
import { createEvent, DateArray } from "ics";

interface CalendarEventParams {
  title: string;
  description: string;
  startDateTime: string; // ISO String, e.g. "2026-09-01T13:30:00+05:30"
  durationMinutes?: number;
  venue: string;
  organizerName?: string;
  organizerEmail?: string;
}

export function generateIcsAttachment({
  title,
  description,
  startDateTime,
  durationMinutes = 90,
  venue,
  organizerName = "Science & Technology Club",
  organizerEmail = process.env.EMAIL_USER || "sntclub@skit.ac.in",
}: CalendarEventParams): Promise<string> {
  return new Promise((resolve, reject) => {
    const d = new Date(startDateTime);

    // Convert date components for ics [year, month (1-indexed), day, hour, minute]
    // Handled in UTC to guarantee accurate client-side timezone offsets
    const start: DateArray = [
      d.getUTCFullYear(),
      d.getUTCMonth() + 1,
      d.getUTCDate(),
      d.getUTCHours(),
      d.getUTCMinutes(),
    ];

    createEvent(
      {
        start,
        startInputType: "utc",
        duration: { minutes: durationMinutes },
        title,
        description,
        location: venue,
        organizer: { name: organizerName, email: organizerEmail },
        status: "CONFIRMED",
        busyStatus: "BUSY",
        productId: "sntclub/ics",
      },
      (error, value) => {
        if (error) {
          return reject(error);
        }
        resolve(value);
      }
    );
  });
}