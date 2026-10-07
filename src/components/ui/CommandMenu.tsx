import React, { useState, useRef, useEffect } from 'react';
import { Command as CommandPrimitive } from 'cmdk';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Calculator, Mail, Search } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';
import QuoteWizard from '@/components/forms/QuoteWizard';
import { WhatsAppIcon } from '@/components/ui/Brand';
import { site } from '@/config/site';
import { useIsMobile } from '@/hooks/use-mobile';
import { useSiteActions } from '@/hooks/useSiteActions';
import { openWhatsApp } from '@/lib/quote';
import { scrollToSection } from '@/lib/utils';

type SuggestionAction = 'quote' | 'whatsapp' | 'email';

const suggestions: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  description: string;
  keywords: string[];
  action: SuggestionAction;
}[] = [
  {
    icon: Calculator,
    label: 'Cotizar mi evento',
    description: 'Arma tu cotización en cuatro pasos',
    keywords: ['precio', 'valor', 'presupuesto', 'cuanto cuesta'],
    action: 'quote',
  },
  {
    icon: WhatsAppIcon,
    label: 'Hablar por WhatsApp',
    description: 'Escríbenos directo, sin formularios',
    keywords: ['chat', 'telefono', 'mensaje', 'wsp'],
    action: 'whatsapp',
  },
  {
    icon: Mail,
    label: 'Llenar el formulario',
    description: 'Déjanos los datos de tu evento y te enviamos la propuesta',
    keywords: ['email', 'mail', 'formulario', 'contacto'],
    action: 'email',
  },
];

const groupHeading =
  '[&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-muted-foreground [&_[cmdk-group-heading]]:mb-2';

const CommandMenu: React.FC = () => {
  const { menu, setMenuView, closeMenu } = useSiteActions();
  const [search, setSearch] = useState('');
  const isMobile = useIsMobile();
  const inputRef = useRef<HTMLInputElement>(null);

  const goToSection = (sectionId: string) => {
    closeMenu();
    // Espera a que el diálogo se cierre y libere el scroll de la página.
    setTimeout(() => scrollToSection(sectionId), 250);
  };

  const handleSuggestion = (action: SuggestionAction) => {
    switch (action) {
      case 'quote':
        setMenuView('quote');
        break;
      case 'whatsapp':
        openWhatsApp(`Hola, quiero cotizar un evento en ${site.name}.`);
        closeMenu();
        break;
      case 'email':
        goToSection('formulario');
        break;
    }
  };

  // Al abrir: buscador limpio y, en escritorio, foco en el campo de búsqueda.
  useEffect(() => {
    if (!menu.open) return;
    setSearch('');
    if (!isMobile && menu.view === 'main') {
      const timer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(timer);
    }
  }, [menu.open, menu.view, isMobile]);

  return (
    <DialogPrimitive.Root open={menu.open} onOpenChange={(open) => !open && closeMenu()}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-ebano/70 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <DialogPrimitive.Content
          aria-describedby={undefined}
          onOpenAutoFocus={(e) => isMobile && e.preventDefault()}
          className="fixed left-[50%] top-[50%] z-50 w-[calc(100%-2rem)] max-w-[540px] translate-x-[-50%] translate-y-[-50%] duration-200 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
        >
          <DialogPrimitive.Title className="sr-only">Menú de {site.name}</DialogPrimitive.Title>
          <div className="tone-marfil flex max-h-[85vh] flex-col overflow-y-auto rounded-[1.75rem] border border-foreground/10 !bg-papel shadow-2xl">
            <AnimatePresence mode="wait">
              {menu.view === 'main' && (
                <CommandPrimitive key="main" className="flex flex-col" loop shouldFilter>
                  {/* Search Input */}
                  <div className="flex items-center border-b border-foreground/20 px-4">
                    <Search className="mr-3 h-5 w-5 shrink-0 text-muted-foreground" />
                    <CommandPrimitive.Input
                      ref={inputRef}
                      value={search}
                      onValueChange={setSearch}
                      placeholder="¿Qué quieres hacer?"
                      className="flex h-14 w-full bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground"
                    />
                  </div>

                  {/* Content */}
                  <CommandPrimitive.List className="max-h-[400px] overflow-y-auto p-2">
                    <CommandPrimitive.Empty className="py-6 text-center text-sm text-muted-foreground">
                      No encontramos eso. Prueba con “cotizar” o “WhatsApp”.
                    </CommandPrimitive.Empty>

                    {/* Suggestions */}
                    <CommandPrimitive.Group heading="Cotizar" className={`px-2 py-2 ${groupHeading}`}>
                      {suggestions.map((suggestion) => (
                        <CommandPrimitive.Item
                          key={suggestion.action}
                          value={suggestion.label}
                          keywords={suggestion.keywords}
                          onSelect={() => handleSuggestion(suggestion.action)}
                          className="flex w-full items-center gap-3 px-3 py-3 rounded-2xl cursor-pointer transition-colors text-left data-[selected=true]:bg-verde-niebla/70"
                        >
                          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-verde-niebla text-verde-profundo"><suggestion.icon className="w-[18px] h-[18px]" /></span>
                          <div className="flex flex-col">
                            <span className="text-sm font-medium text-foreground">{suggestion.label}</span>
                            <span className="text-xs text-muted-foreground">{suggestion.description}</span>
                          </div>
                        </CommandPrimitive.Item>
                      ))}
                    </CommandPrimitive.Group>
                  </CommandPrimitive.List>

                  {/* Footer hint */}
                  <div className="hidden md:flex items-center justify-between border-t border-foreground/20 px-4 py-2">
                    <span className="text-xs text-muted-foreground">ESC para cerrar</span>
                    <div className="flex items-center gap-1">
                      <kbd className="px-1.5 py-0.5 text-xs text-muted-foreground bg-foreground/10 rounded">↑↓</kbd>
                      <span className="text-xs text-muted-foreground">para moverte</span>
                    </div>
                  </div>
                </CommandPrimitive>
              )}

              {menu.view === 'quote' && (
                <QuoteWizard
                  key="quote"
                  preset={menu.preset}
                  onBack={() => setMenuView('main')}
                  onClose={closeMenu}
                />
              )}
            </AnimatePresence>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export default CommandMenu;
