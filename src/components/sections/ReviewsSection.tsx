import React from 'react';
import { ArrowUpRight, Star } from 'lucide-react';
import CarouselArrows from '@/components/ui/CarouselArrows';
import Reveal from '@/components/ui/Reveal';
import { reviewPlaceholders, reviews, reviewsIntro, site, type Review } from '@/config/site';
import { useCarousel } from '@/hooks/useCarousel';

const Stars: React.FC<{ rating: number; muted?: boolean }> = ({ rating, muted }) => (
  <span className="flex gap-1" role="img" aria-label={muted ? 'Estrellas de la reseña' : `${rating} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={18}
        strokeWidth={1.5}
        className={!muted && star <= rating ? 'fill-verde text-verde' : 'text-verde/45'}
      />
    ))}
  </span>
);

const cardClass =
  'flex h-full w-[82vw] max-w-[400px] flex-col rounded-3xl bg-papel p-7 shadow-[0_18px_40px_-30px_rgba(42,57,39,0.45)] md:w-[400px] md:p-8';

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <figure className={cardClass}>
    <div className="flex items-center justify-between gap-3">
      <Stars rating={review.rating} />
      {review.sample && (
        <span className="rounded-full border border-verde/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-verde/80">
          Ejemplo
        </span>
      )}
    </div>
    <blockquote className="display mt-5 text-[1.15rem] leading-relaxed text-verde-profundo">
      “{review.text}”
    </blockquote>
    <figcaption className="mt-auto pt-6 text-sm">
      <span className="block font-semibold text-foreground">{review.author}</span>
      <span className="copy block text-[13px]">
        {review.date ? `${review.date} · ` : ''}Reseña de Google
      </span>
    </figcaption>
  </figure>
);

/* Tarjeta de muestra: enseña cómo se verá una reseña, sin inventar ninguna. */
const PlaceholderCard: React.FC = () => (
  <div className={`${cardClass} border border-dashed border-verde/35 !bg-transparent !shadow-none`}>
    <Stars rating={0} muted />
    <p className="display mt-5 text-[1.15rem] leading-relaxed text-verde/70">
      Aquí irá una reseña real de Google, tal como la escribió el cliente.
    </p>
    <p className="mt-auto pt-6 text-sm">
      <span className="block font-semibold text-foreground/70">Nombre del cliente</span>
      <span className="copy block text-[13px]">Tarjeta de muestra · Próximamente</span>
    </p>
  </div>
);

/* Reseñas de Google: tarjetas que se recorren hacia el lado con las flechas. */
const ReviewsSection: React.FC = () => {
  const { scrollerRef, edges, updateEdges, step } = useCarousel(20);
  const hasReviews = reviews.length > 0;
  const googleUrl = site.googleReviewsUrl || site.mapsUrl;

  return (
    <section id="resenas" className="relative overflow-x-clip pb-8 pt-16 md:pb-12 md:pt-24">
      <Reveal className="page flex items-end justify-between gap-6">
        <div>
          <p className="eyebrow">Reseñas de Google</p>
          <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.15] text-verde">
            {reviewsIntro[0]} <br />
            {reviewsIntro[1]}
          </h2>
        </div>
        <CarouselArrows label="Reseñas" atStart={edges.atStart} atEnd={edges.atEnd} onStep={step} />
      </Reveal>

      <div
        ref={scrollerRef}
        onScroll={updateEdges}
        role="group"
        aria-label="Reseñas de Google: desliza hacia los lados"
        className="no-scrollbar mt-10 snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-px-[var(--gutter)] pb-8 pt-1"
      >
        <ul className="flex w-max gap-5 px-[var(--gutter)]">
          {hasReviews
            ? reviews.map((review) => (
                <li key={`${review.author}-${review.date}`} className="flex snap-start">
                  <ReviewCard review={review} />
                </li>
              ))
            : Array.from({ length: reviewPlaceholders }, (_, index) => (
                <li key={index} className="flex snap-start">
                  <PlaceholderCard />
                </li>
              ))}
        </ul>
      </div>

      <Reveal className="page">
        <a href={googleUrl} target="_blank" rel="noopener noreferrer" className="pill pill-ghost group/cta min-h-11">
          Ver la casa en Google
          <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
        </a>
      </Reveal>
    </section>
  );
};

export default ReviewsSection;
