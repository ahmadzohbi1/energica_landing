import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/power-solutions.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const SERVICES = [
  {
    num: "01 / RESIDENTIAL",
    title: "Home solar",
    body: "3 to 15 kW rooftop systems with battery options. Sized to your bill, designed around your roof.",
    bullets: ["Monocrystalline panels, Tier-1", "Hybrid inverter + storage option", "Net-metering paperwork handled", "App-based monitoring"],
    icon: (
      <>
        <path d="M10 40 L40 16 L70 40 L70 70 L10 70 Z" />
        <rect x="22" y="48" width="18" height="22" fill="#6ab547" opacity="0.2" />
        <rect x="46" y="48" width="14" height="14" stroke="#4ab0d9" />
        <path d="M22 26 L58 26 L62 38 L26 38 Z" fill="#4ab0d9" opacity="0.3" stroke="#4ab0d9" />
        <line x1="22" y1="32" x2="58" y2="32" stroke="#4ab0d9" strokeWidth="0.6" />
      </>
    ),
  },
  {
    num: "02 / COMMERCIAL",
    title: "Business & retail",
    body: "15 to 250 kW systems for offices, warehouses and retail. Cut opex by 40-70% from day one.",
    bullets: ["Rooftop, carport or ground-mount", "Three-phase string inverters", "Bill audit + financial modelling", "O&M packages available"],
    icon: (
      <>
        <rect x="8" y="36" width="64" height="34" />
        <rect x="20" y="48" width="10" height="22" fill="#4ab0d9" opacity="0.2" />
        <rect x="36" y="48" width="10" height="22" stroke="#4ab0d9" />
        <rect x="52" y="48" width="10" height="22" fill="#4ab0d9" opacity="0.2" />
        <g transform="translate(8 14)">
          <rect x="4" y="0" width="14" height="22" fill="#1f3a5f" />
          <rect x="22" y="0" width="14" height="22" fill="#1f3a5f" />
          <rect x="40" y="0" width="14" height="22" fill="#1f3a5f" />
          <rect x="58" y="0" width="14" height="22" fill="#1f3a5f" />
          <line x1="4" y1="22" x2="18" y2="36" stroke="#6ab547" />
          <line x1="22" y1="22" x2="36" y2="36" stroke="#6ab547" />
          <line x1="40" y1="22" x2="54" y2="36" stroke="#6ab547" />
          <line x1="58" y1="22" x2="72" y2="36" stroke="#6ab547" />
        </g>
      </>
    ),
  },
  {
    num: "03 / INDUSTRIAL",
    title: "Factories & farms",
    body: "250 kW to multi-MW installations for industrial loads. Grid-tied, off-grid or hybrid configurations.",
    bullets: ["MV/LV substation interfacing", "SCADA + remote monitoring", "Performance-guaranteed contracts", "Energy storage integration"],
    icon: (
      <>
        <path d="M4 70 L4 50 L20 50 L20 38 L36 50 L36 38 L52 50 L52 38 L72 50 L72 70 Z" />
        <rect x="10" y="58" width="6" height="12" fill="#6ab547" opacity="0.2" />
        <rect x="26" y="58" width="6" height="12" fill="#6ab547" opacity="0.2" />
        <rect x="42" y="58" width="6" height="12" fill="#6ab547" opacity="0.2" />
        <g transform="translate(2 22)">
          <rect x="0" y="0" width="32" height="12" fill="#1f3a5f" />
          <line x1="8" y1="0" x2="8" y2="12" stroke="#4ab0d9" />
          <line x1="16" y1="0" x2="16" y2="12" stroke="#4ab0d9" />
          <line x1="24" y1="0" x2="24" y2="12" stroke="#4ab0d9" />
        </g>
        <circle cx="64" cy="14" r="6" fill="#fbe6a8" />
      </>
    ),
  },
];

const STEPS = [
  { num: "01", title: "Site audit & design", body: "We measure your roof, audit your last 12 months of bills, and produce a 3D system design with projected output, savings and payback. Free, no obligation." },
  { num: "02", title: "Install in 2-5 days", body: "Our own crew handles structural fixing, DC and AC wiring, inverter setup and net-metering paperwork. Most homes are powered up within a week of go-ahead." },
  { num: "03", title: "Monitor & maintain", body: "You see live output on your phone. We watch every system 24/7 — anomalies trigger an automatic site visit before you notice anything's off." },
];

const PROJECTS = [
  {
    area: "big",
    title: "Riverside Warehouse — 320 kWp rooftop array",
    subtitle: "2025 · COMMERCIAL · 2.1 MWh/MONTH",
    kw: "320kW",
    icon: (
      <svg viewBox="0 0 200 140" fill="none" stroke="#6ab547" strokeWidth="1.5">
        <rect x="20" y="60" width="160" height="60" fill="#e3f0f7" stroke="#1f3a5f" />
        <g transform="translate(30 30)">
          <rect width="140" height="36" fill="#1f3a5f" />
          <line x1="0" y1="9" x2="140" y2="9" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="0" y1="18" x2="140" y2="18" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="0" y1="27" x2="140" y2="27" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="28" y1="0" x2="28" y2="36" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="56" y1="0" x2="56" y2="36" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="84" y1="0" x2="84" y2="36" stroke="#4ab0d9" strokeWidth="0.8" />
          <line x1="112" y1="0" x2="112" y2="36" stroke="#4ab0d9" strokeWidth="0.8" />
        </g>
        <circle cx="170" cy="20" r="10" fill="#fbe6a8" stroke="none" />
      </svg>
    ),
  },
  {
    area: "a",
    title: "Hillcrest Villa",
    subtitle: "8.4 kWp · RESIDENTIAL",
    icon: (
      <svg viewBox="0 0 100 80">
        <rect x="20" y="30" width="60" height="40" fill="none" stroke="#1f3a5f" />
        <rect x="25" y="14" width="50" height="20" fill="#1f3a5f" />
      </svg>
    ),
  },
  {
    area: "b",
    title: "Bayside Logistics",
    subtitle: "180 kWp · INDUSTRIAL",
    icon: (
      <svg viewBox="0 0 100 80">
        <rect x="10" y="40" width="80" height="30" fill="none" stroke="#1f3a5f" />
        <rect x="15" y="22" width="70" height="16" fill="#1f3a5f" />
      </svg>
    ),
  },
  {
    area: "c",
    title: "Anza Solar Farm",
    subtitle: "1.2 MWp · UTILITY",
    icon: (
      <svg viewBox="0 0 100 80">
        <circle cx="50" cy="40" r="20" fill="none" stroke="#1f3a5f" />
        <circle cx="50" cy="40" r="10" fill="#6ab547" />
      </svg>
    ),
  },
  {
    area: "d",
    title: "Mercury Schoolhouse",
    subtitle: "42 kWp · COMMUNITY",
    icon: (
      <svg viewBox="0 0 100 80">
        <rect x="22" y="32" width="56" height="36" fill="#1f3a5f" />
        <line x1="22" y1="44" x2="78" y2="44" stroke="#4ab0d9" />
        <line x1="22" y1="56" x2="78" y2="56" stroke="#4ab0d9" />
      </svg>
    ),
  },
];

export default function PowerSolutionsPage() {
  const [sent, setSent] = useState(false);
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "power");

  return (
    <>
      <Seo
        title="Energica Power Solutions — Solar systems for homes, businesses & industry"
        description="Design, supply, install and maintain solar PV systems for homes, businesses and industrial sites — 25-year panel warranty, 10-year workmanship, 48 MW installed to date."
        path="/power-solutions"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="power" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className="reveal">
                <span className={styles.heroTag}>
                  <span className={styles.dot} /> Energica Power Solutions
                </span>
                <h1>
                  Sunlight, <em>engineered</em>
                  <br />
                  for your roof.
                </h1>
                <p className={styles.heroSub}>
                  Design, supply, install and maintain solar PV systems for homes, businesses and industrial sites.
                  Real engineering, real warranties, real payback.
                </p>
                <div className={styles.heroRow}>
                  <a href="#quote" className="btn btn-primary">Get a free quote</a>
                  <a href="#services" className="btn btn-ghost btn-arrow">
                    See what we install
                    <ArrowIcon />
                  </a>
                </div>
                <div className={styles.heroQuick}>
                  <div><div className={styles.v}>25 yr</div><div className={styles.l}>Panel warranty</div></div>
                  <div><div className={styles.v}>10 yr</div><div className={styles.l}>Workmanship</div></div>
                  <div><div className={styles.v}>3-5 yr</div><div className={styles.l}>Typical payback</div></div>
                  <div><div className={styles.v}>48 MW</div><div className={styles.l}>Installed to date</div></div>
                </div>
              </div>

              <div className={`${styles.heroIllo} reveal`} data-delay="1" aria-hidden="true">
                <svg viewBox="0 0 480 460">
                  <circle cx="380" cy="90" r="40" fill="#fbe6a8" />
                  <circle cx="380" cy="90" r="50" fill="none" stroke="#fbe6a8" strokeWidth="1" opacity="0.6" />
                  <circle cx="380" cy="90" r="62" fill="none" stroke="#fbe6a8" strokeWidth="1" opacity="0.3" />
                  <line x1="0" y1="400" x2="480" y2="400" stroke="#c8d6b8" strokeWidth="1" />
                  <g>
                    <path d="M80 400 L80 280 L200 200 L320 280 L320 400 Z" fill="#ffffff" stroke="#1f3a5f" strokeWidth="1.5" />
                    <path d="M80 280 L200 200 L320 280 Z" fill="#1f3a5f" />
                    <g transform="translate(110 220) rotate(-33.7)">
                      <rect x="0" y="0" width="140" height="70" fill="#1d3163" stroke="#4ab0d9" strokeWidth="1.2" />
                      <line x1="0" y1="17.5" x2="140" y2="17.5" stroke="#4ab0d9" strokeWidth="0.8" />
                      <line x1="0" y1="35" x2="140" y2="35" stroke="#4ab0d9" strokeWidth="0.8" />
                      <line x1="0" y1="52.5" x2="140" y2="52.5" stroke="#4ab0d9" strokeWidth="0.8" />
                      <line x1="35" y1="0" x2="35" y2="70" stroke="#4ab0d9" strokeWidth="0.8" />
                      <line x1="70" y1="0" x2="70" y2="70" stroke="#4ab0d9" strokeWidth="0.8" />
                      <line x1="105" y1="0" x2="105" y2="70" stroke="#4ab0d9" strokeWidth="0.8" />
                    </g>
                    <rect x="180" y="340" width="40" height="60" fill="#6ab547" />
                    <rect x="110" y="320" width="40" height="40" fill="#e3f0f7" stroke="#1f3a5f" />
                    <rect x="250" y="320" width="40" height="40" fill="#e3f0f7" stroke="#1f3a5f" />
                  </g>
                  <g stroke="#6ab547" strokeWidth="1.5" fill="none" opacity="0.7">
                    <path d="M340 130 Q360 110 380 130" />
                    <path d="M335 145 Q360 115 385 145" />
                    <path d="M330 160 Q360 120 390 160" />
                  </g>
                  <g transform="translate(380 320)">
                    <rect x="-4" y="40" width="8" height="40" fill="#1f3a5f" />
                    <circle cx="0" cy="30" r="38" fill="#6ab547" />
                    <circle cx="-20" cy="15" r="22" fill="#6ab547" />
                    <circle cx="20" cy="20" r="20" fill="#7cc55a" />
                  </g>
                  <g stroke="#4ab0d9" strokeWidth="2" fill="none">
                    <path d="M250 290 L250 380" strokeDasharray="4 4" />
                    <polygon points="245,375 250,385 255,375" fill="#4ab0d9" stroke="none" />
                  </g>
                  <g transform="translate(420 360)">
                    <circle r="22" fill="#6ab547" />
                    <path d="M-4 -8 L4 -2 L-2 -2 L4 8 L-4 2 L2 2 Z" fill="white" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">What we install</span>
                <h2>Three system classes. One delivery standard.</h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                Sized correctly, designed in 3D, signed off by a certified engineer, installed by our own crew. No
                subcontractor surprises.
              </p>
            </div>
            <div className={styles.servicesGrid}>
              {SERVICES.map((s, i) => (
                <div className={`${styles.svcCard} reveal`} data-delay={i + 1} key={s.num}>
                  <div className={styles.svcIllo}>
                    <svg viewBox="0 0 80 80" fill="none" stroke="#6ab547" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </div>
                  <div className={styles.svcNum}>{s.num}</div>
                  <h3>{s.title}</h3>
                  <p>{s.body}</p>
                  <ul className={styles.svcList}>
                    {s.bullets.map((b) => <li key={b}>{b}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className={`${styles.how} section`}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">How it works</span>
                <h2>From your first email to your first kilowatt — three honest steps.</h2>
              </div>
            </div>
            <div className={styles.steps}>
              {STEPS.map((s, i) => (
                <div className={`${styles.step} reveal`} data-delay={i + 1} key={s.num}>
                  <div className={styles.stepNum}>{s.num}</div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section className="section">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Recent installs</span>
                <h2>A few systems we've put into the ground (and onto roofs).</h2>
              </div>
              <a href="#" className="btn btn-ghost btn-arrow">
                All 800+ projects
                <ArrowIcon />
              </a>
            </div>

            <div className={styles.gallery}>
              {PROJECTS.map((p, i) => (
                <div className={`${styles.proj} ${styles[p.area]} reveal`} data-delay={i > 0 ? i : undefined} key={p.title}>
                  <div className={styles.projBg}>{p.icon}</div>
                  <div className={styles.projMeta}>
                    <div className={styles.t}>{p.title}</div>
                    <div className={styles.s}>{p.subtitle}</div>
                    {p.kw && <div className={styles.kw}>{p.kw}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* QUOTE */}
        <section className="section" id="quote">
          <div className="container">
            <div className={`${styles.quote} reveal`}>
              <div>
                <span className="eyebrow">Free quote</span>
                <h2 style={{ marginTop: 16 }}>See your roof's solar potential in 24 hours.</h2>
                <p>
                  Drop your details — we'll send you a 1-page concept design with projected output, savings and a
                  fixed-price install quote. No pressure, no obligation.
                </p>
              </div>
              <form
                className={styles.quoteForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <div className="row">
                  <div>
                    <label>Name</label>
                    <input required placeholder="Jordan" />
                  </div>
                  <div>
                    <label>Phone</label>
                    <input required placeholder="+1 ..." />
                  </div>
                </div>
                <label>Email</label>
                <input type="email" required placeholder="you@home.com" />
                <label>System type</label>
                <select>
                  <option>Home solar</option>
                  <option>Commercial / business</option>
                  <option>Industrial / factory</option>
                </select>
                <label>Approximate monthly bill</label>
                <select>
                  <option>Under $200</option>
                  <option>$200 – $600</option>
                  <option>$600 – $2,000</option>
                  <option>Over $2,000</option>
                </select>
                <button className="btn btn-primary" type="submit" disabled={sent}>
                  {sent ? "Sent — we will be in touch" : "Send me a quote"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="power" />
      </div>
    </>
  );
}
