"use client";
import { useState } from "react";

interface SpiralProps {
  cx: number;
  cy: number;
  r?: number;
  stroke?: string;
  sw?: number;
}

const Spiral = ({ cx, cy, r = 9, stroke = "#1a0808", sw = 2 }: SpiralProps) => {
  let d = "";
  for (let i = 0; i <= 60; i++) {
    const a = (i / 60) * 2.6 * Math.PI;
    const rad = (r * i) / 60;
    const x = cx + rad * Math.cos(a - Math.PI / 2);
    const y = cy + rad * Math.sin(a - Math.PI / 2);
    d += i === 0 ? `M${x} ${y}` : ` L${x} ${y}`;
  }
  return <path d={d} fill="none" stroke={stroke} strokeWidth={sw} strokeLinecap="round" />;
};

const Rose = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 72, 144, 216, 288].map(a => <path key={`o1-${a}`} d="M50 50 L35 18 L65 18 Z" fill="#b97c8c" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" transform={`rotate(${a} 50 50) translate(0 -5)`}/>)}
    {[36, 108, 180, 252, 324].map(a => <path key={`o2-${a}`} d="M50 50 L38 24 L62 24 Z" fill="#cf8f9e" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" opacity="0.95" transform={`rotate(${a} 50 50) translate(0 -2)`}/>)}
    {[0, 72, 144, 216, 288].map(a => <path key={`o3-${a}`} d="M50 50 L42 32 L58 32 Z" fill="#ea385e" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#f8b4c4" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);

const Sunflower = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 18}).map((_,i) => <path key={`bg-${i}`} d="M45 50 L50 20 L55 50 Z" fill="#b9942a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*20+10} 50 50)`}/>)}
    {Array.from({length: 18}).map((_,i) => <path key={`fg-${i}`} d="M47 50 L50 24 L53 50 Z" fill="#d9ba40" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*20} 50 50)`}/>)}
    <circle cx="50" cy="50" r="18" fill="#4d3319" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="12" fill="#6c4824" stroke="none"/>
    <circle cx="50" cy="50" r="6" fill="#322211" stroke="none"/>
  </svg>
);

const Daisy = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 16}).map((_,i) => <path key={`bg-${i}`} d="M47 50 L50 18 L53 50 Z" fill="#a4b0b4" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5+11.25} 50 50)`}/>)}
    {Array.from({length: 16}).map((_,i) => <path key={`fg-${i}`} d="M48 50 L50 20 L52 50 Z" fill="#d9dfdf" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#e7af1a" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="6" fill="#f4c94d" stroke="none"/>
  </svg>
);

const Peony = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L35 20 L65 20 Z" fill="#9f4b7a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L40 26 L60 26 Z" fill="#bc5a8d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[15, 75, 135, 195, 255, 315].map(a => <path key={`l3-${a}`} d="M50 50 L43 32 L57 32 Z" fill="#d47ba6" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#efb5cf" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);

const Tulip = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 16 L60 16 Z" fill="#a44050" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 24 L57 24 Z" fill="#d36677" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="7" fill="#f492a0" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);

const Lily = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 16 L60 16 Z" fill="#a3765c" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 26 L57 26 Z" fill="#d1a58a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="8" fill="#efcfbd" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="3" fill="#b46433" stroke="none"/>
  </svg>
);

const Camellia = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={`l1-${a}`} d="M50 50 L38 22 L62 22 Z" fill="#943d51" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(a => <path key={`l2-${a}`} d="M50 50 L42 28 L58 28 Z" fill="#c45a72" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#a42846" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 8}).map((_,i) => <circle key={`dot-${i}`} cx={50} cy={44} r="1.5" fill="#e7c648" stroke="none" transform={`rotate(${i*45} 50 50)`}/>)}
    <circle cx="50" cy="50" r="2.5" fill="#e7c648" stroke="none"/>
  </svg>
);

const Ranunculus = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L38 20 L62 20 Z" fill="#985c33" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L42 26 L58 26 Z" fill="#bc7441" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[15, 75, 135, 195, 255, 315].map(a => <path key={`l3-${a}`} d="M50 50 L44 32 L56 32 Z" fill="#db8c52" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[45, 105, 165, 225, 285, 345].map(a => <path key={`l4-${a}`} d="M50 50 L46 38 L54 38 Z" fill="#f0a976" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="4" fill="#fbe1b3" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);

const Gerbera = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 16}).map((_,i) => <path key={`bg-${i}`} d="M47 50 L50 16 L53 50 Z" fill="#b04334" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5+11.25} 50 50)`}/>)}
    {Array.from({length: 16}).map((_,i) => <path key={`fg-${i}`} d="M48 50 L50 20 L52 50 Z" fill="#df6250" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="14" fill="#4d3014" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 12}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={42} r="1.5" fill="#f0962b" stroke="none" transform={`rotate(${i*30} 50 50)`}/>)}
    <circle cx="50" cy="50" r="5" fill="#2b1a0a" stroke="none"/>
  </svg>
);

const Carnation = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 12}).map((_,i) => <path key={`l1-${i}`} d="M50 50 L38 22 L62 22 Z" fill="#b0627d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*30+15} 50 50)`}/>)}
    {Array.from({length: 12}).map((_,i) => <path key={`l2-${i}`} d="M50 50 L42 28 L58 28 Z" fill="#c37691" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*30} 50 50)`}/>)}
    {Array.from({length: 8}).map((_,i) => <path key={`l3-${i}`} d="M50 50 L44 34 L56 34 Z" fill="#e08eaa" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*45+22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#efb9cd" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);

const Anemone = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L38 20 L62 20 Z" fill="#8489b0" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L42 26 L58 26 Z" fill="#a9aed8" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#1b1c3b" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="6" fill="#40426b" stroke="none"/>
    {Array.from({length: 12}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={42} r="1" fill="#d0d2eb" stroke="none" transform={`rotate(${i*30} 50 50)`}/>)}
  </svg>
);

const Magnolia = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 18 L60 18 Z" fill="#c3bdb5" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 26 L57 26 Z" fill="#e2ddd6" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="10" fill="#eed9cd" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 8}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={43} r="1" fill="#c88b63" stroke="none" transform={`rotate(${i*45} 50 50)`}/>)}
  </svg>
);

const Cosmos = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={`l1-${a}`} d="M50 50 L40 20 L60 20 Z" fill="#ba7c98" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="10" fill="#e1b83d" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="5" fill="#c29a28" stroke="none"/>
  </svg>
);

const CherryBlossom = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 72, 144, 216, 288].map(a => <path key={`l1-${a}`} d="M50 50 L40 22 L60 22 Z" fill="#b9889d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[0, 72, 144, 216, 288].map(a => <path key={`l2-${a}`} d="M50 50 L44 28 L56 28 Z" fill="#d2a6b8" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a+36} 50 50)`}/>)}
    <circle cx="50" cy="50" r="8" fill="#e8c8d8" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 5}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={45} r="1.2" fill="#da4876" stroke="none" transform={`rotate(${i*72} 50 50)`}/>)}
  </svg>
);

const Hydrangea = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[
      {x: 50, y: 35, a: 0, c: "#7692b6"}, {x: 35, y: 55, a: 30, c: "#8fa8c6"},
      {x: 65, y: 55, a: -30, c: "#a3b9d4"}, {x: 50, y: 70, a: 15, c: "#6582a4"}
    ].map((f, i) => (
      <g key={`fl-${i}`} transform={`translate(${f.x-50} ${f.y-50})`}>
        {[0, 90, 180, 270].map(a => <path key={`p-${a}`} d="M50 50 L44 40 L56 40 Z" fill={f.c} stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a+f.a} 50 50)`}/>)}
        <circle cx="50" cy="50" r="3" fill="#aacc55" stroke="#1a0808" strokeWidth="1.5"/>
      </g>
    ))}
  </svg>
);

const Lavender = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    <path d="M50 90 L50 20" stroke="#5d8b67" strokeWidth="2.5" fill="none" />
    <path d="M50 65 L40 55 M50 75 L60 65" stroke="#5d8b67" strokeWidth="2" fill="none" />
    {[25, 35, 45, 55, 65].map(y => (
      <g key={`l-${y}`}>
        <path d={`M 50 ${y} L 44 ${y-8} L 56 ${y-8} Z`} fill="#8e7cc2" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d={`M 50 ${y-3} L 46 ${y-7} L 54 ${y-7} Z`} fill="#a99ee0" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round"/>
      </g>
    ))}
  </svg>
);


export const FLOWERS = [
  { id:"rose", name:"Rose", icon:<Rose />, color:"#cf8f9e", meaning:"Love & passion", month:"June" },
  { id:"sunflower", name:"Sunflower", icon:<Sunflower />, color:"#d9ba40", meaning:"Adoration", month:"August" },
  { id:"daisy", name:"Daisy", icon:<Daisy />, color:"#d9dfdf", meaning:"Innocence", month:"April" },
  { id:"peony", name:"Peony", icon:<Peony />, color:"#cd669a", meaning:"Romance", month:"May" },
  { id:"tulip", name:"Tulip", icon:<Tulip />, color:"#c65163", meaning:"Perfect love", month:"April" },
  { id:"lily", name:"Lily", icon:<Lily />, color:"#c19478", meaning:"Purity", month:"May" },
  { id:"camellia", name:"Camellia", icon:<Camellia />, color:"#b84f67", meaning:"Admiration", month:"January" },
  { id:"ranunculus", name:"Ranunculus", icon:<Ranunculus />, color:"#db8c52", meaning:"Charm", month:"February" },
  { id:"gerbera", name:"Gerbera", icon:<Gerbera />, color:"#d05646", meaning:"Joy", month:"April" },
  { id:"carnation", name:"Carnation", icon:<Carnation />, color:"#e08eaa", meaning:"Love & fascination", month:"January" },
  { id:"anemone", name:"Anemone", icon:<Anemone />, color:"#9ca1ca", meaning:"Anticipation", month:"May" },
  { id:"magnolia", name:"Magnolia", icon:<Magnolia />, color:"#e0dbd5", meaning:"Nobility", month:"May" },
  { id:"cosmos", name:"Cosmos", icon:<Cosmos />, color:"#cc93ad", meaning:"Peace", month:"October" },
  { id:"cherryblossom", name:"Cherry Blossom", icon:<CherryBlossom />, color:"#cc9db0", meaning:"Renewal", month:"April" },
  { id:"hydrangea", name:"Hydrangea", icon:<Hydrangea />, color:"#8ea5c3", meaning:"Gratitude", month:"May" },
  { id:"lavender", name:"Lavender", icon:<Lavender />, color:"#9b8dcf", meaning:"Calmness", month:"July" },
];
const Eucalyptus = () => (
  <svg viewBox="0 0 90 110" width="58" height="72">
    <path d="M45 105 Q42 85 38 68 Q34 52 28 36 Q22 20 26 8" stroke="#1e5c38" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
    {[{y:22,lx:18,rx:38,la:-30,ra:20},{y:36,lx:15,rx:40,la:-25,ra:18},{y:50,lx:13,rx:42,la:-20,ra:15},{y:64,lx:15,rx:42,la:-18,ra:14},{y:78,lx:18,rx:42,la:-15,ra:12},{y:90,lx:22,rx:42,la:-10,ra:8}].map((l,i)=>(
      <g key={i}>
        <ellipse cx={l.lx} cy={l.y} rx="11" ry="7" fill={i%2===0?"#2a6e48":"#1e5c38"} opacity="0.90" transform={`rotate(${l.la} ${l.lx} ${l.y})`}/>
        <ellipse cx={l.lx} cy={l.y} rx="11" ry="7" fill="none" stroke="#102818" strokeWidth="1.3" transform={`rotate(${l.la} ${l.lx} ${l.y})`}/>
        <ellipse cx={l.rx} cy={l.y} rx="11" ry="7" fill={i%2===0?"#1e5c38":"#2a6e48"} opacity="0.84" transform={`rotate(${l.ra} ${l.rx} ${l.y})`}/>
        <ellipse cx={l.rx} cy={l.y} rx="11" ry="7" fill="none" stroke="#102818" strokeWidth="1.3" transform={`rotate(${l.ra} ${l.rx} ${l.y})`}/>
      </g>
    ))}
  </svg>
);

const TropicalFan = () => (
  <svg viewBox="0 0 130 120" width="86" height="80">
    {([
      {d:"M65 110 C50 90 20 70 10 40 C18 36 30 54 48 74 C56 84 62 96 65 110Z",f:"#1a5c30"},
      {d:"M65 110 C55 85 35 60 30 28 C38 24 48 50 58 76 C61 88 63 100 65 110Z",f:"#246638"},
      {d:"M65 110 C60 82 50 52 54 20 C62 18 64 50 65 78 C65 92 65 102 65 110Z",f:"#1e6034"},
      {d:"M65 110 C70 82 80 52 76 20 C84 22 80 50 74 78 C70 92 67 102 65 110Z",f:"#246638"},
      {d:"M65 110 C75 85 95 60 100 28 C108 32 96 54 82 76 C74 88 68 100 65 110Z",f:"#1e6034"},
      {d:"M65 110 C80 90 108 70 120 40 C114 36 100 56 82 74 C74 84 68 96 65 110Z",f:"#1a5c30"},
    ]).map((l,i)=>(
      <g key={i}><path d={l.d} fill={l.f} opacity="0.92"/><path d={l.d} fill="none" stroke="#0c2818" strokeWidth="1.5" opacity="0.72"/></g>
    ))}
  </svg>
);

const WispySprigs = () => (
  <svg viewBox="0 0 100 110" width="64" height="72">
    <path d="M50 108 Q49 90 48 72 Q47 56 44 40 Q41 26 42 14" stroke="#3a6a30" strokeWidth="1.9" fill="none" strokeLinecap="round"/>
    {["M44 40 Q36 32 26 28 Q20 22 16 14","M44 40 Q52 32 62 28 Q68 22 72 14","M46 56 Q38 48 28 46 Q22 42 18 36","M46 56 Q54 48 64 46 Q70 42 74 36","M47 70 Q40 64 32 62 Q26 58 22 52","M47 70 Q55 64 62 62 Q68 58 72 52"].map((d,i)=>
      <path key={i} d={d} stroke="#3a6a30" strokeWidth="1.3" fill="none" strokeLinecap="round"/>)}
    {[{cx:16,cy:14},{cx:72,cy:14},{cx:42,cy:14},{cx:18,cy:36},{cx:74,cy:36},{cx:22,cy:52},{cx:72,cy:52},{cx:26,cy:28},{cx:68,cy:28}].map((b,i)=>(
      <g key={i}>
        <circle cx={b.cx} cy={b.cy} r="3.4" fill="#d4e8c0"/>
        <circle cx={b.cx} cy={b.cy} r="3.4" fill="none" stroke="#2a4820" strokeWidth="1.1"/>
      </g>
    ))}
  </svg>
);

const SwordGrass = () => (
  <svg viewBox="0 0 140 120" width="92" height="80">
    {([
      {d:"M70 118 C64 95 42 68 8 52 C10 44 36 64 60 88 C66 96 69 108 70 118Z",f:"#1a5c30"},
      {d:"M70 118 C66 92 50 62 24 42 C26 34 46 58 64 86 C67 98 69 110 70 118Z",f:"#246638"},
      {d:"M70 118 C68 90 58 58 42 34 C50 28 62 56 68 86 C69 100 70 110 70 118Z",f:"#1e6034"},
      {d:"M70 118 C70 88 68 56 62 30 C70 26 72 56 72 86 C71 100 70 110 70 118Z",f:"#246638"},
      {d:"M70 118 C72 90 82 58 98 34 C106 40 88 60 74 88 C72 100 71 110 70 118Z",f:"#1e6034"},
      {d:"M70 118 C74 92 90 62 116 42 C120 50 96 66 76 90 C73 98 71 110 70 118Z",f:"#246638"},
      {d:"M70 118 C76 95 98 68 132 52 C132 60 106 72 78 94 C74 102 71 112 70 118Z",f:"#1a5c30"},
    ]).map((b,i)=>(
      <g key={i}><path d={b.d} fill={b.f} opacity="0.90"/><path d={b.d} fill="none" stroke="#0c2818" strokeWidth="1.4" opacity="0.68"/></g>
    ))}
  </svg>
);

export const GREENERY = [
  { id:"eucalyptus", name:"Eucalyptus",   icon:<Eucalyptus />  },
  { id:"tropical",   name:"Tropical Fan", icon:<TropicalFan /> },
  { id:"wispy",      name:"Wispy Sprigs", icon:<WispySprigs /> },
  { id:"sword",      name:"Sword Grass",  icon:<SwordGrass />  },
];

export default function BouquetBuilder() {
  const [selF, setSelF] = useState<string[]>([]);
  const [selG, setSelG] = useState<string[]>([]);
  const [hov,  setHov]  = useState<string | null>(null);

  const toggleF = (id: string) => setSelF(p => p.includes(id) ? p.filter(x=>x!==id) : p.length<10 ? [...p,id] : p);
  const toggleG = (id: string) => setSelG(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
  const hovF = FLOWERS.find(f => f.id === hov);

  return (
    <div style={{ fontFamily:"'Georgia',serif", background:"#fdf6f0", minHeight:"100vh",
      display:"flex", flexDirection:"column", alignItems:"center", padding:"28px 16px 48px" }}>

      {/* Logo */}
      <div style={{ fontSize:42, fontStyle:"italic", fontWeight:700, color:"#1a1008",
        marginBottom:4, letterSpacing:.5, fontFamily:"'Palatino Linotype',serif" }}>
        Digibouquet
      </div>
      <div style={{ width:56, height:2, background:"#e09060", borderRadius:2, marginBottom:16 }}/>
      <div style={{ fontSize:11, letterSpacing:5, color:"#806050", marginBottom:5,
        fontFamily:"sans-serif", fontWeight:600 }}>
        PICK 6 TO 10 BLOOMS
      </div>
      <div style={{ fontSize:12, color:selF.length>=6?"#4a7830":"#9a7050",
        marginBottom:20, fontFamily:"sans-serif" }}>
        {selF.length} / 10 selected {selF.length>=6 && " ✓"}
      </div>

      {/* Flower grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12,
        maxWidth:740, width:"100%", marginBottom:26 }}>
        {FLOWERS.map(f => {
          const on = selF.includes(f.id);
          return (
            <button key={f.id}
              onMouseEnter={()=>setHov(f.id)}
              onMouseLeave={()=>setHov(null)}
              onClick={()=>toggleF(f.id)}
              style={{
                background: on ? `${f.color}22` : "#fffdf9",
                border: on ? `3px solid ${f.color}` : "3px solid #f0e8e0",
                borderRadius:20, padding:"12px 4px 8px", cursor:"pointer",
                display:"flex", flexDirection:"column", alignItems:"center", gap:5,
                boxShadow: on ? `0 6px 22px ${f.color}55` : "0 2px 8px rgba(0,0,0,.06)",
                transform: on ? "scale(1.07) translateY(-3px)" : "scale(1)",
                transition:"all .18s ease", position:"relative",
              }}>
              {f.icon}
              {on && (
                <div style={{
                  position:"absolute", top:7, right:7, width:20, height:20,
                  borderRadius:"50%", background:f.color, color:"#fff",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:11, fontWeight:700, boxShadow:`0 2px 6px ${f.color}88`
                }}>✓</div>
              )}
              <span style={{ fontSize:10, color:on?f.color:"#806050",
                fontFamily:"sans-serif", letterSpacing:.8, fontWeight:700 }}>
                {f.name.toUpperCase()}
              </span>
            </button>
          );
        })}
      </div>

      {/* Greenery */}
      <div style={{ fontSize:10, letterSpacing:4, color:"#4a7040", marginBottom:10,
        fontFamily:"sans-serif", fontWeight:700 }}>ADD GREENERY</div>
      <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:10, marginBottom:26 }}>
        {GREENERY.map(g => {
          const on = selG.includes(g.id);
          return (
            <button key={g.id} onClick={()=>toggleG(g.id)}
              style={{
                background: on?"#e8f8e0":"#f4faf0",
                border: on?"2.5px solid #3a7020":"2.5px solid #d0e8c8",
                borderRadius:14, padding:"9px 16px", cursor:"pointer",
                display:"flex", alignItems:"center", gap:9,
                boxShadow: on?"0 3px 12px rgba(40,100,20,.18)":"0 1px 5px rgba(0,0,0,.05)",
                transform: on?"scale(1.04)":"scale(1)", transition:"all .18s ease",
              }}>
              {g.icon}
              <span style={{ fontSize:12, color:on?"#1a4010":"#3e5030",
                fontFamily:"sans-serif", fontWeight:500 }}>{g.name}</span>
            </button>
          );
        })}
      </div>

      {/* Hover tooltip */}
      <div style={{ minHeight:72, display:"flex", justifyContent:"center",
        alignItems:"center", marginBottom:22 }}>
        {hovF ? (
          <div style={{ background:"#fff", border:`2px solid ${hovF.color}99`,
            borderRadius:14, padding:"12px 28px", textAlign:"center",
            boxShadow:"0 6px 22px rgba(0,0,0,.10)" }}>
            <div style={{ fontWeight:700, fontSize:13, color:"#1a1008", letterSpacing:2,
              fontFamily:"sans-serif", marginBottom:3 }}>{hovF.name.toUpperCase()}</div>
            <div style={{ fontSize:12.5, color:"#7a5040", marginBottom:2 }}>{hovF.meaning}</div>
            <div style={{ fontSize:11, color:"#a08060", fontFamily:"sans-serif", letterSpacing:1 }}>
              Birth Month: {hovF.month}</div>
          </div>
        ) : selF.length > 0 ? (
          <span style={{ color:"#c0b0a0", fontSize:13, fontStyle:"italic" }}>
            Hover a bloom to see its meaning</span>
        ) : null}
      </div>

      {/* Next button */}
      <button disabled={selF.length < 6} style={{
        background: selF.length>=6 ? "linear-gradient(135deg,#d07030,#a04818)" : "#d8c8b8",
        border:"none", borderRadius:10, padding:"13px 56px", color:"white",
        fontSize:11, fontFamily:"sans-serif", letterSpacing:4, fontWeight:700,
        cursor: selF.length>=6 ? "pointer" : "not-allowed",
        boxShadow: selF.length>=6 ? "0 5px 18px rgba(160,72,24,.28)" : "none",
        transition:"all .22s",
      }}>NEXT</button>
    </div>
  );
}
