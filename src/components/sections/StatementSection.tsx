import React, { useRef } from 'react';
import { motion, useTransform, type MotionValue } from 'framer-motion';
import { Ornament } from '@/components/ui/Brand';
import { hostStatement } from '@/config/site';
import { useMotionEnabled, useScrollProgress } from '@/lib/motion';

const words = hostStatement.split(' ');

const Word: React.FC<{ word: string; index: number; progress: MotionValue<number> }> = ({
  word,
  index,
  progress,
}) => {
  const start = index / words.length;
  const opacity = useTransform(progress, [start, start + 1.5 / words.length], [0.18, 1]);

  return <motion.span style={{ opacity }}>{word} </motion.span>;
};

/* Frase de la casa: las palabras se encienden una a una con el scroll. */
const StatementSection: React.FC = () => {
  const ref = useRef<HTMLParagraphElement>(null);
  const motionOn = useMotionEnabled();
  const progress = useScrollProgress(ref, ['start 0.85', 'end 0.45']);

  return (
    <section className="tone-marfil py-20 md:py-32">
      <div className="page flex flex-col items-center text-center">
        <p ref={ref} className="display max-w-[980px] text-statement text-verde">
          {motionOn
            ? words.map((word, index) => (
                <Word key={`${word}-${index}`} word={word} index={index} progress={progress} />
              ))
            : hostStatement}
        </p>
        <Ornament className="mt-10 h-auto w-[112px]" />
      </div>
    </section>
  );
};

export default StatementSection;
