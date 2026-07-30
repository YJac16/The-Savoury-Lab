import {useState} from 'react';
import {Image} from '@shopify/hydrogen';
import {AnimatePresence, motion, useReducedMotion} from 'framer-motion';

type GalleryImage = {
  id?: string | null;
  url: string;
  altText?: string | null;
  width?: number | null;
  height?: number | null;
};

type ProductGalleryProps = {
  images: GalleryImage[];
  title: string;
};

export function ProductGallery({images, title}: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [zoomed, setZoomed] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const active = images[activeIndex] ?? images[0];

  if (!active) {
    return (
      <div className="flex aspect-square items-center justify-center bg-neutral-muted">
        <span className="font-display text-2xl text-brand/50">{title}</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <button
        type="button"
        className="group relative block w-full cursor-zoom-in overflow-hidden bg-neutral focus-visible:outline-offset-4"
        onClick={() => setZoomed(true)}
        aria-label={`View larger image of ${title}`}
      >
        <Image
          data={active}
          alt={active.altText || title}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-premium group-hover:scale-105"
          sizes="(min-width: 1024px) 50vw, 100vw"
          loading="eager"
        />
        <span className="pointer-events-none absolute bottom-4 right-4 bg-brand-inverse/90 px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.14em] text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          Zoom
        </span>
      </button>

      {images.length > 1 && (
        <ul className="grid grid-cols-4 gap-3" aria-label="Product images">
          {images.slice(0, 8).map((image, index) => {
            const selected = index === activeIndex;
            return (
              <li key={image.id ?? `${image.url}-${index}`}>
                <button
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show image ${index + 1} of ${title}`}
                  aria-pressed={selected}
                  className={`overflow-hidden bg-neutral transition-all duration-300 focus-visible:outline-offset-4 ${
                    selected
                      ? 'ring-1 ring-accent ring-offset-2'
                      : 'opacity-80 hover:opacity-100'
                  }`}
                >
                  <Image
                    data={image}
                    alt={image.altText || `${title} ${index + 1}`}
                    className="aspect-square w-full object-cover"
                    sizes="120px"
                    loading="lazy"
                  />
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <AnimatePresence>
        {zoomed && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-brand/90 p-4 backdrop-blur-sm"
            initial={prefersReducedMotion ? false : {opacity: 0}}
            animate={{opacity: 1}}
            exit={prefersReducedMotion ? undefined : {opacity: 0}}
            role="dialog"
            aria-modal="true"
            aria-label={`${title} image zoom`}
            onClick={() => setZoomed(false)}
          >
            <button
              type="button"
              className="absolute right-5 top-5 text-xs uppercase tracking-[0.16em] text-brand-inverse/80 hover:text-accent-soft"
              onClick={() => setZoomed(false)}
              aria-label="Close zoom"
            >
              Close
            </button>
            <motion.div
              className="lightbox-frame max-w-5xl overflow-hidden"
              initial={prefersReducedMotion ? false : {scale: 0.96}}
              animate={{scale: 1}}
              exit={prefersReducedMotion ? undefined : {scale: 0.96}}
              onClick={(event) => event.stopPropagation()}
            >
              <Image
                data={active}
                alt={active.altText || title}
                className="lightbox-image"
                sizes="90vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
