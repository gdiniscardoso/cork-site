import type { APIRoute } from 'astro';
import { events } from '../data/events';

// Feed iCalendar (RFC 5545) gerado a partir de src/data/events.ts em cada build.
// Todas as provas são eventos de dia inteiro (o DTEND é exclusivo).

const toIcsDate = (iso: string) => iso.replaceAll('-', '');

const nextDay = (iso: string) => {
  const [y, m, d] = iso.split('-').map(Number);
  return toIcsDate(new Date(Date.UTC(y, m - 1, d + 1)).toISOString().slice(0, 10));
};

const escapeText = (s: string) =>
  s.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');

// Folds lines to 75 octets, as required by the spec.
const fold = (line: string) => {
  const encoder = new TextEncoder();
  const out: string[] = [];
  let current = '';
  let bytes = 0;
  for (const ch of line) {
    const size = encoder.encode(ch).length;
    if (bytes + size > (out.length === 0 ? 75 : 74)) {
      out.push(current);
      current = '';
      bytes = 0;
    }
    current += ch;
    bytes += size;
  }
  out.push(current);
  return out.join('\r\n ');
};

const slug = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const GET: APIRoute = ({ site }) => {
  const host = site?.hostname ?? 'cork-site';
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//CORK//Calendario de Provas//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:CORK – Calendário de Provas',
    'X-WR-CALDESC:Calendário de provas AAE e FPA – época 2026/2027',
    'X-WR-TIMEZONE:Europe/Lisbon',
    'REFRESH-INTERVAL;VALUE=DURATION:PT12H',
    'X-PUBLISHED-TTL:PT12H',
  ];

  for (const e of events) {
    const end = e.endDate ?? e.date;
    const description = [
      e.organizer && `Organização: ${e.organizer}`,
      `${e.discipline} · ${e.scope}`,
      e.note,
    ]
      .filter(Boolean)
      .join('\n');

    lines.push(
      'BEGIN:VEVENT',
      `UID:${e.date}-${slug(e.title)}@${host}`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${toIcsDate(e.date)}`,
      `DTEND;VALUE=DATE:${nextDay(end)}`,
      `SUMMARY:${escapeText(e.title)}`,
      `LOCATION:${escapeText(e.location)}`,
      `DESCRIPTION:${escapeText(description)}`,
      `CATEGORIES:${escapeText(e.discipline)}`,
      'TRANSP:TRANSPARENT',
      'END:VEVENT'
    );
  }

  lines.push('END:VCALENDAR');

  return new Response(lines.map(fold).join('\r\n') + '\r\n', {
    headers: { 'Content-Type': 'text/calendar; charset=utf-8' },
  });
};
