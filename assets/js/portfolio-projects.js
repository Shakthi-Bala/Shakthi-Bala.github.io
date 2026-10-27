(() => {
  const root = document.querySelector("[data-project-portfolio]");
  if (!root) return;

  const cards = Array.from(root.querySelectorAll("[data-project-card]"));
  const buttons = Array.from(root.querySelectorAll("[data-project-topic]"));
  const search = root.querySelector("#project-search");
  const count = root.querySelector("[data-project-count]");
  const empty = root.querySelector("[data-project-empty]");
  let activeTopic = "all";

  const normalized = (value) => value.normalize("NFKC").toLocaleLowerCase().trim();
  const entries = cards.map((card) => ({
    card,
    topics: card.dataset.topics.split(/\s+/),
    search: normalized(card.dataset.search),
  }));

  const update = () => {
    const words = normalized(search.value).split(/\s+/).filter(Boolean);
    let visible = 0;
    entries.forEach((entry) => {
      const matchesTopic = activeTopic === "all" || entry.topics.includes(activeTopic);
      const matchesSearch = words.every((word) => entry.search.includes(word));
      entry.card.hidden = !(matchesTopic && matchesSearch);
      if (!entry.card.hidden) visible += 1;
    });
    buttons.forEach((button) => button.setAttribute("aria-pressed", String(button.dataset.projectTopic === activeTopic)));
    count.textContent = `Showing ${visible} of ${cards.length} projects`;
    empty.hidden = visible !== 0;
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      activeTopic = button.dataset.projectTopic;
      update();
    });
  });
  search.addEventListener("input", update);
  root.querySelector("[data-project-reset]").addEventListener("click", () => {
    activeTopic = "all";
    search.value = "";
    update();
    search.focus();
  });

  update();
  root.querySelector("[data-project-controls]").hidden = false;
})();
