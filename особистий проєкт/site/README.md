# ReceptAI — Landing Page

Односторінковий лендинг для **ReceptAI** — AI-адміністратора під ключ для малого бізнесу в Україні.

## Структура

```
site/
├── index.html       — Розмітка (Hero → Problem → Product → How → Demo → Pricing → FAQ → CTA → Footer)
├── style.css        — Стилі за брендбуком (Obsidian / Brunswick / Tropical Teal)
├── script.js        — Інтерактив: nav, FAQ, форма, демо-плеєр, scroll reveal
└── assets/
    ├── logo.svg     — Логотип-зірка
    └── favicon.svg  — Іконка вкладки
```

## Стек

Чистий **HTML / CSS / JS** — без фреймворків, без білд-кроку.
Хоститься як статичний сайт на будь-якому сервісі (GitHub Pages, Vercel, Netlify, Cloudflare Pages).

## Бренд

- **Кольори:** `#0A1628` фон · `#0F4F4A` первинний · `#00C9A7` акцент / CTA
- **Шрифти:** Syne (заголовки), DM Sans (тіло) — Google Fonts
- **Слоган:** _Ваш бізнес більше не пропускає жодного клієнта — AI-адміністратор працює замість вас 24/7_

## Локальний запуск

```bash
cd site
python3 -m http.server 8000
# відкрити http://localhost:8000
```

Або просто відкрити `index.html` напряму у браузері.

## TODO

- [ ] Підключити реальний бекенд для форми заявки (Make webhook або Telegram-нотифікація)
- [ ] Додати справжній номер телефону AI-агента у CTA
- [ ] Замінити демо-аудіо на реальний MP3 запис діалогу
- [ ] Додати секцію з кейсами після перших клієнтів
- [ ] Налаштувати домен receptai.com.ua + SSL
- [ ] Підключити аналітику (Plausible / GA4)
