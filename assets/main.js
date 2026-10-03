'use strict';
document.documentElement.classList.add('js');
function openChineseBiography() {
  const biography = document.getElementById('about-zh');
  if (biography && location.hash === '#about-zh') biography.open = true;
}
window.addEventListener('hashchange', openChineseBiography);
openChineseBiography();
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
if (menu && nav) {
  function closeMenu() { menu.setAttribute('aria-expanded', 'false'); nav.classList.remove('open'); }
  menu.addEventListener('click', () => {
    const open = menu.getAttribute('aria-expanded') !== 'true';
    menu.setAttribute('aria-expanded', String(open));
    nav.classList.toggle('open', open);
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      closeMenu(); menu.focus();
    }
  });
}

// The papers are present in the HTML: search is progressive enhancement only.
const search = document.getElementById('publication-search');
const category = document.getElementById('publication-category');
const year = document.getElementById('publication-year');
if (search && category && year) {
  const papers = [...document.querySelectorAll('.research-list .pub')];
  const normalize = text => text.normalize('NFKD').toLowerCase().replace(/[\u0300-\u036f]/g, '');
  function filterPapers() {
    const terms = normalize(search.value).trim().split(/\s+/).filter(Boolean);
    let visible = 0;
    papers.forEach(paper => {
      const match = terms.every(term => normalize(paper.textContent).includes(term)) &&
        (!category.value || paper.dataset.category === category.value) &&
        (!year.value || paper.dataset.year === year.value);
      paper.hidden = !match;
      if (match) visible++;
    });
    document.getElementById('publication-count').textContent = `${visible} of ${papers.length} publications`;
    document.getElementById('no-results').hidden = visible > 0;
  }
  search.addEventListener('input', filterPapers);
  category.addEventListener('change', filterPapers);
  year.addEventListener('change', filterPapers);
  filterPapers();
}
