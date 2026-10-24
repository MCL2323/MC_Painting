(() => {
  const $ = (id) => document.getElementById(id);
  const root = document.documentElement;
  const gallery = $("gallery");
  const viewer = $("viewer");
  const viewerImg = $("viewerImg");
  let current = 0;
  let lastFocus = null;

  // --- Textes de l'interface ---
  const TEXTES = {
    fr: {
      pageTitle: "Matthieu Clauet — Peintures",
      description: "Galerie des peintures de Matthieu Clauet.",
      subtitle: "Peintures",
      rights: "Tous droits réservés.",
      legal: "Les œuvres et photographies présentées sur ce site sont protégées par le droit d'auteur. Toute reproduction, diffusion ou utilisation, totale ou partielle, sans l'autorisation écrite de l'artiste est interdite.",
      light: "Clair",
      dark: "Sombre",
      themeAria: "Changer de thème clair / sombre",
      viewer: "Visionneuse",
      close: "Fermer",
      prev: "Peinture précédente",
      next: "Peinture suivante",
      see: "Voir",
      untitled: "Œuvre n°",
    },
    en: {
      pageTitle: "Matthieu Clauet — Paintings",
      description: "Gallery of paintings by Matthieu Clauet.",
      subtitle: "Paintings",
      rights: "All rights reserved.",
      legal: "The works and photographs on this site are protected by copyright. Any reproduction, distribution or use, in whole or in part, without the artist's written permission is prohibited.",
      light: "Light",
      dark: "Dark",
      themeAria: "Switch between light and dark theme",
      viewer: "Viewer",
      close: "Close",
      prev: "Previous painting",
      next: "Next painting",
      see: "View",
      untitled: "Work no.",
    },
  };
  let lang = root.lang === "en" ? "en" : "fr";
  const t = (k) => TEXTES[lang][k];

  $("year").textContent = new Date().getFullYear();

  // Champ d'une œuvre dans la langue choisie (repli sur le français)
  const champ = (o, k) => (lang === "en" && o[k + "_en"] !== undefined ? o[k + "_en"] : o[k]) || "";
  const meta = (o) => [champ(o, "technique"), champ(o, "dimensions"), o.annee].filter(Boolean).join(" · ");
  const label = (o, i) => champ(o, "titre") || `${t("untitled")} ${i + 1}`;

  // --- Galerie ---
  function renderGallery() {
    gallery.innerHTML = "";
    OEUVRES.forEach((o, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.className = "tile";
      btn.type = "button";
      btn.setAttribute("aria-label", `${t("see")} ${label(o, i)}`);

      const wrap = document.createElement("div");
      wrap.className = "tile-img";
      const img = document.createElement("img");
      img.src = `images/thumbs/${o.fichier}`;
      img.alt = `${label(o, i)} — ${ARTISTE}`;
      img.loading = "lazy";
      img.draggable = false;
      img.addEventListener("load", () => img.classList.add("loaded"));
      if (img.complete) img.classList.add("loaded");
      wrap.appendChild(img);
      btn.appendChild(wrap);

      const titre = champ(o, "titre");
      if (titre || meta(o)) {
        const info = document.createElement("div");
        info.className = "tile-info";
        if (titre) {
          const p = document.createElement("p");
          p.className = "tile-title";
          p.textContent = titre;
          info.appendChild(p);
        }
        if (meta(o)) {
          const p = document.createElement("p");
          p.className = "tile-meta";
          p.textContent = meta(o);
          info.appendChild(p);
        }
        btn.appendChild(info);
      }

      btn.addEventListener("click", () => open(i));
      li.appendChild(btn);
      gallery.appendChild(li);
    });
  }

  // --- Visionneuse ---
  function caption() {
    const o = OEUVRES[current];
    viewerImg.alt = `${label(o, current)} — ${ARTISTE}`;
    $("capTitle").textContent = champ(o, "titre");
    $("capMeta").textContent = meta(o);
  }

  function show(i) {
    current = (i + OEUVRES.length) % OEUVRES.length;
    const o = OEUVRES[current];
    viewerImg.classList.add("switching");
    const next = new Image();
    const wanted = current;
    next.onload = next.onerror = () => {
      if (wanted !== current) return; // une image plus récente a été demandée
      viewerImg.src = next.src;
      viewerImg.classList.remove("switching");
    };
    next.src = `images/full/${o.fichier}`;
    $("counter").textContent = `${current + 1} / ${OEUVRES.length}`;
    caption();
    history.replaceState(null, "", `#${current + 1}`);
    // Précharge les voisines pour une navigation fluide
    [current - 1, current + 1].forEach((k) => {
      const n = OEUVRES[(k + OEUVRES.length) % OEUVRES.length];
      new Image().src = `images/full/${n.fichier}`;
    });
  }

  function open(i) {
    lastFocus = document.activeElement;
    viewer.hidden = false;
    document.body.style.overflow = "hidden";
    show(i);
    $("closeBtn").focus();
  }

  function close() {
    viewer.hidden = true;
    document.body.style.overflow = "";
    history.replaceState(null, "", location.pathname + location.search);
    if (lastFocus) lastFocus.focus();
  }

  $("prevBtn").addEventListener("click", () => show(current - 1));
  $("nextBtn").addEventListener("click", () => show(current + 1));
  $("closeBtn").addEventListener("click", close);
  $("stage").addEventListener("click", (e) => { if (e.target.id === "stage") close(); });

  document.addEventListener("keydown", (e) => {
    if (viewer.hidden) return;
    if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "Escape") close();
  });

  // Balayage gauche / droite sur smartphone
  let startX = null, startY = null;
  $("stage").addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX; startY = e.touches[0].clientY;
  }, { passive: true });
  $("stage").addEventListener("touchend", (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) show(current + (dx < 0 ? 1 : -1));
    startX = null;
  });

  // Protection légère : pas de clic droit ni de glisser-déposer sur les images
  document.addEventListener("contextmenu", (e) => { if (e.target.tagName === "IMG") e.preventDefault(); });
  document.addEventListener("dragstart", (e) => { if (e.target.tagName === "IMG") e.preventDefault(); });

  // --- Thème clair / sombre ---
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = () => root.dataset.theme ? root.dataset.theme === "dark" : media.matches;
  const updateThemeLabel = () => { $("themeLabel").textContent = isDark() ? t("light") : t("dark"); };
  $("themeToggle").addEventListener("click", () => {
    const th = isDark() ? "light" : "dark";
    root.dataset.theme = th;
    try { localStorage.setItem("theme", th); } catch (e) {}
    updateThemeLabel();
  });
  media.addEventListener("change", updateThemeLabel);

  // --- Langue ---
  function applyLang(l) {
    lang = l;
    root.lang = l;
    document.title = t("pageTitle");
    document.querySelector('meta[name="description"]').content = t("description");
    document.querySelectorAll("[data-i18n]").forEach((el) => { el.textContent = t(el.dataset.i18n); });
    document.querySelectorAll("[data-lang]").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === l));
    $("themeToggle").setAttribute("aria-label", t("themeAria"));
    viewer.setAttribute("aria-label", t("viewer"));
    $("closeBtn").setAttribute("aria-label", t("close"));
    $("prevBtn").setAttribute("aria-label", t("prev"));
    $("nextBtn").setAttribute("aria-label", t("next"));
    updateThemeLabel();
    renderGallery();
    if (!viewer.hidden) caption();
  }
  document.querySelectorAll("[data-lang]").forEach((b) => b.addEventListener("click", () => {
    try { localStorage.setItem("lang", b.dataset.lang); } catch (e) {}
    applyLang(b.dataset.lang);
  }));
  applyLang(lang);

  // Ouvre directement une œuvre si l'adresse contient #numéro
  const fromHash = parseInt(location.hash.slice(1), 10);
  if (fromHash >= 1 && fromHash <= OEUVRES.length) open(fromHash - 1);
})();
