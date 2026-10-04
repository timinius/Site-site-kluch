/* WEB.EKB: страница работ — фильтр и просмотр */

(() => {
  const gallery = document.querySelector('[data-gallery]');
  if (!gallery) return;

  const items = [...gallery.querySelectorAll('.gallery__item')];
  const chips = [...document.querySelectorAll('[data-filter]')];

  /* ---------- Фильтр ---------- */

  const applyFilter = (filter, updateUrl) => {
    chips.forEach((chip) => chip.setAttribute('aria-pressed', String(chip.dataset.filter === filter)));
    items.forEach((item) => {
      const tags = item.dataset.tags.split(' ');
      item.hidden = filter !== 'all' && !tags.includes(filter);
    });
    if (updateUrl) {
      const url = new URL(window.location.href);
      if (filter === 'all') url.searchParams.delete('type');
      else url.searchParams.set('type', filter);
      history.replaceState(null, '', url);
    }
  };

  chips.forEach((chip) => chip.addEventListener('click', () => applyFilter(chip.dataset.filter, true)));

  const initial = new URLSearchParams(window.location.search).get('type');
  if (initial && chips.some((c) => c.dataset.filter === initial)) applyFilter(initial, false);

  /* ---------- Лайтбокс ---------- */

  const box = document.getElementById('lightbox');
  if (!box || typeof box.showModal !== 'function') return;
  const img = box.querySelector('[data-lb-img]');
  const cap = box.querySelector('[data-lb-cap]');
  const count = box.querySelector('[data-lb-count]');
  const stage = box.querySelector('[data-lb-stage]');
  let list = [];
  let index = 0;
  let opener = null;

  const visible = () => items.filter((item) => !item.hidden);

  const preload = (i) => {
    const item = list[(i + list.length) % list.length];
    if (item) new Image().src = item.querySelector('[data-full]').dataset.full;
  };

  const show = (i) => {
    index = (i + list.length) % list.length;
    const item = list[index];
    const btn = item.querySelector('[data-full]');
    const thumb = item.querySelector('img');
    img.src = btn.dataset.full;
    img.width = Number(btn.dataset.w);
    img.height = Number(btn.dataset.h);
    img.alt = thumb.alt;
    cap.textContent = [...item.querySelectorAll('figcaption > span')].map((s) => s.textContent.trim()).join(' · ');
    count.textContent = `${index + 1} / ${list.length}`;
    preload(index + 1);
    preload(index - 1);
  };

  gallery.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-full]');
    if (!btn) return;
    list = visible();
    opener = btn;
    show(list.indexOf(btn.closest('.gallery__item')));
    box.showModal();
  });

  box.querySelector('[data-lb-close]').addEventListener('click', () => box.close());
  box.querySelector('[data-lb-prev]').addEventListener('click', () => show(index - 1));
  box.querySelector('[data-lb-next]').addEventListener('click', () => show(index + 1));
  box.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') show(index - 1);
    if (e.key === 'ArrowRight') show(index + 1);
  });
  /* Клик по тёмному полю вокруг картинки закрывает просмотр */
  stage.addEventListener('click', (e) => { if (e.target === stage) box.close(); });
  const blank = img.getAttribute('src');
  box.addEventListener('close', () => {
    img.src = blank;
    opener?.focus();
  });

  /* Свайп на телефоне */
  let startX = null;
  stage.addEventListener('pointerdown', (e) => { startX = e.clientX; });
  stage.addEventListener('pointerup', (e) => {
    if (startX === null) return;
    const dx = e.clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) show(index + (dx < 0 ? 1 : -1));
  });
})();
