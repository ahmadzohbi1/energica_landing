import { useState } from "react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Seo from "../components/Seo";
import { subsidiaryOrganizationJsonLd } from "../lib/jsonld";
import { SUBS } from "../lib/routes";
import useRevealAndCounters from "../lib/useRevealAndCounters";
import styles from "../styles/pages/store.module.css";

const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

const CATEGORIES = [
  { title: "Solar panels", count: "120+ products", icon: <><rect x="3" y="4" width="18" height="14" rx="1" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="3" y1="13.5" x2="21" y2="13.5" /><line x1="9" y1="4" x2="9" y2="18" /><line x1="15" y1="4" x2="15" y2="18" /></> },
  { title: "Batteries & storage", count: "64 products", icon: <><rect x="5" y="4" width="14" height="18" rx="2" /><line x1="9" y1="1.5" x2="15" y2="1.5" strokeWidth="2.5" /><line x1="9" y1="11" x2="15" y2="11" /><line x1="12" y1="8" x2="12" y2="14" /></> },
  { title: "Inverters", count: "88 products", icon: <><rect x="3" y="6" width="18" height="12" rx="2" /><path d="M9 12l2 2 4-4" /></> },
  { title: "Generators", count: "42 products", icon: <><rect x="3" y="8" width="18" height="11" rx="2" /><path d="M7 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" /><line x1="8" y1="19" x2="8" y2="22" /><line x1="16" y1="19" x2="16" y2="22" /></> },
  { title: "Wiring & cable", count: "200+ products", icon: <path d="M4 4c4 0 4 4 8 4s4-4 8-4M4 12c4 0 4 4 8 4s4-4 8-4M4 20c4 0 4-4 8-4" /> },
  { title: "Electrical accessories", count: "300+ products", icon: <><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2" /></> },
];

const PRODUCTS = [
  {
    id: "solara-450w",
    pill: "BESTSELLER",
    brand: "SOLARA",
    name: "450W Mono PERC Panel",
    spec: "Tier-1 monocrystalline · 21.4% efficiency · 25yr warranty",
    price: "$189",
    unit: "/ ea",
    icon: (
      <svg viewBox="0 0 100 100" fill="#1a3a5c" stroke="#4caf50" strokeWidth="1">
        <rect x="20" y="14" width="60" height="72" rx="3" />
        <g fill="#234d76">
          <rect x="26" y="20" width="22" height="20" /><rect x="52" y="20" width="22" height="20" />
          <rect x="26" y="44" width="22" height="20" /><rect x="52" y="44" width="22" height="20" />
          <rect x="26" y="68" width="22" height="14" /><rect x="52" y="68" width="22" height="14" />
        </g>
      </svg>
    ),
  },
  {
    id: "voltcore-5.1kwh",
    pill: "IN STOCK",
    stockPill: true,
    brand: "VOLTCORE",
    name: "5.1kWh LiFePO₄ Battery",
    spec: "48V rack-mount · 6000 cycles · BMS included",
    price: "$1,290",
    unit: null,
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#2d8a36" strokeWidth="1.5">
        <rect x="28" y="16" width="44" height="68" rx="4" fill="#eef7ec" />
        <rect x="40" y="10" width="20" height="8" rx="2" fill="#4caf50" />
        <line x1="38" y1="50" x2="62" y2="50" />
        <line x1="50" y1="40" x2="50" y2="60" />
        <text x="50" y="78" fontFamily="monospace" fontSize="9" fill="#2d8a36" textAnchor="middle">5kWh</text>
      </svg>
    ),
  },
  {
    id: "heliotek-5kw",
    pill: "IN STOCK",
    stockPill: true,
    brand: "HELIOTEK",
    name: "5kW Hybrid Inverter",
    spec: "Single-phase · MPPT dual · WiFi monitoring",
    price: "$940",
    unit: null,
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#2d8a36" strokeWidth="1.5">
        <rect x="20" y="28" width="60" height="44" rx="4" fill="#eef7ec" />
        <path d="M40 50l6 6 12-12" />
        <circle cx="68" cy="38" r="2" fill="#4caf50" />
        <line x1="30" y1="72" x2="30" y2="80" />
        <line x1="70" y1="72" x2="70" y2="80" />
      </svg>
    ),
  },
  {
    id: "titangen-8kva",
    pill: "NEW",
    brand: "TITANGEN",
    name: "8kVA Diesel Generator",
    spec: "Silent canopy · ATS-ready · 12hr tank",
    price: "$2,150",
    unit: null,
    icon: (
      <svg viewBox="0 0 100 100" fill="none" stroke="#2d8a36" strokeWidth="1.5">
        <rect x="18" y="34" width="64" height="40" rx="5" fill="#eef7ec" />
        <path d="M30 34v-4a4 4 0 0 1 4-4h32a4 4 0 0 1 4 4v4" />
        <circle cx="40" cy="54" r="5" />
        <line x1="58" y1="48" x2="72" y2="48" />
        <line x1="58" y1="56" x2="72" y2="56" />
        <line x1="34" y1="74" x2="34" y2="82" />
        <line x1="66" y1="74" x2="66" y2="82" />
      </svg>
    ),
  },
];

const BRANDS = ["SOLARA", "VOLTCORE", "HELIOTEK", "TITANGEN", "AMPERON", "NORDWIRE"];

const BUILD_STEPS = [
  { n: 1, title: "Tell us your load", body: "Daily kWh or appliance list" },
  { n: 2, title: "We match components", body: "Compatible panel + inverter + battery" },
  { n: 3, title: "One kit, one price", body: "Shipped together, warrantied together" },
];

export default function StorePage() {
  const [cartCount, setCartCount] = useState(0);
  const [justAdded, setJustAdded] = useState(null);
  useRevealAndCounters([]);
  const sub = SUBS.find((s) => s.id === "store");

  const handleAdd = (id) => {
    setCartCount((c) => c + 1);
    setJustAdded(id);
    setTimeout(() => setJustAdded((cur) => (cur === id ? null : cur)), 600);
  };

  return (
    <>
      <Seo
        title="Energica Store — Solar panels, batteries, inverters & electrical"
        description="Solar panels, batteries, inverters, generators, wiring and electrical accessories from trusted brands — trade pricing, real stock, fast dispatch."
        path="/store"
        jsonLd={subsidiaryOrganizationJsonLd(sub)}
      />
      <div className={styles.theme}>
      <Nav pageId="store" />
      <main>
        {/* HERO BANNER */}
        <section className={styles.hero}>
          <div className="container">
            <div className={styles.heroGrid}>
              <div className="reveal">
                <span className={styles.heroTag}>
                  <span className={styles.dot} /> Energica Store
                </span>
                <h1>
                  Every part of your
                  <br />
                  system, <em>in stock.</em>
                </h1>
                <p className={styles.heroSub}>
                  Solar panels, batteries, inverters, generators, wiring and electrical accessories — from the brands
                  we trust enough to install ourselves. Trade pricing, real stock, fast dispatch.
                </p>
                <div className={styles.heroRow}>
                  <a href="#categories" className="btn btn-primary">Shop categories</a>
                  <a href="#build" className="btn btn-ghost btn-arrow">
                    Build a system
                    <ArrowIcon />
                  </a>
                </div>
                <div className={styles.heroBadges}>
                  <span className={styles.heroBadge}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="3" width="15" height="13" /><path d="M16 8h4l3 3v5h-7V8z" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" /></svg>
                    Next-day dispatch
                  </span>
                  <span className={styles.heroBadge}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 22s8-4 8-12V5l-8-3-8 3v5c0 8 8 12 8 12z" /></svg>
                    Genuine, warrantied
                  </span>
                  <span className={styles.heroBadge}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 12V8H6a2 2 0 0 1 0-4h12v4" /><path d="M4 6v12a2 2 0 0 0 2 2h14v-4" /><path d="M18 12a2 2 0 0 0 0 4h4v-4z" /></svg>
                    Trade accounts
                  </span>
                </div>
              </div>

              <div className={`${styles.heroProduct} reveal`} data-delay="1" aria-hidden="true">
                <div className={styles.priceTag}>$189<small>PER PANEL</small></div>
                <svg viewBox="0 0 400 400" preserveAspectRatio="xMidYMid meet">
                  <rect width="400" height="400" fill="#f6faf4" />
                  <g transform="translate(70 80)">
                    <rect x="0" y="0" width="260" height="240" rx="6" fill="#1a3a5c" stroke="#2d8a36" strokeWidth="2" />
                    <g fill="#234d76" stroke="#4caf50" strokeWidth="0.8">
                      <rect x="14" y="14" width="54" height="50" /><rect x="76" y="14" width="54" height="50" /><rect x="138" y="14" width="54" height="50" /><rect x="200" y="14" width="46" height="50" />
                      <rect x="14" y="72" width="54" height="50" /><rect x="76" y="72" width="54" height="50" /><rect x="138" y="72" width="54" height="50" /><rect x="200" y="72" width="46" height="50" />
                      <rect x="14" y="130" width="54" height="50" /><rect x="76" y="130" width="54" height="50" /><rect x="138" y="130" width="54" height="50" /><rect x="200" y="130" width="46" height="50" />
                      <rect x="14" y="188" width="54" height="40" /><rect x="76" y="188" width="54" height="40" /><rect x="138" y="188" width="54" height="40" /><rect x="200" y="188" width="46" height="40" />
                    </g>
                    <path d="M0 0 L80 0 L0 100 Z" fill="white" opacity="0.06" />
                  </g>
                  <circle cx="320" cy="60" r="26" fill="#fbe6a8" />
                  <g stroke="#fbe6a8" strokeWidth="2" strokeLinecap="round">
                    <line x1="320" y1="20" x2="320" y2="10" />
                    <line x1="356" y1="44" x2="364" y2="38" />
                    <line x1="284" y1="44" x2="276" y2="38" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="section" id="categories">
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Shop by category</span>
                <h2>Everything you need to power a site.</h2>
              </div>
              <p style={{ maxWidth: 320 }}>
                Six core categories, hundreds of SKUs — all the components our own installers use on the job.
              </p>
            </div>

            <div className={styles.catGrid}>
              {CATEGORIES.map((c, i) => (
                <a className={`${styles.catCard} reveal`} data-delay={(i % 3) + 1} href="#featured" key={c.title}>
                  <div className={styles.ico}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">{c.icon}</svg>
                  </div>
                  <h4>{c.title}</h4>
                  <div className={styles.count}>{c.count}</div>
                  <span className={styles.arrow}>
                    Browse
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PRODUCTS */}
        <section className="section" id="featured" style={{ background: "var(--surface)", borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Featured products</span>
                <h2>Best-sellers this month.</h2>
              </div>
              <a href="#" className="btn btn-ghost btn-arrow">
                View full catalogue
                <ArrowIcon />
              </a>
            </div>

            <div className={styles.prodGrid}>
              {PRODUCTS.map((p, i) => (
                <div className={`${styles.prod} reveal`} data-delay={i + 1} key={p.id}>
                  <div className={styles.prodImg}>
                    <span className={`${styles.pill} ${p.stockPill ? styles.stock : ""}`}>{p.pill}</span>
                    {p.icon}
                  </div>
                  <div className={styles.prodBody}>
                    <div className={styles.brandL}>{p.brand}</div>
                    <h5>{p.name}</h5>
                    <div className={styles.spec}>{p.spec}</div>
                    <div className={styles.prodFoot}>
                      <div className={styles.price}>{p.price} {p.unit && <small>{p.unit}</small>}</div>
                      <button
                        className={`${styles.addBtn} ${justAdded === p.id ? styles.added : ""}`}
                        aria-label="Add to cart"
                        onClick={() => handleAdd(p.id)}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BRANDS */}
        <section className={`${styles.brands} section`}>
          <div className="container">
            <div className="sec-head reveal">
              <div className="stack">
                <span className="eyebrow">Brands we carry</span>
                <h2>Only what we'd install ourselves.</h2>
              </div>
              <p style={{ maxWidth: 340 }}>
                We stock the brands our own engineers specify on real projects — no grey-market gambles.
              </p>
            </div>

            <div className={`${styles.brandRow} reveal`} data-delay="1">
              {BRANDS.map((b) => (
                <div className={styles.brandCell} key={b}><span>{b}</span></div>
              ))}
            </div>
          </div>
        </section>

        {/* BUILD SYSTEM CTA */}
        <section className="section" id="build">
          <div className="container">
            <div className={`${styles.build} reveal`}>
              <div>
                <span className="eyebrow" style={{ color: "rgba(255,255,255,0.85)" }}>Build your system</span>
                <h2 style={{ marginTop: 14 }}>Not sure what fits together? We'll spec it for you.</h2>
                <p>
                  Tell us your load and budget — our system builder pairs panels, inverter, battery and
                  balance-of-system into one compatible, warrantied kit. Free, no obligation.
                </p>
                <div className={styles.buildRow}>
                  <a href="/#contact" className="btn" style={{ background: "white", color: "var(--brand-deep)" }}>Start the builder</a>
                  <a href="/power-solutions" className="btn" style={{ background: "transparent", color: "white", border: "1px solid rgba(255,255,255,0.4)" }}>Want it installed?</a>
                </div>
              </div>
              <div className={styles.buildSteps}>
                {BUILD_STEPS.map((s) => (
                  <div className={styles.buildStep} key={s.n}>
                    <div className={styles.n}>{s.n}</div>
                    <div className={styles.txt}><strong>{s.title}</strong><span>{s.body}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      {cartCount > 0 && (
        <div
          style={{
            position: "fixed",
            top: 84,
            right: 20,
            zIndex: 90,
            background: "var(--brand)",
            color: "white",
            fontFamily: "'Geist Mono',monospace",
            fontSize: 12,
            padding: "8px 14px",
            borderRadius: 999,
            boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
          }}
        >
          Cart · {cartCount}
        </div>
      )}
      <Footer pageId="store" />
      </div>
    </>
  );
}
