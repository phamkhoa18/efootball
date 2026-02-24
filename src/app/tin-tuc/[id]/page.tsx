import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Clock, Tag, AlertCircle, Share2 } from "lucide-react";

const newsData: Record<string, { date: string; tag: string; tagClass: string; title: string; body: string[] }> = {
    "1": {
        date: "24/02/2026", tag: "Quan Trọng", tagClass: "bg-red-600",
        title: "Thông Báo Về Số Dư eFootball™ Coin Âm Và Hạn Chế Chức Năng",
        body: [
            "Kính gửi quý người chơi eFootball™,",
            "Chúng tôi xin thông báo rằng các tài khoản có số dư eFootball™ Coin âm sẽ bị áp dụng một số hạn chế chức năng kể từ ngày 01/03/2026.",
            "Các hạn chế bao gồm: Không thể tham gia đấu thầu Agent, không thể mua thêm eFootball™ Point Pack, và một số tính năng trong Dream Team sẽ bị tạm thời vô hiệu hóa cho đến khi số dư được phục hồi về 0 hoặc cao hơn.",
            "Chúng tôi sẽ gửi thông báo chi tiết qua email đến các tài khoản bị ảnh hưởng trong vòng 72 giờ tới.",
            "Nếu bạn cho rằng tài khoản của mình bị ảnh hưởng do lỗi hệ thống, hãy liên hệ bộ phận hỗ trợ qua trang Liên Hệ.",
        ],
    },
    "2": {
        date: "19/02/2026", tag: "Thông Báo", tagClass: "bg-cyan-400 text-black",
        title: "Kỹ Năng Mới \"Attack Trigger\" — Thay Đổi Cách Tấn Công Của Bạn",
        body: [
            "Chúng tôi hân hạnh giới thiệu kỹ năng mới \"Attack Trigger\" trong phiên bản V5.3.0!",
            "Attack Trigger cho phép người chơi kích hoạt chuỗi di chuyển tấn công phối hợp giữa cầu thủ mang bóng và đồng đội, tạo ra không gian đột phá trước hàng thủ đối phương.",
            "Cách hoạt động: Khi cầu thủ có kỹ năng Attack Trigger đang cầm bóng, nhấn giữ R1/RB để kích hoạt. Các đồng đội sẽ tự động di chuyển theo lộ trình tối ưu.",
            "Kỹ năng này đặc biệt hiệu quả ở vị trí CAM, CF và tương tác tốt nhất với các cầu thủ có chỉ số Off The Ball cao.",
        ],
    },
    "3": {
        date: "19/02/2026", tag: "Sự Kiện", tagClass: "bg-emerald-500 text-black",
        title: "Sự Kiện NATIONAL LEGENDS — Huyền Thoại Từ Khắp Thế Giới",
        body: [
            "Chúng tôi hân hạnh công bố sự kiện NATIONAL LEGENDS!",
            "Danh sách huyền thoại: Ronaldo (Brazil) – ICON CF 99, Zinedine Zidane – ICON CAM 98, Ronaldinho – ICON CF 97, Roberto Carlos – ICON LB 96.",
            "Cách tham gia: Hoàn thành thử thách hàng ngày để nhận Ticket. Mỗi bộ 50 Ticket đổi lấy gói Agent NATIONAL LEGENDS cấp đảm bảo.",
            "Thời gian sự kiện: 19/02/2026 đến 30/03/2026.",
        ],
    },
    "4": {
        date: "15/02/2026", tag: "Cập Nhật", tagClass: "bg-blue-500",
        title: "Bản Cập Nhật V5.3.0 — Cải Thiện Gameplay & Sửa Lỗi",
        body: [
            "Bản cập nhật V5.3.0 chính thức ra mắt với nhiều cải tiến đáng kể.",
            "Gameplay: Animation dribble được làm mượt mà hơn 30%. Hệ thống va chạm được nâng cấp.",
            "Cân bằng: Midfielder có chỉ số Stamina được cân bằng lại. Thủ môn được tăng phản xạ sút xa.",
            "Sửa Lỗi: Đã sửa lỗi Strip Setting không lưu. Sửa lỗi âm thanh bình luận bị lặp.",
            "Tối ưu hiệu năng: Giảm 15% RAM trên mobile, cải thiện FPS trên PS4 và Xbox One.",
        ],
    },
    "5": {
        date: "10/02/2026", tag: "eSports", tagClass: "bg-violet-500",
        title: "FIFAe World Cup 2026™ — Vòng Loại Khu Vực Đông Nam Á",
        body: [
            "Vòng loại FIFAe World Cup 2026™ khu vực Đông Nam Á chính thức khởi tranh với 8 quốc gia!",
            "Đại diện Việt Nam: NGuyenVN, ProGamer_VN và eFootball_HERO.",
            "Lịch thi đấu: Vòng bảng từ 10/02 đến 20/02/2026 (online). Tứ kết và Bán kết tại Singapore ngày 05-06/03/2026.",
            "Đội vào chung kết sẽ đại diện Đông Nam Á tham dự FIFAe World Cup 2026™ tại Doha, Qatar tháng 07/2026.",
        ],
    },
    "6": {
        date: "05/02/2026", tag: "Sự Kiện", tagClass: "bg-emerald-500 text-black",
        title: "Chiến Dịch Đặc Biệt — Nhận Cầu Thủ Huyền Thoại Miễn Phí",
        body: [
            "Mừng tháng 02/2026, eFootball™ tung chiến dịch đặc biệt!",
            "Cách tham gia: Đăng nhập hàng ngày và hoàn thành nhiệm vụ để tích luỹ điểm Chiến Dịch.",
            "Phần thưởng: 100 điểm → 50.000 eFootball™ Coin. 300 điểm → Special Agent x3 + Black Ball huyền thoại. 600 điểm → Epic Agent x1 + Featured Icon Player.",
            "Chiến dịch kéo dài từ 05/02 đến 28/02/2026.",
        ],
    },
    "9": {
        date: "20/01/2026", tag: "Thông Báo", tagClass: "bg-cyan-400 text-black",
        title: "Kỷ Niệm 30 Năm eFootball — Website Đặc Biệt Đã Ra Mắt",
        body: [
            "Chào mừng 30 năm lịch sử dòng game bóng đá KONAMI!",
            "Từ ISS trên SNES năm 1994, đến World Soccer Winning Eleven, Pro Evolution Soccer, và nay là eFootball™.",
            "Website kỷ niệm đặc biệt với timeline tương tác, video hoài niệm, và phỏng vấn đội ngũ phát triển đã chính thức ra mắt.",
            "Truy cập ngay để khám phá hành trình 30 năm và nhận quà kỷ niệm trong game!",
        ],
    },
};

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const a = newsData[id];
    if (!a) return { title: "Không Tìm Thấy | eFootball™" };
    return { title: `${a.title} | eFootball™`, description: a.body[0] };
}

export default async function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const article = newsData[id];
    if (!article) notFound();

    return (
        <>
            {/* Hero bg */}
            <div className="h-[50vh] min-h-[350px] bg-gradient-to-b from-efb-blue-dark via-efb-navy to-black relative">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(10,20,200,0.3),transparent_70%)]" />
            </div>

            {/* Article card */}
            <div className="max-w-[900px] mx-auto -mt-[200px] mb-24 bg-white rounded-3xl px-8 py-12 md:px-16 md:py-16 relative z-10 shadow-[0_40px_100px_rgba(0,0,0,0.5)]">
                {/* Breadcrumb */}
                <div className="flex items-center gap-2 mb-8 text-[12px] text-gray-400 flex-wrap">
                    <Link href="/" className="hover:text-efb-blue transition-colors">Trang Chủ</Link>
                    <span>/</span>
                    <Link href="/tin-tuc" className="hover:text-efb-blue transition-colors">Tin Tức</Link>
                    <span>/</span>
                    <span className="text-gray-600">Chi Tiết</span>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-3 mb-6 flex-wrap">
                    <span className={`px-3 py-1 rounded text-[11px] font-bold flex items-center gap-1.5 ${article.tagClass}`}>
                        <Tag size={10} /> {article.tag}
                    </span>
                    <span className="text-[12px] text-gray-400 flex items-center gap-1.5">
                        <Clock size={11} /> {article.date}
                    </span>
                </div>

                {/* Title */}
                <h1 className="text-[clamp(22px,4vw,36px)] font-bold text-gray-900 leading-tight mb-10">
                    {article.title}
                </h1>

                {/* Important notice */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex gap-4 mb-10">
                    <AlertCircle size={20} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-sm text-amber-800 leading-relaxed font-light">
                        Đây là thông tin chính thức từ eFootball™ Vietnam Edition. Vui lòng đọc kỹ nội dung bên dưới.
                    </p>
                </div>

                {/* Body */}
                <div className="space-y-6">
                    {article.body.map((p, i) => (
                        <p key={i} className="text-[17px] text-gray-700 leading-[1.8] font-light">
                            {p}
                        </p>
                    ))}
                </div>

                {/* Share */}
                <div className="mt-12 pt-8 border-t border-gray-100 flex items-center justify-between flex-wrap gap-4">
                    <Link
                        href="/tin-tuc"
                        className="flex items-center gap-2 text-sm font-semibold text-efb-blue hover:gap-3 transition-all"
                    >
                        <ChevronLeft size={14} /> Quay Lại Tin Tức
                    </Link>
                    <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-efb-blue transition-colors">
                        <Share2 size={14} /> Chia sẻ bài viết
                    </button>
                </div>
            </div>
        </>
    );
}
