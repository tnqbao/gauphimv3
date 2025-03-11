export interface ListType {
    title: string
    description: string
    breadcrumb: string
    endpoint: string
}

export const listTypes: Record<string, ListType> = {
    "phim-le": {
        title: "Phim Lẻ",
        description: "Danh sách phim lẻ mới nhất, chất lượng cao",
        breadcrumb: "Phim Lẻ",
        endpoint: "/v1/api/danh-sach/phim-le",
    },
    "phim-bo": {
        title: "Phim Bộ",
        description: "Danh sách phim bộ đang chiếu và hoàn thành",
        breadcrumb: "Phim Bộ",
        endpoint: "/v1/api/danh-sach/phim-bo",
    },
    "phim-moi": {
        title: "Phim Mới",
        description: "Phim mới cập nhật trong tuần, tháng",
        breadcrumb: "Phim Mới",
        endpoint: "/v1/api/danh-sach/phim-moi-cap-nhat",
    },
    "phim-chieu-rap": {
        title: "Phim Chiếu Rạp",
        description: "Những bộ phim đang chiếu và sắp chiếu tại rạp",
        breadcrumb: "Phim Chiếu Rạp",
        endpoint: "/v1/api/danh-sach/phim-sap-chieu",
    },
    "hoat-hinh": {
        title: "Phim Hoạt Hình",
        description: "Phim hoạt hình, anime mới nhất",
        breadcrumb: "Phim Hoạt Hình",
        endpoint: "/v1/api/danh-sach/hoat-hinh",
    },
    "phim-bo-dang-chieu": {
        title: "Phim Bộ Đang Chiếu",
        description: "Những bộ phim bộ đang được cập nhật",
        breadcrumb: "Phim Bộ Đang Chiếu",
        endpoint: "/v1/api/danh-sach/phim-bo-dang-chieu",
    },
    "phim-bo-hoan-thanh": {
        title: "Phim Bộ Hoàn Thành",
        description: "Những bộ phim bộ đã hoàn thành",
        breadcrumb: "Phim Bộ Hoàn Thành",
        endpoint: "/v1/api/danh-sach/phim-bo-hoan-thanh",
    },
    "phim-vietsub": {
        title: "Phim Vietsub",
        description: "Phim có phụ đề tiếng Việt",
        breadcrumb: "Phim Vietsub",
        endpoint: "/v1/api/danh-sach/phim-vietsub",
    },
    "phim-thuyet-minh": {
        title: "Phim Thuyết Minh",
        description: "Phim có thuyết minh tiếng Việt",
        breadcrumb: "Phim Thuyết Minh",
        endpoint: "/v1/api/danh-sach/phim-thuyet-minh",
    },
    "phim-long-tieng": {
        title: "Phim Lồng Tiếng",
        description: "Phim có lồng tiếng Việt",
        breadcrumb: "Phim Lồng Tiếng",
        endpoint: "/v1/api/danh-sach/phim-long-tieng",
    },
}

export const listCategory: Record<string, ListType> = {
    "hanh-dong": {
        title: "Hành Động",
        description: "Danh sách phim hành động hay nhất, cập nhật mới nhất",
        breadcrumb: "Hành Động",
        endpoint: "/v1/api/the-loai/hanh-dong",
    },
    "tinh-cam": {
        title: "Tình Cảm",
        description: "Những bộ phim tình cảm lãng mạn đầy cảm xúc",
        breadcrumb: "Tình Cảm",
        endpoint: "/v1/api/the-loai/tinh-cam",
    },
    "hai-huoc": {
        title: "Hài Hước",
        description: "Danh sách phim hài hước mang lại tiếng cười sảng khoái",
        breadcrumb: "Hài Hước",
        endpoint: "/v1/api/the-loai/hai-huoc",
    },
    "co-trang": {
        title: "Cổ Trang",
        description: "Phim cổ trang hấp dẫn với những câu chuyện lịch sử",
        breadcrumb: "Cổ Trang",
        endpoint: "/v1/api/the-loai/co-trang",
    },
    "tam-ly": {
        title: "Tâm Lý",
        description: "Những bộ phim tâm lý sâu sắc, đầy cảm xúc",
        breadcrumb: "Tâm Lý",
        endpoint: "/v1/api/the-loai/tam-ly",
    },
    "hinh-su": {
        title: "Hình Sự",
        description: "Phim hình sự, trinh thám đầy kịch tính",
        breadcrumb: "Hình Sự",
        endpoint: "/v1/api/the-loai/hinh-su",
    },
    "chien-tranh": {
        title: "Chiến Tranh",
        description: "Những bộ phim về chiến tranh, lịch sử đầy ý nghĩa",
        breadcrumb: "Chiến Tranh",
        endpoint: "/v1/api/the-loai/chien-tranh",
    },
    "the-thao": {
        title: "Thể Thao",
        description: "Phim về thể thao, những câu chuyện truyền cảm hứng",
        breadcrumb: "Thể Thao",
        endpoint: "/v1/api/the-loai/the-thao",
    },
    "vo-thuat": {
        title: "Võ Thuật",
        description: "Phim võ thuật hành động mãn nhãn",
        breadcrumb: "Võ Thuật",
        endpoint: "/v1/api/the-loai/vo-thuat",
    },
    "vien-tuong": {
        title: "Viễn Tưởng",
        description: "Phim viễn tưởng hấp dẫn, sáng tạo",
        breadcrumb: "Viễn Tưởng",
        endpoint: "/v1/api/the-loai/vien-tuong",
    },
    "phieu-luu": {
        title: "Phiêu Lưu",
        description: "Những bộ phim phiêu lưu hấp dẫn",
        breadcrumb: "Phiêu Lưu",
        endpoint: "/v1/api/the-loai/phieu-luu",
    },
    "khoa-hoc": {
        title: "Khoa Học",
        description: "Phim khoa học viễn tưởng, khám phá thế giới",
        breadcrumb: "Khoa Học",
        endpoint: "/v1/api/the-loai/khoa-hoc",
    },
    "kinh-di": {
        title: "Kinh Dị",
        description: "Những bộ phim kinh dị hấp dẫn, rùng rợn",
        breadcrumb: "Kinh Dị",
        endpoint: "/v1/api/the-loai/kinh-di",
    },
    "am-nhac": {
        title: "Âm Nhạc",
        description: "Phim âm nhạc đặc sắc, hấp dẫn",
        breadcrumb: "Âm Nhạc",
        endpoint: "/v1/api/the-loai/am-nhac",
    },
    "than-thoai": {
        title: "Thần Thoại",
        description: "Những bộ phim thần thoại đầy màu sắc",
        breadcrumb: "Thần Thoại",
        endpoint: "/v1/api/the-loai/than-thoai",
    },
    "tai-lieu": {
        title: "Tài Liệu",
        description: "Phim tài liệu hấp dẫn, bổ ích",
        breadcrumb: "Tài Liệu",
        endpoint: "/v1/api/the-loai/tai-lieu",
    },
    "gia-dinh": {
        title: "Gia Đình",
        description: "Phim gia đình ấm áp, ý nghĩa",
        breadcrumb: "Gia Đình",
        endpoint: "/v1/api/the-loai/gia-dinh",
    },
    "chinh-kich": {
        title: "Chính Kịch",
        description: "Phim chính kịch sâu sắc, ý nghĩa",
        breadcrumb: "Chính Kịch",
        endpoint: "/v1/api/the-loai/chinh-kich",
    },
    "bi-an": {
        title: "Bí Ẩn",
        description: "Phim bí ẩn hấp dẫn, lôi cuốn",
        breadcrumb: "Bí Ẩn",
        endpoint: "/v1/api/the-loai/bi-an",
    },
    "hoc-duong": {
        title: "Học Đường",
        description: "Phim học đường vui nhộn, cảm động",
        breadcrumb: "Học Đường",
        endpoint: "/v1/api/the-loai/hoc-duong",
    },
    "kinh-dien": {
        title: "Kinh Điển",
        description: "Những bộ phim kinh điển không thể bỏ lỡ",
        breadcrumb: "Kinh Điển",
        endpoint: "/v1/api/the-loai/kinh-dien",
    },
    "phim-18": {
        title: "Phim 18+",
        description: "Những bộ phim 18+ dành cho người trưởng thành",
        breadcrumb: "Phim 18+",
        endpoint: "/v1/api/the-loai/phim-18",
    },
};

export const listNation: Record<string, ListType> = {
    "trung-quoc": {
        title: "Trung Quốc",
        description: "Phim Trung Quốc hấp dẫn, đa dạng thể loại",
        breadcrumb: "Trung Quốc",
        endpoint: "/v1/api/quoc-gia/trung-quoc",
    },
    "han-quoc": {
        title: "Hàn Quốc",
        description: "Phim Hàn Quốc lãng mạn, đầy cảm xúc",
        breadcrumb: "Hàn Quốc",
        endpoint: "/v1/api/quoc-gia/han-quoc",
    },
    "nhat-ban": {
        title: "Nhật Bản",
        description: "Phim Nhật Bản tinh tế và độc đáo",
        breadcrumb: "Nhật Bản",
        endpoint: "/v1/api/quoc-gia/nhat-ban",
    },
    "thai-lan": {
        title: "Thái Lan",
        description: "Phim Thái Lan kịch tính và hấp dẫn",
        breadcrumb: "Thái Lan",
        endpoint: "/v1/api/quoc-gia/thai-lan",
    },
    "au-my": {
        title: "Âu Mỹ",
        description: "Phim Âu Mỹ bom tấn, chất lượng cao",
        breadcrumb: "Âu Mỹ",
        endpoint: "/v1/api/quoc-gia/au-my",
    },
    "viet-nam": {
        title: "Việt Nam",
        description: "Phim Việt Nam đầy ý nghĩa và gần gũi",
        breadcrumb: "Việt Nam",
        endpoint: "/v1/api/quoc-gia/viet-nam",
    },
    "anh": {
        title: "Anh",
        description: "Phim Anh lịch lãm và cuốn hút",
        breadcrumb: "Anh",
        endpoint: "/v1/api/quoc-gia/anh",
    },
    "phap": {
        title: "Pháp",
        description: "Phim Pháp nghệ thuật và tinh tế",
        breadcrumb: "Pháp",
        endpoint: "/v1/api/quoc-gia/phap",
    },
    "duc": {
        title: "Đức",
        description: "Phim Đức đa dạng và lôi cuốn",
        breadcrumb: "Đức",
        endpoint: "/v1/api/quoc-gia/duc",
    },
    "nga": {
        title: "Nga",
        description: "Phim Nga lịch sử và sâu sắc",
        breadcrumb: "Nga",
        endpoint: "/v1/api/quoc-gia/nga",
    },
    "uc": {
        title: "Úc",
        description: "Phim Úc hiện đại và hấp dẫn",
        breadcrumb: "Úc",
        endpoint: "/v1/api/quoc-gia/uc",
    },
    "brazil": {
        title: "Brazil",
        description: "Phim Brazil sôi động và kịch tính",
        breadcrumb: "Brazil",
        endpoint: "/v1/api/quoc-gia/brazil",
    },
    "nhieu-quoc-gia": {
        title: "Quốc Gia Khác",
        description: "Phim từ nhiều quốc gia trên thế giới",
        breadcrumb: "Quốc Gia Khác",
        endpoint: "/v1/api/quoc-gia/nhieu-quoc-gia",
    },
};