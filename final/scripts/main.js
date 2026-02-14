export function initNav() {
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('show');
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('show');
      });
    });
  }
}

export function initFooter() {
  const yearSpan = document.getElementById('currentYear');
  const lastModified = document.getElementById('lastModified');

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (lastModified) {
    lastModified.textContent = `Last updated: ${document.lastModified}`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initFooter();
});
