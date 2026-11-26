const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ================= SONIDO (opcional) ================= */
let audio = null, soundOn = false;
function blip(freq = 520, dur = 0.07) {
  if (!soundOn) return;
  try {
    audio ||= new (window.AudioContext || window.webkitAudioContext)();
    const o = audio.createOscillator(), g = audio.createGain();
    o.type = "square"; o.frequency.value = freq;
    g.gain.setValueAtTime(0.03, audio.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audio.currentTime + dur);
    o.connect(g).connect(audio.destination);
    o.start(); o.stop(audio.currentTime + dur);
  } catch {}
}
$("#snd").addEventListener("click", (e) => {
  soundOn = !soundOn;
  e.currentTarget.setAttribute("aria-pressed", soundOn);
  e.currentTarget.textContent = "♪ SONIDO: " + (soundOn ? "ON" : "OFF");
  blip(880, 0.1);
});

/* ================= ARCHIVADOR DE PROYECTOS ================= */
const PROJECTS = window.PROJECTS || [];
const SKILLS = window.SKILLS || {};
const tabs = $("#filters"), grid = $("#projects");
const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.categoria))];
let activeCat = "Todos";

const countOf = (c) => PROJECTS.filter((p) => c === "Todos" || p.categoria === c).length;

function renderTabs() {
  tabs.innerHTML = "";
  cats.forEach((c) => {
    const b = document.createElement("button");
    b.className = "tab" + (c === activeCat ? " active" : "");
    b.innerHTML = `${esc(c.toUpperCase())}<small>${countOf(c)}</small>`;
    b.onclick = () => { if (c === activeCat) return; activeCat = c; blip(480, 0.09); renderTabs(); renderFiles(); };
    tabs.appendChild(b);
  });
}

function renderFiles() {
  const list = PROJECTS.map((p, idx) => ({ p, idx })).filter(({ p }) => activeCat === "Todos" || p.categoria === activeCat);
  $("#folderName").textContent = `CARPETA / ${activeCat.toUpperCase()}`;
  $("#folderCount").textContent = `${list.length} ARCHIVO${list.length === 1 ? "" : "S"}`;
  grid.innerHTML = "";
  if (!list.length) { grid.innerHTML = `<p class="empty">Carpeta vacía.</p>`; return; }

  list.forEach(({ p, idx }, i) => {
    const a = document.createElement("a");
    a.className = "file";
    a.href = p.enlace || "#";
    if (p.enlace && p.enlace !== "#") { a.target = "_blank"; a.rel = "noopener"; }
    const thumb = p.imagen
      ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)}" loading="lazy" />`
      : `<div class="ph">${esc(p.titulo)}</div>`;
    const code = `DH-${p.anio}-${String(idx + 1).padStart(3, "0")}`;
    a.innerHTML = `
      <div class="file-top"><span>${code}</span><span>${esc(p.anio)}</span></div>
      <div class="thumb">${thumb}<span class="stamp">${esc(p.categoria.toUpperCase())}</span></div>
      <h3>${esc(p.titulo)}</h3>
      <p>${esc(p.descripcion)}</p>
      <dl class="specs">
        <dt>TIPO</dt><dd>${esc(p.categoria)}</dd>
        <dt>HERRAM.</dt><dd>${esc((p.herramientas || []).join(" · ") || "—")}</dd>
      </dl>
      <span class="open">ABRIR ARCHIVO →</span>`;
    a.addEventListener("pointermove", (e) => {
      const r = a.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      a.style.transform = `perspective(700px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
    });
    a.addEventListener("pointerleave", () => { a.style.transform = ""; });
    grid.appendChild(a);
    setTimeout(() => a.classList.add("in"), reduced ? 0 : 90 * i);
  });
}
renderTabs(); renderFiles();

/* ================= SKILLS: NIVELES TIPO COMBO ================= */
const rankOf = (lv) => (lv >= 9 ? "S" : lv >= 7 ? "A" : lv >= 5 ? "B" : lv >= 3 ? "C" : "D");
let comboTotal = 0, comboCount = 0;

$("#skills-list").innerHTML = Object.entries(SKILLS).map(([group, items], g) => `
  <article class="win">
    <div class="tb"><span>${esc(group.toLowerCase())}.dll</span><em>_ □ ✕</em></div>
    <div class="wb">
      <h4>${esc(group)}</h4>
      <ul>${items.map((s) => {
        comboTotal += s.lv; comboCount++;
        const r = rankOf(s.lv);
        const segs = Array.from({ length: 10 }, (_, d) => `<i class="seg${d < s.lv ? " on" : ""}" style="--d:${d};--g:${g}"></i>`).join("");
        return `<li class="sk"><span class="nm">${esc(s.n)}</span><span class="meter" aria-label="Nivel ${s.lv} de 10">${segs}</span><span class="rank r-${r}">${r}</span></li>`;
      }).join("")}</ul>
    </div>
  </article>`).join("");

const avg = comboCount ? comboTotal / comboCount : 0;
$("#comboRank").textContent = avg >= 8.5 ? "S" : avg >= 7 ? "A" : avg >= 5 ? "B" : "C";

let comboRAF = 0;
function runCombo() {
  const el = $("#comboN");
  cancelAnimationFrame(comboRAF);
  if (reduced) { el.textContent = comboTotal; return; }
  const start = performance.now(), dur = 1800;
  const step = (now) => {
    const k = Math.min(1, (now - start - 350) / dur);
    el.textContent = Math.round(comboTotal * Math.max(0, k));
    if (k < 1) comboRAF = requestAnimationFrame(step);
  };
  el.textContent = 0;
  comboRAF = requestAnimationFrame(step);
}

$("#year").textContent = new Date().getFullYear();
$("#date").textContent = new Date().toLocaleDateString("es-CO", { day: "2-digit", month: "short", year: "numeric" }).toUpperCase();

/* HUD: contador de cinta */
const t0 = Date.now();
setInterval(() => {
  const s = Math.floor((Date.now() - t0) / 1000);
  const f = (n) => String(n).padStart(2, "0");
  $("#tape").textContent = `${f(Math.floor(s / 3600))}:${f(Math.floor(s / 60) % 60)}:${f(s % 60)}`;
}, 1000);

/* ================= NAVEGACIÓN / SCROLL ================= */
const sections = $$(".panel");
const links = $$("#menu a");
let current = -1;

function setActive(i) {
  if (i === current) return;
  current = i;
  links.forEach((l, k) => l.classList.toggle("on", k === i));
  sections.forEach((s, k) => s.classList.toggle("show", k === i));
  if (i === 3) runCombo();
  blip(300 + i * 90, 0.08);
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => { if (en.isIntersecting) setActive(sections.indexOf(en.target)); });
}, { rootMargin: "-45% 0px -45% 0px" });
sections.forEach((s) => io.observe(s));
setActive(0);

links.forEach((l) => l.addEventListener("mouseenter", () => blip(700, 0.03)));

// Teclado tipo D-pad
addEventListener("keydown", (e) => {
  const down = ["ArrowDown", "PageDown"].includes(e.key);
  const up = ["ArrowUp", "PageUp"].includes(e.key);
  if (!down && !up) return;
  if (document.activeElement && document.activeElement.tagName === "BUTTON") return;
  e.preventDefault();
  const next = Math.max(0, Math.min(sections.length - 1, current + (down ? 1 : -1)));
  sections[next].scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
});

/* progreso continuo del scroll (0 .. n-1) */
let tops = [];
const measure = () => { tops = sections.map((s) => s.offsetTop); };
addEventListener("resize", measure); addEventListener("load", measure); measure();

function progress() {
  const y = scrollY;
  let i = 0;
  for (; i < tops.length - 1; i++) if (y < tops[i + 1]) break;
  const a = tops[i];
  const b = i < tops.length - 1 ? tops[i + 1] : a + sections[i].offsetHeight;
  return Math.min(tops.length - 1, i + Math.max(0, Math.min(1, (y - a) / Math.max(1, b - a))));
}

/* ================= MATERIA 3D (Three.js) ================= */
async function initGL() {
  const THREE = await import("three");
  const canvas = $("#gl");
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.setClearColor(0x000000, 0);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.z = 6;

  const noise = `
    vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
    vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
    vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
    float snoise(vec3 v){
      const vec2 C=vec2(1.0/6.0,1.0/3.0); const vec4 D=vec4(0.0,0.5,1.0,2.0);
      vec3 i=floor(v+dot(v,C.yyy)); vec3 x0=v-i+dot(i,C.xxx);
      vec3 g=step(x0.yzx,x0.xyz); vec3 l=1.0-g; vec3 i1=min(g.xyz,l.zxy); vec3 i2=max(g.xyz,l.zxy);
      vec3 x1=x0-i1+C.xxx; vec3 x2=x0-i2+C.yyy; vec3 x3=x0-D.yyy;
      i=mod289(i);
      vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
      float n_=0.142857142857; vec3 ns=n_*D.wyz-D.xzx;
      vec4 j=p-49.0*floor(p*ns.z*ns.z); vec4 x_=floor(j*ns.z); vec4 y_=floor(j-7.0*x_);
      vec4 x=x_*ns.x+ns.yyyy; vec4 y=y_*ns.x+ns.yyyy; vec4 h=1.0-abs(x)-abs(y);
      vec4 b0=vec4(x.xy,y.xy); vec4 b1=vec4(x.zw,y.zw);
      vec4 s0=floor(b0)*2.0+1.0; vec4 s1=floor(b1)*2.0+1.0; vec4 sh=-step(h,vec4(0.0));
      vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy; vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
      vec3 p0=vec3(a0.xy,h.x); vec3 p1=vec3(a0.zw,h.y); vec3 p2=vec3(a1.xy,h.z); vec3 p3=vec3(a1.zw,h.w);
      vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
      p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
      vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0); m=m*m;
      return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
    }`;

  const vert = `
    uniform float uTime; uniform float uAmp;
    varying vec3 vN; varying vec3 vV; varying float vD;
    ${noise}
    void main(){
      vec3 p = position;
      float d = snoise(p*0.85 + vec3(0.0,uTime*0.22,uTime*0.14)) * uAmp
              + snoise(p*2.1 - uTime*0.18) * uAmp * 0.28;
      vec3 np = p + normal * d;
      vD = d; vN = normalize(normalMatrix * normal);
      vec4 mv = modelViewMatrix * vec4(np, 1.0);
      vV = normalize(-mv.xyz);
      gl_Position = projectionMatrix * mv;
    }`;

  const fragBody = `
    uniform vec3 uC1; uniform vec3 uC2; uniform vec3 uC3; uniform float uTime; uniform float uAlpha;
    varying vec3 vN; varying vec3 vV; varying float vD;
    void main(){
      float f = pow(1.0 - abs(dot(normalize(vN), normalize(vV))), 2.0);
      float band = 0.5 + 0.5 * sin(vD * 7.0 + uTime * 0.6 + vN.y * 3.0);
      vec3 col = mix(uC1, uC2, band);
      col = mix(col, uC3, f * 0.8) + f * 0.2 * uC2;
      gl_FragColor = vec4(col, (0.26 + f * 0.65) * uAlpha);
    }`;

  const uniforms = {
    uTime: { value: 0 }, uAmp: { value: 0.5 },
    uC1: { value: new THREE.Color("#c4869f") },
    uC2: { value: new THREE.Color("#7fb4c0") },
    uC3: { value: new THREE.Color("#dccb9f") },
    uAlpha: { value: 1 },
  };

  const geo = new THREE.IcosahedronGeometry(1.6, 28);
  const solid = new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms, vertexShader: vert, fragmentShader: fragBody, transparent: true, depthWrite: false,
  }));
  const wire = new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms, vertexShader: vert, wireframe: true, transparent: true, depthWrite: false,
    fragmentShader: `uniform vec3 uC2; varying vec3 vN; void main(){ gl_FragColor = vec4(uC2, 0.1); }`,
  }));
  wire.scale.setScalar(1.015);
  const blob = new THREE.Group();
  blob.add(solid, wire);
  scene.add(blob);

  // formas flotantes (lentas, "chill")
  const mk = (g, c) => new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.38 }));
  const shapes = [
    mk(new THREE.TorusGeometry(0.5, 0.12, 12, 40), "#8fb8a4"),
    mk(new THREE.OctahedronGeometry(0.45), "#c4869f"),
    mk(new THREE.TetrahedronGeometry(0.5), "#dccb9f"),
  ];
  shapes.forEach((s) => scene.add(s));

  // partículas
  const N = 400, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 18; pos[i * 3 + 1] = (Math.random() - 0.5) * 11; pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: "#8a7db0", size: 0.035, transparent: true, opacity: 0.6 }));
  scene.add(points);

  const C = (a, b, c) => [new THREE.Color(a), new THREE.Color(b), new THREE.Color(c)];
  const STATES = [
    { x: 2.3, y: 0.15, s: 1.15, amp: 0.5, a: 0.95, pal: C("#c4869f", "#7fb4c0", "#dccb9f") },
    { x: 3.6, y: -0.2, s: 0.6, amp: 0.32, a: 0.5, pal: C("#8a7db0", "#8fb8a4", "#7fb4c0") },
    { x: 3.0, y: 0.1, s: 0.95, amp: 0.6, a: 0.8, pal: C("#7fb4c0", "#c4869f", "#8fb8a4") },
    { x: 3.5, y: 0.0, s: 0.7, amp: 0.4, a: 0.55, pal: C("#8fb8a4", "#8a7db0", "#c4869f") },
    { x: 0.0, y: -0.3, s: 1.5, amp: 0.7, a: 0.4, pal: C("#c4869f", "#dccb9f", "#8a7db0") },
  ];
  const tmp = new THREE.Color();
  const mouse = { x: 0, y: 0 }, mouseS = { x: 0, y: 0 };
  addEventListener("pointermove", (e) => { mouse.x = e.clientX / innerWidth - 0.5; mouse.y = e.clientY / innerHeight - 0.5; });

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  addEventListener("resize", resize); resize();

  let smooth = 0;
  const clock = new THREE.Clock();
  function frame() {
    // todo el movimiento va a ritmo lento
    const t = clock.getElapsedTime() * (reduced ? 0.1 : 0.45);
    const target = progress();
    smooth += (target - smooth) * 0.045;
    mouseS.x += (mouse.x - mouseS.x) * 0.03;
    mouseS.y += (mouse.y - mouseS.y) * 0.03;

    const i = Math.min(STATES.length - 2, Math.floor(smooth)), f = smooth - i;
    const A = STATES[i], B = STATES[Math.min(i + 1, STATES.length - 1)];
    const L = (a, b) => a + (b - a) * f;

    const narrow = camera.aspect < 1;
    const sMul = narrow ? 0.65 : 1;
    const xScale = narrow ? 0 : Math.min(camera.aspect / 1.78, 1.2);

    blob.position.set(L(A.x, B.x) * xScale + mouseS.x * 0.4, L(A.y, B.y) - mouseS.y * 0.3, 0);
    blob.scale.setScalar(L(A.s, B.s) * sMul);
    blob.rotation.y = t * 0.12 + smooth * 1.2;
    blob.rotation.x = smooth * 0.4 + mouseS.y * 0.2;
    uniforms.uTime.value = t;
    uniforms.uAmp.value = L(A.amp, B.amp);
    uniforms.uAlpha.value = L(A.a, B.a) * (narrow ? 0.6 : 1);
    ["uC1", "uC2", "uC3"].forEach((k, n) => uniforms[k].value.copy(A.pal[n]).lerp(tmp.copy(B.pal[n]), f));

    shapes.forEach((s, n) => {
      const ang = t * (0.14 + n * 0.05) + n * 2.1 + smooth * 0.5;
      s.position.set(Math.cos(ang) * (2.6 + n * 0.5) + blob.position.x * 0.5, Math.sin(ang * 1.3) * 1.5, Math.sin(ang) * 1.5);
      s.rotation.x = t * 0.18 + n; s.rotation.y = t * 0.24 + n * 2;
    });
    points.rotation.y = t * 0.03 + smooth * 0.15;
    points.position.y = smooth * 0.3;

    document.documentElement.style.setProperty("--hero", Math.max(0, 1 - smooth).toFixed(3));

    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }
  frame();
}

initGL().catch((err) => {
  console.warn("WebGL no disponible, se muestra solo el escenario CSS.", err);
  $("#gl").remove();
  addEventListener("scroll", () => {
    document.documentElement.style.setProperty("--hero", Math.max(0, 1 - progress()).toFixed(3));
  }, { passive: true });
});
