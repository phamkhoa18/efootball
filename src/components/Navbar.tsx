"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Globe, Download, ChevronRight } from "lucide-react";

const navLinks = [
    { label: "TRANG CHỦ", href: "/" },
    { label: "GIỚI THIỆU", href: "/gioi-thieu" },
    { label: "BẢNG XẾP HẠNG", href: "/bxh" },
    { label: "BẢN QUYỀN", href: "/ban-quyen" },
    { label: "HỖ TRỢ", href: "/ho-tro" },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    const isActive = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    useEffect(() => {
        const h = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", h);
        return () => window.removeEventListener("scroll", h);
    }, []);

    useEffect(() => {
        setIsOpen(false);
        document.body.style.overflow = "unset";
    }, [pathname]);

    const toggle = () => {
        setIsOpen(!isOpen);
        document.body.style.overflow = !isOpen ? "hidden" : "unset";
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${scrolled
                    ? "bg-efb-blue-dark/90 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
                    : "bg-efb-blue"
                    } ${isOpen ? "!bg-efb-blue-dark" : ""}`}
            >
                {/* Top bar */}
                <div className="h-8 bg-black/30 flex items-center border-b border-white/5">
                    <div className="max-w-[1240px] mx-auto px-6 w-full flex justify-end">
                        <a href="#" className="text-[11px] font-medium text-white/50 flex items-center gap-1.5 hover:text-white/80 transition-colors">
                            <Globe size={11} /> TIẾNG VIỆT (VN)
                        </a>
                    </div>
                </div>

                {/* Main nav */}
                <div className="h-[72px] max-w-[1240px] mx-auto px-6 flex items-center justify-between">
                    <Link href="/" className="shrink-0">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src="/assets/logo.svg" alt="eFootball™" className="h-9 w-auto" />
                    </Link>

                    {/* Desktop */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navLinks.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`text-[14px] font-semibold uppercase tracking-wider transition-colors relative py-2 ${isActive(l.href)
                                    ? "text-efb-yellow after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-efb-yellow"
                                    : "text-white hover:text-efb-yellow"
                                    }`}
                            >
                                {l.label}
                            </Link>
                        ))}
                        <Link
                            href="/tai-game"
                            className="bg-efb-yellow text-[#0a14c8] px-5 py-2.5 rounded font-bold text-xs flex items-center gap-2 hover:bg-white hover:scale-105 transition-all"
                        >
                            TẢI GAME <Download size={14} />
                        </Link>
                    </nav>

                    {/* Mobile toggle */}
                    <button
                        className="lg:hidden text-white p-2 z-[1100]"
                        onClick={toggle}
                        aria-label="Menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile overlay */}
            <div
                className={`fixed inset-0 bg-efb-blue-dark z-[999] pt-[104px] flex flex-col transition-all duration-400 ${isOpen
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-5"
                    }`}
            >
                <div className="flex-1 flex flex-col px-6 pt-10">
                    <div className="flex flex-col gap-2 flex-1">
                        {navLinks.map((l, i) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                className={`text-2xl font-semibold uppercase py-4 border-b border-white/5 flex justify-between items-center transition-all duration-400 ${isActive(l.href) ? "text-efb-yellow" : "text-white"
                                    } ${isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-5"}`}
                                style={{ transitionDelay: `${i * 50}ms` }}
                            >
                                {l.label}
                                <ChevronRight size={18} className="opacity-30" />
                            </Link>
                        ))}
                    </div>
                    <div className="mt-auto pb-10">
                        <Link
                            href="/tai-game"
                            className="block w-full text-center bg-efb-yellow text-efb-blue py-4 rounded font-bold text-sm"
                        >
                            TẢI GAME MIỄN PHÍ
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
