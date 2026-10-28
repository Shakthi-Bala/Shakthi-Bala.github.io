(() => {
  const navbar = document.querySelector("#navbar");
  const brand = navbar?.querySelector(".navbar-brand");
  const quad = brand?.querySelector(".brand-quad");
  if (!quad || typeof quad.animate !== "function") return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const mouseViewport = matchMedia("(min-width: 1000px) and (hover: hover) and (pointer: fine)");
  let flight = null;
  let lastEscape = -Infinity;
  const clamp = (value, low, high) => Math.max(low, Math.min(high, value));
  const random = (low, high) => low + Math.random() * (high - low);
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
    const control = {
      x: clamp((start.x + destination.x) / 2 + random(-50, 50), 0, limits.x),
      y: random(limits.top, limits.bottom),
    };
    const frames = Array.from({ length: 9 }, (_, index) => {
      const t = index / 8;
      return {
        offset: t,
        transform: translate({
          x: (1 - t) ** 2 * start.x + 2 * (1 - t) * t * control.x + t ** 2 * destination.x,
          y: (1 - t) ** 2 * start.y + 2 * (1 - t) * t * control.y + t ** 2 * destination.y,
        }),
      };
    });
    const animation = quad.animate(frames, { duration, easing: "cubic-bezier(0.2, 0.65, 0.3, 1)", fill: "forwards" });
    flight = animation;
    animation.finished
      .then(() => {
        if (flight !== animation) return;
        quad.style.transform = translate(destination);
        flight = null;
        animation.cancel();
      })
      .catch(() => {});
  };
  const reset = (animate = false) => {
    lastEscape = -Infinity;
    const position = offset();
    if (animate && enabled() && Math.hypot(position.x, position.y) > 1) {
      const limits = bounds();
      if (limits.x >= 90) {
        moveTo({ x: 0, y: 0 }, limits, 360);
        return;
      }
    }
    if (flight) flight.cancel();
    flight = null;
    quad.style.removeProperty("transform");
  };
  navbar.addEventListener("pointermove", (event) => {
    if (event.pointerType !== "mouse" || !enabled() || brand.matches(":focus-visible")) return;
    const now = performance.now();
    if (now - lastEscape < 180) return;
    const box = quad.getBoundingClientRect();
    if (Math.hypot(event.clientX - box.left - box.width / 2, event.clientY - box.top - box.height / 2) > 58) return;
    const limits = bounds();
    if (limits.x < 90 || limits.bottom < limits.top) return;
    const cursor = { x: event.clientX - limits.origin.x - limits.width / 2, y: event.clientY - limits.origin.y - limits.height / 2 };
    const start = offset();
    const candidates = Array.from({ length: 16 }, () => ({ x: random(0, limits.x), y: random(limits.top, limits.bottom) }));
    const distance = (point) => Math.hypot(point.x - cursor.x, point.y - cursor.y);
    const escape = candidates.find(
      (point) => distance(point) > Math.min(100, limits.x * 0.45) && Math.hypot(point.x - start.x, point.y - start.y) > Math.min(75, limits.x * 0.4)
    );
    if (!escape) return;
    lastEscape = now;
    moveTo(escape, limits, random(430, 600));
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
