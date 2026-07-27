import { useEffect } from "react";

// Re-runs the reveal-on-scroll + animated counter behavior against whatever
// static HTML is currently in the DOM (works with dangerouslySetInnerHTML content).
export default function useRevealAndCounters(deps = []) {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    const ease = (t) => 1 - Math.pow(1 - t, 3);
    const counterIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          const el = e.target;
          const target = parseFloat(el.dataset.count);
          const dur = 1400;
          const t0 = performance.now();
          const decimals = (el.dataset.count.split(".")[1] || "").length;
          const tick = (now) => {
            const p = Math.min(1, (now - t0) / dur);
            const v = target * ease(p);
            el.textContent = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString();
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          counterIO.unobserve(el);
        });
      },
      { threshold: 0.4 }
    );
    document.querySelectorAll("[data-count]").forEach((el) => counterIO.observe(el));

    return () => { io.disconnect(); counterIO.disconnect(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
