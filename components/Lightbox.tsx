"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  images: string[];
  initialIndex?: number;
  onClose: () => void;
};

export default function Lightbox({ images, initialIndex = 0, onClose }: Props) {
  const [idx, setIdx] = useState(initialIndex);
  const [zoom, setZoom] = useState(false);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setIdx((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft") setIdx((i) => (i - 1 + images.length) % images.length);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [images.length, onClose]);

  useEffect(() => {
    // reset zoom when image changes
    setZoom(false);
  }, [idx]);

  if (!images || images.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80" onClick={onClose} />

      <div className="relative z-10 max-w-[90vw] max-h-[90vh] w-[min(1100px,90vw)]">
        <button className="absolute right-2 top-2 z-20 rounded px-2 py-1 bg-black/40 text-white" onClick={onClose} aria-label="Close">
          Затвори
        </button>

        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white"
          onClick={() => setIdx((i) => (i - 1 + images.length) % images.length)}
          aria-label="Previous"
        >
          ‹
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/40 p-2 text-white"
          onClick={() => setIdx((i) => (i + 1) % images.length)}
          aria-label="Next"
        >
          ›
        </button>

        <div className="relative h-[75vh] w-full overflow-hidden rounded">
          <div
            className={`absolute inset-0 transition-transform duration-300 ${zoom ? "scale-150" : "scale-100"}`}
            onClick={() => setZoom((s) => !s)}
          >
            <Image src={images[idx]} alt={`Image ${idx + 1}`} fill className="object-contain" />
          </div>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2 overflow-auto">
          {images.map((im, i) => (
            <button
              key={im}
              onClick={() => setIdx(i)}
              className={`h-16 w-24 overflow-hidden rounded ${i === idx ? "ring-2 ring-[color:var(--accent)]" : "opacity-70 hover:opacity-100"}`}
            >
              <Image src={im} alt={`thumb ${i + 1}`} width={96} height={64} className="object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
