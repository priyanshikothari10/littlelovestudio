"use client";

import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import BouquetBuilder from "./BouquetBuilder";
type SelectedFlower = {
  id: string;
  index?: number;
};
type AnimationPreviewProps = {
  bouquet?: SelectedFlower[];
  photoUrls?: string[];
  videoUrls?: string[];
  loveLetter?: string;
  animationName?: string;
};

const petalColors = [
  "bg-pink-200",
  "bg-rose-200",
  "bg-fuchsia-200",
  "bg-pink-100",
  "bg-rose-100",
];

export function AnimationPreview({
  bouquet,
  photoUrls,
  videoUrls,
  loveLetter,
  animationName,
}: AnimationPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const previewRef = useRef<HTMLDivElement | null>(null);
  const captureRef = useRef<HTMLDivElement | null>(null);

  const hasBouquet = bouquet && bouquet.length > 0;
  const hasPhotos = photoUrls && photoUrls.length > 0;
  const hasVideos = videoUrls && videoUrls.length > 0;
  const hasLetter = !!loveLetter && loveLetter.trim().length > 0;

  const bouquetLayers = useMemo(() => {
    const selected =
      bouquet && bouquet.length > 0
        ? bouquet
        : ([
            { id: "rose", index: 0 },
            { id: "tulip", index: 1 },
            { id: "daisy", index: 2 },
            { id: "sunflower", index: 3 },
          ] satisfies SelectedFlower[]);

    const centerX = 50;
    const centerY = 55;
    const radius = 18;

    return selected.map((flower, i) => {
      const angle = (i / Math.max(selected.length, 1)) * Math.PI * 2;
      const offsetX = Math.cos(angle) * radius;
      const offsetY = Math.sin(angle) * radius;
      const rotation = (i % 8) * 4 - 16;

      return {
        ...flower,
        left: `${centerX + offsetX}%`,
        top: `${centerY + offsetY}%`,
        rotation,
        zIndex: 10 + i,
      };
    });
  }, [bouquet]);

  const handleDownload = async () => {
    if (isDownloading) return;

    const target = captureRef.current || previewRef.current;
    if (!target) return;

    // html2canvas currently logs a console error when it encounters modern CSS
    // color functions like lab(). We temporarily silence that specific message
    // so it doesn't surface as a Next.js overlay.
    const originalConsoleError = console.error;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (console as any).error = (...args: unknown[]) => {
      const first = args[0];
      if (
        typeof first === "string" &&
        first.includes("Attempting to parse an unsupported color function \"lab\"")
      ) {
        return;
      }
      // eslint-disable-next-line prefer-spread
      originalConsoleError.apply(console, args as []);
    };

    try {
      setIsDownloading(true);

      const canvas = await html2canvas(target, {
        backgroundColor: "#ffe4f0",
        useCORS: false,
        scale: window.devicePixelRatio || 2,
        logging: false,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "little-love-surprise.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // eslint-disable-next-line no-console
      originalConsoleError("Failed to capture preview with html2canvas", error);
      // eslint-disable-next-line no-alert
      alert(
        "Something went wrong capturing your preview. Please try again in a moment."
      );
    } finally {
      // restore console.error no matter what
      (console as any).error = originalConsoleError;
      setIsDownloading(false);
    }
  };

  const handleShare = () => {
    const fakeId = Math.random().toString(36).slice(2, 8).toUpperCase();
    const placeholderLink = `https://littlelovestudio.example/share/${fakeId}`;

    // eslint-disable-next-line no-alert
    alert(
      `Share link (placeholder):\n\n${placeholderLink}\n\nLater this will copy a real link to your clipboard.`
    );
  };

  return (
    <section className="w-full max-w-4xl mx-auto rounded-3xl border border-pink-100/70 bg-gradient-to-br from-pink-50 via-rose-50 to-pink-100/90 shadow-xl px-4 py-6 sm:px-8 sm:py-8 space-y-6 sm:space-y-8">
      <header className="space-y-1">
        <h2 className="text-xl sm:text-2xl font-semibold text-pink-700 flex items-center gap-2">
          Animation Preview &amp; Download
          <span className="text-2xl" aria-hidden="true">
            ✨
          </span>
        </h2>
        <p className="text-sm sm:text-base text-pink-700/80">
          See your bouquet, photos, and love letter come together in a soft,
          magical moment.
        </p>
      </header>

      {/* Visible preview that users see */}
      <div
        ref={previewRef}
        className="relative rounded-3xl bg-gradient-to-br from-pink-100 via-rose-100 to-pink-200 border border-pink-100 shadow-inner shadow-pink-200 overflow-hidden px-4 py-5 sm:px-6 sm:py-6"
      >
        {/* Floating petals background */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          {Array.from({ length: 14 }).map((_, i) => {
            const delay = (i % 7) * 0.6;
            const duration = 8 + (i % 4);
            const left = (i * 7) % 100;

            return (
              <motion.span
                key={i}
                className={`absolute h-3 w-5 rounded-full ${petalColors[i % petalColors.length]} opacity-70`}
                style={{ left: `${left}%`, top: "-10%" }}
                initial={{ y: "-10%", x: 0, rotate: 0, opacity: 0 }}
                animate={{
                  y: "120%",
                  x: [0, -10, 5],
                  rotate: [0, 20, -10],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration,
                  delay,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}
        </div>

        <div className="relative grid gap-5 sm:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] items-stretch">
          {/* Bouquet */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-center gap-3"
          >
            <div className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-b from-pink-50 via-rose-50 to-pink-200 border border-pink-100 shadow-md shadow-pink-200 overflow-hidden">
              {bouquetLayers.map((layer, i) => {
                const flower = FLOWERS.find(
                  (f) => f.id === (layer.id as FlowerId)
                )!;
                return (
                  <motion.div
                    key={`${layer.id}-${i}`}
                    style={{
                      left: layer.left,
                      top: layer.top,
                      zIndex: layer.zIndex,
                    }}
                    initial={{ opacity: 0, scale: 0.7, y: 10 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      y: [0, -3, 0],
                      rotate: layer.rotation,
                    }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                      y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                      rotate: { duration: 0.3 },
                    }}
                    className="absolute w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 flex items-center justify-center drop-shadow-md border border-pink-100"
                  >
                    <span className="text-2xl sm:text-3xl">{flower.emoji}</span>
                  </motion.div>
                );
              })}

              <div className="absolute bottom-3 inset-x-0 flex items-center justify-center">
                <div className="h-9 w-24 bg-emerald-600 rounded-full blur-md opacity-40" />
              </div>
            </div>
            <p className="text-xs sm:text-sm text-pink-700/85 text-center px-4">
              {hasBouquet
                ? "Your custom bouquet, layered softly like real petals."
                : "Example bouquet shown. Your real flowers will appear here."}
            </p>
          </motion.div>

          {/* Photos + letter */}
          <div className="space-y-4 sm:space-y-5">
            {(hasPhotos || hasVideos) && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
                className="rounded-2xl bg-white/85 border border-pink-100 shadow-sm p-3 sm:p-3.5 space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-pink-700">
                    Memories
                  </h3>
                  <span className="text-[11px] text-pink-500">
                    {(photoUrls?.length ?? 0) +
                      (videoUrls?.length ?? 0)}{" "}
                    item
                    {((photoUrls?.length ?? 0) +
                      (videoUrls?.length ?? 0)) === 1
                      ? ""
                      : "s"}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 sm:gap-2">
                  {photoUrls?.slice(0, 6).map((url, i) => (
                    <div
                      key={`img-${url}-${i}`}
                      className="rounded-xl overflow-hidden border border-pink-100 bg-pink-50"
                    >
                      <img
                        src={url}
                        alt={`Uploaded ${i + 1}`}
                        className="h-16 w-full object-cover sm:h-20"
                      />
                    </div>
                  ))}
                  {videoUrls?.slice(0, 3).map((url, i) => (
                    <div
                      key={`vid-${url}-${i}`}
                      className="rounded-xl overflow-hidden border border-pink-100 bg-pink-50 flex items-center justify-center"
                    >
                      <video
                        src={url}
                        controls
                        data-html2canvas-ignore="true"
                        className="h-16 w-full object-cover sm:h-20"
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.25 }}
              className="rounded-2xl bg-gradient-to-br from-white via-rose-50 to-pink-100 border border-pink-100 shadow-sm p-3.5 sm:p-4 space-y-2.5"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-sm font-semibold text-pink-700 flex items-center gap-1.5">
                  Love Letter
                  <span aria-hidden="true">💌</span>
                </h3>
                {animationName && (
                  <span className="inline-flex items-center rounded-full bg-pink-500/10 text-[10px] sm:text-xs text-pink-700 px-2 py-0.5 border border-pink-300/50">
                    {animationName}
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-pink-800 whitespace-pre-line leading-relaxed">
                {hasLetter
                  ? loveLetter
                  : "Your future love letter will appear here, softly animated for someone special."}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Offscreen simplified capture area for reliable downloads */}
      <div className="fixed -left-[9999px] -top-[9999px] w-[800px]">
        <div
          ref={captureRef}
          className="relative rounded-3xl overflow-hidden px-8 py-8"
          style={{
            background: "#ffe4f0",
            border: "1px solid #f9c5d5",
          }}
        >
          <div className="relative flex gap-6 items-stretch">
            <div className="flex-1 flex flex-col items-center gap-3">
              <div
                className="relative w-64 h-64 rounded-full overflow-hidden"
                style={{
                  background: "#ffd6ea",
                  border: "1px solid #f9c5d5",
                  boxShadow: "0 18px 40px rgba(244, 114, 182, 0.4)",
                }}
              >
                {bouquetLayers.map((layer, i) => {
                  const flower = FLOWERS.find(
                    (f) => f.id === (layer.id as FlowerId)
                  )!;
                  return (
                    <div
                      key={`capture-${layer.id}-${i}`}
                      style={{
                        left: layer.left,
                        top: layer.top,
                        transform: `translate(-50%, -50%) rotate(${layer.rotation}deg)`,
                        zIndex: layer.zIndex,
                      }}
                      className="absolute w-16 h-16 rounded-full bg-white/90 flex items-center justify-center drop-shadow-md border border-pink-100"
                    >
                      <span className="text-2xl">{flower.emoji}</span>
                    </div>
                  );
                })}
                <div className="absolute bottom-3 inset-x-0 flex items-center justify-center">
                  <div className="h-9 w-24 bg-emerald-600 rounded-full blur-md opacity-40" />
                </div>
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center">
              <div
                className="rounded-2xl shadow-sm p-4 space-y-3"
                style={{
                  background: "#fff7fb",
                  border: "1px solid #f9c5d5",
                }}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-sm font-semibold text-pink-700 flex items-center gap-1.5">
                    Love Letter
                    <span aria-hidden="true">💌</span>
                  </h3>
                  {animationName && (
                    <span className="inline-flex items-center rounded-full bg-pink-500/10 text-[10px] text-pink-700 px-2 py-0.5 border border-pink-300/50">
                      {animationName}
                    </span>
                  )}
                </div>
                <p className="text-xs text-pink-800 whitespace-pre-line leading-relaxed">
                  {hasLetter
                    ? loveLetter
                    : "Your future love letter will appear here, softly animated for someone special."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:justify-end gap-2.5 sm:gap-3">
        <button
          type="button"
          onClick={handleDownload}
          className="inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold bg-white text-pink-700 border border-pink-200 shadow-sm hover:bg-pink-50 transition disabled:opacity-60 disabled:cursor-wait"
          disabled={isDownloading}
        >
          {isDownloading ? "Preparing Download…" : "Download Animation"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center justify-center rounded-full px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold bg-pink-500 hover:bg-pink-600 text-white shadow-md shadow-pink-200 transition"
        >
          Share with Loved One
        </button>
      </div>
    </section>
  );
}

