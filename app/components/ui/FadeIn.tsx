import {motion, useReducedMotion} from 'framer-motion';
import type {ReactNode} from 'react';

const MOTION_TAGS = {
  div: motion.div,
  section: motion.section,
  article: motion.article,
  header: motion.header,
  footer: motion.footer,
  li: motion.li,
  span: motion.span,
  p: motion.p,
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type MotionTag = keyof typeof MOTION_TAGS;

type FadeInProps = {
  as?: MotionTag;
  children?: ReactNode;
  className?: string;
  delay?: number;
};

export function FadeIn({
  as = 'div',
  children,
  className,
  delay = 0,
}: FadeInProps) {
  const Component = MOTION_TAGS[as] ?? motion.div;
  const prefersReducedMotion = useReducedMotion();

  return (
    <Component
      className={className}
      initial={{opacity: 0, y: 24}}
      whileInView={{opacity: 1, y: 0}}
      viewport={{once: true, amount: 0.2}}
      transition={
        prefersReducedMotion
          ? {duration: 0, delay: 0}
          : {
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
              delay,
            }
      }
    >
      {children}
    </Component>
  );
}
