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
      cards.forEach((c) => c.classList.toggle("is-hidden", f !== "all" && !c.dataset.category.split(" ").includes(f)));
    })
  );

  // Video cards: <article class="card" data-youtube="https://youtu.be/..."> gets a thumbnail and opens
  // in a pop-up player. data-video="assets/video/clip.mp4" does the same for a video file in this repo,
  // and data-instagram="https://www.instagram.com/reel/CODE/" for an Instagram reel.
  const ytId = (url) => {
    const m = url.match(/(?:youtu\.be\/|v=|\/embed\/|\/shorts\/|\/live\/)([\w-]{11})/);
    return m ? m[1] : url.trim();
  };
  // Start time from ?t=3017, ?t=50m17s or ?start=3017
  const ytStart = (url) => {
    const m = url.match(/[?&](?:t|start)=([\dhms]+)/);
    if (!m) return 0;
    if (/^\d+$/.test(m[1])) return Number(m[1]);
    const part = (u) => Number((m[1].match(new RegExp("(\\d+)" + u)) || [0, 0])[1]);
    return part("h") * 3600 + part("m") * 60 + part("s");
  };
  // YouTube and Instagram won't play inside a page opened straight from a file (file://),
  // so show a link instead of a broken player in that case.
  const offline = location.protocol === "file:";
  const safe = (t) => t.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const offlineNote = (href, site) =>
    `<div class="offline-note"><p>${site} videos play once the site is online.</p>` +
    `<a class="btn btn-primary" href="${href}" target="_blank" rel="noopener">Watch on ${site} ↗</a></div>`;
  const featured = document.querySelector(".reel-frame iframe");
  if (featured && offline) {
    const fid = ytId(featured.src);
    featured.outerHTML = offlineNote(`https://www.youtube.com/watch?v=${fid}`, "YouTube");
  }

  const ytCards = document.querySelectorAll(".card[data-youtube], .card[data-video], .card[data-instagram]");
  if (ytCards.length) {
    const modal = document.createElement("dialog");
    modal.className = "video-modal";
    modal.innerHTML =
      '<button class="modal-close" type="button">Close ✕</button><div class="modal-frame"></div>' +
      '<a class="modal-alt" target="_blank" rel="noopener"></a>';
    document.body.appendChild(modal);
    const frame = modal.querySelector(".modal-frame");
    const alt = modal.querySelector(".modal-alt");
    const setAlt = (href, label) => {
      alt.hidden = !href || offline;
      if (href) { alt.href = href; alt.textContent = label + " ↗"; }
    };
    const close = () => modal.close();
    modal.querySelector(".modal-close").addEventListener("click", close);
    modal.addEventListener("click", (e) => { if (e.target === modal) close(); });
    modal.addEventListener("close", () => (frame.innerHTML = ""));

    ytCards.forEach((card) => {
      const file = card.dataset.video;
      const insta = card.dataset.instagram && (card.dataset.instagram.match(/\/(?:reels?|p)\/([\w-]+)/) || [])[1];
      const id = file || insta ? null : ytId(card.dataset.youtube);
      const start = id ? ytStart(card.dataset.youtube) : 0;
      const title = card.querySelector("h3")?.textContent || "Video";
      const thumb = card.querySelector(".card-thumb");
      if (id && !thumb.querySelector("img")) {
        const img = document.createElement("img");
        img.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
        img.alt = "";
        img.loading = "lazy";
        img.onerror = () => img.remove();
        thumb.prepend(img);
      }
      const badge = document.createElement("span");
      badge.className = "play-badge";
      badge.setAttribute("aria-hidden", "true");
      badge.textContent = "▶";
      thumb.appendChild(badge);

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "card-link";
      btn.setAttribute("aria-label", `Play video: ${title}`);
      while (card.firstChild) btn.appendChild(card.firstChild);
      card.appendChild(btn);
      btn.addEventListener("click", () => {
        modal.classList.toggle("is-insta", Boolean(insta));
        if (insta) {
          modal.classList.remove("is-vertical");
          const page = `https://www.instagram.com/reel/${insta}/`;
          setAlt(page, "View on Instagram");
          frame.innerHTML = offline
            ? offlineNote(page, "Instagram")
            : `<iframe src="https://www.instagram.com/p/${insta}/embed/captioned/" title="${safe(title)}" allowfullscreen scrolling="no" referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
          modal.showModal();
          return;
        }
        if (file) {
          modal.classList.remove("is-vertical");
          setAlt(null);
          frame.innerHTML = `<video controls autoplay playsinline src="${file}" style="width:100%;height:100%;background:#000"></video>`;
          modal.showModal();
          return;
        }
        modal.classList.toggle("is-vertical", card.dataset.youtube.includes("/shorts/"));
        const page = `https://www.youtube.com/watch?v=${id}${start ? `&t=${start}s` : ""}`;
        setAlt(page, "Watch on YouTube");
        frame.innerHTML = offline
          ? offlineNote(page, "YouTube")
          : `<iframe src="https://www.youtube.com/embed/${id}?autoplay=1&rel=0&playsinline=1${start ? `&start=${start}` : ""}" title="${safe(title)}" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
        modal.showModal();
      });
    });
  }

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
