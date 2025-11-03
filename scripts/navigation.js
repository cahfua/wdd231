const menuBtn = document.getElementById('menu');
const nav = document.getElementById('primary-nav');


menuBtn?.addEventListener('click', () => {
const open = nav.classList.toggle('open');
menuBtn.setAttribute('aria-expanded', String(open));
});


// Wayfinding helper: add .active if href matches current pathname
const links = document.querySelectorAll('#primary-nav a');
links.forEach(a => {
if (a.getAttribute('href') && location.pathname.endsWith(a.getAttribute('href'))) {
a.classList.add('active');
a.setAttribute('aria-current', 'page');
}
});

const homeLink = document.querySelector('#primary-nav a[href="index.html"]');
if (homeLink && (location.pathname.endsWith('/') || /\/wdd231\/?$/.test(location.pathname))) {
  homeLink.classList.add('active');
  homeLink.setAttribute('aria-current', 'page');
}