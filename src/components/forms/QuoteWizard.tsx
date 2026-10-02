import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail } from 'lucide-react';
import { WhatsAppIcon } from '@/components/ui/Brand';
import { eventTypes, menus, modalities, MENU_MODALITY, quoteTerms, site } from '@/config/site';
import { formatDate, openWhatsApp, quoteWhatsAppText, todayISO, type QuoteData } from '@/lib/quote';

interface QuoteWizardProps {
  preset: QuoteData;
  onBack: () => void;
  onClose: () => void;
  onContinueByEmail: (data: QuoteData) => void;
}

const TOTAL_STEPS = 4;

const optionClass = (selected: boolean) =>
  `w-full text-left px-4 py-3 rounded-2xl border transition-colors ${
    selected ? 'border-verde bg-verde-niebla/70' : 'border-foreground/15 hover:border-foreground/40'
  }`;

/* Cotización en cuatro pasos dentro del menú:
   tipo de evento → invitados y fecha → modalidad → resumen y envío. */
const QuoteWizard: React.FC<QuoteWizardProps> = ({ preset, onBack, onClose, onContinueByEmail }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<QuoteData>({
    eventType: '',
    guests: '',
    date: '',
    modality: '',
    menu: '',
    name: '',
    ...preset,
  });

  const guests = Number(formData.guests);
  const guestsOutOfRange =
    formData.guests !== '' && (guests < site.capacity.min || guests > site.capacity.max);

  const canProceed = () => {
    switch (step) {
      case 1: return formData.eventType !== '';
      case 2: return formData.guests !== '' && guests > 0;
      case 3: return formData.modality !== '';
      default: return true;
    }
  };

  const summary = [
    { label: 'Evento', value: formData.eventType },
    { label: 'Invitados', value: `${formData.guests} personas` },
    { label: 'Fecha', value: formData.date ? formatDate(formData.date) : 'Por definir' },
    { label: 'Modalidad', value: formData.modality },
    ...(formData.menu ? [{ label: 'Menú', value: formData.menu }] : []),
  ];

  const handleWhatsApp = () => {
    openWhatsApp(quoteWhatsAppText(formData));
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="p-5 md:p-6"
    >
      <button
        type="button"
        onClick={step === 1 ? onBack : () => setStep(step - 1)}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft size={16} />
        {step === 1 ? 'Volver' : 'Anterior'}
      </button>

      {/* Progress */}
      <div
        className="flex gap-1 mb-6"
        role="progressbar"
        aria-label="Progreso de la cotización"
        aria-valuemin={1}
        aria-valuemax={TOTAL_STEPS}
        aria-valuenow={step}
      >
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((s) => (
          <div
            key={s}
            className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-verde' : 'bg-foreground/15'}`}
          />
        ))}
      </div>

      {step === 1 && (
        <div>
          <h2 className="display mb-2 text-2xl text-foreground">¿Qué quieres celebrar?</h2>
          <p className="text-sm text-muted-foreground mb-4">Elige lo que más se parezca a tu evento.</p>

          <div className="space-y-2">
            {eventTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                aria-pressed={formData.eventType === type.value}
                onClick={() => setFormData({ ...formData, eventType: type.value })}
                className={optionClass(formData.eventType === type.value)}
              >
                <span className="block text-sm font-medium text-foreground">{type.value}</span>
                <span className="block text-xs text-muted-foreground">{type.description}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2 className="display mb-2 text-2xl text-foreground">Invitados y fecha</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Recibimos de {site.capacity.min} a {site.capacity.max} personas.
          </p>

          <label htmlFor="wizard-guests" className="field-label">Número de invitados</label>
          <div className="relative">
            <input
              id="wizard-guests"
              type="number"
              inputMode="numeric"
              min={1}
              value={formData.guests}
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
              placeholder="Ej: 80"
              className="field pr-20"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
              personas
            </span>
          </div>
          {guestsOutOfRange && (
            <p className="text-xs text-muted-foreground mt-1">
              Está fuera de nuestra capacidad habitual. Sigue igual y lo conversamos.
            </p>
          )}

          <label htmlFor="wizard-date" className="field-label mt-4">Fecha tentativa (opcional)</label>
          <input
            id="wizard-date"
            type="date"
            min={todayISO()}
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="field"
          />
        </div>
      )}

      {step === 3 && (
        <div>
          <h2 className="display mb-2 text-2xl text-foreground">¿Qué necesitas?</h2>
          <p className="text-sm text-muted-foreground mb-4">Solo la casa, o la casa con nuestra cocina.</p>

          <div className="space-y-2">
            {modalities.map((modality) => (
              <button
                key={modality.value}
                type="button"
                aria-pressed={formData.modality === modality.value}
                onClick={() =>
                  setFormData({
                    ...formData,
                    modality: modality.value,
                    menu: modality.value === MENU_MODALITY ? formData.menu : '',
                  })
                }
                className={optionClass(formData.modality === modality.value)}
              >
                <span className="block text-sm font-medium text-foreground">{modality.value}</span>
                <span className="block text-xs text-muted-foreground">{modality.description}</span>
              </button>
            ))}
          </div>

          {formData.modality === MENU_MODALITY && (
            <div className="mt-5">
              <p className="field-label">¿Con qué menú? (opcional)</p>
              <div className="flex flex-wrap gap-2">
                {menus.map((menu) => {
                  const selected = formData.menu === menu.name;
                  return (
                    <button
                      key={menu.name}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setFormData({ ...formData, menu: selected ? '' : menu.name })}
                      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                        selected
                          ? 'border-verde bg-verde text-marfil'
                          : 'border-foreground/20 text-foreground hover:border-foreground/50'
                      }`}
                    >
                      {menu.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div>
          <h2 className="display mb-3 text-2xl text-foreground">Tu cotización</h2>

          <div className="mb-4 rounded-3xl border border-foreground/10 bg-verde-niebla/50 p-5">
            <dl className="space-y-2">
              {summary.map((row) => (
                <div key={row.label} className="flex justify-between gap-4 text-sm">
                  <dt className="text-muted-foreground">{row.label}</dt>
                  <dd className="font-medium text-foreground text-right">{row.value}</dd>
                </div>
              ))}
            </dl>
            <p className="text-xs text-muted-foreground mt-3 pt-3 border-t border-foreground/10">
              Te enviamos el valor según fecha y modalidad. {quoteTerms}
            </p>
          </div>

          <label htmlFor="wizard-name" className="field-label">Tu nombre (opcional)</label>
          <input
            id="wizard-name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Para saber con quién hablamos"
            autoComplete="name"
            maxLength={100}
            className="field"
          />
        </div>
      )}

      {step < TOTAL_STEPS ? (
        <button
          type="button"
          onClick={() => setStep(step + 1)}
          disabled={!canProceed()}
          className="pill pill-solid mt-6 w-full py-3 disabled:opacity-40"
        >
          Continuar
        </button>
      ) : (
        <div className="mt-6 space-y-2">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="pill pill-brand w-full py-3"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Enviar por WhatsApp
          </button>
          <button
            type="button"
            onClick={() => onContinueByEmail(formData)}
            className="pill pill-ghost w-full py-3"
          >
            <Mail size={14} />
            Seguir por correo
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default QuoteWizard;
