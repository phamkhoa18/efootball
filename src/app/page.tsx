"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Calendar, Gamepad2, Users, Tv, Trophy,
  ChevronRight, ArrowRight, Star, Zap, Shield,
  Smartphone, Monitor, Laptop, Newspaper,
  ShieldCheck, Award, HeartHandshake,
} from "lucide-react";

/* ════ DATA ════ */
const heroSlides = [
  {
    image: "/assets/hero-banner-1.png",
    tag: "SPECIAL PLAYER LIST",
    title: "NATIONAL\nLEGENDS",
    desc: "Các huyền thoại bóng đá nổi tiếng từ khắp thế giới hiện đã có mặt!",
    link: "/tin-tuc/3",
  },
  {
    image: "/assets/hero-banner-1.png",
    tag: "CAMPAIGN",
    title: "CHIẾN DỊCH\nĐẶC BIỆT",
    desc: "Hoàn thành thử thách để nhận cầu thủ huyền thoại và eFootball™ Coin miễn phí!",
    link: "/tin-tuc/6",
  },
];

const latestEvents = [
  { tag: "SPECIAL PLAYER LIST", tagColor: "bg-efb-yellow text-efb-blue", title: "Danh Sách Cầu Thủ Đặc Biệt", link: "/tin-tuc/3" },
  { tag: "CAMPAIGN", tagColor: "bg-white/10 text-white", title: "Chiến Dịch Nhận Quà Kỷ Niệm", link: "/tin-tuc/6" },
];

const infoItems = [
  { date: "24/02/2026", badge: "Quan Trọng", cls: "bg-red-600", title: "Thông Báo Về Số Dư eFootball™ Coin Âm Và Hạn Chế Chức Năng", link: "/tin-tuc/1" },
  { date: "24/02/2026", badge: "Quan Trọng", cls: "bg-red-600", title: "Thông Báo Về Số Dư eFootball™ Coin Âm Và Hạn Chế Chức Năng (Bổ Sung)", link: "/tin-tuc/1" },
  { date: "19/02/2026", badge: "Thông Báo", cls: "bg-cyan-400 text-black", title: "Kỹ Năng Mới \"Attack Trigger\" — Thay Đổi Cách Tấn Công Của Bạn", link: "/tin-tuc/2" },
  { date: "19/02/2026", badge: "Lỗi", cls: "bg-yellow-400 text-black", title: "Vấn Đề Cài Đặt Strip Setting", link: "/tin-tuc/4" },
];

const banners = [
  {
    title: "30TH ANNIVERSARY",
    subtitle: "WEBSITE",
    desc: "Khám phá hành trình 30 năm lịch sử dòng game bóng đá eFootball™ từ KONAMI.",
    btn: "XEM CHI TIẾT",
    link: "/tin-tuc/9",
    gradient: "from-purple-950 via-purple-900 to-purple-950",
  },
  {
    title: "NATIONAL",
    subtitle: "LEGENDS",
    desc: "Chiêu mộ huyền thoại bóng đá vĩ đại nhất thế giới vào đội hình Dream Team.",
    btn: "XEM CHI TIẾT",
    link: "/tin-tuc/3",
    gradient: "from-amber-950 via-amber-900 to-amber-950",
  },
];

const banners2 = [
  {
    title: "FIFAe WORLD CUP",
    subtitle: "2026™",
    desc: "Giải đấu eSports bóng đá lớn nhất thế giới — Vòng loại Đông Nam Á đã khởi tranh!",
    btn: "XEM CHI TIẾT",
    link: "/esports",
    gradient: "from-blue-950 via-blue-900 to-blue-950",
  },
  {
    title: "eFootball™ WORLD",
    subtitle: "FESTIVAL TOKYO",
    desc: "Sự kiện Fan Event kết hợp thi đấu chuyên nghiệp tại Tokyo!",
    btn: "XEM CHI TIẾT",
    link: "/esports",
    gradient: "from-violet-950 via-violet-900 to-violet-950",
  },
];

const tournaments = [
  {
    status: "ĐANG MỞ ĐĂNG KÝ",
    statusColor: "bg-efb-yellow text-efb-blue",
    title: "VIETNAM eFOOTBALL CHAMPIONSHIP 2026",
    meta: [
      { icon: Calendar, text: "15/03/2026" },
      { icon: Gamepad2, text: "Mobile / Console" },
      { icon: Users, text: "512 Slots" },
    ],
    prize: "100.000.000 VNĐ",
    btnLabel: "ĐĂNG KÝ",
    btnLink: "/esports",
    gradient: "from-efb-blue to-efb-blue-dark",
  },
  {
    status: "● ĐANG THI ĐẤU",
    statusColor: "bg-red-600 text-white",
    title: "eFOOTBALL PRO LEAGUE VIETNAM — SEASON 5",
    meta: [
      { icon: Calendar, text: "Đang diễn ra" },
      { icon: Gamepad2, text: "Mobile" },
      { icon: Tv, text: "Trực tiếp YouTube" },
    ],
    prize: "50.000.000 VNĐ",
    btnLabel: "XEM LIVE",
    btnLink: "/esports",
    gradient: "from-red-900 to-efb-blue-dark",
    btnRed: true,
  },
  {
    status: "THỬ THÁCH TUẦN",
    statusColor: "bg-efb-yellow text-efb-blue",
    title: "CỘNG ĐỒNG CUP: ĐƯỜNG ĐẾN HUYỀN THOẠI",
    meta: [
      { icon: Calendar, text: "Hàng tuần" },
      { icon: Gamepad2, text: "Tự do" },
      { icon: Trophy, text: "Quà tặng hiện vật" },
    ],
    prize: "eFootball Coins",
    btnLabel: "THAM GIA",
    btnLink: "/esports",
    gradient: "from-emerald-900 to-efb-blue-dark",
  },
];

const leaderboard = [
  { rank: 1, name: "NGuyenVN_Pro", point: "2,450" },
  { rank: 2, name: "eFootball_Hero", point: "2,380" },
  { rank: 3, name: "Sankid_VN", point: "2,310" },
  { rank: 4, name: "Legend_Mobile", point: "2,250" },
  { rank: 5, name: "PES_Master", point: "2,190" },
];

const platforms = [
  { name: "PlayStation®5", icon: Gamepad2 },
  { name: "PlayStation®4", icon: Gamepad2 },
  { name: "Xbox Series X|S", icon: Monitor },
  { name: "Xbox One", icon: Monitor },
  { name: "PC (Windows)", icon: Laptop },
  { name: "Steam®", icon: Laptop },
  { name: "iOS", icon: Smartphone },
  { name: "Android", icon: Smartphone },
];

/* ═══════════ HERO SLIDER ═══════════ */
function HeroSlider() {
  const [idx, setIdx] = useState(0);

  const next = useCallback(() => {
    setIdx((prev) => (prev + 1) % heroSlides.length);
  }, []);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section className="relative w-full h-screen max-h-[900px] min-h-[600px] overflow-hidden bg-black">
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ transform: `translateX(-${idx * 100}%)` }}
      >
        {heroSlides.map((s, i) => (
          <div key={i} className="min-w-full h-full relative">
            <div className="absolute inset-0 bg-efb-blue-dark">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.opacity = "0"; }}
              />
            </div>
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-efb-blue-dark via-efb-blue-dark/30 to-transparent" />
            {/* Caption */}
            <div className="absolute bottom-[15%] left-0 right-0 px-6 z-10 text-center">
              <span className="inline-block bg-efb-yellow text-efb-blue px-3 py-1 text-[11px] font-bold tracking-wider mb-6">
                {s.tag}
              </span>
              <h2 className="text-[clamp(36px,9vw,80px)] font-bold leading-[0.85] mb-6 whitespace-pre-line">
                {s.title}
              </h2>
              <p className="text-lg text-white/85 max-w-[600px] mx-auto font-light">
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Latest Events sidebar (desktop) */}
      <div className="hidden lg:flex absolute bottom-0 right-0 z-20 bg-black/80 backdrop-blur-xl">
        <div className="text-[10px] font-bold tracking-[0.2em] text-efb-yellow px-5 py-4 border-r border-white/10 flex items-center [writing-mode:vertical-rl] rotate-180">
          LATEST EVENT
        </div>
        {latestEvents.map((e, i) => (
          <Link key={i} href={e.link} className="group px-6 py-5 border-r border-white/5 hover:bg-white/5 transition-colors w-[200px]">
            <span className={`inline-block px-2 py-0.5 text-[9px] font-bold rounded mb-2 ${e.tagColor}`}>
              {e.tag}
            </span>
            <p className="text-sm font-medium leading-snug group-hover:text-efb-yellow transition-colors">
              {e.title}
            </p>
          </Link>
        ))}
      </div>

      {/* Dots */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`h-2.5 rounded-full border-none transition-all duration-300 cursor-pointer ${i === idx
              ? "w-8 bg-efb-yellow"
              : "w-2.5 bg-white/30 hover:bg-white/50"
              }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ═══════════ BANNER COMPONENT ═══════════ */
function Banner({ title, subtitle, desc, btn, link, gradient }: {
  title: string; subtitle: string; desc: string; btn: string; link: string; gradient: string;
}) {
  return (
    <Link href={link} className="block group">
      <div className={`relative w-full aspect-[21/9] min-h-[350px] md:min-h-[300px] overflow-hidden bg-gradient-to-br ${gradient}`}>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Content */}
        <div className="absolute inset-0 px-8 md:px-20 flex flex-col justify-center max-w-[700px] z-10">
          <h2 className="text-[clamp(24px,5vw,56px)] font-bold leading-[0.9] mb-2">
            {title}
            <br />
            <span className="text-efb-yellow">{subtitle}</span>
          </h2>
          <p className="text-sm md:text-base text-white/80 mb-8 font-light max-w-[500px] leading-relaxed">
            {desc}
          </p>
          <span className="inline-flex items-center gap-2 px-8 py-3 border-2 border-efb-yellow text-efb-yellow font-bold text-xs tracking-[0.1em] uppercase w-fit group-hover:bg-efb-yellow group-hover:text-black transition-all duration-300">
            {btn} <ArrowRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

/* ═══════════ SECTION HEAD ═══════════ */
function SectionHead({ title, moreLabel, moreHref }: { title: string; moreLabel?: string; moreHref?: string }) {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-semibold border-l-4 border-efb-yellow pl-4 uppercase">
        {title}
      </h2>
      {moreLabel && moreHref && (
        <Link href={moreHref} className="text-[13px] font-semibold text-efb-yellow tracking-wider hover:opacity-70 transition-opacity flex items-center gap-1">
          {moreLabel} <ChevronRight size={14} />
        </Link>
      )}
    </div>
  );
}

/* ═══════════ HOMEPAGE ═══════════ */
export default function HomePage() {
  return (
    <>
      {/* 1. HERO */}
      <HeroSlider />

      {/* 2. PARTNER BAR */}
      <div className="bg-black/90 border-b border-efb-yellow/80 py-3">
        <div className="max-w-[1240px] mx-auto px-6 flex justify-center items-center gap-3 flex-wrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo.svg" alt="Konami" className="h-5 brightness-0 invert" />
          <span className="text-[10px] font-bold tracking-[0.15em] text-efb-yellow uppercase">
            ĐỐI TÁC ĐỘC QUYỀN TỔ CHỨC GIẢI ĐẤU eFOOTBALL™ TẠI VIỆT NAM
          </span>
        </div>
      </div>

      {/* 3. TOURNAMENT HUB */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-6">
          <SectionHead title="Trung Tâm Giải Đấu" moreLabel="XEM TẤT CẢ" moreHref="/esports" />

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tournaments.map((t, i) => (
              <div
                key={i}
                className="group bg-white/[0.06] backdrop-blur-xl border border-white/15 rounded-xl overflow-hidden hover:-translate-y-1.5 hover:border-efb-yellow/50 transition-all duration-300"
              >
                {/* Thumb */}
                <div className={`relative aspect-video bg-gradient-to-br ${t.gradient}`}>
                  <span className={`absolute top-3 left-3 z-10 px-2.5 py-1 rounded text-[10px] font-bold tracking-wider ${t.statusColor}`}>
                    {t.status}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>

                {/* Info */}
                <div className="p-5">
                  <h3 className="text-sm font-semibold leading-snug mb-4 line-clamp-2 uppercase">
                    {t.title}
                  </h3>
                  <div className="flex flex-col gap-2 mb-5">
                    {t.meta.map((m, j) => (
                      <div key={j} className="flex items-center gap-2 text-[11px] text-white/75 font-medium">
                        <m.icon size={12} className="text-white/50" /> {m.text}
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <span className="text-sm font-bold text-efb-yellow">{t.prize}</span>
                    <Link
                      href={t.btnLink}
                      className={`px-5 py-2 rounded text-xs font-bold transition-all ${t.btnRed
                        ? "bg-red-600 text-white hover:bg-red-500"
                        : "bg-efb-yellow text-efb-blue hover:bg-white"
                        }`}
                    >
                      {t.btnLabel}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. NEWS & LEADERBOARD */}
      <section className="py-24">
        <div className="max-w-[1240px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-16">
          {/* NEWS */}
          <div>
            <SectionHead title="Tin Tức Mới Nhất" moreLabel="TẤT CẢ TIN TỨC" moreHref="/tin-tuc" />
            <div className="flex flex-col bg-white/[0.07] backdrop-blur-xl rounded-xl overflow-hidden divide-y divide-white/10">
              {infoItems.map((item, i) => (
                <Link key={i} href={item.link} className="group">
                  <div className="flex items-center gap-5 px-6 py-5 hover:bg-white/10 transition-colors">
                    <span className="text-[13px] text-white/65 min-w-[85px] font-medium shrink-0">
                      {item.date}
                    </span>
                    <span className={`px-2.5 py-1 rounded text-[10px] font-bold min-w-[70px] text-center shrink-0 ${item.cls}`}>
                      {item.badge}
                    </span>
                    <span className="text-[15px] font-medium flex-1 group-hover:text-efb-yellow transition-colors">
                      {item.title}
                    </span>
                    <ChevronRight size={14} className="text-white/40 group-hover:text-efb-yellow transition-colors shrink-0 hidden sm:block" />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* LEADERBOARD */}
          <div>
            <SectionHead title="Bảng Xếp Hạng VN" />
            <div className="bg-black/60 backdrop-blur-xl rounded-xl border border-white/15 overflow-hidden">
              <div className="bg-white/[0.07] px-5 py-4 font-semibold text-sm uppercase tracking-wider flex items-center gap-2">
                <Trophy size={14} className="text-efb-yellow" />
                TOP 5 GAME THỦ THÁNG 2
              </div>
              {leaderboard.map((p) => (
                <div key={p.rank} className="flex items-center px-5 py-3.5 border-b border-white/10 last:border-b-0">
                  <span className={`w-7 font-bold text-sm ${p.rank <= 3 ? "text-efb-yellow" : "text-white/60"}`}>
                    {p.rank}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-efb-blue to-efb-blue-dark mr-3 flex items-center justify-center">
                    <Star size={12} className="text-efb-yellow/50" />
                  </div>
                  <span className="flex-1 font-medium text-sm">{p.name}</span>
                  <span className="font-semibold text-sm text-white/80">{p.point}</span>
                </div>
              ))}
            </div>
            <Link href="/rankings" className="block text-center mt-4 text-[11px] font-bold text-efb-yellow tracking-wider hover:opacity-70 transition-opacity">
              XEM BẢNG XẾP HẠNG ĐẦY ĐỦ
            </Link>
          </div>
        </div>
      </section>


      {/* 6. ABOUT — GIỚI THIỆU VỀ CHÚNG TÔI */}
      <section className="py-28 relative overflow-hidden">
        {/* Subtle overlay to darken bg slightly */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        {/* Decorative glows */}
        <div className="absolute top-[-200px] left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-[radial-gradient(ellipse,rgba(239,253,4,0.06)_0%,transparent_60%)] pointer-events-none" />
        <div className="absolute bottom-[-100px] right-[-100px] w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(10,20,200,0.2)_0%,transparent_70%)] pointer-events-none" />

        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-efb-yellow/10 border border-efb-yellow/20 backdrop-blur-md rounded-full px-5 py-2 mb-6">
              <Shield size={14} className="text-efb-yellow" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase">ĐỐI TÁC ĐỘC QUYỀN TẠI VIỆT NAM</span>
            </div>
            <h2 className="text-[clamp(32px,7vw,60px)] font-bold mb-6 leading-[0.95]">
              VỀ <span className="text-efb-yellow">CHÚNG TÔI</span>
            </h2>
            <p className="text-lg text-white/80 max-w-[700px] mx-auto leading-relaxed font-light">
              Đơn vị được <span className="text-efb-yellow font-semibold">KONAMI</span> cấp phép độc quyền
              tổ chức giải đấu và vận hành hệ sinh thái eFootball™ tại thị trường Việt Nam.
            </p>
          </div>

          {/* Two columns: Story + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Story — glass card */}
            <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-14 h-1 bg-gradient-to-r from-efb-yellow to-efb-yellow/0 rounded-full" />
                <span className="text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase">CÂU CHUYỆN CỦA CHÚNG TÔI</span>
              </div>
              <h3 className="text-3xl font-bold mb-8 leading-snug">
                Kiến Tạo Sân Chơi Bóng Đá Số
                <br />
                <span className="bg-gradient-to-r from-efb-yellow to-yellow-300 bg-clip-text text-transparent">Hàng Đầu Việt Nam</span>
              </h3>
              <div className="space-y-5 text-[15px] text-white/80 leading-[1.9] font-light">
                <p>
                  Chúng tôi tự hào là đơn vị tiên phong trong việc xây dựng hệ sinh thái
                  eSports bóng đá chuyên nghiệp tại Việt Nam. Với sự ủy quyền chính thức
                  từ KONAMI, chúng tôi mang đến những giải đấu eFootball™ đẳng cấp quốc tế
                  cho cộng đồng game thủ Việt.
                </p>
                <p>
                  Từ những giải đấu cộng đồng đến các vòng loại quốc tế như FIFAe World Cup,
                  chúng tôi đảm bảo mỗi giải đấu đều được tổ chức với tiêu chuẩn cao nhất:
                  hệ thống anti-cheat tiên tiến, trọng tài chuyên nghiệp, và phần thưởng
                  xứng đáng.
                </p>
              </div>
            </div>

            {/* Stats grid — glass cards */}
            <div className="grid grid-cols-2 gap-5">
              {[
                { num: "50+", label: "Giải đấu đã tổ chức", icon: Trophy, glow: "from-amber-500/20 to-transparent" },
                { num: "10K+", label: "Game thủ đã tham gia", icon: Users, glow: "from-blue-500/20 to-transparent" },
                { num: "2B+", label: "VNĐ tổng giải thưởng", icon: Zap, glow: "from-green-500/20 to-transparent" },
                { num: "#1", label: "Đối tác độc quyền VN", icon: Shield, glow: "from-purple-500/20 to-transparent" },
              ].map((s, i) => (
                <div key={i} className="relative bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-7 text-center hover:border-efb-yellow/40 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(239,253,4,0.1)] transition-all duration-500 group overflow-hidden">
                  {/* Glow */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${s.glow} rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 -translate-y-8 translate-x-8`} />
                  <s.icon size={28} className="mx-auto mb-4 text-efb-yellow/50 group-hover:text-efb-yellow group-hover:scale-110 transition-all duration-300 relative z-10" />
                  <div className="text-4xl font-bold text-efb-yellow mb-2 relative z-10">{s.num}</div>
                  <div className="text-[11px] font-semibold text-white/70 uppercase tracking-wider relative z-10">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. DỊCH VỤ — WHAT WE DO */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-6">
              DỊCH VỤ CỦA CHÚNG TÔI
            </span>
            <h2 className="text-[clamp(28px,6vw,48px)] font-bold">
              Chúng Tôi <span className="text-efb-yellow">Làm Gì?</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Trophy,
                gradient: "from-amber-500/80 via-amber-600/60 to-transparent",
                borderGlow: "group-hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]",
                title: "Tổ Chức Giải Đấu",
                desc: "Hệ thống giải đấu chuyên nghiệp từ cấp cộng đồng đến quốc tế. Uy tín — minh bạch — phần thưởng hấp dẫn.",
                features: ["Anti-cheat chuyên nghiệp", "Livestream chất lượng cao", "Giải thưởng hàng trăm triệu VNĐ"],
              },
              {
                icon: Users,
                gradient: "from-blue-500/80 via-blue-600/60 to-transparent",
                borderGlow: "group-hover:shadow-[0_0_40px_rgba(59,130,246,0.15)]",
                title: "Sân Chơi Cộng Đồng",
                desc: "Xây dựng cộng đồng eFootball™ lớn nhất Việt Nam. Kết nối game thủ, tạo cơ hội phát triển sự nghiệp eSports.",
                features: ["Bảng xếp hạng quốc gia", "Hệ thống MMR công bằng", "Sự kiện offline giao lưu"],
              },
              {
                icon: Newspaper,
                gradient: "from-violet-500/80 via-violet-600/60 to-transparent",
                borderGlow: "group-hover:shadow-[0_0_40px_rgba(139,92,246,0.15)]",
                title: "Tin Tức & Cập Nhật",
                desc: "Nguồn tin tức eFootball™ chính thống duy nhất bằng tiếng Việt, trực tiếp từ KONAMI.",
                features: ["Tin tức từ KONAMI chính thức", "Hướng dẫn gameplay chuyên sâu", "Review cầu thủ & chiến thuật"],
              },
            ].map((service, i) => (
              <div key={i} className={`group bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl overflow-hidden hover:border-white/25 transition-all duration-500 hover:-translate-y-3 ${service.borderGlow}`}>
                {/* Gradient top bar */}
                <div className="relative h-2">
                  <div className={`absolute inset-0 bg-gradient-to-r ${service.gradient}`} />
                </div>
                {/* Icon */}
                <div className="p-10 pb-0">
                  <div className="w-16 h-16 bg-white/[0.06] border border-white/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <service.icon size={30} className="text-white/80" />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-sm text-white/75 leading-relaxed font-light mb-6">{service.desc}</p>
                </div>
                {/* Features */}
                <div className="px-10 pb-10">
                  <div className="border-t border-white/10 pt-6 flex flex-col gap-3">
                    {service.features.map((f, j) => (
                      <div key={j} className="flex items-center gap-3 text-[13px] text-white/75">
                        <div className="w-2 h-2 rounded-full bg-efb-yellow/60 shrink-0" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. TẠI SAO CHỌN CHÚNG TÔI */}
      <section className="py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(239,253,4,0.05)_0%,transparent_50%)]" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-6">
              TẠI SAO CHỌN CHÚNG TÔI
            </span>
            <h2 className="text-[clamp(28px,6vw,48px)] font-bold mb-4">
              Uy Tín Từ <span className="text-efb-yellow">Bản Quyền Chính Thức</span>
            </h2>
            <p className="text-white/75 max-w-[600px] mx-auto text-sm font-light leading-relaxed">
              Chúng tôi không chỉ tổ chức giải — chúng tôi kiến tạo giấc mơ eSports
              của hàng nghìn game thủ Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: ShieldCheck, title: "Bản Quyền KONAMI", desc: "Giấy phép chính thức, đảm bảo tính hợp pháp và uy tín cho mỗi giải đấu." },
              { icon: Award, title: "Tiêu Chuẩn Quốc Tế", desc: "Quy trình tổ chức theo chuẩn eSports FIFA/KONAMI toàn cầu." },
              { icon: Tv, title: "Trực Tiếp Chuyên Nghiệp", desc: "Hệ thống broadcast 4K, bình luận viên chuyên nghiệp trên YouTube & Facebook." },
              { icon: HeartHandshake, title: "Cộng Đồng Là Số 1", desc: "Mọi hoạt động đều hướng tới lợi ích và sự phát triển của cộng đồng game thủ." },
            ].map((item, i) => (
              <div key={i} className="text-center p-8 rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 hover:border-efb-yellow/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-efb-yellow/15 to-efb-yellow/5 border border-efb-yellow/10 flex items-center justify-center group-hover:from-efb-yellow/25 group-hover:to-efb-yellow/10 transition-all duration-300">
                  <item.icon size={26} className="text-efb-yellow" />
                </div>
                <h4 className="font-bold mb-3 text-lg">{item.title}</h4>
                <p className="text-[13px] text-white/75 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. PLATFORMS + DOWNLOAD CTA */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-efb-blue/20 to-transparent" />
        <div className="max-w-[1240px] mx-auto px-6 relative z-10">
          {/* Glass card */}
          <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-12 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
            <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-efb-yellow mb-3">
              SẴN SÀNG THI ĐẤU?
            </h2>
            <p className="text-[clamp(22px,4vw,36px)] font-bold mb-10">
              Tải eFootball™ Miễn Phí Trên <span className="text-efb-yellow">Mọi Nền Tảng</span>
            </p>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {platforms.map((p) => (
                <div
                  key={p.name}
                  className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-5 py-3.5 text-xs font-medium text-white/80 flex items-center gap-2 hover:border-efb-yellow/40 hover:bg-efb-yellow/5 hover:text-white transition-all duration-300"
                >
                  <p.icon size={16} className="text-efb-yellow/50" />
                  {p.name}
                </div>
              ))}
            </div>
            <p className="text-[12px] text-white/60 max-w-[500px] mx-auto leading-relaxed mb-10 font-light">
              eFootball™ hỗ trợ chơi chéo nền tảng giữa Console và PC.
              Tải miễn phí và tham gia giải đấu ngay hôm nay!
            </p>
            <Link
              href="/tai-game"
              className="inline-block bg-efb-yellow text-[#0a14c8] px-14 py-4.5 rounded-xl font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(239,253,4,0.2)]"
            >
              TẢI GAME MIỄN PHÍ
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
