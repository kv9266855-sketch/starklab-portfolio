# Портфоліо / Portfolio (HTML + CSS + JS, без Node.js)
Запуск: відкрийте `index.html` у браузері (шрифт Unbounded підтягується з Google Fonts).
Контент: `js/config.js` (ім'я, @telegram, ціни, проєкти, соцмережі), `js/i18n.js` (тексти UA/RU/EN).
GitHub Pages: створіть репозиторій → завантажте всі файли → Settings → Pages → Branch: main / root.
Telegram: кнопки відкривають профіль t.me/username (підстановка тексту для особистих акаунтів не гарантується).

## Бренд, соцмережі, іконки
- `js/config.js`: `name`, `brand`, `tagline`, `socials` (Discord / Instagram / TikTok / Telegram-канал — замініть заглушки-посилання на свої), `tech`, `services`.
- Логотип і фавікони: папка `img/` (logo.png, favicon.ico, favicon-32.png, apple-touch-icon.png, icon-512.png).

## 🎃 Halloween-тема + мобильная оптимизация
Файлы: `css/halloween.css` (тема, декор, анимации), `css/mobile.css` (мобильная/тач-адаптация), `js/halloween.js` (эффекты), SVG-спрайт и декор в `index.html`.
- Палитра — переменные в `:root` в начале `css/halloween.css` (`--wine` = тыквенный оранжевый, `--violet`, `--acid`).
- Настройки эффектов — объект `CFG` в начале `js/halloween.js` (дата Хэллоуина, число летучих мышей/угольков, частота молний).
- Плашка-отсчёт до 31 октября сама скрывается с 1 ноября. Тексты — ключи `hw.*` в `js/i18n.js`.
- Кнопка 🦇 внизу слева включает/выключает эффекты (сохраняется). При `prefers-reduced-motion` эффекты отключены.
- Убрать тему полностью: удалить подключения `halloween.css`, `mobile.css`, `halloween.js` и блоки-декор в `index.html`; в `main.js` нужны только правки для мобильных.
- Пасхалка: нажмите на тыкву в первом экране. 😉
