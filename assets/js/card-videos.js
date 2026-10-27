(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const hoverPointer = window.matchMedia("(hover: hover) and (pointer: fine)");
  const scopes = [...document.querySelectorAll("[data-video-scope]")];
  let active = null;

  const stop = (scope) => {
    const video = scope.querySelector("[data-card-video]");
    const button = scope.querySelector("[data-video-toggle]");
    video.pause();
    video.hidden = true;
    scope.classList.remove("is-preview-playing");
    button.setAttribute("aria-pressed", "false");
    button.textContent = "Play preview";
    button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Pause/, "Play"));
    if (active === scope) active = null;
  };
  const play = async (scope) => {
    if (active === scope) return;
    if (active) stop(active);
    active = scope;
    const video = scope.querySelector("[data-card-video]");
    const button = scope.querySelector("[data-video-toggle]");
    video.muted = true;
    if (!video.getAttribute("src")) video.src = video.dataset.videoSrc;
    try {
      await video.play();
      if (active !== scope) {
        video.pause();
        return;
      }
      video.hidden = false;
      scope.classList.add("is-preview-playing");
      button.setAttribute("aria-pressed", "true");
      button.textContent = "Pause preview";
      button.setAttribute("aria-label", button.getAttribute("aria-label").replace(/^Play/, "Pause"));
    } catch {
      // A blocked or unavailable video leaves the still and case-study link usable.
      if (active === scope) stop(scope);
    }
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting && active === target) stop(target);
    });
  });
  scopes.forEach((scope) => {
    const video = scope.querySelector("[data-card-video]");
    const button = scope.querySelector("[data-video-toggle]");
    button.hidden = false;
    scope.querySelectorAll("[data-preview-cue]").forEach((cue) => (cue.hidden = false));
    button.addEventListener("click", () => (active === scope ? stop(scope) : play(scope)));
    scope.querySelector("[data-video-hover]").addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" && hoverPointer.matches && !reducedMotion.matches && !navigator.connection?.saveData) play(scope);
    });
    scope.addEventListener("pointerleave", () => {
      if (active === scope) stop(scope);
    });
    video.addEventListener("error", () => stop(scope));
    observer.observe(scope);
  });
  const stopActive = () => {
    if (active) stop(active);
  };
  reducedMotion.addEventListener("change", stopActive);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopActive();
  });
})();
