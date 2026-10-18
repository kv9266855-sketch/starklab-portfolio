/* ===== НАЛАШТУВАННЯ / НАСТРОЙКИ / SETTINGS — редагуйте тут ===== */
window.SITE = {
  name: "𝚂𝚝𝚊𝚛𝚔𝚘𝚗",             // ← ваше ім'я (можна й звичайним текстом)
  brand: "STARKLAB®",
  tagline: "DESIGN · CODE · INTELLIGENCE",
  telegram: "starkonx",         // ← Telegram username без @
  email: "kun49345@gmil.com",   // ← залиште "" щоб сховати
  socials: [                    // ← id: discord | instagram | tiktok | telegram. Порожній url = іконка не показується
    { id: "discord",   label: "Discord",          url: "https://discord.com/users/1353996146824970320" },
    { id: "instagram", label: "Instagram",        url: "coming-soon.html?platform=instagram" },
    { id: "tiktok",    label: "TikTok",           url: "coming-soon.html?platform=tiktok" },
    { id: "telegram",  label: "Telegram channel", url: "coming-soon.html?platform=telegram" }
  ],
  tech: ["HTML5", "CSS3", "JavaScript", "TypeScript", "Python", "PHP", "SQL / MySQL", "SQLite", "GSAP", "Three.js", "WebGL", "REST API", "Telegram Bot API", "Aiogram", "FastAPI", "Flask", "Git / GitHub", "GitHub Pages", "Docker", "Linux", "Nginx", "Cloudflare", "OpenAI API", "Claude API", "AI Automation", "Webhooks", "Figma", "Responsive Design"],
  // price: число, "from" додається автоматично. Тексти — у js/i18n.js (ключі s1…s13)
  services: [
    { id: "s1", price: 120 }, { id: "s2", price: 150 }, { id: "s3", price: 70 },
    { id: "s4", price: 100 }, { id: "s13", price: 35 }, { id: "s6", price: 80 },
    { id: "s7", price: 30 }, { id: "s8", price: 120 }, { id: "s9", price: 45 },
    { id: "s10", price: 70 }, { id: "s11", price: 50 }, { id: "s12", price: 20 }
  ],
  // Проекти: url — посилання на робочий проєкт ("" = кнопка не показується).
  // Тексти — у js/i18n.js (ключі p1…). image — шлях до превʼю-картинки.
  projects: [
    { id: "p1", tech: ["HTML5", "CSS3", "JavaScript", "GSAP", "Responsive Design"], url: "", image: "img/portfolio-01.png" },
    { id: "p2", tech: ["TypeScript", "React", "Python", "FastAPI", "PostgreSQL", "REST API"], url: "", image: "img/portfolio-02.png" },
    { id: "p3", tech: ["Python", "Aiogram", "SQLite", "OpenAI API", "Webhooks"], url: "", image: "img/portfolio-03.png" }
  ]
};
