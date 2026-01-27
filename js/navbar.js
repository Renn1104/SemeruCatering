document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileList = document.getElementById("mobileList");
  const navLinks = document.querySelectorAll(".nav-link");

  if (!menuBtn || !mobileMenu) return;

  let open = false;

  // Toggle menu
  menuBtn.addEventListener("click", () => {
    open = !open;

    if (open) {
      // tampilkan menu
      mobileMenu.classList.remove("hidden");
      mobileMenu.classList.add("flex");
      menuBtn.textContent = "✖";
      menuBtn.style.transform = "rotate(90deg)";

      // animasi tiap item
      const items = mobileList.querySelectorAll("li");
      items.forEach((li, i) => {
        li.style.opacity = "0";
        li.style.transform = "translateY(-10px)";
        setTimeout(() => {
          li.style.transition = "all 0.4s ease";
          li.style.opacity = "1";
          li.style.transform = "translateY(0)";
          li.style.color = ""; // reset warna biar muncul
        }, 80 * i);
      });
    } else {
      // sembunyikan menu
      mobileMenu.classList.remove("flex");
      mobileMenu.classList.add("hidden");
      menuBtn.textContent = "☰";
      menuBtn.style.transform = "rotate(0deg)";
    }
  });

  // Scroll halus + auto close menu
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      window.scrollTo({ top: target.offsetTop - 80, behavior: "smooth" });

      mobileMenu.classList.remove("flex");
      mobileMenu.classList.add("hidden");
      menuBtn.textContent = "☰";
      menuBtn.style.transform = "rotate(0deg)";
      open = false;
    });
  });
});
