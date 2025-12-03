// scripts/navigation.mjs

document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.querySelector("#menu");
  const nav = document.querySelector("#primary-nav");

  if (!menuBtn || !nav) return;

  menuBtn.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("open");
    menuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  // Close menu when a link is clicked (for small screens)
  nav.addEventListener("click", (e) => {
    if (e.target.matches("a")) {
      nav.classList.remove("open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  });
});
