
"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const r = (v: number) => Math.round(v * 1000) / 1000;

// ── SVG Flower Components ──────────────────────────────────────────────
const RoseSVG = ({ size = 48, opacity = 1, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80"
    style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <g transform="translate(40,40)">
      {[0,45,90,135,180,225,270,315].map((a,i) => (
        <ellipse
          key={i}
          cx={r(Math.cos(a*Math.PI/180)*13)}
          cy={r(Math.sin(a*Math.PI/180)*13)}
          rx="11"
          ry="8"
          fill={i%2===0 ? "#f9a8c9" : "#f472b6"}
          transform={`rotate(${a})`}
          opacity="0.85"
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="#fb7eb8"/>
      <circle cx="0" cy="0" r="6" fill="#f9a8c9"/>
    </g>
  </svg>
);

const TulipSVG = ({ size = 48, opacity = 1, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <ellipse cx="40" cy="38" rx="13" ry="20" fill="#fda4af"/>
    <ellipse cx="30" cy="42" rx="10" ry="18" fill="#fb7185" transform="rotate(-15,30,42)"/>
    <ellipse cx="50" cy="42" rx="10" ry="18" fill="#fb7185" transform="rotate(15,50,42)"/>
    <ellipse cx="40" cy="35" rx="9" ry="16" fill="#fecdd3"/>
    <line x1="40" y1="58" x2="40" y2="76" stroke="#86efac" strokeWidth="2.5" strokeLinecap="round"/>
  </svg>
);

const DaisySVG = ({ size = 48, opacity = 1, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80"
    style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <g transform="translate(40,40)">
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i) => (
        <ellipse
          key={i}
          cx={r(Math.cos(a*Math.PI/180)*16)}
          cy={r(Math.sin(a*Math.PI/180)*16)}
          rx="6"
          ry="11"
          fill="#fef9c3"
          transform={`rotate(${a})`}
          opacity="0.9"
        />
      ))}
      <circle cx="0" cy="0" r="10" fill="#fbbf24"/>
      <circle cx="0" cy="0" r="6" fill="#fde68a"/>
    </g>
  </svg>
);

const PeonySVG = ({ size = 48, opacity = 1, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80"
    style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <g transform="translate(40,42)">
      {[0,60,120,180,240,300].map((a,i) => (
        <ellipse
          key={i}
          cx={r(Math.cos(a*Math.PI/180)*16)}
          cy={r(Math.sin(a*Math.PI/180)*16)}
          rx="14"
          ry="10"
          fill="#fda4af"
          transform={`rotate(${a})`}
          opacity="0.8"
        />
      ))}
      {[30,90,150,210,270,330].map((a,i) => (
        <ellipse
          key={i}
          cx={r(Math.cos(a*Math.PI/180)*10)}
          cy={r(Math.sin(a*Math.PI/180)*10)}
          rx="11"
          ry="8"
          fill="#fb7185"
          transform={`rotate(${a})`}
          opacity="0.85"
        />
      ))}
      <circle cx="0" cy="0" r="9" fill="#fecdd3"/>
    </g>
  </svg>
);

const LavenderSVG = ({ size = 48, opacity = 1, rotate = 0 }) => (
  <svg width={size} height={size} viewBox="0 0 80 80" style={{ opacity, transform: `rotate(${rotate}deg)` }}>
    <line x1="40" y1="70" x2="40" y2="20" stroke="#86efac" strokeWidth="2" strokeLinecap="round"/>
    {[20,26,32,38,44,50].map((y,i) => (
      <g key={i}>
        <ellipse cx={38} cy={y} rx="5" ry="4" fill="#c4b5fd" opacity="0.9" transform={`rotate(-20,38,${y})`}/>
        <ellipse cx={42} cy={y+3} rx="5" ry="4" fill="#a78bfa" opacity="0.9" transform={`rotate(20,42,${y+3})`}/>
      </g>
    ))}
  </svg>
);

// ── Floating petal particle ────────────────────────────────────────────
const FloatingPetal = ({ style }) => (
  <div className="floating-petal" style={style}>
    <svg width="14" height="18" viewBox="0 0 14 18">
      <ellipse cx="7" cy="9" rx="5" ry="8" fill="currentColor" opacity="0.6"/>
    </svg>
  </div>
);

// ── Sparkle ────────────────────────────────────────────────────────────
const Sparkle = ({ x, y, delay, size = 16 }) => (
  <div className="sparkle" style={{ left: x, top: y, animationDelay: delay, width: size, height: size }}>
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
        fill="#f9a8c9" opacity="0.8"/>
    </svg>
  </div>
);

// ── Feature Card ───────────────────────────────────────────────────────
const FeatureCard = ({ icon, title, desc, delay }) => (
  <div className="feature-card" style={{ animationDelay: delay }}>
    <div className="feature-icon">{icon}</div>
    <h3 className="feature-title">{title}</h3>
    <p className="feature-desc">{desc}</p>
  </div>
);

// ── Testimonial ────────────────────────────────────────────────────────
const Testimonial = ({ quote, name, emoji, delay }) => (
  <div className="testimonial" style={{ animationDelay: delay }}>
    <p className="testimonial-quote">"{quote}"</p>
    <span className="testimonial-name">{emoji} {name}</span>
  </div>
);

// ── Main Landing Page ──────────────────────────────────────────────────
export default function LittleLoveStudioLanding() {
  const [mounted, setMounted] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const petals = mounted ? Array.from({ length: 18 }, (_, i) => ({
    left: `${(i * 5.8 + 3) % 100}%`,
    animationDelay: `${(i * 0.7) % 9}s`,
    animationDuration: `${10 + (i % 5) * 2}s`,
    color: ["#fda4af","#f9a8c9","#fbcfe8","#fde68a","#c4b5fd","#a5f3fc"][i % 6],
    fontSize: `${10 + (i % 3) * 4}px`,
  })) : [];

  const sparkles = [
    { x:"12%", y:"18%", delay:"0s", size:18 },
    { x:"85%", y:"12%", delay:"0.8s", size:14 },
    { x:"7%",  y:"60%", delay:"1.4s", size:12 },
    { x:"91%", y:"55%", delay:"0.3s", size:20 },
    { x:"50%", y:"8%",  delay:"1.1s", size:10 },
    { x:"70%", y:"80%", delay:"1.8s", size:16 },
    { x:"25%", y:"85%", delay:"0.6s", size:12 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --rose:    #f9a8c9;
          --rose-deep: #f472b6;
          --blush:   #fce7f3;
          --cream:   #fff8f5;
          --petal:   #fdf2f8;
          --lavender:#e9d5ff;
          --sage:    #bbf7d0;
          --gold:    #fde68a;
          --text-dark: #4a1942;
          --text-mid:  #9d4e89;
          --text-soft: #c084b0;
        }

        html { scroll-behavior: smooth; }

        body {
          font-family: 'DM Sans', sans-serif;
          background: var(--cream);
          color: var(--text-dark);
          overflow-x: hidden;
          cursor: none;
        }

        /* ── Custom Cursor ── */
        .cursor {
          width: 20px; height: 20px;
          border: 1.5px solid var(--rose-deep);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transition: transform 0.15s ease, background 0.15s ease;
          transform: translate(-50%, -50%);
          mix-blend-mode: multiply;
        }
        .cursor-dot {
          width: 5px; height: 5px;
          background: var(--rose-deep);
          border-radius: 50%;
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          transform: translate(-50%, -50%);
          transition: transform 0.05s ease;
        }

        /* ── Floating Petals ── */
        .petals-bg {
          position: fixed; inset: 0;
          pointer-events: none; z-index: 1;
          overflow: hidden;
        }
        .floating-petal {
          position: absolute;
          top: -30px;
          animation: petalFall linear infinite;
          color: currentColor;
        }
        @keyframes petalFall {
          0%   { transform: translateY(-30px) rotate(0deg) translateX(0); opacity: 0; }
          10%  { opacity: 1; }
          90%  { opacity: 0.6; }
          100% { transform: translateY(110vh) rotate(360deg) translateX(40px); opacity: 0; }
        }

        /* ── Sparkles ── */
        .sparkle {
          position: absolute;
          animation: sparkleAnim 3s ease-in-out infinite alternate;
          pointer-events: none;
        }
        @keyframes sparkleAnim {
          0%   { opacity: 0; transform: scale(0.5) rotate(0deg); }
          50%  { opacity: 1; transform: scale(1.2) rotate(20deg); }
          100% { opacity: 0.3; transform: scale(0.8) rotate(-10deg); }
        }

        /* ── Nav ── */
        .nav {
          position: fixed; top: 0; left: 0; right: 0;
          z-index: 100;
          padding: 20px 40px;
          display: flex; align-items: center; justify-content: space-between;
          background: linear-gradient(to bottom, rgba(255,248,245,0.95), transparent);
          backdrop-filter: blur(2px);
        }
        .nav-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1.3rem;
          font-weight: 700;
          color: var(--text-dark);
          letter-spacing: -0.02em;
        }
        .nav-logo span { color: var(--rose-deep); font-style: italic; }
        .nav-links {
          display: flex; gap: 32px; list-style: none;
        }
        .nav-links a {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-mid);
          text-decoration: none;
          letter-spacing: 0.04em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: var(--rose-deep); }

        /* ── Hero ── */
        .hero {
          min-height: 100vh;
          position: relative;
          display: flex; align-items: center; justify-content: center;
          overflow: hidden;
          z-index: 2;
        }

        .hero-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 70% 60% at 20% 40%, rgba(253,164,175,0.22) 0%, transparent 70%),
            radial-gradient(ellipse 50% 40% at 80% 70%, rgba(196,181,253,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 60% 50% at 60% 10%, rgba(253,230,138,0.14) 0%, transparent 60%),
            linear-gradient(160deg, #fff8f5 0%, #fdf2f8 50%, #faf5ff 100%);
          z-index: 0;
        }

        /* Soft grain overlay */
        .hero-bg::after {
          content: '';
          position: absolute; inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-flowers-left {
          position: absolute; left: -20px; bottom: 60px;
          display: flex; flex-direction: column; gap: 8px;
          animation: floatLeft 6s ease-in-out infinite;
          z-index: 1;
        }
        .hero-flowers-right {
          position: absolute; right: -10px; top: 80px;
          display: flex; flex-direction: column; gap: 12px;
          animation: floatRight 7s ease-in-out infinite;
          z-index: 1;
        }
        @keyframes floatLeft {
          0%,100% { transform: translateY(0) rotate(-3deg); }
          50%      { transform: translateY(-18px) rotate(2deg); }
        }
        @keyframes floatRight {
          0%,100% { transform: translateY(0) rotate(5deg); }
          50%      { transform: translateY(-14px) rotate(-2deg); }
        }

        .hero-content {
          position: relative; z-index: 2;
          text-align: center;
          max-width: 700px;
          padding: 0 24px;
          animation: heroReveal 1.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes heroReveal {
          from { opacity: 0; transform: translateY(40px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .hero-eyebrow {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.75rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-soft);
          margin-bottom: 20px;
          animation: heroReveal 1.2s 0.1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-eyebrow::before,
        .hero-eyebrow::after {
          content: '— ';
          color: var(--rose);
        }
        .hero-eyebrow::after { content: ' —'; }

        .hero-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(3rem, 7vw, 5.5rem);
          font-weight: 700;
          line-height: 1.05;
          color: var(--text-dark);
          letter-spacing: -0.03em;
          margin-bottom: 10px;
          animation: heroReveal 1.2s 0.2s cubic-bezier(0.16,1,0.3,1) both;
        }
        .hero-title em {
          font-style: italic;
          color: var(--rose-deep);
          position: relative;
        }
        .hero-title em::after {
          content: '';
          position: absolute;
          left: 0; right: 0; bottom: -4px;
          height: 3px;
          background: linear-gradient(90deg, var(--rose), var(--rose-deep), var(--lavender));
          border-radius: 2px;
          opacity: 0.6;
        }

        .hero-subtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(1.1rem, 2.5vw, 1.5rem);
          font-weight: 300;
          font-style: italic;
          color: var(--text-mid);
          line-height: 1.6;
          margin: 28px auto 44px;
          max-width: 520px;
          animation: heroReveal 1.2s 0.35s cubic-bezier(0.16,1,0.3,1) both;
        }

        .hero-cta-group {
          display: flex; gap: 16px; justify-content: center; align-items: center;
          flex-wrap: wrap;
          animation: heroReveal 1.2s 0.5s cubic-bezier(0.16,1,0.3,1) both;
        }

        .btn-primary {
          position: relative;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: white;
          background: linear-gradient(135deg, #f472b6, #ec4899, #db2777);
          border: none;
          padding: 16px 40px;
          border-radius: 50px;
          cursor: pointer;
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
          box-shadow: 0 8px 32px rgba(244,114,182,0.4), 0 2px 8px rgba(244,114,182,0.2);
        }
        .btn-primary::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.2), transparent);
          opacity: 0; transition: opacity 0.25s;
        }
        .btn-primary:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 14px 40px rgba(244,114,182,0.5); }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:active { transform: translateY(0) scale(0.98); }

        .btn-secondary {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.85rem;
          font-weight: 400;
          color: var(--text-mid);
          background: transparent;
          border: 1.5px solid rgba(244,114,182,0.3);
          padding: 15px 32px;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .btn-secondary:hover {
          background: rgba(249,168,201,0.1);
          border-color: var(--rose-deep);
          color: var(--rose-deep);
          transform: translateY(-2px);
        }

        .hero-stats {
          display: flex; gap: 40px; justify-content: center;
          margin-top: 56px;
          animation: heroReveal 1.2s 0.7s cubic-bezier(0.16,1,0.3,1) both;
        }
        .stat { text-align: center; }
        .stat-num {
          font-family: 'Playfair Display', serif;
          font-size: 1.8rem;
          font-weight: 700;
          color: var(--rose-deep);
          display: block;
          line-height: 1;
        }
        .stat-label {
          font-size: 0.72rem;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--text-soft);
          margin-top: 4px;
          display: block;
        }
        .stat-divider {
          width: 1px;
          background: linear-gradient(to bottom, transparent, var(--rose), transparent);
          margin: 4px 0;
        }

        /* ── Scroll indicator ── */
        .scroll-hint {
          position: absolute; bottom: 36px; left: 50%;
          transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          z-index: 2;
          animation: heroReveal 1.2s 1s cubic-bezier(0.16,1,0.3,1) both;
        }
        .scroll-hint span {
          font-size: 0.68rem; letter-spacing: 0.15em; text-transform: uppercase;
          color: var(--text-soft);
        }
        .scroll-line {
          width: 1px; height: 36px;
          background: linear-gradient(to bottom, var(--rose), transparent);
          animation: scrollLine 1.8s ease-in-out infinite;
        }
        @keyframes scrollLine {
          0%,100% { transform: scaleY(1); transform-origin: top; opacity: 1; }
          50%      { transform: scaleY(0.4); opacity: 0.5; }
        }

        /* ── Marquee strip ── */
        .marquee-section {
          position: relative; z-index: 3;
          overflow: hidden;
          padding: 18px 0;
          background: linear-gradient(90deg, rgba(244,114,182,0.06), rgba(196,181,253,0.06), rgba(253,230,138,0.06));
          border-top: 1px solid rgba(249,168,201,0.2);
          border-bottom: 1px solid rgba(249,168,201,0.2);
        }
        .marquee-track {
          display: flex; gap: 0;
          animation: marquee 25s linear infinite;
          white-space: nowrap;
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        .marquee-item {
          display: inline-flex; align-items: center; gap: 12px;
          padding: 0 32px;
          font-family: 'Cormorant Garamond', serif;
          font-size: 0.95rem;
          font-style: italic;
          color: var(--text-soft);
          letter-spacing: 0.05em;
        }
        .marquee-dot { color: var(--rose); font-style: normal; font-size: 1.1rem; }

        /* ── How It Works ── */
        .section {
          position: relative; z-index: 3;
          padding: 100px 40px;
          max-width: 1100px;
          margin: 0 auto;
        }
        .section-label {
          font-family: 'DM Sans', sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--rose-deep);
          text-align: center;
          margin-bottom: 16px;
        }
        .section-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2rem, 4vw, 3rem);
          font-weight: 700;
          text-align: center;
          color: var(--text-dark);
          line-height: 1.2;
          margin-bottom: 16px;
        }
        .section-title em { font-style: italic; color: var(--rose-deep); }
        .section-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.15rem;
          font-style: italic;
          color: var(--text-soft);
          text-align: center;
          margin-bottom: 64px;
        }

        /* Steps */
        .steps {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          position: relative;
        }
        .steps::before {
          content: '';
          position: absolute;
          top: 52px; left: 15%; right: 15%;
          height: 1px;
          background: linear-gradient(90deg, transparent, var(--rose), var(--lavender), var(--sage), transparent);
          opacity: 0.5;
        }
        .step {
          display: flex; flex-direction: column; align-items: center;
          text-align: center; gap: 16px;
          padding: 32px 20px;
          background: rgba(255,255,255,0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(249,168,201,0.25);
          border-radius: 24px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          position: relative;
        }
        .step:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 50px rgba(244,114,182,0.15);
        }
        .step-num {
          position: absolute; top: -14px; left: 50%;
          transform: translateX(-50%);
          width: 28px; height: 28px;
          background: linear-gradient(135deg, var(--rose), var(--rose-deep));
          color: white;
          border-radius: 50%;
          font-family: 'Playfair Display', serif;
          font-size: 0.85rem;
          font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 4px 12px rgba(244,114,182,0.3);
        }
        .step-icon {
          width: 64px; height: 64px;
          background: linear-gradient(135deg, rgba(249,168,201,0.2), rgba(196,181,253,0.2));
          border-radius: 20px;
          display: flex; align-items: center; justify-content: center;
          font-size: 1.8rem;
        }
        .step h3 {
          font-family: 'Playfair Display', serif;
          font-size: 1.05rem; font-weight: 600;
          color: var(--text-dark);
        }
        .step p {
          font-size: 0.82rem; color: var(--text-soft);
          line-height: 1.6;
        }

        /* ── Feature Cards ── */
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: 24px; margin-top: 48px;
        }
        .feature-card {
          padding: 36px 28px;
          border-radius: 28px;
          background: white;
          border: 1px solid rgba(249,168,201,0.2);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 16px 48px rgba(244,114,182,0.12);
        }
        .feature-icon {
          font-size: 2rem; margin-bottom: 16px;
        }
        .feature-title {
          font-family: 'Playfair Display', serif;
          font-size: 1.1rem; font-weight: 600;
          color: var(--text-dark);
          margin-bottom: 10px;
        }
        .feature-desc {
          font-size: 0.83rem;
          color: var(--text-soft);
          line-height: 1.65;
        }

        /* ── Bouquet Preview Showcase ── */
        .showcase {
          position: relative; z-index: 3;
          padding: 80px 40px;
          background: linear-gradient(160deg, rgba(253,164,175,0.08), rgba(196,181,253,0.08));
          border-top: 1px solid rgba(249,168,201,0.15);
          border-bottom: 1px solid rgba(249,168,201,0.15);
          overflow: hidden;
        }
        .showcase-inner {
          max-width: 1000px; margin: 0 auto;
          display: grid; grid-template-columns: 1fr 1fr; gap: 64px;
          align-items: center;
        }
        .bouquet-preview {
          position: relative;
          width: 320px; height: 380px;
          margin: 0 auto;
        }
        .bouquet-stem-wrap {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 80px; height: 200px;
        }
        .bouquet-flower {
          position: absolute;
          transition: transform 0.6s cubic-bezier(0.34,1.56,0.64,1);
          animation: gentleSway 4s ease-in-out infinite;
        }
        @keyframes gentleSway {
          0%,100% { transform: rotate(var(--r, 0deg)) translateY(0); }
          50%      { transform: rotate(calc(var(--r, 0deg) + 3deg)) translateY(-4px); }
        }
        .bouquet-wrap {
          position: absolute;
          bottom: 0; left: 50%;
          transform: translateX(-50%);
          width: 120px; height: 80px;
          background: linear-gradient(135deg, rgba(253,230,138,0.6), rgba(249,168,201,0.4));
          border-radius: 50% 50% 0 0 / 60% 60% 0 0;
          border: 2px solid rgba(253,230,138,0.8);
        }
        .bouquet-ribbon {
          position: absolute; bottom: -10px; left: 50%;
          transform: translateX(-50%);
          width: 40px; height: 30px;
          background: rgba(196,181,253,0.7);
          clip-path: polygon(0 0, 100% 0, 80% 100%, 20% 100%);
        }

        .showcase-text { padding: 20px 0; }
        .showcase-text .section-label { text-align: left; }
        .showcase-text .section-title { text-align: left; font-size: 2.2rem; }
        .showcase-text .section-sub { text-align: left; margin-bottom: 32px; }
        .showcase-list {
          list-style: none;
          display: flex; flex-direction: column; gap: 14px;
          margin-bottom: 36px;
        }
        .showcase-list li {
          display: flex; align-items: center; gap: 12px;
          font-size: 0.88rem; color: var(--text-mid);
        }
        .showcase-list li::before {
          content: '✦';
          color: var(--rose-deep);
          font-size: 0.65rem;
          flex-shrink: 0;
        }

        /* ── Testimonials ── */
        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
        }
        .testimonial {
          padding: 28px 24px;
          background: white;
          border: 1px solid rgba(249,168,201,0.2);
          border-radius: 20px;
          animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) both;
          position: relative;
        }
        .testimonial::before {
          content: '"';
          position: absolute; top: 12px; left: 20px;
          font-family: 'Playfair Display', serif;
          font-size: 4rem; color: rgba(244,114,182,0.1);
          line-height: 1;
        }
        .testimonial-quote {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem; font-style: italic;
          color: var(--text-mid);
          line-height: 1.7;
          margin-bottom: 16px;
        }
        .testimonial-name {
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--text-soft);
          letter-spacing: 0.05em;
        }

        /* ── CTA Section ── */
        .cta-section {
          position: relative; z-index: 3;
          padding: 120px 40px;
          text-align: center;
          overflow: hidden;
        }
        .cta-bg {
          position: absolute; inset: 0;
          background:
            radial-gradient(ellipse 80% 70% at 50% 50%, rgba(253,164,175,0.15) 0%, transparent 70%),
            linear-gradient(160deg, #fff8f5, #fdf2f8);
        }
        .cta-content { position: relative; z-index: 1; }
        .cta-title {
          font-family: 'Playfair Display', serif;
          font-size: clamp(2.2rem, 5vw, 3.8rem);
          font-weight: 700;
          color: var(--text-dark);
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .cta-title em { font-style: italic; color: var(--rose-deep); }
        .cta-sub {
          font-family: 'Cormorant Garamond', serif;
          font-size: 1.2rem; font-style: italic;
          color: var(--text-soft);
          margin-bottom: 44px;
        }
        .cta-flowers {
          display: flex; justify-content: center; gap: 16px;
          margin-bottom: 48px;
          animation: petalRow 5s ease-in-out infinite;
        }
        @keyframes petalRow {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-10px); }
        }

        /* ── Footer ── */
        .footer {
          position: relative; z-index: 3;
          padding: 40px;
          border-top: 1px solid rgba(249,168,201,0.15);
          display: flex; align-items: center; justify-content: space-between;
          flex-wrap: wrap; gap: 16px;
        }
        .footer-logo {
          font-family: 'Playfair Display', serif;
          font-size: 1rem; font-weight: 700;
          color: var(--text-dark);
        }
        .footer-logo span { color: var(--rose-deep); font-style: italic; }
        .footer-copy {
          font-size: 0.75rem; color: var(--text-soft);
          letter-spacing: 0.05em;
        }
        .footer-links {
          display: flex; gap: 24px; list-style: none;
        }
        .footer-links a {
          font-size: 0.75rem; color: var(--text-soft);
          text-decoration: none; letter-spacing: 0.05em;
          transition: color 0.2s;
        }
        .footer-links a:hover { color: var(--rose-deep); }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .nav-links { display: none; }
          .showcase-inner { grid-template-columns: 1fr; text-align: center; }
          .showcase-text .section-label,
          .showcase-text .section-title,
          .showcase-text .section-sub { text-align: center; }
          .hero-flowers-left, .hero-flowers-right { display: none; }
          .steps::before { display: none; }
          .hero-stats { gap: 24px; }
          .stat-divider { display: none; }
          .footer { justify-content: center; text-align: center; }
        }
      `}</style>

      {/* Custom Cursor */}
      <CursorTrail />

      {/* Floating Petals Background */}
      <div className="petals-bg">
        {petals.map((p, i) => (
          <div key={i} className="floating-petal"
            style={{ left: p.left, color: p.color, animationDelay: p.animationDelay, animationDuration: p.animationDuration }}>
            <svg width="12" height="16" viewBox="0 0 12 16">
              <ellipse cx="6" cy="8" rx="4.5" ry="7" fill="currentColor" opacity="0.55"/>
            </svg>
          </div>
        ))}
      </div>

      {/* Nav */}
      <nav className="nav">
        <div className="nav-logo">Little<span>Love</span>Studio</div>
        <ul className="nav-links">
          <li><a href="#how">How it works</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#testimonials">Stories</a></li>
        </ul>
        <Link href="/create" style={{ textDecoration:"none" }}>
          <button className="btn-primary" style={{ padding: "10px 24px", fontSize: "0.8rem" }}>
            Start Creating 🌸
          </button>
        </Link>
      </nav>

      {/* ══ HERO ══ */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg"/>

        {/* Sparkles */}
        {sparkles.map((s,i) => <Sparkle key={i} {...s} />)}

        {/* Side flowers */}
        <div className="hero-flowers-left">
          <RoseSVG size={90} opacity={0.7} rotate={-20}/>
          <TulipSVG size={70} opacity={0.5} rotate={10}/>
          <LavenderSVG size={60} opacity={0.6} rotate={-5}/>
        </div>
        <div className="hero-flowers-right">
          <PeonySVG size={80} opacity={0.65} rotate={15}/>
          <DaisySVG size={65} opacity={0.55} rotate={-8}/>
          <RoseSVG size={55} opacity={0.4} rotate={20}/>
        </div>

        <div className="hero-content">
          <p className="hero-eyebrow">Digital Floral Gifts</p>
          <h1 className="hero-title">
            Send a bouquet<br/>they'll <em>never</em> forget
          </h1>
          <p className="hero-subtitle">
            Design a custom animated bouquet, add your sweetest photos
            and heartfelt words — then deliver a love surprise that blooms on their screen.
          </p>
          <div className="hero-cta-group">
            <Link href="/create" style={{ textDecoration:"none" }}>
              <button className="btn-primary">
                Create a Love Surprise 💌
              </button>
            </Link>
            <Link href="/create" style={{ textDecoration:"none" }}>
              <button className="btn-secondary">
                See an Example →
              </button>
            </Link>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-num">12k+</span>
              <span className="stat-label">Bouquets sent</span>
            </div>
            <div className="stat-divider"/>
            <div className="stat">
              <span className="stat-num">98%</span>
              <span className="stat-label">Made someone cry (happy)</span>
            </div>
            <div className="stat-divider"/>
            <div className="stat">
              <span className="stat-num">∞</span>
              <span className="stat-label">Love created</span>
            </div>
          </div>
        </div>

        <div className="scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line"/>
        </div>
      </section>

      {/* ══ MARQUEE ══ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {Array.from({length: 2}).map((_,rep) =>
            ["Roses 🌹","Tulips 🌷","Peonies","Daisies 🌼","Lavender","Soft Greenery 🌿",
             "Love Notes 💌","Photos & Videos 📸","Animated Bouquets ✨","Heartfelt Surprises 💕",
             "Roses 🌹","Tulips 🌷","Peonies","Daisies 🌼"].map((item, i) => (
              <span key={`${rep}-${i}`} className="marquee-item">
                {item} <span className="marquee-dot">✦</span>
              </span>
            ))
          )}
        </div>
      </div>

      {/* ══ HOW IT WORKS ══ */}
      <section className="section" id="how">
        <p className="section-label">The Process</p>
        <h2 className="section-title">Four steps to <em>magic</em></h2>
        <p className="section-sub">Simple enough to feel effortless, beautiful enough to feel intentional.</p>
        <div className="steps">
          {[
            { icon: "🌸", title: "Choose Your Blooms", desc: "Pick from hand-illustrated watercolor flowers and arrange up to 10 blooms your way.", num: 1 },
            { icon: "✨", title: "Add the Magic", desc: "Layer in animations, soft greenery, and watch your bouquet come to life.", num: 2 },
            { icon: "💌", title: "Write from the Heart", desc: "Add a message, upload a photo or short video — make it completely yours.", num: 3 },
            { icon: "🎁", title: "Send the Surprise", desc: "Share a link, and they receive a beautiful animated bouquet on any device.", num: 4 },
          ].map(s => (
            <div className="step" key={s.num}>
              <div className="step-num">{s.num}</div>
              <div className="step-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══ BOUQUET SHOWCASE ══ */}
      <div className="showcase">
        <div className="showcase-inner">
          {/* Animated bouquet demo */}
          <div>
            <div className="bouquet-preview">
              <BouquetShowcase />
            </div>
          </div>
          <div className="showcase-text">
            <p className="section-label">The Bouquet Builder</p>
            <h2 className="section-title">Every bloom,<br/><em>perfectly placed</em></h2>
            <p className="section-sub">A natural arc arrangement, just like a real hand-tied bouquet.</p>
            <ul className="showcase-list">
              <li>Select from 8 hand-illustrated flower types</li>
              <li>Add soft greenery for depth and texture</li>
              <li>Up to 10 blooms, auto-arranged in a natural fan</li>
              <li>Gentle sway animations on every flower</li>
              <li>Watercolor SVG art — beautiful on any screen</li>
            </ul>
            <Link href="/create" style={{ textDecoration:"none" }}><button className="btn-primary">Start Your Bouquet →</button></Link>
          </div>
        </div>
      </div>

      {/* ══ FEATURES ══ */}
      <section className="section" id="features">
        <p className="section-label">Everything Included</p>
        <h2 className="section-title">Built for <em>real feelings</em></h2>
        <p className="section-sub">Not just pretty — designed to actually move people.</p>
        <div className="features-grid">
          {[
            { icon: "🎨", title: "Watercolor Illustrations", desc: "Every flower is a delicate SVG watercolor — soft, romantic, and beautiful at any size.", delay: "0s" },
            { icon: "📸", title: "Photos & Videos", desc: "Embed a favourite photo or a short video message right inside the bouquet reveal.", delay: "0.1s" },
            { icon: "✍️", title: "Heartfelt Letters", desc: "Write your message with a beautiful font and soft paper texture background.", delay: "0.2s" },
            { icon: "🎬", title: "Animated Reveal", desc: "Recipients get a cinematic opening experience — petals bloom one by one on screen.", delay: "0.3s" },
            { icon: "🔗", title: "Share Anywhere", desc: "Send via link — works on every phone, tablet, and browser with no app needed.", delay: "0.4s" },
            { icon: "💾", title: "Keep Forever", desc: "Bouquets are saved and can be revisited any time — a digital keepsake.", delay: "0.5s" },
          ].map(f => <FeatureCard key={f.title} {...f} />)}
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="section" id="testimonials" style={{ paddingTop: "60px" }}>
        <p className="section-label">Love Stories</p>
        <h2 className="section-title">What people are <em>saying</em></h2>
        <p className="section-sub">Real reactions from real surprises.</p>
        <div className="testimonials-grid">
          {[
            { quote: "I sent this to my girlfriend on our anniversary and she cried the happiest tears. It felt so personal and magical — nothing like a normal e-card.", name: "Marco R.", emoji: "🌹", delay: "0s" },
            { quote: "I'm not creative at all but this made me feel like an artist. The bouquet I made looked genuinely beautiful. She saved the link and still looks at it.", name: "Priya S.", emoji: "🌸", delay: "0.15s" },
            { quote: "My long-distance partner opened it at midnight and called me instantly. The animated reveal is just breathtaking — I can't believe how lovely it is.", name: "Yuki T.", emoji: "💌", delay: "0.3s" },
          ].map(t => <Testimonial key={t.name} {...t} />)}
        </div>
      </section>

      {/* ══ FINAL CTA ══ */}
      <section className="cta-section">
        <div className="cta-bg"/>
        <div className="cta-content">
          <div className="cta-flowers">
            <RoseSVG size={52} opacity={0.8} rotate={-10}/>
            <PeonySVG size={60} opacity={0.9} rotate={0}/>
            <DaisySVG size={48} opacity={0.75} rotate={8}/>
            <TulipSVG size={52} opacity={0.8} rotate={-5}/>
            <LavenderSVG size={44} opacity={0.7} rotate={12}/>
          </div>
          <h2 className="cta-title">
            Someone out there<br/>deserves a little <em>love</em> today.
          </h2>
          <p className="cta-sub">It only takes a few minutes to make something that lasts forever.</p>
          <Link href="/create" style={{ textDecoration:"none" }}>
            <button className="btn-primary" style={{ fontSize: "1rem", padding: "18px 52px" }}>
              Create Your Bouquet 🌷
            </button>
          </Link>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer className="footer">
        <div className="footer-logo">Little<span>Love</span>Studio</div>
        <p className="footer-copy">© 2026 — Made with love, for love.</p>
        <ul className="footer-links">
          <li><a href="#">Privacy</a></li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </footer>
    </>
  );
}

// ── Cursor Tracker ─────────────────────────────────────────────────────
function CursorTrail() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top  = e.clientY + "px";
      }
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div ref={cursorRef} className="cursor"/>
      <div ref={dotRef}    className="cursor-dot"/>
    </>
  );
}

// ── Bouquet Showcase (animated arc arrangement) ────────────────────────
function BouquetShowcase() {
  // 7 flowers in a natural arc fan
  const flowers = [
    { Component: RoseSVG,     size: 64, x: 130, y: 60,  rotate: -30, delay: "0s",    color: "rose" },
    { Component: TulipSVG,    size: 58, x: 175, y: 90,  rotate: -15, delay: "0.3s",  color: "tulip" },
    { Component: PeonySVG,    size: 70, x: 218, y: 72,  rotate: 0,   delay: "0.6s",  color: "peony" },
    { Component: DaisySVG,    size: 58, x: 260, y: 90,  rotate: 15,  delay: "0.9s",  color: "daisy" },
    { Component: RoseSVG,     size: 60, x: 300, y: 65,  rotate: 28,  delay: "1.1s",  color: "rose2" },
    { Component: LavenderSVG, size: 52, x: 148, y: 120, rotate: -22, delay: "0.15s", color: "lav" },
    { Component: TulipSVG,    size: 50, x: 285, y: 118, rotate: 22,  delay: "0.75s", color: "tulip2" },
  ];

  return (
    <div style={{ position: "relative", width: "340px", height: "380px" }}>
      {/* Soft glow behind bouquet */}
      <div style={{
        position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)",
        width: 220, height: 180,
        background: "radial-gradient(ellipse, rgba(249,168,201,0.25) 0%, transparent 70%)",
        borderRadius: "50%",
        filter: "blur(20px)",
      }}/>

      {/* Flowers */}
      {flowers.map((f, i) => (
        <div key={i} style={{
          position: "absolute",
          left: f.x, top: f.y,
          transform: `rotate(${f.rotate}deg)`,
          "--r": `${f.rotate}deg`,
          animation: `gentleSway ${3.5 + i*0.4}s ease-in-out infinite`,
          animationDelay: f.delay,
          filter: "drop-shadow(0 4px 8px rgba(244,114,182,0.25))",
        }}>
          <f.Component size={f.size} opacity={0.95}/>
        </div>
      ))}

      {/* Stems */}
      <svg style={{ position: "absolute", bottom: 60, left: "50%", transform: "translateX(-50%)" }}
        width="160" height="120" viewBox="0 0 160 120">
        {[
          "M 30 0 Q 40 60 70 110",
          "M 50 0 Q 55 55 72 110",
          "M 75 0 Q 76 50 74 110",
          "M 98 0 Q 96 55 76 110",
          "M 118 0 Q 110 60 78 110",
          "M 40 15 Q 48 60 71 110",
          "M 108 18 Q 102 60 77 110",
        ].map((d, i) => (
          <path key={i} d={d} stroke="#86efac" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7"/>
        ))}
      </svg>

      {/* Wrap / ribbon */}
      <div style={{
        position: "absolute", bottom: 40, left: "50%",
        transform: "translateX(-50%)",
        width: 120, height: 70,
        background: "linear-gradient(135deg, rgba(253,230,138,0.7), rgba(249,168,201,0.5))",
        borderRadius: "50% 50% 20% 20% / 40% 40% 20% 20%",
        border: "1.5px solid rgba(253,230,138,0.9)",
        boxShadow: "0 4px 16px rgba(253,230,138,0.3)",
      }}/>
      {/* Bow */}
      <div style={{
        position: "absolute", bottom: 36, left: "50%",
        transform: "translateX(-50%)",
        display: "flex", alignItems: "center", gap: 2,
      }}>
        <div style={{
          width: 22, height: 14, background: "rgba(196,181,253,0.8)",
          borderRadius: "50% 0 0 50%",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4)",
        }}/>
        <div style={{ width: 10, height: 10, background: "rgba(196,181,253,0.9)", borderRadius: "50%" }}/>
        <div style={{
          width: 22, height: 14, background: "rgba(196,181,253,0.8)",
          borderRadius: "0 50% 50% 0",
          boxShadow: "inset 0 2px 4px rgba(255,255,255,0.4)",
        }}/>
      </div>
    </div>
  );
}
