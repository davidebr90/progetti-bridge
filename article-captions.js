// Didascalie a comparsa: il controllo nativo resta utilizzabile senza JavaScript.
(() => {
  const openCaptions = () => document.querySelectorAll("details.ra-caption[open]");

  document.addEventListener("click", (event) => {
    for (const caption of openCaptions()) {
      if (!caption.contains(event.target)) caption.open = false;
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const captions = [...openCaptions()];
    if (!captions.length) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    for (const caption of captions) {
      if (caption.contains(document.activeElement)) caption.querySelector("summary")?.focus();
      caption.open = false;
    }
  }, true);
})();
