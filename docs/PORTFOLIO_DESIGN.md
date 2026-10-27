# Portfolio design

The October 2026 redesign uses an editorial layout: the home page introduces Shakthibala beside a real VIO experiment, then presents the six selected projects, technical notes, and personal interests. The project collection keeps all 21 projects and its existing topic filters, search, and manual preview controls. Resume and Photography remain unpublished until their content is ready.

## References

These sites informed the hierarchy and presentation. Their assets and layouts were not copied.

- [Takram](https://www.takram.com/): project imagery and restrained navigation.
- [Pentagram](https://www.pentagram.com/work): a clear project index with images and captions.
- [Bartosz Ciechanowski](https://ciechanow.ski/): technical explanations alongside the evidence.
- [Brittany Chiang](https://brittanychiang.com/): direct personal writing and links to work.
- [ETH Zurich Robotic Systems Lab](https://rsl.ethz.ch/): a research reference for clearly identified work and institutional context.

## Implementation

- DM Sans and Instrument Serif are hosted in `assets/fonts/portfolio/`, together with their SIL Open Font License files. They were obtained from the official [Google Fonts repository](https://github.com/google/fonts).
- The existing dark and light palettes remain available. Jet black anchors dark mode; amethyst is used for selected text and thin rules, with cyan reserved for links and small technical details.
- `_pages/about.md`, `projects.md`, `blog.md`, and `profile.md` use the upstream default layout with site-specific content. No theme layouts or includes are shadowed.
- `assets/css/_portfolio-theme.scss` holds shared presentation. `portfolio-projects.css` styles the filterable collection; `research-content.css` styles case-study summaries and research content.
- The site presentation hook keeps the home-page navigation identity consistent with the inner pages. The upstream navigation and theme-switch behavior remain in use.
- All project media comes from the existing project artifacts. Home-page previews are static. The collection plays animations only after a visitor requests them. Reduced-motion preferences disable transitions.
- The stylesheet fingerprint includes the local Sass source, preventing visitors from receiving old CSS after a palette or layout change.

## Validation

Build with production settings, run PurgeCSS, then use `test/visual/portfolio.spec.js` against the built site. It covers the selected projects, topic filters, search, no-JavaScript fallback, preview playback, navigation, theme switching and persistence, page width, text contrast, and local fonts. Visually inspect Home, Projects, Writing, About, and a case study in both color modes and at mobile widths.
