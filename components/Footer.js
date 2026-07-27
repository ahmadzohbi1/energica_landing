import Link from "next/link";
import { SUBS } from "../lib/routes";

export default function Footer({ pageId }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <Link className="nav-logo" href="/" style={{ marginBottom: 16 }}>
              <span className="logo-mark">E</span>
              <span>Energica<small>Holding Group</small></span>
            </Link>
            <p style={{ maxWidth: 340, fontSize: 14, marginTop: 14 }}>
              Powering the future and building the present through six operating companies in energy, construction and industry.
            </p>
          </div>
          <div>
            <h5>Group</h5>
            <ul>
              <li><Link href="/#about">About Energica</Link></li>
              <li><Link href="/#companies">Our Companies</Link></li>
              <li><Link href="/#numbers">Impact</Link></li>
              <li><Link href="/#contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h5>Companies</h5>
            <ul>
              {SUBS.map((s) => (<li key={s.id}><Link href={s.href}>{s.name.replace("Energica ", "")}</Link></li>))}
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li><a>hello@energica.group</a></li>
              <li><a>+1 (000) 000-0000</a></li>
              <li><a>HQ — placeholder address</a></li>
            </ul>
            <h5 style={{ marginTop: 18 }}>Follow</h5>
            <ul>
              <li><a>LinkedIn</a></li>
              <li><a>Instagram</a></li>
              <li><a>X / Twitter</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 ENERGICA HOLDING · ALL RIGHTS RESERVED</span>
          <span>BUILT WITH PURPOSE · {pageId.toUpperCase()}</span>
        </div>
      </div>
    </footer>
  );
}
