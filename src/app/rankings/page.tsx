"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import {
    Search, Trophy, Medal, Crown, Star, Users, Calendar,
    ChevronRight, TrendingUp, TrendingDown, Minus, Flame,
    Award, Target, Gamepad2,
} from "lucide-react";

/* ═══ MOCK DATA ═══ */
const allPlayers = [
    { rank: 1, name: "ProPlayer_VN", team: "Team Flash", pts: 2850, wins: 142, loss: 23, tournaments: 18, change: 0, avatar: "⚡" },
    { rank: 2, name: "EFootballKing", team: "GAM Esports", pts: 2720, wins: 135, loss: 28, tournaments: 16, change: 1, avatar: "👑" },
    { rank: 3, name: "SaigonFC_Pro", team: "SBTC Esports", pts: 2680, wins: 128, loss: 31, tournaments: 15, change: -1, avatar: "🔥" },
    { rank: 4, name: "HanoiStriker", team: "Team Flash", pts: 2590, wins: 120, loss: 35, tournaments: 14, change: 2, avatar: "⭐" },
    { rank: 5, name: "DragonBall_99", team: "Freelance", pts: 2510, wins: 115, loss: 38, tournaments: 13, change: 0, avatar: "🐉" },
    { rank: 6, name: "MessiVN_10", team: "V-Gaming", pts: 2480, wins: 112, loss: 40, tournaments: 12, change: -2, avatar: "🏆" },
    { rank: 7, name: "CR7_Vietnam", team: "Freelance", pts: 2420, wins: 108, loss: 42, tournaments: 11, change: 1, avatar: "💎" },
    { rank: 8, name: "TikiTaka_Pro", team: "GAM Esports", pts: 2380, wins: 105, loss: 44, tournaments: 10, change: 3, avatar: "⚽" },
    { rank: 9, name: "GoalMachine", team: "SBTC Esports", pts: 2350, wins: 102, loss: 46, tournaments: 10, change: -1, avatar: "🎯" },
    { rank: 10, name: "VN_Champion", team: "Team Flash", pts: 2300, wins: 98, loss: 48, tournaments: 9, change: 0, avatar: "🏅" },
    { rank: 11, name: "ePES_Master", team: "Freelance", pts: 2250, wins: 95, loss: 50, tournaments: 9, change: 2, avatar: "🎮" },
    { rank: 12, name: "FutureStarVN", team: "V-Gaming", pts: 2200, wins: 92, loss: 52, tournaments: 8, change: -1, avatar: "🌟" },
    { rank: 13, name: "TacticBoss", team: "GAM Esports", pts: 2180, wins: 90, loss: 53, tournaments: 8, change: 0, avatar: "🧠" },
    { rank: 14, name: "PressHighVN", team: "Freelance", pts: 2150, wins: 88, loss: 55, tournaments: 7, change: 1, avatar: "💪" },
    { rank: 15, name: "TopScorer_HN", team: "SBTC Esports", pts: 2100, wins: 85, loss: 57, tournaments: 7, change: -3, avatar: "🥅" },
    { rank: 16, name: "GegenPress01", team: "Team Flash", pts: 2080, wins: 83, loss: 58, tournaments: 6, change: 0, avatar: "🔵" },
    { rank: 17, name: "eFootball_SGN", team: "V-Gaming", pts: 2050, wins: 80, loss: 60, tournaments: 6, change: 2, avatar: "🟡" },
    { rank: 18, name: "MidFieldKing", team: "Freelance", pts: 2020, wins: 78, loss: 62, tournaments: 5, change: -1, avatar: "🟢" },
    { rank: 19, name: "SetPiecePro", team: "GAM Esports", pts: 2000, wins: 76, loss: 63, tournaments: 5, change: 0, avatar: "🎪" },
    { rank: 20, name: "FinishFirst", team: "Freelance", pts: 1980, wins: 74, loss: 65, tournaments: 4, change: 1, avatar: "🏁" },
];

const recentTournaments = [
    { name: "Vietnam eFootball Championship 2026", status: "Đang diễn ra", prize: "500 Triệu VNĐ", date: "15/02 - 30/03", players: 512, statusColor: "bg-green-400" },
    { name: "Saigon Cup Season 3", status: "Sắp diễn ra", prize: "200 Triệu VNĐ", date: "05/04 - 20/04", players: 256, statusColor: "bg-amber-400" },
    { name: "Hanoi Open Monthly #14", status: "Đã kết thúc", prize: "50 Triệu VNĐ", date: "01/02 - 10/02", players: 128, statusColor: "bg-white/40" },
    { name: "Weekly Pro League W7", status: "Đã kết thúc", prize: "20 Triệu VNĐ", date: "08/02 - 09/02", players: 64, statusColor: "bg-white/40" },
];

const tabs = ["Tổng Hợp", "Tuần Này", "Tháng Này", "Theo Giải"];

/* ═══ HELPERS ═══ */
function ChangeIndicator({ val }: { val: number }) {
    if (val > 0) return <span className="flex items-center gap-0.5 text-emerald-400 text-[11px] font-bold"><TrendingUp size={12} /> +{val}</span>;
    if (val < 0) return <span className="flex items-center gap-0.5 text-red-400 text-[11px] font-bold"><TrendingDown size={12} /> {val}</span>;
    return <span className="flex items-center gap-0.5 text-white/30 text-[11px]"><Minus size={12} /></span>;
}

function RankBadge({ rank }: { rank: number }) {
    if (rank === 1) return <div className="w-9 h-9 rounded-full bg-gradient-to-br from-yellow-300 to-amber-600 flex items-center justify-center shadow-[0_0_18px_rgba(245,158,11,0.5)]"><Crown size={16} className="text-black" /></div>;
    if (rank === 2) return <div className="w-9 h-9 rounded-full bg-gradient-to-br from-slate-200 to-slate-500 flex items-center justify-center shadow-[0_0_12px_rgba(156,163,175,0.3)]"><Medal size={16} className="text-black" /></div>;
    if (rank === 3) return <div className="w-9 h-9 rounded-full bg-gradient-to-br from-amber-500 to-amber-800 flex items-center justify-center shadow-[0_0_12px_rgba(180,83,9,0.3)]"><Medal size={16} className="text-black" /></div>;
    return <span className="w-9 h-9 rounded-full bg-[#1a2050]/90 flex items-center justify-center text-sm font-bold text-white/70">{rank}</span>;
}

/* ═══ PAGE ═══ */
export default function RankingsPage() {
    const [search, setSearch] = useState("");
    const [activeTab, setActiveTab] = useState(0);

    const filteredPlayers = useMemo(() => {
        if (!search.trim()) return allPlayers;
        const q = search.toLowerCase();
        return allPlayers.filter(p =>
            p.name.toLowerCase().includes(q) || p.team.toLowerCase().includes(q)
        );
    }, [search]);

    const top3 = allPlayers.slice(0, 3);
    const podiumOrder = [top3[1], top3[0], top3[2]];

    return (
        <>
            {/* ── HERO ── */}
            <section className="relative pt-32 pb-20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-full bg-[radial-gradient(ellipse_at_top,rgba(239,253,4,0.06)_0%,transparent_50%)] pointer-events-none" />

                <div className="max-w-[1240px] mx-auto px-6 relative z-10">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-efb-yellow/20 to-amber-500/10 border border-efb-yellow/30 rounded-full px-6 py-2.5 mb-6">
                            <Trophy size={16} className="text-efb-yellow" />
                            <span className="text-[12px] font-bold tracking-[0.2em] text-efb-yellow uppercase">BẢNG XẾP HẠNG QUỐC GIA</span>
                        </div>
                        <h1 className="text-[clamp(36px,8vw,64px)] font-bold mb-5 leading-[0.9]">
                            Bảng Xếp Hạng{" "}
                            <span className="bg-gradient-to-r from-efb-yellow to-amber-400 bg-clip-text text-transparent">eFootball™</span>
                        </h1>
                        <p className="text-white/80 max-w-[500px] mx-auto text-[15px] font-light leading-relaxed">
                            Theo dõi thứ hạng, điểm số và thành tích của các game thủ hàng đầu Việt Nam
                        </p>
                    </div>

                    {/* Search + Tabs */}
                    <div className="max-w-[600px] mx-auto">
                        <div className="relative mb-5">
                            <Search size={18} className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40" />
                            <input
                                type="text"
                                placeholder="Tìm kiếm game thủ hoặc đội..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-[#0d1235]/90 border-2 border-indigo-500/30 rounded-2xl pl-13 pr-5 py-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-efb-yellow/60 focus:shadow-[0_0_30px_rgba(239,253,4,0.1)] transition-all"
                            />
                        </div>
                        <div className="flex justify-center gap-2 flex-wrap">
                            {tabs.map((tab, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveTab(i)}
                                    className={`px-6 py-2.5 rounded-xl text-[12px] font-bold tracking-wider transition-all duration-300 ${activeTab === i
                                            ? "bg-efb-yellow text-[#0a14c8] shadow-[0_4px_20px_rgba(239,253,4,0.3)]"
                                            : "bg-[#0d1235]/80 text-white/50 hover:text-white hover:bg-[#161f52]/80"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PODIUM ── */}
            {!search.trim() && (
                <section className="pb-12 relative">
                    <div className="max-w-[850px] mx-auto px-6">
                        <div className="flex items-end justify-center gap-5 md:gap-8">
                            {podiumOrder.map((p, i) => {
                                const isGold = i === 1;
                                const configs = [
                                    { h: "h-[220px]", medal: "🥈", grad: "from-slate-500/50 to-slate-800/80", border: "border-slate-400/40", glow: "", label: "bg-slate-400" },
                                    { h: "h-[270px]", medal: "🥇", grad: "from-yellow-500/40 to-amber-800/70", border: "border-yellow-400/50", glow: "shadow-[0_0_50px_rgba(245,158,11,0.2)]", label: "bg-yellow-400" },
                                    { h: "h-[200px]", medal: "🥉", grad: "from-amber-600/40 to-amber-900/70", border: "border-amber-600/40", glow: "", label: "bg-amber-600" },
                                ];
                                const c = configs[i];
                                return (
                                    <div key={p.rank} className={`flex-1 max-w-[240px] ${isGold ? "order-2" : i === 0 ? "order-1" : "order-3"}`}>
                                        <div className={`bg-gradient-to-b ${c.grad} backdrop-blur-sm border ${c.border} rounded-2xl p-6 text-center relative overflow-hidden ${c.h} flex flex-col justify-end ${c.glow} hover:-translate-y-3 transition-all duration-500`}>
                                            <div className={`absolute top-0 left-0 right-0 h-1.5 ${c.label}`} />
                                            <div className="text-5xl mb-2 drop-shadow-lg">{c.medal}</div>
                                            <div className="text-2xl mb-2">{p.avatar}</div>
                                            <h3 className={`font-bold ${isGold ? "text-lg text-yellow-300" : "text-[15px] text-white"}`}>{p.name}</h3>
                                            <p className="text-[11px] text-white/60 mb-3">{p.team}</p>
                                            <div className={`font-extrabold ${isGold ? "text-3xl text-yellow-400" : "text-xl text-white/90"}`}>
                                                {p.pts.toLocaleString()}
                                            </div>
                                            <span className="text-[10px] text-white/40 uppercase tracking-widest">PTS</span>
                                            <div className="flex justify-center gap-5 mt-3">
                                                <span className="text-[11px] font-semibold text-emerald-400">{p.wins}W</span>
                                                <span className="text-[11px] font-semibold text-red-400">{p.loss}L</span>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ── MAIN CONTENT ── */}
            <section className="pb-24 relative">
                <div className="max-w-[1240px] mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-8">

                        {/* ─ LEADERBOARD TABLE ─ */}
                        <div className="bg-[#0d1235]/95 rounded-2xl overflow-hidden border border-indigo-500/20 shadow-[0_20px_80px_rgba(0,0,0,0.4)]">
                            {/* Header */}
                            <div className="flex items-center justify-between px-6 py-5 bg-gradient-to-r from-indigo-900/80 to-[#0d1235]/90 border-b border-indigo-500/20">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-efb-yellow/20 flex items-center justify-center">
                                        <Trophy size={16} className="text-efb-yellow" />
                                    </div>
                                    <span className="font-bold text-sm uppercase tracking-wider">
                                        {search.trim() ? `Kết quả: "${search}"` : tabs[activeTab]}
                                    </span>
                                </div>
                                <span className="text-[11px] text-white/50 bg-white/5 px-3 py-1 rounded-full">{filteredPlayers.length} game thủ</span>
                            </div>

                            {/* Column headers */}
                            <div className="grid grid-cols-[50px_1fr_80px_80px_70px_60px] md:grid-cols-[55px_1fr_100px_90px_80px_70px] px-6 py-3 text-[10px] font-bold text-white/40 uppercase tracking-widest bg-indigo-950/50 border-b border-indigo-500/10">
                                <span>#</span>
                                <span>Game Thủ</span>
                                <span className="text-right">Điểm</span>
                                <span className="text-center">W / L</span>
                                <span className="text-center">Giải</span>
                                <span className="text-right">Trend</span>
                            </div>

                            {/* Rows */}
                            <div>
                                {filteredPlayers.length === 0 ? (
                                    <div className="px-6 py-20 text-center">
                                        <div className="w-16 h-16 rounded-full bg-indigo-900/50 flex items-center justify-center mx-auto mb-4">
                                            <Search size={24} className="text-white/20" />
                                        </div>
                                        <p className="text-sm text-white/50 font-medium">Không tìm thấy game thủ nào</p>
                                        <p className="text-[12px] text-white/25 mt-1">Thử tìm kiếm với tên khác</p>
                                    </div>
                                ) : (
                                    filteredPlayers.map((p) => (
                                        <div
                                            key={p.rank}
                                            className={`grid grid-cols-[50px_1fr_80px_80px_70px_60px] md:grid-cols-[55px_1fr_100px_90px_80px_70px] px-6 py-4 items-center transition-all group cursor-pointer border-b border-indigo-500/8 last:border-b-0 ${p.rank === 1 ? "bg-gradient-to-r from-yellow-500/15 via-amber-500/8 to-transparent hover:from-yellow-500/25" :
                                                    p.rank === 2 ? "bg-gradient-to-r from-slate-400/10 via-slate-400/5 to-transparent hover:from-slate-400/15" :
                                                        p.rank === 3 ? "bg-gradient-to-r from-amber-600/10 via-amber-600/5 to-transparent hover:from-amber-600/15" :
                                                            "hover:bg-indigo-500/8"
                                                }`}
                                        >
                                            <div className="flex items-center justify-center"><RankBadge rank={p.rank} /></div>
                                            <div className="flex items-center gap-3 min-w-0">
                                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-700/60 to-indigo-900/80 border border-indigo-500/20 flex items-center justify-center text-lg shrink-0">
                                                    {p.avatar}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-semibold text-[14px] truncate group-hover:text-efb-yellow transition-colors">{p.name}</p>
                                                    <p className="text-[11px] text-white/45 truncate">{p.team}</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className={`font-bold text-[15px] ${p.rank <= 3 ? "text-efb-yellow" : "text-white"}`}>{p.pts.toLocaleString()}</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-emerald-400 font-bold text-[13px]">{p.wins}</span>
                                                <span className="text-white/15 mx-1">/</span>
                                                <span className="text-red-400/80 text-[13px]">{p.loss}</span>
                                            </div>
                                            <div className="text-center">
                                                <span className="text-[13px] text-white/70 font-semibold">{p.tournaments}</span>
                                            </div>
                                            <div className="flex justify-end"><ChangeIndicator val={p.change} /></div>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* ─ SIDEBAR ─ */}
                        <div className="flex flex-col gap-6">

                            {/* Stats */}
                            <div className="bg-[#0d1235]/95 rounded-2xl p-6 border border-indigo-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                                    <Flame size={16} className="text-efb-yellow" /> Thống Kê Nhanh
                                </h3>
                                <div className="grid grid-cols-2 gap-3">
                                    {[
                                        { icon: Users, label: "Tổng Game Thủ", value: "10,240", bg: "bg-blue-600/25 border-blue-500/20" },
                                        { icon: Gamepad2, label: "Trận Đã Đấu", value: "85,600", bg: "bg-violet-600/25 border-violet-500/20" },
                                        { icon: Trophy, label: "Giải Đấu", value: "52", bg: "bg-amber-600/25 border-amber-500/20" },
                                        { icon: Target, label: "Điểm Cao Nhất", value: "2,850", bg: "bg-emerald-600/25 border-emerald-500/20" },
                                    ].map((s, i) => (
                                        <div key={i} className={`${s.bg} border rounded-xl p-4 text-center hover:brightness-125 transition-all`}>
                                            <s.icon size={20} className="mx-auto mb-2 text-efb-yellow" />
                                            <p className="text-xl font-extrabold">{s.value}</p>
                                            <p className="text-[10px] text-white/50 uppercase tracking-wider mt-1">{s.label}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Tournaments */}
                            <div className="bg-[#0d1235]/95 rounded-2xl p-6 border border-indigo-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                                    <Calendar size={16} className="text-efb-yellow" /> Giải Đấu Gần Đây
                                </h3>
                                <div className="flex flex-col gap-3">
                                    {recentTournaments.map((t, i) => (
                                        <Link key={i} href="/esports" className="group block bg-indigo-900/30 rounded-xl p-4 hover:bg-indigo-800/30 border border-indigo-500/10 hover:border-indigo-500/25 transition-all">
                                            <div className="flex items-start justify-between gap-2 mb-2">
                                                <h4 className="text-[13px] font-semibold leading-snug group-hover:text-efb-yellow transition-colors flex-1">{t.name}</h4>
                                                <span className={`shrink-0 w-2.5 h-2.5 rounded-full mt-1 ${t.statusColor}`} />
                                            </div>
                                            <div className="flex items-center gap-4 text-[10px] text-white/50">
                                                <span className="flex items-center gap-1"><Calendar size={10} /> {t.date}</span>
                                                <span className="flex items-center gap-1"><Users size={10} /> {t.players}</span>
                                            </div>
                                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/5">
                                                <span className="text-[13px] font-bold text-efb-yellow">{t.prize}</span>
                                                <span className="text-[10px] text-white/40">{t.status}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <Link href="/esports" className="flex items-center justify-center gap-1 mt-5 text-[11px] font-bold text-efb-yellow tracking-wider hover:opacity-70 transition-opacity">
                                    XEM TẤT CẢ <ChevronRight size={12} />
                                </Link>
                            </div>

                            {/* Top teams */}
                            <div className="bg-[#0d1235]/95 rounded-2xl p-6 border border-indigo-500/20 shadow-[0_10px_40px_rgba(0,0,0,0.3)]">
                                <h3 className="font-bold text-sm uppercase tracking-wider mb-5 flex items-center gap-2">
                                    <Award size={16} className="text-efb-yellow" /> Top Teams
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {[
                                        { name: "Team Flash", players: 4, pts: 9820, bg: "bg-red-500/20 border-red-500/15" },
                                        { name: "GAM Esports", players: 3, pts: 7280, bg: "bg-orange-500/15 border-orange-500/10" },
                                        { name: "SBTC Esports", players: 3, pts: 7130, bg: "bg-cyan-500/15 border-cyan-500/10" },
                                        { name: "V-Gaming", players: 3, pts: 6730, bg: "bg-purple-500/15 border-purple-500/10" },
                                    ].map((team, i) => (
                                        <div key={i} className={`flex items-center gap-3 py-3 px-4 rounded-xl ${team.bg} border hover:brightness-125 transition-all cursor-pointer`}>
                                            <span className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-extrabold ${i === 0 ? "bg-efb-yellow text-[#0a14c8]" : "bg-white/10 text-white/60"
                                                }`}>{i + 1}</span>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold truncate">{team.name}</p>
                                                <p className="text-[10px] text-white/45">{team.players} thành viên</p>
                                            </div>
                                            <span className="text-[13px] font-bold text-white/80">{team.pts.toLocaleString()}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
