import React, { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { QuoteData } from '@/lib/quote';
import { scrollToSection } from '@/lib/utils';

export type MenuView = 'main' | 'quote';

interface MenuState {
  open: boolean;
  view: MenuView;
  // Datos con los que parte el asistente de cotización (p. ej. la modalidad elegida).
  preset: QuoteData;
}

interface SiteActionsContextType {
  menu: MenuState;
  // Borrador que el asistente le entrega al formulario del final de la página.
  formDraft: QuoteData | null;
  openMenu: () => void;
  openQuote: (preset?: QuoteData) => void;
  setMenuView: (view: MenuView) => void;
  closeMenu: () => void;
  continueByEmail: (data: QuoteData) => void;
}

const SiteActionsContext = createContext<SiteActionsContextType | undefined>(undefined);

export const SiteActionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [menu, setMenu] = useState<MenuState>({ open: false, view: 'main', preset: {} });
  const [formDraft, setFormDraft] = useState<QuoteData | null>(null);

  const openMenu = useCallback(() => setMenu({ open: true, view: 'main', preset: {} }), []);

  const openQuote = useCallback(
    (preset: QuoteData = {}) => setMenu({ open: true, view: 'quote', preset }),
    []
  );

  const setMenuView = useCallback(
    (view: MenuView) => setMenu((prev) => ({ ...prev, view })),
    []
  );

  const closeMenu = useCallback(() => setMenu((prev) => ({ ...prev, open: false })), []);

  const continueByEmail = useCallback((data: QuoteData) => {
    setFormDraft(data);
    setMenu((prev) => ({ ...prev, open: false }));
    // Espera a que el diálogo se cierre y libere el scroll de la página.
    setTimeout(() => scrollToSection('formulario'), 250);
  }, []);

  const value = useMemo(
    () => ({ menu, formDraft, openMenu, openQuote, setMenuView, closeMenu, continueByEmail }),
    [menu, formDraft, openMenu, openQuote, setMenuView, closeMenu, continueByEmail]
  );

  return <SiteActionsContext.Provider value={value}>{children}</SiteActionsContext.Provider>;
};

export const useSiteActions = (): SiteActionsContextType => {
  const context = useContext(SiteActionsContext);
  if (!context) {
    throw new Error('useSiteActions must be used within a SiteActionsProvider');
  }
  return context;
};
