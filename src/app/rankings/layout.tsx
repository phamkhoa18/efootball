import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Xếp Hạng Game Thủ",
    description:
        "Bảng xếp hạng game thủ eFootball™ — Theo dõi thứ hạng, điểm số, thành tích và lịch sử thi đấu của các tuyển thủ hàng đầu Việt Nam.",
    openGraph: {
        title: "Xếp Hạng Game Thủ | eFootball™ Vietnam",
        description:
            "Theo dõi thứ hạng và thành tích của các game thủ eFootball™ hàng đầu Việt Nam.",
        url: "https://efootball.vn/rankings",
    },
    alternates: {
        canonical: "https://efootball.vn/rankings",
    },
};

export default function RankingsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
