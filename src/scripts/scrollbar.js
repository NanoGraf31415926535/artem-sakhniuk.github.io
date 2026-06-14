(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if ("ontouchstart" in window) return;

  var MIN_WIDTH = 1024;

  var style = document.createElement("style");
  style.textContent =
    "#term-scrollbar{position:fixed;right:0;top:0;width:18px;height:100vh;z-index:9999;cursor:pointer;background:transparent;display:flex;flex-direction:column;align-items:center}" +
    "#term-scrollbar-top,#term-scrollbar-bot{font-family:var(--font-mono,'monospace');font-size:9px;line-height:14px;height:14px;width:18px;text-align:center;color:var(--color-text-tertiary);user-select:none;flex-shrink:0;transition:color .15s}" +
    "#term-scrollbar:hover #term-scrollbar-top,#term-scrollbar:hover #term-scrollbar-bot{color:var(--color-text-secondary)}" +
    "#term-scrollbar-track{position:relative;flex:1;width:18px;overflow:hidden}" +
    "#term-scrollbar-track::before{content:'';position:absolute;left:50%;top:0;transform:translateX(-50%);width:1px;height:100%;background:repeating-linear-gradient(to bottom,var(--color-border-light) 0px,var(--color-border-light) 3px,transparent 3px,transparent 7px);opacity:0.5;transition:opacity .2s}" +
    "#term-scrollbar:hover #term-scrollbar-track::before{opacity:0.9}" +
    "#term-scrollbar-thumb{position:absolute;left:0;width:18px;min-height:20px;background:var(--color-text-primary);opacity:0.15;cursor:grab;transition:opacity .15s;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px}" +
    "#term-scrollbar:hover #term-scrollbar-thumb{opacity:0.35}" +
    "#term-scrollbar-thumb:hover{opacity:0.6 !important}" +
    "#term-scrollbar-thumb.is-dragging{opacity:0.7 !important;cursor:grabbing}" +
    "#term-scrollbar-thumb::before,#term-scrollbar-thumb::after{content:'';display:block;width:8px;height:1px;background:var(--color-bg-main);opacity:0.7}" +
    "#term-scrollbar-thumb::after{width:5px}" +
    "#term-scrollbar-pct{position:fixed;right:22px;font-family:var(--font-mono,'monospace');font-size:9px;color:var(--color-text-tertiary);opacity:0;transition:opacity .2s;pointer-events:none;user-select:none;letter-spacing:0.03em;white-space:nowrap;background:var(--color-bg-main);padding:1px 3px;border:1px solid var(--color-border-light)}" +
    "#term-scrollbar:hover #term-scrollbar-pct{opacity:1}";

  document.head.appendChild(style);

  var bar   = document.createElement("div");  bar.id = "term-scrollbar";
  var arTop = document.createElement("div");  arTop.id = "term-scrollbar-top"; arTop.textContent = "▲";
  var track = document.createElement("div");  track.id = "term-scrollbar-track";
  var thumb = document.createElement("div");  thumb.id = "term-scrollbar-thumb";
  var arBot = document.createElement("div");  arBot.id = "term-scrollbar-bot"; arBot.textContent = "▼";
  var pct   = document.createElement("div");  pct.id = "term-scrollbar-pct";

  track.appendChild(thumb);
  bar.appendChild(arTop);
  bar.appendChild(track);
  bar.appendChild(arBot);
  bar.appendChild(pct);

  function shouldShow() { return window.innerWidth >= MIN_WIDTH; }

  function applyVisibility() {
    bar.style.display = shouldShow() ? "flex" : "none";
  }

  document.body.appendChild(bar);
  applyVisibility();

  var isDragging  = false;
  var grabOffsetY = 0;

  function update() {
    if (!shouldShow() || isDragging) return;
    var sh     = document.documentElement.scrollHeight - window.innerHeight;
    var p      = sh > 0 ? window.scrollY / sh : 0;
    var trackH = track.clientHeight;
    var thumbH = thumb.clientHeight;
    var maxTop = Math.max(0, trackH - thumbH);

    thumb.style.transform = "translateY(" + (p * maxTop) + "px)";

    var pctVal   = Math.round(p * 100);
    pct.textContent = pctVal + "%";
    var thumbTop = track.getBoundingClientRect().top + p * maxTop + thumbH / 2;
    pct.style.top = Math.max(14, Math.min(window.innerHeight - 20, thumbTop - 7)) + "px";
  }

  function updateThumbSize() {
    var ratio  = window.innerHeight / document.documentElement.scrollHeight;
    var trackH = track.clientHeight;
    var h = Math.max(20, Math.min(trackH, Math.floor(ratio * trackH)));
    thumb.style.height = h + "px";
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () { update(); ticking = false; });
      ticking = true;
    }
  }, { passive: true });

  var resizeTimer;
  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      applyVisibility();
      updateThumbSize();
      update();
    }, 100);
  });

  track.addEventListener("click", function (e) {
    if (e.target === thumb) return;
    var rect = track.getBoundingClientRect();
    var pos  = (e.clientY - rect.top) / rect.height;
    var sh   = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: pos * sh, behavior: "smooth" });
  });

  function scrollBy(px) { window.scrollBy({ top: px, behavior: "smooth" }); }
  arTop.addEventListener("click", function (e) { e.stopPropagation(); scrollBy(-120); });
  arBot.addEventListener("click", function (e) { e.stopPropagation(); scrollBy(120); });

  /* ── Drag: thumb moves instantly with the mouse ── */
  thumb.addEventListener("mousedown", function (e) {
    isDragging  = true;
    grabOffsetY = e.clientY - thumb.getBoundingClientRect().top;
    thumb.classList.add("is-dragging");
    e.preventDefault();
  });

  document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;

    var trackRect = track.getBoundingClientRect();
    var thumbH    = thumb.clientHeight;
    var trackH    = track.clientHeight;
    var maxTop    = trackH - thumbH;
    if (maxTop <= 0) return;

    var rawTop  = e.clientY - trackRect.top - grabOffsetY;
    var clamped = Math.max(0, Math.min(maxTop, rawTop));
    var p       = clamped / maxTop;

    /* Move thumb immediately — no layout round-trip */
    thumb.style.transform = "translateY(" + clamped + "px)";

    /* Update pct label */
    pct.textContent = Math.round(p * 100) + "%";
    var labelTop = trackRect.top + clamped + thumbH / 2;
    pct.style.top = Math.max(14, Math.min(window.innerHeight - 20, labelTop - 7)) + "px";

    /* Scroll page separately — guarded by isDragging so scroll event won't move thumb back */
    var sh = document.documentElement.scrollHeight - window.innerHeight;
    window.scrollTo({ top: p * sh });
  });

  document.addEventListener("mouseup", function () {
    if (!isDragging) return;
    isDragging = false;
    thumb.classList.remove("is-dragging");
    update(); /* sync to true scroll position on release */
  });

  updateThumbSize();
  update();
})();
