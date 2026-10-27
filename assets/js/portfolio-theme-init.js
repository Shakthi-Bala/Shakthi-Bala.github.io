// Run before the theme initializes. A saved visitor choice takes precedence.
try {
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "dark");
} catch {
  // The stylesheet's dark fallback still works when storage is unavailable.
}
