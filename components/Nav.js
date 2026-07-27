import { useState, useRef } from "react";
import Link from "next/link";
import { SUBS, PAGE_NAMES } from "../lib/routes";

export default function Nav({ pageId }) {
  const [megaOpen, setMegaOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeTimer = useRef(null);

  const openMega = () => { clearTimeout(closeTimer.current); setMegaOpen(true); };
  const closeMega = () => { closeTimer.current = setTimeout(() => setMegaOpen(false), 120); };

  const NAV_LINKS = [
    { href: "/#about", label: "About" },
    { href: "/#companies", label: "Group" },
    { href: "/#numbers", label: "Impact" },
  ];
  const contactHref = pageId === "holding" ? "#contact" : "/#contact";

  return (
    <>
      <nav className="nav">
        <div className="container nav-inner">
          <Link className="nav-logo" href="/" aria-label="Energica Holding">
            <span className="logo-mark">E</span>
            <span>Energica<small>{PAGE_NAMES[pageId] || "Holding Group"}</small></span>
          </Link>

          <ul className="nav-links">
            {NAV_LINKS.map((l) => (
              <li className="desktop-only" key={l.href}><a href={l.href}>{l.label}</a></li>
            ))}
            <li className="mega-wrap desktop-only" onMouseEnter={openMega} onMouseLeave={closeMega}>
              <button className="mega-trigger" aria-expanded={megaOpen} onClick={() => setMegaOpen((v) => !v)}>
                Our Companies
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </button>
              <div className={"mega" + (megaOpen ? " open" : "")} role="menu">
                <div className="mega-grid">
                  {SUBS.map((s) => (
                    <Link className="mega-item" href={s.href} role="menuitem" key={s.id}>
                      <span className="mega-ico" style={{ background: s.brand + "1a", borderColor: s.brand + "33" }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke={s.brand} strokeWidth="1.6"><circle cx="12" cy="12" r="8"/></svg>
                      </span>
                      <span>
                        <div className="mega-item-title">{s.name}</div>
                        <div className="mega-item-desc">{s.desc}</div>
                      </span>
                    </Link>
                  ))}
                </div>
                <div className="mega-foot">
                  <span>6 operating companies under one group</span>
                  <Link href="/#companies">Explore the group →</Link>
                </div>
              </div>
            </li>
            <li className="desktop-only"><a className="nav-cta" href={contactHref}>Contact</a></li>
          </ul>

          <button className="nav-mobile-toggle" aria-label="Menu" onClick={() => setDrawerOpen((v) => !v)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
          </button>
        </div>
      </nav>

      <aside className={"mobile-drawer" + (drawerOpen ? " open" : "")}>
        <h5>Menu</h5>
        {NAV_LINKS.map((l) => (<a href={l.href} key={l.href} onClick={() => setDrawerOpen(false)}>{l.label}</a>))}
        <h5>Our Companies</h5>
        {SUBS.map((s) => (<Link href={s.href} key={s.id} onClick={() => setDrawerOpen(false)}>{s.name}</Link>))}
        <h5>Get in Touch</h5>
        <a href={contactHref} onClick={() => setDrawerOpen(false)}>Contact Energica</a>
      </aside>
    </>
  );
}
