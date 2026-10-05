import { lazy, Suspense, useEffect, useState } from 'react';
import { MotionConfig } from 'framer-motion';
import { Toaster } from 'sonner';
import Footer from '@/components/layout/Footer';
import Header from '@/components/layout/Header';
import HeroSection from '@/components/sections/HeroSection';
import ChapterSection from '@/components/sections/ChapterSection';
import StatementSection from '@/components/sections/StatementSection';
import ServicesSection from '@/components/sections/ServicesSection';
import MenusSection from '@/components/sections/MenusSection';
import ExperiencesSection from '@/components/sections/ExperiencesSection';
import AlliancesSection from '@/components/sections/AlliancesSection';
import QuoteSection from '@/components/sections/QuoteSection';
import ScrollProgress from '@/components/ui/ScrollProgress';
import WhatsAppButton from '@/components/ui/WhatsAppButton';
import { celebrateChapter, hostChapter, houseChapter } from '@/config/site';
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
      <Header />

      {/* La página pasa por encima del pie y, con su borde curvo, lo revela al llegar al final.
          Nota: sin `overflow: hidden` aquí; rompería las escenas ancladas (sticky). */}
      <main className="relative z-[1] rounded-b-sheet bg-background">
        <HeroSection />
        <ChapterSection chapter={houseChapter} />
        <ChapterSection chapter={hostChapter} />
        <StatementSection />
        <ChapterSection chapter={celebrateChapter} />
        <ServicesSection />
        <MenusSection />
        <div className="tone-marfil relative rounded-b-sheet">
          <ExperiencesSection />
          <AlliancesSection />
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
