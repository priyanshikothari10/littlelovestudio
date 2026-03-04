import { useState } from "react";

const Spiral = ({ cx, cy, r = 9, stroke = "#1a0808", sw = 2 }) => {
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
    {[0,72,144,216,288].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+22*Math.cos(r), cy=50+22*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="20" ry="20"
        fill="#e83040" stroke="#1a0808" strokeWidth="2.8"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="15" fill="#b01828" stroke="#1a0808" strokeWidth="2.5"/>
    <Spiral cx={50} cy={50} r={11} stroke="#fff" sw={1.8}/>
  </svg>
);

const Tulip = () => (
  <svg viewBox="0 0 100 110" width="76" height="84">
    <path d="M50 74 C32 66 20 48 28 30 C33 18 48 20 50 40"
      fill="#f04870" stroke="#1a0808" strokeWidth="2.8" strokeLinejoin="round"/>
    <path d="M50 74 C68 66 80 48 72 30 C67 18 52 20 50 40"
      fill="#d83058" stroke="#1a0808" strokeWidth="2.8" strokeLinejoin="round"/>
    <path d="M50 40 C46 26 44 12 50 8 C56 12 54 26 50 40Z"
      fill="#f878a0" stroke="#1a0808" strokeWidth="2.8"/>
    <circle cx="50" cy="58" r="11" fill="#c02050" stroke="#1a0808" strokeWidth="2.2"/>
    <Spiral cx={50} cy={58} r={8} stroke="#fff" sw={1.6}/>
    <line x1="50" y1="75" x2="50" y2="102" stroke="#2a7a28" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M50 90 Q38 84 36 74" stroke="#2a7a28" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
  </svg>
);

const Daisy = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,20,40,60,80,100,120,140,160,180,200,220,240,260,280,300,320,340].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+27*Math.cos(r), cy=50+27*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="5" ry="15"
        fill="#fffbe0" stroke="#1a1008" strokeWidth="2"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="16" fill="#f5c000" stroke="#1a1008" strokeWidth="2.8"/>
    <Spiral cx={50} cy={50} r={12} stroke="#8a6000" sw={2}/>
    <circle cx="50" cy="50" r="3.5" fill="#8a6000"/>
  </svg>
);

const Peony = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,45,90,135,180,225,270,315].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+24*Math.cos(r), cy=50+24*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="16" ry="20"
        fill="#f8a0c0" stroke="#1a0818" strokeWidth="2.5"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    {[22,67,112,157,202,247,292,337].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+14*Math.cos(r), cy=50+14*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="11" ry="14"
        fill="#fcc8de" stroke="#1a0818" strokeWidth="2"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="11" fill="#e06090" stroke="#1a0818" strokeWidth="2.5"/>
    <Spiral cx={50} cy={50} r={8} stroke="#fff" sw={1.6}/>
  </svg>
);

const Lavender = () => (
  <svg viewBox="0 0 100 130" width="68" height="90">
    <line x1="50" y1="125" x2="50" y2="28" stroke="#3a7a30" strokeWidth="3.2" strokeLinecap="round"/>
    <path d="M50 98 Q37 90 35 80" stroke="#3a7a30" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    <path d="M50 98 Q63 90 65 80" stroke="#3a7a30" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    {[{y:86},{y:74},{y:62},{y:50},{y:39},{y:29}].map((row,i)=>(
      <g key={i}>
        <ellipse cx={43} cy={row.y} rx={6.5-i*.3} ry={(6.5-i*.3)*1.5}
          fill="#9b60d8" stroke="#1a0838" strokeWidth="2.2"
          transform={`rotate(-20 43 ${row.y})`}/>
        <ellipse cx={57} cy={row.y} rx={6.5-i*.3} ry={(6.5-i*.3)*1.5}
          fill="#b878f0" stroke="#1a0838" strokeWidth="2.2"
          transform={`rotate(20 57 ${row.y})`}/>
      </g>
    ))}
    <ellipse cx="50" cy="21" rx="5" ry="7.5" fill="#c898f8" stroke="#1a0838" strokeWidth="2"/>
  </svg>
);

const Sunflower = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+27*Math.cos(r), cy=50+27*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="6" ry="17"
        fill={i%2===0?"#f8c800":"#f0a800"} stroke="#1a1008" strokeWidth="2.2"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="18" fill="#5c2e08" stroke="#1a0808" strokeWidth="3"/>
    <Spiral cx={50} cy={50} r={13} stroke="#f0a000" sw={2.2}/>
    <circle cx="50" cy="50" r="4" fill="#f0a000"/>
  </svg>
);

const Orchid = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    <path d="M50 50 C47 38 44 22 50 14 C56 22 53 38 50 50Z"
      fill="#c060e0" stroke="#1a0828" strokeWidth="2.5"/>
    <path d="M50 50 C38 44 18 40 10 30 C16 22 36 34 50 50Z"
      fill="#d878f0" stroke="#1a0828" strokeWidth="2.5"/>
    <path d="M50 50 C62 44 82 40 90 30 C84 22 64 34 50 50Z"
      fill="#d878f0" stroke="#1a0828" strokeWidth="2.5"/>
    <path d="M50 50 C40 56 24 62 18 72 C26 76 42 62 50 50Z"
      fill="#b848cc" stroke="#1a0828" strokeWidth="2.5"/>
    <path d="M50 50 C60 56 76 62 82 72 C74 76 58 62 50 50Z"
      fill="#b848cc" stroke="#1a0828" strokeWidth="2.5"/>
    <ellipse cx="50" cy="68" rx="14" ry="12" fill="#f0b0f8" stroke="#1a0828" strokeWidth="2.5"/>
    <circle cx="50" cy="52" r="9" fill="#9030b8" stroke="#1a0828" strokeWidth="2.2"/>
    <Spiral cx={50} cy={52} r={6.5} stroke="#f0c0ff" sw={1.6}/>
  </svg>
);

const Camomile = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length:22}).map((_,i)=>{
      const a=(i/22)*360, r=a*Math.PI/180;
      const cx=50+27*Math.cos(r), cy=50+27*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="4" ry="14"
        fill="white" stroke="#ccc8a8" strokeWidth="1.8"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="16" fill="#f0c020" stroke="#1a1008" strokeWidth="2.8"/>
    <Spiral cx={50} cy={50} r={11} stroke="#8a6000" sw={2}/>
    <circle cx="50" cy="50" r="3.5" fill="#8a6000"/>
  </svg>
);

const Carnation = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length:24}).map((_,i)=>{
      const a=(i/24)*360, r=a*Math.PI/180;
      const cx=50+22*Math.cos(r), cy=50+22*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="9" ry="14"
        fill={i%2===0?"#f09050":"#e87840"} stroke="#1a0808" strokeWidth="1.8"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    {Array.from({length:12}).map((_,i)=>{
      const a=(i/12)*360+15, r=a*Math.PI/180;
      const cx=50+12*Math.cos(r), cy=50+12*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="10"
        fill="#f8c0a0" stroke="#1a0808" strokeWidth="1.5"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="10" fill="#e05820" stroke="#1a0808" strokeWidth="2.2"/>
    <Spiral cx={50} cy={50} r={7} stroke="#fff" sw={1.6}/>
  </svg>
);

const Lily = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,60,120,180,240,300].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+28*Math.cos(r), cy=50+28*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="10" ry="24"
        fill={i%2===0?"#6888e8":"#5070d0"} stroke="#0a1840" strokeWidth="2.8"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="14" fill="#304fb8" stroke="#0a1840" strokeWidth="2.8"/>
    <Spiral cx={50} cy={50} r={10} stroke="#a0c0ff" sw={1.8}/>
    {[0,60,120,180,240,300].map((a,i)=>{
      const r=a*Math.PI/180;
      return <circle key={i} cx={50+9*Math.cos(r)} cy={50+9*Math.sin(r)}
        r="2.2" fill="#f8e000" stroke="#1a1008" strokeWidth="0.8"/>;
    })}
  </svg>
);

const Hibiscus = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,72,144,216,288].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+26*Math.cos(r), cy=50+26*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="18" ry="24"
        fill={i%2===0?"#f83060":"#e01850"} stroke="#1a0818" strokeWidth="2.8"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <line x1="50" y1="50" x2="50" y2="26" stroke="#1a0818" strokeWidth="2.5"/>
    {[0,60,120,180,240,300].map((a,i)=>{
      const r=a*Math.PI/180;
      return <g key={i}>
        <line x1={50+3*Math.cos(r)} y1={30+3*Math.sin(r)}
          x2={50+9*Math.cos(r)} y2={30+9*Math.sin(r)} stroke="#1a0818" strokeWidth="1.4"/>
        <circle cx={50+9*Math.cos(r)} cy={30+9*Math.sin(r)} r="2.5" fill="#f8d000" stroke="#1a0808" strokeWidth="0.8"/>
      </g>;
    })}
    <circle cx="50" cy="50" r="12" fill="#b00830" stroke="#1a0818" strokeWidth="2.5"/>
    <Spiral cx={50} cy={50} r={9} stroke="#ffb0c8" sw={1.8}/>
  </svg>
);

const Wildflower = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0,45,90,135,180,225,270,315].map((a,i)=>{
      const r=a*Math.PI/180, cx=50+26*Math.cos(r), cy=50+26*Math.sin(r);
      return <ellipse key={i} cx={cx} cy={cy} rx="7" ry="22"
        fill={i%2===0?"#f870b8":"#e050a0"} stroke="#1a0820" strokeWidth="2.5"
        transform={`rotate(${a} ${cx} ${cy})`}/>;
    })}
    <circle cx="50" cy="50" r="13" fill="#c03080" stroke="#1a0820" strokeWidth="2.5"/>
    <Spiral cx={50} cy={50} r={9} stroke="#fff" sw={1.8}/>
    <circle cx="50" cy="50" r="3.5" fill="#1a0820"/>
  </svg>
);

/* ══ GREENERY ══ */
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
    {[
      {d:"M65 110 C50 90 20 70 10 40 C18 36 30 54 48 74 C56 84 62 96 65 110Z",f:"#1a5c30"},
      {d:"M65 110 C55 85 35 60 30 28 C38 24 48 50 58 76 C61 88 63 100 65 110Z",f:"#246638"},
      {d:"M65 110 C60 82 50 52 54 20 C62 18 64 50 65 78 C65 92 65 102 65 110Z",f:"#1e6034"},
      {d:"M65 110 C70 82 80 52 76 20 C84 22 80 50 74 78 C70 92 67 102 65 110Z",f:"#246638"},
      {d:"M65 110 C75 85 95 60 100 28 C108 32 96 54 82 76 C74 88 68 100 65 110Z",f:"#1e6034"},
      {d:"M65 110 C80 90 108 70 120 40 C114 36 100 56 82 74 C74 84 68 96 65 110Z",f:"#1a5c30"},
    ].map((l,i)=>(
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
    {[
      {d:"M70 118 C64 95 42 68 8 52 C10 44 36 64 60 88 C66 96 69 108 70 118Z",f:"#1a5c30"},
      {d:"M70 118 C66 92 50 62 24 42 C26 34 46 58 64 86 C67 98 69 110 70 118Z",f:"#246638"},
      {d:"M70 118 C68 90 58 58 42 34 C50 28 62 56 68 86 C69 100 70 110 70 118Z",f:"#1e6034"},
      {d:"M70 118 C70 88 68 56 62 30 C70 26 72 56 72 86 C71 100 70 110 70 118Z",f:"#246638"},
      {d:"M70 118 C72 90 82 58 98 34 C106 40 88 60 74 88 C72 100 71 110 70 118Z",f:"#1e6034"},
      {d:"M70 118 C74 92 90 62 116 42 C120 50 96 66 76 90 C73 98 71 110 70 118Z",f:"#246638"},
      {d:"M70 118 C76 95 98 68 132 52 C132 60 106 72 78 94 C74 102 71 112 70 118Z",f:"#1a5c30"},
    ].map((b,i)=>(
      <g key={i}><path d={b.d} fill={b.f} opacity="0.90"/><path d={b.d} fill="none" stroke="#0c2818" strokeWidth="1.4" opacity="0.68"/></g>
    ))}
  </svg>
);

const FLOWERS = [
  { id:"rose",       name:"Rose",       icon:<Rose />,       color:"#e83040", meaning:"Love & passion",      month:"June"      },
  { id:"tulip",      name:"Tulip",      icon:<Tulip />,      color:"#f04870", meaning:"Perfect love",        month:"April"     },
  { id:"daisy",      name:"Daisy",      icon:<Daisy />,      color:"#f5c000", meaning:"Innocence & purity",  month:"April"     },
  { id:"peony",      name:"Peony",      icon:<Peony />,      color:"#f8a0c0", meaning:"Romance",             month:"May"       },
  { id:"lavender",   name:"Lavender",   icon:<Lavender />,   color:"#9b60d8", meaning:"Calmness & grace",    month:"July"      },
  { id:"sunflower",  name:"Sunflower",  icon:<Sunflower />,  color:"#f8c800", meaning:"Adoration & warmth",  month:"August"    },
  { id:"orchid",     name:"Orchid",     icon:<Orchid />,     color:"#c060e0", meaning:"Rare beauty",         month:"January"   },
  { id:"camomile",   name:"Camomile",   icon:<Camomile />,   color:"#f0c020", meaning:"Patience & peace",    month:"September" },
  { id:"carnation",  name:"Carnation",  icon:<Carnation />,  color:"#f09050", meaning:"Admiration & love",   month:"January"   },
  { id:"lily",       name:"Lily",       icon:<Lily />,       color:"#6888e8", meaning:"Purity & devotion",   month:"May"       },
  { id:"hibiscus",   name:"Hibiscus",   icon:<Hibiscus />,   color:"#f83060", meaning:"Delicate beauty",     month:"July"      },
  { id:"wildflower", name:"Wildflower", icon:<Wildflower />, color:"#f870b8", meaning:"Joy & free spirit",   month:"June"      },
];

const GREENERY = [
  { id:"eucalyptus", name:"Eucalyptus",   icon:<Eucalyptus />  },
  { id:"tropical",   name:"Tropical Fan", icon:<TropicalFan /> },
  { id:"wispy",      name:"Wispy Sprigs", icon:<WispySprigs /> },
  { id:"sword",      name:"Sword Grass",  icon:<SwordGrass />  },
];

export default function BouquetBuilder() {
  const [selF, setSelF] = useState([]);
  const [selG, setSelG] = useState([]);
  const [hov,  setHov]  = useState(null);

  const toggleF = id => setSelF(p => p.includes(id) ? p.filter(x=>x!==id) : p.length<10 ? [...p,id] : p);
  const toggleG = id => setSelG(p => p.includes(id) ? p.filter(x=>x!==id) : [...p,id]);
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
