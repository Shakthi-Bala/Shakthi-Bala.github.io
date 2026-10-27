(() => {
  const buttons = [...document.querySelectorAll("[data-preview-toggle]")];
  const stop = (button) => {
    const image = button.closest("article").querySelector("[data-preview-source]");
    image.src = image.dataset.previewPoster;
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Play preview";
    button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Pause/, "Play"));
  };
  buttons.forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => {
      const wasPlaying = button.getAttribute("aria-pressed") === "true";
      buttons.forEach(stop);
      if (wasPlaying) return;
      const image = button.closest("article").querySelector("[data-preview-source]");
      image.src = image.dataset.previewSource;
      button.setAttribute("aria-pressed", "true");
      button.textContent = "Pause preview";
      button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Play/, "Pause"));
    });
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) buttons.forEach(stop);
  });
})();
