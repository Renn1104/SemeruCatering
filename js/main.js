document.addEventListener("DOMContentLoaded", () => {
  if (typeof initCatalog === "function") {
    initCatalog();
  }

  if (typeof initNavbar === "function") {
    initNavbar();
  }
});
