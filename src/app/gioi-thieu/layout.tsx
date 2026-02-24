import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Giới Thiệu",
    description:
        "Tìm hiểu về eFootball™ Vietnam — Cộng đồng game bóng đá lớn nhất Việt Nam. Các chế độ chơi, lịch sử phát triển, nền tảng hỗ trợ và cách tham gia giải đấu.",
    openGraph: {
        title: "Giới Thiệu | eFootball™ Vietnam",
        description:
            "Tìm hiểu về eFootball™ Vietnam — Cộng đồng game bóng đá lớn nhất Việt Nam.",
        url: "https://efootball.vn/gioi-thieu",
    },
    alternates: {
        canonical: "https://efootball.vn/gioi-thieu",
    },
};

export default function GioiThieuLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
