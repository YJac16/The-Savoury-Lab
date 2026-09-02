import { COLLECT_LAT, COLLECT_LON } from "@/lib/site";

const bboxPad = 0.003;
const bbox = [
  COLLECT_LON - bboxPad,
  COLLECT_LAT - bboxPad,
  COLLECT_LON + bboxPad,
  COLLECT_LAT + bboxPad,
].join("%2C");

const embedSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${COLLECT_LAT}%2C${COLLECT_LON}`;

export function CollectMap() {
  return (
    <div className="mt-6 overflow-hidden rounded-sm border border-neutral-muted shadow-soft">
      <iframe
        title="Collect at 52 Goldbourne Road, Kenilworth"
        src={embedSrc}
        className="h-56 w-full border-0"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
