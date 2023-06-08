const MISAResource = {
    'vn-VI':{
        EMPLOYEE_COL_NAME:{
            CODE: "MÃ NHÂN VIÊN",
            FULLNAME: "TÊN NHÂN VIÊN",
            GENDER: "GIỚI TÍNH",
            DOB: "NGÀY SINH",
            IDENTITY_NUMBER: "SỐ CMND",
            TITLE_IDENTITY_NUMBER: "Số chứng minh nhân dân",
            POSITION: "CHỨC DANH",
            DEPARTMENT: "TÊN ĐƠN VỊ",
            BANK_ACCOUNT: "SỐ TÀI KHOẢN",
            BANK_NAME: "TÊN NGÂN HÀNG",
            BANK_BRANCH: "CHI NHÁNH TK NGÂN HÀNG", 
            TITLE_BANK_BRANCH: "Chi nhánh tài khoản ngân hàng", 
            FEATURE: "CHỨC NĂNG"
        },
        TEXT_CONTENT:{
            EMPLOYEE:"Nhân viên",
            ADD_EMPLOYEE:"Thêm nhân viên mới",
            PLACEHOLDER_SEARCH:"Tìm theo mã, tên nhân viên",
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
            },
            UPDATE:"Sửa",
            DUPLICATE: "Nhân bản",
            DELETE: "Xóa",
            STOP_USING: "Ngưng sử dụng",
            TOTAL:"Tổng số",
            RECORD: "bản ghi",
            RECORD_ON_PAGE: "bản ghi trên trang",
            PAGING_PRE: "Trước",
            PAGING_NEXT: "Sau",
            SCROLL:{
                START:"start",
                END:"end",
            }

        },
        FORM:{
            INFO_EMPLOYEE:"THÔNG TIN NHÂN VIÊN",
            IS_CUSTOMER:"Là khách hàng",
            IS_PROVIDER:"Là nhà cung cấp",
            CODE:"Mã",
            NAME:"Tên",
            DEPARTMENT:"Đơn vị",
            PLACEHOLDER_DEPARTMENT:"-- Chọn Đơn Vị --",
            POSITION:"Chức danh",
            DOB:"Ngày sinh",
            GENDER:"Giới tính",
            IDENTITY_NUMBER:"Số CMND",
            IDENTITY_DATE:"Ngày cấp",
            IDENTITY_ADDRESS:"Nơi cấp",
            ADDRESS:"Địa chỉ",
            PHONE_NUMBER:"ĐT di động",
            TITLE_PHONE_NUMBER:"Điện thoại di động",
            PHONE_LANDLINE:"ĐT cố định",
            TITLE_PHONE_LANDLINE:"Điện thoại cố định",
            EMAIL:"Email",
            BANK_ACCOUNT:"Tài khoản ngân hàng",
            BANK_NAME:"Tên ngân hàng",
            BANK_BRANCH:"Chi nhánh",
            BTN_CANCEL:"Hủy",
            BTN_SAVE:"Cất",
            BTN_SAVEANDCLOSE:"Cất và thêm",
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