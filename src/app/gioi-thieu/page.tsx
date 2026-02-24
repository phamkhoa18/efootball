"use client";
import { useState } from "react";
import Link from "next/link";
import {
    Gamepad2, Users, Trophy, Target, ChevronRight, ChevronDown,
    Shield, Zap, Star, Globe, Award, Monitor, Smartphone, Laptop,
    Tv, Heart, Clock, MapPin, Download,
} from "lucide-react";

/* ═══ GAME MODE DATA ═══ */
const gameModes = [
    {
        num: "01",
        title: "Học Cách Chơi eFootball™!",
        desc: "Khi bắt đầu chơi, bạn sẽ được hướng dẫn qua tutorial từng bước bao gồm trận đấu tập. Hệ thống Smart Assist giúp bạn thực hiện dribble, chuyền bóng và sút cầu môn tuyệt đẹp mà không cần lệnh phức tạp.",
        icon: Gamepad2,
        gradient: "from-blue-500/80 via-blue-600/60 to-transparent",
        features: ["Tutorial tương tác", "Smart Assist thông minh", "Chế độ tập luyện AI"],
    },
    {
        num: "02",
        title: "Authentic Team — Đội Thực",
        desc: "Đội Thực là đội sẵn sàng để sử dụng. Chọn câu lạc bộ hoặc đội tuyển quốc gia yêu thích và thưởng thức trận đấu với AI trong chế độ Giao Hữu, hoặc chơi online cùng bạn bè qua Friend Match.",
        icon: Users,
        gradient: "from-emerald-500/80 via-emerald-600/60 to-transparent",
        features: ["400+ đội bóng thực tế", "Giải VĐQG hàng đầu", "Chơi online với bạn bè"],
    },
    {
        num: "03",
        title: "Dream Team — Đội Mơ Ước",
        desc: "Trong Dream Team, bạn xây dựng đội hình riêng bằng cách chiêu mộ cầu thủ và huấn luyện viên yêu thích. Tạo đội bóng kiểu riêng và chinh phục thế giới trong các giải đấu Dream Team!",
        icon: Trophy,
        gradient: "from-amber-500/80 via-amber-600/60 to-transparent",
        features: ["Chiêu mộ Messi, Ronaldo...", "Huấn luyện & nâng cấp", "Giải đấu online toàn cầu"],
    },
    {
        num: "04",
        title: "Hoàn Thành Nhiệm Vụ",
        desc: "Hệ thống Campaign Hub và Line Objectives giúp bạn nhận thưởng liên tục. Hoàn thành nhiệm vụ hàng ngày, hàng tuần để tích lũy tài nguyên và mở khóa cầu thủ đặc biệt.",
        icon: Target,
        gradient: "from-violet-500/80 via-violet-600/60 to-transparent",
        features: ["Nhiệm vụ hàng ngày", "Phần thưởng hấp dẫn", "Mở khóa cầu thủ đặc biệt"],
    },
];

/* ═══ MILESTONES ═══ */
const milestones = [
    { year: "2023", title: "Thành Lập", desc: "Bắt đầu hành trình xây dựng cộng đồng eFootball™ Việt Nam." },
    { year: "2024", title: "Đối Tác KONAMI", desc: "Chính thức được cấp phép độc quyền tổ chức giải đấu eFootball™ tại Việt Nam." },
    { year: "2025", title: "Giải Đấu Quốc Gia", desc: "Tổ chức thành công Vietnam eFootball Championship với 5000+ người tham gia." },
    { year: "2026", title: "Vươn Tầm Quốc Tế", desc: "Đại diện Việt Nam tham dự vòng loại eFootball™ World Cup tại Nhật Bản." },
];

/* ═══ FAQ ═══ */
const faqs = [
    { q: "eFootball™ có miễn phí không?", a: "Có! eFootball™ hoàn toàn miễn phí trên tất cả nền tảng: PlayStation, Xbox, PC (Steam), iOS và Android." },
    { q: "Tôi cần cấu hình máy tính như thế nào?", a: "CPU Intel Core i5-2300 / AMD FX-4350, RAM 8GB, GPU NVIDIA GTX 660 / AMD Radeon HD 7870 trở lên. Dung lượng ổ cứng khoảng 50GB." },
    { q: "Có hỗ trợ chơi chéo nền tảng không?", a: "Có! eFootball™ hỗ trợ cross-play giữa Console (PS4/PS5/Xbox) và PC. Thiết bị di động chơi riêng với nhau." },
    { q: "Làm sao để tham gia giải đấu?", a: "Truy cập phần \"Giải Đấu\" trên website, chọn giải phù hợp và đăng ký. Bạn cần có tài khoản KONAMI ID và rank tối thiểu tuỳ giải." },
    { q: "Giải đấu có giải thưởng gì?", a: "Tổng giải thưởng lên tới hàng trăm triệu VNĐ tuỳ giải. Ngoài ra còn có phần thưởng in-game, merchandise chính hãng và cơ hội dự giải quốc tế." },
];

/* ═══ VALUES ═══ */
const values = [
    { icon: Shield, title: "Chính Thống", desc: "Bản quyền từ KONAMI, đảm bảo tính hợp pháp cho mọi hoạt động." },
    { icon: Heart, title: "Cộng Đồng", desc: "Xây dựng sân chơi lành mạnh, kết nối hàng nghìn game thủ Việt." },
    { icon: Award, title: "Chất Lượng", desc: "Tiêu chuẩn tổ chức quốc tế, hệ thống anti-cheat tiên tiến." },
    { icon: Globe, title: "Kết Nối", desc: "Cầu nối đưa game thủ Việt Nam ra đấu trường quốc tế." },
];

/* ═══ FAQ ITEM ═══ */
function FaqItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="border-b border-white/10 last:border-b-0">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-6 text-left"
            >
                <span className="font-semibold text-[15px] pr-8">{q}</span>
                <ChevronDown size={18} className={`text-efb-yellow shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${open ? "max-h-40 pb-6" : "max-h-0"}`}>
                <p className="text-sm text-white/75 leading-relaxed font-light">{a}</p>
            </div>
        </div>
    );
}

/* ═══ PAGE ═══ */
export default function OverviewPage() {
    return (
        <>
            {/* ── HERO ── */}
            <section className="relative pt-32 pb-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
                {/* Decorative */}
                <div className="absolute top-[-150px] left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(239,253,4,0.06)_0%,transparent_60%)] pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-efb-yellow/10 border border-efb-yellow/20 backdrop-blur-md rounded-full px-5 py-2 mb-6">
                        <Gamepad2 size={14} className="text-efb-yellow" />
                        <span className="text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase">HƯỚNG DẪN CHƠI</span>
                    </div>
                    <h1 className="text-[clamp(36px,8vw,72px)] font-bold mb-6 leading-[0.9]">
                        HÃY CHƠI<br />
                        <span className="bg-gradient-to-r from-efb-yellow to-yellow-300 bg-clip-text text-transparent">eFootball™!</span>
                    </h1>
                    <p className="text-lg text-white/80 max-w-[650px] mx-auto leading-relaxed font-light mb-12">
                        Trải nghiệm bóng đá đỉnh cao hoàn toàn miễn phí. Từ &quot;Authentic Team&quot; đến
                        &quot;Dream Team&quot;, đây là nơi bóng đá thực tế và giấc mơ hội tụ!
                    </p>

                    {/* Stats bar */}
                    <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                        {[
                            { icon: Globe, label: "900M+ Lượt tải", },
                            { icon: Users, label: "Toàn cầu" },
                            { icon: Monitor, label: "Cross-play" },
                            { icon: Star, label: "Miễn phí 100%" },
                        ].map((s, i) => (
                            <div key={i} className="flex items-center gap-2 bg-white/[0.07] backdrop-blur-xl border border-white/15 rounded-full px-5 py-2.5">
                                <s.icon size={14} className="text-efb-yellow" />
                                <span className="text-[12px] font-semibold text-white/85">{s.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── GAME MODES ── */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60" />
                <div className="max-w-[1100px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-6">
                            CÁC CHẾ ĐỘ CHƠI
                        </span>
                        <h2 className="text-[clamp(28px,6vw,48px)] font-bold">
                            Khám Phá <span className="text-efb-yellow">eFootball™</span>
                        </h2>
                    </div>

                    <div className="flex flex-col gap-20">
                        {gameModes.map((mode, i) => (
                            <div
                                key={i}
                                className={`flex flex-col lg:flex-row gap-10 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                            >
                                {/* Icon card */}
                                <div className="relative shrink-0">
                                    <div className="w-44 h-44 bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl flex items-center justify-center shadow-[0_20px_60px_rgba(0,0,0,0.3)] group hover:-translate-y-2 transition-all duration-500">
                                        {/* Gradient top bar */}
                                        <div className="absolute top-0 left-0 right-0 h-1.5 rounded-t-3xl overflow-hidden">
                                            <div className={`h-full bg-gradient-to-r ${mode.gradient}`} />
                                        </div>
                                        <mode.icon size={56} className="text-white/80" />
                                    </div>
                                    {/* Step number */}
                                    <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-efb-yellow flex items-center justify-center shadow-[0_0_20px_rgba(239,253,4,0.3)]">
                                        <span className="text-sm font-bold text-[#0a14c8]">{mode.num}</span>
                                    </div>
                                </div>

                                {/* Content card */}
                                <div className="flex-1 bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-10 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                                    <h3 className="text-2xl font-bold mb-4">{mode.title}</h3>
                                    <p className="text-[15px] text-white/80 leading-[1.8] font-light mb-6">{mode.desc}</p>
                                    <div className="flex flex-wrap gap-3">
                                        {mode.features.map((f, j) => (
                                            <span key={j} className="bg-white/[0.06] border border-white/10 rounded-full px-4 py-1.5 text-[12px] font-medium text-white/75 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-efb-yellow" />
                                                {f}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── VỀ CHÚNG TÔI ── */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(10,20,200,0.12)_0%,transparent_50%)]" />
                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-20">
                        <span className="inline-block bg-efb-yellow/10 border border-efb-yellow/20 backdrop-blur-md rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-6">
                            VỀ CHÚNG TÔI
                        </span>
                        <h2 className="text-[clamp(28px,6vw,48px)] font-bold mb-4">
                            Đối Tác Độc Quyền <span className="text-efb-yellow">KONAMI</span>
                        </h2>
                        <p className="text-white/80 max-w-[650px] mx-auto text-sm font-light leading-relaxed">
                            Chúng tôi là đơn vị được KONAMI cấp phép độc quyền tổ chức giải đấu và
                            vận hành hệ sinh thái eFootball™ tại Việt Nam.
                        </p>
                    </div>

                    {/* Values */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
                        {values.map((v, i) => (
                            <div key={i} className="text-center p-8 rounded-3xl bg-white/[0.07] backdrop-blur-2xl border border-white/15 hover:border-efb-yellow/30 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.3)] transition-all duration-500 group">
                                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-efb-yellow/15 to-efb-yellow/5 border border-efb-yellow/10 flex items-center justify-center group-hover:from-efb-yellow/25 group-hover:to-efb-yellow/10 transition-all duration-300">
                                    <v.icon size={26} className="text-efb-yellow" />
                                </div>
                                <h4 className="font-bold mb-3 text-lg">{v.title}</h4>
                                <p className="text-[13px] text-white/75 leading-relaxed font-light">{v.desc}</p>
                            </div>
                        ))}
                    </div>

                    {/* Timeline */}
                    <div className="relative">
                        <div className="text-center mb-14">
                            <h3 className="text-2xl font-bold">
                                Hành Trình <span className="text-efb-yellow">Phát Triển</span>
                            </h3>
                        </div>
                        {/* Desktop timeline */}
                        <div className="hidden md:block">
                            {/* Line */}
                            <div className="absolute left-1/2 -translate-x-px top-[80px] bottom-0 w-0.5 bg-gradient-to-b from-efb-yellow/50 via-white/10 to-transparent" />
                            <div className="flex flex-col gap-0">
                                {milestones.map((m, i) => (
                                    <div key={i} className={`flex items-center gap-10 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                                        <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                                            <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-6 inline-block max-w-[400px] hover:border-efb-yellow/30 transition-all duration-300">
                                                <span className="text-efb-yellow font-bold text-lg">{m.year}</span>
                                                <h4 className="font-semibold mt-1 mb-2">{m.title}</h4>
                                                <p className="text-[13px] text-white/75 leading-relaxed font-light">{m.desc}</p>
                                            </div>
                                        </div>
                                        {/* Dot */}
                                        <div className="w-4 h-4 rounded-full bg-efb-yellow border-4 border-efb-blue-dark shadow-[0_0_15px_rgba(239,253,4,0.4)] shrink-0 z-10" />
                                        <div className="flex-1" />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* Mobile timeline */}
                        <div className="md:hidden flex flex-col gap-6">
                            {milestones.map((m, i) => (
                                <div key={i} className="flex items-start gap-4">
                                    <div className="flex flex-col items-center shrink-0">
                                        <div className="w-3 h-3 rounded-full bg-efb-yellow shadow-[0_0_10px_rgba(239,253,4,0.4)]" />
                                        {i < milestones.length - 1 && <div className="w-0.5 h-full bg-white/10 mt-1" />}
                                    </div>
                                    <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-2xl p-5 flex-1">
                                        <span className="text-efb-yellow font-bold">{m.year}</span>
                                        <h4 className="font-semibold mt-1 mb-1 text-sm">{m.title}</h4>
                                        <p className="text-[12px] text-white/75 leading-relaxed font-light">{m.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── FAQ ── */}
            <section className="relative py-28 overflow-hidden">
                <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
                <div className="max-w-[800px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-16">
                        <span className="inline-block bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-5 py-2 text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-6">
                            CÂU HỎI THƯỜNG GẶP
                        </span>
                        <h2 className="text-[clamp(24px,5vw,40px)] font-bold">
                            FAQ
                        </h2>
                    </div>

                    <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl px-8 md:px-12 py-2 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                        {faqs.map((faq, i) => (
                            <FaqItem key={i} q={faq.q} a={faq.a} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PLATFORMS + CTA ── */}
            <section className="relative py-24 overflow-hidden">
                <div className="absolute inset-0 bg-black/55 backdrop-blur-[2px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-efb-blue/20 to-transparent" />
                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="bg-white/[0.07] backdrop-blur-2xl border border-white/15 rounded-3xl p-12 md:p-16 text-center shadow-[0_40px_100px_rgba(0,0,0,0.4)]">
                        <h2 className="text-sm font-bold uppercase tracking-[0.25em] text-efb-yellow mb-3">
                            SẴN SÀNG BẮT ĐẦU?
                        </h2>
                        <p className="text-[clamp(22px,4vw,36px)] font-bold mb-4">
                            Tải eFootball™ Miễn Phí <span className="text-efb-yellow">Ngay Hôm Nay</span>
                        </p>
                        <p className="text-sm text-white/75 max-w-[500px] mx-auto mb-10 font-light leading-relaxed">
                            Bắt đầu hành trình bóng đá của bạn trên mọi nền tảng.
                            Tham gia cộng đồng hàng triệu game thủ trên toàn thế giới!
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            {[
                                { name: "PlayStation", icon: Tv },
                                { name: "Xbox", icon: Monitor },
                                { name: "PC (Steam)", icon: Laptop },
                                { name: "iOS", icon: Smartphone },
                                { name: "Android", icon: Smartphone },
                            ].map((p) => (
                                <div key={p.name} className="bg-white/[0.08] backdrop-blur-md border border-white/15 rounded-xl px-5 py-3.5 text-xs font-medium text-white/80 flex items-center gap-2 hover:border-efb-yellow/40 hover:bg-efb-yellow/5 hover:text-white transition-all duration-300">
                                    <p.icon size={16} className="text-efb-yellow/50" />
                                    {p.name}
                                </div>
                            ))}
                        </div>
                        <Link
                            href="/tai-game"
                            className="inline-flex items-center gap-2 bg-efb-yellow text-[#0a14c8] px-14 py-4.5 rounded-xl font-bold text-sm tracking-wider hover:bg-white hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(239,253,4,0.2)]"
                        >
                            <Download size={16} /> TẢI GAME MIỄN PHÍ
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
