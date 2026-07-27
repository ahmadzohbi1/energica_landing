import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/steel.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SERVICE_ROWS = [
  { num: "01 / IND-STR", name: "Industrial structures", desc: "Warehouses, factories, processing plants. Up to 180 m clear spans.", badge: "EN 1090" },
  { num: "02 / PEB", name: "Pre-engineered buildings", desc: "Standardised primary + secondary framing systems. Fast delivery, low cost.", badge: "PEB" },
  { num: "03 / FRAME", name: "Structural frames", desc: "Multi-storey portal frames, mezzanines, racking and platforms.", badge: "SC4" },
  { num: "04 / CUSTOM", name: "Custom fabrication", desc: "One-off pieces — staircases, balustrades, brackets, plant skids.", badge: "CUSTOM" },
  { num: "05 / INFRA", name: "Infrastructure steel", desc: "Pedestrian bridges, support frames for solar arrays, pipe racks.", badge: "INFRA" },
  { num: "06 / ERECT", name: "Erection & installation", desc: "Site rigging, bolt-up, alignment and survey. Own crew, own cranes.", badge: "ON-SITE" },
];

const PROJECTS = [
  {
    title: "Northpoint Distribution Hub",
    loc: "2025 · 42,000 m² · WAREHOUSE",
    tonnes: "1,840 t",
    body: "180 m × 220 m portal-frame warehouse with mezzanine office. Primary framing erected in 38 days.",
    icon: (
      <svg viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" stroke="white" strokeWidth="1.5" fill="none">
        <line x1="20" y1="160" x2="300" y2="160" opacity="0.5" />
        <line x1="40" y1="160" x2="40" y2="60" />
        <line x1="280" y1="160" x2="280" y2="60" />
        <path d="M40 60 L160 30 L280 60" />
        <line x1="40" y1="60" x2="280" y2="60" opacity="0.6" />
        <line x1="80" y1="60" x2="80" y2="160" opacity="0.4" />
        <line x1="120" y1="60" x2="120" y2="160" opacity="0.4" />
        <line x1="160" y1="60" x2="160" y2="160" opacity="0.4" />
        <line x1="200" y1="60" x2="200" y2="160" opacity="0.4" />
        <line x1="240" y1="60" x2="240" y2="160" opacity="0.4" />
        <line x1="40" y1="60" x2="80" y2="40" opacity="0.5" />
        <line x1="80" y1="40" x2="120" y2="40" opacity="0.5" />
        <line x1="80" y1="60" x2="120" y2="40" opacity="0.5" />
        <line x1="120" y1="60" x2="160" y2="30" opacity="0.5" />
        <line x1="160" y1="30" x2="200" y2="40" opacity="0.5" />
        <line x1="200" y1="40" x2="240" y2="40" opacity="0.5" />
        <line x1="200" y1="60" x2="240" y2="40" opacity="0.5" />
        <line x1="240" y1="40" x2="280" y2="60" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: "Sierra Industrial Park — Block C",
    loc: "2024 · 4 STOREYS · OFFICE",
    tonnes: "980 t",
    body: "Multi-storey moment-resisting steel frame. Composite deck slabs. Seismic zone 3 detailing.",
    icon: (
      <svg viewBox="0 0 320 180" stroke="white" strokeWidth="1.5" fill="none">
        <line x1="20" y1="160" x2="300" y2="160" opacity="0.5" />
        <g>
          <line x1="50" y1="160" x2="50" y2="30" />
          <line x1="270" y1="160" x2="270" y2="30" />
          <line x1="50" y1="30" x2="270" y2="30" />
          <line x1="50" y1="60" x2="270" y2="60" opacity="0.6" />
          <line x1="50" y1="90" x2="270" y2="90" opacity="0.6" />
          <line x1="50" y1="120" x2="270" y2="120" opacity="0.6" />
          <line x1="120" y1="160" x2="120" y2="30" opacity="0.5" />
          <line x1="200" y1="160" x2="200" y2="30" opacity="0.5" />
          <line x1="50" y1="30" x2="120" y2="60" opacity="0.4" />
          <line x1="120" y1="30" x2="50" y2="60" opacity="0.4" />
          <line x1="200" y1="30" x2="270" y2="60" opacity="0.4" />
          <line x1="270" y1="30" x2="200" y2="60" opacity="0.4" />
        </g>
      </svg>
    ),
  },
  {
    title: "Halcyon Petrochem Pipe Rack",
    loc: "2024 · 320 M · INFRASTRUCTURE",
    tonnes: "620 t",
    body: "320 m double-deck process pipe rack with hot-dip galvanised finish. Erected adjacent to live plant.",
    icon: (
      <svg viewBox="0 0 320 180" stroke="white" strokeWidth="1.5" fill="none">
        <line x1="20" y1="160" x2="300" y2="160" opacity="0.5" />
        <line x1="40" y1="160" x2="40" y2="50" />
        <line x1="100" y1="160" x2="100" y2="50" />
        <line x1="160" y1="160" x2="160" y2="50" />
        <line x1="220" y1="160" x2="220" y2="50" />
        <line x1="280" y1="160" x2="280" y2="50" />
        <line x1="40" y1="50" x2="280" y2="50" />
        <line x1="40" y1="80" x2="280" y2="80" opacity="0.6" />
        <line x1="40" y1="110" x2="280" y2="110" opacity="0.6" />
        <circle cx="80" cy="65" r="6" stroke="white" opacity="0.7" />
        <circle cx="120" cy="65" r="6" stroke="white" opacity="0.7" />
        <circle cx="180" cy="95" r="8" stroke="white" opacity="0.7" />
        <circle cx="240" cy="95" r="8" stroke="white" opacity="0.7" />
        <line x1="40" y1="50" x2="100" y2="80" opacity="0.4" />
        <line x1="100" y1="50" x2="40" y2="80" opacity="0.4" />
        <line x1="220" y1="80" x2="280" y2="110" opacity="0.4" />
        <line x1="280" y1="80" x2="220" y2="110" opacity="0.4" />
      </svg>
    ),
  },
  {
    title: "Solar Array Mounting · Anza Farm",
    loc: "2025 · 1.2 MWp · INFRA",
    tonnes: "340 t",
    body: "Ground-mount steel substructure for 1.2 MWp solar farm. Co-delivered with Energica Power Solutions.",
    icon: (
      <svg viewBox="0 0 320 180" stroke="white" strokeWidth="1.5" fill="none">
        <line x1="20" y1="160" x2="300" y2="160" opacity="0.5" />
        <line x1="60" y1="160" x2="60" y2="80" />
        <line x1="260" y1="160" x2="260" y2="80" />
        <path d="M60 80 Q160 0 260 80" />
        <line x1="60" y1="80" x2="260" y2="80" opacity="0.6" />
        <g opacity="0.5">
          <rect x="70" y="35" width="40" height="20" />
          <rect x="120" y="20" width="40" height="20" />
          <rect x="170" y="20" width="40" height="20" />
          <rect x="220" y="35" width="40" height="20" />
        </g>
        <line x1="60" y1="80" x2="160" y2="50" opacity="0.4" />
        <line x1="260" y1="80" x2="160" y2="50" opacity="0.4" />
        <line x1="100" y1="80" x2="100" y2="160" opacity="0.3" />
        <line x1="160" y1="80" x2="160" y2="160" opacity="0.3" />
        <line x1="220" y1="80" x2="220" y2="160" opacity="0.3" />
      </svg>
    ),
  },
];

const MATERIALS = [
  { n: "H-beams · HEA / HEB", g: "European wide-flange sections", v: "S275 / S355" },
  { n: "IPE / IPN profiles", g: "Standard I-section beams", v: "S275 / S355" },
  { n: "Hollow sections (SHS / RHS / CHS)", g: "Square, rectangular, circular tube", v: "EN 10219" },
  { n: "Plate, flat bar, angle, channel", g: "Up to 60 mm plate thickness", v: "EN 10025" },
  { n: "Cold-formed purlins (C / Z)", g: "Secondary framing", v: "EN 1090-4" },
];

const CERTS = [
  { id: "CERT — 01", t: "EN 1090-1 EXC4", d: "Highest execution class for structural steel" },
  { id: "CERT — 02", t: "ISO 3834-2", d: "Quality requirements for welding" },
  { id: "CERT — 03", t: "ISO 9001:2015", d: "Quality management system" },
  { id: "CERT — 04", t: "ISO 45001", d: "Occupational health & safety" },
  { id: "CERT — 05", t: "AWS D1.1", d: "Structural welding code (steel)" },
  { id: "CERT — 06", t: "ISO 14001", d: "Environmental management" },
];

export default function SteelPage() {
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "steel");

  return (
    <>
      <Seo
        title="Energica Steel — Industrial structures & fabrication"
        description="Heavy steel structures, engineered frames and custom fabrication for warehouses, factories, hangars and infrastructure — designed, fabricated and erected in-house to EN 1090 Execution Class 4."
        path="/steel"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="steel" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={`${styles.heroLeft} reveal`}>
              <span className="eyebrow">Energica Steel · Industrial fabrication</span>
              <h1 style={{ marginTop: 24, fontSize: "clamp(40px,5.5vw,72px)" }}>
                <span className={styles.numMark}>02.</span>Steel that
                <br />
                holds the load.
              </h1>
              <p style={{ marginTop: 24, fontSize: 18, maxWidth: 540 }}>
                Heavy steel structures, engineered frames and custom fabrication for warehouses, factories, hangars
                and infrastructure projects. Designed in-house, fabricated in our own shop, erected by our own crew.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
                <a href="#contact" className="btn btn-primary">Request a quote</a>
                <a href="#services" className="btn btn-ghost btn-arrow">
                  What we fabricate
                  <ArrowIcon />
                </a>
              </div>

              <div className={styles.heroSpec}>
                <div><strong>4,200 t</strong>steel<br />shipped in 2025</div>
                <div><strong>±0.5 mm</strong>shop<br />tolerance</div>
                <div><strong>EN 1090</strong>execution<br />class 4</div>
                <div><strong>180 m</strong>longest<br />clear span</div>
              </div>
            </div>

            <div className={styles.heroRight} aria-hidden="true">
              <div className={styles.blueprintGrid} />
              <svg viewBox="0 0 600 600" preserveAspectRatio="xMidYMid meet">
                <g stroke="#ffffff" strokeWidth="2" fill="none" strokeLinejoin="round">
                  <line x1="60" y1="500" x2="540" y2="500" strokeWidth="1.5" opacity="0.5" />
                  <line x1="120" y1="500" x2="120" y2="220" />
                  <line x1="480" y1="500" x2="480" y2="220" />
                  <path d="M120 220 Q300 80 480 220" />
                  <line x1="120" y1="220" x2="480" y2="220" />
                  <line x1="120" y1="220" x2="180" y2="174" />
                  <line x1="180" y1="220" x2="180" y2="174" />
                  <line x1="180" y1="220" x2="240" y2="139" />
                  <line x1="240" y1="220" x2="240" y2="139" />
                  <line x1="240" y1="220" x2="300" y2="120" />
                  <line x1="300" y1="220" x2="300" y2="120" />
                  <line x1="300" y1="220" x2="360" y2="139" />
                  <line x1="360" y1="220" x2="360" y2="139" />
                  <line x1="360" y1="220" x2="420" y2="174" />
                  <line x1="420" y1="220" x2="420" y2="174" />
                  <line x1="420" y1="220" x2="480" y2="220" />
                  <line x1="120" y1="500" x2="180" y2="350" opacity="0.6" />
                  <line x1="180" y1="500" x2="120" y2="350" opacity="0.6" />
                  <line x1="420" y1="500" x2="480" y2="350" opacity="0.6" />
                  <line x1="480" y1="500" x2="420" y2="350" opacity="0.6" />
                  <line x1="180" y1="350" x2="420" y2="350" opacity="0.5" />
                  <line x1="120" y1="350" x2="480" y2="350" opacity="0.3" />
                  <circle cx="120" cy="220" r="5" fill="#6b7785" />
                  <circle cx="480" cy="220" r="5" fill="#6b7785" />
                  <circle cx="180" cy="174" r="4" fill="#6b7785" />
                  <circle cx="420" cy="174" r="4" fill="#6b7785" />
                  <circle cx="240" cy="139" r="4" fill="#6b7785" />
                  <circle cx="360" cy="139" r="4" fill="#6b7785" />
                  <circle cx="300" cy="120" r="5" fill="#6b7785" />
                </g>
                <g stroke="#6b7785" strokeWidth="0.8" fill="none">
                  <line x1="120" y1="540" x2="480" y2="540" />
                  <line x1="120" y1="535" x2="120" y2="545" />
                  <line x1="480" y1="535" x2="480" y2="545" />
                </g>
                <text x="300" y="556" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#ffffff" opacity="0.7" letterSpacing="2">
                  42.0 m CLEAR SPAN
                </text>
                <g transform="translate(80 100)">
                  <line x1="50" y1="0" x2="50" y2="20" stroke="#6b7785" strokeWidth="0.8" strokeDasharray="2 2" />
                  <rect x="0" y="-12" width="120" height="20" fill="#122544" stroke="#6b7785" />
                  <text x="60" y="2" textAnchor="middle" fontFamily="Geist Mono" fontSize="10" fill="#ffffff" letterSpacing="1.5">
                    HEB 240 / S355
                  </text>
                </g>
              </svg>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Capabilities</span>
                <h2>Six service lines, one fabrication shop.</h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                From design tables to delivery trucks. We are happy to take a single steel beam, an entire frame, or
                a multi-year industrial programme.
              </p>
            </div>

            <div className={`${styles.svcTable} reveal`} data-delay="1">
              {SERVICE_ROWS.map((r) => (
                <div className={styles.svcRow} key={r.num}>
                  <div className={styles.num}>{r.num}</div>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.desc}>{r.desc}</div>
                  <div className={styles.badge}>{r.badge}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Project showcase</span>
                <h2>Recent steel programmes delivered.</h2>
              </div>
            </div>

            <div className={styles.projGrid}>
              {PROJECTS.map((p, i) => (
                <div className={`${styles.projCard} reveal`} data-delay={i + 1} key={p.title}>
                  <div className={styles.projVis}>
                    <div className={styles.blueprintGrid} />
                    {p.icon}
                  </div>
                  <div className={styles.projInfo}>
                    <div className="row">
                      <div>
                        <h4>{p.title}</h4>
                        <div className={styles.loc}>{p.loc}</div>
                      </div>
                      <div className={styles.tonnes}>{p.tonnes}</div>
                    </div>
                    <p>{p.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* MATERIALS & CERTS */}
        <section className={`${styles.certs} section`}>
          <div className="container">
            <div className={styles.certsGrid}>
              <div className="reveal">
                <span className="eyebrow">Materials</span>
                <h2 style={{ marginTop: 16 }}>Standard sections we stock and fabricate.</h2>
                <p style={{ marginTop: 16 }}>
                  All materials are traceable from mill to site with EN 10204 3.1 certificates and material test
                  reports. Grade substitution is never silent.
                </p>

                <div className={styles.matTable} style={{ marginTop: 32 }}>
                  {MATERIALS.map((m) => (
                    <div className={styles.matRow} key={m.n}>
                      <div>
                        <div className={styles.n}>{m.n}</div>
                        <div className={styles.g}>{m.g}</div>
                      </div>
                      <div className={styles.v}>{m.v}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="reveal" data-delay="1">
                <span className="eyebrow">Certifications</span>
                <h2 style={{ marginTop: 16 }}>Auditable, by design.</h2>
                <p style={{ marginTop: 16 }}>
                  We operate to EN 1090 Execution Class 4 — the highest tier. Every weld is recorded, every welder
                  qualified, every coating measured.
                </p>

                <div className={styles.certGrid} style={{ marginTop: 32 }}>
                  {CERTS.map((c) => (
                    <div className={styles.cert} key={c.id}>
                      <div className={styles.id}>{c.id}</div>
                      <div className={styles.t}>{c.t}</div>
                      <div className={styles.d}>{c.d}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className={styles.contactStrip} id="contact">
          <div className={styles.blueprintGrid} aria-hidden="true" />
          <div className="container">
            <div>
              <span style={{ fontFamily: "'Geist Mono',monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.16em", color: "rgba(255,255,255,0.7)" }}>
                // Talk to engineering
              </span>
              <h2 style={{ marginTop: 12 }}>Have drawings? Send them. Have just an idea? Send that too.</h2>
              <p>
                We routinely take projects from sketch to erected steel. Drop your scope, BOM, drawings or RFQ — an
                engineer will read it, not a chatbot.
              </p>
            </div>
            <div className={styles.contactCard}>
              <div className={styles.lab}>RFQ desk</div>
              <div className={styles.val}>tenders@energica-steel.group</div>
              <div className={styles.lab}>Project enquiries</div>
              <div className={styles.val}>+1 (000) 000-0011</div>
              <a href="/#contact" className="btn">Send RFQ</a>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="steel" />
      </div>
    </>
  );
}
