"use client";
import { useState, useEffect, useMemo } from "react";
import {
    Search, Trophy, Crown, Medal, ChevronLeft, ChevronRight,
    Users, ExternalLink, Gamepad2, Award,
} from "lucide-react";

type Player = {
    rank: number | string;
    id: string;
    name: string;
    facebook: string;
    team: string;
    nickname: string;
    points: number | string;
};

const PER_PAGE_OPTIONS = [20, 50, 100];

export default function BXHPage() {
    const [allData, setAllData] = useState<Player[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(20);

    useEffect(() => {
        fetch("/api/bxh")
            .then((r) => r.json())
            .then((d) => { setAllData(d.data); setLoading(false); })
            .catch(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        if (!search.trim()) return allData;
        const q = search.toLowerCase();
        return allData.filter((p) =>
            String(p.name).toLowerCase().includes(q) ||
            String(p.nickname).toLowerCase().includes(q) ||
            String(p.team).toLowerCase().includes(q) ||
            String(p.id).toLowerCase().includes(q)
        );
    }, [search, allData]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
    const currentPage = Math.min(page, totalPages);
    const paged = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);
    const top3 = allData.slice(0, 3);

    useEffect(() => { setPage(1); }, [search, perPage]);

    const pageRange = useMemo(() => {
        const range: number[] = [];
        const start = Math.max(1, currentPage - 2);
        const end = Math.min(totalPages, currentPage + 2);
        for (let i = start; i <= end; i++) range.push(i);
        return range;
    }, [currentPage, totalPages]);

    return (
        <div className="overflow-x-hidden">
            {/* ═══ HERO ═══ */}
            <section className="relative pt-28 pb-10 overflow-hidden">
                <div className="max-w-[1100px] mx-auto px-6 relative z-10 text-center">
                    <div className="inline-flex items-center gap-2 bg-efb-yellow text-[#0a14c8] rounded-full px-5 py-2 mb-5 font-bold text-[12px] tracking-[0.15em] shadow-[0_4px_20px_rgba(239,253,4,0.3)]">
                        <Trophy size={15} /> BẢNG XẾP HẠNG EFV
                    </div>
                    <h1 className="text-[clamp(30px,6vw,52px)] font-extrabold mb-3 leading-[0.95]">
                        eFootball™ Vietnam{" "}
                        <span className="bg-gradient-to-r from-efb-yellow via-amber-300 to-yellow-500 bg-clip-text text-transparent">Rankings</span>
                    </h1>
                    <p className="text-white/70 max-w-[450px] mx-auto text-sm font-light">
                        {allData.length > 0 ? `${allData.length} vận động viên • Cập nhật liên tục` : "Đang tải..."}
                    </p>
                </div>
            </section>

            {/* ═══ TOP 3 PODIUM — solid bright cards ═══ */}
            {!search.trim() && top3.length === 3 && (
                <section className="pb-8">
                    <div className="max-w-[920px] mx-auto px-6">
                        <div className="flex items-end justify-center gap-2 sm:gap-4">
                            {[1, 0, 2].map((oi, vi) => {
                                const p = top3[oi];
                                const configs = [
                                    { bg: "bg-gradient-to-b from-yellow-300 via-yellow-400 to-amber-500", textMain: "text-yellow-900", textSub: "text-yellow-800/60", h: "h-[180px] sm:h-[240px]", shadow: "shadow-[0_8px_40px_rgba(250,204,21,0.35)]" },
                                    { bg: "bg-gradient-to-b from-slate-100 via-slate-200 to-slate-400", textMain: "text-slate-800", textSub: "text-slate-600/70", h: "h-[155px] sm:h-[200px]", shadow: "shadow-[0_8px_30px_rgba(148,163,184,0.25)]" },
                                    { bg: "bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700", textMain: "text-amber-900", textSub: "text-amber-800/60", h: "h-[145px] sm:h-[190px]", shadow: "shadow-[0_8px_30px_rgba(217,119,6,0.25)]" },
                                ];
                                const c = configs[oi];
                                const isGold = oi === 0;
                                return (
                                    <div key={oi} className={`flex-1 min-w-0 ${vi === 1 ? "order-2" : vi === 0 ? "order-1" : "order-3"}`}>
                                        <div className={`${c.bg} ${c.shadow} ${c.h} rounded-xl sm:rounded-2xl px-2 sm:px-5 py-3 sm:py-5 text-center flex flex-col items-center justify-end relative overflow-hidden`}>
                                            <span className={`text-2xl sm:text-5xl mb-1 sm:mb-2`}>{["🥇", "🥈", "🥉"][oi]}</span>
                                            <h3 className={`font-extrabold text-[11px] sm:text-[15px] ${c.textMain} truncate w-full`}>{p.nickname || p.name}</h3>
                                            <div className={`font-black text-lg sm:text-3xl ${c.textMain} leading-tight`}>{String(p.points)}</div>
                                            <span className={`text-[7px] sm:text-[9px] ${c.textSub} font-bold uppercase tracking-widest`}>ĐIỂM</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ═══ SEARCH + CONTROLS ═══ */}
            <section className="pb-4">
                <div className="max-w-[920px] mx-auto px-6">
                    {/* Stats row */}
                    <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3 mb-4 sm:justify-center">
                        {[
                            { icon: Users, label: "Tổng VĐV", value: allData.length, color: "bg-blue-500 text-white" },
                            { icon: Trophy, label: "Top Điểm", value: allData[0] ? String(allData[0].points) : "—", color: "bg-amber-500 text-white" },
                            { icon: Gamepad2, label: "Kết quả", value: filtered.length, color: "bg-violet-500 text-white" },
                            { icon: Award, label: "Trang", value: `${currentPage}/${totalPages}`, color: "bg-emerald-500 text-white" },
                        ].map((s, i) => (
                            <div key={i} className={`${s.color} rounded-xl px-4 py-2.5 flex items-center gap-2 shadow-lg`}>
                                <s.icon size={16} />
                                <span className="font-extrabold text-[14px]">{String(s.value)}</span>
                                <span className="text-[10px] opacity-80 font-medium">{s.label}</span>
                            </div>
                        ))}
                    </div>

                    {/* Search + per page */}
                    <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
                        <div className="relative flex-1">
                            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Tìm tên, nickname, team, ID..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-white rounded-xl pl-11 pr-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-efb-yellow shadow-lg border-0 transition-all"
                            />
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                            {PER_PAGE_OPTIONS.map((n) => (
                                <button
                                    key={n}
                                    onClick={() => setPerPage(n)}
                                    className={`px-4 py-2.5 rounded-xl text-[12px] font-bold transition-all shadow-md ${perPage === n
                                        ? "bg-efb-yellow text-[#0a14c8]"
                                        : "bg-white text-slate-500 hover:bg-slate-100"
                                        }`}
                                >
                                    {n}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ═══ LEADERBOARD — solid white cards ═══ */}
            <section className="pb-24">
                <div className="max-w-[920px] mx-auto px-6">

                    {loading ? (
                        <div className="bg-white rounded-2xl py-20 text-center shadow-xl">
                            <div className="w-12 h-12 border-4 border-slate-200 border-t-efb-yellow rounded-full animate-spin mx-auto mb-4" />
                            <p className="text-slate-500 font-medium">Đang tải dữ liệu...</p>
                        </div>
                    ) : paged.length === 0 ? (
                        <div className="bg-white rounded-2xl py-20 text-center shadow-xl">
                            <Search size={36} className="mx-auto mb-4 text-slate-300" />
                            <p className="text-lg text-slate-500 font-semibold">Không tìm thấy kết quả</p>
                            <p className="text-sm text-slate-400 mt-1">Thử từ khóa khác</p>
                        </div>
                    ) : (
                        <div className="bg-white rounded-2xl overflow-hidden shadow-xl">
                            {/* Table header */}
                            <div className="hidden md:grid grid-cols-[55px_80px_1fr_140px_1fr_90px_45px] px-5 py-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 border-b border-slate-100">
                                <span>#</span>
                                <span>ID</span>
                                <span>Họ Tên VĐV</span>
                                <span>Team</span>
                                <span>Nickname</span>
                                <span className="text-right">Điểm</span>
                                <span className="text-center">FB</span>
                            </div>

                            {/* Rows */}
                            {paged.map((p, idx) => {
                                const r = Number(p.rank);
                                const rowBg =
                                    r === 1 ? "bg-gradient-to-r from-yellow-50 via-amber-50 to-white" :
                                        r === 2 ? "bg-gradient-to-r from-slate-50 to-white" :
                                            r === 3 ? "bg-gradient-to-r from-amber-50/60 to-white" :
                                                idx % 2 === 0 ? "bg-white" : "bg-slate-50/70";

                                return (
                                    <div
                                        key={idx}
                                        className={`${rowBg} border-b border-slate-100 last:border-b-0 hover:bg-blue-50/50 transition-colors`}
                                    >
                                        {/* Desktop */}
                                        <div className="hidden md:grid grid-cols-[55px_80px_1fr_140px_1fr_90px_45px] px-5 py-3.5 items-center group">
                                            {/* Rank */}
                                            <div>
                                                {r === 1 ? (
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center shadow-md">
                                                        <Crown size={15} className="text-white" />
                                                    </div>
                                                ) : r === 2 ? (
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-300 to-slate-500 flex items-center justify-center shadow-md">
                                                        <Medal size={15} className="text-white" />
                                                    </div>
                                                ) : r === 3 ? (
                                                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center shadow-md">
                                                        <Medal size={15} className="text-white" />
                                                    </div>
                                                ) : (
                                                    <span className="text-[14px] font-bold text-slate-400 pl-2">{r}</span>
                                                )}
                                            </div>
                                            {/* ID */}
                                            <span className="text-[11px] text-indigo-500 font-mono font-medium">{p.id}</span>
                                            {/* Name */}
                                            <p className="font-semibold text-[14px] text-slate-800 truncate group-hover:text-indigo-600 transition-colors">{p.name}</p>
                                            {/* Team */}
                                            <div>
                                                {p.team ? (
                                                    <span className="text-[11px] bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full font-medium border border-indigo-100">{p.team}</span>
                                                ) : (
                                                    <span className="text-slate-300 text-[11px]">—</span>
                                                )}
                                            </div>
                                            {/* Nickname */}
                                            <span className="text-[13px] text-slate-600 font-medium truncate">{p.nickname}</span>
                                            {/* Points */}
                                            <div className="text-right">
                                                <span className={`font-extrabold text-[16px] ${r === 1 ? "text-amber-600" :
                                                    r === 2 ? "text-slate-600" :
                                                        r === 3 ? "text-amber-700" :
                                                            "text-slate-800"
                                                    }`}>{String(p.points)}</span>
                                            </div>
                                            {/* FB */}
                                            <div className="flex justify-center">
                                                {p.facebook ? (
                                                    <a href={String(p.facebook)} target="_blank" rel="noopener" className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 hover:bg-blue-100 hover:scale-110 transition-all border border-blue-100">
                                                        <ExternalLink size={13} />
                                                    </a>
                                                ) : (
                                                    <span className="text-slate-200">—</span>
                                                )}
                                            </div>
                                        </div>

                                        {/* Mobile */}
                                        <div className="md:hidden px-4 py-3.5">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 shrink-0">
                                                    {r <= 3 ? (
                                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-md text-white ${r === 1 ? "bg-gradient-to-br from-yellow-400 to-amber-600" :
                                                            r === 2 ? "bg-gradient-to-br from-slate-300 to-slate-500" :
                                                                "bg-gradient-to-br from-amber-400 to-amber-700"
                                                            }`}>
                                                            {r === 1 ? <Crown size={15} /> : <Medal size={15} />}
                                                        </div>
                                                    ) : (
                                                        <span className="text-[15px] font-bold text-slate-400 block text-center">{r}</span>
                                                    )}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-bold text-[14px] text-slate-800 truncate">{p.name}</p>
                                                    <div className="flex items-center gap-2 flex-wrap mt-0.5">
                                                        <span className="text-[10px] text-indigo-500 font-mono">{p.id}</span>
                                                        {p.team && <span className="text-[10px] bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded-full">{p.team}</span>}
                                                        <span className="text-[10px] text-slate-500">{p.nickname}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right shrink-0">
                                                    <span className={`font-extrabold text-[18px] ${r <= 3 ? "text-amber-600" : "text-slate-800"}`}>{String(p.points)}</span>
                                                    <p className="text-[8px] text-slate-400 uppercase tracking-widest">ĐIỂM</p>
                                                </div>
                                                {p.facebook && (
                                                    <a href={String(p.facebook)} target="_blank" rel="noopener" className="w-7 h-7 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500 shrink-0">
                                                        <ExternalLink size={12} />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}

                            {/* Pagination inside card */}
                            <div className="flex flex-col sm:flex-row items-center justify-between px-5 py-4 bg-slate-50 border-t border-slate-100 gap-3">
                                <p className="text-[12px] text-slate-400 font-medium">
                                    <span className="text-slate-700 font-bold">{(currentPage - 1) * perPage + 1}–{Math.min(currentPage * perPage, filtered.length)}</span> / {filtered.length} VĐV
                                </p>
                                <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap justify-center">
                                    <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={currentPage <= 1}
                                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-25 transition-all shadow-sm">
                                        <ChevronLeft size={16} />
                                    </button>
                                    {pageRange[0] > 1 && (
                                        <>
                                            <button onClick={() => setPage(1)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[12px] font-bold text-slate-500 hover:bg-slate-100 transition-all shadow-sm">1</button>
                                            {pageRange[0] > 2 && <span className="text-slate-300 px-0.5">⋯</span>}
                                        </>
                                    )}
                                    {pageRange.map((n) => (
                                        <button key={n} onClick={() => setPage(n)}
                                            className={`w-9 h-9 rounded-lg flex items-center justify-center text-[12px] font-bold transition-all shadow-sm ${n === currentPage ? "bg-indigo-600 text-white shadow-indigo-200" : "bg-white border border-slate-200 text-slate-500 hover:bg-slate-100"
                                                }`}>
                                            {n}
                                        </button>
                                    ))}
                                    {pageRange[pageRange.length - 1] < totalPages && (
                                        <>
                                            {pageRange[pageRange.length - 1] < totalPages - 1 && <span className="text-slate-300 px-0.5">⋯</span>}
                                            <button onClick={() => setPage(totalPages)} className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-[12px] font-bold text-slate-500 hover:bg-slate-100 transition-all shadow-sm">{totalPages}</button>
                                        </>
                                    )}
                                    <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={currentPage >= totalPages}
                                        className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-100 disabled:opacity-25 transition-all shadow-sm">
                                        <ChevronRight size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
