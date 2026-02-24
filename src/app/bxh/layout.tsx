import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Bảng Xếp Hạng EFV",
    description:
        "Bảng xếp hạng điểm EFV chính thức — Tra cứu thứ hạng, điểm số, team và thông tin của hơn 660 vận động viên eFootball™ Vietnam.",
    openGraph: {
        title: "Bảng Xếp Hạng EFV | eFootball™ Vietnam",
        description:
            "Tra cứu thứ hạng, điểm số và thông tin vận động viên eFootball™ Vietnam.",
        url: "https://efootball.vn/bxh",
    },
    alternates: {
        canonical: "https://efootball.vn/bxh",
    },
};

export default function BXHLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
