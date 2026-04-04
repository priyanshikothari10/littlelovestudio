import json

flowers_data = [
    {"name": "Rose", "color": "#cf8f9e", "meaning": "Love & passion", "month": "June", "code": """
const Rose = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 72, 144, 216, 288].map(a => <path key={`o1-${a}`} d="M50 50 L35 18 L65 18 Z" fill="#b97c8c" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" opacity="0.9" transform={`rotate(${a} 50 50) translate(0 -5)`}/>)}
    {[36, 108, 180, 252, 324].map(a => <path key={`o2-${a}`} d="M50 50 L38 24 L62 24 Z" fill="#cf8f9e" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" opacity="0.95" transform={`rotate(${a} 50 50) translate(0 -2)`}/>)}
    {[0, 72, 144, 216, 288].map(a => <path key={`o3-${a}`} d="M50 50 L42 32 L58 32 Z" fill="#ea385e" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#f8b4c4" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);"""},
    {"name": "Sunflower", "color": "#d9ba40", "meaning": "Adoration", "month": "August", "code": """
const Sunflower = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 18}).map((_,i) => <path key={`bg-${i}`} d="M45 50 L50 20 L55 50 Z" fill="#b9942a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*20+10} 50 50)`}/>)}
    {Array.from({length: 18}).map((_,i) => <path key={`fg-${i}`} d="M47 50 L50 24 L53 50 Z" fill="#d9ba40" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*20} 50 50)`}/>)}
    <circle cx="50" cy="50" r="18" fill="#4d3319" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="12" fill="#6c4824" stroke="none"/>
    <circle cx="50" cy="50" r="6" fill="#322211" stroke="none"/>
  </svg>
);"""},
    {"name": "Daisy", "color": "#d9dfdf", "meaning": "Innocence", "month": "April", "code": """
const Daisy = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 16}).map((_,i) => <path key={`bg-${i}`} d="M47 50 L50 18 L53 50 Z" fill="#a4b0b4" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5+11.25} 50 50)`}/>)}
    {Array.from({length: 16}).map((_,i) => <path key={`fg-${i}`} d="M48 50 L50 20 L52 50 Z" fill="#d9dfdf" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#e7af1a" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="6" fill="#f4c94d" stroke="none"/>
  </svg>
);"""},
    {"name": "Peony", "color": "#cd669a", "meaning": "Romance", "month": "May", "code": """
const Peony = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L35 20 L65 20 Z" fill="#9f4b7a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L40 26 L60 26 Z" fill="#bc5a8d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[15, 75, 135, 195, 255, 315].map(a => <path key={`l3-${a}`} d="M50 50 L43 32 L57 32 Z" fill="#d47ba6" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#efb5cf" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);"""},
    {"name": "Tulip", "color": "#c65163", "meaning": "Perfect love", "month": "April", "code": """
const Tulip = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 16 L60 16 Z" fill="#a44050" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 24 L57 24 Z" fill="#d36677" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="7" fill="#f492a0" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);"""},
    {"name": "Lily", "color": "#c19478", "meaning": "Purity", "month": "May", "code": """
const Lily = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 16 L60 16 Z" fill="#a3765c" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 26 L57 26 Z" fill="#d1a58a" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="8" fill="#efcfbd" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="3" fill="#b46433" stroke="none"/>
  </svg>
);"""},
    {"name": "Camellia", "color": "#b84f67", "meaning": "Admiration", "month": "January", "code": """
const Camellia = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={`l1-${a}`} d="M50 50 L38 22 L62 22 Z" fill="#943d51" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map(a => <path key={`l2-${a}`} d="M50 50 L42 28 L58 28 Z" fill="#c45a72" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#a42846" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 8}).map((_,i) => <circle key={`dot-${i}`} cx={50} cy={44} r="1.5" fill="#e7c648" stroke="none" transform={`rotate(${i*45} 50 50)`}/>)}
    <circle cx="50" cy="50" r="2.5" fill="#e7c648" stroke="none"/>
  </svg>
);"""},
    {"name": "Ranunculus", "color": "#db8c52", "meaning": "Charm", "month": "February", "code": """
const Ranunculus = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L38 20 L62 20 Z" fill="#985c33" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L42 26 L58 26 Z" fill="#bc7441" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[15, 75, 135, 195, 255, 315].map(a => <path key={`l3-${a}`} d="M50 50 L44 32 L56 32 Z" fill="#db8c52" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[45, 105, 165, 225, 285, 345].map(a => <path key={`l4-${a}`} d="M50 50 L46 38 L54 38 Z" fill="#f0a976" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="4" fill="#fbe1b3" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);"""},
    {"name": "Gerbera", "color": "#d05646", "meaning": "Joy", "month": "April", "code": """
const Gerbera = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 16}).map((_,i) => <path key={`bg-${i}`} d="M47 50 L50 16 L53 50 Z" fill="#b04334" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5+11.25} 50 50)`}/>)}
    {Array.from({length: 16}).map((_,i) => <path key={`fg-${i}`} d="M48 50 L50 20 L52 50 Z" fill="#df6250" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="14" fill="#4d3014" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 12}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={42} r="1.5" fill="#f0962b" stroke="none" transform={`rotate(${i*30} 50 50)`}/>)}
    <circle cx="50" cy="50" r="5" fill="#2b1a0a" stroke="none"/>
  </svg>
);"""},
    {"name": "Carnation", "color": "#e08eaa", "meaning": "Love & fascination", "month": "January", "code": """
const Carnation = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {Array.from({length: 12}).map((_,i) => <path key={`l1-${i}`} d="M50 50 L38 22 L62 22 Z" fill="#b0627d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*30+15} 50 50)`}/>)}
    {Array.from({length: 12}).map((_,i) => <path key={`l2-${i}`} d="M50 50 L42 28 L58 28 Z" fill="#c37691" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*30} 50 50)`}/>)}
    {Array.from({length: 8}).map((_,i) => <path key={`l3-${i}`} d="M50 50 L44 34 L56 34 Z" fill="#e08eaa" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${i*45+22.5} 50 50)`}/>)}
    <circle cx="50" cy="50" r="6" fill="#efb9cd" stroke="#1a0808" strokeWidth="1.5"/>
  </svg>
);"""},
    {"name": "Anemone", "color": "#9ca1ca", "meaning": "Anticipation", "month": "May", "code": """
const Anemone = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L38 20 L62 20 Z" fill="#8489b0" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L42 26 L58 26 Z" fill="#a9aed8" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="12" fill="#1b1c3b" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="6" fill="#40426b" stroke="none"/>
    {Array.from({length: 12}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={42} r="1" fill="#d0d2eb" stroke="none" transform={`rotate(${i*30} 50 50)`}/>)}
  </svg>
);"""},
    {"name": "Magnolia", "color": "#e0dbd5", "meaning": "Nobility", "month": "May", "code": """
const Magnolia = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 60, 120, 180, 240, 300].map(a => <path key={`l1-${a}`} d="M50 50 L40 18 L60 18 Z" fill="#c3bdb5" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[30, 90, 150, 210, 270, 330].map(a => <path key={`l2-${a}`} d="M50 50 L43 26 L57 26 Z" fill="#e2ddd6" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="10" fill="#eed9cd" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 8}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={43} r="1" fill="#c88b63" stroke="none" transform={`rotate(${i*45} 50 50)`}/>)}
  </svg>
);"""},
    {"name": "Cosmos", "color": "#cc93ad", "meaning": "Peace", "month": "October", "code": """
const Cosmos = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 45, 90, 135, 180, 225, 270, 315].map(a => <path key={`l1-${a}`} d="M50 50 L40 20 L60 20 Z" fill="#ba7c98" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    <circle cx="50" cy="50" r="10" fill="#e1b83d" stroke="#1a0808" strokeWidth="1.5"/>
    <circle cx="50" cy="50" r="5" fill="#c29a28" stroke="none"/>
  </svg>
);"""},
    {"name": "Cherry Blossom", "color": "#cc9db0", "meaning": "Renewal", "month": "April", "code": """
const CherryBlossom = () => (
  <svg viewBox="0 0 100 100" width="82" height="82">
    {[0, 72, 144, 216, 288].map(a => <path key={`l1-${a}`} d="M50 50 L40 22 L60 22 Z" fill="#b9889d" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a} 50 50)`}/>)}
    {[0, 72, 144, 216, 288].map(a => <path key={`l2-${a}`} d="M50 50 L44 28 L56 28 Z" fill="#d2a6b8" stroke="#1a0808" strokeWidth="1.5" strokeLinejoin="round" transform={`rotate(${a+36} 50 50)`}/>)}
    <circle cx="50" cy="50" r="8" fill="#e8c8d8" stroke="#1a0808" strokeWidth="1.5"/>
    {Array.from({length: 5}).map((_,i) => <circle key={`d-${i}`} cx={50} cy={45} r="1.2" fill="#da4876" stroke="none" transform={`rotate(${i*72} 50 50)`}/>)}
  </svg>
);"""},
    {"name": "Hydrangea", "color": "#8ea5c3", "meaning": "Gratitude", "month": "May", "code": """
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
);"""},
    {"name": "Lavender", "color": "#9b8dcf", "meaning": "Calmness", "month": "July", "code": """
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
);"""}
]

components_code = ""
flowers_array = "export const FLOWERS = [\n"
for c in flowers_data:
    components_code += c["code"].strip() + "\n\n"
    id_name = c["name"].replace(" ", "").lower()
    comp_name = c["name"].replace(" ", "")
    flowers_array += f'  {{ id:"{id_name}", name:"{c["name"]}", icon:<{comp_name} />, color:"{c["color"]}", meaning:"{c["meaning"]}", month:"{c["month"]}" }},\n'
flowers_array += "];"

with open("output.txt", "w", encoding="utf-8") as f:
    f.write(components_code)
    f.write("\n")
    f.write(flowers_array)
