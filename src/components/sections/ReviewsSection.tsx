import React from 'react';
import { Star } from 'lucide-react';
import Reveal from '@/components/ui/Reveal';
import { reviews, reviewsIntro, site, type Review } from '@/config/site';

const Stars: React.FC<{ rating: number }> = ({ rating }) => (
  <span className="flex gap-1" role="img" aria-label={`${rating} de 5 estrellas`}>
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={18}
        strokeWidth={1.5}
        className={star <= rating ? 'fill-verde text-verde' : 'text-verde/45'}
      />
    ))}
  </span>
);

const ReviewCard: React.FC<{ review: Review }> = ({ review }) => (
  <figure className="flex h-full flex-col rounded-3xl bg-papel p-7 shadow-[0_18px_40px_-30px_rgba(42,57,39,0.45)] md:p-9">
    <Stars rating={review.rating} />
    <blockquote className="display prose-justify mt-5 text-[1.15rem] leading-relaxed text-verde-profundo md:text-[1.25rem]">
      “{review.text}”
    </blockquote>
    <figcaption className="mt-auto pt-6 text-sm">
      <span className="block font-semibold text-foreground">{review.author}</span>
      <span className="copy block text-[13px]">{review.detail}</span>
    </figcaption>
  </figure>
);

/* Reseñas de Google: tarjetas fijas (lado a lado en escritorio, una bajo la
   otra en teléfono), con la calificación de la casa sobre ellas. */
const ReviewsSection: React.FC = () => {
  if (reviews.length === 0) return null;

  return (
    <section id="resenas" className="relative overflow-x-clip pb-8 pt-16 md:pb-12 md:pt-24">
      <div className="page">
        <Reveal>
          <p className="eyebrow">Reseñas de Google</p>
          <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3.5rem)] leading-[1.15] text-verde">
            {reviewsIntro[0]} <br />
            {reviewsIntro[1]}
          </h2>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-verde px-4 py-1.5 text-sm font-semibold text-white">
            {site.googleRating}
            <Star size={15} className="fill-white text-white" aria-hidden="true" />
            <span className="font-medium">en Google</span>
          </p>
        </Reveal>

        <ul className={`mt-10 grid gap-5 ${reviews.length > 2 ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-2'}`}>
          {reviews.map((review, index) => (
            <li key={review.author} className="flex">
              <Reveal delay={index * 0.08} className="w-full">
                <ReviewCard review={review} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ReviewsSection;
