"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ═══════════════════════════════════════════════════════════════════
// ILLUSTRATED FLOWER SYSTEM
// Each flower is an SVG drawn with hand-tuned cubic bezier paths
// modeled directly after the watercolor sticker reference images.
// Every petal uses a unique hand-shaped path — no ellipse rotation tricks.
// ═══════════════════════════════════════════════════════════════════

// Inline SVG gradient / filter defs reused across all flowers
const G = {
  // Rose gradients
  roseDeep: ["#9f1239","#e11d48","#fb7185","#fecdd3"],
  roseMid:  ["#be123c","#f43f5e","#fda4af"],
  // Peony
  peonyDeep:["#831843","#be185d","#ec4899","#fbcfe8"],
  // Hibiscus / camomile
  daisyCenter:["#92400e","#d97706","#fbbf24","#fef9c3"],
  // Sunflower
  sunYellow:["#92400e","#ca8a04","#fbbf24","#fef08a"],
  // Orchid
  orchidPurp:["#581c87","#9333ea","#c084fc","#fdf4ff"],
  // Lavender
  lavPurp:  ["#4c1d95","#6d28d9","#8b5cf6","#ede9fe"],
};

// ── ROSE — big hibiscus-style, 5 wide ruffled petals ─────────────
function RoseAt({ cx, cy, sc=1, rot=0 }) {
  const id = `rose_${cx|0}_${cy|0}`;
  // Each petal is a unique hand-drawn shape starting from center (0,0)
  const petals = [
    // top petal
    "M0,0 C-18,-8 -24,-35 -10,-52 C-2,-62 2,-62 10,-52 C24,-35 18,-8 0,0Z",
    // top-right petal  
    "M0,0 C8,-4 32,-10 44,-28 C50,-40 44,-50 32,-46 C18,-40 4,-22 0,0Z",
    // bottom-right petal
    "M0,0 C10,4 28,20 30,40 C32,52 22,58 12,50 C0,40 -4,18 0,0Z",
    // bottom-left petal
    "M0,0 C-4,4 -18,20 -28,36 C-36,50 -46,50 -46,36 C-46,20 -28,8 0,0Z",
    // top-left petal
    "M0,0 C-8,-4 -36,-8 -46,-26 C-52,-40 -44,-50 -32,-46 C-18,-40 -6,-20 0,0Z",
  ];
  const colors = ["#e11d48","#f43f5e","#fb7185","#f43f5e","#e11d48"];
  const darks  = ["#9f1239","#be123c","#e11d48","#be123c","#9f1239"];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        {petals.map((_,i)=>(
          <radialGradient key={i} id={`${id}p${i}`} cx="40%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#fecdd3"/>
            <stop offset="40%" stopColor={colors[i]}/>
            <stop offset="100%" stopColor={darks[i]}/>
          </radialGradient>
        ))}
        <radialGradient id={`${id}c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff1f2"/>
          <stop offset="60%" stopColor="#fda4af"/>
          <stop offset="100%" stopColor="#f43f5e"/>
        </radialGradient>
      </defs>
      {/* Petals back layer (slightly larger, darker) */}
      {petals.map((d,i)=>(
        <path key={`b${i}`} d={d}
          fill={darks[i]} opacity="0.55"
          transform={`rotate(${i*2-4}) scale(1.08)`}/>
      ))}
      {/* Main petals */}
      {petals.map((d,i)=>(
        <g key={i}>
          <path d={d} fill={`url(#${id}p${i})`} opacity="0.95"/>
          {/* White vein highlight */}
          <path d={d.replace('Z','')} fill="none"
            stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
        </g>
      ))}
      {/* Petal edge detail lines */}
      <path d="M0,0 C-18,-8 -24,-35 -10,-52" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <path d="M0,0 C8,-4 32,-10 44,-28" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      {/* Center */}
      <circle r="13" fill={`url(#${id}c)`} stroke="#f43f5e" strokeWidth="0.8"/>
      {/* Stamen cluster */}
      {[0,40,80,120,160,200,240,280,320].map((a,i)=>{
        const r2=6+i%3; const ar=a*Math.PI/180;
        const x2=(Math.cos(ar)*r2).toFixed(2), y2=(Math.sin(ar)*r2).toFixed(2);
        return <line key={i} x1="0" y1="0" x2={x2} y2={y2} stroke="#fb7185" strokeWidth="0.8" opacity="0.8"/>;
      })}
      {[0,60,120,180,240,300].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*7).toFixed(2)} cy={(Math.sin(ar)*7).toFixed(2)} r="1.5" fill="#fecdd3"/>;
      })}
      <circle r="4" fill="#fff1f2"/>
    </g>
  );
}

// ── TULIP — elegant cup shape like reference ──────────────────────
function TulipAt({ cx, cy, sc=1, rot=0 }) {
  const id = `tulip_${cx|0}_${cy|0}`;
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <linearGradient id={`${id}L`} x1="0%" y1="100%" x2="20%" y2="0%">
          <stop offset="0%" stopColor="#881337"/>
          <stop offset="50%" stopColor="#e11d48"/>
          <stop offset="100%" stopColor="#fda4af"/>
        </linearGradient>
        <linearGradient id={`${id}R`} x1="100%" y1="100%" x2="80%" y2="0%">
          <stop offset="0%" stopColor="#9f1239"/>
          <stop offset="50%" stopColor="#f43f5e"/>
          <stop offset="100%" stopColor="#fecdd3"/>
        </linearGradient>
        <linearGradient id={`${id}C`} x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#be123c"/>
          <stop offset="100%" stopColor="#fda4af"/>
        </linearGradient>
      </defs>
      {/* Outer back petals */}
      <path d="M0,12 C-28,4 -38,-24 -26,-52 C-18,-64 -8,-58 -2,-44 Z"
        fill="#881337" opacity="0.7"/>
      <path d="M0,12 C28,4 38,-24 26,-52 C18,-64 8,-58 2,-44 Z"
        fill="#9f1239" opacity="0.7"/>
      {/* Left petal */}
      <path d="M0,12 C-24,4 -36,-20 -24,-50 C-16,-64 -6,-58 0,-44 Z"
        fill={`url(#${id}L)`} opacity="0.95"/>
      {/* Right petal */}
      <path d="M0,12 C24,4 36,-20 24,-50 C16,-64 6,-58 0,-44 Z"
        fill={`url(#${id}R)`} opacity="0.95"/>
      {/* Center front petal */}
      <path d="M0,12 C-12,-4 -14,-34 0,-56 C14,-34 12,-4 0,12 Z"
        fill={`url(#${id}C)`} opacity="0.9"/>
      {/* Sheen */}
      <path d="M-6,0 C-7,-18 -5,-38 -1,-52" stroke="rgba(255,255,255,0.5)" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M4,-8 C4,-24 3,-40 1,-50" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
      {/* Stem + leaf */}
      <path d="M0,14 C1,26 -1,36 0,50" stroke="#16a34a" strokeWidth="3.5" fill="none" strokeLinecap="round"/>
      <path d="M0,32 C-14,26 -20,14 -14,4" fill="#22c55e" stroke="#15803d" strokeWidth="0.8"/>
    </g>
  );
}

// ── DAISY — cheerful white petals, golden raised center ───────────
function DaisyAt({ cx, cy, sc=1, rot=0 }) {
  const id = `daisy_${cx|0}_${cy|0}`;
  // Hand-drawn individual petals at different angles for organic look
  const pts = [
    [  0, "M0,0 C-6,-10 -5,-30 0,-40 C5,-30 6,-10 0,0Z"],
    [ 26, "M0,0 C-6,-10 -5,-30 0,-40 C5,-30 6,-10 0,0Z"],
    [ 52, "M0,0 C-7,-10 -5,-30 0,-38 C5,-30 6,-10 0,0Z"],
    [ 78, "M0,0 C-6,-10 -5,-31 0,-40 C5,-31 6,-10 0,0Z"],
    [104, "M0,0 C-6,-10 -4,-30 0,-39 C4,-30 6,-10 0,0Z"],
    [130, "M0,0 C-7,-10 -5,-29 0,-38 C5,-29 6,-10 0,0Z"],
    [156, "M0,0 C-6,-10 -5,-30 0,-40 C5,-30 6,-10 0,0Z"],
    [182, "M0,0 C-6,-10 -5,-30 0,-39 C5,-30 6,-10 0,0Z"],
    [208, "M0,0 C-7,-10 -5,-30 0,-40 C5,-30 7,-10 0,0Z"],
    [234, "M0,0 C-6,-10 -4,-29 0,-38 C4,-29 6,-10 0,0Z"],
    [260, "M0,0 C-6,-10 -5,-30 0,-40 C5,-30 6,-10 0,0Z"],
    [286, "M0,0 C-6,-10 -5,-31 0,-40 C5,-31 6,-10 0,0Z"],
    [312, "M0,0 C-7,-10 -5,-30 0,-39 C5,-30 6,-10 0,0Z"],
    [338, "M0,0 C-6,-10 -5,-30 0,-40 C5,-30 6,-10 0,0Z"],
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <radialGradient id={`${id}c`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fef9c3"/>
          <stop offset="50%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#b45309"/>
        </radialGradient>
      </defs>
      {/* Shadow petals (back) */}
      {pts.map(([a,d],i)=>(
        <g key={`s${i}`} transform={`rotate(${a+7})`}>
          <path d={d} fill="#e0f2fe" opacity="0.5"/>
        </g>
      ))}
      {/* White petals */}
      {pts.map(([a,d],i)=>(
        <g key={i} transform={`rotate(${a})`}>
          <path d={d} fill={i%3===0?"#ffffff":i%3===1?"#fefce8":"#f0fdf4"} opacity="0.97"/>
          <path d="M0,-6 C0,-18 0,-30 0,-36" stroke="rgba(220,252,231,0.6)" strokeWidth="0.7" fill="none"/>
        </g>
      ))}
      {/* Center dome */}
      <circle r="17" fill={`url(#${id}c)`} stroke="#92400e" strokeWidth="1.2"/>
      <circle r="11" fill="#fde68a" opacity="0.55"/>
      {[0,45,90,135,180,225,270,315].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*8).toFixed(2)} cy={(Math.sin(ar)*8).toFixed(2)} r="2.2" fill="#92400e" opacity="0.5"/>;
      })}
      {[22,67,112,157,202,247,292,337].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*5).toFixed(2)} cy={(Math.sin(ar)*5).toFixed(2)} r="1.5" fill="#78350f" opacity="0.6"/>;
      })}
      <circle r="5" fill="#7c2d12" opacity="0.85"/>
    </g>
  );
}

// ── PEONY — lush multi-ring bloom like reference ──────────────────
function PeonyAt({ cx, cy, sc=1, rot=0 }) {
  const id = `peony_${cx|0}_${cy|0}`;
  // Outer guard petals — individual wide shapes
  const outerPetals = [
    "M0,0 C-20,-6 -28,-36 -14,-54 C-6,-64 0,-56 0,-48 C0,-56 6,-64 14,-54 C28,-36 20,-6 0,0Z",
    "M0,0 C8,-2 30,-16 38,-40 C44,-56 34,-64 22,-56 C10,-46 2,-24 0,0Z",
    "M0,0 C10,4 22,22 20,46 C18,60 6,64 -2,56 C-12,44 -6,18 0,0Z",
    "M0,0 C-4,6 -20,24 -32,42 C-42,56 -54,52 -52,38 C-50,22 -28,8 0,0Z",
    "M0,0 C-10,-2 -34,-14 -44,-38 C-52,-54 -42,-64 -28,-58 C-14,-48 -4,-24 0,0Z",
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <radialGradient id={`${id}o`} cx="45%" cy="65%" r="60%">
          <stop offset="0%" stopColor="#fce7f3"/>
          <stop offset="35%" stopColor="#f9a8d4"/>
          <stop offset="100%" stopColor="#9d174d"/>
        </radialGradient>
        <radialGradient id={`${id}m`} cx="50%" cy="60%" r="55%">
          <stop offset="0%" stopColor="#fdf2f8"/>
          <stop offset="45%" stopColor="#f472b6"/>
          <stop offset="100%" stopColor="#be185d"/>
        </radialGradient>
        <radialGradient id={`${id}i`} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#fbcfe8"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </radialGradient>
        <radialGradient id={`${id}c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf2f8"/>
          <stop offset="100%" stopColor="#f9a8d4"/>
        </radialGradient>
      </defs>
      {/* Outer guard petals — deep shadow layer */}
      {outerPetals.map((d,i)=>(
        <path key={`os${i}`} d={d} fill="#831843" opacity="0.4" transform={`rotate(${i*3-6}) scale(1.1)`}/>
      ))}
      {/* Outer petals */}
      {outerPetals.map((d,i)=>(
        <path key={`o${i}`} d={d} fill={`url(#${id}o)`} opacity="0.9"/>
      ))}
      {/* Mid ring — slightly smaller, offset */}
      {[30,102,174,246,318].map((rot2,i)=>(
        <g key={`m${i}`} transform={`rotate(${rot2})`}>
          <path d="M0,0 C-16,-4 -20,-28 -10,-42 C-4,-50 0,-44 0,-38 C0,-44 4,-50 10,-42 C20,-28 16,-4 0,0Z"
            fill={`url(#${id}m)`} opacity="0.92"/>
        </g>
      ))}
      {/* Inner ring */}
      {[0,60,120,180,240,300].map((rot2,i)=>(
        <g key={`i${i}`} transform={`rotate(${rot2})`}>
          <path d="M0,0 C-10,-2 -14,-18 -7,-28 C-3,-34 0,-28 0,-24 C0,-28 3,-34 7,-28 C14,-18 10,-2 0,0Z"
            fill={`url(#${id}i)`} opacity="0.95"/>
        </g>
      ))}
      {/* Innermost furled petals */}
      {[20,80,140,200,260,320].map((rot2,i)=>(
        <g key={`f${i}`} transform={`rotate(${rot2})`}>
          <path d="M0,0 C-6,-2 -8,-12 -4,-18 C-2,-22 0,-18 0,-16 C0,-18 2,-22 4,-18 C8,-12 6,-2 0,0Z"
            fill="white" opacity="0.9"/>
        </g>
      ))}
      <circle r="9" fill={`url(#${id}c)`} stroke="#f9a8d4" strokeWidth="0.8"/>
      <circle r="5" fill="white" opacity="0.8"/>
    </g>
  );
}

// ── LAVENDER — proper botanical spike ────────────────────────────
function LavenderAt({ cx, cy, sc=1, rot=0 }) {
  const floretData = [
    {y:-62,x:3, cols:["#5b21b6","#7c3aed","#a78bfa"]},
    {y:-54,x:-4,cols:["#6d28d9","#8b5cf6","#c4b5fd"]},
    {y:-46,x:4, cols:["#5b21b6","#7c3aed","#a78bfa"]},
    {y:-38,x:-3,cols:["#6d28d9","#8b5cf6","#c4b5fd"]},
    {y:-30,x:3, cols:["#7c3aed","#9333ea","#c4b5fd"]},
    {y:-22,x:-4,cols:["#6d28d9","#8b5cf6","#ddd6fe"]},
    {y:-14,x:3, cols:["#7c3aed","#a78bfa","#ede9fe"]},
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      {/* Main stem */}
      <path d="M0,36 C1,18 -1,-2 0,-70" stroke="#16a34a" strokeWidth="3" fill="none" strokeLinecap="round"/>
      {/* Side leaves */}
      <path d="M0,20 C-16,14 -22,2 -16,-8 C-10,-14 -2,-6 0,6" fill="#22c55e" stroke="#15803d" strokeWidth="0.6" opacity="0.9"/>
      <path d="M0,8 C16,2 22,-10 16,-20 C10,-26 2,-18 0,-6" fill="#16a34a" stroke="#14532d" strokeWidth="0.6" opacity="0.9"/>
      {/* Florets */}
      {floretData.map(({y,x,cols},fi)=>(
        <g key={fi} transform={`translate(${x},${y})`}>
          {/* Left petal pair */}
          <path d={`M0,0 C-10,-4 -12,-16 -6,-22 C-2,-26 0,-20 0,-16Z`} fill={cols[0]} opacity="0.92" stroke="#4c1d95" strokeWidth="0.4"/>
          <path d={`M0,0 C10,-4 12,-16 6,-22 C2,-26 0,-20 0,-16Z`} fill={cols[0]} opacity="0.92" stroke="#4c1d95" strokeWidth="0.4"/>
          {/* Center petal */}
          <path d="M0,0 C-4,-6 -4,-16 0,-20 C4,-16 4,-6 0,0Z" fill={cols[1]} opacity="0.95"/>
          {/* Inner bright */}
          <circle r="3.5" fill={cols[2]} opacity="0.9"/>
          <circle r="1.8" fill="white" opacity="0.85"/>
        </g>
      ))}
    </g>
  );
}

// ── SUNFLOWER — bold like the reference ──────────────────────────
function SunflowerAt({ cx, cy, sc=1, rot=0 }) {
  const id = `sun_${cx|0}_${cy|0}`;
  // Individual ray petals — slightly varied lengths for organic feel
  const rays = [
    [  0, 52], [ 22, 54], [ 44, 51], [ 66, 53], [ 88, 52],
    [110, 54], [132, 51], [154, 53], [176, 52], [198, 54],
    [220, 52], [242, 53], [264, 54], [286, 51], [308, 53], [330, 52],
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <radialGradient id={`${id}d`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3b1a0a"/>
          <stop offset="55%" stopColor="#78350f"/>
          <stop offset="100%" stopColor="#92400e"/>
        </radialGradient>
        <radialGradient id={`${id}p`} cx="30%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#fef08a"/>
          <stop offset="55%" stopColor="#eab308"/>
          <stop offset="100%" stopColor="#a16207"/>
        </radialGradient>
      </defs>
      {/* Back ray ring (darker, slightly wider) */}
      {rays.map(([a,len],i)=>(
        <g key={`b${i}`} transform={`rotate(${a+11})`}>
          <path d={`M0,0 C-7,-16 -6,-${len-8} 0,-${len+2} C6,-${len-8} 7,-16 0,0Z`}
            fill="#a16207" opacity="0.7"/>
        </g>
      ))}
      {/* Main ray petals */}
      {rays.map(([a,len],i)=>(
        <g key={i} transform={`rotate(${a})`}>
          <path d={`M0,0 C-8,-16 -7,-${len-6} 0,-${len} C7,-${len-6} 8,-16 0,0Z`}
            fill={`url(#${id}p)`} opacity="0.97"/>
          <path d={`M0,-12 C0,-28 0,-${len-10} 0,-${len-4}`}
            stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" fill="none"/>
        </g>
      ))}
      {/* Disk */}
      <circle r="24" fill={`url(#${id}d)`} stroke="#3b1a0a" strokeWidth="1.5"/>
      {/* Floret dot pattern */}
      {[0,1,2,3].map(ring=>
        Array.from({length:Math.round(6+ring*5)},(_,i)=>{
          const a=(i*(360/(6+ring*5)))*Math.PI/180;
          const r2=ring*5+3;
          return <circle key={`${ring}-${i}`}
            cx={(Math.cos(a)*r2).toFixed(2)} cy={(Math.sin(a)*r2).toFixed(2)}
            r="1.8" fill="#fbbf24" opacity={(0.15+ring*0.05).toFixed(2)}/>;
        })
      )}
      <circle r="8" fill="#1c0a00" opacity="0.9"/>
    </g>
  );
}

// ── YELLOW ROSE ───────────────────────────────────────────────────
function YellowRoseAt({ cx, cy, sc=1, rot=0 }) {
  const id = `yrose_${cx|0}_${cy|0}`;
  const petals = [
    "M0,0 C-18,-8 -24,-35 -10,-52 C-2,-62 2,-62 10,-52 C24,-35 18,-8 0,0Z",
    "M0,0 C8,-4 32,-10 44,-28 C50,-40 44,-50 32,-46 C18,-40 4,-22 0,0Z",
    "M0,0 C10,4 28,20 30,40 C32,52 22,58 12,50 C0,40 -4,18 0,0Z",
    "M0,0 C-4,4 -18,20 -28,36 C-36,50 -46,50 -46,36 C-46,20 -28,8 0,0Z",
    "M0,0 C-8,-4 -36,-8 -46,-26 C-52,-40 -44,-50 -32,-46 C-18,-40 -6,-20 0,0Z",
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        {petals.map((_,i)=>(
          <radialGradient key={i} id={`${id}p${i}`} cx="40%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#fef9c3"/>
            <stop offset="45%" stopColor="#fbbf24"/>
            <stop offset="100%" stopColor="#b45309"/>
          </radialGradient>
        ))}
        <radialGradient id={`${id}c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fefce8"/>
          <stop offset="60%" stopColor="#fde047"/>
          <stop offset="100%" stopColor="#ca8a04"/>
        </radialGradient>
      </defs>
      {petals.map((d,i)=>(
        <path key={`b${i}`} d={d} fill="#92400e" opacity="0.4" transform={`rotate(${i*2-4}) scale(1.08)`}/>
      ))}
      {petals.map((d,i)=>(
        <g key={i}>
          <path d={d} fill={`url(#${id}p${i})`} opacity="0.95"/>
          <path d={d.replace('Z','')} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
        </g>
      ))}
      <path d="M0,0 C-18,-8 -24,-35 -10,-52" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle r="12" fill={`url(#${id}c)`} stroke="#ca8a04" strokeWidth="0.8"/>
      {[0,60,120,180,240,300].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*7).toFixed(2)} cy={(Math.sin(ar)*7).toFixed(2)} r="1.5" fill="#fef9c3"/>;
      })}
      <circle r="4" fill="#fefce8"/>
    </g>
  );
}

// ── PINK ROSE ─────────────────────────────────────────────────────
function PinkRoseAt({ cx, cy, sc=1, rot=0 }) {
  const id = `prose_${cx|0}_${cy|0}`;
  const petals = [
    "M0,0 C-18,-8 -24,-35 -10,-52 C-2,-62 2,-62 10,-52 C24,-35 18,-8 0,0Z",
    "M0,0 C8,-4 32,-10 44,-28 C50,-40 44,-50 32,-46 C18,-40 4,-22 0,0Z",
    "M0,0 C10,4 28,20 30,40 C32,52 22,58 12,50 C0,40 -4,18 0,0Z",
    "M0,0 C-4,4 -18,20 -28,36 C-36,50 -46,50 -46,36 C-46,20 -28,8 0,0Z",
    "M0,0 C-8,-4 -36,-8 -46,-26 C-52,-40 -44,-50 -32,-46 C-18,-40 -6,-20 0,0Z",
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        {petals.map((_,i)=>(
          <radialGradient key={i} id={`${id}p${i}`} cx="40%" cy="60%" r="65%">
            <stop offset="0%" stopColor="#fdf2f8"/>
            <stop offset="40%" stopColor="#f9a8d4"/>
            <stop offset="100%" stopColor="#be185d"/>
          </radialGradient>
        ))}
        <radialGradient id={`${id}c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fdf2f8"/>
          <stop offset="60%" stopColor="#fbcfe8"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </radialGradient>
      </defs>
      {petals.map((d,i)=>(
        <path key={`b${i}`} d={d} fill="#9d174d" opacity="0.4" transform={`rotate(${i*2-4}) scale(1.08)`}/>
      ))}
      {petals.map((d,i)=>(
        <g key={i}>
          <path d={d} fill={`url(#${id}p${i})`} opacity="0.95"/>
          <path d={d.replace('Z','')} fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2"/>
        </g>
      ))}
      <path d="M0,0 C-18,-8 -24,-35 -10,-52" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" strokeLinecap="round"/>
      <circle r="12" fill={`url(#${id}c)`} stroke="#ec4899" strokeWidth="0.8"/>
      {[0,60,120,180,240,300].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*7).toFixed(2)} cy={(Math.sin(ar)*7).toFixed(2)} r="1.5" fill="#fdf2f8"/>;
      })}
      <circle r="4" fill="#fce7f3"/>
    </g>
  );
}

// ── LOTUS — sacred bloom, layered pointed petals ──────────────────
function LotusAt({ cx, cy, sc=1, rot=0 }) {
  const id = `lotus_${cx|0}_${cy|0}`;
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <radialGradient id={`${id}o`} cx="50%" cy="80%" r="60%">
          <stop offset="0%" stopColor="#fce7f3"/>
          <stop offset="50%" stopColor="#f9a8d4"/>
          <stop offset="100%" stopColor="#db2777"/>
        </radialGradient>
        <radialGradient id={`${id}m`} cx="50%" cy="75%" r="55%">
          <stop offset="0%" stopColor="#fdf2f8"/>
          <stop offset="45%" stopColor="#fbcfe8"/>
          <stop offset="100%" stopColor="#ec4899"/>
        </radialGradient>
        <radialGradient id={`${id}i`} cx="50%" cy="70%" r="50%">
          <stop offset="0%" stopColor="#ffffff"/>
          <stop offset="60%" stopColor="#fce7f3"/>
          <stop offset="100%" stopColor="#f9a8d4"/>
        </radialGradient>
        <radialGradient id={`${id}c`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fef9c3"/>
          <stop offset="60%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#d97706"/>
        </radialGradient>
      </defs>
      {/* Outer ring — 8 wide pointed petals */}
      {[0,45,90,135,180,225,270,315].map((a,i)=>(
        <g key={`o${i}`} transform={`rotate(${a})`}>
          <path d="M0,4 C-14,-2 -18,-30 0,-52 C18,-30 14,-2 0,4Z"
            fill={`url(#${id}o)`} opacity={0.82+i*0.01} stroke="#db2777" strokeWidth="0.5"/>
          <path d="M0,0 C0,-16 0,-34 0,-48" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" fill="none"/>
        </g>
      ))}
      {/* Mid ring — 8 petals, slightly smaller, offset */}
      {[22,67,112,157,202,247,292,337].map((a,i)=>(
        <g key={`m${i}`} transform={`rotate(${a})`}>
          <path d="M0,4 C-11,-2 -14,-24 0,-42 C14,-24 11,-2 0,4Z"
            fill={`url(#${id}m)`} opacity="0.9" stroke="#ec4899" strokeWidth="0.4"/>
        </g>
      ))}
      {/* Inner ring — tighter, upright */}
      {[0,51,102,153,204,255,306].map((a,i)=>(
        <g key={`i${i}`} transform={`rotate(${a})`}>
          <path d="M0,4 C-7,0 -9,-16 0,-30 C9,-16 7,0 0,4Z"
            fill={`url(#${id}i)`} opacity="0.95"/>
        </g>
      ))}
      {/* Innermost cupped petals */}
      {[25,85,145,205,265,325].map((a,i)=>(
        <g key={`c${i}`} transform={`rotate(${a})`}>
          <path d="M0,4 C-4,2 -5,-8 0,-16 C5,-8 4,2 0,4Z"
            fill="white" opacity="0.95"/>
        </g>
      ))}
      {/* Golden center */}
      <circle r="11" fill={`url(#${id}c)`} stroke="#92400e" strokeWidth="1"/>
      {[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*6).toFixed(2)} cy={(Math.sin(ar)*6).toFixed(2)} r="1.4" fill="#92400e" opacity="0.6"/>;
      })}
      <circle r="4" fill="#fef08a"/>
      {/* Lily pads suggestion at base */}
      <path d="M-18,8 C-28,4 -26,14 -14,14 C-6,14 -2,8 0,6" fill="#16a34a" opacity="0.7"/>
      <path d="M18,8 C28,4 26,14 14,14 C6,14 2,8 0,6" fill="#15803d" opacity="0.7"/>
    </g>
  );
}

// ── CAMOMILE — classic white daisy like reference ─────────────────
function CamomileAt({ cx, cy, sc=1, rot=0 }) {
  const id = `cam_${cx|0}_${cy|0}`;
  const pts = [
    [  0, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [ 24, "M0,0 C-5,-9 -4,-29 0,-37 C4,-29 5,-9 0,0Z"],
    [ 48, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [ 72, "M0,0 C-5,-9 -3,-28 0,-36 C3,-28 5,-9 0,0Z"],
    [ 96, "M0,0 C-5,-9 -4,-29 0,-37 C4,-29 5,-9 0,0Z"],
    [120, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [144, "M0,0 C-5,-9 -4,-28 0,-35 C4,-28 5,-9 0,0Z"],
    [168, "M0,0 C-5,-9 -4,-29 0,-37 C4,-29 5,-9 0,0Z"],
    [192, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [216, "M0,0 C-5,-9 -3,-28 0,-36 C3,-28 5,-9 0,0Z"],
    [240, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [264, "M0,0 C-5,-9 -4,-29 0,-37 C4,-29 5,-9 0,0Z"],
    [288, "M0,0 C-5,-9 -4,-28 0,-36 C4,-28 5,-9 0,0Z"],
    [312, "M0,0 C-5,-9 -4,-28 0,-35 C4,-28 5,-9 0,0Z"],
    [336, "M0,0 C-5,-9 -4,-29 0,-37 C4,-29 5,-9 0,0Z"],
  ];
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <defs>
        <radialGradient id={`${id}c`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#fef9c3"/>
          <stop offset="50%" stopColor="#fbbf24"/>
          <stop offset="100%" stopColor="#b45309"/>
        </radialGradient>
      </defs>
      {/* Back petals */}
      {pts.map(([a,d],i)=>(
        <g key={`b${i}`} transform={`rotate(${a+12})`}>
          <path d={d} fill="#dcfce7" opacity="0.6"/>
        </g>
      ))}
      {/* Front petals */}
      {pts.map(([a,d],i)=>(
        <g key={i} transform={`rotate(${a})`}>
          <path d={d} fill={i%2===0?"#ffffff":"#fefce8"} opacity="0.97"/>
          <path d="M0,-5 C0,-16 0,-26 0,-33" stroke="rgba(187,247,208,0.5)" strokeWidth="0.7" fill="none"/>
        </g>
      ))}
      {/* Center dome */}
      <circle r="16" fill={`url(#${id}c)`} stroke="#92400e" strokeWidth="1.2"/>
      <circle r="10" fill="#fde68a" opacity="0.5"/>
      {[0,36,72,108,144,180,216,252,288,324].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*7).toFixed(2)} cy={(Math.sin(ar)*7).toFixed(2)} r="1.8" fill="#92400e" opacity="0.5"/>;
      })}
      {[18,54,90,126,162,198,234,270,306,342].map((a,i)=>{
        const ar=a*Math.PI/180;
        return <circle key={i} cx={(Math.cos(ar)*4).toFixed(2)} cy={(Math.sin(ar)*4).toFixed(2)} r="1.3" fill="#78350f" opacity="0.7"/>;
      })}
      <circle r="4.5" fill="#7c2d12" opacity="0.9"/>
    </g>
  );
}

// ═══════════════════════════════════════════════════════════════════
// GREENERY — upright sprays, not horizontal
// ═══════════════════════════════════════════════════════════════════
function LeafAt({ cx, cy, sc=1, rot=0 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <path d="M0,10 C-1,-8 1,-40 0,-75" stroke="#15803d" strokeWidth="2.8" fill="none" strokeLinecap="round"/>
      {[[-20,-14,-50,"#16a34a"],[20,-22,50,"#15803d"],[-22,-36,-46,"#15803d"],[22,-44,46,"#166534"],
        [-18,-58,-40,"#16a34a"],[18,-66,40,"#15803d"],[0,-75,0,"#14532d"]].map(([lx,ly,lr,col],i)=>(
        <g key={i} transform={`translate(${lx},${ly}) rotate(${lr})`}>
          <path d="M0,0 C-12,-4 -16,-20 0,-26 C16,-20 12,-4 0,0Z"
            fill={col} stroke="#14532d" strokeWidth="0.9" opacity="0.92"/>
          <path d="M0,-2 C0,-10 0,-20 0,-24" stroke="rgba(255,255,255,0.22)" strokeWidth="1" fill="none"/>
        </g>
      ))}
    </g>
  );
}

function VineAt({ cx, cy, sc=1, rot=0 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <path d="M0,10 C-4,-10 4,-40 0,-80 C-3,-105 4,-120 0,-132" stroke="#16a34a" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {[[-22,-12,-44,"#22c55e"],[22,-28,44,"#16a34a"],[-20,-50,-40,"#15803d"],[20,-66,40,"#22c55e"],
        [-18,-86,-34,"#16a34a"],[18,-102,34,"#15803d"]].map(([lx,ly,lr,col],i)=>(
        <g key={i} transform={`translate(${lx},${ly}) rotate(${lr})`}>
          <path d="M0,0 C-10,-5 -14,-24 0,-30 C14,-24 10,-5 0,0Z"
            fill={col} stroke="#15803d" strokeWidth="0.9" opacity="0.9"/>
        </g>
      ))}
    </g>
  );
}

function FernAt({ cx, cy, sc=1, rot=0 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <path d="M0,12 C-1,-15 1,-48 0,-84" stroke="#14532d" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {[[-16,-8,-52],[16,-18,52],[-18,-30,-48],[18,-40,48],[-16,-54,-44],[16,-64,44],[-12,-74,-38],[12,-82,38]].map(([lx,ly,lr],i)=>(
        <g key={i} transform={`translate(${lx},${ly}) rotate(${lr})`}>
          <path d="M0,0 C-9,-3 -12,-16 -6,-22 C-2,-26 0,-20 0,-16 C0,-20 2,-26 6,-22 C12,-16 9,-3 0,0Z"
            fill={i%2===0?"#15803d":"#166534"} stroke="#14532d" strokeWidth="0.7" opacity="0.92"/>
        </g>
      ))}
    </g>
  );
}

function EucalyptusAt({ cx, cy, sc=1, rot=0 }) {
  return (
    <g transform={`translate(${cx},${cy}) rotate(${rot}) scale(${sc})`}>
      <path d="M0,10 C-2,-14 2,-46 0,-82" stroke="#166534" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {[[-18,-5,-20,"#6ee7b7"],[18,-16,20,"#34d399"],[-20,-30,-16,"#10b981"],[20,-42,16,"#6ee7b7"],
        [-18,-56,-14,"#34d399"],[18,-68,14,"#059669"],[-14,-78,-10,"#6ee7b7"],[14,-88,10,"#34d399"]].map(([lx,ly,lr,col],i)=>(
        <g key={i} transform={`translate(${lx},${ly}) rotate(${lr})`}>
          <path d="M0,0 C-14,-4 -16,-20 0,-24 C16,-20 14,-4 0,0Z"
            fill={col} stroke="#065f46" strokeWidth="0.9" opacity="0.9"/>
        </g>
      ))}
    </g>
  );
}

const FLOWER_RENDERERS = {
  rose:RoseAt, yellowrose:YellowRoseAt, pinkrose:PinkRoseAt,
  tulip:TulipAt, lotus:LotusAt, daisy:DaisyAt,
  peony:PeonyAt, lavender:LavenderAt, sunflower:SunflowerAt, camomile:CamomileAt,
};
const GREENERY_RENDERERS = {
  softleaves:LeafAt, vines:VineAt, fern:FernAt, eucalyptus:EucalyptusAt,
};

// ── FLOWER ICON ───────────────────────────────────────────────────
const FlowerIcon = ({ id, size=44 }) => {
  const Renderer = FLOWER_RENDERERS[id];
  if(!Renderer) return null;
  return (
    <svg width={size} height={size} viewBox="-52 -52 104 104" suppressHydrationWarning>
      <Renderer cx={0} cy={0} sc={0.88}/>
    </svg>
  );
};

// ── CLUSTER LAYOUT — tight dome, flowers up and overlapping ───────
const CLUSTER_SLOTS = [
  // Front center — biggest
  { dx:   0, dy:  20, sc: 1.28, rot:   0, layer: 4 },
  // Front sides
  { dx: -52, dy:  30, sc: 1.15, rot: -14, layer: 4 },
  { dx:  52, dy:  30, sc: 1.15, rot:  14, layer: 4 },
  // Mid ring
  { dx: -94, dy:  12, sc: 1.05, rot: -24, layer: 3 },
  { dx:  94, dy:  12, sc: 1.05, rot:  24, layer: 3 },
  { dx: -24, dy: -18, sc: 1.02, rot:  -8, layer: 3 },
  { dx:  24, dy: -18, sc: 1.02, rot:   8, layer: 3 },
  // Back row
  { dx:   0, dy: -56, sc: 0.90, rot:   2, layer: 2 },
  { dx: -55, dy: -44, sc: 0.87, rot: -18, layer: 2 },
  { dx:  55, dy: -44, sc: 0.87, rot:  18, layer: 2 },
];

// Greenery positioned BEHIND and FRAMING, not dominating
const GREENERY_SLOTS = [
  { dx:-110, dy:  38, sc: 1.05, rot: -52 },
  { dx: 110, dy:  38, sc: 1.05, rot:  52 },
  { dx: -80, dy: -52, sc: 0.95, rot: -70 },
  { dx:  80, dy: -52, sc: 0.95, rot:  70 },
  { dx:   0, dy: -82, sc: 0.88, rot:   2 },
  { dx:-134, dy:   0, sc: 0.82, rot: -58 },
  { dx: 134, dy:   0, sc: 0.82, rot:  58 },
  { dx:  45, dy: -72, sc: 0.80, rot:  35 },
];

function getClusterPositions(count) {
  return CLUSTER_SLOTS.slice(0,count).map(s=>({
    x: Math.round(220+s.dx), y: Math.round(240+s.dy),
    sc:s.sc, rot:s.rot, layer:s.layer,
  }));
}
function getGreeneryPositions(count) {
  return GREENERY_SLOTS.slice(0,count).map(s=>({
    x: Math.round(220+s.dx), y: Math.round(240+s.dy),
    sc:s.sc, rot:s.rot,
  }));
}

// ── BOUQUET SVG ───────────────────────────────────────────────────
function BouquetSVG({ flowers, greenery, width=460, height=420, animate=true }) {
  const positions   = getClusterPositions(flowers.length);
  const greeneryPos = getGreeneryPositions(greenery.length);
  return (
    <svg width={width} height={height} viewBox="0 0 440 390" suppressHydrationWarning style={{overflow:"visible"}}>
      <defs>
        <radialGradient id="bgGlow" cx="50%" cy="65%" r="50%">
          <stop offset="0%" stopColor="rgba(244,114,182,0.14)"/>
          <stop offset="100%" stopColor="rgba(244,114,182,0)"/>
        </radialGradient>
        <filter id="fShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#9d174d" floodOpacity="0.2"/>
        </filter>
        <filter id="gShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#14532d" floodOpacity="0.2"/>
        </filter>
      </defs>
      <ellipse cx="220" cy="300" rx="170" ry="80" fill="url(#bgGlow)"/>
      {/* Greenery BEHIND flowers */}
      {greenery.map((g,i)=>{
        const pos=greeneryPos[i]; if(!pos) return null;
        const GComp=GREENERY_RENDERERS[g.id]; if(!GComp) return null;
        return (
          <g key={g.id} filter="url(#gShadow)"
            style={animate?{animation:`leafSway ${5+i*0.7}s ease-in-out infinite`,animationDelay:`${i*0.4}s`,transformOrigin:`${pos.x}px ${pos.y}px`,transformBox:"fill-box"}:{}}>
            <GComp cx={pos.x} cy={pos.y} sc={pos.sc} rot={pos.rot}/>
          </g>
        );
      })}
      {/* Flowers back→front by layer */}
      {[...positions.map((pos,i)=>({...pos,flower:flowers[i],idx:i}))]
        .sort((a,b)=>a.layer-b.layer)
        .map(({x,y,sc,rot,flower,idx})=>{
          if(!flower) return null;
          const Renderer=FLOWER_RENDERERS[flower.id]; if(!Renderer) return null;
          return (
            <g key={flower.uid} filter="url(#fShadow)"
              style={animate?{animation:`flowerSway ${4+idx*0.28}s ease-in-out infinite`,animationDelay:`${idx*0.2}s`,transformOrigin:`${x}px ${y}px`,transformBox:"fill-box"}:{}}>
              <Renderer cx={x} cy={y} sc={sc} rot={rot}/>
            </g>
          );
        })}
    </svg>
  );
}

// ═══════════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════════
const FLOWERS = [
  { id:"rose",       name:"Red Rose",    bg:"#fff1f2", accent:"#f43f5e" },
  { id:"yellowrose", name:"Yellow Rose", bg:"#fefce8", accent:"#ca8a04" },
  { id:"pinkrose",   name:"Pink Rose",   bg:"#fdf2f8", accent:"#ec4899" },
  { id:"tulip",      name:"Tulip",       bg:"#fff1f2", accent:"#e11d48" },
  { id:"lotus",      name:"Lotus",       bg:"#fdf2f8", accent:"#db2777" },
  { id:"daisy",      name:"Daisy",       bg:"#fffbeb", accent:"#d97706" },
  { id:"peony",      name:"Peony",       bg:"#fdf2f8", accent:"#db2777" },
  { id:"lavender",   name:"Lavender",    bg:"#f5f3ff", accent:"#7c3aed" },
  { id:"sunflower",  name:"Sunflower",   bg:"#fefce8", accent:"#ca8a04" },
  { id:"camomile",   name:"Camomile",    bg:"#fefce8", accent:"#854d0e" },
];
const GREENERY = [
  { id:"softleaves", name:"Soft Leaves",    bg:"#f0fdf4" },
  { id:"vines",      name:"Trailing Vines", bg:"#f0fdf4" },
  { id:"fern",       name:"Fern Sprays",    bg:"#dcfce7" },
  { id:"eucalyptus", name:"Eucalyptus",     bg:"#ecfdf5" },
];
const MOODS = [
  { id:"romantic",   label:"Romantic",   emoji:"💕", desc:"Soft, dreamy, full of longing" },
  { id:"playful",    label:"Playful",    emoji:"🎉", desc:"Bright, fun and joyful" },
  { id:"tender",     label:"Tender",     emoji:"🤍", desc:"Gentle, warm and heartfelt" },
  { id:"passionate", label:"Passionate", emoji:"🔥", desc:"Bold, deep and intense" },
  { id:"grateful",   label:"Grateful",   emoji:"🙏", desc:"Sweet appreciation and warmth" },
  { id:"nostalgic",  label:"Nostalgic",  emoji:"✨", desc:"Soft memories and longing" },
];

// ═══════════════════════════════════════════════════════════════════
// SHARED STYLES
// ═══════════════════════════════════════════════════════════════════
const C = {
  roseDeep:"#f472b6", blush:"#fce7f3", cream:"#fff8f5",
  textDark:"#4a1942", textMid:"#9d4e89", textSoft:"#c084b0",
};
const btnPrimary = {
  background:"linear-gradient(135deg,#f472b6,#ec4899,#db2777)",
  color:"white", border:"none", padding:"14px 28px", borderRadius:14,
  fontSize:"0.88rem", fontWeight:500, cursor:"pointer",
  transition:"all 0.22s ease", boxShadow:"0 6px 20px rgba(244,114,182,0.35)",
  letterSpacing:"0.03em", fontFamily:"'DM Sans',sans-serif",
};
const btnBack = {
  padding:"14px 20px", background:"transparent",
  border:"1.5px solid rgba(249,168,201,0.4)", borderRadius:14,
  fontSize:"0.85rem", color:"#c084b0", cursor:"pointer",
  fontFamily:"'DM Sans',sans-serif", transition:"all 0.2s",
};

// ═══════════════════════════════════════════════════════════════════
// PROGRESS BAR
// ═══════════════════════════════════════════════════════════════════
function ProgressBar({ step, setStep }) {
  return (
    <div style={{display:"flex",background:"white",borderBottom:"1px solid rgba(249,168,201,0.2)",padding:"0 32px",position:"sticky",top:0,zIndex:50,boxShadow:"0 2px 16px rgba(244,114,182,0.06)"}}>
      {[{n:1,label:"Bouquet"},{n:2,label:"Mood"},{n:3,label:"Letter"},{n:4,label:"Preview"}].map(s=>(
        <div key={s.n} onClick={()=>s.n<step&&setStep(s.n)}
          style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",gap:5,padding:"16px 8px",cursor:s.n<step?"pointer":"default",borderBottom:step===s.n?"2px solid #f472b6":"2px solid transparent"}}>
          <div style={{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"0.75rem",fontWeight:600,background:step===s.n?"linear-gradient(135deg,#f9a8c9,#f472b6)":step>s.n?"#bbf7d0":"transparent",color:step===s.n?"white":step>s.n?"#166534":"#c084b0",border:step===s.n||step>s.n?"none":"2px solid rgba(249,168,201,0.3)",transition:"all 0.3s"}}>{step>s.n?"✓":s.n}</div>
          <span style={{fontSize:"0.65rem",letterSpacing:"0.1em",textTransform:"uppercase",color:step===s.n?C.roseDeep:"#c084b0",fontWeight:500}}>{s.label}</span>
        </div>
      ))}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STEP 1 — BOUQUET BUILDER
// ═══════════════════════════════════════════════════════════════════
function StepBouquet({ flowers, greenery, onFlowerAdd, onFlowerRemove, onGreeneryToggle, onNext }) {
  const MAX=10;
  const countOf=(id)=>flowers.filter(f=>f.id===id).length;
  const isMaxed=flowers.length>=MAX;

  return (
    <div style={{display:"grid",gridTemplateColumns:"380px 1fr",minHeight:"calc(100vh - 65px)"}}>
      {/* LEFT */}
      <div style={{background:"white",borderRight:"1px solid rgba(249,168,201,0.15)",padding:"28px 24px 140px",overflowY:"auto"}}>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:700,marginBottom:4,color:C.textDark}}>Build Your Bouquet 💐</h1>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",fontStyle:"italic",color:C.textSoft,marginBottom:20,lineHeight:1.5}}>Tap flowers to add them. We'll fan them into a natural arc.</p>

        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(249,168,201,0.1)",border:"1px solid rgba(244,114,182,0.2)",borderRadius:20,padding:"5px 14px",fontSize:"0.75rem",fontWeight:500,color:C.roseDeep,marginBottom:20}}>
          <span style={{width:7,height:7,background:C.roseDeep,borderRadius:"50%",display:"inline-block"}}/>
          {flowers.length} / {MAX} blooms
        </div>

        {flowers.length>0&&(
          <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
            {flowers.map(f=>(
              <div key={f.uid} style={{display:"flex",alignItems:"center",gap:5,padding:"4px 10px 4px 8px",background:C.blush,border:"1px solid rgba(244,114,182,0.25)",borderRadius:20,fontSize:"0.72rem",color:C.textMid}}>
                {f.name}
                <button onClick={()=>onFlowerRemove(f.uid)} style={{width:14,height:14,background:"rgba(244,114,182,0.2)",border:"none",borderRadius:"50%",cursor:"pointer",fontSize:"0.55rem",color:C.roseDeep,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
              </div>
            ))}
          </div>
        )}

        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:C.textSoft,marginBottom:12}}>Choose Flowers</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:10,marginBottom:28}}>
          {FLOWERS.map(flower=>{
            const count=countOf(flower.id);
            return (
              <div key={flower.id} onClick={()=>!isMaxed&&onFlowerAdd(flower)}
                style={{position:"relative",display:"flex",flexDirection:"column",alignItems:"center",gap:6,padding:"12px 8px 10px",borderRadius:16,border:count>0?`2px solid ${flower.accent}`:"2px solid transparent",background:flower.bg,cursor:isMaxed&&count===0?"not-allowed":"pointer",opacity:isMaxed&&count===0?0.45:1,transition:"all 0.2s",boxShadow:count>0?"0 4px 16px rgba(244,114,182,0.2)":"none"}}>
                {count>0&&<div style={{position:"absolute",top:-6,right:-6,width:20,height:20,background:"linear-gradient(135deg,#f9a8c9,#f472b6)",color:"white",borderRadius:"50%",fontSize:"0.65rem",fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center"}}>{count}</div>}
                <FlowerIcon id={flower.id} size={44}/>
                <span style={{fontSize:"0.68rem",fontWeight:500,color:C.textMid,textAlign:"center"}}>{flower.name}</span>
              </div>
            );
          })}
        </div>

        <div style={{fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.15em",textTransform:"uppercase",color:C.textSoft,marginBottom:12}}>Add Greenery</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:10}}>
          {GREENERY.map(g=>{
            const sel=!!greenery.find(x=>x.id===g.id);
            return (
              <div key={g.id} onClick={()=>onGreeneryToggle(g)}
                style={{display:"flex",alignItems:"center",gap:10,padding:"12px 14px",borderRadius:14,cursor:"pointer",border:sel?"2px solid #22c55e":"2px solid transparent",background:sel?"#dcfce7":"#f0fdf4",transition:"all 0.2s"}}>
                <span style={{fontSize:"1.3rem"}}>{g.id==="softleaves"?"🌿":g.id==="vines"?"🍃":g.id==="fern"?"🌱":"🫧"}</span>
                <span style={{fontSize:"0.75rem",fontWeight:500,color:"#166534"}}>{g.name}</span>
                {sel&&<div style={{marginLeft:"auto",width:18,height:18,background:"#22c55e",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:"0.65rem"}}>✓</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* RIGHT */}
      <div style={{position:"sticky",top:65,height:"calc(100vh - 65px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,background:"radial-gradient(ellipse 70% 70% at 50% 55%,rgba(253,164,175,0.08) 0%,transparent 70%)"}}>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.85rem",fontWeight:600,fontStyle:"italic",color:C.textSoft,marginBottom:12}}>✦ Your Bouquet ✦</p>
        {flowers.length===0&&greenery.length===0?(
          <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:12}}>
            <div style={{width:160,height:160,borderRadius:"50%",border:"2px dashed rgba(249,168,201,0.4)",display:"flex",alignItems:"center",justifyContent:"center"}}>
              <span style={{fontSize:"2.5rem"}}>🌸</span>
            </div>
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1rem",fontStyle:"italic",color:C.textSoft,textAlign:"center",lineHeight:1.6}}>Add flowers to see<br/>your bouquet bloom.</p>
          </div>
        ):(
          <BouquetSVG flowers={flowers} greenery={greenery} width={460} height={420}/>
        )}
        {flowers.length>0&&(
          <div style={{display:"flex",gap:12,marginTop:8}}>
            <div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",background:"rgba(255,255,255,0.85)",border:"1px solid rgba(249,168,201,0.2)",borderRadius:20,fontSize:"0.72rem",color:C.textMid}}>
              🌸 <strong style={{color:C.roseDeep}}>{flowers.length}</strong> bloom{flowers.length!==1?"s":""}
            </div>
            {greenery.length>0&&<div style={{display:"flex",alignItems:"center",gap:6,padding:"6px 14px",background:"rgba(255,255,255,0.85)",border:"1px solid rgba(249,168,201,0.2)",borderRadius:20,fontSize:"0.72rem",color:C.textMid}}>
              🌿 <strong style={{color:"#22c55e"}}>{greenery.length}</strong>
            </div>}
          </div>
        )}
      </div>

      <div style={{position:"fixed",bottom:0,left:0,width:380,padding:"16px 24px",background:"rgba(255,255,255,0.98)",backdropFilter:"blur(10px)",borderTop:"1px solid rgba(249,168,201,0.2)",display:"flex",gap:12,zIndex:100,boxShadow:"0 -4px 20px rgba(244,114,182,0.08)"}}>
        <Link href="/" style={{...btnBack,textDecoration:"none",display:"flex",alignItems:"center",justifyContent:"center"}}>← Home</Link>
        <button onClick={()=>flowers.length>0&&onNext()} style={{...btnPrimary,flex:1,opacity:flowers.length===0?0.5:1,cursor:flowers.length===0?"not-allowed":"pointer"}}>
          {flowers.length===0?"Add at least one flower":`Continue with ${flowers.length} bloom${flowers.length!==1?"s":""} →`}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STEP 2 — MOOD
// ═══════════════════════════════════════════════════════════════════
function StepMood({ mood, onMoodSelect, onNext, onBack, flowers, greenery }) {
  return (
    <div style={{display:"grid",gridTemplateColumns:"380px 1fr",minHeight:"calc(100vh - 65px)"}}>
      <div style={{background:"white",borderRight:"1px solid rgba(249,168,201,0.15)",padding:"28px 24px 140px",overflowY:"auto"}}>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:700,marginBottom:4,color:C.textDark}}>Set the Mood ✨</h1>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",fontStyle:"italic",color:C.textSoft,marginBottom:24,lineHeight:1.5}}>What feeling does this bouquet carry?</p>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
          {MOODS.map(m=>(
            <div key={m.id} onClick={()=>onMoodSelect(m.id)}
              style={{padding:"20px 16px",borderRadius:18,cursor:"pointer",border:mood===m.id?"2px solid #f472b6":"2px solid transparent",background:mood===m.id?"rgba(249,168,201,0.12)":"rgba(253,244,255,0.5)",transition:"all 0.22s",transform:mood===m.id?"scale(1.02)":"scale(1)",boxShadow:mood===m.id?"0 8px 24px rgba(244,114,182,0.2)":"none"}}>
              <div style={{fontSize:"1.8rem",marginBottom:8}}>{m.emoji}</div>
              <div style={{fontFamily:"'Playfair Display',serif",fontSize:"0.95rem",fontWeight:600,color:C.textDark,marginBottom:4}}>{m.label}</div>
              <div style={{fontSize:"0.72rem",color:C.textSoft,lineHeight:1.4}}>{m.desc}</div>
              {mood===m.id&&<div style={{marginTop:8,fontSize:"0.65rem",color:C.roseDeep,fontWeight:600,letterSpacing:"0.08em"}}>✦ SELECTED</div>}
            </div>
          ))}
        </div>
      </div>
      <div style={{position:"sticky",top:65,height:"calc(100vh - 65px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:32,background:"radial-gradient(ellipse 70% 70% at 50% 55%,rgba(253,164,175,0.08) 0%,transparent 70%)"}}>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.85rem",fontStyle:"italic",color:C.textSoft,marginBottom:12}}>✦ Your Bouquet ✦</p>
        <BouquetSVG flowers={flowers} greenery={greenery} width={460} height={420}/>
        {mood&&<div style={{marginTop:16,padding:"10px 24px",background:"rgba(255,255,255,0.85)",border:"1px solid rgba(249,168,201,0.2)",borderRadius:20,fontSize:"0.8rem",color:C.textMid}}>
          {MOODS.find(m=>m.id===mood)?.emoji} Mood: <strong style={{color:C.roseDeep}}>{MOODS.find(m=>m.id===mood)?.label}</strong>
        </div>}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,width:380,padding:"16px 24px",background:"rgba(255,255,255,0.98)",backdropFilter:"blur(10px)",borderTop:"1px solid rgba(249,168,201,0.2)",display:"flex",gap:12,zIndex:100}}>
        <button onClick={onBack} style={btnBack}>← Back</button>
        <button onClick={()=>mood&&onNext()} style={{...btnPrimary,flex:1,opacity:!mood?0.5:1,cursor:!mood?"not-allowed":"pointer"}}>
          {!mood?"Pick a mood to continue":"Write your letter →"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STEP 3 — LETTER
// ═══════════════════════════════════════════════════════════════════
function StepLetter({ letter, recipientName, senderName, onLetterChange, onRecipientChange, onSenderChange, onNext, onBack, flowers, greenery, mood }) {
  const MAX_CHARS=500;
  const moodObj=MOODS.find(m=>m.id===mood);
  const placeholders={
    romantic:"My darling, every petal in this bouquet holds a whisper of how much you mean to me...",
    playful:"Hey you! Guess what? I made you the most wonderful bouquet just because you're amazing 🎉",
    tender:"I wanted to send you something as gentle and beautiful as the way you make me feel...",
    passionate:"There are not enough flowers in the world to say what I feel, but this is a start...",
    grateful:"I've been thinking about how lucky I am to have you, and I needed you to know...",
    nostalgic:"Do you remember when... every time I think of that moment, I smile.",
  };

  return (
    <div style={{display:"grid",gridTemplateColumns:"420px 1fr",minHeight:"calc(100vh - 65px)"}}>
      <div style={{background:"white",borderRight:"1px solid rgba(249,168,201,0.15)",padding:"28px 24px 140px",overflowY:"auto"}}>
        <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"1.4rem",fontWeight:700,marginBottom:4,color:C.textDark}}>Write from the Heart 💌</h1>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",fontStyle:"italic",color:C.textSoft,marginBottom:24,lineHeight:1.5}}>{moodObj?.emoji} A {moodObj?.label?.toLowerCase()} message for someone special.</p>

        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:20}}>
          {[{label:"To",val:recipientName,set:onRecipientChange,ph:"Their name..."},{label:"From",val:senderName,set:onSenderChange,ph:"Your name..."}].map(f=>(
            <div key={f.label}>
              <label style={{display:"block",fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:C.textSoft,marginBottom:6}}>{f.label}</label>
              <input value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                style={{width:"100%",padding:"10px 14px",borderRadius:12,border:"1.5px solid rgba(249,168,201,0.35)",background:"#fff8f5",fontFamily:"'DM Sans',sans-serif",fontSize:"0.88rem",color:C.textDark,outline:"none",boxSizing:"border-box"}}/>
            </div>
          ))}
        </div>

        <label style={{display:"block",fontSize:"0.7rem",fontWeight:600,letterSpacing:"0.12em",textTransform:"uppercase",color:C.textSoft,marginBottom:6}}>Your Message</label>
        <div style={{position:"relative",background:"linear-gradient(135deg,#fff8f5,#fdf2f8)",borderRadius:16,border:"1.5px solid rgba(249,168,201,0.3)",overflow:"hidden"}}>
          <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:0.25}}>
            {Array.from({length:14},(_,i)=>(
              <div key={i} style={{position:"absolute",left:52,right:16,top:48+i*28,height:1,background:"rgba(249,168,201,0.5)"}}/>
            ))}
            <div style={{position:"absolute",left:48,top:0,bottom:0,width:1,background:"rgba(249,168,201,0.7)"}}/>
          </div>
          <textarea value={letter} onChange={e=>onLetterChange(e.target.value.slice(0,MAX_CHARS))}
            placeholder={placeholders[mood]||"Write your heartfelt message here..."}
            style={{width:"100%",minHeight:260,padding:"20px 16px 16px 56px",background:"transparent",border:"none",outline:"none",resize:"vertical",fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontStyle:"italic",color:C.textDark,lineHeight:1.9,boxSizing:"border-box",position:"relative",zIndex:1}}/>
        </div>
        <div style={{textAlign:"right",marginTop:4,fontSize:"0.7rem",color:letter.length>MAX_CHARS*0.9?C.roseDeep:C.textSoft}}>{letter.length}/{MAX_CHARS}</div>
      </div>

      {/* Letter preview */}
      <div style={{position:"sticky",top:65,height:"calc(100vh - 65px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40}}>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.85rem",fontStyle:"italic",color:C.textSoft,marginBottom:20}}>✦ Letter Preview ✦</p>
        <div style={{width:"100%",maxWidth:480,background:"linear-gradient(135deg,#fffef9,#fff8f5,#fdf2f8)",borderRadius:24,padding:"40px",boxShadow:"0 20px 60px rgba(244,114,182,0.1)",border:"1px solid rgba(249,168,201,0.2)",position:"relative",overflow:"hidden"}}>
          <div style={{position:"absolute",top:-15,right:-15,opacity:0.1}}>
            <svg width="80" height="80" viewBox="0 0 80 80" suppressHydrationWarning>
              <RoseAt cx={40} cy={40} sc={1.2} rot={20}/>
            </svg>
          </div>
          {Array.from({length:10},(_,i)=>(
            <div key={i} style={{position:"absolute",left:32,right:32,top:90+i*34,height:1,background:"rgba(249,168,201,0.12)"}}/>
          ))}
          <div style={{position:"relative",zIndex:1}}>
            {recipientName&&<p style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontStyle:"italic",color:C.textMid,marginBottom:16}}>Dear {recipientName},</p>}
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.05rem",fontStyle:"italic",color:C.textDark,lineHeight:1.9,minHeight:100,whiteSpace:"pre-wrap"}}>
              {letter||<span style={{color:C.textSoft,opacity:0.4}}>Your message will appear here...</span>}
            </p>
            {senderName&&<p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.9rem",fontStyle:"italic",color:C.textMid,marginTop:24,textAlign:"right"}}>With love, {senderName} 🌸</p>}
          </div>
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,width:420,padding:"16px 24px",background:"rgba(255,255,255,0.98)",backdropFilter:"blur(10px)",borderTop:"1px solid rgba(249,168,201,0.2)",display:"flex",gap:12,zIndex:100}}>
        <button onClick={onBack} style={btnBack}>← Back</button>
        <button onClick={()=>letter.trim()&&onNext()} style={{...btnPrimary,flex:1,opacity:!letter.trim()?0.5:1,cursor:!letter.trim()?"not-allowed":"pointer"}}>
          {!letter.trim()?"Write your message first":"Preview & Send 🎁"}
        </button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// STEP 4 — GIFT BOX REVEAL + PREVIEW
// ═══════════════════════════════════════════════════════════════════
function GiftBox({ onClick, isOpening }) {
  return (
    <div onClick={onClick} style={{cursor:"pointer",userSelect:"none",position:"relative",width:200,height:200,margin:"0 auto"}}>
      <svg width="200" height="200" viewBox="0 0 200 200" suppressHydrationWarning>
        {/* Box bottom */}
        <rect x="30" y="110" width="140" height="80" rx="8"
          fill="rgba(244,114,182,0.85)" stroke="rgba(219,39,119,0.6)" strokeWidth="2"/>
        {/* Box shine */}
        <rect x="36" y="116" width="60" height="68" rx="4" fill="rgba(255,255,255,0.15)"/>
        {/* Vertical ribbon on box */}
        <rect x="92" y="110" width="16" height="80" fill="rgba(196,181,253,0.9)"/>
        {/* Horizontal ribbon on box */}
        <rect x="30" y="142" width="140" height="14" fill="rgba(196,181,253,0.9)"/>

        {/* Lid */}
        <g style={isOpening?{animation:"liftLid 0.8s cubic-bezier(0.34,1.56,0.64,1) forwards"}:{}}>
          <rect x="22" y="88" width="156" height="30" rx="6"
            fill="rgba(236,72,153,0.9)" stroke="rgba(219,39,119,0.6)" strokeWidth="2"/>
          <rect x="28" y="93" width="70" height="18" rx="3" fill="rgba(255,255,255,0.15)"/>
          {/* Ribbon on lid */}
          <rect x="92" y="88" width="16" height="30" fill="rgba(167,139,250,0.9)"/>

          {/* Bow */}
          <path d="M85 88 Q70 72 78 78 Q86 84 100 82 Q114 80 122 74 Q130 68 115 88"
            fill="rgba(167,139,250,0.9)" stroke="rgba(139,92,246,0.5)" strokeWidth="1"/>
          <path d="M100 82 Q86 76 80 70 Q74 64 82 72 Q90 80 100 82 Q110 80 118 68 Q126 56 120 66 Q114 76 100 82Z"
            fill="rgba(196,181,253,0.9)" stroke="rgba(139,92,246,0.4)" strokeWidth="1"/>
          <circle cx="100" cy="82" r="7" fill="rgba(167,139,250,1)" stroke="rgba(139,92,246,0.6)" strokeWidth="1.5"/>
        </g>

        {/* Sparkles around box */}
        {[[20,30],[170,25],[185,100],[15,120],[100,15]].map(([x,y],i)=>(
          <g key={i} style={{animation:`sparkle ${1.5+i*0.3}s ease-in-out infinite`,animationDelay:`${i*0.2}s`}}>
            <path d={`M${x} ${y-6} L${x+1.5} ${y-1.5} L${x+6} ${y} L${x+1.5} ${y+1.5} L${x} ${y+6} L${x-1.5} ${y+1.5} L${x-6} ${y} L${x-1.5} ${y-1.5}Z`}
              fill="#fda4af" opacity="0.8"/>
          </g>
        ))}
      </svg>

      {!isOpening&&<div style={{textAlign:"center",marginTop:8,fontFamily:"'Cormorant Garamond',serif",fontSize:"0.95rem",fontStyle:"italic",color:C.textSoft,animation:"pulse 2s ease-in-out infinite"}}>
        Tap to open ✨
      </div>}
    </div>
  );
}

function StepPreview({ flowers, greenery, mood, letter, recipientName, senderName, onBack }) {
  const [phase, setPhase] = useState("gift"); // gift → opening → bouquet → letter → done
  const moodObj = MOODS.find(m=>m.id===mood);

  const handleOpen = () => {
    setPhase("opening");
    setTimeout(()=>setPhase("bouquet"), 900);
    setTimeout(()=>setPhase("letter"), 2200);
    setTimeout(()=>setPhase("done"), 3200);
  };

  if(phase==="gift"||phase==="opening") {
    return (
      <div style={{minHeight:"calc(100vh - 65px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:40,background:"radial-gradient(ellipse 80% 70% at 50% 50%,rgba(253,164,175,0.15) 0%,transparent 70%),linear-gradient(160deg,#fff8f5,#fdf2f8)"}}>
        <p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.85rem",fontStyle:"italic",color:C.textSoft,marginBottom:8,letterSpacing:"0.1em"}}>✦ A surprise for {recipientName||"you"} ✦</p>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"2rem",fontWeight:700,color:C.textDark,marginBottom:8,textAlign:"center"}}>
          Your bouquet is ready!
        </h2>
        <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontStyle:"italic",color:C.textSoft,marginBottom:48,textAlign:"center",lineHeight:1.6}}>
          {flowers.length} blooms · {moodObj?.label} · {letter.split(" ").length} words
        </p>

        <div style={{position:"relative"}}>
          {phase==="opening"&&(
            <div style={{position:"absolute",top:-80,left:"50%",transform:"translateX(-50%)",animation:"burstUp 0.8s ease-out forwards"}}>
              <BouquetSVG flowers={flowers} greenery={greenery} width={340} height={320} animate={false}/>
            </div>
          )}
          <GiftBox onClick={phase==="gift"?handleOpen:undefined} isOpening={phase==="opening"}/>
        </div>

        {phase==="opening"&&(
          <div style={{marginTop:32,display:"flex",gap:8,flexWrap:"wrap",justifyContent:"center"}}>
            {["🌸","✨","💕","🌿","💜","🌹"].map((e,i)=>(
              <span key={i} style={{fontSize:"1.5rem",animation:`petalBurst ${0.6+i*0.1}s ease-out forwards`,animationDelay:`${i*0.08}s`,display:"inline-block"}}>{e}</span>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{minHeight:"calc(100vh - 65px)",background:"linear-gradient(160deg,#fff8f5,#fdf2f8,#faf5ff)",padding:"40px 20px 120px"}}>
      <div style={{maxWidth:580,margin:"0 auto"}}>

        {/* Bouquet */}
        <div style={{textAlign:"center",marginBottom:32,animation:"fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) both"}}>
          <p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.85rem",fontStyle:"italic",color:C.textSoft,marginBottom:8}}>✦ A bouquet for {recipientName||"you"} ✦</p>
          <div style={{display:"flex",justifyContent:"center"}}>
            <BouquetSVG flowers={flowers} greenery={greenery} width={460} height={420}/>
          </div>
        </div>

        {/* Letter */}
        <div style={{animation:"fadeSlideUp 1s cubic-bezier(0.16,1,0.3,1) 0.4s both",background:"linear-gradient(135deg,#fffef9,#fff8f5,#fdf2f8)",borderRadius:24,padding:"40px",boxShadow:"0 20px 60px rgba(244,114,182,0.1)",border:"1px solid rgba(249,168,201,0.2)",marginBottom:32,position:"relative",overflow:"hidden"}}>
          {Array.from({length:10},(_,i)=>(
            <div key={i} style={{position:"absolute",left:32,right:32,top:90+i*34,height:1,background:"rgba(249,168,201,0.1)"}}/>
          ))}
          <div style={{position:"relative",zIndex:1}}>
            {recipientName&&<p style={{fontFamily:"'Playfair Display',serif",fontSize:"1rem",fontStyle:"italic",color:C.textMid,marginBottom:16}}>Dear {recipientName},</p>}
            <p style={{fontFamily:"'Cormorant Garamond',serif",fontSize:"1.1rem",fontStyle:"italic",color:C.textDark,lineHeight:2,whiteSpace:"pre-wrap"}}>{letter}</p>
            {senderName&&<p style={{fontFamily:"'Playfair Display',serif",fontSize:"0.9rem",fontStyle:"italic",color:C.textMid,marginTop:24,textAlign:"right"}}>With love, {senderName} 🌸</p>}
          </div>
        </div>

        {/* Share actions */}
        <div style={{animation:"fadeSlideUp 1s ease 0.8s both",display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button style={{...btnPrimary,fontSize:"0.95rem",padding:"15px 32px"}}>📤 Share this Bouquet</button>
          <button onClick={onBack} style={{...btnBack,padding:"15px 24px"}}>✏️ Edit</button>
        </div>
      </div>

      <div style={{position:"fixed",bottom:0,left:0,right:0,padding:"16px 32px",background:"rgba(255,255,255,0.96)",backdropFilter:"blur(10px)",borderTop:"1px solid rgba(249,168,201,0.2)",display:"flex",gap:12,justifyContent:"center",zIndex:100}}>
        <button onClick={onBack} style={btnBack}>← Edit</button>
        <button style={{...btnPrimary,padding:"14px 40px"}}>📤 Send to Someone 💌</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════
// ROOT
// ═══════════════════════════════════════════════════════════════════
export default function CreatePage() {
  const [mounted, setMounted] = useState(false);
  const [step, setStep] = useState(1);
  const [flowers, setFlowers] = useState([]);
  const [greenery, setGreenery] = useState([]);
  const [mood, setMood] = useState("");
  const [letter, setLetter] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [senderName, setSenderName] = useState("");

  useEffect(()=>{setMounted(true);},[]);
  if(!mounted) return null;

  const addFlower=(flower)=>{
    if(flowers.length>=10) return;
    setFlowers(prev=>[...prev,{...flower,uid:`${flower.id}-${Date.now()}`}]);
  };
  const removeFlower=(uid)=>setFlowers(prev=>prev.filter(f=>f.uid!==uid));
  const toggleGreenery=(g)=>setGreenery(prev=>prev.find(x=>x.id===g.id)?prev.filter(x=>x.id!==g.id):[...prev,g]);

  return (
    <div suppressHydrationWarning style={{minHeight:"100vh",background:"linear-gradient(160deg,#fff8f5 0%,#fdf2f8 60%,#faf5ff 100%)",fontFamily:"'DM Sans',sans-serif",color:C.textDark}}>
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=DM+Sans:wght@300;400;500&family=Cormorant+Garamond:ital,wght@1,400;1,500&display=swap"/>

      <ProgressBar step={step} setStep={setStep}/>

      {step===1&&<StepBouquet flowers={flowers} greenery={greenery} onFlowerAdd={addFlower} onFlowerRemove={removeFlower} onGreeneryToggle={toggleGreenery} onNext={()=>setStep(2)}/>}
      {step===2&&<StepMood mood={mood} onMoodSelect={setMood} onNext={()=>setStep(3)} onBack={()=>setStep(1)} flowers={flowers} greenery={greenery}/>}
      {step===3&&<StepLetter letter={letter} recipientName={recipientName} senderName={senderName} onLetterChange={setLetter} onRecipientChange={setRecipientName} onSenderChange={setSenderName} onNext={()=>setStep(4)} onBack={()=>setStep(2)} flowers={flowers} greenery={greenery} mood={mood}/>}
      {step===4&&<StepPreview flowers={flowers} greenery={greenery} mood={mood} letter={letter} recipientName={recipientName} senderName={senderName} onBack={()=>setStep(3)}/>}

      <style>{`
        @keyframes flowerSway {
          0%,100% { transform:rotate(0deg) scale(1); }
          33% { transform:rotate(1.5deg) scale(1.01); }
          66% { transform:rotate(-1deg) scale(0.99); }
        }
        @keyframes leafSway {
          0%,100% { transform:rotate(0deg); }
          50% { transform:rotate(2.5deg); }
        }
        @keyframes liftLid {
          0% { transform:translateY(0) rotate(0deg); opacity:1; }
          100% { transform:translateY(-80px) rotate(-15deg); opacity:0; }
        }
        @keyframes burstUp {
          0% { transform:translateX(-50%) translateY(60px) scale(0.3); opacity:0; }
          60% { transform:translateX(-50%) translateY(-10px) scale(1.05); opacity:1; }
          100% { transform:translateX(-50%) translateY(0) scale(1); opacity:1; }
        }
        @keyframes petalBurst {
          0% { transform:translateY(0) scale(0); opacity:0; }
          50% { transform:translateY(-40px) scale(1.2); opacity:1; }
          100% { transform:translateY(-80px) scale(0.8); opacity:0; }
        }
        @keyframes fadeSlideUp {
          from { opacity:0; transform:translateY(32px); }
          to { opacity:1; transform:translateY(0); }
        }
        @keyframes sparkle {
          0%,100% { transform:scale(1); opacity:0.6; }
          50% { transform:scale(1.4); opacity:1; }
        }
        @keyframes pulse {
          0%,100% { opacity:0.7; }
          50% { opacity:1; }
        }
        @keyframes bounce {
          0%,100% { transform:translateY(0); }
          50% { transform:translateY(-10px); }
        }
        input:focus, textarea:focus {
          border-color:#f472b6 !important;
          box-shadow:0 0 0 3px rgba(244,114,182,0.1) !important;
        }
        ::-webkit-scrollbar { width:5px; }
        ::-webkit-scrollbar-thumb { background:rgba(249,168,201,0.4); border-radius:3px; }
      `}</style>
    </div>
  );
}
