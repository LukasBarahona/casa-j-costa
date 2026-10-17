import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';
import { EASE_OUT } from '@/lib/motion';
import { cn } from '@/lib/utils';

interface SelectProps {
  // Va en el botón: lo usan la etiqueta (`htmlFor`) y el foco cuando falta el dato.
  id: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
  placeholder?: string;
  invalid?: boolean;
  className?: string;
}

/* Lista desplegable con la estética de la página (reemplaza al <select> nativo).

   Accesible como "listbox" de una sola selección:
   - Teclado: Enter, Espacio o flechas abren; flechas, Inicio y Fin recorren;
     Enter o Espacio eligen; Escape o Tab cierran. Escribir una letra salta a
     la opción que empieza con ella.
   - En pantallas táctiles se abre y se elige con el dedo, igual que con el mouse. */
const Select: React.FC<SelectProps> = ({
  id,
  value,
  options,
  onChange,
  placeholder = 'Elige una opción',
  invalid,
  className,
}) => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const listId = useId();
  const optionId = (index: number) => `${listId}-opcion-${index}`;

  const openList = (index = Math.max(0, options.indexOf(value))) => {
    setActive(index);
    setOpen(true);
  };

  const choose = (index: number) => {
    onChange(options[index]);
    setOpen(false);
    buttonRef.current?.focus();
  };

  // Cierra al tocar fuera.
  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [open]);

  // Mantiene a la vista la opción marcada al recorrer con el teclado.
  useEffect(() => {
    if (!open || active < 0) return;
    listRef.current?.querySelector(`#${CSS.escape(optionId(active))}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    const last = options.length - 1;

    if (!open) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        openList(e.key === 'ArrowUp' ? last : undefined);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => Math.min(last, i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => Math.max(0, i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(last);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (active >= 0) choose(active);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        break;
      case 'Tab':
        setOpen(false);
        break;
      default:
        // Salto por la primera letra.
        if (e.key.length === 1) {
          const letter = e.key.toLowerCase();
          const match = options.findIndex((option) => option.toLowerCase().startsWith(letter));
          if (match >= 0) setActive(match);
        }
    }
  };

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        ref={buttonRef}
        id={id}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listId}
        aria-activedescendant={open && active >= 0 ? optionId(active) : undefined}
        aria-invalid={invalid}
        onClick={() => (open ? setOpen(false) : openList())}
        onKeyDown={handleKeyDown}
        className={cn(
          'field flex items-center justify-between gap-3 text-left',
          open && 'border-[#596C52] bg-papel',
          !value && 'text-muted-foreground'
        )}
      >
        <span className="truncate">{value || placeholder}</span>
        <ChevronDown
          size={17}
          aria-hidden="true"
          className={cn('flex-shrink-0 text-[#596C52] transition-transform duration-300 ease-out', open && 'rotate-180')}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            ref={listRef}
            id={listId}
            role="listbox"
            aria-labelledby={id}
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            className="absolute inset-x-0 top-full z-30 mt-2 max-h-64 origin-top overflow-y-auto rounded-2xl border border-[#596C52]/15 bg-marfil p-1.5 shadow-[0_18px_40px_-18px_rgba(42,57,39,0.4)]"
          >
            {options.map((option, index) => {
              const selected = option === value;
              const highlighted = index === active;
              return (
                <li
                  key={option}
                  id={optionId(index)}
                  role="option"
                  aria-selected={selected}
                  onPointerEnter={() => setActive(index)}
                  // Evita que el botón pierda el foco antes de elegir.
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => choose(index)}
                  className={cn(
                    'flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-base text-foreground transition-colors duration-150 md:text-sm',
                    highlighted && 'bg-[#596C52] text-white',
                    selected && !highlighted && 'font-medium text-[#596C52]'
                  )}
                >
                  {option}
                  {selected && <Check size={16} aria-hidden="true" className="flex-shrink-0" />}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Select;
