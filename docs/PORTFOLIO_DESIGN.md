# Portfolio design

The October 2026 redesign uses an editorial layout: the home page introduces Shakthibala beside a real VIO experiment, then presents the six selected projects, technical notes, and personal interests. The project collection keeps all 21 projects and its existing topic filters, search, and manual preview controls. Resume remains unpublished until its content is ready. The Photography page presents the supplied collection.

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

## Photography

The photography collection is driven by `_data/photographs.yml`. The supplied JPEGs are presented with their original aspect ratios. `assets/photography/` contains responsive WebP exports at widths of 640, 1000, and 1600 pixels (plus 2400 pixels for the wide water-lily photograph), plus larger JPEGs for the viewer. Exports perform only orientation handling, resizing, and web encoding; there is no crop, retouching, or generated imagery. Original user files remain outside version control. Descriptive captions identify visible subjects without inventing locations or dates.

The native dialog supports previous/next buttons, arrow keys, Escape to close, and focus return. Without JavaScript, each photograph links directly to its larger JPEG. Photography is now included in navigation; Resume remains unpublished.

## Career interests and research entry points

`_data/career_interests.yml` records the owner's stated target roles. Home presents one concise statement; About groups the full titles into five areas and links each area to relevant work. Control roles are not listed as career targets.

`_data/research_questions.yml` supplies three questions shown on Home and reused as headings on Research. Each home-page question links to a specific case study or technical note. A direct hero link reaches this section without going through About.

Featured covers focus on a single useful panel with a readable evidence label below the image. The gap-navigation and DevResearchFlow cases now lead with native video players. Media scope and source pins are documented in [PROJECT_MEDIA.md](PROJECT_MEDIA.md).

## Experience

`_data/experience.yml` contains six owner-supplied research, teaching, and internship roles. About presents the full reverse-chronological timeline with dates, locations, concise contribution bullets, and skills. Research shows a shorter overview linking to individual role anchors. The existing Git-based project history is retained in a separate expandable section and is not presented as employment. The current PeAR Lab role is also linked from Home. Relative LinkedIn duration labels are omitted so the dates do not become stale.

## Project-card results

The six featured projects define `card_result` and `card_conditions` in their front matter. Home and Projects use these same fields so outcome text and evaluation scope stay consistent. Conditions retain details such as open-loop planning, ground-truth occupancy inputs, simulation, matched evaluations, repository-reported results, and unreported flight-success rates. The home-page evidence block remains visible without opening a case study or enabling JavaScript.

## Case-study system overviews

Each of the six featured case studies has a four-stage system overview between its project brief and demo. Native HTML keeps labels selectable and readable without JavaScript; CSS switches the horizontal flow to a vertical flow on smaller screens. Captions distinguish alternative back ends, offline training, and evaluation scope from the data flow. Keep these diagrams aligned with the implementation described in each case study.

Availability on Home and About comes from `_data/career_interests.yml`. Update the shared seeking, graduation, start, and updated fields when plans change; `updated` records the last confirmation, not the build date. An empty start field is omitted until the date is confirmed.

Featured cards on Home and Projects share concise `card_stack` metadata from project front matter and expose a direct Code link beside the case-study link. List only tools supported by that implementation. For motion-preview behavior and regeneration, see [Project media](PROJECT_MEDIA.md#mp4-previews-on-home-and-projects).

## Homepage atmosphere

The hero has two static amethyst radial gradients and a faint, repeating monochrome SVG grain tile, masked to fade at the edges. The palette is adjusted for light mode. Four decorative feature points and a short trajectory line sit above the VIO preview on desktop; they are an illustration, not estimator output, and are hidden on smaller screens. These layers are confined to Home, ignore pointer input, carry no accessible content, and have no animation or JavaScript. Forced-color mode suppresses them.

## Navigation quad

The site-specific presentation hook renders the same Home link on every page, with a small inline quadrotor beside the robotics label. Hovering or keyboard-focusing the brand link triggers a single 800 ms roll. Its reserved box contains the rotation, with no travel across navigation links or continuous propeller animation. Reduced-motion users see a static icon. The decorative SVG is hidden from assistive technology and adds no separate tab stop, image request, or JavaScript.
