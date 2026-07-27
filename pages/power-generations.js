import { Fragment } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/power-generations.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const FLOW_NODES = [
  {
    num: "SOURCE / 01",
    title: "Solar generation",
    body: "Site-installed PV array sized to cover ~70% of average daytime load. Clean energy, near-zero marginal cost.",
    linejoin: false,
    icon: <><circle cx="12" cy="12" r="4" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1" /></>,
  },
  {
    num: "CONTROLLER / 02",
    title: "Hybrid controller",
    body: "Switches sources in milliseconds based on load, weather and fuel cost. Stores surplus to battery, dispatches genset only when needed.",
    linejoin: true,
    icon: <><rect x="3" y="6" width="18" height="14" rx="2" /><line x1="3" y1="11" x2="21" y2="11" /><circle cx="8" cy="16" r="1.5" /><circle cx="13" cy="16" r="1.5" /></>,
  },
  {
    num: "BILLED / 03",
    title: "Pay per kWh",
    body: "Smart meter logs every kWh consumed. Monthly bill shows hour-by-hour usage. No capex, no maintenance, no fuel logistics.",
    linejoin: true,
    icon: <path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />,
  },
];

const INDUSTRIES = [
  { title: "Mining & quarrying", body: "Remote sites with diesel-dependent loads. Solar offsets 60-80% of fuel burn.", stat: "100kW – 5MW", icon: <path d="M3 21h18M5 21V9l7-4 7 4v12" /> },
  { title: "Manufacturing", body: "Continuous-process plants needing predictable kWh costs. Locked-in tariff for a decade.", stat: "200kW – 10MW", icon: <path d="M2 22h20M3 22V8l4-3 4 3v14M11 22V12l4-3 6 3v10M7 14v1M7 18v1M15 14v1M15 18v1" /> },
  { title: "Data & telecom", body: "Cell towers and edge data sites. 99.5%+ SLA, sub-second failover.", stat: "10kW – 500kW", icon: <><rect x="2" y="6" width="20" height="12" rx="1" /><line x1="6" y1="10" x2="6" y2="14" /><line x1="10" y1="10" x2="10" y2="14" /><line x1="14" y1="10" x2="14" y2="14" /><line x1="18" y1="10" x2="18" y2="14" /></> },
  { title: "Agriculture", body: "Pumping stations, cold storage, processing sheds. Reliable rural power.", stat: "20kW – 1MW", icon: <><path d="M3 9l9-6 9 6v12H3z" /><rect x="9" y="14" width="6" height="7" /></> },
  { title: "Industrial parks", body: "Shared hybrid plant serving multiple tenants on a single campus.", stat: "500kW – 20MW", icon: <><rect x="3" y="3" width="18" height="18" rx="2" /><rect x="7" y="7" width="4" height="4" /><rect x="13" y="7" width="4" height="4" /><rect x="7" y="13" width="4" height="4" /><rect x="13" y="13" width="4" height="4" /></> },
  { title: "Healthcare & critical", body: "Hospitals, clinics and emergency services. Triple-redundant power topology.", stat: "50kW – 2MW", icon: <path d="M12 2L4 6v6c0 5 4 9 8 10 4-1 8-5 8-10V6l-8-4z" /> },
];

export default function PowerGenerationsPage() {
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "gen");

  return (
    <>
      <Seo
        title="Power Generations — Energy on demand, pay per watt"
        description="Hybrid solar-generator systems deployed on-site at scale. We own and operate the hardware — you pay only for the kWh you actually consume, typically 25-50% below diesel-only rates."
        path="/power-generations"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="gen" />
      <main>
        {/* HERO */}
        <section className={styles.hero}>
          <div className={styles.heroBg} aria-hidden="true">
            <div className={styles.grid} />
          </div>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className="reveal">
                <span className={styles.heroTag}>Power Generations · Hybrid energy on demand</span>
                <h1>
                  Energy on demand.
                  <br />
                  <span className={styles.glow}>Pay per watt.</span>
                </h1>
                <p className={styles.heroSub}>
                  Hybrid solar-generator systems deployed on-site at scale. We own and operate the hardware. You pay
                  only for what you actually consume — by the watt, by the hour, by the month.
                </p>
                <div className={styles.heroRow}>
                  <a href="#pricing" className="btn btn-primary" style={{ background: "var(--brand)" }}>See pricing model</a>
                  <a href="#how" className="btn btn-ghost btn-arrow">
                    How the hybrid works
                    <ArrowIcon />
                  </a>
                </div>
              </div>

              <div className={`${styles.hybridVis} reveal`} data-delay="1" aria-hidden="true">
                <svg viewBox="0 0 400 400">
                  <g fill="none" stroke="rgba(192,132,252,0.15)" strokeWidth="1">
                    <circle cx="200" cy="200" r="60" />
                    <circle cx="200" cy="200" r="110" />
                    <circle cx="200" cy="200" r="160" />
                  </g>
                  <circle cx="200" cy="200" r="48" fill="#7c3aed" opacity="0.9" />
                  <circle cx="200" cy="200" r="36" fill="#5b21b6" stroke="#c084fc" strokeWidth="1.5" />
                  <text x="200" y="196" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="white" letterSpacing="2">HYBRID</text>
                  <text x="200" y="212" textAnchor="middle" fontFamily="Geist Mono" fontSize="11" fill="white" letterSpacing="2">CORE</text>

                  <g transform="translate(80 80)">
                    <circle r="32" fill="#110d24" stroke="#c084fc" strokeWidth="1.5" />
                    <g stroke="#c084fc" strokeWidth="1.2" fill="none" transform="translate(-14 -10)">
                      <rect width="28" height="20" fill="#7c3aed" opacity="0.4" />
                      <line x1="0" y1="5" x2="28" y2="5" />
                      <line x1="0" y1="10" x2="28" y2="10" />
                      <line x1="0" y1="15" x2="28" y2="15" />
                      <line x1="7" y1="0" x2="7" y2="20" />
                      <line x1="14" y1="0" x2="14" y2="20" />
                      <line x1="21" y1="0" x2="21" y2="20" />
                    </g>
                    <text y="42" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#c084fc" letterSpacing="1.5">SOLAR</text>
                  </g>

                  <g transform="translate(320 80)">
                    <circle r="32" fill="#110d24" stroke="#c084fc" strokeWidth="1.5" />
                    <g stroke="#c084fc" strokeWidth="1.5" fill="none" strokeLinejoin="round" transform="translate(-12 -12)">
                      <rect width="24" height="20" fill="#7c3aed" opacity="0.3" />
                      <line x1="4" y1="6" x2="20" y2="6" />
                      <line x1="6" y1="20" x2="6" y2="24" />
                      <line x1="18" y1="20" x2="18" y2="24" />
                    </g>
                    <text y="42" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#c084fc" letterSpacing="1.5">GENSET</text>
                  </g>

                  <g transform="translate(80 320)">
                    <circle r="32" fill="#110d24" stroke="#c084fc" strokeWidth="1.5" />
                    <g stroke="#c084fc" strokeWidth="1.5" fill="none" transform="translate(-12 -10)">
                      <rect x="2" y="0" width="20" height="20" rx="2" fill="#7c3aed" opacity="0.3" />
                      <rect x="8" y="-3" width="8" height="3" />
                      <line x1="6" y1="10" x2="10" y2="10" />
                      <line x1="14" y1="10" x2="18" y2="10" />
                      <line x1="16" y1="8" x2="16" y2="12" />
                    </g>
                    <text y="42" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#c084fc" letterSpacing="1.5">STORAGE</text>
                  </g>

                  <g transform="translate(320 320)">
                    <circle r="32" fill="#110d24" stroke="#c084fc" strokeWidth="1.5" />
                    <g stroke="#c084fc" strokeWidth="1.5" fill="none" strokeLinejoin="round" transform="translate(-12 -12)">
                      <path d="M0 24 L0 8 L12 0 L24 8 L24 24 Z" fill="#7c3aed" opacity="0.3" />
                      <rect x="10" y="14" width="6" height="10" />
                    </g>
                    <text y="42" textAnchor="middle" fontFamily="Geist Mono" fontSize="9" fill="#c084fc" letterSpacing="1.5">SITE</text>
                  </g>

                  <g stroke="#c084fc" strokeWidth="1.5" fill="none">
                    <line x1="105" y1="105" x2="170" y2="170" className={styles.flowLine} />
                    <line x1="295" y1="105" x2="230" y2="170" className={styles.flowLine} />
                    <line x1="105" y1="295" x2="170" y2="230" className={styles.flowLine} />
                    <line x1="295" y1="295" x2="230" y2="230" className={styles.flowLine} />
                  </g>
                  <circle cx="160" cy="160" r="3" fill="#c084fc" className={styles.pulseDot} />
                  <circle cx="240" cy="160" r="3" fill="#c084fc" className={styles.pulseDot} style={{ animationDelay: "0.35s" }} />
                  <circle cx="160" cy="240" r="3" fill="#c084fc" className={styles.pulseDot} style={{ animationDelay: "0.7s" }} />
                  <circle cx="240" cy="240" r="3" fill="#c084fc" className={styles.pulseDot} style={{ animationDelay: "1.05s" }} />
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section className={`${styles.how} section`} id="how">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow" style={{ color: "var(--accent)" }}>How it works</span>
                <h2>Solar by day, generator by night, battery when it matters.</h2>
              </div>
              <p style={{ maxWidth: 380 }}>
                Our controller stitches three power sources into one uninterrupted supply — and bills your site only
                for the kWh that actually crossed the meter.
              </p>
            </div>

            <div className={styles.flow}>
              {FLOW_NODES.map((n, i) => (
                <Fragment key={n.num}>
                  <div className={`${styles.node} reveal`} data-delay={i + 1}>
                    <div className={styles.num}>{n.num}</div>
                    <div className={styles.ico}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin={n.linejoin ? "round" : undefined}>
                        {n.icon}
                      </svg>
                    </div>
                    <h3>{n.title}</h3>
                    <p>{n.body}</p>
                  </div>
                  {i < FLOW_NODES.length - 1 && (
                    <div className={styles.arrow}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </div>
                  )}
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* PRICING */}
        <section className={styles.pricingWrap} id="pricing">
          <div className="container">
            <div className={`${styles.pricingCard} reveal`}>
              <div>
                <span className="eyebrow" style={{ color: "var(--accent)" }}>Pricing model</span>
                <h2 style={{ marginTop: 16 }}>
                  No upfront cost.
                  <br />
                  Just energy, measured.
                </h2>
                <p style={{ marginTop: 20, fontSize: 16 }}>
                  We install, own, monitor and maintain the entire generation stack. You pay a single all-inclusive
                  rate per kilowatt-hour delivered to your bus-bar — typically 25-50% lower than diesel-only, with no
                  exposure to fuel-price volatility.
                </p>

                <ul className={styles.priceFeatures}>
                  <li>Zero capex — we finance and own all equipment</li>
                  <li>Single tariff covers hardware, fuel, maintenance, monitoring</li>
                  <li>Fixed price for the contract term — 5, 10 or 15 years</li>
                  <li>SLA-backed availability ≥ 99.5%</li>
                  <li>Site dashboard with hour-by-hour kWh breakdown</li>
                </ul>
              </div>

              <div className={`${styles.meter} reveal`} data-delay="1">
                <div className={styles.label}>// LIVE — SAMPLE SITE</div>
                <div className={styles.big}>0.18<span className={styles.unit}>/ kWh</span></div>
                <div className={styles.sub}>Blended hybrid rate (typical industrial)</div>

                <div className={styles.meterBar} />
                <div className={styles.meterRow}>
                  <span>SOLAR · 68%</span>
                  <span>BATTERY · 22%</span>
                  <span>GENSET · 10%</span>
                </div>

                <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid var(--line)", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
                  <div>
                    <div className={styles.label}>PEAK LOAD</div>
                    <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 22, color: "white", marginTop: 4 }}>412 kW</div>
                  </div>
                  <div>
                    <div className={styles.label}>UPTIME · 90 DAYS</div>
                    <div style={{ fontFamily: "'Geist Mono',monospace", fontSize: 22, color: "#86efac", marginTop: 4 }}>99.94%</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* INDUSTRIES */}
        <section className="section">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow" style={{ color: "var(--accent)" }}>Industries served</span>
                <h2>Built for sites that can't afford to stop.</h2>
              </div>
            </div>

            <div className={`${styles.industries} reveal`} data-delay="1">
              {INDUSTRIES.map((ind) => (
                <div className={styles.ind} key={ind.title}>
                  <svg className={styles.ico} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                    {ind.icon}
                  </svg>
                  <h4>{ind.title}</h4>
                  <p>{ind.body}</p>
                  <div className={styles.stat}>{ind.stat}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section">
          <div className="container">
            <div className={`${styles.genCta} reveal`}>
              <h2>Get a custom kWh tariff for your site.</h2>
              <p>
                Send us your last 12 months of energy data — or a guess. We'll model a hybrid configuration and quote
                a fixed kWh rate within 5 business days.
              </p>
              <div className={styles.btnRow}>
                <a href="/#contact" className="btn" style={{ background: "white", color: "var(--brand)" }}>Request a tariff quote</a>
                <a href="#how" className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}>See how it works</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer pageId="gen" />
      </div>
    </>
  );
}
