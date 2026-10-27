(() => {
  const buttons = [...document.querySelectorAll("[data-preview-toggle]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const stop = (button) => {
    const image = button.closest("article").querySelector("[data-preview-source]");
    image.src = image.dataset.previewPoster;
    button.closest("article").classList.remove("is-preview-playing");
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Play preview";
    button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Pause/, "Play"));
  };
  const play = (button) => {
    buttons.forEach(stop);
    const image = button.closest("article").querySelector("[data-preview-source]");
    image.src = image.dataset.previewSource;
    button.closest("article").classList.add("is-preview-playing");
    button.setAttribute("aria-pressed", "true");
    button.textContent = "Pause preview";
    button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Play/, "Pause"));
  };
  buttons.forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => {
      if (button.getAttribute("aria-pressed") === "true") stop(button);
      else play(button);
    });
    const scope = button.closest("article");
    scope.querySelectorAll("[data-preview-cue]").forEach((cue) => (cue.hidden = false));
    const hoverTarget = scope.querySelector("[data-preview-hover]");
    if (hoverTarget) {
      hoverTarget.addEventListener("pointerenter", (event) => {
        if (event.pointerType === "mouse" && hoverPointer.matches && !reducedMotion.matches && !navigator.connection?.saveData) play(button);
      });
      scope.addEventListener("pointerleave", () => stop(button));
    }
  });
  reducedMotion.addEventListener("change", () => buttons.forEach(stop));
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) buttons.forEach(stop);
  });
})();
