import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { PAGE_NAMES } from "../lib/routes";

const TWEAK_KEY = "energica-tweaks-v1";
const PAGE_SWATCHES = {
  holding: ["#0a1d3a", "#1e3a8a", "#7c2d3a", "#0f172a"],
  power: ["#6ab547", "#3ba66d", "#4ab0d9", "#2c8a9f"],
  steel: ["#1f3a5f", "#2c5282", "#475569", "#0f172a"],
  gen: ["#7c3aed", "#a855f7", "#5b21b6", "#c026d3"],
  constr: ["#2c7fb5", "#1d4d80", "#64748b", "#0d3a5f"],
  fac: ["#1d4080", "#0a1d3a", "#1e3a8a", "#dc2626"],
  store: ["#4caf50", "#2d8a36", "#65a30d", "#16a34a"],
};
const ROUTES = { holding: "/", power: "/power-solutions", steel: "/steel", gen: "/power-generations", constr: "/constructions", fac: "/facilities", store: "/store" };

function hexToRgba(hex, a) {
  hex = hex.replace("#", "");
  const n = parseInt(hex, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}
function shade(hex, amt) {
  hex = hex.replace("#", "");
  let r = (parseInt(hex, 16) >> 16) & 255, g = (parseInt(hex, 16) >> 8) & 255, b = parseInt(hex, 16) & 255;
  r = Math.max(0, Math.min(255, r + amt * 2.55));
  g = Math.max(0, Math.min(255, g + amt * 2.55));
  b = Math.max(0, Math.min(255, b + amt * 2.55));
  return `rgb(${r | 0}, ${g | 0}, ${b | 0})`;
}

// pageId is passed down from _app via the current route
export default function Tweaks({ pageId }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [density, setDensity] = useState("comfortable");
  const [color, setColor] = useState(null);

  useEffect(() => {
    try {
      const t = JSON.parse(localStorage.getItem(TWEAK_KEY) || "{}");
      if (t.density) setDensity(t.density);
      if (t.colors && t.colors[pageId]) setColor(t.colors[pageId]);
    } catch {}
  }, [pageId]);

  useEffect(() => {
    const map = { compact: 0.82, comfortable: 1, spacious: 1.18 };
    document.documentElement.style.setProperty("--d", map[density] || 1);
  }, [density]);

  useEffect(() => {
    if (!color) return;
    document.documentElement.style.setProperty("--brand", color);
    document.documentElement.style.setProperty("--brand-deep", shade(color, -18));
    document.documentElement.style.setProperty("--brand-soft", hexToRgba(color, 0.08));
  }, [color]);

  const persist = (patch) => {
    const t = JSON.parse(localStorage.getItem(TWEAK_KEY) || "{}");
    localStorage.setItem(TWEAK_KEY, JSON.stringify({ ...t, ...patch, colors: { ...(t.colors || {}), ...(patch.colors || {}) } }));
  };

  const swatches = PAGE_SWATCHES[pageId] || PAGE_SWATCHES.holding;

  return (
    <>
      <button className="tweaks-fab on" aria-label="Open tweaks" onClick={() => setOpen((v) => !v)}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
      </button>

      <div className={"tweaks-panel" + (open ? " open" : "")}>
        <button className="tweaks-close" aria-label="Close" onClick={() => setOpen(false)}>×</button>
        <h6>Jump to page</h6>
        <select value={ROUTES[pageId]} onChange={(e) => router.push(e.target.value)}>
          {Object.entries(ROUTES).map(([id, href]) => (
            <option key={id} value={href}>{PAGE_NAMES[id]}</option>
          ))}
        </select>

        <h6>Density</h6>
        <div className="seg">
          {["compact", "comfortable", "spacious"].map((d) => (
            <button key={d} className={density === d ? "active" : ""} onClick={() => { setDensity(d); persist({ density: d }); }}>
              {d[0].toUpperCase() + d.slice(1)}
            </button>
          ))}
        </div>

        <h6>Brand accent</h6>
        <div className="swatches">
          {swatches.map((c) => (
            <button key={c} className={"swatch" + (color === c ? " sel" : "")} style={{ background: c }}
              onClick={() => { setColor(c); persist({ colors: { [pageId]: c } }); }} />
          ))}
          <button className="swatch" title="Reset" style={{ background: "repeating-linear-gradient(45deg,#eee 0 4px,#fff 4px 8px)" }}
            onClick={() => {
              setColor(null);
              const t = JSON.parse(localStorage.getItem(TWEAK_KEY) || "{}");
              if (t.colors) delete t.colors[pageId];
              localStorage.setItem(TWEAK_KEY, JSON.stringify(t));
              location.reload();
            }} />
        </div>
      </div>
    </>
  );
}
