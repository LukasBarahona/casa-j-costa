import { OTHER_EVENT, site } from '@/config/site';

/* Datos de una cotización: los comparten el formulario del final de la página,
   el asistente del menú y los mensajes rápidos de WhatsApp. */
export interface QuoteData {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  // Explicación del evento cuando el tipo es "Otro".
  eventDetail?: string;
  date?: string;
  guests?: string;
  modality?: string;
  // Menú del Evento Integral (Jota Clásico, Jota Selección o Jota Costa).
  menu?: string;
  message?: string;
}

export type QuoteErrors = Partial<Record<keyof QuoteData, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value.trim());

/* Revisa una cotización antes de enviarla. Devuelve los datos limpios (sin
   espacios sobrantes) y, si algo falta, el mensaje para cada campo.
   Pide lo mismo que la cotización paso a paso: nombre, correo, tipo de evento,
   invitados y qué se necesita. */
export function validateQuote(input: QuoteData): { data: QuoteData; errors: QuoteErrors } {
  const data: QuoteData = {};
  for (const [field, value] of Object.entries(input)) {
    data[field as keyof QuoteData] = (value ?? '').trim();
  }

  const errors: QuoteErrors = {};
  if (!data.name) errors.name = 'Escribe tu nombre';
  if (!data.email) {
    errors.email = 'Escribe tu correo';
  } else if (!EMAIL_PATTERN.test(data.email)) {
    errors.email = 'Revisa el correo, parece incompleto';
  }
  if (!data.eventType) errors.eventType = 'Elige el tipo de evento';
  if (data.eventType === OTHER_EVENT && !data.eventDetail) {
    errors.eventDetail = 'Cuéntanos qué tipo de evento es';
  }
  if (!data.guests || !(Number(data.guests) > 0)) errors.guests = 'Indica cuántos invitados';
  if (!data.modality) errors.modality = 'Elige qué necesitas';

  return { data, errors };
}

const dateFormatter = new Intl.DateTimeFormat('es-CL', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
});

// "2026-12-05" → "sábado, 5 de diciembre de 2026"
export function formatDate(iso?: string): string {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  if (!y || !m || !d) return iso;
  return dateFormatter.format(new Date(y, m - 1, d));
}

export function todayISO(): string {
  const now = new Date();
  const offset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}

// "Otro" se acompaña de la explicación que dio la persona.
function eventLabel(data: QuoteData): string {
  if (data.eventType === OTHER_EVENT && data.eventDetail) return `${OTHER_EVENT} — ${data.eventDetail}`;
  return data.eventType ?? '';
}

function quoteLines(data: QuoteData): string[] {
  return [
    data.eventType && `Tipo de evento: ${eventLabel(data)}`,
    data.date && `Fecha tentativa: ${formatDate(data.date)}`,
    data.guests && `Invitados: ${data.guests}`,
    data.modality && `Modalidad: ${data.modality}`,
    data.menu && `Menú: ${data.menu}`,
    data.name && `Nombre: ${data.name}`,
    data.email && `Correo: ${data.email}`,
    data.phone && `Teléfono: ${data.phone}`,
    data.message && `\n${data.message}`,
  ].filter(Boolean) as string[];
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export function openWhatsApp(text: string) {
  window.open(whatsappUrl(text), '_blank', 'noopener,noreferrer');
}

export function quoteWhatsAppText(data: QuoteData): string {
  const lines = quoteLines(data);
  const intro = `Hola, quiero cotizar un evento en ${site.name}.`;
  return lines.length ? `${intro}\n\n${lines.join('\n')}` : intro;
}

export function quoteMailto(data: QuoteData): string {
  const subject = `Cotización ${eventLabel(data) || 'de evento'}${
    data.guests ? ` — ${data.guests} personas` : ''
  }`;
  const body = `Hola, quiero cotizar un evento en ${site.name}.\n\n${quoteLines(data).join('\n')}\n`;
  return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/* Envía la cotización por correo.
   - Con `site.formEndpoint`: se envía desde la página (devuelve 'sent').
   - Sin endpoint: abre el programa de correo del visitante (devuelve 'mailto'). */
export async function sendQuoteByEmail(data: QuoteData): Promise<'sent' | 'mailto'> {
  if (!site.formEndpoint) {
    window.location.href = quoteMailto(data);
    return 'mailto';
  }

  const response = await fetch(site.formEndpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...data,
      date: formatDate(data.date),
      _subject: `Cotización web — ${eventLabel(data) || 'evento'}`,
    }),
  });

  if (!response.ok) throw new Error(`Form endpoint responded ${response.status}`);
  return 'sent';
}
