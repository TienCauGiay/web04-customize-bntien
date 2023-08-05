const RECEIPT_PAYMENT = {
    PROCESS:{
        receiveMenu: ["Phiếu thu", "Thu tiền theo hóa đơn", "Thu tiền theo hóa đơn nhiều khách hàng"],
        paymentMenu: [
            "Phiếu chi", 
            "Trả tiền theo hóa đơn",
            "Nộp thuế",
            "Nộp bảo hiểm",
            "Trả lương"
        ],
        auditMenu: ["Kiểm kê"]
    },

    contentDelete: "Bạn có muốn xóa chứng từ <",
    contentDeleteMultiple: "Bạn có muốn xóa những chứng từ này không?",

    FORM_PAYMENT:{
        optionHeader: [
            "1. Trả tiền nhà cung cấp (không theo hóa đơn)",
            "2. Tạm ứng cho nhân viên",
            "3. Chi mua ngoài có hóa đơn",
            "4. Trả lương nhân viên",
            "5. Chuyển tiền cho chi nhánh khác",
            "6. Gửi tiền vào ngân hàng",
            "7. Chi khác"
        ]
    },
}

export default RECEIPT_PAYMENT;