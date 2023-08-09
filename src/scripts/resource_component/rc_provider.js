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
        purchasStaff: "Nhân viên mua hàng",
    },
    confirmDelete: {
        prev: "Bạn có thực sự muốn xóa nhà cung cấp <",
        end: "> không?",
        multiple: "Bạn có thực sự muốn xóa những nhà cung cấp đã chọn không?",
    },
    valueState:{
        usingAccount: "Đang sử dụng",
        stopUsingAccount: "Ngưng sử dụng"
    } ,
    form: {
        providerProperty: [
            "ProviderCode",
            "ProviderName",
            "TaxCode",
            "Address",
            "PhoneNumber",
            "Website",
            "EmployeeId",
            "FullName",
            "Note",
            "NameContacter",
            "EmailContacter",
            "PhoneNumberContacter",
            "PhoneLandlineContacter",
            "IdentityNumberContacter",
            "IdentityDateContacter",
            "IdentityPlace",
            "Lawyer",
            "NameReceiver",
            "EmailReceiver",
            "PhoneNumberReceiver",
            "TermPaymentId",
            "TermPaymentName",
            "NumberDayOwed",
            "AmountDebt",
            "AccountReceivableId",
            "AccountReceivableNumber",
            "AccountPayableId",
            "AccountPayableNumber",
        ],
        listVocative: [
            { Id: 1, Vocative: "Mr" },
            { Id: 2, Vocative: "Mrs" },
            { Id: 3, Vocative: "Ms" },
            { Id: 4, Vocative: "Ông" },
            { Id: 5, Vocative: "Bà" },
            { Id: 6, Vocative: "Ngài" },
            { Id: 7, Vocative: "Anh" },
        ],
        selectLayout: {
            infoContact: true,
            termPayment: false,
            bankAccount: false,
            addressOther: false,
            note: false,
        },
        locationDefault: { LocationCode: "VN", LocationName: "Việt Nam" },
        textProperty: {
            infoProvider: "Thông tin nhà cung cấp",
            organization: "Tổ chức",
            personal: "Cá nhân",
            isCustomer: "Là khách hàng",
            taxCode: "Mã số thuế",
            providerCode: "Mã nhà cung cấp",
            phoneNumber: "Điện thoại",
            website: "Website",
            providerName: "Tên nhà cung cấp",
            groupProvider: "Nhóm nhà cung cấp",
            address: "Địa chỉ",
            placeholderAddress: "VD: Số 82 Duy Tân, Dịch Vọng, Cầu Giấy, Hà Nội",
            purchasStaff: "Nhân viên mua hàng",
            headerCBBEmployee: ['Mã nhân viên', 'Tên nhân viên'],
            placeholderVocative: "Xưng hô",
            placeholderProviderName: "Họ và tên",
            infoContact: "Thông tin liên hệ",
            termPayment: "Điều khoản thanh toán",
            bankAccount: "Tài khoản ngân hàng",
            addressOther: "Địa chỉ khác",
            note: "Ghi chú",
            personalContact: "Người liên hệ",
            lawler: "Đại điện theo PL",
            phoneNumberContacter: "Số điện thoại",
            nameReceiver: "Người nhận hóa đơn điện tử",
            emails: "Email (Ngăn cách nhiều Email bởi dấu chấm phẩy)",
            infoIdentity : "Thông tin CMND/Thẻ căn cước",
            identityNumber: "Số CMND/Thẻ căn cước",
            phonePersonal: "Điện thoại di động",
            phoneLandline: "Điện thoại cố định",
            identityPlace: "Nơi cấp",
            headerCBBTermPayment: [
                'Mã điều khoản thanh toán',
                'Tên điều khoản thanh toán',
            ],
            numberDayOwed: "Số ngày được nợ",
            amountDebt: "Số nợ tối đa",
            accountPayable: "Tài khoản công nợ phải trả",
        },
        validateNotNull: {
            "ProviderCode": "Mã nhà cung cấp không được để trống.",
            "ProviderName": "Tên nhà cung cấp không được để trống.",
            "IdentityDateContacter": "Ngày cấp lớn hơn ngày hiện tại.",
            "EmailContacter": "Email người liên hệ không đúng định dạng.",
            "EmailReceiver": "Email người nhận không đúng định dạng.",
            "IdentityNumberContacter": "Số chứng minh không đúng.",
        },
        validateLoggic:{
            employee: "Nhân viên mua hàng <",
            termPayment: "Điều khoản thanh toán <",
            end: "> không tồn tại."
        },
        maxLength: {
            "ProviderCode": {Limit: 20, Warning : "Mã nhà cung cấp tối đa 20 kí tự."},
            "ProviderName": {Limit: 255, Warning : "Tên nhà cung cấp tối đa 255 kí tự."},
            "TaxCode": {Limit: 20, Warning : "Mã số thuế tối đa 20 kí tự."},
            "Address": {Limit: 255, Warning : "Địa chỉ tối đa 255 kí tự."},
            "PhoneNumber": {Limit: 50, Warning : "Số điện thoại tối đa 50 kí tự."},
            "Website": {Limit: 255, Warning : "Website tối đa 255 kí tự."},
            "Note": {Limit: 10000, Warning : "Chú ý tối đa 10000 kí tự."},
            "FullName": {Limit: 100, Warning : "Tên nhân viên tối đa 100 kí tự."},
            "NameContacter": {Limit: 100, Warning : "Tên người liên hệ tối đa 100 kí tự."},
            "EmailContacter": {Limit: 100, Warning : "Email liên hệ tối đa 100 kí tự."},
            "PhoneNumberContacter": {Limit: 50, Warning : "Điện thoại di động tối đa 50 kí tự."},
            "PhoneLandlineContacter": {Limit: 100, Warning : "Điện thoại cố định tối đa 50 kí tự."},
            "IdentityNumberContacter": {Limit: 25, Warning : "Số chứng minh tối đa 25 kí tự."},
            "IdentityPlace": {Limit: 255, Warning : "Nơi cấp chứng minh tối đa 255 kí tự."},
            "Lawyer": {Limit: 255, Warning : "Đại diện theo pháp luật tối đa 255 kí tự."},
            "NameReceiver": {Limit: 100, Warning : "Tên người nhận tối đa 100 kí tự."},
            "EmailReceiver": {Limit: 100, Warning : "Email người nhận tối đa 100 kí tự."},
            "PhoneNumberReceiver": {Limit: 50, Warning : "Điện thoại người nhận tối đa 50 kí tự."},
            "TermPaymentName": {Limit: 255, Warning : "Điều khoản thanh toán tối đa 255 kí tự."},
            "AccountReceivableNumber": {Limit: 255, Warning : "Tài khoản công nợ phải thu tối đa 255 kí tự."},
            "AccountPayableNumber": {Limit: 255, Warning : "Tài khoản công nợ phải trả tối đa 255 kí tự."},
        },
    }
}

export default PROVIDER;