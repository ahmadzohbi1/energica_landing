import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/facilities.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const TICKETS = [
  { pri: "p1", title: "HVAC — Block C chiller fault", meta: "P1 · TECH DISPATCHED", eta: "ETA 6m" },
  { pri: "p2", title: "Lighting — L4 east corridor", meta: "P2 · SCHEDULED", eta: "Today" },
  { pri: "p3", title: "Quarterly fire-system test", meta: "P3 · PLANNED PPM", eta: "Fri" },
];

const SERVICES = [
  { title: "HVAC & climate", body: "Chillers, AHUs, VRF, BMS tuning. Planned maintenance plus 24/7 breakdown response.", icon: <path d="M9.5 2a2.5 2.5 0 0 1 0 5H2M14 6a3 3 0 1 1 3 3H2M12.5 22a2.5 2.5 0 0 0 0-5H2" /> },
  { title: "Electrical systems", body: "LV/MV distribution, generators, UPS, lighting and emergency systems. Backed by Energica's energy teams.", icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" /> },
  { title: "Plumbing & drainage", body: "Water systems, pumps, drainage, Legionella control and statutory water testing.", icon: <path d="M3 12h4l3-9 4 18 3-9h4" /> },
  { title: "Security & access", body: "Manned guarding, CCTV, access control and alarm monitoring from a central operations room.", icon: <path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" /> },
  { title: "Cleaning & hygiene", body: "Daily janitorial, deep cleans, waste management and washroom services to audited standards.", icon: <path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6" /> },
  { title: "Asset & CAFM", body: "Full asset register, planned maintenance scheduling and a tenant portal for logging requests.", icon: <><rect x="3" y="4" width="18" height="16" rx="2" /><line x1="3" y1="10" x2="21" y2="10" /><line x1="9" y1="15" x2="15" y2="15" /></> },
];

const INDUSTRIES = [
  { label: "Commercial offices", icon: <><rect x="4" y="2" width="16" height="20" rx="2" /><line x1="9" y1="22" x2="9" y2="18" /><line x1="15" y1="22" x2="15" y2="18" /></> },
  { label: "Industrial & manufacturing", icon: <path d="M2 22h20M3 22V8l4-3 4 3v14M11 22V12l4-3 6 3v10" /> },
  { label: "Retail & malls", icon: <path d="M12 2L2 7l10 5 10-5-10-5z" /> },
  { label: "Healthcare", icon: <><path d="M3 9l9-6 9 6v12H3z" /><path d="M9 22V12h6v10" /></> },
  { label: "Education campuses", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" /></> },
  { label: "Logistics & warehousing", icon: <><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" /></> },
  { label: "Hospitality", icon: <><path d="M3 21h18M6 21V7l6-4 6 4v14" /><rect x="9" y="9" width="2" height="2" /><rect x="13" y="9" width="2" height="2" /></> },
  { label: "Solar & energy sites", icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3" /></> },
];

const SLA_STATS = [
  { v: "15", u: "min", l: "P1 emergency response, on-site teams" },
  { v: "99.5", u: "%", l: "Critical-asset uptime guarantee" },
  { v: "24/7", u: null, l: "Manned helpdesk & control room" },
  { v: "4", u: "hr", l: "P1 fault resolution target" },
];

export default function FacilitiesPage() {
  const [sent, setSent] = useState(false);
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "fac");

  return (
    <>
      <Seo
        title="Energica Facilities — Facilities management & maintenance"
        description="Integrated facilities management with measurable SLAs — HVAC, electrical, plumbing, security, cleaning and asset care from one team, backed by a 15-minute P1 emergency response guarantee."
        path="/facilities"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="fac" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className="reveal">
                <span className={styles.heroTag}>
                  <span className={styles.dot} /> Energica Facilities
                </span>
                <h1>
                  We keep your
                  <br />
                  building <em>running.</em>
                </h1>
                <p className={styles.heroSub}>
                  Integrated facilities management with measurable SLAs. HVAC, electrical, plumbing, security,
                  cleaning and asset care — one team, one dashboard, one number to call when something breaks.
                </p>
                <div className={styles.heroRow}>
                  <a href="#contact" className="btn btn-primary">Request an FM proposal</a>
                  <a href="#services" className="btn btn-ghost btn-arrow">
                    See all services
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              <div className={`${styles.opsPanel} reveal`} data-delay="1" aria-hidden="true">
                <div className={styles.opsHead}>
                  <span className={styles.t}>FM CONTROL · LIVE</span>
                  <span className={styles.live}><span className={styles.blip} />OPERATIONAL</span>
                </div>
                <div className={styles.opsBody}>
                  <div className={styles.opsStatRow}>
                    <div className={styles.opsStat}>
                      <div className={styles.l}>SLA compliance · 30d</div>
                      <div className={`${styles.v} ${styles.good}`}>99.2%</div>
                    </div>
                    <div className={styles.opsStat}>
                      <div className={styles.l}>Avg. response time</div>
                      <div className={styles.v}>11<span style={{ fontSize: "0.5em", color: "var(--fg-mute)" }}> min</span></div>
                    </div>
                  </div>
                  {TICKETS.map((t) => (
                    <div className={styles.ticket} key={t.title}>
                      <div className={`${styles.pri} ${styles[t.pri]}`} />
                      <div className={styles.desc}>
                        <div className={styles.t2}>{t.title}</div>
                        <div className={styles.s2}>{t.meta}</div>
                      </div>
                      <div className={styles.eta}>{t.eta}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES */}
        <section className="section" id="services">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Services</span>
                <h2>Everything that keeps a building alive.</h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                Hard FM, soft FM and everything in between — delivered by directly-employed technicians, not a
                rotating cast of subcontractors.
              </p>
            </div>

            <div className={styles.svcGrid}>
              {SERVICES.map((s, i) => (
                <div className={`${styles.svcCard} reveal`} data-delay={(i % 3) + 1} key={s.title}>
                  <div className={styles.ico}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                      {s.icon}
                    </svg>
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Industries served</span>
                <h2>Wherever uptime matters.</h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                We manage single buildings and multi-site portfolios across these sectors with tailored SLAs.
              </p>
            </div>

            <div className={`${styles.indStrip} reveal`} data-delay="1">
              {INDUSTRIES.map((ind) => (
                <span className={styles.indChip} key={ind.label}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{ind.icon}</svg>
                  {ind.label}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* SLA */}
        <section className={styles.sla}>
          <div className="container" style={{ position: "relative" }}>
            <div style={{ maxWidth: 640 }}>
              <span className="eyebrow">Service levels</span>
              <h2 style={{ marginTop: 16 }}>Promises with numbers attached.</h2>
              <p style={{ marginTop: 16 }}>
                We don't do vague. Every contract carries response and resolution targets, and we report against them
                every month — with penalties if we miss.
              </p>
            </div>

            <div className={styles.slaGrid}>
              {SLA_STATS.map((s, i) => (
                <div className={`${styles.slaStat} reveal`} data-delay={i || undefined} key={s.l}>
                  <div className={styles.v}>{s.v}{s.u && <span className={styles.u}>{s.u}</span>}</div>
                  <div className={styles.l}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT */}
        <section className="section" id="contact">
          <div className="container">
            <div className={`${styles.contact} reveal`}>
              <div>
                <span className="eyebrow">Get a proposal</span>
                <h2 style={{ marginTop: 16 }}>Tell us about your building. We'll build the SLA around it.</h2>
                <p style={{ marginTop: 18, fontSize: 15 }}>
                  Share your portfolio size and current pain points — we'll respond with a scoped FM proposal and
                  indicative response times.
                </p>
              </div>
              <form
                className={styles.contactForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label>Organisation</label>
                <input required placeholder="Acme Property Group" />
                <label>Work email</label>
                <input type="email" required placeholder="you@company.com" />
                <label>Portfolio size</label>
                <select>
                  <option>Single building</option>
                  <option>2 – 10 buildings</option>
                  <option>10 – 50 buildings</option>
                  <option>50+ buildings</option>
                </select>
                <label>Primary need</label>
                <select>
                  <option>Full integrated FM</option>
                  <option>Hard FM only (M&E)</option>
                  <option>Soft FM only (cleaning/security)</option>
                  <option>Reactive maintenance only</option>
                </select>
                <button className="btn btn-primary" type="submit" disabled={sent} style={{ marginTop: 6, justifyContent: "center" }}>
                  {sent ? "Sent — our FM team will respond" : "Request proposal"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="fac" />
      </div>
    </>
  );
}
