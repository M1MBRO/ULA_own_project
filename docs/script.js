/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ReceptAI — Landing scripts v2
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

(() => {
  'use strict';

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // i18n
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const DICT = {
    uk: {
      'nav.problem': 'Проблема',
      'nav.how': 'Як працює',
      'nav.demo': 'Демо',
      'nav.pricing': 'Ціна',
      'nav.faq': 'FAQ',
      'nav.cta': 'Стати раннім клієнтом',

      'hero.badge': 'MVP · Перші робочі AI-адміністратори в Україні',
      'hero.title.line1': 'Голосовий AI,',
      'hero.title.line2': 'що приймає кожен дзвінок,',
      'hero.title.line3': '24/7.',
      'hero.sub': 'AI на ролі адміністратора — не заміна всього відділу, лише той, хто приймає дзвінки і веде клієнтів. Голос, Telegram, Google Sheets під ключ.',
      'hero.cta.demo': 'Спробувати демо',
      'hero.cta.lead': 'Стати раннім клієнтом',
      'hero.bullet.1': 'Без зміни вашого номера',
      'hero.bullet.2': 'Запуск до 7 днів',
      'hero.bullet.3': '$500 разово (intro-ціна)',

      'call.status.idle': 'ДЕМО · СИМУЛЯЦІЯ ДЗВІНКА',
      'call.status.live': 'ДЗВІНОК АКТИВНИЙ',
      'call.status.end': 'ДЗВІНОК ЗАВЕРШЕНО',
      'call.from': 'Вхідний від:',
      'call.role': 'AI-адміністратор · Демо',
      'call.hint': 'Натисніть кнопку — стартує симуляція реального діалогу',
      'call.cta': 'Натисніть, щоб старт',
      'call.cta.live': 'Завершити',

      'tech.label': 'Побудовано на:',

      'm.calls': 'Прийнятих дзвінків',
      'm.latency': 'Затримка відповіді',
      'm.uptime': 'Без вихідних і обіду',
      'm.days': 'Днів до запуску',
      'm.price': 'Разовий платіж',

      'problem.title.1': 'Малий бізнес втрачає клієнтів',
      'problem.title.2': 'кожного дня. Без винятків.',
      'p1.title': 'Пропущені дзвінки',
      'p1.desc': 'Адміністратор зайнятий, на обіді, на лікарняному. Клієнт дзвонить — ніхто не відповідає — йде до конкурента в наступні 2 хвилини.',
      'p1.chip': '−30% потенційних клієнтів',
      'p2.title': 'Повільний месенджер',
      'p2.desc': 'Клієнт пише о 21:00. Власник побачить о 9:00. До того моменту клієнт вже забронював деінде.',
      'p2.chip': '−40% нічних заявок',
      'p3.title': 'Людський фактор',
      'p3.desc': 'Адмін хворіє. Звільняється. Забуває записати. Бізнес залежить від однієї людини, яка не завжди на місці.',
      'p3.chip': 'Точка відмови',
      'p4.title': 'Висока вартість',
      'p4.desc': 'Живий адмін — $300–800/міс. На малий бізнес з 5–15 клієнтами на день — чверть прибутку йде на одну ставку.',
      'p4.chip': '$3,600–9,600/рік',

      'forwho.title.1': 'Будь-який бізнес,',
      'forwho.title.2': 'де є адміністратор.',
      'forwho.lead': 'Якщо у вас є телефонна лінія і клієнти телефонують або пишуть — ReceptAI підійде. Без винятків.',
      'forwho.1': 'Салони краси', 'forwho.2': 'Барбершопи', 'forwho.3': 'Стоматології', 'forwho.4': 'Клініки',
      'forwho.5': 'Фітнес-клуби', 'forwho.6': 'Йога-студії', 'forwho.7': 'СТО', 'forwho.8': 'Автосервіси',
      'forwho.9': 'Ресторани', 'forwho.10': 'Кав\'ярні', 'forwho.11': 'Репетитори', 'forwho.12': 'Дитячі гуртки',
      'forwho.13': 'Майстри-ФОПи', 'forwho.14': 'Сервісні центри', 'forwho.15': 'Доставка', 'forwho.16': 'Готелі',
      'forwho.more': 'будь-який інший сервісний бізнес',

      'prod.title.1': 'Одна система.',
      'prod.title.2': 'Три канали.',
      'prod.lead': 'Голос. Месенджер. Таблиця. Усі три працюють разом і фіксують усе в одному місці.',
      'prod.voice.title': 'Голосовий AI-агент',
      'prod.voice.desc': 'Відповідає на номер вашого бізнесу через переадресацію. Жодних змін з вашого боку — той самий номер, просто тепер на нього завжди відповідають.',
      'prod.voice.li1': 'Природна українська, ElevenLabs Conversational AI',
      'prod.voice.li2': 'Запис на прийом, відповіді про послуги',
      'prod.voice.li3': 'Переадресація на власника у складних кейсах',
      'prod.tg.title': 'Telegram-бот',
      'prod.tg.b1': 'Привіт! Скільки коштує?',
      'prod.tg.b2': 'Манікюр від 400 грн. Записати вас?',
      'prod.tg.b3': 'Так, на завтра 15:00',
      'prod.tg.b4': 'Записала. Ваше ім\'я?',
      'prod.tg.desc': 'Миттєві відповіді на типові питання. Кваліфікація клієнта. Передача важливих заявок власнику.',
      'prod.sh.title': 'Google Sheets',
      'prod.sh.h1': 'Клієнт', 'prod.sh.h2': 'Час', 'prod.sh.h3': 'Статус',
      'prod.sh.s1': 'записана', 'prod.sh.s2': 'передзвонити', 'prod.sh.s3': 'новий',
      'prod.sh.desc': 'Усі дзвінки і повідомлення фіксуються у вашій Google Таблиці. Один погляд — вся картина дня.',

      'lat.title.1': 'І все це із затримкою,',
      'lat.title.2': 'яку ви ледь помітите.',
      'lat.us': 'Час до першої відповіді AI',
      'lat.them': 'Живий адміністратор',
      'lat.themnote': 'Середнє після 4-го гудка',

      'how.title.1': 'Як це працює',
      'how.title.2': 'під капотом.',
      'how.s1.title': 'Клієнт дзвонить на ваш номер',
      'how.s1.desc': 'Оператор (Київстар, Лайфсел, Vodafone) переадресовує дзвінок на SIP-номер ReceptAI. Налаштовується за 10 хвилин через USSD-команду.',
      'how.s2.title': 'ElevenLabs Conversational AI',
      'how.s2.desc': 'STT слухає, LLM розуміє контекст вашого бізнесу, TTS відповідає природним голосом. Все в одному сервісі. Затримка ~1 секунда.',
      'how.s3.title': 'Make пише в Google Sheets',
      'how.s3.desc': 'Після завершення дзвінка автоматизація забирає дані і додає рядок у таблицю. Власнику — Telegram-нотифікація з підсумком.',
      'how.s4.title': 'Telegram-бот — окремий потік',
      'how.s4.desc': 'Клієнт пише — той самий LLM відповідає миттєво. Дані потрапляють у ту саму таблицю. Один контекст на всіх каналах.',

      'vl.title.1': 'Як це звучить',
      'vl.title.2': 'для різних бізнесів',
      'vl.lead': 'Голос налаштовується під вас. Ім\'я, тон, фрази, скрипти — все під ваш бренд.',
      'vl.alina.role': 'Салон краси · ж',
      'vl.mykola.role': 'СТО · ч',
      'vl.olena.role': 'Стоматологія · ж',
      'vl.taras.role': 'Фітнес-клуб · ч',
      'vl.alina.ctx': 'Салон краси «Орхідея» · Запис на манікюр',
      'vl.mykola.ctx': 'СТО «Драйв» · Запис на діагностику',
      'vl.olena.ctx': 'Стоматологія «Біла» · Запис на огляд',
      'vl.taras.ctx': 'Фітнес «Стейл» · Інфо про абонементи',
      'vl.simulated': '[SIMULATED]',
      'vl.note': 'Транскрипт реального сценарію. Аудіо ще в процесі запису — поки візуальна симуляція.',

      'pr.title.1': 'Один платіж.',
      'pr.title.2': 'Перші 10 клієнтів.',
      'pr.tag': 'Intro · MVP',
      'pr.avail': 'Перші 10 клієнтів',
      'pr.per': '/ разово',
      'pr.lead': 'Голос + Telegram + Sheets налаштовані, протестовані, запущені на вашому номері. 30 днів підтримки включено. Інших платежів нам — нуль.',
      'pr.i1': 'Голосовий AI-агент (ElevenLabs)',
      'pr.i2': 'Telegram-бот з кваліфікацією',
      'pr.i3': 'Google Sheets інтеграція',
      'pr.i4': 'Make-сценарії автоматизації',
      'pr.i5': 'SIP-номер + переадресація',
      'pr.i6': 'Скрипти діалогів під вас',
      'pr.i7': 'Навчання як користуватись',
      'pr.i8': '30 днів підтримки',
      'pr.cta': 'Стати раннім клієнтом',
      'pr.future': 'Зараз $500 — інтро-ціна перших 10 проєктів. Далі $800–1000. Після 20 кейсів — від $1500.',
      'spec.sip': 'SIP-номер',
      'spec.total': 'Усього',
      'spec.note': 'Сервіси ви оплачуєте напряму. Ми не беремо комісії, не накручуємо ціни.',
      'vs.head': 'vs. живий адміністратор',
      'vs.them': 'Адмін на повний день',
      'vs.saving': 'економія ~94%',

      'faq.title.1': 'Часті',
      'faq.title.2': 'питання',
      'faq.q1': 'Чи треба змінювати номер телефону?',
      'faq.a1': 'Ні. Ви залишаєте свій номер. Налаштовуємо переадресацію на SIP-номер агента — Київстар, Лайфсел і Vodafone це підтримують через USSD. 10 хвилин роботи.',
      'faq.q2': 'Скільки часу займає впровадження?',
      'faq.a2': 'До тижня (≤7 днів) від погодження ТЗ. Перші дні — інтерв\'ю і скрипти. Середина — налаштування. Кінець тижня — тестування і запуск.',
      'faq.q3': 'Що якщо AI не зрозумів клієнта?',
      'faq.a3': 'Агент переводить дзвінок на ваш мобільний або фіксує контакт із позначкою «передзвонити». Ви бачите такі випадки в таблиці.',
      'faq.q4': 'Чи звучить агент справді як людина?',
      'faq.a4': 'ElevenLabs Conversational AI з українським голосом. Більшість клієнтів не розрізняє в перші 20 секунд розмови.',
      'faq.q5': 'Чому MVP і що це означає?',
      'faq.a5': 'ReceptAI на стадії раннього запуску. Технологія працює, інфраструктура побудована, перші 10 клієнтів отримують intro-ціну $500 і максимальну увагу від нас. Після 10 кейсів — підвищення ціни.',
      'faq.q6': 'Який бізнес підходить?',
      'faq.a6': 'Будь-який сервісний бізнес з телефонною лінією і потоком вхідних дзвінків чи повідомлень. Перевіримо разом перед стартом — це безкоштовно.',
      'faq.q7': 'Що з безпекою даних?',
      'faq.a7': 'Дані зберігаються у вашій Google Таблиці — ви її контролюєте. ElevenLabs і Make працюють за GDPR.',
      'faq.q8': 'Що після 30 днів підтримки?',
      'faq.a8': 'Система продовжує працювати. Потрібні зміни — оновити скрипт, додати послугу — окремий пакет від $50. Базова робота не зупиняється.',

      'cta.title.1': 'Станьте одним із',
      'cta.title.2': 'перших 10 клієнтів.',
      'cta.title.3': 'Intro-ціна $500.',
      'cta.lead': 'Напишіть напряму в Telegram або залиште контакт — зв\'яжемось протягом 24 годин. Обговоримо ваш бізнес і чи дійсно ReceptAI вам підходить. Безкоштовно.',
      'cta.ch.tg.lab': 'Напишіть у Telegram',
      'cta.soon': 'скоро',
      'cta.ch.email.lab': 'Напишіть на email',

      'form.title': 'Або залиште контакти — напишемо ми',
      'form.name': 'Ім\'я',
      'form.contact': 'Telegram або телефон',
      'form.business': 'Тип бізнесу',
      'form.optional': 'опційно',
      'form.submit': 'Записатись у список',
      'form.note': 'Жодного спаму. Один контакт — і ви вирішуєте.',
      'form.ok.title': 'Прийнято',
      'form.ok.desc': 'Зв\'яжемось протягом 24 годин.',

      'foot.tag': 'AI-адміністратор · Україна · MVP',
      'foot.h1': 'Продукт',
      'foot.h2': 'Інфо',
      'foot.h3': 'Контакт',
      'foot.channels': 'Канали',
      'foot.arch': 'Архітектура',
      'foot.tg': 'Telegram · скоро',
      'foot.domain': 'домен скоро',
      'foot.built': 'v2 · Built in Ukraine 🇺🇦',
    },

    en: {
      'nav.problem': 'Problem',
      'nav.how': 'How',
      'nav.demo': 'Demo',
      'nav.pricing': 'Pricing',
      'nav.faq': 'FAQ',
      'nav.cta': 'Become an early customer',

      'hero.badge': 'MVP · First working AI receptionists in Ukraine',
      'hero.title.line1': 'Voice AI',
      'hero.title.line2': 'that answers every call,',
      'hero.title.line3': '24/7.',
      'hero.sub': 'AI in the receptionist role — not replacing the whole team, only the person answering calls and handling intake. Voice, Telegram, Google Sheets done for you.',
      'hero.cta.demo': 'Try the demo',
      'hero.cta.lead': 'Become an early customer',
      'hero.bullet.1': 'Keep your existing number',
      'hero.bullet.2': 'Launch within 7 days',
      'hero.bullet.3': '$500 one-time (intro price)',

      'call.status.idle': 'DEMO · CALL SIMULATION',
      'call.status.live': 'CALL ACTIVE',
      'call.status.end': 'CALL ENDED',
      'call.from': 'Incoming from:',
      'call.role': 'AI receptionist · Demo',
      'call.hint': 'Press the button — a real conversation simulation will start',
      'call.cta': 'Press to start',
      'call.cta.live': 'End call',

      'tech.label': 'Built on:',

      'm.calls': 'Calls answered',
      'm.latency': 'Response latency',
      'm.uptime': 'No days off, no lunch breaks',
      'm.days': 'Days to launch',
      'm.price': 'One-time fee',

      'problem.title.1': 'Small businesses lose customers',
      'problem.title.2': 'every day. No exceptions.',
      'p1.title': 'Missed calls',
      'p1.desc': 'Receptionist is busy, on a break, sick. Customer calls — nobody answers — they switch to a competitor in the next 2 minutes.',
      'p1.chip': '−30% potential customers',
      'p2.title': 'Slow messengers',
      'p2.desc': 'Customer writes at 9 PM. Owner sees it at 9 AM. By then they\'ve already booked elsewhere.',
      'p2.chip': '−40% night requests',
      'p3.title': 'Human factor',
      'p3.desc': 'The admin gets sick. Quits. Forgets to log a booking. Your business depends on one person who isn\'t always there.',
      'p3.chip': 'Single point of failure',
      'p4.title': 'High cost',
      'p4.desc': 'A live receptionist costs $300–800/month. For a small business with 5–15 customers a day, that\'s a quarter of profit on one salary.',
      'p4.chip': '$3,600–9,600/year',

      'forwho.title.1': 'Any business',
      'forwho.title.2': 'with a receptionist.',
      'forwho.lead': 'If you have a phone line and customers call or message — ReceptAI fits. No exceptions.',
      'forwho.1': 'Beauty salons', 'forwho.2': 'Barbershops', 'forwho.3': 'Dental clinics', 'forwho.4': 'Medical clinics',
      'forwho.5': 'Gyms', 'forwho.6': 'Yoga studios', 'forwho.7': 'Auto service', 'forwho.8': 'Car repair',
      'forwho.9': 'Restaurants', 'forwho.10': 'Cafes', 'forwho.11': 'Tutors', 'forwho.12': 'Kids\' clubs',
      'forwho.13': 'Sole proprietors', 'forwho.14': 'Service centers', 'forwho.15': 'Delivery', 'forwho.16': 'Hotels',
      'forwho.more': 'any other service business',

      'prod.title.1': 'One system.',
      'prod.title.2': 'Three channels.',
      'prod.lead': 'Voice. Messenger. Spreadsheet. All three work together and log everything in one place.',
      'prod.voice.title': 'Voice AI agent',
      'prod.voice.desc': 'Answers your business number through call forwarding. No changes on your side — same number, just always answered.',
      'prod.voice.li1': 'Natural Ukrainian, ElevenLabs Conversational AI',
      'prod.voice.li2': 'Books appointments, answers about services',
      'prod.voice.li3': 'Forwards complex cases to the owner',
      'prod.tg.title': 'Telegram bot',
      'prod.tg.b1': 'Hi! How much?',
      'prod.tg.b2': 'Manicure from $10. Want to book?',
      'prod.tg.b3': 'Yes, tomorrow 3 PM',
      'prod.tg.b4': 'Booked. Your name?',
      'prod.tg.desc': 'Instant answers to common questions. Customer qualification. Hand-off of important leads to you.',
      'prod.sh.title': 'Google Sheets',
      'prod.sh.h1': 'Customer', 'prod.sh.h2': 'Time', 'prod.sh.h3': 'Status',
      'prod.sh.s1': 'booked', 'prod.sh.s2': 'call back', 'prod.sh.s3': 'new',
      'prod.sh.desc': 'Every call and message is logged in your Google Sheet. One look — full picture of the day.',

      'lat.title.1': 'And it all happens with a latency',
      'lat.title.2': 'you\'ll barely notice.',
      'lat.us': 'Time to first AI response',
      'lat.them': 'Live receptionist',
      'lat.themnote': 'Average after the 4th ring',

      'how.title.1': 'How it works',
      'how.title.2': 'under the hood.',
      'how.s1.title': 'Customer calls your number',
      'how.s1.desc': 'Carrier (Kyivstar, Lifecell, Vodafone) forwards the call to ReceptAI\'s SIP number. Set up in 10 minutes via USSD command.',
      'how.s2.title': 'ElevenLabs Conversational AI',
      'how.s2.desc': 'STT listens, LLM understands your business context, TTS responds in a natural voice. All in one service. Latency ~1 second.',
      'how.s3.title': 'Make writes to Google Sheets',
      'how.s3.desc': 'After the call ends, automation grabs the data and appends a row to the sheet. Owner gets a Telegram notification with the summary.',
      'how.s4.title': 'Telegram bot — separate flow',
      'how.s4.desc': 'Customer writes — the same LLM responds instantly. Data lands in the same sheet. One context across all channels.',

      'vl.title.1': 'How it sounds',
      'vl.title.2': 'for different businesses',
      'vl.lead': 'Voice is configured for you. Name, tone, phrases, scripts — all on your brand.',
      'vl.alina.role': 'Beauty salon · f',
      'vl.mykola.role': 'Auto service · m',
      'vl.olena.role': 'Dental clinic · f',
      'vl.taras.role': 'Gym · m',
      'vl.alina.ctx': 'Salon «Orchid» · Booking a manicure',
      'vl.mykola.ctx': 'Service «Drive» · Booking diagnostics',
      'vl.olena.ctx': 'Dental «White» · Booking a checkup',
      'vl.taras.ctx': 'Gym «Style» · Pricing questions',
      'vl.simulated': '[SIMULATED]',
      'vl.note': 'Transcript of a real scenario. Audio is still being recorded — visual simulation for now.',

      'pr.title.1': 'One payment.',
      'pr.title.2': 'First 10 customers.',
      'pr.tag': 'Intro · MVP',
      'pr.avail': 'First 10 customers',
      'pr.per': '/ one-time',
      'pr.lead': 'Voice + Telegram + Sheets set up, tested, launched on your number. 30 days of support included. Zero other payments to us.',
      'pr.i1': 'Voice AI agent (ElevenLabs)',
      'pr.i2': 'Telegram bot with qualification',
      'pr.i3': 'Google Sheets integration',
      'pr.i4': 'Make automation scenarios',
      'pr.i5': 'SIP number + call forwarding',
      'pr.i6': 'Dialogue scripts tailored to you',
      'pr.i7': 'Training on how to use it',
      'pr.i8': '30 days of support',
      'pr.cta': 'Become an early customer',
      'pr.future': 'Now $500 — intro price for the first 10 projects. Then $800–1000. After 20 cases — from $1500.',
      'spec.sip': 'SIP number',
      'spec.total': 'Total',
      'spec.note': 'You pay services directly. We don\'t take commissions, we don\'t inflate prices.',
      'vs.head': 'vs. live receptionist',
      'vs.them': 'Full-time admin',
      'vs.saving': '~94% savings',

      'faq.title.1': 'Frequently',
      'faq.title.2': 'asked',
      'faq.q1': 'Do I need to change my phone number?',
      'faq.a1': 'No. You keep your number. We set up forwarding to the agent\'s SIP number — Kyivstar, Lifecell, and Vodafone support this via USSD. 10 minutes of work.',
      'faq.q2': 'How long does deployment take?',
      'faq.a2': 'Up to 7 days from spec approval. First days — interview and scripts. Middle — setup. End of week — testing and launch.',
      'faq.q3': 'What if the AI doesn\'t understand the customer?',
      'faq.a3': 'The agent forwards the call to your mobile or logs the contact with a "call back" tag. You see these cases in the sheet.',
      'faq.q4': 'Does the agent really sound human?',
      'faq.a4': 'ElevenLabs Conversational AI with a Ukrainian voice. Most customers can\'t tell within the first 20 seconds of conversation.',
      'faq.q5': 'Why MVP, and what does it mean?',
      'faq.a5': 'ReceptAI is in early launch. The tech works, infrastructure is built, the first 10 customers get the $500 intro price and maximum attention from us. After 10 cases — price goes up.',
      'faq.q6': 'What businesses fit?',
      'faq.a6': 'Any service business with a phone line and inbound calls or messages. We\'ll check fit together before starting — that\'s free.',
      'faq.q7': 'What about data security?',
      'faq.a7': 'Data is stored in your Google Sheet — you control it. ElevenLabs and Make are GDPR-compliant.',
      'faq.q8': 'What happens after 30 days of support?',
      'faq.a8': 'The system keeps working. Need changes — update a script, add a service — separate package from $50. Core work never stops.',

      'cta.title.1': 'Become one of',
      'cta.title.2': 'the first 10 customers.',
      'cta.title.3': 'Intro price $500.',
      'cta.lead': 'Write us in Telegram or leave a contact — we\'ll get back within 24 hours. We\'ll discuss your business and whether ReceptAI actually fits. Free.',
      'cta.ch.tg.lab': 'Write us on Telegram',
      'cta.soon': 'soon',
      'cta.ch.email.lab': 'Email us',

      'form.title': 'Or leave contacts — we\'ll reach out',
      'form.name': 'Name',
      'form.contact': 'Telegram or phone',
      'form.business': 'Business type',
      'form.optional': 'optional',
      'form.submit': 'Join the waitlist',
      'form.note': 'No spam. One contact — you decide.',
      'form.ok.title': 'Got it',
      'form.ok.desc': 'We\'ll reach out within 24 hours.',

      'foot.tag': 'AI receptionist · Ukraine · MVP',
      'foot.h1': 'Product',
      'foot.h2': 'Info',
      'foot.h3': 'Contact',
      'foot.channels': 'Channels',
      'foot.arch': 'Architecture',
      'foot.tg': 'Telegram · soon',
      'foot.domain': 'domain soon',
      'foot.built': 'v2 · Built in Ukraine 🇺🇦',
    },
  };

  const LANG_KEY = 'receptai_lang';
  let currentLang = localStorage.getItem(LANG_KEY) || 'uk';

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === 'uk' ? 'uk' : 'en';
    document.documentElement.dataset.lang = lang;
    localStorage.setItem(LANG_KEY, lang);

    const dict = DICT[lang] || DICT.uk;
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key] !== undefined) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-lang-set]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.langSet === lang);
    });
  }

  document.querySelectorAll('[data-lang-set]').forEach((btn) => {
    btn.addEventListener('click', () => applyLang(btn.dataset.langSet));
  });

  applyLang(currentLang);

  const t = (key) => (DICT[currentLang] || DICT.uk)[key] || key;

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Footer year
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Nav burger
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const burger = document.getElementById('burger');
  const navLinks = document.querySelector('.nav__links');
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      navLinks.classList.toggle('is-open');
    });
    navLinks.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => navLinks.classList.remove('is-open'))
    );
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // FAQ: one open at a time
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const items = document.querySelectorAll('.faq details');
  items.forEach((item) => {
    item.addEventListener('toggle', () => {
      if (item.open) items.forEach((o) => o !== item && (o.open = false));
    });
  });

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // HERO call simulator
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const SIM_SCRIPT = {
    uk: [
      { who: 'ai', text: 'Вітаю! Це Аліна, асистент салону «Орхідея». Чим можу допомогти?', delay: 0 },
      { who: 'user', text: 'Доброго дня. Хочу записатися на манікюр.', delay: 1800 },
      { who: 'ai', text: 'Чудово. На який день вам зручно?', delay: 1500 },
      { who: 'user', text: 'На завтра в обід якщо можна.', delay: 1800 },
      { who: 'ai', text: 'Так, у нас вільно о 12:30 та 14:00. Який варіант?', delay: 1700 },
      { who: 'user', text: 'Давайте 14:00.', delay: 1500 },
      { who: 'ai', text: 'Записала. Підкажіть ваше ім\'я для нагадування.', delay: 1700 },
    ],
    en: [
      { who: 'ai', text: 'Hi! This is Alina, assistant of «Orchid» salon. How can I help?', delay: 0 },
      { who: 'user', text: 'Hello. I\'d like to book a manicure.', delay: 1800 },
      { who: 'ai', text: 'Great. Which day works for you?', delay: 1500 },
      { who: 'user', text: 'Tomorrow at lunchtime if possible.', delay: 1800 },
      { who: 'ai', text: 'Yes, we have 12:30 and 14:00 free. Which one?', delay: 1700 },
      { who: 'user', text: '14:00, please.', delay: 1500 },
      { who: 'ai', text: 'Booked. Could you tell me your name for the reminder?', delay: 1700 },
    ],
  };

  const callCard = document.getElementById('callCard');
  const callBtn = document.getElementById('bigCall');
  const callTranscript = document.getElementById('callTranscript');
  const callStatus = document.getElementById('callStatus');
  const callHint = document.getElementById('callHint');
  const callNumber = document.getElementById('callNumber');

  let simTimers = [];
  let simActive = false;

  function clearSim() {
    simTimers.forEach((id) => clearTimeout(id));
    simTimers = [];
  }

  function endSim() {
    simActive = false;
    clearSim();
    callCard.classList.remove('is-live');
    callStatus.textContent = t('call.status.idle');
    callHint.textContent = t('call.cta');
    callBtn.setAttribute('aria-label', 'Запустити симуляцію');
  }

  function startSim() {
    simActive = true;
    callCard.classList.add('is-live');
    callStatus.textContent = t('call.status.live');
    callHint.textContent = t('call.cta.live');
    callBtn.setAttribute('aria-label', 'Завершити');

    // typical Ukrainian random-ish number
    const rand = () => Math.floor(Math.random() * 9 + 1).toString();
    callNumber.textContent = `${rand()}${rand()} ${rand()}${rand()}${rand()} ${rand()}${rand()}${rand()}${rand()}`;

    // clear transcript
    callTranscript.innerHTML = '';

    const script = SIM_SCRIPT[currentLang] || SIM_SCRIPT.uk;
    let cum = 0;

    script.forEach((line) => {
      cum += line.delay;
      simTimers.push(
        setTimeout(() => {
          if (!simActive) return;
          const el = document.createElement('div');
          el.className = `ttext ttext--${line.who}`;
          el.innerHTML = `<strong>${line.who === 'ai' ? 'AI' : 'CUST'}</strong> ${line.text}`;
          callTranscript.appendChild(el);
          callTranscript.scrollTop = callTranscript.scrollHeight;
        }, cum)
      );
    });

    // auto-end after last line + 2s
    simTimers.push(
      setTimeout(() => {
        if (simActive) {
          callStatus.textContent = t('call.status.end');
        }
      }, cum + 1800)
    );
  }

  if (callBtn) {
    callBtn.addEventListener('click', () => (simActive ? endSim() : startSim()));
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Voice library
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  const PERSONAS = {
    alina: {
      name: 'Аліна', name_en: 'Alina',
      ctxKey: 'vl.alina.ctx',
      lines: {
        uk: [
          { who: 'ai', text: 'Вітаю! Салон «Орхідея», Аліна. Чим допомогти?' },
          { who: 'user', text: 'Хочу записатись на манікюр на завтра.' },
          { who: 'ai', text: 'Чудово. Маємо вільні 11:00, 14:30 та 17:00. Який зручніше?' },
          { who: 'user', text: 'Давайте 14:30.' },
          { who: 'ai', text: 'Записала. Підкажіть ім\'я та номер для нагадування.' },
        ],
        en: [
          { who: 'ai', text: 'Hi! Salon «Orchid», Alina. How can I help?' },
          { who: 'user', text: 'I want to book a manicure for tomorrow.' },
          { who: 'ai', text: 'Great. Open slots: 11:00, 14:30 and 17:00. Which one?' },
          { who: 'user', text: 'Let\'s do 14:30.' },
          { who: 'ai', text: 'Booked. Could you share your name and phone for the reminder?' },
        ],
      },
      duration: 38,
    },
    mykola: {
      name: 'Микола', name_en: 'Mykola',
      ctxKey: 'vl.mykola.ctx',
      lines: {
        uk: [
          { who: 'ai', text: 'Алло, СТО «Драйв», Микола.' },
          { who: 'user', text: 'Здрастуйте. Машина гуде, треба діагностика.' },
          { who: 'ai', text: 'Що за модель і рік?' },
          { who: 'user', text: 'Skoda Octavia 2018.' },
          { who: 'ai', text: 'Окей. Завтра о 10:00 вільний пост. Підходить?' },
        ],
        en: [
          { who: 'ai', text: 'Hello, «Drive» Service, Mykola.' },
          { who: 'user', text: 'Hi. Car is humming, need diagnostics.' },
          { who: 'ai', text: 'What model and year?' },
          { who: 'user', text: 'Skoda Octavia 2018.' },
          { who: 'ai', text: 'OK. Tomorrow at 10:00 is open. Works?' },
        ],
      },
      duration: 32,
    },
    olena: {
      name: 'Олена', name_en: 'Olena',
      ctxKey: 'vl.olena.ctx',
      lines: {
        uk: [
          { who: 'ai', text: 'Вітаю, стоматологія «Біла», Олена.' },
          { who: 'user', text: 'Хочу записатись на огляд.' },
          { who: 'ai', text: 'Чи були ви у нас раніше?' },
          { who: 'user', text: 'Так, минулого року.' },
          { who: 'ai', text: 'Знайшла вашу картку. Завтра 16:00 з доктором Стасюк?' },
        ],
        en: [
          { who: 'ai', text: 'Hi, «White» Dental, Olena.' },
          { who: 'user', text: 'I\'d like to book a checkup.' },
          { who: 'ai', text: 'Have you been with us before?' },
          { who: 'user', text: 'Yes, last year.' },
          { who: 'ai', text: 'Found your record. Tomorrow 16:00 with Dr. Stasiuk?' },
        ],
      },
      duration: 36,
    },
    taras: {
      name: 'Тарас', name_en: 'Taras',
      ctxKey: 'vl.taras.ctx',
      lines: {
        uk: [
          { who: 'ai', text: 'Фітнес «Стейл», Тарас слухає.' },
          { who: 'user', text: 'Скільки коштує абонемент на місяць?' },
          { who: 'ai', text: 'Базовий — 1500, з тренером — 2800.' },
          { who: 'user', text: 'А пробний день?' },
          { who: 'ai', text: 'Так, безкоштовно. Приходьте у будь-який зручний час до 22:00.' },
        ],
        en: [
          { who: 'ai', text: 'Gym «Style», Taras speaking.' },
          { who: 'user', text: 'How much is a monthly pass?' },
          { who: 'ai', text: 'Basic — $40, with a trainer — $75.' },
          { who: 'user', text: 'And a trial day?' },
          { who: 'ai', text: 'Yes, free. Drop by any time before 10 PM.' },
        ],
      },
      duration: 28,
    },
  };

  let activePersona = 'alina';
  let vPlaying = false;
  let vCurrent = 0;
  let vTimer = null;

  const vPlayer = document.querySelector('.vplayer');
  const vBtn = document.getElementById('vPlay');
  const vBar = document.getElementById('vBar');
  const vTime = document.getElementById('vTime');
  const vTotal = document.getElementById('vTotal');
  const vName = document.getElementById('vName');
  const vCtx = document.getElementById('vCtx');
  const vLines = document.getElementById('vLines');
  const vWave = document.getElementById('vWave');

  // build wave bars
  if (vWave) {
    vWave.innerHTML = '';
    for (let i = 0; i < 60; i++) {
      const s = document.createElement('span');
      // randomize but deterministic-feeling
      const h = 20 + Math.abs(Math.sin(i * 0.6)) * 60;
      s.style.height = h + '%';
      vWave.appendChild(s);
    }
  }

  function fmt(s) {
    const m = Math.floor(s / 60);
    const r = Math.floor(s % 60);
    return `${m}:${String(r).padStart(2, '0')}`;
  }

  function loadPersona(key) {
    activePersona = key;
    const p = PERSONAS[key];
    if (!p) return;
    if (vName) vName.textContent = currentLang === 'en' ? p.name_en : p.name;
    if (vCtx) vCtx.textContent = t(p.ctxKey);
    if (vTotal) vTotal.textContent = fmt(p.duration);
    if (vTime) vTime.textContent = '0:00';
    if (vBar) vBar.style.width = '0%';

    // render lines
    if (vLines) {
      vLines.innerHTML = '';
      (p.lines[currentLang] || p.lines.uk).forEach((line) => {
        const el = document.createElement('div');
        el.className = `vline vline--${line.who}`;
        el.innerHTML = `<strong>${line.who === 'ai' ? 'AI' : (currentLang === 'en' ? 'CUST' : 'КЛТ')}</strong><span>${line.text}</span>`;
        vLines.appendChild(el);
      });
    }

    // picker state
    document.querySelectorAll('.vp').forEach((b) => {
      b.classList.toggle('is-active', b.dataset.persona === key);
    });

    vCurrent = 0;
    stopV();
  }

  function tickV() {
    const p = PERSONAS[activePersona];
    if (!p) return;
    vCurrent += 0.1;
    if (vCurrent >= p.duration) {
      vCurrent = 0;
      stopV();
      return;
    }
    if (vTime) vTime.textContent = fmt(vCurrent);
    if (vBar) vBar.style.width = (vCurrent / p.duration) * 100 + '%';

    // animate wave bars
    if (vWave) {
      vWave.querySelectorAll('span').forEach((s, i) => {
        const phase = vCurrent * 8 + i * 0.4;
        const h = 20 + Math.abs(Math.sin(phase)) * 70;
        s.style.height = h + '%';
        s.classList.toggle('is-active', i < (vCurrent / p.duration) * 60);
      });
    }
  }

  function playV() {
    vPlaying = true;
    if (vPlayer) vPlayer.classList.add('is-playing');
    vTimer = setInterval(tickV, 100);
  }

  function stopV() {
    vPlaying = false;
    if (vPlayer) vPlayer.classList.remove('is-playing');
    if (vTimer) clearInterval(vTimer);
    vTimer = null;
  }

  if (vBtn) {
    vBtn.addEventListener('click', () => (vPlaying ? stopV() : playV()));
  }

  document.querySelectorAll('.vp').forEach((b) => {
    b.addEventListener('click', () => loadPersona(b.dataset.persona));
  });

  loadPersona('alina');

  // Re-render persona text on lang switch
  document.querySelectorAll('[data-lang-set]').forEach((btn) =>
    btn.addEventListener('click', () => {
      setTimeout(() => loadPersona(activePersona), 50);
    })
  );

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Form submit (stub)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const form = document.getElementById('leadForm');
  const okBox = document.getElementById('leadSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const fd = new FormData(form);
      const name = String(fd.get('name') || '').trim();
      const contact = String(fd.get('contact') || '').trim();

      if (name.length < 2 || contact.length < 3) {
        form.querySelectorAll('input').forEach((i) => {
          if (i.required && !i.checkValidity()) i.focus();
        });
        return;
      }

      // STUB: would POST to webhook here
      console.log('[ReceptAI] lead:', { name, contact, business: fd.get('business') });

      form.querySelectorAll('input, button').forEach((el) => (el.disabled = true));
      if (okBox) okBox.hidden = false;
    });
  }

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // Reveal on scroll
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  const reveal = document.querySelectorAll(
    '.problem, .card, .step, .price__card, .spec, .vs, .cch, .faq details, .metric, .chiplg, .latbox'
  );
  if ('IntersectionObserver' in window && reveal.length) {
    reveal.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(14px)';
      el.style.transition = 'opacity 0.55s ease-out, transform 0.55s ease-out';
    });
    const io = new IntersectionObserver(
      (es) => {
        es.forEach((e) => {
          if (e.isIntersecting) {
            e.target.style.opacity = '1';
            e.target.style.transform = 'translateY(0)';
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    reveal.forEach((el) => io.observe(el));
  }
})();
