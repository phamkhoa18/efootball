"use client";
import Link from "next/link";
import { Facebook, Youtube, Instagram, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative z-10 overflow-hidden">
            {/* Main */}
            <div className="max-w-[1240px] mx-auto px-6 py-14 flex flex-col md:flex-row items-center md:items-start justify-between gap-10">
                {/* Logo + tagline */}
                <div className="flex flex-col items-center md:items-start gap-3">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/assets/logo.svg" alt="eFootball™" className="h-8" />
                    <p className="text-[11px] text-white/70 font-light text-center md:text-left max-w-[260px] leading-relaxed">
                        Đối tác độc quyền tổ chức giải đấu eFootball™ tại Việt Nam.
                    </p>
                </div>

                {/* Links */}
                <div className="flex gap-10 text-center md:text-left">
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-efb-yellow uppercase mb-1">Khám Phá</span>
                        <Link href="/gioi-thieu" className="text-[13px] text-white/70 hover:text-white transition-colors">Giới Thiệu</Link>
                        <Link href="/tin-tuc" className="text-[13px] text-white/70 hover:text-white transition-colors">Tin Tức</Link>
                        <Link href="/esports" className="text-[13px] text-white/70 hover:text-white transition-colors">Giải Đấu</Link>
                    </div>
                    <div className="flex flex-col gap-2.5">
                        <span className="text-[10px] font-bold tracking-[0.15em] text-efb-yellow uppercase mb-1">Hỗ Trợ</span>
                        <Link href="/tai-game" className="text-[13px] text-white/70 hover:text-white transition-colors">Tải Game</Link>
                        <Link href="/contact" className="text-[13px] text-white/70 hover:text-white transition-colors">Liên Hệ</Link>
                        <a href="https://www.konami.com/efootball/" target="_blank" rel="noopener" className="text-[13px] text-white/70 hover:text-white transition-colors">KONAMI</a>
                    </div>
                </div>

                {/* Socials */}
                <div className="flex gap-3">
                    {[
                        { icon: Facebook, href: "#" },
                        { icon: Youtube, href: "#" },
                        { icon: Instagram, href: "#" },
                        { icon: Twitter, href: "#" },
                    ].map((s, i) => (
                        <a key={i} href={s.href} target="_blank" rel="noopener" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-efb-yellow hover:text-[#0a14c8] transition-all duration-300">
                            <s.icon size={16} />
                        </a>
                    ))}
                </div>
            </div>

            {/* Bottom bar */}
            <div className="border-t border-white/10">
                <div className="max-w-[1240px] mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-[11px] text-white/50 font-light">
                        © 2026 eFootball™ Vietnam. Powered by KONAMI.
                    </p>
                    <p className="text-[10px] text-white/40 font-light">
                        eFootball™ is a registered trademark of Konami Digital Entertainment.
                    </p>
                </div>
            </div>
        </footer>
    );
}
