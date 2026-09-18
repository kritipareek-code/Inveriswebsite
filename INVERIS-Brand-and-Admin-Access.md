# Inveris Solutions — Brand & Admin Access

**Prepared for:** Client handover  
**Website:** https://www.inverissolutions.com  
**Admin:** https://www.inverissolutions.com/admin  

This document lists the live brand system used on the website (fonts and colors), the CMS login details, and how to manage the job portal.

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
- **Jobs** (open roles on the public job portal)
- Form responses (contact / service enquiries and career applications)
- Newsletter subscriber list

### Security note

Please change this password after handover. The login is environment-based (`ADMIN_EMAIL` / `ADMIN_PASSWORD` on the API). Do not share these credentials in public channels.

---

## 4. Job portal

Open roles are listed on a dedicated public page. Candidates apply from that listing; applications are emailed to the notification inbox and stored under **Form responses**.

| Item | URL |
| --- | --- |
| Public job portal | `https://www.inverissolutions.com/careers/opportunities` |
| Admin — manage jobs | `https://www.inverissolutions.com/admin/jobs` |

The **Careers** page in the CMS is for the careers landing content (hero, culture, FAQs). Job listings are managed separately under **Jobs**.

### How to add a job

1. Sign in at `https://www.inverissolutions.com/admin`.
2. Open **Jobs** in the left navigation (or go to `/admin/jobs`).
3. Click **Add job**.
4. Fill in:
   - **Job title** (required)
   - **Location** (required)
   - **Line of service** (required)
5. Click **Save jobs** (top of the page or the bar at the bottom).

The role goes live on `/careers/opportunities`. Candidates can click the title or **Apply** to submit an application.

You can also edit the opportunities page hero, the listing heading, and the empty-state message on the same Jobs screen. Those changes only go live after **Save jobs**.

### How to remove a job when the opening is closed

There is no “closed” status. To take a role off the site, delete it from the Jobs list and save:

1. Sign in and open **Jobs**.
2. Find the closed role in **Job listings**.
3. Click the delete control on that job card.
4. Click **Save jobs**.

Until you save, the listing is only removed in the editor — it still appears on the public page. After a successful save, the role is gone from `/careers/opportunities` and candidates can no longer apply for it.

If every opening is closed and you delete all jobs, the public page shows the empty-state message (default: “No job openings for now.”). You can change that copy on the Jobs screen before saving.

### Applications

- New applications appear under **Form responses** in the admin.
- A notification email is also sent to the configured inbox, including the job title, location, and line of service.

---

## 5. Quick reference

| Item | Value |
| --- | --- |
| Display font | Playfair Display |
| Body font | Inter |
| Primary | Navy `#07101F` |
| Accent | Gold `#C4A484` |
| Background | Cream `#FBFAF7` |
| Body text | `#5B6576` |
| Admin | `/admin` · `admin@inveris.com` · `admin123` |
| Job portal | `/careers/opportunities` |
| Manage jobs | `/admin/jobs` |
