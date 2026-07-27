import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { holdingOrganizationJsonLd } from "../lib/jsonld";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/holding.module.css";

const PILLARS = [
  {
    icon: <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />,
    title: "Integrated capability",
    body: "Single point of accountability across energy, steel, build and ops.",
  },
  {
    icon: <path d="M22 12h-4l-3 9L9 3l-3 9H2" />,
    title: "Energy-first",
    body: "Solar, hybrid and on-demand power as the backbone of every project.",
  },
  {
    icon: <path d="M20 6L9 17l-5-5" />,
    title: "Built to last",
    body: "Industrial-grade execution measured in decades, not delivery dates.",
  },
];

const COMPANIES = [
  { href: "/power-solutions", co: "#6ab547", mark: "P", num: "01 / SOLAR", name: "Energica Power Solutions", desc: "Turn-key solar systems for homes, commercial buildings and industrial facilities — design, install, maintain." },
  { href: "/steel", co: "#1f3a5f", mark: "S", num: "02 / STEEL", name: "Energica Steel", desc: "Industrial steel structures, frames and custom fabrication for warehouses, factories and infrastructure." },
  { href: "/power-generations", co: "#7c3aed", mark: "G", num: "03 / HYBRID", name: "Power Generations", desc: "Hybrid solar-generator systems. Pay-per-watt energy delivery for sites that need uninterrupted power." },
  { href: "/constructions", co: "#2c7fb5", mark: "C", num: "04 / BUILD", name: "Energica Constructions", desc: "Architectural-led building and construction — concept through commissioning, with full project ownership." },
  { href: "/facilities", co: "#1d4080", mark: "F", num: "05 / OPERATE", name: "Energica Facilities", desc: "Facilities management with measurable SLAs. We keep the lights, climate, security and assets running." },
  { href: "/store", co: "#4caf50", mark: "T", num: "06 / RETAIL", name: "Energica Store", desc: "Solar panels, batteries, inverters, generators and electrical accessories — sourced and stocked." },
];

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

export default function HoldingPage() {
  const [sent, setSent] = useState(false);
  useRevealAndCounters([]);

  return (
    <>
      <Seo
        title="Energica Holding — Powering the Future, Building the Present"
        description="Energica Holding is an integrated energy and infrastructure group of 6 operating companies — solar, hybrid generation, steel, construction, facilities management and electrical retail."
        path="/"
        jsonLd={holdingOrganizationJsonLd()}
      />
      <div className={styles.theme}>
      <Nav pageId="holding" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.gridLines} />
            <div className={styles.ring} />
            <div className={styles.diamond} />
            <div className={`${styles.bar} ${styles.b1}`} />
            <div className={`${styles.bar} ${styles.b2}`} />
            <div className={`${styles.bar} ${styles.b3}`} />
          </div>

          <div className="container" style={{ position: "relative", zIndex: 1 }}>
            <span className={styles.heroTag}>
              <span className={styles.dot} /> EST. 2009 · A GROUP OF 6 OPERATING COMPANIES
            </span>
            <h1>
              Powering the future,
              <br />
              <span className={styles.accent}>building the present.</span>
            </h1>
            <p className={styles.heroSub}>
              Energica Holding is an integrated energy and infrastructure group operating across solar, hybrid
              generation, steel, construction, facilities management and electrical retail — six specialised
              companies, one shared mission.
            </p>
            <div className={styles.heroRow}>
              <a href="#companies" className="btn btn-accent">
                Explore the group
                <ArrowIcon />
              </a>
              <a href="#contact" className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.25)" }}>
                Contact leadership
              </a>
            </div>

            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <div className={styles.v}><span data-count="800">0</span><span data-suffix="+" /></div>
                <div className={styles.l}>Projects delivered</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.v}><span data-count="1200">0</span><span data-suffix="+" /></div>
                <div className={styles.l}>Sites powered</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.v}><span data-count="6">0</span></div>
                <div className={styles.l}>Operating companies</div>
              </div>
              <div className={styles.heroStat}>
                <div className={styles.v}><span data-count="17">0</span></div>
                <div className={styles.l}>Years of experience</div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT */}
        <section className="section" id="about">
          <div className="container">
            <div className={styles.about}>
              <aside className={`${styles.aboutSide} reveal`}>
                <div className={styles.mark}>// About the group</div>
                <div className={styles.num}>06</div>
                <div className={styles.label}>Companies operating under one holding</div>
              </aside>
              <div className={`${styles.aboutBody} reveal`} data-delay="1">
                <span className="eyebrow">Our story</span>
                <h2 style={{ margin: "16px 0 28px" }}>
                  One group, six disciplines, an end-to-end engine for energy and infrastructure.
                </h2>
                <p>
                  Energica Holding was founded to bring together everything required to deliver modern energy and
                  built-environment projects under a single roof. From the panel on a rooftop to the steel that
                  supports a factory and the team that maintains it afterwards — every layer is owned, operated and
                  quality-controlled by us.
                </p>
                <p>
                  Our six subsidiaries are independent operating brands with deep specialism, deliberately structured
                  so clients can engage one or all of them depending on the scope. Together they form a
                  vertically-integrated platform for projects that would otherwise involve a dozen contracts and a
                  dozen risks.
                </p>

                <div className={styles.aboutPillars}>
                  {PILLARS.map((p) => (
                    <div className={styles.aboutPillar} key={p.title}>
                      <svg className={styles.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                        {p.icon}
                      </svg>
                      <h4>{p.title}</h4>
                      <p>{p.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* COMPANIES */}
        <section className="section" id="companies" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Our companies</span>
                <h2>
                  Six specialised companies. <br />
                  One operating standard.
                </h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                Each company runs independently with its own brand, leadership and clients — but shares Energica's
                engineering, safety and quality systems.
              </p>
            </div>

            <div className={styles.companiesGrid}>
              {COMPANIES.map((c, i) => (
                <a className={`${styles.coCard} reveal`} data-delay={(i % 3) + 1} href={c.href} style={{ "--co": c.co }} key={c.href}>
                  <div className={styles.coRow}>
                    <div className={styles.coMark}>{c.mark}</div>
                    <div className={styles.coNum}>{c.num}</div>
                  </div>
                  <h3 className={styles.coName}>{c.name}</h3>
                  <p className={styles.coDesc}>{c.desc}</p>
                  <span className={styles.coVisit}>
                    Visit company
                    <ArrowIcon />
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT */}
        <section className={styles.impact} id="numbers">
          <div className={styles.impactBg} aria-hidden="true">
            <div className={styles.ring} />
            <div className={`${styles.ring} ${styles.r2}`} />
            <div className={`${styles.ring} ${styles.r3}`} />
          </div>
          <div className="container" style={{ position: "relative" }}>
            <div style={{ maxWidth: 640 }}>
              <span className="eyebrow">By the numbers</span>
              <h2 style={{ marginTop: 16 }}>17 years of compounded delivery, in numbers.</h2>
              <p style={{ marginTop: 16 }}>
                A snapshot of what Energica's six companies have delivered together since 2009 — in projects, energy
                and footprint.
              </p>
            </div>

            <div className={styles.impactGrid}>
              <div className={`${styles.impactStat} reveal`}>
                <div className={styles.v}><span data-count="800">0</span><span className={styles.plus}>+</span></div>
                <div className={styles.l}>Projects completed</div>
              </div>
              <div className={`${styles.impactStat} reveal`} data-delay="1">
                <div className={styles.v}><span data-count="1200">0</span><span className={styles.plus}>+</span></div>
                <div className={styles.l}>Sites supplied with energy</div>
              </div>
              <div className={`${styles.impactStat} reveal`} data-delay="2">
                <div className={styles.v}><span data-count="48">0</span> <span style={{ fontSize: "0.5em", color: "rgba(255,255,255,0.5)" }}>MW</span></div>
                <div className={styles.l}>Installed solar capacity</div>
              </div>
              <div className={`${styles.impactStat} reveal`} data-delay="3">
                <div className={styles.v}><span data-count="17">0</span></div>
                <div className={styles.l}>Years of operating history</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta} id="contact">
          <div className="container">
            <div className={`${styles.ctaCard} reveal`}>
              <div className="stack">
                <span className="eyebrow">Get in touch</span>
                <h2>Building something at the intersection of energy and infrastructure?</h2>
                <p style={{ fontSize: 16 }}>
                  Tell us about your project. We'll route you to the right company in the group — or coordinate
                  several of them if you need more than one.
                </p>
                <div className={styles.ctaRow}>
                  <span className="tag-num"><span className={styles.marker} />RESPONSE WITHIN 1 BUSINESS DAY</span>
                </div>
              </div>
              <form
                className={styles.ctaForm}
                onSubmit={(e) => {
                  e.preventDefault();
                  setSent(true);
                }}
              >
                <label htmlFor="cf-name">Your name</label>
                <input id="cf-name" required placeholder="Jordan Reyes" />
                <label htmlFor="cf-email">Work email</label>
                <input id="cf-email" type="email" required placeholder="you@company.com" />
                <label htmlFor="cf-co">Which capability?</label>
                <select id="cf-co">
                  <option>Not sure — help me route</option>
                  <option>Power Solutions (solar)</option>
                  <option>Steel (structures)</option>
                  <option>Power Generations (hybrid energy)</option>
                  <option>Constructions (build)</option>
                  <option>Facilities (operate)</option>
                  <option>Store (procurement)</option>
                </select>
                <button className="btn btn-primary" type="submit" style={{ marginTop: 6, justifyContent: "center" }}>
                  {sent ? "Sent — we'll be in touch" : "Send enquiry"}
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="holding" />
      </div>
    </>
  );
}
