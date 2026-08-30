import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  RotateCw, 
  RotateCcw, 
  Play, 
  Pause, 
  MoveHorizontal, 
  CheckCircle2, 
  MessageSquare, 
  FileText,
  Layers,
  Compass,
  Loader2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { getWhatsAppUrl } from '../data/company';

// 9 Turntable angle frames in exact rotation order (0° to 320° in 40° steps)
interface AngleFrame {
  angle: number;
  label: string;
  image: string;
}

const CART_FRAMES: AngleFrame[] = [
  { 
    angle: 0, 
    label: '0° Front View', 
    image: 'https://i.postimg.cc/ZYjgrtyq/cart-01-png.png' 
  },
  { 
    angle: 40, 
    label: '40° Front Right Angle', 
    image: 'https://i.postimg.cc/25FTrhQ5/cart-02-png.png' 
  },
  { 
    angle: 80, 
    label: '80° Right Side Profile', 
    image: 'https://i.postimg.cc/RV6Rqj7j/cart-03-png.png' 
  },
  { 
    angle: 120, 
    label: '120° Rear Right View', 
    image: 'https://i.postimg.cc/1t30ST5s/cart-04-png.png' 
  },
  { 
    angle: 160, 
    label: '160° Rear Perspective', 
    image: 'https://i.postimg.cc/T1Znr3jG/cart-05-png.png' 
  },
  { 
    angle: 200, 
    label: '200° Direct Rear View', 
    image: 'https://i.postimg.cc/T1Znr3jG/cart-06-png.png' 
  },
  { 
    angle: 240, 
    label: '240° Rear Left Perspective', 
    image: 'https://i.postimg.cc/j51fbSFR/cart-07-png.png' 
  },
  { 
    angle: 280, 
    label: '280° Left Side Profile', 
    image: 'https://i.postimg.cc/vDF64SyN/cart-08-png.png' 
  },
  { 
    angle: 320, 
    label: '320° Front Left Angle', 
    image: 'https://i.postimg.cc/FF2PbrH0/cart-09-png.png' 
  },
];

const TOTAL_FRAMES = CART_FRAMES.length; // 9 frames
const PIXELS_PER_FRAME = 85; // Calibrated drag sensitivity: smooth, stable, and less twitchy speed intensity

interface Cart360ViewerProps {
  onOpenQuoteModal?: (productName?: string) => void;
}

export const Cart360Viewer: React.FC<Cart360ViewerProps> = ({ onOpenQuoteModal }) => {
  const { t, language } = useLanguage();
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState<boolean>(false);
  const [imagesLoadedCount, setImagesLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Drag physics & RAF references
  const startXRef = useRef<number>(0);
  const currentPosRef = useRef<number>(0); // continuous floating position
  const targetIndexRef = useRef<number>(0);
  const lastIndexRef = useRef<number>(0);
  const isPointerDownRef = useRef<boolean>(false);
  
  // Velocity & Momentum tracking
  const lastMoveXRef = useRef<number>(0);
  const lastMoveTimeRef = useRef<number>(0);
  const velocityRef = useRef<number>(0); // pixels per ms
  
  // Animation Frame IDs
  const rafIdRef = useRef<number | null>(null);
  const momentumRafIdRef = useRef<number | null>(null);
  const autoSpinIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // 1. Preload all 9 angle frames into browser cache before enabling interaction
  useEffect(() => {
    let loaded = 0;
    const total = CART_FRAMES.length;

    CART_FRAMES.forEach((frame) => {
      const img = new Image();
      img.src = frame.image;
      
      const onDone = () => {
        loaded += 1;
        setImagesLoadedCount(loaded);
        if (loaded >= total) {
          setIsReady(true);
        }
      };

      if (img.complete) {
        onDone();
      } else {
        img.onload = onDone;
        img.onerror = onDone;
      }
    });

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      if (momentumRafIdRef.current) cancelAnimationFrame(momentumRafIdRef.current);
      if (autoSpinIntervalRef.current) clearInterval(autoSpinIntervalRef.current);
    };
  }, []);

  // Update DOM frame smoothly via RAF buffer
  const scheduleFrameUpdate = useCallback((newIndex: number) => {
    let normalized = Math.round(newIndex) % TOTAL_FRAMES;
    if (normalized < 0) normalized += TOTAL_FRAMES;

    targetIndexRef.current = normalized;

    if (!rafIdRef.current) {
      rafIdRef.current = requestAnimationFrame(() => {
        if (targetIndexRef.current !== lastIndexRef.current) {
          setCurrentFrameIndex(targetIndexRef.current);
          lastIndexRef.current = targetIndexRef.current;
        }
        rafIdRef.current = null;
      });
    }
  }, []);

  // Handle gentle Auto-Spin loop (relaxed pace)
  useEffect(() => {
    if (isAutoSpinning) {
      autoSpinIntervalRef.current = setInterval(() => {
        setCurrentFrameIndex((prev) => {
          const next = (prev + 1) % TOTAL_FRAMES;
          currentPosRef.current = next;
          lastIndexRef.current = next;
          return next;
        });
      }, 850);
    } else if (autoSpinIntervalRef.current) {
      clearInterval(autoSpinIntervalRef.current);
      autoSpinIntervalRef.current = null;
    }

    return () => {
      if (autoSpinIntervalRef.current) {
        clearInterval(autoSpinIntervalRef.current);
      }
    };
  }, [isAutoSpinning]);

  // Inertia momentum coasting after flick release (gentle and smooth)
  const startMomentum = useCallback(() => {
    if (Math.abs(velocityRef.current) < 0.12) return; // Ignore very small flicks

    // Calm velocity multiplier to prevent rushing
    let velocity = Math.max(-1.2, Math.min(1.2, velocityRef.current * 0.65));
    let lastTime = performance.now();

    const glide = (now: number) => {
      const dt = Math.min(now - lastTime, 32); // clamp dt to avoid jumps
      lastTime = now;

      // Apply friction damping
      const friction = Math.pow(0.86, dt / 16.6);
      velocity *= friction;

      // Advance floating position (negative velocity = drag right = rotate CCW, positive = rotate CW)
      const deltaFrames = (velocity * dt) / PIXELS_PER_FRAME;
      currentPosRef.current -= deltaFrames;

      scheduleFrameUpdate(currentPosRef.current);

      if (Math.abs(velocity) > 0.04 && !isPointerDownRef.current) {
        momentumRafIdRef.current = requestAnimationFrame(glide);
      } else {
        momentumRafIdRef.current = null;
      }
    };

    if (momentumRafIdRef.current) {
      cancelAnimationFrame(momentumRafIdRef.current);
    }
    momentumRafIdRef.current = requestAnimationFrame(glide);
  }, [scheduleFrameUpdate]);

  // Pointer drag start (Desktop Mouse & Mobile Touch)
  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    // Stop any existing momentum or auto-spin
    if (momentumRafIdRef.current) {
      cancelAnimationFrame(momentumRafIdRef.current);
      momentumRafIdRef.current = null;
    }
    setIsAutoSpinning(false);

    isPointerDownRef.current = true;
    setIsDragging(true);

    startXRef.current = e.clientX;
    lastMoveXRef.current = e.clientX;
    lastMoveTimeRef.current = performance.now();
    velocityRef.current = 0;
    currentPosRef.current = currentFrameIndex;

    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Ignore fallback
    }
  }, [currentFrameIndex]);

  // Pointer drag move with requestAnimationFrame buffering & velocity computation
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    const now = performance.now();
    const dt = now - lastMoveTimeRef.current;
    const dx = e.clientX - lastMoveXRef.current;

    // Track instantaneous flick velocity (pixels/ms) with exponential smoothing
    if (dt > 4) {
      const instantVelocity = dx / dt;
      velocityRef.current = velocityRef.current * 0.4 + instantVelocity * 0.6;
      lastMoveXRef.current = e.clientX;
      lastMoveTimeRef.current = now;
    }

    const totalDeltaX = e.clientX - startXRef.current;
    const frameOffset = totalDeltaX / PIXELS_PER_FRAME;
    
    // Dragging left (totalDeltaX < 0) advances clockwise rotation
    // Dragging right (totalDeltaX > 0) rotates counter-clockwise
    currentPosRef.current = currentFrameIndex - frameOffset;
    scheduleFrameUpdate(currentPosRef.current);
  }, [currentFrameIndex, scheduleFrameUpdate]);

  // Pointer drag release: triggers momentum glide
  const handlePointerUp = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!isPointerDownRef.current) return;

    isPointerDownRef.current = false;
    setIsDragging(false);

    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Ignore
    }

    // Launch momentum coasting if flicked
    startMomentum();
  }, [startMomentum]);

  // Step rotation manually by 1 frame (40°)
  const handleRotatePrev = () => {
    setIsAutoSpinning(false);
    if (momentumRafIdRef.current) cancelAnimationFrame(momentumRafIdRef.current);
    const next = (currentFrameIndex - 1 + TOTAL_FRAMES) % TOTAL_FRAMES;
    currentPosRef.current = next;
    scheduleFrameUpdate(next);
  };

  const handleRotateNext = () => {
    setIsAutoSpinning(false);
    if (momentumRafIdRef.current) cancelAnimationFrame(momentumRafIdRef.current);
    const next = (currentFrameIndex + 1) % TOTAL_FRAMES;
    currentPosRef.current = next;
    scheduleFrameUpdate(next);
  };

  const handleSelectFrame = (index: number) => {
    setIsAutoSpinning(false);
    if (momentumRafIdRef.current) cancelAnimationFrame(momentumRafIdRef.current);
    currentPosRef.current = index;
    scheduleFrameUpdate(index);
  };

  const currentFrame = CART_FRAMES[currentFrameIndex] || CART_FRAMES[0];

  return (
    <section id="view-360" className="py-16 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-[#0062D2] text-xs font-bold uppercase tracking-wider mb-2 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
            <Compass className="w-3.5 h-3.5" />
            <span>{t.cart360?.badge || 'Interactive 360° Showcase'}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            {t.cart360?.heading || 'Explore the Cart in 360°'}
          </h2>
          <p className="mt-3 text-base text-slate-600">
            {t.cart360?.subtitle || 'Drag left or right to view this custom stainless steel food cart from every angle.'}
          </p>
        </div>

        {/* Main 360 Showcase Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* 360 Interactive Viewer Card (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] rounded-2xl border border-slate-200 p-4 sm:p-6 shadow-xs flex flex-col items-center">
            
            {/* Interactive Drag Canvas Container */}
            <div
              id="cart-360-viewport"
              ref={containerRef}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              className={`relative w-full aspect-[4/3] max-w-2xl bg-white rounded-xl border border-slate-200 shadow-2xs overflow-hidden select-none touch-none transition-shadow ${
                isDragging ? 'cursor-grabbing ring-2 ring-[#0062D2]/30 shadow-md' : 'cursor-grab hover:shadow-sm'
              }`}
            >
              {/* Preloaded Stacked Turntable Image Frames with 40ms micro-crossfade */}
              {CART_FRAMES.map((frame, index) => (
                <img
                  key={frame.angle}
                  src={frame.image}
                  alt={`Stainless Steel Food Cart View - Angle ${frame.angle}°`}
                  referrerPolicy="no-referrer"
                  draggable={false}
                  className={`absolute inset-0 w-full h-full object-contain p-4 select-none transition-opacity duration-[40ms] ease-out pointer-events-none ${
                    index === currentFrameIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
                  }`}
                />
              ))}

              {/* Floating "↔ Drag to rotate" Hint Badge */}
              <div 
                className={`absolute top-4 left-4 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-200 pointer-events-none ${
                  isDragging 
                    ? 'bg-[#0062D2] text-white shadow-md scale-95 opacity-90' 
                    : 'bg-slate-900/80 text-white backdrop-blur-xs shadow-sm hover:bg-slate-900'
                }`}
              >
                <MoveHorizontal className={`w-3.5 h-3.5 ${!isDragging ? 'animate-pulse text-blue-300' : ''}`} />
                <span>{t.cart360?.dragHint || '↔ Drag to rotate'}</span>
              </div>

              {/* Loading Overlay while frames are preloading */}
              {!isReady && (
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xs z-30 flex flex-col items-center justify-center gap-2 text-xs font-semibold text-slate-700">
                  <Loader2 className="w-5 h-5 text-[#0062D2] animate-spin" />
                  <span>Loading 360° view...</span>
                </div>
              )}
            </div>

            {/* Viewer Controls Toolbar */}
            <div className="w-full mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200/80">
              
              {/* Step Buttons & Auto Spin */}
              <div className="flex items-center gap-2">
                <button
                  id="btn-rotate-left"
                  type="button"
                  onClick={handleRotatePrev}
                  title="Rotate Left"
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  id="btn-rotate-right"
                  type="button"
                  onClick={handleRotateNext}
                  title="Rotate Right"
                  className="p-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-colors shadow-2xs cursor-pointer active:scale-95"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                <button
                  id="btn-toggle-autospin"
                  type="button"
                  onClick={() => setIsAutoSpinning((prev) => !prev)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-colors flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                    isAutoSpinning
                      ? 'bg-[#0062D2] text-white border-[#0062D2] shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300 shadow-2xs'
                  }`}
                >
                  {isAutoSpinning ? (
                    <>
                      <Pause className="w-3.5 h-3.5" />
                      <span>{t.cart360?.pauseSpin || 'Pause Spin'}</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{t.cart360?.autoSpin || 'Auto Spin'}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Angle Position Dot Indicators (no numbers) */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                {CART_FRAMES.map((frame, index) => {
                  const isActive = index === currentFrameIndex;
                  return (
                    <button
                      key={frame.angle}
                      type="button"
                      onClick={() => handleSelectFrame(index)}
                      aria-label={`Angle ${index + 1}`}
                      className={`transition-all duration-200 cursor-pointer rounded-full ${
                        isActive
                          ? 'w-5 h-2 bg-[#0062D2] shadow-xs'
                          : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  );
                })}
              </div>
            </div>

          </div>

          {/* Product Specifications & Fabrication Details (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 text-slate-600 text-xs font-bold bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                <Layers className="w-3.5 h-3.5 text-[#0062D2]" />
                <span>{language === 'mr' ? 'कस्टम फॅब्रिकेशन मॉडेल' : 'Bespoke Fabrication Model'}</span>
              </div>

              <h3 className="text-2xl font-extrabold text-slate-900 tracking-tight leading-tight">
                {t.cart360?.specTitle || 'Custom Stainless Steel Food Kiosk Cart'}
              </h3>

              <p className="text-sm text-slate-600 leading-relaxed">
                {t.cart360?.specSubtitle || 'Precision fabricated at Alfa Steel with commercial-grade stainless steel, hydraulic canopy, and heavy-duty mobility.'}
              </p>
            </div>

            {/* Specification Highlights List */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-2">
                {language === 'mr' ? 'प्रमुख वैशिष्ट्ये व तपशील' : 'Key Specifications'}
              </h4>

              <div className="space-y-2.5 text-xs sm:text-sm">
                {(t.cart360?.specs || [
                  { label: 'Material Grade', val: 'Food-Grade SS 304 / SS 202' },
                  { label: 'Roof Canopy', val: 'Terracotta Gabled Roof with Decorative Trim' },
                  { label: 'Counters', val: 'Front & Side Fold-Out Serving Flaps' },
                  { label: 'Mobility', val: 'Heavy-Duty 360° Caster Wheels + Locking Brakes' },
                  { label: 'Customization', val: 'Custom Sizing, Burner Cutouts & Branding' },
                ]).map((spec, idx) => (
                  <div key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#0062D2] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-slate-900">{spec.label}: </span>
                      <span className="text-slate-600">{spec.val}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                id="btn-360-quote"
                type="button"
                onClick={() => onOpenQuoteModal ? onOpenQuoteModal('Custom Mobile Food Kiosk Cart') : document.getElementById('quote')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-[#0062D2] hover:bg-[#0051B0] text-white font-bold py-3 px-5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 text-sm cursor-pointer"
              >
                <FileText className="w-4 h-4" />
                <span>{t.cart360?.quoteBtn || 'Request Quote for This Cart'}</span>
              </button>

              <a
                id="btn-360-whatsapp"
                href={getWhatsAppUrl('Hello Alfa Steel, I am interested in getting a quotation for the Custom Stainless Steel Food Kiosk Cart with 360 view.')}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold py-3 px-5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm shadow-2xs"
              >
                <MessageSquare className="w-4 h-4 text-[#25D366] fill-[#25D366]/20" />
                <span>{t.cart360?.whatsappBtn || 'Enquire on WhatsApp'}</span>
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

