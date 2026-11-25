(() => {
  const root = document.documentElement;
  const $ = (s) => document.querySelector(s);

  /* ---------- Tema ---------- */
  const saved = (() => { try { return localStorage.getItem("theme"); } catch { return null; } })();
  if (saved === "west" || saved === "binary") root.dataset.theme = saved;

  $("#themeToggle").addEventListener("click", () => {
    const next = root.dataset.theme === "binary" ? "west" : "binary";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch {}
    updateEyebrow();
    scramble($("#heroName"));
  });

  function updateEyebrow() {
    $("#eyebrow").textContent = root.dataset.theme === "binary"
      ? "01001001 · INGENIERO MULTIMEDIA"
      : "★ INGENIERO MULTIMEDIA · UX / 3D / DEV ★";
  }
  updateEyebrow();

  /* ---------- Efecto scramble en el nombre ---------- */
  function scramble(el) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const final = el.dataset.text;
    const chars = root.dataset.theme === "binary" ? "01" : "#@$%&*+=";
    let frame = 0;
    const total = 28;
    clearInterval(el._t);
    el._t = setInterval(() => {
      frame++;
      const reveal = Math.floor((frame / total) * final.length);
      el.textContent = final.split("").map((c, i) =>
        c === " " ? " " : i < reveal ? c : chars[Math.floor(Math.random() * chars.length)]
      ).join("");
      if (frame >= total) { clearInterval(el._t); el.textContent = final; }
    }, 40);
  }
  scramble($("#heroName"));

  /* ---------- Reloj ---------- */
  const clock = $("#clock");
  const tick = () => {
    clock.textContent = new Date().toLocaleTimeString("es-CO", { hour12: false, timeZone: "America/Bogota" });
  };
  tick(); setInterval(tick, 1000);

  /* ---------- Proyectos + filtros ---------- */
  const grid = $("#projects");
  const filters = $("#filters");
  const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.categoria))];
  let active = "Todos";

  function renderFilters() {
    filters.innerHTML = "";
    cats.forEach((c) => {
      const b = document.createElement("button");
      b.className = "chip" + (c === active ? " active" : "");
      b.textContent = c;
      b.onclick = () => { active = c; renderFilters(); renderProjects(); };
      filters.appendChild(b);
    });
  }

  const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));

  function renderProjects() {
    grid.innerHTML = "";
    PROJECTS.filter((p) => active === "Todos" || p.categoria === active).forEach((p, i) => {
      const a = document.createElement("a");
      a.className = "card";
      a.href = p.enlace || "#";
      if (p.enlace && p.enlace !== "#") { a.target = "_blank"; a.rel = "noopener"; }
      const thumb = p.imagen
        ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)}" loading="lazy" />`
        : `<div class="ph">${esc(p.titulo)}</div>`;
      a.innerHTML = `
        <div class="thumb">${thumb}</div>
        <div class="card-body">
          <div class="card-top"><span>${esc(p.categoria)}</span><span>${esc(p.anio)}</span></div>
          <h3>${esc(p.titulo)}</h3>
          <p>${esc(p.descripcion)}</p>
          <div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
        </div>`;
      grid.appendChild(a);
      setTimeout(() => a.classList.add("in"), 60 * i);
    });
  }
  renderFilters(); renderProjects();

  /* ---------- Skills ---------- */
  $("#skills-list").innerHTML = Object.entries(SKILLS).map(([k, v]) =>
    `<div class="skill-box"><h4>${esc(k)}</h4><ul>${v.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>`
  ).join("");

  $("#year").textContent = new Date().getFullYear();

  /* ---------- Lluvia binaria (tema Binary) ---------- */
  const cv = $("#rain");
  const ctx = cv.getContext("2d");
  let cols, drops, size = 16;

  function resize() {
    cv.width = innerWidth; cv.height = innerHeight;
    cols = Math.floor(cv.width / size);
    drops = Array.from({ length: cols }, () => Math.random() * -50);
  }
  addEventListener("resize", resize); resize();

  function draw() {
    if (root.dataset.theme !== "binary" || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      ctx.clearRect(0, 0, cv.width, cv.height);
      return requestAnimationFrame(draw);
    }
    ctx.fillStyle = "rgba(5,7,10,.12)";
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.font = size + "px JetBrains Mono, monospace";
    for (let i = 0; i < cols; i++) {
      const ch = Math.random() > 0.5 ? "1" : "0";
      ctx.fillStyle = Math.random() > 0.96 ? "#4de1ff" : "#00ff9c";
      ctx.fillText(ch, i * size, drops[i] * size);
      if (drops[i] * size > cv.height && Math.random() > 0.975) drops[i] = 0;
      drops[i] += 0.5;
    }
    requestAnimationFrame(draw);
  }
  draw();
})();
