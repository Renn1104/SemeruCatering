// navbar.js
function initNavbar() {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const navLinks = document.querySelectorAll(".nav-link");

  // Toggle mobile menu
  menuBtn?.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  // Smooth scroll + close mobile menu
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;

      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });

      mobileMenu.classList.add("hidden");
    });
  });
}

// Active navbar on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  let current = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("text-primary", "font-semibold");

    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("text-primary", "font-semibold");
    }
  });
});
