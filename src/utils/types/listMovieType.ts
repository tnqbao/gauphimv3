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
        endpoint: "api/gauflix/type/single",
    },
    "phim-bo": {
        title: "Phim Bộ",
        description: "Danh sách phim bộ đang chiếu và hoàn thành",
        breadcrumb: "Phim Bộ",
        endpoint: "api/gauflix/type/series",
    },
    "phim-moi": {
        title: "Phim Mới",
        description: "Phim mới cập nhật trong tuần, tháng",
        breadcrumb: "Phim Mới",
        endpoint: "api/gauflix/type/new-release",
    },
    // "phim-chieu-rap": {
    //     title: "Phim Chiếu Rạp",
    //     description: "Những bộ phim đang chiếu và sắp chiếu tại rạp",
    //     breadcrumb: "Phim Chiếu Rạp",
    //     endpoint: "api/gauflix/type/phim-sap-chieu",
    // },
    "hoat-hinh": {
        title: "Phim Hoạt Hình",
        description: "Phim hoạt hình, anime mới nhất",
        breadcrumb: "Phim Hoạt Hình",
        endpoint: "api/gauflix/type/hoathinh",
    },
    // "phim-bo-dang-chieu": {
    //     title: "Phim Bộ Đang Chiếu",
    //     description: "Những bộ phim bộ đang được cập nhật",
    //     breadcrumb: "Phim Bộ Đang Chiếu",
    //     endpoint: "api/gauflix/type/phim-bo-dang-chieu",
    // },
    // "phim-bo-hoan-thanh": {
    //     title: "Phim Bộ Hoàn Thành",
    //     description: "Những bộ phim bộ đã hoàn thành",
    //     breadcrumb: "Phim Bộ Hoàn Thành",
    //     endpoint: "api/gauflix/type/phim-bo-hoan-thanh",
    // },
    // "phim-vietsub": {
    //     title: "Phim Vietsub",
    //     description: "Phim có phụ đề tiếng Việt",
    //     breadcrumb: "Phim Vietsub",
    //     endpoint: "api/gauflix/type/phim-vietsub",
    // },
    // "phim-thuyet-minh": {
    //     title: "Phim Thuyết Minh",
    //     description: "Phim có thuyết minh tiếng Việt",
    //     breadcrumb: "Phim Thuyết Minh",
    //     endpoint: "api/gauflix/type/phim-thuyet-minh",
    // },
    // "phim-long-tieng": {
    //     title: "Phim Lồng Tiếng",
    //     description: "Phim có lồng tiếng Việt",
    //     breadcrumb: "Phim Lồng Tiếng",
    //     endpoint: "api/gauflix/type/phim-long-tieng",
    // },
}

export const listCategory: Record<string, ListType> = {
    "hanh-dong": {
        title: "Hành Động",
        description: "Danh sách phim hành động hay nhất, cập nhật mới nhất",
        breadcrumb: "Hành Động",
        endpoint: "api/gauflix/category/hanh-dong",
    },
    "tinh-cam": {
        title: "Tình Cảm",
        description: "Những bộ phim tình cảm lãng mạn đầy cảm xúc",
        breadcrumb: "Tình Cảm",
        endpoint: "api/gauflix/category/tinh-cam",
    },
    "hai-huoc": {
        title: "Hài Hước",
        description: "Danh sách phim hài hước mang lại tiếng cười sảng khoái",
        breadcrumb: "Hài Hước",
        endpoint: "api/gauflix/category/hai-huoc",
    },
    "co-trang": {
        title: "Cổ Trang",
        description: "Phim cổ trang hấp dẫn với những câu chuyện lịch sử",
        breadcrumb: "Cổ Trang",
        endpoint: "api/gauflix/category/co-trang",
    },
    "tam-ly": {
        title: "Tâm Lý",
        description: "Những bộ phim tâm lý sâu sắc, đầy cảm xúc",
        breadcrumb: "Tâm Lý",
        endpoint: "api/gauflix/category/tam-ly",
    },
    "hinh-su": {
        title: "Hình Sự",
        description: "Phim hình sự, trinh thám đầy kịch tính",
        breadcrumb: "Hình Sự",
        endpoint: "api/gauflix/category/hinh-su",
    },
    "chien-tranh": {
        title: "Chiến Tranh",
        description: "Những bộ phim về chiến tranh, lịch sử đầy ý nghĩa",
        breadcrumb: "Chiến Tranh",
        endpoint: "api/gauflix/category/chien-tranh",
    },
    "the-thao": {
        title: "Thể Thao",
        description: "Phim về thể thao, những câu chuyện truyền cảm hứng",
        breadcrumb: "Thể Thao",
        endpoint: "api/gauflix/category/the-thao",
    },
    "vo-thuat": {
        title: "Võ Thuật",
        description: "Phim võ thuật hành động mãn nhãn",
        breadcrumb: "Võ Thuật",
        endpoint: "api/gauflix/category/vo-thuat",
    },
    "vien-tuong": {
        title: "Viễn Tưởng",
        description: "Phim viễn tưởng hấp dẫn, sáng tạo",
        breadcrumb: "Viễn Tưởng",
        endpoint: "api/gauflix/category/vien-tuong",
    },
    "phieu-luu": {
        title: "Phiêu Lưu",
        description: "Những bộ phim phiêu lưu hấp dẫn",
        breadcrumb: "Phiêu Lưu",
        endpoint: "api/gauflix/category/phieu-luu",
    },
    "khoa-hoc": {
        title: "Khoa Học",
        description: "Phim khoa học viễn tưởng, khám phá thế giới",
        breadcrumb: "Khoa Học",
        endpoint: "api/gauflix/category/khoa-hoc",
    },
    "kinh-di": {
        title: "Kinh Dị",
        description: "Những bộ phim kinh dị hấp dẫn, rùng rợn",
        breadcrumb: "Kinh Dị",
        endpoint: "api/gauflix/category/kinh-di",
    },
    "am-nhac": {
        title: "Âm Nhạc",
        description: "Phim âm nhạc đặc sắc, hấp dẫn",
        breadcrumb: "Âm Nhạc",
        endpoint: "api/gauflix/category/am-nhac",
    },
    "than-thoai": {
        title: "Thần Thoại",
        description: "Những bộ phim thần thoại đầy màu sắc",
        breadcrumb: "Thần Thoại",
        endpoint: "api/gauflix/category/than-thoai",
    },
    "tai-lieu": {
        title: "Tài Liệu",
        description: "Phim tài liệu hấp dẫn, bổ ích",
        breadcrumb: "Tài Liệu",
        endpoint: "api/gauflix/category/tai-lieu",
    },
    "gia-dinh": {
        title: "Gia Đình",
        description: "Phim gia đình ấm áp, ý nghĩa",
        breadcrumb: "Gia Đình",
        endpoint: "api/gauflix/category/gia-dinh",
    },
    "chinh-kich": {
        title: "Chính Kịch",
        description: "Phim chính kịch sâu sắc, ý nghĩa",
        breadcrumb: "Chính Kịch",
        endpoint: "api/gauflix/category/chinh-kich",
    },
    "bi-an": {
        title: "Bí Ẩn",
        description: "Phim bí ẩn hấp dẫn, lôi cuốn",
        breadcrumb: "Bí Ẩn",
        endpoint: "api/gauflix/category/bi-an",
    },
    "hoc-duong": {
        title: "Học Đường",
        description: "Phim học đường vui nhộn, cảm động",
        breadcrumb: "Học Đường",
        endpoint: "api/gauflix/category/hoc-duong",
    },
    "kinh-dien": {
        title: "Kinh Điển",
        description: "Những bộ phim kinh điển không thể bỏ lỡ",
        breadcrumb: "Kinh Điển",
        endpoint: "api/gauflix/category/kinh-dien",
    },
    // "phim-18": {
    //     title: "Phim 18+",
    //     description: "Những bộ phim 18+ dành cho người trưởng thành",
    //     breadcrumb: "Phim 18+",
    //     endpoint: "api/gauflix/category/phim-18",
    // },
};

export const listNation: Record<string, ListType> = {
    "trung-quoc": {
        title: "Trung Quốc",
        description: "Phim Trung Quốc hấp dẫn, đa dạng thể loại",
        breadcrumb: "Trung Quốc",
        endpoint: "api/gauflix/category/trung-quoc",
    },
    "han-quoc": {
        title: "Hàn Quốc",
        description: "Phim Hàn Quốc lãng mạn, đầy cảm xúc",
        breadcrumb: "Hàn Quốc",
        endpoint: "api/gauflix/category/han-quoc",
    },
    "nhat-ban": {
        title: "Nhật Bản",
        description: "Phim Nhật Bản tinh tế và độc đáo",
        breadcrumb: "Nhật Bản",
        endpoint: "api/gauflix/category/nhat-ban",
    },
    "thai-lan": {
        title: "Thái Lan",
        description: "Phim Thái Lan kịch tính và hấp dẫn",
        breadcrumb: "Thái Lan",
        endpoint: "api/gauflix/category/thai-lan",
    },
    "au-my": {
        title: "Âu Mỹ",
        description: "Phim Âu Mỹ bom tấn, chất lượng cao",
        breadcrumb: "Âu Mỹ",
        endpoint: "api/gauflix/category/au-my",
    },
    "viet-nam": {
        title: "Việt Nam",
        description: "Phim Việt Nam đầy ý nghĩa và gần gũi",
        breadcrumb: "Việt Nam",
        endpoint: "api/gauflix/category/viet-nam",
    },
    "anh": {
        title: "Anh",
        description: "Phim Anh lịch lãm và cuốn hút",
        breadcrumb: "Anh",
        endpoint: "api/gauflix/category/anh",
    },
    "phap": {
        title: "Pháp",
        description: "Phim Pháp nghệ thuật và tinh tế",
        breadcrumb: "Pháp",
        endpoint: "api/gauflix/category/phap",
    },
    "duc": {
        title: "Đức",
        description: "Phim Đức đa dạng và lôi cuốn",
        breadcrumb: "Đức",
        endpoint: "api/gauflix/category/duc",
    },
    "nga": {
        title: "Nga",
        description: "Phim Nga lịch sử và sâu sắc",
        breadcrumb: "Nga",
        endpoint: "api/gauflix/category/nga",
    },
    "uc": {
        title: "Úc",
        description: "Phim Úc hiện đại và hấp dẫn",
        breadcrumb: "Úc",
        endpoint: "api/gauflix/category/uc",
    },
    "brazil": {
        title: "Brazil",
        description: "Phim Brazil sôi động và kịch tính",
        breadcrumb: "Brazil",
        endpoint: "api/gauflix/category/brazil",
    },
    "nhieu-quoc-gia": {
        title: "Quốc Gia Khác",
        description: "Phim từ nhiều quốc gia trên thế giới",
        breadcrumb: "Quốc Gia Khác",
        endpoint: "api/gauflix/category/nhieu-quoc-gia",
    },
};