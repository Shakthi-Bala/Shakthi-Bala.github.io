(() => {
  const gallery = document.querySelector("[data-photo-gallery]");
  const viewer = document.querySelector("[data-photo-viewer]");
  if (!gallery || !viewer || typeof viewer.showModal !== "function") return;
  const links = [...gallery.querySelectorAll("[data-photo-open]")];
  const image = viewer.querySelector("[data-photo-image]");
  let current = 0;
  const show = (index) => {
    current = (index + links.length) % links.length;
    const link = links[current];
    image.src = link.href;
    image.alt = link.querySelector("img").alt;
    viewer.querySelector("[data-photo-caption]").textContent = link.dataset.photoCaption;
    viewer.querySelector("[data-photo-position]").textContent = `${current + 1} / ${links.length}`;
  };
  links.forEach((link, index) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      show(index);
      viewer.showModal();
    });
  });
  viewer.querySelector("[data-photo-close]").addEventListener("click", () => viewer.close());
  viewer.querySelector("[data-photo-previous]").addEventListener("click", () => show(current - 1));
  viewer.querySelector("[data-photo-next]").addEventListener("click", () => show(current + 1));
  viewer.addEventListener("click", (event) => {
    if (event.target === viewer) viewer.close();
  });
  viewer.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      show(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
})();
