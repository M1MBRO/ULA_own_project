# ReceptAI · Landing

**MVP / Pre-launch.** Voice AI receptionist for Ukrainian SMBs. First 10 customers at $500.

## Stack

Pure HTML / CSS / JS — no build step, no framework. Hosts as static on GitHub Pages, Vercel, Netlify, anything.

```
site/
├── index.html       — Markup (Hero · For-who · Product · Latency · How · Voice library · Pricing · FAQ · CTA · Footer)
├── style.css        — Bland/Vapi/Resend/Raycast/ElevenLabs synthesis
├── script.js        — i18n (uk/en), live call simulator, voice library player, FAQ, form, reveal-on-scroll
└── assets/
    ├── logo.svg
    └── favicon.svg
```

## Brand (per ReceptAI Brand Book v2.0)

- **Background:** `#0A1628` Obsidian Black
- **Primary:** `#0F4F4A` Brunswick Green
- **Accent / CTA:** `#00C9A7` Tropical Teal
- **Fonts:** Syne (display) · DM Sans (body) · JetBrains Mono (code/labels)

## Reference DNA

| Source | What we copied |
|---|---|
| **Bland.ai** | Direct problem-first headline, live demo widget in hero, latency comparison, big metric strip |
| **Vapi.ai** | Tech stack ribbon (instead of fake customer logos), enterprise capability cards, mic-permission demo pattern |
| **Resend** | Mono-typography on labels and code tags, clean minimal sections |
| **Raycast** | Animated gradient mesh hero, glow halos, premium pricing card |
| **ElevenLabs** | Voice persona picker with transcript player |

## Local dev

```bash
cd site
python3 -m http.server 5500
# open http://localhost:5500
```

## Deploy to GitHub Pages

1. Push to `main` (already done)
2. Repo Settings → Pages → Source: Deploy from a branch
3. Branch: `main` · Folder: `/site`
4. Save. Available at `https://m1mbro.github.io/ULA_own_project/`

## TODO (post-MVP)

- [ ] Real Telegram bot link and SIP number for hero
- [ ] Real audio MP3 demos (currently visual simulation only)
- [ ] Hook form to Make webhook / Telegram notification
- [ ] Buy `receptai.com.ua`, configure CNAME
- [ ] Add Plausible / Umami analytics
- [ ] Add real customer case studies once first 3 launch
