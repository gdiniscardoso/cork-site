export interface EventEntry {
  date: string;
  title: string;
  location: string;
  type: 'prova' | 'reuniao' | 'treino' | 'outro';
}

// In production this list would come from a content file
// (content/events/*.json) or an embedded public Google Calendar.
// Shared between the calendário page and the homepage's "Próximos eventos"
// preview, so both reflect the same set of events.
export const events: EventEntry[] = [];
