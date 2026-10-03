// A small amount of JavaScript for the two pages: theme, shelf, and email.
const root = document.documentElement;
const themeButtons = document.querySelectorAll('[data-theme-toggle]');

function setTheme(theme) {
  const night = theme === 'night';
  root.dataset.theme = night ? 'night' : 'day';
  themeButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(night));
    button.setAttribute('aria-label', night ? 'Switch to daytime theme' : 'Switch to after hours theme');
    button.querySelector('[data-theme-label]').textContent = night ? 'Daytime' : 'After hours';
  });
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = night ? '#171f23' : '#f2ecdf';
}

try {
  setTheme(localStorage.getItem('ryan-theme') || 'day');
} catch {
  setTheme('day');
}

themeButtons.forEach((button) => button.addEventListener('click', () => {
  const theme = root.dataset.theme === 'night' ? 'day' : 'night';
  setTheme(theme);
  try { localStorage.setItem('ryan-theme', theme); } catch { /* Theme still works in this tab. */ }
}));

const categoryButtons = [...document.querySelectorAll('[data-category]')];
const categoryPanels = [...document.querySelectorAll('[data-category-panel]')];
const categoryNames = new Set(categoryPanels.map((panel) => panel.id));

function showCategory(id) {
  if (!categoryNames.has(id)) return;
  categoryButtons.forEach((button) => button.setAttribute('aria-pressed', String(button.dataset.category === id)));
  categoryPanels.forEach((panel) => { panel.hidden = panel.id !== id; });
}

function showHashCategory() { showCategory(location.hash.slice(1)); }
showHashCategory();
window.addEventListener('hashchange', showHashCategory);
categoryButtons.forEach((button) => button.addEventListener('click', () => {
  const id = button.dataset.category;
  showCategory(id);
  history.replaceState(null, '', '#' + id);
  document.querySelector('#pick-message').textContent = '';
}));

document.querySelectorAll('[data-open-category]').forEach((link) => link.addEventListener('click', () => {
  showCategory(link.dataset.openCategory);
}));

// The gallery scrolls naturally on touch screens; the buttons help with a mouse.
const galleryTrack = document.querySelector('#gallery-track');
if (galleryTrack) {
  const slides = [...galleryTrack.querySelectorAll('.gallery-slide')];
  const previous = document.querySelector('#gallery-prev');
  const next = document.querySelector('#gallery-next');
  const count = document.querySelector('#gallery-count');
  function currentSlide() { return Math.round(galleryTrack.scrollLeft / galleryTrack.clientWidth); }
  function updateGallery() {
    const index = Math.min(slides.length - 1, Math.max(0, currentSlide()));
    count.textContent = `${String(index + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
    previous.disabled = index === 0;
    next.disabled = index === slides.length - 1;
  }
  function moveGallery(direction) {
    const index = Math.min(slides.length - 1, Math.max(0, currentSlide() + direction));
    galleryTrack.scrollTo({ left: index * galleryTrack.clientWidth, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  previous.addEventListener('click', () => moveGallery(-1));
  next.addEventListener('click', () => moveGallery(1));
  galleryTrack.addEventListener('scroll', updateGallery, { passive: true });
  window.addEventListener('resize', updateGallery);
  updateGallery();
}

const pickButton = document.querySelector('#shelf-pick');
if (pickButton) pickButton.addEventListener('click', () => {
  const cards = [...document.querySelectorAll('.media-panel .media-card')];
  const pick = cards[Math.floor(Math.random() * cards.length)];
  const panel = pick.closest('.media-panel');
  document.querySelector('.media-card--picked')?.classList.remove('media-card--picked');
  showCategory(panel.id);
  pick.classList.add('media-card--picked');
  history.replaceState(null, '', '#' + panel.id);
  const title = pick.querySelector('h3').textContent;
  document.querySelector('#pick-message').textContent = `I picked ${title} from ${panel.querySelector('h2').textContent}.`;
  pick.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'center' });
});

const copyButton = document.querySelector('#copy-email');
if (copyButton) copyButton.addEventListener('click', async () => {
  const email = document.querySelector('.contact-email').href.replace('mailto:', '');
  const status = document.querySelector('#copy-status');
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = 'Copied.';
  } catch {
    status.textContent = 'Copy did not work; you can select the email above.';
  }
});
