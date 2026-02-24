import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ChevronLeft } from "lucide-react";

export const metadata: Metadata = {
    title: "Tin Tức",
    description:
        "Cập nhật tin tức, sự kiện và thông báo mới nhất về eFootball™ Vietnam. Thông tin bảo trì, cập nhật game, sự kiện đặc biệt và giải đấu.",
    openGraph: {
        title: "Tin Tức | eFootball™ Vietnam",
        description:
            "Cập nhật tin tức, sự kiện và thông báo mới nhất về eFootball™ Vietnam.",
        url: "https://efootball.vn/tin-tuc",
    },
    alternates: {
        canonical: "https://efootball.vn/tin-tuc",
    },
};

const allNews = [
    { id: 1, date: "24/02/2026", tag: "Quan Trọng", tagClass: "bg-red-600", tab: "announcement", title: "Thông Báo Về Số Dư eFootball™ Coin Âm Và Hạn Chế Chức Năng", excerpt: "Chúng tôi thông báo về các biện pháp hạn chế chức năng liên quan đến tài khoản có số dư eFootball™ Coin âm." },
    { id: 2, date: "19/02/2026", tag: "Thông Báo", tagClass: "bg-cyan-400 text-black", tab: "announcement", title: "Kỹ Năng Mới \"Attack Trigger\" — Thay Đổi Cách Tấn Công", excerpt: "Kỹ năng đột phá Attack Trigger vừa được giới thiệu." },
    { id: 3, date: "19/02/2026", tag: "Sự Kiện", tagClass: "bg-emerald-500 text-black", tab: "event", title: "NATIONAL LEGENDS — Huyền Thoại Từ Khắp Thế Giới", excerpt: "Các huyền thoại bóng đá nổi tiếng nhất thế giới hiện đã có mặt!" },
    { id: 4, date: "15/02/2026", tag: "Cập Nhật", tagClass: "bg-blue-500", tab: "update", title: "Bản Cập Nhật V5.3.0 — Cải Thiện Gameplay & Sửa Lỗi", excerpt: "Bản cập nhật V5.3.0 mang đến nhiều cải tiến gameplay quan trọng." },
    { id: 5, date: "10/02/2026", tag: "eSports", tagClass: "bg-violet-500", tab: "esports", title: "FIFAe World Cup 2026™ — Vòng Loại Đông Nam Á", excerpt: "Vòng loại FIFAe World Cup 2026™ khu vực Đông Nam Á chính thức khởi tranh." },
    { id: 6, date: "05/02/2026", tag: "Sự Kiện", tagClass: "bg-emerald-500 text-black", tab: "event", title: "Chiến Dịch Đặc Biệt — Nhận Cầu Thủ Huyền Thoại Miễn Phí", excerpt: "Hoàn thành thử thách trong tháng 2 để nhận phần thưởng đặc biệt." },
    { id: 7, date: "02/02/2026", tag: "Sự Kiện", tagClass: "bg-emerald-500 text-black", tab: "event", title: "World Festival Tokyo 2026 — Thông Tin Sự Kiện Fan", excerpt: "Fan Event kết hợp thi đấu chuyên nghiệp tại Tokyo." },
    { id: 8, date: "28/01/2026", tag: "Cập Nhật", tagClass: "bg-blue-500", tab: "update", title: "Bản Vá V5.2.1 — Sửa Lỗi Strip Setting & Balance Thủ Môn", excerpt: "Bản vá khẩn V5.2.1 sửa lỗi Strip Setting và cải thiện AI thủ môn." },
    { id: 9, date: "20/01/2026", tag: "Thông Báo", tagClass: "bg-cyan-400 text-black", tab: "announcement", title: "Kỷ Niệm 30 Năm eFootball — Website Đặc Biệt Đã Ra Mắt", excerpt: "Website kỷ niệm 30 năm với nhiều nội dung độc quyền đã chính thức ra mắt." },
];

const tabs = [
    { id: "all", label: "Tất Cả" },
    { id: "event", label: "Sự Kiện" },
    { id: "announcement", label: "Thông Báo" },
    { id: "update", label: "Cập Nhật" },
    { id: "esports", label: "eSports" },
];

export default async function NewsPage({ searchParams }: { searchParams: Promise<{ tab?: string }> }) {
    const sp = await searchParams;
    const activeTab = sp?.tab || "all";
    const filtered = activeTab === "all" ? allNews : allNews.filter((n) => n.tab === activeTab);

    return (
        <>
            {/* Hero */}
            <div className="pt-28 pb-16 bg-gradient-to-b from-efb-blue-dark to-transparent text-center">
                <div className="max-w-[1240px] mx-auto px-6">
                    <p className="text-[11px] font-bold tracking-[0.2em] text-efb-yellow uppercase mb-4">NEWS</p>
                    <h1 className="text-[clamp(32px,6vw,56px)] font-bold uppercase mb-3">Tin Tức</h1>
                    <p className="text-white/50 text-sm font-light max-w-[500px] mx-auto">
                        Tất cả thông tin mới nhất về sự kiện, cập nhật game và eSports
                    </p>
                </div>
            </div>

            {/* Tabs */}
            <div className="sticky top-[104px] z-50 bg-efb-blue-dark/70 backdrop-blur-2xl border-b border-white/10">
                <div className="max-w-[1240px] mx-auto px-6 flex justify-center gap-2 py-3 flex-wrap">
                    {tabs.map((t) => (
                        <Link
                            key={t.id}
                            href={t.id === "all" ? "/tin-tuc" : `/tin-tuc?tab=${t.id}`}
                            className={`px-5 py-2 rounded-full text-[13px] font-semibold uppercase transition-all ${activeTab === t.id
                                ? "bg-efb-yellow text-efb-blue"
                                : "text-white/50 hover:text-white hover:bg-white/5"
                                }`}
                        >
                            {t.label}
                        </Link>
                    ))}
                </div>
            </div>

            {/* Grid */}
            <section className="py-16">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {filtered.map((item) => (
                            <Link key={item.id} href={`/tin-tuc/${item.id}`} className="group">
                                <div className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)] h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                                    {/* Image placeholder */}
                                    <div className="aspect-video bg-gradient-to-br from-efb-navy to-efb-blue-dark flex items-center justify-center">
                                        <span className="text-4xl opacity-20">⚽</span>
                                    </div>
                                    {/* Body */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${item.tagClass}`}>
                                                {item.tag}
                                            </span>
                                            <span className="text-[11px] text-gray-400">{item.date}</span>
                                        </div>
                                        <h3 className="text-gray-900 text-base font-semibold leading-snug mb-3 group-hover:text-efb-blue transition-colors line-clamp-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm font-light leading-relaxed flex-1 line-clamp-2">
                                            {item.excerpt}
                                        </p>
                                        <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-efb-blue group-hover:gap-2 transition-all">
                                            ĐỌC THÊM <ChevronRight size={12} />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {filtered.length === 0 && (
                        <p className="text-center py-16 text-white/40">
                            Không có tin tức trong mục này.
                        </p>
                    )}

                    {/* Pagination mock */}
                    <div className="mt-16 flex justify-center items-center gap-3">
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:border-efb-yellow transition-colors">
                            <ChevronLeft size={16} />
                        </button>
                        {[1, 2, 3].map((n) => (
                            <button
                                key={n}
                                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${n === 1 ? "bg-efb-yellow text-efb-blue" : "text-white/50 hover:bg-white/5"
                                    }`}
                            >
                                {n}
                            </button>
                        ))}
                        <button className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/50 hover:border-efb-yellow transition-colors">
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
}
