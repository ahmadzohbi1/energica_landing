import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/constructions.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SERVICES = [
  {
    num: "01 / DESIGN",
    title: "Design & engineering",
    body: "In-house architects, structural and MEP engineers. We deliver fully-coordinated BIM models, not stacks of PDFs that fight each other.",
    bullets: ["Architectural design", "Structural engineering", "MEP coordination (BIM)", "Permit drawings & approvals"],
  },
  {
    num: "02 / BUILD",
    title: "Construction",
    body: "Self-perform structural, finishing, MEP first-fix and commissioning. Trade partners only where they add real expertise.",
    bullets: ["General contracting", "Design-build delivery", "Industrial fit-out", "Self-performed structural"],
  },
  {
    num: "03 / FINISH",
    title: "Commissioning & handover",
    body: "Buildings tested, balanced, documented and handed over with O&M manuals, training and a real defects liability promise.",
    bullets: ["Testing & balancing", "Operator training", "Asset register & O&M", "12-month DLP"],
  },
];

const WHY = [
  { title: "Programme certainty", body: "On-time delivery on 94% of projects across the last five years. Liquidated damages we'd actually accept.", icon: <><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" /></> },
  { title: "One accountable team", body: "Single project director. Single contract. No design-vs-build finger pointing — both are us.", icon: <path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" /> },
  { title: "Group capability", body: "Steel, solar, electrical and FM all in-house. We can deliver what would normally be five subcontracts as one.", icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /> },
  { title: "12-month DLP", body: "Real defects liability with a person, a phone and a truck. Not a template clause.", icon: <path d="M20 6L9 17l-5-5" /> },
];

const FEATURED = [
  {
    tag: "2025 · COMMERCIAL",
    lab: "01 / OFFICE TOWER",
    title: "Meridian Park — Building B",
    body: "14,200 m² Class-A office building. Concept through commissioning in 22 months. Includes rooftop PV array integrated by Energica Power Solutions and structural steel from Energica Steel.",
    specs: [["GFA", "14,200 m²"], ["Storeys", "8"], ["Programme", "22 mo"]],
    icon: (
      <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
        <line x1="20" y1="420" x2="580" y2="420" stroke="#1a2530" strokeWidth="1" />
        <rect x="120" y="160" width="360" height="260" fill="white" stroke="#1a2530" strokeWidth="1.4" />
        <g stroke="#2c7fb5" strokeWidth="0.6" fill="#cfe1ee" opacity="0.8">
          {[180, 230, 280, 330].flatMap((y) =>
            [140, 190, 240, 290, 340, 390].map((x) => <rect key={`${x}-${y}`} x={x} y={y} width="40" height="40" />)
          )}
        </g>
        <rect x="280" y="390" width="60" height="30" fill="#2c7fb5" />
        <g transform="translate(120 130)" fill="#1a2530">
          <rect width="40" height="20" /><rect x="50" width="40" height="20" /><rect x="100" width="40" height="20" />
          <rect x="150" width="40" height="20" /><rect x="200" width="40" height="20" /><rect x="250" width="40" height="20" />
          <rect x="300" width="40" height="20" />
        </g>
      </svg>
    ),
  },
  {
    tag: "2024 · INDUSTRIAL",
    lab: "02 / DISTRIBUTION HUB",
    title: "Northpoint Logistics Centre",
    body: "42,000 m² distribution warehouse with cross-dock layout and 6 loading bays. Steel portal frame, sandwich-panel envelope, 320 kWp rooftop PV integrated into the design.",
    specs: [["GFA", "42,000 m²"], ["Bays", "6 dock"], ["PV", "320 kWp"]],
    icon: (
      <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
        <line x1="20" y1="420" x2="580" y2="420" stroke="#1a2530" strokeWidth="1" />
        <path d="M60 320 L60 250 L300 180 L540 250 L540 320 L60 320Z" fill="white" stroke="#1a2530" strokeWidth="1.4" />
        <path d="M60 250 L300 180 L540 250" fill="none" stroke="#1a2530" strokeWidth="1.4" />
        <line x1="540" y1="250" x2="540" y2="320" stroke="#1a2530" strokeWidth="1.4" />
        <line x1="540" y1="320" x2="540" y2="420" stroke="#1a2530" strokeWidth="1.4" />
        <line x1="60" y1="320" x2="60" y2="420" stroke="#1a2530" strokeWidth="1.4" />
        <line x1="60" y1="420" x2="540" y2="420" stroke="#1a2530" strokeWidth="1.4" />
        <g fill="#2c7fb5">
          <rect x="100" y="360" width="50" height="60" /><rect x="170" y="360" width="50" height="60" />
          <rect x="240" y="360" width="50" height="60" /><rect x="310" y="360" width="50" height="60" />
          <rect x="380" y="360" width="50" height="60" /><rect x="450" y="360" width="50" height="60" />
        </g>
        <g stroke="#8b96a3" strokeWidth="0.7">
          <line x1="100" y1="240" x2="320" y2="186" /><line x1="140" y1="230" x2="340" y2="186" />
          <line x1="180" y1="220" x2="360" y2="186" /><line x1="220" y1="210" x2="380" y2="186" />
          <line x1="260" y1="200" x2="400" y2="186" /><line x1="300" y1="190" x2="420" y2="186" />
          <line x1="340" y1="186" x2="440" y2="195" /><line x1="360" y1="186" x2="460" y2="205" />
          <line x1="380" y1="186" x2="480" y2="215" /><line x1="400" y1="186" x2="500" y2="225" />
        </g>
        <g transform="translate(180 178)" fill="#1a2530" stroke="#2c7fb5" strokeWidth="0.5">
          <rect width="30" height="10" /><rect x="40" width="30" height="10" /><rect x="80" width="30" height="10" />
          <rect x="120" width="30" height="10" /><rect x="160" width="30" height="10" /><rect x="200" width="30" height="10" />
        </g>
        <g fill="#8b96a3" opacity="0.5" transform="translate(380 380)">
          <rect width="80" height="30" />
          <rect x="60" y="-12" width="30" height="12" />
          <circle cx="20" cy="34" r="6" fill="#1a2530" />
          <circle cx="60" cy="34" r="6" fill="#1a2530" />
        </g>
      </svg>
    ),
  },
  {
    tag: "2024 · HEALTHCARE",
    lab: "03 / MEDICAL CAMPUS",
    title: "St. Cyril's Outpatient Wing",
    body: "9,600 m² outpatient addition with new central atrium. Hospital remained fully operational throughout construction. Coordinated with hospital MEP and clinical workflows.",
    specs: [["GFA", "9,600 m²"], ["Beds added", "48"], ["Programme", "18 mo"]],
    icon: (
      <svg viewBox="0 0 600 460" preserveAspectRatio="xMidYMid meet">
        <line x1="20" y1="420" x2="580" y2="420" stroke="#1a2530" strokeWidth="1" />
        <rect x="120" y="180" width="120" height="240" fill="white" stroke="#1a2530" strokeWidth="1.4" />
        <rect x="240" y="220" width="120" height="200" fill="#f5f7fa" stroke="#1a2530" strokeWidth="1.4" />
        <rect x="360" y="180" width="120" height="240" fill="white" stroke="#1a2530" strokeWidth="1.4" />
        <g stroke="#2c7fb5" strokeWidth="0.6" fill="#cfe1ee" opacity="0.8">
          {[200, 234, 268, 302].flatMap((y) => [135, 165, 195].map((x) => <rect key={`l-${x}-${y}`} x={x} y={y} width="20" height="24" />))}
          {[200, 234, 268, 302].flatMap((y) => [375, 405, 435].map((x) => <rect key={`r-${x}-${y}`} x={x} y={y} width="20" height="24" />))}
        </g>
        <g fill="#2c7fb5" opacity="0.3" transform="translate(255 240)">
          <rect width="90" height="160" />
        </g>
        <line x1="255" y1="240" x2="255" y2="400" stroke="#2c7fb5" strokeWidth="0.6" />
        <line x1="345" y1="240" x2="345" y2="400" stroke="#2c7fb5" strokeWidth="0.6" />
        <rect x="275" y="380" width="50" height="40" fill="#2c7fb5" />
        <g transform="translate(290 270)" fill="#2c7fb5">
          <rect x="10" width="6" height="40" />
          <rect y="17" width="26" height="6" />
        </g>
      </svg>
    ),
  },
];

export default function ConstructionsPage() {
  const [sent, setSent] = useState(false);
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "constr");

  return (
    <>
      <Seo
        title="Energica Constructions — Building & construction"
        description="Architectural-led design and construction services for industrial, commercial and institutional projects — concept through handover, backed by the engineering, steel and energy of the wider Energica group."
        path="/constructions"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="constr" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroTop}>
              <div className="reveal">
                <span className="eyebrow">Energica Constructions</span>
                <h1 style={{ marginTop: 20 }}>
                  Buildings, <span className={styles.light}>measured</span>
                  <br />
                  in decades.
                </h1>
              </div>
              <div className={`${styles.heroMeta} reveal`} data-delay="1">
                <p>
                  Architectural-led design and construction services for industrial, commercial and institutional
                  projects. We take ownership from first sketch to handover — with the engineering, steel and energy
                  of the wider Energica group behind us.
                </p>
                <div className="row">
                  <a href="#contact" className="btn btn-primary">Start a project</a>
                  <a href="#projects" className="btn btn-ghost btn-arrow">
                    See featured builds
                    <ArrowIcon />
                  </a>
                </div>
              </div>
            </div>

            <div className={`${styles.heroElev} reveal`} data-delay="2" aria-hidden="true">
              <svg viewBox="0 0 1280 540" preserveAspectRatio="xMidYMid meet">
                <line x1="0" y1="480" x2="1280" y2="480" stroke="#1a2530" strokeWidth="1.2" />
                <line x1="0" y1="500" x2="1280" y2="500" stroke="#8b96a3" strokeWidth="0.6" strokeDasharray="4 4" />

                <g fill="#e3e8ed" stroke="#c3ccd5" strokeWidth="1">
                  <rect x="40" y="320" width="120" height="160" />
                  <rect x="1100" y="280" width="140" height="200" />
                  <rect x="1240" y="360" width="60" height="120" />
                  <rect x="0" y="360" width="40" height="120" />
                </g>

                <g>
                  <rect x="200" y="200" width="280" height="280" fill="white" stroke="#1a2530" strokeWidth="1.5" />
                  <rect x="480" y="80" width="320" height="400" fill="#f5f7fa" stroke="#1a2530" strokeWidth="1.5" />
                  <rect x="800" y="240" width="280" height="240" fill="white" stroke="#1a2530" strokeWidth="1.5" />

                  <g stroke="#2c7fb5" strokeWidth="0.7" fill="#cfe1ee" opacity="0.85">
                    {[100, 140, 180, 220, 260, 300, 340, 380, 420].map((y) => (
                      <g transform={`translate(500 ${y})`} key={y}>
                        <rect width="40" height="28" /><rect x="50" width="40" height="28" /><rect x="100" width="40" height="28" />
                        <rect x="150" width="40" height="28" /><rect x="200" width="40" height="28" /><rect x="250" width="40" height="28" />
                      </g>
                    ))}
                  </g>
                  <g stroke="#2c7fb5" strokeWidth="0.7" fill="#cfe1ee" opacity="0.85">
                    {[220, 260, 300, 340, 380, 420].map((y) => <rect x="220" y={y} width="240" height="20" key={`lw-${y}`} />)}
                  </g>
                  <g stroke="#2c7fb5" strokeWidth="0.7" fill="#cfe1ee" opacity="0.85">
                    {[260, 300, 340, 380, 420].map((y) => <rect x="820" y={y} width="240" height="20" key={`rw-${y}`} />)}
                  </g>

                  <rect x="610" y="440" width="60" height="40" fill="#2c7fb5" />
                  <g transform="translate(490 60)" stroke="#2c7fb5" fill="#1a2530">
                    <rect width="40" height="14" /><rect x="50" width="40" height="14" /><rect x="100" width="40" height="14" />
                    <rect x="150" width="40" height="14" /><rect x="200" width="40" height="14" /><rect x="250" width="40" height="14" />
                    <rect x="300" width="20" height="14" />
                  </g>
                </g>

                <g stroke="#8b96a3" strokeWidth="0.6">
                  <line x1="200" y1="510" x2="1080" y2="510" />
                  <line x1="200" y1="506" x2="200" y2="514" />
                  <line x1="1080" y1="506" x2="1080" y2="514" />
                </g>
                <text x="640" y="528" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="#8b96a3" letterSpacing="2">
                  88.0 m FAÇADE LENGTH
                </text>

                <g transform="translate(40 40)">
                  <text fontFamily="Geist Mono" fontSize="11" fill="#1a2530" letterSpacing="2">DWG-001 · ELEV-N</text>
                  <text y="14" fontFamily="Geist Mono" fontSize="9" fill="#8b96a3" letterSpacing="2">SCALE 1:200</text>
                </g>
                <g transform="translate(1080 40)">
                  <text fontFamily="Geist Mono" fontSize="11" fill="#1a2530" letterSpacing="2" textAnchor="end">CONCEPT · REV 03</text>
                </g>
              </svg>
              <div className={styles.heroCorners}>
                <span>FILE — ENC-2026-001</span>
                <span>SCALE 1:200</span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className={`${styles.services} section`} id="services">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Services</span>
                <h2>
                  From the first concept sketch
                  <br />
                  to the day you cut the ribbon.
                </h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                Three integrated services. One project director. One signed contract. No buck-passing between
                consultants and contractors.
              </p>
            </div>

            <div className={`${styles.svcRows} reveal`} data-delay="1">
              {SERVICES.map((s) => (
                <div className={styles.svcBox} key={s.num}>
                  <div className={styles.num}>{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul>
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="section" id="projects">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Featured projects</span>
                <h2>Three recent builds — different programmes, same standard.</h2>
              </div>
            </div>

            <div className={styles.featured}>
              {FEATURED.map((p) => (
                <div className={`${styles.feat} reveal`} key={p.title}>
                  <div className={styles.featImg}>
                    {p.icon}
                    <div className={styles.featTag}>{p.tag}</div>
                  </div>
                  <div className={styles.featBody}>
                    <div className={styles.lab}>{p.lab}</div>
                    <h3>{p.title}</h3>
                    <p>{p.body}</p>
                    <div className={styles.featSpecs}>
                      {p.specs.map(([l, v]) => (
                        <div key={l}>
                          <div className={styles.l}>{l}</div>
                          <div className={styles.v}>{v}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY US */}
        <section className={styles.why}>
          <div className="container" style={{ position: "relative" }}>
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Why Energica</span>
                <h2>
                  One contract. One team.
                  <br />
                  One number to call.
                </h2>
              </div>
              <p style={{ maxWidth: 380 }}>
                When something goes wrong on a building project, the problem is usually the seams between
                consultants. We removed the seams.
              </p>
            </div>

            <div className={styles.whyGrid}>
              {WHY.map((w, i) => (
                <div className={`${styles.whyCell} reveal`} data-delay={i + 1} key={w.title}>
                  <svg className={styles.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                    {w.icon}
                  </svg>
                  <h4>{w.title}</h4>
                  <p>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className={`${styles.contactForm} reveal`}>
              <div>
                <span className="eyebrow">Start a project</span>
                <h2 style={{ marginTop: 16 }}>Building something? Walk us through it.</h2>
                <p style={{ marginTop: 18, fontSize: 15 }}>
                  Send us your scope, even if it's a paragraph. A senior project director will reply with questions
                  and a first-pass programme view.
                </p>
                <ul style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", flexDirection: "column", gap: 12 }}>
                  <li style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    constructions@energica.group
                  </li>
                  <li style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14 }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--brand)" strokeWidth="1.8">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    +1 (000) 000-0040
                  </li>
                </ul>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className={styles.inputGrid}>
                  <div>
                    <label>Your name</label>
                    <input required placeholder="Jordan Reyes" />
                  </div>
                  <div>
                    <label>Company</label>
                    <input required placeholder="Acme Inc." />
                  </div>
                </div>
                <div className={styles.inputGrid}>
                  <div>
                    <label>Work email</label>
                    <input type="email" required placeholder="you@company.com" />
                  </div>
                  <div>
                    <label>Project type</label>
                    <select>
                      <option>Commercial / office</option>
                      <option>Industrial / warehouse</option>
                      <option>Healthcare / institutional</option>
                      <option>Mixed use</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                <label>Scope summary</label>
                <textarea rows="4" placeholder="A few sentences on what you're building — site, programme, key constraints." />
                <button className="btn btn-primary" type="submit" disabled={sent} style={{ width: "100%", justifyContent: "center" }}>
                  {sent ? "Received — we will be in touch" : "Send to project desk"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="constr" />
      </div>
    </>
  );
}
