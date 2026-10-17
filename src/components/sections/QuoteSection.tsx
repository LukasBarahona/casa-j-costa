import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import Select from '@/components/ui/Select';
import { WhatsAppIcon } from '@/components/ui/Brand';
import { deposit, eventTypes, menuOptions, modalities, MENU_MODALITY, OTHER_EVENT, site } from '@/config/site';
import { useSiteActions } from '@/hooks/useSiteActions';
import {
  openWhatsApp,
  quoteWhatsAppText,
  todayISO,
  validateQuote,
  whatsappUrl,
  type QuoteData,
  type QuoteErrors,
} from '@/lib/quote';

const emptyForm: Required<QuoteData> = {
  name: '',
  email: '',
  phone: '',
  eventType: '',
  eventDetail: '',
  date: '',
  guests: '',
  modality: '',
  menu: '',
  message: '',
};

const QuoteSection: React.FC = () => {
  const { formDraft, openQuote } = useSiteActions();
  const [formData, setFormData] = useState(emptyForm);
  const [errors, setErrors] = useState<QuoteErrors>({});

  // El asistente de cotización puede dejar el formulario a medio llenar.
  useEffect(() => {
    if (formDraft) setFormData((prev) => ({ ...prev, ...formDraft }));
  }, [formDraft]);

  const update = (field: keyof QuoteData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const setField = (field: keyof QuoteData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validate = (): QuoteData | null => {
    // El menú solo aplica al Evento Integral, y el detalle solo al evento "Otro".
    const candidate = {
      ...formData,
      menu: formData.modality === MENU_MODALITY ? formData.menu : '',
      eventDetail: formData.eventType === OTHER_EVENT ? formData.eventDetail : '',
    };
    const { data, errors: found } = validateQuote(candidate);
    setErrors(found);

    const firstInvalid = Object.keys(found)[0];
    if (!firstInvalid) return data;
    document.getElementById(`quote-${firstInvalid}`)?.focus();
    return null;
  };

  const handleWhatsApp = () => {
    const data = validate();
    if (data) openWhatsApp(quoteWhatsAppText(data));
  };

  const guestsOutOfRange =
    formData.guests !== '' &&
    (Number(formData.guests) < site.capacity.min || Number(formData.guests) > site.capacity.max);

  return (
    <section id="cotizar" className="relative overflow-x-clip pb-24 pt-24 md:pb-32 md:pt-36">
      <div className="page">
        {/* Llamado a la acción */}
        <Reveal className="relative flex flex-col items-center text-center">
          <p className="eyebrow">Cotiza</p>
          <h2 className="display mt-6 text-title text-verde">
            ¿Tienes una fecha <br className="hidden sm:block" />
            en mente?
          </h2>
          <p className="prose-justify-center mt-5 max-w-[520px] text-lead text-muted-foreground">
            Cuéntanos la fecha, cuántos invitados esperas y qué quieres celebrar. Nosotros te ayudamos a elegir la mejor opción.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href={whatsappUrl(`Hola, quiero cotizar un evento en ${site.name}.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="pill pill-brand px-6 py-3"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Hablar por WhatsApp
            </a>
            <button type="button" onClick={() => openQuote()} className="pill pill-solid px-6 py-3">
              Cotizar paso a paso
            </button>
          </div>
        </Reveal>

        {/* Formulario de cotización: se envía por WhatsApp */}
        <div
          id="formulario"
          className="mt-20 grid scroll-mt-24 gap-12 md:mt-28 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
        >
          <Reveal className="lg:pt-8">
            <h3 className="display max-w-[440px] text-statement text-verde">
              O déjanos los datos de tu evento.
            </h3>
            <p className="prose-justify mt-4 max-w-[400px] text-muted-foreground">
              Completa estos datos y envíalos por WhatsApp; el mensaje se arma solo. Te respondemos con la propuesta y la
              disponibilidad de tu fecha.
            </p>

            <ul className="mt-10 space-y-4 text-sm font-medium text-foreground">
              <li>
                <a
                  href={site.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver en Google Maps"
                  className="group inline-flex min-h-11 items-center gap-3 transition-opacity hover:opacity-70"
                >
                  <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-verde-niebla text-verde-profundo">
                    <MapPin size={16} />
                  </span>
                  <span className="underline decoration-foreground/25 underline-offset-4 group-hover:decoration-foreground">
                    {site.address}
                    <span className="block text-muted-foreground">{site.city}</span>
                  </span>
                </a>
              </li>
            </ul>

            {/* Condición de reserva: destacada, es lo primero que hay que saber */}
            <div className="mt-10 max-w-[400px] rounded-[2rem] bg-verde px-6 py-6 text-marfil">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-marfil/75">
                Reserva de fecha
              </p>
              <p className="display mt-2 text-[clamp(2rem,4vw,2.75rem)] leading-none">{deposit.amount}</p>
              <p className="mt-2 text-lead font-medium">{deposit.detail}</p>
            </div>

            <p className="mt-6 max-w-[400px] text-sm font-medium text-muted-foreground">
              Capacidad de {site.capacity.min} a {site.capacity.max} personas.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleWhatsApp();
              }}
              noValidate
              className="grid gap-4 rounded-[2.5rem] bg-papel p-6 shadow-xl shadow-ebano/5 sm:grid-cols-2 md:p-10 [&>div]:min-w-0"
            >
              <div>
                <label htmlFor="quote-name" className="field-label">Nombre</label>
                <input
                  id="quote-name"
                  value={formData.name}
                  onChange={update('name')}
                  placeholder="Tu nombre"
                  autoComplete="name"
                  maxLength={100}
                  aria-invalid={!!errors.name}
                  className="field"
                />
                {errors.name && <p className="mt-1 pl-1 text-xs text-destructive">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="quote-email" className="field-label">Correo (opcional)</label>
                <input
                  id="quote-email"
                  type="email"
                  value={formData.email}
                  onChange={update('email')}
                  placeholder="tu@correo.com"
                  autoComplete="email"
                  maxLength={255}
                  aria-invalid={!!errors.email}
                  className="field"
                />
                {errors.email && <p className="mt-1 pl-1 text-xs text-destructive">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="quote-phone" className="field-label">Teléfono (opcional)</label>
                <input
                  id="quote-phone"
                  type="tel"
                  value={formData.phone}
                  onChange={update('phone')}
                  placeholder="+56 9"
                  autoComplete="tel"
                  maxLength={30}
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="quote-eventType" className="field-label">Tipo de evento</label>
                <Select
                  id="quote-eventType"
                  value={formData.eventType}
                  options={eventTypes.map((type) => type.value)}
                  onChange={setField('eventType')}
                  invalid={!!errors.eventType}
                />
                {errors.eventType && <p className="mt-1 pl-1 text-xs text-destructive">{errors.eventType}</p>}
              </div>

              {formData.eventType === OTHER_EVENT && (
                <div className="sm:col-span-2">
                  <label htmlFor="quote-eventDetail" className="field-label">¿Qué tipo de evento es?</label>
                  <input
                    id="quote-eventDetail"
                    value={formData.eventDetail}
                    onChange={update('eventDetail')}
                    placeholder="Ej: lanzamiento de producto, graduación, retiro de equipo…"
                    maxLength={160}
                    aria-invalid={!!errors.eventDetail}
                    className="field"
                  />
                  {errors.eventDetail ? (
                    <p className="mt-1 pl-1 text-xs text-destructive">{errors.eventDetail}</p>
                  ) : (
                    <p className="mt-1 pl-1 text-xs text-muted-foreground">
                      Cuéntanos en pocas palabras qué quieres celebrar, para orientarte mejor.
                    </p>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="quote-date" className="field-label">Fecha tentativa (opcional)</label>
                <input
                  id="quote-date"
                  type="date"
                  value={formData.date}
                  onChange={update('date')}
                  min={todayISO()}
                  className="field"
                />
              </div>

              <div>
                <label htmlFor="quote-guests" className="field-label">Número de invitados</label>
                <input
                  id="quote-guests"
                  type="number"
                  inputMode="numeric"
                  value={formData.guests}
                  onChange={update('guests')}
                  placeholder={`Entre ${site.capacity.min} y ${site.capacity.max}`}
                  min={1}
                  aria-invalid={!!errors.guests}
                  className="field"
                />
                {errors.guests ? (
                  <p className="mt-1 pl-1 text-xs text-destructive">{errors.guests}</p>
                ) : (
                  guestsOutOfRange && (
                    <p className="mt-1 pl-1 text-xs text-muted-foreground">
                      Recibimos de {site.capacity.min} a {site.capacity.max} personas. Escríbenos igual y vemos cómo ayudarte.
                    </p>
                  )
                )}
              </div>

              <div className={formData.modality === MENU_MODALITY ? '' : 'sm:col-span-2'}>
                <label htmlFor="quote-modality" className="field-label">¿Qué necesitas?</label>
                <Select
                  id="quote-modality"
                  value={formData.modality}
                  options={modalities.map((modality) => modality.value)}
                  onChange={setField('modality')}
                  invalid={!!errors.modality}
                />
                {errors.modality && <p className="mt-1 pl-1 text-xs text-destructive">{errors.modality}</p>}
              </div>

              {formData.modality === MENU_MODALITY && (
                <div>
                  <label htmlFor="quote-menu" className="field-label">Menú (opcional)</label>
                  <Select
                    id="quote-menu"
                    value={formData.menu}
                    options={menuOptions}
                    onChange={setField('menu')}
                    placeholder="Elige un menú"
                  />
                </div>
              )}

              <div className="sm:col-span-2">
                <label htmlFor="quote-message" className="field-label">Cuéntanos más (opcional)</label>
                <textarea
                  id="quote-message"
                  value={formData.message}
                  onChange={update('message')}
                  placeholder="Qué celebras, horario, lo que tengas en mente…"
                  rows={4}
                  maxLength={2000}
                  className="field resize-none"
                />
              </div>

              <div className="flex justify-center pt-2 sm:col-span-2">
                <button type="submit" className="pill pill-brand w-full px-8 py-3.5 sm:w-auto">
                  <WhatsAppIcon className="h-4 w-4" />
                  Cotizar por WhatsApp
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;
