/* WEB.EKB: общий скрипт сайта */

/*
 * Куда отправлять заявки с формы.
 *
 * provider:
 *   'web3forms' — сервис web3forms.com, работает на любом хостинге, заявки приходят на почту.
 *                 Получите бесплатный ключ на https://web3forms.com и вставьте его в web3formsKey.
 *   'netlify'   — встроенные формы Netlify (если сайт выложен на Netlify), ключ не нужен.
 *   'php'       — свой обработчик send.php на хостинге с PHP (Telegram и/или почта).
 */
const FORM_CONFIG = {
  provider: 'web3forms',
  web3formsKey: '',
  phpEndpoint: 'send.php',
  subject: 'Новая заявка с сайта WEB.EKB',
};

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const clamp = (v, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t) => 1 - Math.pow(1 - t, 3);
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/* ---------- Дверь: ключ поворачивается, створки открываются ---------- */

function initDoor() {
  const opening = document.querySelector('[data-opening]');
  if (!opening) return null;

  let top = 0;
  let travel = 1;
  let raf = 0;
  let active = false;

  const measure = () => {
    top = opening.getBoundingClientRect().top + window.scrollY;
    travel = Math.max(1, opening.offsetHeight - window.innerHeight);
  };

  const frame = () => {
    raf = 0;
    const p = clamp((window.scrollY - top) / travel);
    const turn = easeInOut(clamp((p - 0.02) / 0.3));
    const open = easeOut(clamp((p - 0.34) / 0.5));
    opening.style.setProperty('--p', p.toFixed(4));
    opening.style.setProperty('--turn', turn.toFixed(4));
    opening.style.setProperty('--open', open.toFixed(4));
    opening.classList.toggle('is-revealed', open > 0.01);
    opening.classList.toggle('is-open', open > 0.995);
  };

  const onScroll = () => {
    if (!raf) raf = requestAnimationFrame(frame);
  };
  const onResize = () => {
    measure();
    onScroll();
  };

  const enable = () => {
    active = true;
    opening.classList.add('is-animated');
    measure();
    frame();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
  };

  const disable = () => {
    active = false;
    opening.classList.remove('is-animated', 'is-open', 'is-revealed');
    ['--p', '--turn', '--open'].forEach((v) => opening.style.removeProperty(v));
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('resize', onResize);
  };

  if (reduceMotion.matches) disable();
  else enable();
  reduceMotion.addEventListener('change', (e) => (e.matches ? disable() : enable()));

  return {
    get active() { return active; },
    /* Точка прокрутки, где дверь уже открыта и видна стена работ */
    openY() {
      measure();
      return top + travel;
    },
  };
}

/* ---------- Шапка ---------- */

function initHeader(door) {
  const header = document.querySelector('[data-header]');
  if (!header) return;
  let raf = 0;
  const update = () => {
    raf = 0;
    const limit = door && door.active ? door.openY() - 90 : 24;
    header.classList.toggle('is-solid', window.scrollY > limit);
  };
  window.addEventListener('scroll', () => { if (!raf) raf = requestAnimationFrame(update); }, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------- Меню на телефоне ---------- */

function initMenu() {
  const menu = document.getElementById('menu');
  const openBtn = document.querySelector('[data-menu-open]');
  if (!menu || !openBtn || typeof menu.showModal !== 'function') return;

  openBtn.addEventListener('click', () => menu.showModal());
  menu.querySelector('[data-menu-close]')?.addEventListener('click', () => menu.close());
  menu.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => menu.close()));
  window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => {
    if (e.matches && menu.open) menu.close();
  });
}

/* ---------- Якорные ссылки ---------- */

function initAnchors(door) {
  const scrollToId = (id, push) => {
    const target = id ? document.getElementById(id) : null;
    if (!target) return false;
    const behavior = reduceMotion.matches ? 'auto' : 'smooth';
    const header = document.querySelector('[data-header]');
    const offset = header ? header.offsetHeight : 0;
    const top = id === 'raboty' && door && door.active
      ? door.openY() + 2
      : target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: Math.max(0, Math.round(top)), behavior });
    if (push) history.pushState(null, '', `#${id}`);
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
    return true;
  };

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href*="#"]');
    if (!link || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(link.href, window.location.href);
    const samePage = url.origin === window.location.origin && url.pathname === window.location.pathname;
    const id = decodeURIComponent(url.hash.slice(1));
    if (!samePage || !id) return; /* ссылка "#" или на другую страницу: обычное поведение */
    if (scrollToId(id, true)) e.preventDefault();
  });

  if (window.location.hash === '#raboty' && door && door.active) {
    window.addEventListener('load', () => scrollToId('raboty', false), { once: true });
  }
}

/* ---------- График этапов: полосы вырастают при появлении ---------- */

function initGantt() {
  const gantt = document.querySelector('[data-gantt]');
  if (!gantt || reduceMotion.matches || !('IntersectionObserver' in window)) return;
  if (gantt.getBoundingClientRect().top < window.innerHeight) return;
  gantt.classList.add('is-pre');
  const io = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    gantt.classList.remove('is-pre');
    io.disconnect();
  }, { threshold: 0.25 });
  io.observe(gantt);
}

/* ---------- Форма заявки ---------- */

function initForm() {
  const form = document.getElementById('lead-form');
  if (!form) return;
  const contact = form.closest('.contact');
  const done = document.querySelector('[data-done]');
  const status = form.querySelector('[data-status]');
  const submit = form.querySelector('[data-submit]');
  const submitLabel = form.querySelector('[data-submit-label]');
  const typeSelect = form.querySelector('#f-type');
  const fields = {
    name: form.querySelector('#f-name'),
    contact: form.querySelector('#f-contact'),
  };

  /* Кнопки «Обсудить …» в прейскуранте подставляют тип сайта */
  document.querySelectorAll('[data-pick]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const value = btn.getAttribute('data-pick');
      const option = [...typeSelect.options].find((o) => o.value === value);
      if (option) typeSelect.value = value;
    });
  });

  const setError = (input, message) => {
    const err = document.getElementById(`${input.id}-err`);
    if (message) {
      input.setAttribute('aria-invalid', 'true');
      if (err) err.textContent = message;
    } else {
      input.removeAttribute('aria-invalid');
      if (err) err.textContent = '';
    }
  };

  const validate = () => {
    const name = fields.name.value.trim();
    const reach = fields.contact.value.trim();
    const digits = reach.replace(/\D/g, '');
    const isPhone = digits.length >= 10 && digits.length <= 15 && /^[\d\s()+\-.]+$/.test(reach);
    const isTelegram = /^(@|https?:\/\/t\.me\/|t\.me\/)?[a-zA-Z][a-zA-Z0-9_]{4,31}$/.test(reach);
    let firstInvalid = null;

    if (name.length < 2) {
      setError(fields.name, 'Напишите, как к вам обращаться.');
      firstInvalid = firstInvalid || fields.name;
    } else setError(fields.name, '');

    if (!reach) {
      setError(fields.contact, 'Оставьте телефон или ник в Telegram, чтобы мы могли ответить.');
      firstInvalid = firstInvalid || fields.contact;
    } else if (!isPhone && !isTelegram) {
      setError(fields.contact, 'Проверьте номер (не меньше 10 цифр) или ник в Telegram, например @username.');
      firstInvalid = firstInvalid || fields.contact;
    } else setError(fields.contact, '');

    return firstInvalid;
  };

  Object.values(fields).forEach((input) => {
    input.addEventListener('blur', () => { if (input.hasAttribute('aria-invalid')) validate(); });
    input.addEventListener('input', () => { if (input.hasAttribute('aria-invalid')) validate(); });
  });

  const setStatus = (text, isError) => {
    status.textContent = text;
    status.classList.toggle('is-error', Boolean(isError));
  };

  const send = async (data) => {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      if (FORM_CONFIG.provider === 'netlify') {
        const res = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(data).toString(),
          signal: controller.signal,
        });
        return res.ok;
      }
      if (FORM_CONFIG.provider === 'php') {
        const res = await fetch(FORM_CONFIG.phpEndpoint, { method: 'POST', body: data, signal: controller.signal });
        const json = await res.json().catch(() => ({}));
        return res.ok && json.ok === true;
      }
      if (!FORM_CONFIG.web3formsKey) {
        console.warn('WEB.EKB: форма не подключена. Укажите web3formsKey в js/main.js (см. README.md).');
        return false;
      }
      const payload = {
        access_key: FORM_CONFIG.web3formsKey,
        subject: FORM_CONFIG.subject,
        from_name: 'Сайт WEB.EKB',
        'Имя': data.get('name'),
        'Телефон или Telegram': data.get('contact'),
        'Тип сайта': data.get('site_type') || 'Пока не знает',
        'О задаче': data.get('message') || 'не указано',
        botcheck: '',
      };
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const json = await res.json().catch(() => ({}));
      return res.ok && json.success === true;
    } catch (err) {
      return false;
    } finally {
      clearTimeout(timer);
    }
  };

  const showDone = () => {
    form.hidden = true;
    done.hidden = false;
    contact?.classList.add('is-done');
    done.focus();
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    setStatus('', false);
    const invalid = validate();
    if (invalid) {
      invalid.focus();
      return;
    }
    const data = new FormData(form);
    if (data.get('company')) { /* заполнено поле-ловушка: это бот */
      showDone();
      return;
    }

    submit.disabled = true;
    submitLabel.textContent = 'Отправляем…';
    const ok = await send(data);
    submit.disabled = false;
    submitLabel.textContent = 'Отправить заявку';

    if (ok) {
      form.reset();
      showDone();
    } else {
      setStatus('Не получилось отправить заявку. Проверьте интернет и попробуйте ещё раз через минуту.', true);
    }
  });

  document.querySelector('[data-again]')?.addEventListener('click', () => {
    done.hidden = true;
    form.hidden = false;
    contact?.classList.remove('is-done');
    fields.name.focus();
  });
}

/* ---------- Запуск ---------- */

document.querySelectorAll('[data-year]').forEach((el) => { el.textContent = String(new Date().getFullYear()); });
const door = initDoor();
initHeader(door);
initMenu();
initAnchors(door);
initGantt();
initForm();
