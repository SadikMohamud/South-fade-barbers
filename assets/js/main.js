(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (hasGsap) gsap.registerPlugin(ScrollTrigger);

  $("#js-year").textContent = new Date().getFullYear();

  /* Today's opening hours */
  const day = new Date().getDay();
  $$("#js-hours > div").forEach((row) => row.dataset.days.split(",").map(Number).includes(day) && row.classList.add("is-today"));

  /* Price list */
  const cats = $("#js-cats");
  const data = window.SF_SERVICES || [];
  const num = (p) => parseFloat(String(p).replace(/[^0-9.]/g, "")) || Infinity;
  cats.innerHTML = data.map((c, i) => {
    const from = Math.min(...c.prices.map((p) => num(p.price)));
    return `<li class="cat" data-photo="${c.photo || ""}">
      <button class="cat__row" aria-expanded="false" aria-controls="cat-${i}">
        <span class="cat__name">${c.title}</span>
        <span class="cat__from">${isFinite(from) ? "From £" + from : ""}</span>
        <span class="cat__plus" aria-hidden="true"></span>
      </button>
      <div class="cat__panel" id="cat-${i}" role="region">
        <div class="cat__inner">
          <p class="cat__desc">${c.description}</p>
          <ul class="prices">${c.prices.map((p) => `<li><span>${p.name}</span><span>${p.price}</span></li>`).join("")}</ul>
        </div>
      </div>
    </li>`;
  }).join("");

  function toggleCat(li, force) {
    const open = force ?? !li.classList.contains("is-open");
    const panel = $(".cat__panel", li);
    li.classList.toggle("is-open", open);
    $(".cat__row", li).setAttribute("aria-expanded", String(open));
    if (hasGsap && !reduce) {
      gsap.to(panel, { height: open ? "auto" : 0, duration: 0.7, ease: "expo.inOut", onComplete: () => ScrollTrigger.refresh() });
      if (open) gsap.fromTo($$(".prices li", panel), { x: -20, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, stagger: 0.04, delay: 0.15, ease: "power3.out" });
    } else panel.style.height = open ? "auto" : "0";
  }
  $$(".cat", cats).forEach((li) => $(".cat__row", li).addEventListener("click", () => {
    $$(".cat.is-open", cats).forEach((o) => o !== li && toggleCat(o, false));
    toggleCat(li);
  }));
  const first = $(".cat", cats);
  if (first) toggleCat(first, true);

  /* Hex light ceiling */
  const canvas = $("#js-hex");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    let W = 0, H = 0, cells = [], dpr = 1;
    const mouse = { x: -9999, y: -9999, tx: -9999, ty: -9999 };
    const R = () => (innerWidth < 700 ? 26 : 38);
    function build() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const r = R(), w = Math.sqrt(3) * r, h = 1.5 * r;
      cells = [];
      for (let row = -1; row * h < H + r; row++) {
        for (let col = -1; col * w < W + w; col++) {
          cells.push({ x: col * w + (row % 2 ? w / 2 : 0), y: row * h, r, glow: 0 });
        }
      }
    }
    function hex(x, y, r) {
      ctx.beginPath();
      for (let k = 0; k < 6; k++) {
        const a = (Math.PI / 180) * (60 * k - 30);
        const px = x + (r - 3) * Math.cos(a), py = y + (r - 3) * Math.sin(a);
        k ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
      }
      ctx.closePath();
    }
    let t = 0;
    function draw() {
      t += 0.012;
      mouse.x += (mouse.tx - mouse.x) * 0.12; mouse.y += (mouse.ty - mouse.y) * 0.12;
      ctx.clearRect(0, 0, W, H);
      ctx.lineWidth = 2;
      for (const c of cells) {
        const d = Math.hypot(c.x - mouse.x, c.y - mouse.y);
        const near = Math.max(0, 1 - d / 260);
        const wave = reduce ? 0 : Math.max(0, Math.sin(c.x * 0.006 + c.y * 0.004 - t * 2)) ** 8 * 0.35;
        const target = Math.max(near, wave);
        c.glow += (target - c.glow) * 0.1;
        const g = c.glow;
        ctx.strokeStyle = g > 0.5
          ? `rgba(255, 250, 230, ${0.08 + g * 0.8})`
          : `rgba(252, 213, 53, ${0.05 + g * 0.6})`;
        ctx.shadowBlur = g * 18;
        ctx.shadowColor = "rgba(252, 213, 53, 0.9)";
        hex(c.x, c.y, c.r);
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      if (!reduce) requestAnimationFrame(draw);
    }
    build(); draw();
    addEventListener("resize", build);
    const hero = $("#js-hero");
    hero.addEventListener("pointermove", (e) => { const b = canvas.getBoundingClientRect(); mouse.tx = e.clientX - b.left; mouse.ty = e.clientY - b.top; });
    hero.addEventListener("pointerleave", () => { mouse.tx = -9999; mouse.ty = -9999; });
  }

  /* Floating category photo on hover */
  const follower = $("#js-cursor-img");
  if (follower && finePointer && hasGsap && !reduce) {
    const img = $("img", follower);
    const xTo = gsap.quickTo(follower, "x", { duration: 0.6, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.6, ease: "power3" });
    addEventListener("pointermove", (e) => { xTo(e.clientX + 170); yTo(e.clientY); });
    $$(".cat", cats).forEach((li) => {
      const row = $(".cat__row", li);
      row.addEventListener("pointerenter", () => {
        if (!li.dataset.photo) return;
        img.src = li.dataset.photo;
        gsap.to(follower, { opacity: 1, scale: 1, rotate: -4, duration: 0.5, ease: "expo.out" });
      });
      row.addEventListener("pointerleave", () => gsap.to(follower, { opacity: 0, scale: 0.6, rotate: 0, duration: 0.4, ease: "power3.out" }));
    });
  }

  if (!hasGsap) return;

  /* Smooth scroll and anchors */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((tm) => lenis.raf(tm * 1000));
    gsap.ticker.lagSmoothing(0);
  }
  $$('a[href^="#"]').forEach((a) => a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    const target = id === "#top" ? 0 : $(id);
    if (target === null) return;
    e.preventDefault();
    lenis ? lenis.scrollTo(target, { offset: -20, duration: 1.4 }) : (target === 0 ? scrollTo(0, 0) : target.scrollIntoView());
  }));

  /* Header hides on the way down, returns on the way up; nav marks current section */
  const top = $("#js-top");
  let lastY = 0;
  ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { const y = s.scroll(); top.classList.toggle("is-hidden", y > 400 && y > lastY + 3); if (y < lastY - 3) top.classList.remove("is-hidden"); lastY = y; } });
  $$(".pill--nav a").forEach((a) => {
    const sec = $(a.getAttribute("href"));
    if (sec) ScrollTrigger.create({ trigger: sec, start: "top center", end: "bottom center", onToggle: (s) => a.classList.toggle("is-active", s.isActive) });
  });

  if (reduce) return;

  /* Hero entrance */
  gsap.from(".hero__logo img", { clipPath: "inset(0 50% 0 50%)", scale: 1.1, duration: 1.6, ease: "expo.out", delay: 0.1 });
  gsap.from([".hero .eyebrow", ".hero__lede", ".hero__cta", ".hero__rate"], { y: 30, opacity: 0, duration: 1.1, ease: "expo.out", stagger: 0.1, delay: 0.6 });

  /* Marquee bands that speed up with scroll */
  $$(".js-band").forEach((track) => {
    track.innerHTML += track.innerHTML;
    const dir = +track.dataset.dir;
    const tween = gsap.fromTo(track, { xPercent: dir < 0 ? 0 : -50 }, { xPercent: dir < 0 ? -50 : 0, duration: 26, ease: "none", repeat: -1 });
    ScrollTrigger.create({ start: 0, end: "max", onUpdate: (s) => { const v = Math.min(Math.abs(s.getVelocity()) / 400, 5); gsap.to(tween, { timeScale: 1 + v, duration: 0.3, overwrite: true }); gsap.to(tween, { timeScale: 1, duration: 1, delay: 0.3 }); } });
  });

  /* About: shopfront opens out of a hexagon */
  const pin = $("#js-about-pin"), hexEl = $("#js-about-hex"), copy = $("#js-about-copy");
  if (pin) {
    const from = { a: 40, b: 60, c: 70, d: 30, t: 25, bt: 75, shade: 0 };
    const to = { a: -20, b: 120, c: 175, d: -75, t: -12, bt: 112, shade: 1 };
    const st = { ...from };
    const apply = () => {
      for (const k of ["a", "b", "c", "d", "t", "bt"]) hexEl.style.setProperty("--" + k, st[k] + "%");
      hexEl.style.setProperty("--shade", st.shade);
    };
    apply();
    gsap.timeline({ scrollTrigger: { trigger: pin, start: "top top", end: "+=160%", pin: true, scrub: 0.8 } })
      .to(st, { ...to, ease: "power2.inOut", duration: 1, onUpdate: apply })
      .to(copy, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.65)
      .fromTo(copy, { y: 40 }, { y: 0, duration: 0.5 }, 0.65);
  }

  /* Counters */
  $$("[data-to]").forEach((b) => {
    const to = +b.dataset.to, dec = +(b.dataset.dec || 0), suf = b.dataset.suffix || "", o = { v: 0 };
    gsap.to(o, { v: to, duration: 2, ease: "power3.out", scrollTrigger: { trigger: b, start: "top 90%", once: true }, onUpdate: () => (b.textContent = o.v.toFixed(dec) + suf) });
  });

  /* Headings and images */
  $$(".display").forEach((h) => { if (h.closest(".about")) return; gsap.from(h, { yPercent: 30, opacity: 0, duration: 1.2, ease: "expo.out", scrollTrigger: { trigger: h, start: "top 88%" } }); });
  gsap.from(".kids__img", { clipPath: "polygon(50% 0, 50% 0, 50% 50%, 50% 100%, 50% 100%, 50% 50%)", duration: 1.4, ease: "expo.inOut", scrollTrigger: { trigger: ".kids", start: "top 75%" } });
  const inside = $("#js-inside");
  if (inside) gsap.fromTo(inside, { yPercent: -15 }, { yPercent: 0, ease: "none", scrollTrigger: { trigger: ".inside", start: "top bottom", end: "bottom top", scrub: true } });

  /* Magnetic buttons */
  if (finePointer) $$(".btn").forEach((b) => {
    b.addEventListener("pointermove", (e) => { const r = b.getBoundingClientRect(); gsap.to(b, { x: (e.clientX - r.left - r.width / 2) * 0.25, y: (e.clientY - r.top - r.height / 2) * 0.35, duration: 0.4, ease: "power3.out" }); });
    b.addEventListener("pointerleave", () => gsap.to(b, { x: 0, y: 0, duration: 0.7, ease: "elastic.out(1, 0.4)" }));
  });
})();
