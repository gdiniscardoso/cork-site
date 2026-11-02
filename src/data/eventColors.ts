// One distinct hue per tipo / âmbito / fonte value, shared by the filter chips and the event badges.
const HUES: Record<string, number> = {
  // Tipo
  'Estrada': 210,
  'Corta-Mato': 125,
  'Pista Ar Livre': 0,
  'Pista Curta': 280,
  'Trail': 32,
  'Formação': 175,
  // Âmbito
  'Regional': 50,
  'Nacional': 330,
  'Internacional': 245,
  // Fonte
  'AAE': 90,
  'FPA': 195,
};

export const badgeStyle = (value: string) => {
  const h = HUES[value];
  if (h === undefined) return '';
  return `--g1: hsl(${h} 75% 36%); --g2: hsl(${h + 14} 80% 48%);`;
};

const EMOJIS: Record<string, string> = {
  'Estrada': '🛣️',
  'Corta-Mato': '🌲',
  'Pista Ar Livre': '🏟️',
  'Pista Curta': '⏱️',
  'Trail': '⛰️',
  'Formação': '🎓',
  'Regional': '📍',
  'Nacional': '🏆',
  'Internacional': '🌍',
};

export const badgeLabel = (value: string) => (EMOJIS[value] ? `${EMOJIS[value]} ${value}` : value);

// Drop logo files into src/assets/logos named after the organizer/source code
// (e.g. AAE.png, FPA.svg, AA-Lisboa.png); they show up automatically.
const logoFiles = import.meta.glob<{ default: ImageMetadata }>('../assets/logos/*.{png,svg,webp,jpg}', {
  eager: true,
});
const slug = (s: string) => s.trim().replace(/[^\p{L}\p{N}]+/gu, '-').replace(/^-|-$/g, '').toLowerCase();
const logos = new Map<string, string>();
for (const [path, mod] of Object.entries(logoFiles)) {
  const name = path.split('/').pop()!.replace(/\.[^.]+$/, '');
  logos.set(slug(name), mod.default.src);
}

export const logoFor = (code: string) => logos.get(slug(code));

// "AAE / CMA / JFV" -> [{ code, logo? }, ...]
export const organizerParts = (organizer: string) =>
  organizer.split('/').map((p) => p.trim()).filter(Boolean).map((code) => ({ code, logo: logoFor(code) }));
