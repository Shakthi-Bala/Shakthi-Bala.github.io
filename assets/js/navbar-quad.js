(() => {
  const navbar = document.querySelector("#navbar");
  const brand = navbar?.querySelector(".navbar-brand");
  const quad = brand?.querySelector(".brand-quad");
  if (!quad || typeof quad.animate !== "function") return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const mouseViewport = matchMedia("(min-width: 1000px) and (hover: hover) and (pointer: fine)");
  let flight = null;
  let pointer = null;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const enabled = () => mouseViewport.matches && !reducedMotion.matches && !document.hidden;
  const offset = () => {
    const transform = getComputedStyle(quad).transform;
    const matrix = new DOMMatrixReadOnly(transform === "none" ? undefined : transform);
    return { x: matrix.m41, y: matrix.m42 };
  };
  const translate = ({ x, y }) => `translate(${x}px, ${y}px)`;
  const bounds = () => {
    const position = offset();
    const box = quad.getBoundingClientRect();
    const bar = navbar.getBoundingClientRect();
    const origin = { x: box.left - position.x, y: box.top - position.y };
    const linkEdges = [...navbar.querySelectorAll(".navbar-nav a, .navbar-nav button")]
      .map((element) => element.getBoundingClientRect())
      .filter((rect) => rect.width && rect.height && rect.left > origin.x + box.width)
      .map((rect) => rect.left);
    const rightEdge = Math.min(bar.right - 12, ...linkEdges);
    return {
      x: Math.min(300, rightEdge - origin.x - box.width - 24),
      top: bar.top + 10 - origin.y,
      bottom: bar.bottom - 10 - box.height - origin.y,
      origin,
      width: box.width,
      height: box.height,
    };
  };
  const moveTo = (destination, limits, duration) => {
    const start = offset();
    if (flight) flight.cancel();
    quad.style.transform = translate(start);
    const clearance = Math.min(Math.min(start.y, destination.y) - limits.top, limits.bottom - Math.max(start.y, destination.y));
    const amplitude = Math.min(13, Math.max(0, clearance - 2));
    // A fixed S-shaped route with zero velocity and acceleration at each end.
    const frames = Array.from({ length: 49 }, (_, index) => {
      const t = index / 48;
      const progress = 6 * t ** 5 - 15 * t ** 4 + 10 * t ** 3;
      return {
        offset: t,
        transform: translate({
          x: start.x + (destination.x - start.x) * progress,
          y: clamp(start.y + (destination.y - start.y) * progress + amplitude * Math.sin(2 * Math.PI * progress), limits.top, limits.bottom),
        }),
      };
    });
    quad.classList.add("is-flying");
    const animation = quad.animate(frames, { duration, easing: "linear", fill: "forwards" });
    flight = animation;
    animation.finished
      .then(() => {
        if (flight !== animation) return;
        quad.style.transform = translate(destination);
        flight = null;
        animation.cancel();
        quad.classList.remove("is-flying");
        evade();
      })
      .catch(() => {});
  };
  const reset = (animate = false) => {
    pointer = null;
    const position = offset();
    if (animate && enabled() && Math.hypot(position.x, position.y) > 1) {
      const limits = bounds();
      if (limits.x >= 90) {
        moveTo({ x: 0, y: 0 }, limits, 500 + Math.abs(position.x) * 2);
        return;
      }
    }
    if (flight) flight.cancel();
    flight = null;
    quad.style.removeProperty("transform");
    quad.classList.remove("is-flying");
  };
  const evade = () => {
    if (flight || !pointer || !enabled() || brand.matches(":focus-visible")) return;
    const box = quad.getBoundingClientRect();
    if (Math.hypot(pointer.x - box.left - box.width / 2, pointer.y - box.top - box.height / 2) > 58) return;
    const limits = bounds();
    if (limits.x < 90 || limits.bottom < limits.top) return;
    const cursorX = pointer.x - limits.origin.x - limits.width / 2;
    const destination = { x: cursorX < limits.x / 2 ? limits.x : 0, y: clamp(0, limits.top, limits.bottom) };
    const distance = Math.abs(destination.x - offset().x);
    if (distance < 20) return;
    moveTo(destination, limits, 600 + distance * 2.4);
  };
  navbar.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !enabled()) return;
    pointer = { x: event.clientX, y: event.clientY };
    evade();
  });
  navbar.addEventListener("pointerleave", () => reset(true));
  brand.addEventListener("focus", () => reset());
  reducedMotion.addEventListener("change", () => reset());
  mouseViewport.addEventListener("change", () => reset());
  window.addEventListener("resize", () => reset());
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) reset();
  });
})();
