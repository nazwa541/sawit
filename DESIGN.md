# SISTRA SAWIT — Color System
**Design Language v1.0 · Light Mode**

> Platform monitoring perkebunan sawit yang modern, bersih, dan profesional.
> Dirancang agar nyaman dibaca di lapangan, di bawah sinar matahari.

---

## Design Direction

| Atribut | Nilai |
|---|---|
| Style | Clean · Bright · Professional · Enterprise |
| Tema | Palm Oil Plantation · Modern Agriculture ERP |
| Target | Operator kebun, admin kantor, monitoring lapangan |
| Hindari | Crypto UI · Gaming · Neon · Heavy Dark Mode |

---

## 1. Background Tokens

| Token | Hex | Penggunaan |
|---|---|---|
| Primary Background | `#F8FAFC` | Canvas halaman utama |
| Secondary Background | `#FFFFFF` | Card, panel, modal |
| Sidebar Background | `#FFFFFF` | Navigation sidebar |
| Card Background | `#FFFFFF` | Semua surface card |
| Border | `#E4E4E7` | Garis pemisah elemen |

---

## 2. Brand Colors

### Palm Green Ramp

```
Light  ──────────────────── Dark
#DCFCE7 → #84CC16 → #65A30D → #4d7a0a
```

| Token | Hex | Penggunaan |
|---|---|---|
| Primary Palm Green | `#65A30D` | CTA, active state, brand utama |
| Secondary Palm Green | `#84CC16` | Hover, highlight, progress bar |
| Light Palm Green | `#DCFCE7` | Badge background, selected row, icon container |

### Semantic Colors

| Token | Hex | Penggunaan |
|---|---|---|
| Harvest Yellow | `#EAB308` | Pending, warning ringan |
| Harvest Orange | `#F59E0B` | Alert, in-progress |
| Danger Red | `#EF4444` | Error, selisih timbangan, kritis |
| Info Blue | `#3B82F6` | Informasi, status pengiriman |

---

## 3. Typography Colors

| Token | Hex | Penggunaan |
|---|---|---|
| Primary Text | `#18181B` | Heading, angka besar, label penting |
| Secondary Text | `#52525B` | Deskripsi, sub-label, body text |
| Muted Text | `#71717A` | Placeholder, metadata, hints, satuan |

---

## 4. KPI Cards

```
Style:
  background:    #FFFFFF
  border-radius: 20px
  box-shadow:    0 1px 3px rgba(0,0,0,0.05)
  border:        0.5px solid #E4E4E7
  hover:         translateY(-2px) + shadow naik
```

### Contoh KPI

| Kartu | Ikon | Accent | Icon Container |
|---|---|---|---|
| Total Panen Hari Ini | 🌴 | Green | `#DCFCE7` · `#65A30D` |
| Total Pengiriman | 🚚 | Blue | `#DBEAFE` · `#1D4ED8` |
| Menunggu Nota | 📄 | Yellow | `#FEF3C7` · `#B45309` |
| Selisih Timbangan | ⚠ | Red | `#FEE2E2` · `#DC2626` |

---

## 5. Sidebar

| State | Background | Text |
|---|---|---|
| Default | `#FFFFFF` | `#52525B` |
| Active | `#DCFCE7` | `#65A30D` (bold) |
| Hover | `#F4F4F5` | `#52525B` |
| Icon size | — | 16–18px |

---

## 6. Navbar

```css
background:    #FFFFFF;
border-bottom: 0.5px solid #E4E4E7;
```

---

## 7. Table

| Elemen | Value |
|---|---|
| Header background | `#F8FAFC` |
| Header text | `#52525B` · weight 500 |
| Row hover | `#F4F4F5` |
| Border | `0.5px solid #E4E4E7` |
| Body text | `#18181B` |

---

## 8. Status Badges

| Status | Background | Text |
|---|---|---|
| Dalam Perjalanan | `#DBEAFE` | `#1D4ED8` |
| Menunggu Nota | `#FEF3C7` | `#B45309` |
| Selesai | `#DCFCE7` | `#15803D` |
| Perlu Verifikasi | `#FEE2E2` | `#DC2626` |

```css
/* Badge base style */
padding:       4px 10px;
border-radius: 20px;
font-size:     12px;
font-weight:   500;
```

---

## 9. Card Design Tokens

```css
border-radius: 20px;
box-shadow:    0 1px 3px rgba(0,0,0,0.05);
border:        0.5px solid #E4E4E7;
background:    #FFFFFF;

/* Hover state */
transform:     translateY(-2px);
box-shadow:    0 4px 12px rgba(0,0,0,0.08);
transition:    all 0.2s ease;
```

---

## 10. Dashboard Feeling

### ✅ Harus Terasa Seperti
- Modern Agriculture Platform
- Plantation ERP / Enterprise System
- Professional Monitoring Dashboard
- Bright & Easy to Read (indoor + outdoor)
- Suitable for Palm Oil Plantation Operations

### ❌ Hindari
- Crypto Dashboard aesthetic
- Gaming UI / dark glow
- Neon / oversaturated colors
- Heavy dark mode design
- Overly complex analytics layout
- Gradient yang berlebihan

---

*SISTRA SAWIT · Color System v1.0 · Light Mode Only*