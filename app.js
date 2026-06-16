// =============================================
// OPEN BLOCK FROM VIDEO LINKS
// =============================================
function openBlock(blockId) {
  const block = document.getElementById(blockId);
  if (!block) return;
  const body  = block.querySelector(".cb-body");
  const btn   = block.querySelector(".cb-toggle");
  if (body && !body.classList.contains("open")) {
    body.classList.add("open");
    block.classList.add("open");
    if (btn) btn.textContent = "Collapse ↑";
  }
  setTimeout(() => block.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
}

// =============================================
// TERMINAL ANIMATION
// =============================================
const outputs = [
  { id: "o1", text: "  ✓ Server running on http://localhost:3000",   delay: 1500 },
  { id: "o2", text: "  ✓ Connected to MongoDB (:27017)",             delay: 2100 },
  { id: "o3", text: "  ✓ Event Loop: non-blocking I/O ready",        delay: 2700 },
  { id: "o4", text: "  ✓ Cluster: 8 workers spawned (8 CPUs)",       delay: 3300 },
  { id: "o5", text: "  ⚡ Ready to handle 10,000+ connections",      delay: 3900 },
];
outputs.forEach(({ id, text, delay }) => {
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) { el.textContent = text; el.classList.add("vis"); }
  }, delay);
});

// =============================================
// CONCEPT BLOCK TOGGLE
// =============================================
function toggle(btn) {
  const block  = btn.closest(".concept-block");
  const body   = block.querySelector(".cb-body");
  const isOpen = body.classList.contains("open");

  // Close all
  document.querySelectorAll(".cb-body.open").forEach(b => {
    b.classList.remove("open");
    b.closest(".concept-block").classList.remove("open");
    b.closest(".concept-block").querySelector(".cb-toggle").textContent = "Expand ↓";
  });

  if (!isOpen) {
    body.classList.add("open");
    block.classList.add("open");
    btn.textContent = "Collapse ↑";
    setTimeout(() => block.scrollIntoView({ behavior: "smooth", block: "nearest" }), 60);
  }
}

// =============================================
// CODE TAB SWITCHING
// =============================================
function switchTab(btn, panelId) {
  const wrap = btn.closest(".cb-code-wrap");

  // Deactivate all tabs and panels in this section
  wrap.querySelectorAll(".ctab").forEach(t => t.classList.remove("active"));
  wrap.querySelectorAll(".code-panel").forEach(p => p.classList.remove("active"));

  btn.classList.add("active");
  const panel = document.getElementById("tab-" + panelId);
  if (panel) panel.classList.add("active");
}

// =============================================
// INTERVIEW Q ACCORDION
// =============================================
document.addEventListener("click", e => {
  const q = e.target.closest(".iq-q");
  if (!q) return;
  const iq = q.closest(".iq");
  const isOpen = iq.classList.contains("open");
  // Close all in parent
  iq.closest(".iq-list").querySelectorAll(".iq.open").forEach(i => i.classList.remove("open"));
  if (!isOpen) iq.classList.add("open");
});

// Also open concept blocks on header click
document.querySelectorAll(".cb-header").forEach(header => {
  header.addEventListener("click", e => {
    if (e.target.classList.contains("cb-toggle")) return; // handled by toggle()
    const btn = header.querySelector(".cb-toggle");
    if (btn) toggle(btn);
  });
});

// =============================================
// SCROLL FADE-IN
// =============================================
const io = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add("vis"); io.unobserve(e.target); }
  }),
  { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
);

document.querySelectorAll(
  ".concept-block, .bp-card, .res-card, .arch-vis, .iqc, .cheat-sheet, .cs-item, .phase, .st-card, .video-card, .creator-banner, .playlist-callout"
).forEach(el => {
  el.classList.add("fadein");
  io.observe(el);
});

// =============================================
// ACTIVE NAV HIGHLIGHTING
// =============================================
const sections = ["basics", "intermediate", "advanced", "interview", "videos"];
const navLinks = document.querySelectorAll(".nl");

const navObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      navLinks.forEach(l => l.classList.toggle(
        "nl-active",
        l.getAttribute("href") === "#" + e.target.id
      ));
    }
  });
}, { threshold: 0.25 });

sections.forEach(id => {
  const el = document.getElementById(id);
  if (el) navObs.observe(el);
});

// Add active style
const style = document.createElement("style");
style.textContent = `.nl-active { color: var(--green) !important; }`;
document.head.appendChild(style);
