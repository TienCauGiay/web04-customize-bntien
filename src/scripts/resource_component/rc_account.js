const SYSTEM_ACCOUNT = {
    title: "Hệ thống tài khoản",
    textAccount: "tài khoản",
    placeholderSearch: "Tìm kiếm theo số, tên tài khoản",
    expand: "Mở rộng",
    unExpand: "Thu gọn",
    tranferAccount: "Chuyển tài khoản hạch toán",
    colTableName: {
        accountNumber: "Số tài khoản",
        accountName: "Tên tài khoản",
        nature: "Tính chất",
        accountNameEnglish: "Tên tiếng anh",
        explain: "Diễn giải",
        state: "Trạng thái",
        feature: "Chức năng"
    },
    valueState:{
        usingAccount: "Đang sử dụng",
        stopUsingAccount: "Ngưng sử dụng"
    } ,
    deleteFailed : "Xóa không thành công",
    contentDeleteFailed : "Không thể xóa danh mục cha nếu chưa xóa danh mục con.",
    form: {
        textProperty:{
            accountNumber: "Số tài khoản"
        },
        validateNotNull: {
            "AccountNumber": "Số tài khoản không được để trống.",
            "AccountName": "Tên tài khoản không được để trống.",
            "Nature": "Tính chất không được để trống.",
        },
        maxLength: {
            "AccountNumber": {Limit: 50, Warning : "Số tài khoản tối đa 20 kí tự."},
            "AccountName": {Limit: 255, Warning : "Tên tài khoản tối đa 255 kí tự."},
            "AccountNameEnglish": {Limit: 255, Warning : "Tên tiếng anh tối đa 255 kí tự."},
            "ParentId": {Limit: 36, Warning : "Tài khoản tổng hợp tối đa 36 kí tự."},
            "Nature": {Limit: 255, Warning : "Tính chất tối đa 255 kí tự."},
            "Explain": {Limit: 10000, Warning : "Diễn giải tối đa 10000 kí tự"},
        },
        minLength:{
            "AccountNumber": {MinLength: 3, Warning: "Số tài khoản tối thiểu 3 kí tự."}
        }
    }
}

export default SYSTEM_ACCOUNT;