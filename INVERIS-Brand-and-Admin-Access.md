# Inveris Solutions — Brand & Admin Access

**Prepared for:** Client handover  
**Website:** https://www.inverissolutions.com  
**Admin:** https://www.inverissolutions.com/admin  

This document lists the live brand system used on the website (fonts and colors) and the CMS login details.

---

## 1. Fonts

Two Google Fonts are used across the site. They are loaded via Next.js (`next/font/google`) with `latin` subsets and `display: swap`.

| Role | Typeface | CSS variable | Tailwind / class | Fallback |
| --- | --- | --- | --- | --- |
| Body copy, UI, buttons, forms | **Inter** | `--font-inter` | `font-sans` (site default) | `system-ui`, sans-serif |
| Headings, navigation, display / serif accents | **Playfair Display** | `--font-playfair` | `font-display`, `font-serif`; also applied to `h1`–`h4` and header nav links | Georgia, Times New Roman, serif |

### Usage

- **Inter** is the default for body text (`line-height: 1.6`).
- **Playfair Display** is used for page titles, section headings, and the primary navigation.
- Headings use slightly tighter tracking (`letter-spacing: -0.015em`).

### Licensing

Both typefaces are available from [Google Fonts](https://fonts.google.com/) under the Open Font License and may be used on the live site and in related brand materials.

---

## 2. Brand colors

All values below are the live CSS tokens from the site (`frontend/app/globals.css`).

### Primary palette

| Token | Hex | RGB | Use |
| --- | --- | --- | --- |
| Navy | `#07101F` | `7, 16, 31` | Primary brand color; dark sections, headers on light, primary buttons, logo on light |
| Navy light | `#12233A` | `18, 35, 58` | Secondary dark surface / navy lift |
| Gold | `#C4A484` | `196, 164, 132` | Accent, labels, CTAs, icons, underlines, selection highlight |
| Gold light | `#DCC4A8` | `220, 196, 168` | Hover / highlight gold |
| Gold dark | `#A8896A` | `168, 137, 106` | Pressed / deeper gold |

### Surfaces

| Token | Hex | RGB | Use |
| --- | --- | --- | --- |
| Surface | `#FBFAF7` | `251, 250, 247` | Default page background |
| Surface muted | `#F3F0EA` | `243, 240, 234` | Alternate / muted background |
| Surface alt | `#F7F4EF` | `247, 244, 239` | Secondary cream surface |
| Border | `#E6E1D8` | `230, 225, 216` | Dividers and card borders |
| White | `#FFFFFF` | `255, 255, 255` | Inverse headings, light text on navy |

### Typography colors

| Token | Value | Use |
| --- | --- | --- |
| Heading | `#07101F` | Headings on light backgrounds |
| Heading inverse | `#FFFFFF` | Headings on navy |
| Paragraph | `#5B6576` | Body copy |
| Paragraph muted | `#8B93A3` | Secondary / helper text |
| Paragraph inverse | `rgba(255, 255, 255, 0.78)` | Body copy on navy |
| Label | `#C4A484` | Small labels and eyebrow text (gold) |
| Logo | `#07101F` | Wordmark / logo on light |
| Nav | `#5B6576` | Inactive nav links |
| Nav active | `#07101F` | Active nav link |

### Effects (reference)

| Token | Value | Use |
| --- | --- | --- |
| Selection | `rgba(196, 164, 132, 0.28)` | Text selection background (gold at 28%) |
| Card shadow | `0 8px 32px rgba(7, 16, 31, 0.08)` | Default cards |
| Card shadow hover | `0 18px 48px rgba(7, 16, 31, 0.14)` | Hovered cards |

### Pairing rules

- **Light sections:** navy headings, grey body, gold accents, cream background.
- **Dark sections:** navy background, white headings, translucent white body, gold accents.
- **Primary CTA:** gold fill with navy text.
- **Secondary / solid CTA:** navy fill with white text.

---

## 3. CMS / admin access

The website includes a content admin for editing pages and viewing form submissions.

| Item | Detail |
| --- | --- |
| Login URL | `https://www.inverissolutions.com/admin` |
| Email | `admin@inveris.com` |
| Password | `admin123` |

### What you can manage after login

- Home, About, Services, Industries, Approach, Leadership, Careers, Contact, Footer
- Form responses (contact / service enquiries and career applications)
- Newsletter subscriber list

### Security note

Please change this password after handover. The login is environment-based (`ADMIN_EMAIL` / `ADMIN_PASSWORD` on the API). Do not share these credentials in public channels.

---

## 4. Quick reference

| Item | Value |
| --- | --- |
| Display font | Playfair Display |
| Body font | Inter |
| Primary | Navy `#07101F` |
| Accent | Gold `#C4A484` |
| Background | Cream `#FBFAF7` |
| Body text | `#5B6576` |
| Admin | `/admin` · `admin@inveris.com` · `admin123` |
