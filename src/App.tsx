import { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import Footer from '@/components/layout/Footer';
import HeroSection from '@/components/sections/HeroSection';
import PresentationSection from '@/components/sections/PresentationSection';
import SpacesSection from '@/components/sections/SpacesSection';
import CapacitySection from '@/components/sections/CapacitySection';
import ServicesSection from '@/components/sections/ServicesSection';
import MenusSection from '@/components/sections/MenusSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import HostSection from '@/components/sections/HostSection';
import QuoteSection from '@/components/sections/QuoteSection';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { SiteActionsProvider, useSiteActions } from '@/hooks/useSiteActions';

// El menú y el cotizador se descargan aparte: no hacen falta para pintar la página.
const loadCommandMenu = () => import('@/components/ui/CommandMenu');
const CommandMenu = lazy(loadCommandMenu);

const Page = () => {
  const { menu, openMenu, closeMenu } = useSiteActions();
  const [menuRequested, setMenuRequested] = useState(false);

  useEffect(() => {
    if (menu.open) setMenuRequested(true);
  }, [menu.open]);

  // Se adelanta la descarga cuando el navegador queda libre, para que abra al instante.
  useEffect(() => {
    const timer = window.setTimeout(loadCommandMenu, 2500);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        if (menu.open) closeMenu();
        else openMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menu.open, openMenu, closeMenu]);

  return (
    <>
      <ScrollProgress />

      {/* La página pasa por encima del pie y, con su borde curvo, lo revela al llegar al final.
          Nota: sin `overflow: hidden` aquí; rompería las escenas ancladas (sticky). */}
      <main className="relative z-[1] rounded-b-sheet bg-background">
        <HeroSection />
        <PresentationSection />
        <div className="tone-marfil relative z-20 -mt-12 rounded-b-sheet rounded-t-sheet">
          <SpacesSection />
          <CapacitySection />
          <ServicesSection />
          <MenusSection />
          <ExperiencesSection />
          <HostSection />
          <QuoteSection />
        </div>
      </main>
      <Footer />

      <WhatsAppButton />
      {menuRequested && (
        <Suspense fallback={null}>
          <CommandMenu />
        </Suspense>
      )}
      <Toaster position="bottom-center" toastOptions={{ className: 'font-sans' }} />
    </>
  );
};

// reducedMotion="user": si la persona pidió reducir el movimiento, se omiten los desplazamientos.
const App = () => (
  <MotionConfig reducedMotion="user">
    <SiteActionsProvider>
      <Page />
    </SiteActionsProvider>
  </MotionConfig>
);

export default App;
