// Paged viewer for the CV: one page at a time, turned with the buttons or the
// arrow keys. Plain <embed> would scroll instead, which is what we are avoiding.
//
// No front matter, so Jekyll copies this file through without touching it.

const PDFJS_VERSION = "5.4.149";
const CDN = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS_VERSION}`;

const viewer = document.getElementById("cv-viewer");
const fallback = document.getElementById("cv-fallback");

if (viewer) {
  const canvas = document.getElementById("cv-canvas");
  const info = document.getElementById("cv-pageinfo");
  const prevBtn = document.getElementById("cv-prev");
  const nextBtn = document.getElementById("cv-next");
  const ctx = canvas.getContext("2d", { alpha: false });

  let pdf = null;
  let pageNumber = 1;
  let rendering = false;
  let queued = null;

  async function render(n) {
    if (!pdf) return;
    if (rendering) { queued = n; return; }
    rendering = true;

    const page = await pdf.getPage(n);

    // Fit the page to the column, and draw at device resolution so it stays
    // sharp on retina screens.
    const unscaled = page.getViewport({ scale: 1 });
    const available = viewer.clientWidth || unscaled.width;
    const dpr = window.devicePixelRatio || 1;
    const viewport = page.getViewport({ scale: available / unscaled.width });

    canvas.width = Math.floor(viewport.width * dpr);
    canvas.height = Math.floor(viewport.height * dpr);
    canvas.style.width = "100%";
    canvas.style.height = "auto";

    await page.render({
      canvasContext: ctx,
      viewport,
      transform: dpr === 1 ? null : [dpr, 0, 0, dpr, 0, 0],
    }).promise;

    info.textContent = `Page ${n} of ${pdf.numPages}`;
    prevBtn.disabled = n <= 1;
    nextBtn.disabled = n >= pdf.numPages;

    rendering = false;
    if (queued !== null) {
      const next = queued;
      queued = null;
      render(next);
    }
  }

  function go(delta) {
    if (!pdf) return;
    const target = Math.min(Math.max(pageNumber + delta, 1), pdf.numPages);
    if (target !== pageNumber) {
      pageNumber = target;
      render(pageNumber);
    }
  }

  async function start() {
    const pdfjsLib = await import(`${CDN}/pdf.min.mjs`);
    pdfjsLib.GlobalWorkerOptions.workerSrc = `${CDN}/pdf.worker.min.mjs`;

    pdf = await pdfjsLib.getDocument(viewer.dataset.pdf).promise;

    viewer.hidden = false;
    if (fallback) fallback.hidden = true;

    await render(pageNumber);

    prevBtn.addEventListener("click", () => go(-1));
    nextBtn.addEventListener("click", () => go(1));

    document.addEventListener("keydown", (e) => {
      if (e.target.matches("input, textarea")) return;
      if (e.key === "ArrowLeft") { go(-1); }
      else if (e.key === "ArrowRight") { go(1); }
      else { return; }
      e.preventDefault();
    });

    // Re-render on resize so the page keeps filling the column.
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => render(pageNumber), 150);
    });
  }

  start().catch((err) => {
    console.error("CV viewer failed:", err);
    viewer.hidden = true;
    if (fallback) {
      fallback.hidden = false;
      fallback.textContent = "";
      const link = document.createElement("a");
      link.href = viewer.dataset.pdf;
      link.textContent = "Open the CV as a PDF";
      fallback.append("The inline viewer could not load. ", link, ".");
    }
  });
}
