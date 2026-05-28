const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".topnav a");
const sections = document.querySelectorAll("main section[id]");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function showAllReveals() {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}

function initRevealObserver() {
  if (prefersReducedMotion.matches || !("IntersectionObserver" in window)) {
    showAllReveals();
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach((item) => observer.observe(item));
}

function setActiveNav() {
  const scrollPosition = window.scrollY + window.innerHeight * 0.28;
  let currentId = "";

  sections.forEach((section) => {
    if (scrollPosition >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    const targetId = link.getAttribute("href").slice(1);
    link.classList.toggle("is-active", targetId === currentId);
  });
}

window.addEventListener("scroll", setActiveNav, { passive: true });
window.addEventListener("load", () => {
  initRevealObserver();
  setActiveNav();
});
