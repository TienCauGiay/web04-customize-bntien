const PROVIDER = {
    title: "Danh sách nhà cung cấp",
    overdue: "Nợ quá hạn",
    totalLiabiliti: "Tổng nợ phải trả",
    recentPayment: "Đã thanh toán (30 ngày gần đây)",
    figureUpto: "Số liệu tính đến: 6h09",
    placeholderSearch: "Tìm kiếm",   
    colTableName: {
        providerCode: "Mã nhà cung cấp",
        providerName: "Tên nhà cung cấp",
        address: "Địa chỉ",
        amountOwed: "Số tiền nợ",
        rawCode: "Mã số thuế",
        phoneNumber: "Điện thoại",
        branch: "Chi nhánh",
    },
    valueState:{
        usingAccount: "Đang sử dụng",
        stopUsingAccount: "Ngưng sử dụng"
    } ,
    deleteFailed : "Xóa không thành công",
    contentDeleteFailed : "Không thể xóa danh mục cha nếu chưa xóa danh mục con.",
    form: {
        textProperty:{
            accountNumber: "Số tài khoản",
            accountName: "Tên tài khoản",
            accountNameEnglish: "Tên tiếng anh",
            accountGeneral: "Tài khoản tổng hợp",
            nature: "Tính chất",
            explain: "Diễn giải",
            foreignCurrencyAccounting: "Có hạch toán ngoại tệ",
            trackDetail: "Theo dõi chi tiết theo",
            obj: "Đối tượng",
            bankAccount: "Tài khoản ngân hàng",
            objTHCP: "Đối tượng THCP",
            construction: "Công trình",
            order: "Đơn đặt hàng",
            contractSale: "Hợp đồng bán",
            contractPurchase: "Hợp đồng mua",
            itemCP: "Khoản mục CP",
            unit: "Đơn vị",
            rawCode: "Mã thống kê",
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
        },
        titleAdd: "Thêm tài khoản",
        titleEdit: "Sửa tài khoản",
    }
}

export default PROVIDER;