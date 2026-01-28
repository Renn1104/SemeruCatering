document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const mobileList = document.getElementById("mobileList");
    const navLinks = document.querySelectorAll(".nav-link");

    if (!menuBtn || !mobileMenu) return;

    let open = false;

    menuBtn.addEventListener("click", () => {
      open = !open;

      if (open) {
        mobileMenu.classList.remove("hidden");
        mobileMenu.classList.add("flex");
        menuBtn.textContent = "✖";
        menuBtn.style.transform = "rotate(90deg)";

        const items = mobileList.querySelectorAll("li");
        items.forEach((li, i) => {
          li.style.opacity = "0";
          li.style.transform = "translateY(-10px)";
          setTimeout(() => {
            li.style.transition = "all 0.4s ease";
            li.style.opacity = "1";
            li.style.transform = "translateY(0)";
            li.style.color = ""; 
          }, 80 * i);
        });
      } else {
        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
        menuBtn.style.transform = "rotate(0deg)";
      }
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        if (!target) return;

        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        });

        mobileMenu.classList.remove("flex");
        mobileMenu.classList.add("hidden");
        menuBtn.textContent = "☰";
        menuBtn.style.transform = "rotate(0deg)";
        open = false;
      });
    });

    navLinks.forEach((link) => {
      const underline = link.querySelector("span");

      if (underline) {
        link.addEventListener("mouseenter", () => {
          underline.style.width = "100%";
        });
        link.addEventListener("mouseleave", () => {
          if (!link.classList.contains("active")) {
            underline.style.width = "0%";
          }
        });
      }

      link.addEventListener("click", () => {
        navLinks.forEach((l) => {
          l.classList.remove("active");
          const span = l.querySelector("span");
          if (span) span.style.width = "0%";
        });
        link.classList.add("active");
        if (underline) underline.style.width = "100%";
      });
    });

    window.addEventListener("scroll", () => {
      let current = "";
      document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.offsetTop - 150;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute("id");
        }
      });

      navLinks.forEach((link) => {
        const span = link.querySelector("span");
        link.classList.remove("active");
        if (span) span.style.width = "0%";
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
          if (span) span.style.width = "100%";
        }
      });
    });
  });