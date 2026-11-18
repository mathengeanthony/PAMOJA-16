import React, { useEffect, useRef, useState } from 'react';
import { Check, Share2, X } from 'lucide-react';

interface PamojaMovementSectionProps {
  isLightMode?: boolean;
  onOpenSignInModal?: () => void;
  onOpenSubmitModal?: () => void;
}

type CircleVariant = 'unity-cluster' | 'civic-bloom';

interface OrganicSphereCanvasProps {
  variant: CircleVariant;
  isLightMode: boolean;
}

const OrganicSphereCanvas: React.FC<OrganicSphereCanvasProps> = ({ variant, isLightMode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let animationFrameId = 0;
    let angle = variant === 'unity-cluster' ? 0.35 : 1.1;

    // Precompute deterministic organic geometry for each variant
    const unityLobes = [
      { x: 0, y: 0, z: 0, r: 0.42, hue: 'cyan' },
      { x: 0.38, y: -0.22, z: 0.28, r: 0.35, hue: 'white' },
      { x: -0.36, y: 0.24, z: 0.26, r: 0.36, hue: 'blue' },
      { x: -0.34, y: -0.28, z: -0.18, r: 0.34, hue: 'cyan' },
      { x: 0.36, y: 0.28, z: -0.22, r: 0.33, hue: 'blue' },
      { x: 0.02, y: 0.42, z: 0.16, r: 0.31, hue: 'cyan' },
      { x: -0.04, y: -0.42, z: 0.18, r: 0.32, hue: 'white' },
    ];

    // Generate Fibonacci sphere nodules for the civic-bloom sculpture
    const bloomNodes: { x: number; y: number; z: number; r: number; isCore: boolean }[] = [];
    const totalPoints = 42;
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2;
      const radiusAtY = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;
      const distFromTopRight = Math.hypot(x - 0.35, y + 0.4, z - 0.5);
      bloomNodes.push({
        x: x * 0.56,
        y: y * 0.56,
        z: z * 0.56,
        r: distFromTopRight < 0.72 ? 0.17 : 0.2,
        isCore: distFromTopRight < 0.78,
      });
    }

    // Precompute fine velvet stipple offsets for plush texture
    const velvetTufts = Array.from({ length: 28 }, (_, i) => {
      const a = i * 2.39996;
      const rad = Math.sqrt((i + 0.5) / 28);
      return { dx: Math.cos(a) * rad, dy: Math.sin(a) * rad };
    });

    const renderFrame = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      const size = Math.max(120, Math.round(rect.width || 180));
      if (canvas.width !== size * dpr || canvas.height !== size * dpr) {
        canvas.width = size * dpr;
        canvas.height = size * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2;
      const cy = size / 2;
      const baseScale = size * 0.42;

      const tiltX = pointerRef.current.active ? pointerRef.current.y * 0.35 : Math.sin(angle * 0.6) * 0.14;
      const rotY = angle + (pointerRef.current.active ? pointerRef.current.x * 0.45 : 0);

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(tiltX);
      const sinX = Math.sin(tiltX);

      // Soft ambient drop shadow beneath the 3D sculpture
      const shadowGrad = ctx.createRadialGradient(cx, cy + baseScale * 0.85, 2, cx, cy + baseScale * 0.85, baseScale * 0.85);
      shadowGrad.addColorStop(0, variant === 'unity-cluster' ? 'rgba(0, 20, 45, 0.38)' : 'rgba(0, 55, 90, 0.26)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(cx, cy + baseScale * 0.85, baseScale * 0.78, baseScale * 0.22, 0, 0, Math.PI * 2);
      ctx.fill();

      if (variant === 'unity-cluster') {
        const transformed = unityLobes.map((lobe) => {
          const rx = lobe.x * cosY - lobe.z * sinY;
          const rz1 = lobe.x * sinY + lobe.z * cosY;
          const ry = lobe.y * cosX - rz1 * sinX;
          const rz = lobe.y * sinX + rz1 * cosX;
          return { ...lobe, rx, ry, rz };
        });

        transformed.sort((a, b) => a.rz - b.rz);

        transformed.forEach((node) => {
          const persp = 1 / (1 - node.rz * 0.25);
          const px = cx + node.rx * baseScale * persp;
          const py = cy + node.ry * baseScale * persp;
          const pr = node.r * baseScale * persp;

          const grad = ctx.createRadialGradient(
            px + pr * 0.28,
            py - pr * 0.3,
            pr * 0.08,
            px,
            py,
            pr * 1.05
          );

          if (node.hue === 'white') {
            grad.addColorStop(0, '#ffffff');
            grad.addColorStop(0.45, '#b8f7fa');
            grad.addColorStop(0.82, '#00C4CC');
            grad.addColorStop(1, '#003e66');
          } else if (node.hue === 'cyan') {
            grad.addColorStop(0, '#a6fbff');
            grad.addColorStop(0.4, '#00C4CC');
            grad.addColorStop(0.85, '#005587');
            grad.addColorStop(1, '#00223b');
          } else {
            grad.addColorStop(0, '#5ee7ee');
            grad.addColorStop(0.35, '#007ab8');
            grad.addColorStop(0.82, '#003c63');
            grad.addColorStop(1, '#001628');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();

          // Plush velvet stipple sheen
          ctx.fillStyle = node.hue === 'white' ? 'rgba(255,255,255,0.22)' : 'rgba(180, 248, 255, 0.16)';
          velvetTufts.forEach((tuft) => {
            const tx = px + tuft.dx * pr * 0.78;
            const ty = py + tuft.dy * pr * 0.78;
            ctx.beginPath();
            ctx.arc(tx, ty, Math.max(0.7, pr * 0.045), 0, Math.PI * 2);
            ctx.fill();
          });
        });
      } else {
        // Core inner sphere for civic-bloom
        const coreGrad = ctx.createRadialGradient(
          cx + baseScale * 0.18,
          cy - baseScale * 0.22,
          baseScale * 0.08,
          cx,
          cy,
          baseScale * 0.65
        );
        coreGrad.addColorStop(0, '#fff4b8');
        coreGrad.addColorStop(0.45, '#E5B80B');
        coreGrad.addColorStop(0.85, '#005587');
        coreGrad.addColorStop(1, '#00243d');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(cx, cy, baseScale * 0.56, 0, Math.PI * 2);
        ctx.fill();

        const transformed = bloomNodes.map((node) => {
          const rx = node.x * cosY - node.z * sinY;
          const rz1 = node.x * sinY + node.z * cosY;
          const ry = node.y * cosX - rz1 * sinX;
          const rz = node.y * sinX + rz1 * cosX;
          return { ...node, rx, ry, rz };
        });

        transformed.sort((a, b) => a.rz - b.rz);

        transformed.forEach((node) => {
          const persp = 1 / (1 - node.rz * 0.22);
          const px = cx + node.rx * baseScale * persp;
          const py = cy + node.ry * baseScale * persp;
          const pr = node.r * baseScale * persp;

          const grad = ctx.createRadialGradient(
            px + pr * 0.24,
            py - pr * 0.26,
            pr * 0.08,
            px,
            py,
            pr * 1.05
          );

          const isHighlightZone = node.rx > -0.08 && node.ry < 0.12 && node.rz > 0.08;
          if (isHighlightZone || node.isCore) {
            grad.addColorStop(0, '#fff7cc');
            grad.addColorStop(0.42, '#E5B80B');
            grad.addColorStop(0.85, '#b68900');
            grad.addColorStop(1, '#4a3500');
          } else {
            grad.addColorStop(0, isLightMode ? '#7cf1f6' : '#5ee7ee');
            grad.addColorStop(0.42, '#005587');
            grad.addColorStop(0.85, '#002e4d');
            grad.addColorStop(1, '#001524');
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = isHighlightZone || node.isCore ? 'rgba(255, 249, 214, 0.28)' : 'rgba(128, 244, 250, 0.18)';
          for (let i = 0; i < 10; i++) {
            const tuft = velvetTufts[i * 2];
            ctx.beginPath();
            ctx.arc(px + tuft.dx * pr * 0.68, py + tuft.dy * pr * 0.68, Math.max(0.6, pr * 0.055), 0, Math.PI * 2);
            ctx.fill();
          }
        });
      }

      ctx.restore();

      if (!prefersReducedMotion) {
        angle += variant === 'unity-cluster' ? 0.0055 : -0.005;
        animationFrameId = requestAnimationFrame(renderFrame);
      }
    };

    renderFrame();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [variant, isLightMode]);

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        pointerRef.current = {
          x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
          y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
          active: true,
        };
      }}
      onMouseLeave={() => {
        pointerRef.current.active = false;
      }}
      aria-hidden="true"
      className="w-[68%] h-[68%] block cursor-pointer transition-transform duration-300 group-hover:scale-105"
    />
  );
};

export const PamojaMovementSection: React.FC<PamojaMovementSectionProps> = ({
  isLightMode = false,
  onOpenSignInModal,
  onOpenSubmitModal,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const [activeMetricIdx, setActiveMetricIdx] = useState(0);
  const [socialNotice, setSocialNotice] = useState<string | null>(null);
  const [activeCircleModal, setActiveCircleModal] = useState<'unity' | 'action' | null>(null);

  const metrics = [
    { label: 'Overall advocates', target: 250, suffix: 'K+', display: '250K+' },
    { label: 'Active Kenyan counties', target: 47, suffix: '', display: '47' },
    { label: 'Civic micro-grants (KES)', target: 18, suffix: '.2M+', display: '18.2M+' },
  ];

  const currentMetric = metrics[activeMetricIdx];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setHasEntered(true);
          }
        });
      },
      { threshold: 0.35 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasEntered) return;
    const target = currentMetric.target;
    let frame = 0;
    const totalFrames = 36;
    const timer = setInterval(() => {
      frame += 1;
      const progress = Math.min(1, frame / totalFrames);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCountValue(Math.round(target * eased));
      if (frame >= totalFrames) {
        clearInterval(timer);
      }
    }, 24);

    return () => clearInterval(timer);
  }, [hasEntered, currentMetric.target]);

  const handleSocialClick = (network: string, handle: string) => {
    setSocialNotice(`${network}: ${handle} — Pamoja 16 Youth Peace Network`);
    setTimeout(() => {
      setSocialNotice((prev) => (prev?.startsWith(network) ? null : prev));
    }, 3500);
  };

  // Theme tokens faithful to screenshot contrast + Pamoja 16 brand colors
  const canvasBg = isLightMode ? 'bg-[#f4f7fb] text-[#0a0f1a]' : 'bg-[#050505] text-white';
  const primaryPill = isLightMode ? 'bg-[#0b0f17] text-white' : 'bg-[#f4f7fb] text-[#0a0f1a]';
  const bluePill = 'bg-[#005587] text-white';
  const cyanPill = 'bg-[#00C4CC] text-[#031926]';
  const goldPill = 'bg-[#E5B80B] text-[#0b0f17]';

  return (
    <section
      ref={sectionRef}
      id="section-movement"
      className={`snap-section min-h-[100dvh] h-[100dvh] max-h-[100dvh] w-full flex flex-col justify-between overflow-hidden relative select-none border-b transition-colors duration-500 px-4 py-4 sm:px-8 sm:py-6 lg:px-12 lg:py-7 ${canvasBg} ${
        isLightMode ? 'border-[#005587]/15' : 'border-white/10'
      }`}
    >
      {/* Subtle Ambient Brand Glow */}
      <div
        className={`absolute -top-24 -left-24 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-[#00C4CC]/15' : 'bg-[#005587]/20'
        }`}
      />
      <div
        className={`absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl pointer-events-none ${
          isLightMode ? 'bg-[#E5B80B]/15' : 'bg-[#00C4CC]/10'
        }`}
      />

      {/* MAIN POSTER CONTAINER */}
      <div className="w-full max-w-[460px] md:max-w-[760px] lg:max-w-[1160px] mx-auto h-full flex flex-col justify-between relative z-10 min-h-0">
        
        {/* ========================================================================= */}
        {/* 1. TOP INTERLOCKING WORD-PILL HEADLINE (4 ROWS, EXACT SCREENSHOT RHYTHM) */}
        {/* ========================================================================= */}
        <div className="w-full flex flex-col items-center justify-center pt-1 sm:pt-2 shrink-0">
          <h2
            aria-label="Everything you need for a just civic movement — All in Pamoja 16"
            className="flex flex-col items-center gap-1 sm:gap-1.5 md:gap-2 font-medium tracking-tight leading-none"
          >
            {/* Row 1: Everything | you */}
            <span className="flex items-center justify-center">
              <span
                className={`relative z-20 inline-flex items-center justify-center rounded-full px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] shadow-xs ${primaryPill}`}
              >
                Everything
              </span>
              <span
                className={`relative z-10 -ml-3.5 sm:-ml-5 inline-flex items-center justify-center rounded-r-full rounded-l-2xl pl-5 sm:pl-7 pr-4 sm:pr-6 lg:pr-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${bluePill}`}
              >
                you
              </span>
            </span>

            {/* Row 2: need | for | a | just */}
            <span className="flex items-center justify-center">
              <span
                className={`relative z-10 inline-flex items-center justify-center rounded-full px-3.5 sm:px-5 lg:px-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold ${cyanPill}`}
              >
                need
              </span>
              <span
                className={`relative z-20 -ml-0.5 inline-flex items-center justify-center rounded-full px-3.5 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${primaryPill}`}
              >
                for
              </span>
              <span
                className={`relative z-20 -ml-0.5 inline-flex items-center justify-center rounded-full px-3.5 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold ${goldPill}`}
              >
                a
              </span>
              <span
                className={`relative z-10 -ml-3.5 sm:-ml-5 inline-flex items-center justify-center rounded-r-full rounded-l-2xl pl-5 sm:pl-7 pr-4 sm:pr-6 lg:pr-8 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${primaryPill}`}
              >
                just
              </span>
            </span>

            {/* Row 3: civic | movement | — */}
            <span className="flex items-center justify-center">
              <span
                className={`relative z-10 inline-flex items-center justify-center rounded-full px-4 sm:px-6 lg:px-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${primaryPill}`}
              >
                civic
              </span>
              <span
                className={`relative z-20 -ml-0.5 inline-flex items-center justify-center rounded-l-full rounded-r-lg px-4 sm:px-6 lg:px-8 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold ${cyanPill}`}
              >
                movement
              </span>
              <span
                aria-hidden="true"
                className={`relative z-10 -ml-1.5 sm:-ml-2 inline-flex items-center justify-center rounded-full w-[2.35rem] h-[2.35rem] xs:w-[2.6rem] xs:h-[2.6rem] sm:w-[3.5rem] sm:h-[3.5rem] lg:w-[4.25rem] lg:h-[4.25rem] text-[1.15rem] sm:text-[1.75rem] lg:text-[2.2rem] font-normal ${bluePill}`}
              >
                —
              </span>
            </span>

            {/* Row 4: All | in | Pamoja | 16 */}
            <span className="flex items-center justify-center">
              <span
                className={`relative z-10 inline-flex items-center justify-center rounded-full px-4 sm:px-5 lg:px-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${bluePill}`}
              >
                All
              </span>
              <span
                className={`relative z-10 -ml-0.5 inline-flex items-center justify-center rounded-full px-3 sm:px-4 lg:px-5 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold ${cyanPill}`}
              >
                in
              </span>
              <span
                className={`relative z-20 -ml-0.5 inline-flex items-center justify-center rounded-full px-4 sm:px-6 lg:px-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] ${primaryPill}`}
              >
                Pamoja
              </span>
              <span
                className={`relative z-10 -ml-3.5 sm:-ml-5 inline-flex items-center justify-center rounded-r-full rounded-l-2xl pl-5 sm:pl-7 pr-4 sm:pr-6 lg:pr-7 py-1.5 sm:py-2 lg:py-2.5 text-[1.28rem] xs:text-[1.45rem] sm:text-[2.1rem] lg:text-[2.65rem] font-semibold ${bluePill}`}
              >
                16
              </span>
            </span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* 2. MIDDLE VISUAL STAGE: TAGLINE + TWO OVERLAPPING CIRCULAR 3D BADGES     */}
        {/* ========================================================================= */}
        <div className="flex-1 min-h-0 relative flex flex-col justify-center w-full my-1 sm:my-2">
          
          {/* Editorial Tagline (Upper-Right, mirroring "Manage / your money / with ease") */}
          <div className="w-full flex justify-end pr-1 sm:pr-4 lg:pr-8 mb-1 sm:mb-0 lg:mb-2 relative z-20 shrink-0">
            <div className="text-right leading-[1.12] tracking-tight text-base xs:text-lg sm:text-2xl lg:text-3xl font-medium">
              <span className={`block ${isLightMode ? 'text-[#005587]/40' : 'text-[#00C4CC]/45'}`}>
                Mobilize
              </span>
              <span className={`block ${isLightMode ? 'text-[#005587]/40' : 'text-[#00C4CC]/45'}`}>
                peace &amp; justice
              </span>
              <span className={`block font-semibold ${isLightMode ? 'text-[#0b0f17]' : 'text-white'}`}>
                with unity
              </span>
            </div>
          </div>

          {/* Overlapping Circular Badges Stage */}
          <div className="relative w-full flex-1 min-h-[210px] sm:min-h-[270px] lg:min-h-[320px] max-h-[380px] flex items-center justify-center">
            
            {/* LEFT-CENTER BLUE CIRCLE: PAMOJA 16 UNITY CLUSTER */}
            <button
              type="button"
              onClick={() => {
                setActiveMetricIdx(0);
                setActiveCircleModal('unity');
              }}
              aria-label="Explore Pamoja 16 Peace & Unity Network"
              className="group absolute left-[-6%] xs:left-[-2%] sm:left-[4%] md:left-[10%] lg:left-[18%] top-[2%] sm:top-[0%] w-[205px] h-[205px] xs:w-[235px] xs:h-[235px] sm:w-[275px] sm:h-[275px] lg:w-[325px] lg:h-[325px] rounded-full bg-[#005587] shadow-[0_20px_50px_rgba(0,85,135,0.35)] flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#00C4CC] z-10"
            >
              {/* Curved Perimeter Typography */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_32s_linear_infinite] motion-reduce:animate-none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="pamoja-circle-path-left"
                    d="M 100, 100 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
                  />
                </defs>
                <text
                  fill="#ffffff"
                  fillOpacity="0.92"
                  fontSize="12.2"
                  fontWeight="500"
                  letterSpacing="1.6"
                  fontFamily="Manrope, sans-serif"
                >
                  <textPath href="#pamoja-circle-path-left" startOffset="0%">
                    PAMOJA16PAMOJA16PAMOJA16PAMOJA16
                  </textPath>
                </text>
              </svg>

              {/* Center Tactile 3D Canvas Sculpture */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <OrganicSphereCanvas variant="unity-cluster" isLightMode={isLightMode} />
              </div>
            </button>

            {/* RIGHT-BOTTOM SOFT-CYAN / GOLD CIRCLE: SDG 16 CIVIC ACTION */}
            <button
              type="button"
              onClick={() => {
                setActiveMetricIdx((prev) => (prev + 1) % metrics.length);
                setActiveCircleModal('action');
              }}
              aria-label="Explore SDG 16 Civic Action Metrics"
              className={`group absolute right-[-6%] xs:right-[-2%] sm:right-[4%] md:right-[10%] lg:right-[18%] bottom-[-4%] sm:bottom-[-2%] w-[185px] h-[185px] xs:w-[215px] xs:h-[215px] sm:w-[255px] sm:h-[255px] lg:w-[295px] lg:h-[295px] rounded-full flex items-center justify-center cursor-pointer transition-transform duration-300 hover:scale-[1.03] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E5B80B] z-20 ${
                isLightMode
                  ? 'bg-[#ccf5f7] shadow-[0_20px_50px_rgba(0,196,204,0.22)] ring-4 ring-[#f4f7fb]'
                  : 'bg-[#0b2a3c] shadow-[0_20px_50px_rgba(0,196,204,0.18)] ring-4 ring-[#050505]'
              }`}
            >
              {/* Curved Perimeter Typography */}
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 w-full h-full pointer-events-none animate-[spin_38s_linear_infinite_reverse] motion-reduce:animate-none"
                aria-hidden="true"
              >
                <defs>
                  <path
                    id="pamoja-circle-path-right"
                    d="M 100, 100 m -84, 0 a 84,84 0 1,1 168,0 a 84,84 0 1,1 -168,0"
                  />
                </defs>
                <text
                  fill={isLightMode ? '#005587' : '#00C4CC'}
                  fillOpacity="0.9"
                  fontSize="12.2"
                  fontWeight="600"
                  letterSpacing="1.6"
                  fontFamily="Manrope, sans-serif"
                >
                  <textPath href="#pamoja-circle-path-right" startOffset="0%">
                    SDG16KENYA•SDG16KENYA•SDG16KENYA•
                  </textPath>
                </text>
              </svg>

              {/* Center Tactile 3D Nodular Sphere */}
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <OrganicSphereCanvas variant="civic-bloom" isLightMode={isLightMode} />
              </div>
            </button>

            {/* BOTTOM-LEFT STAT COUNTER (Anchored cleanly on bottom-left just like screenshot) */}
            <div className="absolute left-0 bottom-1 sm:bottom-2 z-30 flex flex-col items-start pointer-events-auto">
              <button
                type="button"
                onClick={() => setActiveMetricIdx((prev) => (prev + 1) % metrics.length)}
                className="text-left group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#00C4CC] rounded-lg"
                title="Click to cycle verified Pamoja 16 impact figures"
              >
                <span
                  className={`block text-[11px] sm:text-xs font-semibold tracking-wide transition-colors ${
                    isLightMode ? 'text-[#0b0f17]' : 'text-gray-300'
                  }`}
                >
                  {currentMetric.label}
                </span>
                <span
                  className={`block text-[2.45rem] xs:text-[2.85rem] sm:text-[3.5rem] lg:text-[4.25rem] font-light leading-[0.95] tracking-tight tabular-nums mt-0.5 transition-colors ${
                    isLightMode
                      ? 'text-[#005587]/45 group-hover:text-[#005587]'
                      : 'text-[#00C4CC]/65 group-hover:text-[#00C4CC]'
                  }`}
                >
                  {hasEntered ? `${countValue}${currentMetric.suffix}` : currentMetric.display}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 3. BOTTOM BAR: SOCIAL CIRCLES (IG, FB, X) + CONTINUE PILL CTA            */}
        {/* ========================================================================= */}
        <div className="w-full shrink-0 pt-2 sm:pt-3 relative z-30">
          {socialNotice && (
            <div
              role="status"
              className={`mb-2 px-3.5 py-2 rounded-full text-xs font-semibold flex items-center justify-between gap-2 transition-all ${
                isLightMode
                  ? 'bg-[#005587] text-white shadow-md'
                  : 'bg-[#00C4CC] text-[#041520] shadow-md'
              }`}
            >
              <span className="flex items-center gap-1.5 truncate">
                <Check className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{socialNotice}</span>
              </span>
              <button
                type="button"
                onClick={() => setSocialNotice(null)}
                className="shrink-0 opacity-80 hover:opacity-100 cursor-pointer"
                aria-label="Dismiss notice"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="flex items-center justify-between gap-3 sm:gap-5">
            {/* 3 Circular Social Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {[
                { code: 'IG', label: 'Instagram', handle: '@pamoja16.kenya' },
                { code: 'FB', label: 'Facebook Community', handle: 'fb.com/pamoja16sdg' },
                { code: 'X', label: 'X (Twitter)', handle: '@pamoja16_ke' },
              ].map((net) => (
                <button
                  key={net.code}
                  type="button"
                  onClick={() => handleSocialClick(net.label, net.handle)}
                  aria-label={`Connect on ${net.label}`}
                  className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center text-[11px] sm:text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer active:scale-95 ${
                    isLightMode
                      ? 'border-[#0b0f17]/25 text-[#0b0f17] hover:border-[#005587] hover:bg-[#005587] hover:text-white'
                      : 'border-white/25 text-white hover:border-[#00C4CC] hover:bg-[#00C4CC] hover:text-black'
                  }`}
                >
                  {net.code}
                </button>
              ))}
            </div>

            {/* Wide Pill Primary CTA */}
            <button
              type="button"
              id="btn-section4-continue"
              onClick={() => {
                if (onOpenSignInModal) {
                  onOpenSignInModal();
                } else if (onOpenSubmitModal) {
                  onOpenSubmitModal();
                }
              }}
              className={`flex-1 sm:flex-none sm:min-w-[230px] lg:min-w-[280px] h-11 sm:h-12 rounded-full font-semibold text-xs sm:text-sm tracking-wide flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-[0.98] whitespace-nowrap shrink-0 ${
                isLightMode
                  ? 'bg-[#0b0f17] text-white hover:bg-[#005587] shadow-md'
                  : 'bg-[#E5B80B] text-[#0b0f17] hover:bg-[#00C4CC] font-bold shadow-[0_0_24px_rgba(229,184,11,0.25)]'
              }`}
            >
              Join Pamoja 16
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DETAIL MODAL WHEN CLICKING THE 3D CIRCULAR BADGES            */}
      {/* ========================================================================= */}
      {activeCircleModal && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setActiveCircleModal(null)}
        >
          <div
            className={`w-full max-w-md rounded-3xl p-6 border shadow-2xl relative ${
              isLightMode
                ? 'bg-white border-[#005587]/20 text-[#0b0f17]'
                : 'bg-[#0d1524] border-white/15 text-white'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveCircleModal(null)}
              className={`absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-colors ${
                isLightMode ? 'bg-gray-100 hover:bg-gray-200 text-gray-800' : 'bg-white/10 hover:bg-white/20 text-white'
              }`}
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#00C4CC]">
              {activeCircleModal === 'unity' ? 'SDG 16 Peace & Unity Mesh' : 'SDG 16 Kenya & Regional Action'}
            </span>
            <h3 className="text-xl font-extrabold tracking-tight mt-1">
              {activeCircleModal === 'unity'
                ? 'Collective Youth Peace Infrastructure'
                : 'Transparent Accountability & Civic Grants'}
            </h3>
            <p className={`text-sm leading-relaxed mt-3 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`}>
              {activeCircleModal === 'unity'
                ? 'Pamoja 16 connects over 250,000 youth advocates, community mediators, and grassroots observers across Kenya into one resilient digital home for peace and justice.'
                : 'Verified county peace forums, open civic data audits, and M-Pesa Daraja micro-grants working together toward UN Sustainable Development Goal 16.'}
            </p>

            <div className="mt-5 flex items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  setActiveCircleModal(null);
                  if (onOpenSubmitModal) onOpenSubmitModal();
                }}
                className="flex-1 h-11 rounded-full bg-[#005587] hover:bg-[#00C4CC] hover:text-black text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
              >
                Submit Project
              </button>
              <button
                type="button"
                onClick={() => {
                  handleSocialClick('Share Link', 'https://pamoja16.org');
                  setActiveCircleModal(null);
                }}
                className={`h-11 px-4 rounded-full border font-bold text-xs flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isLightMode ? 'border-gray-300 hover:bg-gray-100' : 'border-white/20 hover:bg-white/10'
                }`}
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
