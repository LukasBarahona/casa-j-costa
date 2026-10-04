import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { Wordmark } from '@/components/ui/Brand';
import { host } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

const words = host.statement.split(' ');

const Word: React.FC<{ word: string; index: number; progress: MotionValue<number> }> = ({
  word,
  index,
  progress,
}) => {
  const start = index / words.length;
  const opacity = useTransform(progress, [start, start + 1.5 / words.length], [0.16, 1]);

  return <motion.span style={{ opacity }}>{word} </motion.span>;
};

/* Frase del anfitrión: las palabras se encienden una a una con el scroll. */
const Statement: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const motionOn = useMotionEnabled();
  const scrollYProgress = useScrollProgress(ref, ['start 0.85', 'end 0.45']);

  return (
    <p ref={ref} className="display text-statement text-foreground">
      {motionOn
        ? words.map((word, index) => (
            <Word key={`${word}-${index}`} word={word} index={index} progress={scrollYProgress} />
          ))
        : host.statement}
    </p>
  );
};

/* El anfitrión: retrato cuadrado, quién es y su frase. */
const HostSection: React.FC = () => {
  return (
    <section id="anfitrion" className="px-3 pb-3 md:px-6 md:pb-6">
      <div className="tone-ebano rounded-sheet">
        <div className="page py-20 md:py-28">
          <div className="flex flex-col gap-14 md:flex-row md:items-center md:gap-16 lg:gap-28">
            {/* Retrato cuadrado */}
            <Reveal className="group mx-auto w-full max-w-[320px] flex-shrink-0 md:mx-0 md:w-[min(34vw,400px)] md:max-w-none">
              <Photo
                src={host.image}
                alt={host.imageAlt}
                className="aspect-square rounded-[2rem]"
                parallax={false}
              />
            </Reveal>

            {/* Quién es */}
            <Reveal delay={0.1} className="max-w-[480px]">
              <p className="eyebrow">04 / El anfitrión</p>
              <h2 className="display mt-6 text-title text-foreground">{host.name || host.role}</h2>
              {host.name && <p className="mt-2 text-lead text-muted-foreground">{host.role}</p>}
              <div className="mt-8 space-y-4">
                {host.bio.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed text-muted-foreground">
                    {paragraph}
                  </p>
                ))}
              </div>
              <div className="mt-10 flex items-center gap-4 text-accent">
                <span className="h-px w-10 bg-accent/60" />
                <Wordmark className="text-[13px]" />
              </div>
            </Reveal>
          </div>

          <div className="mt-16 border-t border-foreground/15 pt-12 md:mt-24 md:pt-16">
            <Statement />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HostSection;
