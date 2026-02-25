# ⚽ eFootball™ Vietnam — Website Chính Thức

> **eFootball™ Vietnam** — Trang web cộng đồng eFootball™ chính thức tại Việt Nam.  
> Tin tức, giải đấu, bảng xếp hạng và tải game miễn phí.

🌐 **Live:** [https://efootball.vn](https://efootball.vn)

---

## 📸 Demo

| Trang Chủ | Bảng Xếp Hạng | Giới Thiệu |
|-----------|---------------|-------------|
| Hero slider, tin tức, giải đấu | Dữ liệu từ Excel, tìm kiếm, phân trang | Chế độ chơi, FAQ, nền tảng |

---

## 🛠 Tech Stack

| Công nghệ | Phiên bản | Mô tả |
|-----------|----------|-------|
| [Next.js](https://nextjs.org) | 16.1.6 | Framework React fullstack (App Router) |
| [React](https://react.dev) | 19.2.3 | Thư viện UI |
| [TypeScript](https://typescriptlang.org) | 5.x | Type-safe JavaScript |
| [Tailwind CSS](https://tailwindcss.com) | 4.2.1 | Utility-first CSS framework |
| [Lucide React](https://lucide.dev) | 0.575.0 | Bộ icon SVG |
| [SheetJS (xlsx)](https://sheetjs.com) | 0.18.5 | Đọc file Excel phía server |

---

## 📁 Cấu Trúc Dự Án

```
efootball-app/
├── public/
│   ├── assets/
│   │   ├── bxh.xlsx              # Dữ liệu bảng xếp hạng EFV
│   │   ├── efootball_bg.webp     # Background footer
│   │   ├── efootball_bg_cl2.webp # Background chính (body)
│   │   ├── hero-banner-1.png     # Banner hero slider
│   │   ├── logo.svg              # Logo eFootball™
│   │   └── fonts/                # Font SF Pro Display
│   └── robots.txt                # Cấu hình crawl cho SEO
│
├── src/
│   ├── app/
│   │   ├── layout.tsx            # Root layout + SEO metadata + JSON-LD
│   │   ├── page.tsx              # Trang Chủ (Hero, Tin Tức, Giải Đấu, ...)
│   │   ├── globals.css           # Tailwind config + Font + Theme tokens
│   │   ├── sitemap.ts            # Dynamic sitemap.xml cho SEO
│   │   │
│   │   ├── gioi-thieu/
│   │   │   ├── layout.tsx        # SEO metadata
│   │   │   └── page.tsx          # Trang Giới Thiệu
│   │   │
│   │   ├── bxh/
│   │   │   ├── layout.tsx        # SEO metadata
│   │   │   └── page.tsx          # Bảng Xếp Hạng EFV (đọc từ Excel)
│   │   │
│   │   ├── rankings/
│   │   │   ├── layout.tsx        # SEO metadata
│   │   │   └── page.tsx          # Xếp Hạng Game Thủ (mock data)
│   │   │
│   │   ├── tin-tuc/
│   │   │   ├── page.tsx          # Danh sách tin tức
│   │   │   └── [id]/page.tsx     # Chi tiết bài viết
│   │   │
│   │   └── api/
│   │       └── bxh/route.ts      # API đọc file bxh.xlsx → JSON
│   │
│   └── components/
│       ├── Navbar.tsx             # Navigation bar (responsive)
│       └── Footer.tsx             # Footer component
│
├── next.config.ts                # Cấu hình Next.js
├── postcss.config.mjs            # PostCSS + Tailwind plugin
├── tsconfig.json                 # TypeScript config
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Cài Đặt & Chạy

### Yêu cầu hệ thống

- **Node.js** >= 18.x
- **npm** >= 9.x

### 1. Clone repository

```bash
git clone https://github.com/<username>/efootball-app.git
cd efootball-app
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Chạy development server

```bash
npm run dev
```

Mở trình duyệt tại **[http://localhost:3000](http://localhost:3000)**

### 4. Build production

```bash
npm run build
npm start
```

---

## 📄 Các Trang (Routes)

| Route | Trang | Mô tả |
|-------|-------|-------|
| `/` | Trang Chủ | Hero slider, tin tức nổi bật, giải đấu, leaderboard, tải game |
| `/gioi-thieu` | Giới Thiệu | Chế độ chơi, giá trị cốt lõi, FAQ, nền tảng hỗ trợ |
| `/bxh` | Bảng Xếp Hạng EFV | Dữ liệu 660+ VĐV từ Excel, tìm kiếm, phân trang |
| `/rankings` | Xếp Hạng Game Thủ | Leaderboard mock data, thống kê, giải đấu |
| `/tin-tuc` | Tin Tức | Danh sách bài viết |
| `/tin-tuc/[id]` | Chi Tiết Tin | Nội dung chi tiết từng bài |
| `/api/bxh` | API | Endpoint trả dữ liệu BXH dạng JSON |

---

## 🎨 Design System

### Màu sắc chính

| Token | Giá trị | Mô tả |
|-------|---------|-------|
| `--color-efb-blue` | `#0a14c8` | Xanh dương chính (brand) |
| `--color-efb-blue-dark` | `#060e8c` | Xanh dương đậm |
| `--color-efb-yellow` | `#effd04` | Vàng neon (accent) |
| `--color-efb-green` | `#3fdb8e` | Xanh lá (status) |
| `--color-efb-red` | `#ff4757` | Đỏ (cảnh báo) |

### Font

- **Primary:** SF Pro Display (custom, local)
- **Fallback:** system-ui, sans-serif

### Background

- **Body:** `efootball_bg_cl2.webp` — fixed, cover
- **Footer:** `efootball_bg.webp` — riêng biệt

---

## 🔍 SEO

Website đã được tối ưu SEO chuẩn:

- ✅ **Meta tags:** Title, description, keywords cho mỗi trang
- ✅ **Open Graph:** Full OG tags cho Facebook/Zalo share
- ✅ **Twitter Card:** `summary_large_image`
- ✅ **Canonical URL:** `https://efootball.vn/...`
- ✅ **Sitemap:** Auto-generated tại `/sitemap.xml`
- ✅ **robots.txt:** Allow all, block `/api/`
- ✅ **Structured Data:** JSON-LD WebSite schema + SearchAction
- ✅ **Semantic HTML:** `<main>`, `<section>`, `<nav>`, heading hierarchy
- ✅ **Lang:** `<html lang="vi">`
- ✅ **Viewport:** Responsive + themeColor

---

## 📊 Tính Năng Chính

### 🏠 Trang Chủ
- Hero slider với auto-play và navigation
- Cards tin tức nổi bật
- Giải đấu gần đây với trạng thái (Đang/Sắp/Kết thúc)
- Leaderboard top 5
- Section tải game đa nền tảng

### 📰 Tin Tức
- Danh sách bài viết phân trang
- Tag phân loại (Quan Trọng, Sự Kiện, Cập Nhật, Giải Đấu)
- Trang chi tiết bài viết

### 🏆 Bảng Xếp Hạng (`/bxh`)
- Đọc dữ liệu trực tiếp từ file `bxh.xlsx`
- **660+ vận động viên** với 7 cột thông tin
- Tìm kiếm real-time (tên, nickname, team, ID)
- Phân trang (20/50/100 mỗi trang)
- Podium top 3 với gradient vàng/bạc/đồng
- Responsive: table desktop → card mobile
- Link Facebook cá nhân cho mỗi VĐV

### 📖 Giới Thiệu
- Chế độ chơi (Dream Team, eFootball League, eSports)
- Giá trị cốt lõi và cột mốc phát triển
- FAQ accordion
- Nền tảng hỗ trợ + CTA tải game

---

## ⚙️ API

### `GET /api/bxh`

Đọc file `public/assets/bxh.xlsx` và trả về JSON.

**Response:**

```json
{
  "data": [
    {
      "rank": 1,
      "id": "EFV 237",
      "name": "Ngô Minh Lâm",
      "facebook": "https://facebook.com/...",
      "team": "Wolves Soccer",
      "nickname": "_MQuanBall",
      "points": 250
    }
  ],
  "total": 662
}
```

---

## 📱 Responsive

Website hỗ trợ đầy đủ responsive:

| Breakpoint | Thiết bị | Đặc điểm |
|-----------|---------|----------|
| `< 640px` | Mobile | Menu hamburger, cards stack, table → card view |
| `640px - 1024px` | Tablet | Grid 2 cột, sidebar collapse |
| `> 1024px` | Desktop | Full layout, sidebar visible, table view |

---

## 🤝 Đóng Góp

1. Fork repository
2. Tạo branch mới: `git checkout -b feature/ten-tinh-nang`
3. Commit changes: `git commit -m "feat: mô tả thay đổi"`
4. Push: `git push origin feature/ten-tinh-nang`
5. Tạo Pull Request

---

## 📝 License

© 2026 eFootball™ Vietnam. All rights reserved.  
eFootball™ là thương hiệu đã đăng ký của KONAMI Digital Entertainment.

---

## 👨‍💻 Tác Giả

Dự án thực tập tốt nghiệp — HK2 2022-2023.
