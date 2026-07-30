import {useRef} from 'react';
import {motion, useReducedMotion, useScroll, useTransform} from 'framer-motion';
import {BRAND} from '~/lib/brand';
import {Button} from '~/components/ui/Button';
import {FadeIn} from '~/components/ui/FadeIn';

type HeroProps = {
  posterUrl?: string;
  videoUrl?: string;
};

export function Hero({posterUrl, videoUrl}: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const {scrollYProgress} = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '24%'],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['0%', '12%'],
  );
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.55, 0.75]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-svh items-end overflow-hidden bg-brand"
      aria-label="Hero"
    >
      <motion.div
        className="absolute inset-0 -z-10"
        style={{y: backgroundY}}
        aria-hidden="true"
      >
        {videoUrl && !prefersReducedMotion ? (
          <video
            className="media-parallax"
            autoPlay
            muted
            loop
            playsInline
            poster={posterUrl}
            preload="metadata"
            aria-hidden="true"
          >
            <source src={videoUrl} type="video/mp4" />
            <track kind="captions" />
          </video>
        ) : posterUrl ? (
          <img
            src={posterUrl}
            alt=""
            className="media-parallax"
            loading="eager"
            fetchPriority="high"
          />
        ) : (
          <div className="surface-hero-fallback h-full w-full" />
        )}
        <div className="surface-hero-scrim absolute inset-0" />
        <motion.div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            opacity: overlayOpacity,
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.85\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\' opacity=\'0.5\'/%3E%3C/svg%3E")',
          }}
        />
      </motion.div>

      <motion.div
        style={{y: contentY}}
        className="container-premium w-full pb-16 pt-32 sm:pb-24 sm:pt-40"
      >
        <FadeIn delay={0.1}>
          <p className="eyebrow mb-5 text-accent-soft">{BRAND.name}</p>
          <h1 className="max-w-3xl text-balance text-4xl leading-[1.08] text-brand-inverse sm:text-5xl md:text-6xl lg:text-7xl">
            Handcrafted Frozen Savouries
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-inverse/80 sm:text-lg">
            Made with quality ingredients. Prepared fresh. Frozen for your
            convenience.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button to="/collections/all" variant="primary">
              Shop Now
            </Button>
            <Button to="/wholesale" variant="secondary">
              Wholesale Orders
            </Button>
          </div>
        </FadeIn>
      </motion.div>
    </section>
  );
}
