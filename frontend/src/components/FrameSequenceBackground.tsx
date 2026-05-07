import React, { useEffect, useMemo, useRef, useState } from 'react';

interface FrameSequenceBackgroundProps {
    className?: string;
    frameCount?: number;
    prefix?: string;
    extension?: string;
    pad?: number;
    lerpSpeed?: number;
    maxPreload?: number;
    showHud?: boolean;
    scrollDistanceVh?: number;
    debug?: boolean;
    respectReducedMotion?: boolean;
    overlays?: boolean;
    whiteOverlayOpacity?: number; // 0..1
}

const defaultPrefix = '/frame/frame_';

const padNumber = (value: number, pad: number) => String(value).padStart(pad, '0');

const usePrefersReducedMotion = () => {
    const [reduced, setReduced] = useState(false);

    useEffect(() => {
        const mq = window.matchMedia?.('(prefers-reduced-motion: reduce)');
        if (!mq) return;
        const handler = () => setReduced(!!mq.matches);
        handler();
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, []);

    return reduced;
};

const FrameSequenceBackground: React.FC<FrameSequenceBackgroundProps> = ({
    className = '',
    frameCount = 192,
    prefix = defaultPrefix,
    extension = '.jpg',
    pad = 4,
    lerpSpeed = 0.08,
    maxPreload = 100,
    showHud = true,
    scrollDistanceVh = 0,
    debug = false,
    respectReducedMotion = true,
    overlays = false,
    whiteOverlayOpacity = 0
}) => {
    const prefersReducedMotion = usePrefersReducedMotion();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const hudRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const resizeRafRef = useRef<number | null>(null);
    const renderedFrameRef = useRef(0);
    const targetFrameRef = useRef(0);
    const imagesRef = useRef<(HTMLImageElement | null)[]>([]);
    const loadedRef = useRef<boolean[]>([]);
    // Note: avoid React state updates per frame for perf.

    const urls = useMemo(() => {
        const list: string[] = [];
        for (let i = 0; i < Math.max(1, frameCount); i++) {
            list.push(`${prefix}${padNumber(i, pad)}${extension}`);
        }
        return list;
    }, [extension, frameCount, pad, prefix]);

    useEffect(() => {
        imagesRef.current = new Array(urls.length).fill(null);
        loadedRef.current = new Array(urls.length).fill(false);
    }, [urls.length]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let isMounted = true;

        const drawFrame = (index: number) => {
            if (!isMounted) return;
            const safeIndex = Math.max(0, Math.min(urls.length - 1, index));
            const img = imagesRef.current[safeIndex];
            if (!img || !loadedRef.current[safeIndex] || img.naturalWidth === 0) return;

            const scale = window.devicePixelRatio || 1;
            const width = Math.floor(window.innerWidth * scale);
            const height = Math.floor(window.innerHeight * scale);
            if (canvas.width !== width || canvas.height !== height) {
                canvas.width = width;
                canvas.height = height;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const canvasRatio = canvas.width / canvas.height;
            const imgRatio = img.width / img.height;
            let drawWidth: number;
            let drawHeight: number;
            let drawX: number;
            let drawY: number;

            if (canvasRatio > imgRatio) {
                drawWidth = canvas.width;
                drawHeight = canvas.width / imgRatio;
                drawX = 0;
                drawY = (canvas.height - drawHeight) / 2;
            } else {
                drawWidth = canvas.height * imgRatio;
                drawHeight = canvas.height;
                drawX = (canvas.width - drawWidth) / 2;
                drawY = 0;
            }

            ctx.drawImage(img, drawX, drawY, drawWidth, drawHeight);

            if (showHud && hudRef.current) {
                hudRef.current.textContent = `FRAME: ${String(safeIndex).padStart(4, '0')} / ${String(urls.length - 1).padStart(4, '0')}`;
            }
        };

        const ensureFrameLoaded = (index: number) => {
            const safeIndex = Math.max(0, Math.min(urls.length - 1, index));
            if (loadedRef.current[safeIndex]) return;
            if (imagesRef.current[safeIndex]) return;

            const img = new Image();
            img.decoding = 'async';
            img.src = urls[safeIndex];
            imagesRef.current[safeIndex] = img;
            img.onload = () => {
                loadedRef.current[safeIndex] = true;
                if (safeIndex === 0) {
                    drawFrame(0);
                }
            };
            img.onerror = () => {
                loadedRef.current[safeIndex] = false;
            };
        };

        const preloadBudget = Math.max(1, Math.min(urls.length, maxPreload));
        for (let i = 0; i < preloadBudget; i++) ensureFrameLoaded(i);

        const scheduleIdlePreload = () => {
            let nextIndex = preloadBudget;

            const runChunk = (budgetMs: number) => {
                if (!isMounted) return;
                const start = performance.now();
                while (nextIndex < urls.length) {
                    ensureFrameLoaded(nextIndex);
                    nextIndex++;
                    if (performance.now() - start > budgetMs) break;
                }
                if (nextIndex < urls.length) {
                    window.setTimeout(() => runChunk(budgetMs), 220);
                }
            };

            if (typeof (window as any).requestIdleCallback === 'function') {
                const idle = (window as any).requestIdleCallback.bind(window) as (
                    cb: (deadline: { timeRemaining: () => number }) => void
                ) => number;

                const idleLoop = () => {
                    idle((deadline) => {
                        if (!isMounted) return;
                        while (nextIndex < urls.length) {
                            ensureFrameLoaded(nextIndex);
                            nextIndex++;
                            if (deadline.timeRemaining() < 8) break;
                        }
                        if (nextIndex < urls.length) idleLoop();
                    });
                };

                idleLoop();
                return;
            }

            runChunk(10);
        };

        scheduleIdlePreload();

        const updateTargetFrameFromScroll = () => {
            const maxFrames = Math.max(1, urls.length - 1);
            const distancePx =
                scrollDistanceVh > 0 ? window.innerHeight * (scrollDistanceVh / 100) : null;

            let progress = 0;
            if (distancePx && distancePx > 0) {
                progress = window.scrollY / distancePx;
            } else {
                const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
                progress = scrollHeight <= 0 ? 0 : window.scrollY / scrollHeight;
            }

            const clamped = Math.max(0, Math.min(1, progress));
            targetFrameRef.current = clamped * maxFrames;

            if (debug) {
                const info = {
                    scrollY: Math.round(window.scrollY),
                    maxFrames,
                    distancePx: distancePx ? Math.round(distancePx) : null,
                    progress: Number(progress.toFixed(4)),
                    targetFrame: Number(targetFrameRef.current.toFixed(2))
                };
                // eslint-disable-next-line no-console
                console.log('[FrameSequenceBackground]', info);
            }
        };

        const renderLoop = () => {
            const diff = targetFrameRef.current - renderedFrameRef.current;
            if (Math.abs(diff) < 0.001) {
                renderedFrameRef.current = targetFrameRef.current;
            } else {
                renderedFrameRef.current += diff * Math.max(0.01, Math.min(0.3, lerpSpeed));
            }
            const index = Math.round(renderedFrameRef.current);
            ensureFrameLoaded(index);
            ensureFrameLoaded(index + 1);
            ensureFrameLoaded(index - 1);
            drawFrame(index);
            rafRef.current = window.requestAnimationFrame(renderLoop);
        };

        const onResize = () => {
            if (resizeRafRef.current) window.cancelAnimationFrame(resizeRafRef.current);
            resizeRafRef.current = window.requestAnimationFrame(() => drawFrame(Math.round(renderedFrameRef.current)));
        };

        updateTargetFrameFromScroll();
        ensureFrameLoaded(0);

        const shouldAnimate = !(respectReducedMotion && prefersReducedMotion);
        if (shouldAnimate) rafRef.current = window.requestAnimationFrame(renderLoop);
        else drawFrame(0);

        window.addEventListener('scroll', updateTargetFrameFromScroll, { passive: true });
        window.addEventListener('resize', onResize, { passive: true });

        return () => {
            isMounted = false;
            window.removeEventListener('scroll', updateTargetFrameFromScroll as EventListener);
            window.removeEventListener('resize', onResize as EventListener);
            if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
            if (resizeRafRef.current) window.cancelAnimationFrame(resizeRafRef.current);
        };
    }, [lerpSpeed, maxPreload, prefersReducedMotion, respectReducedMotion, scrollDistanceVh, showHud, urls]);

    return (
        <div className={`fixed inset-0 z-0 pointer-events-none ${className}`} aria-hidden="true">
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full bg-emerald-950/10" />
            {whiteOverlayOpacity > 0 ? (
                <div className="absolute inset-0 bg-white" style={{ opacity: Math.max(0, Math.min(1, whiteOverlayOpacity)) }} />
            ) : null}
            {overlays ? (
                <>
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/10 via-transparent to-transparent" />
                    <div className="absolute inset-0 [background-image:linear-gradient(to_right,rgba(16,185,129,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.06)_1px,transparent_1px)] [background-size:64px_64px] opacity-30" />
                    <div className="absolute inset-0 opacity-[0.10] mix-blend-multiply [background-image:repeating-radial-gradient(circle_at_0_0,rgba(15,23,42,0.06)_0_1px,transparent_1px_3px)] [background-size:140px_140px]" />
                </>
            ) : null}

            {showHud ? (
                <div
                    ref={hudRef}
                    className="fixed bottom-5 right-5 z-10 rounded-full bg-slate-900/70 px-3 py-1 text-[11px] font-bold tracking-widest text-emerald-200 shadow-lg backdrop-blur"
                >
                    {`FRAME: ${String(0).padStart(4, '0')} / ${String(urls.length - 1).padStart(4, '0')}`}
                </div>
            ) : null}
        </div>
    );
};

export default FrameSequenceBackground;
