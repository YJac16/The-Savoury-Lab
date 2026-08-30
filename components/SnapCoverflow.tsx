"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";

type SnapCoverflowProps = {
  children: ReactNode;
  ariaLabel: string;
  className?: string;
  onActiveIndexChange?: (index: number) => void;
  activeScale?: number;
  sideScale?: number;
  slideMs?: number;
};

export function SnapCoverflow({
  children,
  ariaLabel,
  className = "",
  onActiveIndexChange,
  activeScale = 1.08,
  sideScale = 0.92,
  slideMs = 620,
}: SnapCoverflowProps) {
  const items = Children.toArray(children);
  const count = items.length;

  const [activeIndex, setActiveIndex] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [step, setStep] = useState(300);
  const [motionEnabled, setMotionEnabled] = useState(true);

  const dragRef = useRef<{ startX: number; pointerId: number } | null>(null);
  const dragged = useRef(false);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const viewportRef = useRef<HTMLDivElement>(null);

  const measureStep = useCallback(() => {
    const a = slideRefs.current[0];
    const b = slideRefs.current[1];
    const next = a && b ? b.offsetLeft - a.offsetLeft : a ? a.offsetWidth + 12 : 300;
    setStep(next);
  }, []);

  useLayoutEffect(() => {
    measureStep();
    const viewport = viewportRef.current;
    if (!viewport) return;
    const ro = new ResizeObserver(measureStep);
    ro.observe(viewport);
    return () => ro.disconnect();
  }, [measureStep, count]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setMotionEnabled(!mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    onActiveIndexChange?.(activeIndex);
  }, [activeIndex, onActiveIndexChange]);

  const wrapIndex = useCallback(
    (index: number) => {
      if (count === 0) return 0;
      return ((index % count) + count) % count;
    },
    [count],
  );

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setAnimating(true);
      setActiveIndex(wrapIndex(index));
      setDragOffset(0);
    },
    [count, wrapIndex],
  );

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    dragRef.current = { startX: e.clientX, pointerId: e.pointerId };
    dragged.current = false;
    setAnimating(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    const offset = e.clientX - drag.startX;
    if (Math.abs(offset) > 6) dragged.current = true;
    setDragOffset(offset);
  };

  const finishDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== e.pointerId) return;
    dragRef.current = null;
    e.currentTarget.releasePointerCapture(e.pointerId);

    const threshold = Math.max(48, step * 0.22);
    let next = activeIndex;
    if (dragOffset <= -threshold) next += 1;
    else if (dragOffset >= threshold) next -= 1;
    goTo(next);
  };

  if (count === 0) return null;

  const trackOffset = -activeIndex * step + dragOffset;

  return (
    <div ref={viewportRef} className={`snap-coverflow ${className}`.trim()}>
      <div
        role="region"
        aria-label={ariaLabel}
        aria-roledescription="carousel"
        tabIndex={0}
        className="cursor-grab overflow-hidden touch-pan-y active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") {
            e.preventDefault();
            goTo(activeIndex + 1);
          }
          if (e.key === "ArrowLeft") {
            e.preventDefault();
            goTo(activeIndex - 1);
          }
        }}
        onClickCapture={(e) => {
          if (dragged.current) {
            e.preventDefault();
            e.stopPropagation();
            dragged.current = false;
          }
        }}
      >
        <div
          className="flex w-max items-center gap-3"
          style={{
            transform: `translate3d(${trackOffset}px, 0, 0)`,
            transition:
              animating && motionEnabled
                ? `transform ${slideMs}ms cubic-bezier(0.22, 1, 0.36, 1)`
                : "none",
            willChange: "transform",
            paddingInline: "max(1.25rem, calc(50% - var(--coverflow-slide-half)))",
          }}
        >
          {items.map((child, index) => {
            if (!isValidElement(child)) return child;

            const distance = Math.abs(index - activeIndex);
            const isActive = index === activeIndex;
            const scale = motionEnabled
              ? isActive
                ? activeScale
                : distance === 1
                  ? sideScale
                  : sideScale * 0.92
              : 1;
            const opacity = motionEnabled
              ? isActive
                ? 1
                : distance === 1
                  ? 0.94
                  : 0.78
              : 1;

            return (
              <div
                key={child.key ?? index}
                ref={(el) => {
                  slideRefs.current[index] = el;
                }}
                className="coverflow-slide shrink-0 origin-center transition-[transform,opacity] duration-500 ease-out"
                style={{
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex: isActive ? 3 : distance === 1 ? 2 : 1,
                }}
                aria-hidden={!isActive}
              >
                {cloneElement(child as ReactElement<{ draggable?: boolean }>, {
                  draggable: false,
                })}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4 flex justify-center gap-1" aria-hidden="true">
        {items.map((_, index) => (
          <button
            key={index}
            type="button"
            tabIndex={-1}
            aria-label={`Go to slide ${index + 1}`}
            className="flex h-11 w-11 items-center justify-center"
            onClick={() => goTo(index)}
          >
            <span
              className={`block rounded-full transition-all ${
                index === activeIndex ? "h-2.5 w-6 bg-accent" : "h-2.5 w-2.5 bg-neutral-muted"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
