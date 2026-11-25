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
    g.gain.setValueAtTime(0.04, audio.currentTime);
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

/* ================= PROYECTOS / SKILLS ================= */
const PROJECTS = window.PROJECTS || [];
const SKILLS = window.SKILLS || {};
const filters = $("#filters"), grid = $("#projects");
const cats = ["Todos", ...new Set(PROJECTS.map((p) => p.categoria))];
let activeCat = "Todos";

function renderFilters() {
  filters.innerHTML = "";
  cats.forEach((c) => {
    const b = document.createElement("button");
    b.className = "chip" + (c === activeCat ? " active" : "");
    b.textContent = c.toUpperCase();
    b.onclick = () => { activeCat = c; blip(660); renderFilters(); renderProjects(); };
    filters.appendChild(b);
  });
}

function renderProjects() {
  grid.innerHTML = "";
  PROJECTS.filter((p) => activeCat === "Todos" || p.categoria === activeCat).forEach((p, i) => {
    const a = document.createElement("a");
    a.className = "card win";
    a.href = p.enlace || "#";
    if (p.enlace && p.enlace !== "#") { a.target = "_blank"; a.rel = "noopener"; }
    const thumb = p.imagen
      ? `<img src="${esc(p.imagen)}" alt="${esc(p.titulo)}" loading="lazy" />`
      : `<div class="ph">${esc(p.titulo)}</div>`;
    a.innerHTML = `
      <div class="tb"><span>${esc(p.categoria.toLowerCase())}_${String(i + 1).padStart(2, "0")}.exe</span><em>_ □ ✕</em></div>
      <div class="wb">
        <div class="thumb">${thumb}</div>
        <div class="meta"><span>${esc(p.categoria.toUpperCase())}</span><span>${esc(p.anio)}</span></div>
        <h3>${esc(p.titulo)}</h3>
        <p>${esc(p.descripcion)}</p>
        <div class="tags">${(p.tags || []).map((t) => `<span>${esc(t)}</span>`).join("")}</div>
      </div>`;
    // tilt 3D
    a.addEventListener("pointermove", (e) => {
      const r = a.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      a.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateZ(6px)`;
    });
    a.addEventListener("pointerleave", () => { a.style.transform = ""; });
    grid.appendChild(a);
    setTimeout(() => a.classList.add("in"), 70 * i);
  });
}
renderFilters(); renderProjects();

$("#skills-list").innerHTML = Object.entries(SKILLS).map(([k, v]) => `
  <article class="win">
    <div class="tb"><span>${esc(k.toLowerCase())}.dll</span><em>_ □ ✕</em></div>
    <div class="wb"><h4>${esc(k.toUpperCase())}</h4><ul>${v.map((s) => `<li>${esc(s)}</li>`).join("")}</ul></div>
  </article>`).join("");

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
      col = mix(col, uC3, f * 0.85) + f * 0.35 * uC2;
      gl_FragColor = vec4(col, (0.28 + f * 0.72) * uAlpha);
    }`;

  const uniforms = {
    uTime: { value: 0 }, uAmp: { value: 0.5 },
    uC1: { value: new THREE.Color("#ff71ce") },
    uC2: { value: new THREE.Color("#01cdfe") },
    uC3: { value: new THREE.Color("#fffb96") },
    uAlpha: { value: 1 },
  };

  const geo = new THREE.IcosahedronGeometry(1.6, 28);
  const solid = new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms, vertexShader: vert, fragmentShader: fragBody, transparent: true, depthWrite: false,
  }));
  const wire = new THREE.Mesh(geo, new THREE.ShaderMaterial({
    uniforms, vertexShader: vert, wireframe: true, transparent: true, depthWrite: false,
    fragmentShader: `uniform vec3 uC2; varying vec3 vN; void main(){ gl_FragColor = vec4(uC2, 0.14); }`,
  }));
  wire.scale.setScalar(1.015);
  const blob = new THREE.Group();
  blob.add(solid, wire);
  scene.add(blob);

  // formas flotantes
  const mk = (g, c) => new THREE.Mesh(g, new THREE.MeshBasicMaterial({ color: c, wireframe: true, transparent: true, opacity: 0.55 }));
  const shapes = [
    mk(new THREE.TorusGeometry(0.5, 0.12, 12, 40), "#05ffa1"),
    mk(new THREE.OctahedronGeometry(0.45), "#ff71ce"),
    mk(new THREE.TetrahedronGeometry(0.5), "#fffb96"),
  ];
  shapes.forEach((s) => scene.add(s));

  // partículas
  const N = 500, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) { pos[i * 3] = (Math.random() - 0.5) * 18; pos[i * 3 + 1] = (Math.random() - 0.5) * 11; pos[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  const points = new THREE.Points(pg, new THREE.PointsMaterial({ color: "#b967ff", size: 0.04, transparent: true, opacity: 0.8 }));
  scene.add(points);

  // estados por sección: posición, escala, amplitud, alpha, paleta
  const C = (a, b, c) => [new THREE.Color(a), new THREE.Color(b), new THREE.Color(c)];
  const STATES = [
    { x: 2.3, y: 0.15, s: 1.15, amp: 0.55, a: 1.0, pal: C("#ff71ce", "#01cdfe", "#fffb96") },
    { x: 3.6, y: -0.2, s: 0.6, amp: 0.35, a: 0.55, pal: C("#b967ff", "#05ffa1", "#01cdfe") },
    { x: 3.0, y: 0.1, s: 0.95, amp: 0.7, a: 0.85, pal: C("#01cdfe", "#ff71ce", "#05ffa1") },
    { x: 3.5, y: 0.0, s: 0.7, amp: 0.45, a: 0.6, pal: C("#05ffa1", "#b967ff", "#ff71ce") },
    { x: 0.0, y: -0.3, s: 1.5, amp: 0.8, a: 0.45, pal: C("#ff71ce", "#fffb96", "#b967ff") },
  ];
  const tmp = new THREE.Color();
  const mouse = { x: 0, y: 0 };
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
    const t = clock.getElapsedTime() * (reduced ? 0.2 : 1);
    const target = progress();
    smooth += (target - smooth) * 0.07;
    const i = Math.min(STATES.length - 2, Math.floor(smooth)), f = smooth - i;
    const A = STATES[i], B = STATES[Math.min(i + 1, STATES.length - 1)];
    const L = (a, b) => a + (b - a) * f;

    const narrow = camera.aspect < 1;
    const sMul = narrow ? 0.65 : 1;
    const xScale = narrow ? 0 : Math.min(camera.aspect / 1.78, 1.2);

    blob.position.set(L(A.x, B.x) * xScale + mouse.x * 0.5, L(A.y, B.y) - mouse.y * 0.4, 0);
    blob.scale.setScalar(L(A.s, B.s) * sMul);
    blob.rotation.y = t * 0.12 + smooth * 1.4;
    blob.rotation.x = smooth * 0.5 + mouse.y * 0.3;
    uniforms.uTime.value = t;
    uniforms.uAmp.value = L(A.amp, B.amp);
    uniforms.uAlpha.value = L(A.a, B.a) * (narrow ? 0.6 : 1);
    ["uC1", "uC2", "uC3"].forEach((k, n) => uniforms[k].value.copy(A.pal[n]).lerp(tmp.copy(B.pal[n]), f));

    shapes.forEach((s, n) => {
      const ang = t * (0.25 + n * 0.1) + n * 2.1 + smooth * 0.8;
      s.position.set(Math.cos(ang) * (2.6 + n * 0.5) + blob.position.x * 0.5, Math.sin(ang * 1.3) * 1.6, Math.sin(ang) * 1.5);
      s.rotation.x += 0.01; s.rotation.y += 0.014;
    });
    points.rotation.y = t * 0.02 + smooth * 0.2;
    points.position.y = smooth * 0.35;

    // el escenario CSS se atenúa fuera del inicio
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
