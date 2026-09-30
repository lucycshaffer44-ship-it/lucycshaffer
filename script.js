// Portfolio interactions. You shouldn't need to edit this file.
(function () {
  // Mobile nav toggle
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.getElementById("site-nav");
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!open));
    nav.classList.toggle("is-open", !open);
  });
  nav.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    })
  );

  // Work filters
  const filters = document.querySelectorAll(".filter");
  const cards = document.querySelectorAll(".work-grid .card");
  filters.forEach((btn) =>
    btn.addEventListener("click", () => {
      const f = btn.dataset.filter;
      filters.forEach((b) => {
        b.classList.toggle("is-active", b === btn);
        b.setAttribute("aria-pressed", String(b === btn));
      });
      cards.forEach((c) => c.classList.toggle("is-hidden", f !== "all" && c.dataset.category !== f));
    })
  );

  // Ticker: duplicate the items so the scroll loops with no gap
  const list = document.querySelector(".ticker-list");
  if (list) {
    Array.from(list.children).forEach((li) => {
      const clone = li.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      list.appendChild(clone);
    });
  }

  // Running timecode on the "monitor"
  const tc = document.querySelector("[data-timecode]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (tc && !reduceMotion) {
    const start = performance.now();
    const pad = (n) => String(n).padStart(2, "0");
    const tick = () => {
      const t = (performance.now() - start) / 1000;
      const frames = Math.floor((t % 1) * 30);
      tc.textContent = `${pad(Math.floor(t / 3600))}:${pad(Math.floor(t / 60) % 60)}:${pad(Math.floor(t) % 60)}:${pad(frames)}`;
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Highlight current section in nav
  const links = document.querySelectorAll(".site-nav a[href^='#']");
  const sections = Array.from(links)
    .map((l) => document.querySelector(l.getAttribute("href")))
    .filter(Boolean);
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          links.forEach((l) => l.classList.toggle("is-current", l.getAttribute("href") === "#" + e.target.id));
        }),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => navObserver.observe(s));

    // Fade sections in as you scroll
    const revealEls = document.querySelectorAll(".section-head, .about-grid, .reel, .card, .resume-col, .contact-inner");
    const revealObserver = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            revealObserver.unobserve(e.target);
          }
        }),
      { threshold: 0.12 }
    );
    revealEls.forEach((el) => {
      el.classList.add("reveal");
      revealObserver.observe(el);
    });
  }

  // Footer year
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));
})();
