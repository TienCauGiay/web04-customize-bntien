const MISAResource = {
    'vn-VI':{
        TEXT_CONTENT:{
            DATE_NaN: "NaN/NaN/NaN",
            SUCCESS_DELETE : "Xóa thành công.",
            SUCCESS_CTEATE : "Thêm thành công.",
            SUCCESS_UPDATE : "Sửa thành công.",
            SPLIT_DATE : "T",
            GENDER:{
                Male: "Nam",
                Female: "Nữ",
                Other: "Khác"
            },
            CODE_NOT_NULL: "Mã nhân viên không được để trống.",
            NAME_NOT_NULL: "Tên nhân viên không được để trống.",
            UNIT_NOT_NULL: "Đơn vị nhân viên không được để trống.",
            CODE_END_MUST_NUMBER: "Mã nhân viên phải kết thúc bằng số",
            DOB_ISVALID:"Ngày sinh không hợp lệ",
            CMNDDATE_ISVALID : "Ngày cấp không hợp lệ",
            EMAIL_ISVALID: "Email không đúng định dạng",
            PAGE:{
                PREVIOUS: "previous",
                NEXT: "next",
                NUMBER: "number"
            }
        },
    },
    'en-EN':{
        TEXT_CONTENT:{
            DATE_NaN: "NaN/NaN/NaN",
            SUCCESS_DELETE : "Successful delele",
            SUCCESS_CTEATE : "Successful add",
            SUCCESS_UPDATE : "Successful update",
            SPLIT_DATE : "T",
            GENDER:{
                Male: "Male",
                Female: "Female",
                Other: "Other"
            },
            CODE_NOT_NULL: "Code cannot be blank.",
            NAME_NOT_NULL: "Fullname cannot be blank.",
            UNIT_NOT_NULL: "Unit cannot be blank.",
            CODE_END_MUST_NUMBER: "Code must end be number",
            DOB_ISVALID: "Date of birth is valid",
            CMNDDATE_ISVALID: "Invalid ID card issuance date",
            PAGE:{
                PREVIOUS: "previous",
                NEXT: "next",
                NUMBER: "number"
            }
        },
    },
    REGEX:{
        END_MUST_NUMBER:/\d$/,
        EMAIL:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    }
}

export default MISAResource