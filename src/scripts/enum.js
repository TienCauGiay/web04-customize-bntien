const MISAEnum = {
    STATUS:{
        // API đã xử lý yêu cầu thành công và trả về kết quả
        OK: 200,

        // Một tài nguyên mới đã được tạo thành công
        CREATED: 201,

        // Yêu cầu không hợp lệ
        BAD_REQUEST: 400,

        // Không có quyền truy cập vào tài nguyên hoặc không có thông tin chứng thực
        UNAUTHORIZED: 401,

        // Tài nguyên yêu cầu không được tìm thấy trên máy chủ
        NOT_FOUND: 404,

        // Xảy ra lỗi nội bộ trên máy chủ khi xử lí yêu cầu và không thể hoàn thành nó
        INTERNAL_SERVER_ERROR: 500
    },

    CHECK_STATUS:{
        // Kiểm tra trạng thái có phải 200 không
        isResponseStatusOk: (status) => {
            return status === 200;
        },

        // Kiểm tra trạng thái có phải 201 không
        isResponseStatusCreated: (status) => {
            return status === 201;
        },

        // Kiểm tra trạng thái có phải 400 không
        isResponseStatusBadRequest: (status) => {
            return status === 400;
        },

        // Kiểm tra trạng thái có phải 401 không
        isResponseStatusUnauthorized: (status) => {
            return status === 401;
        },

        // Kiểm tra trạng thái có phải 404 không
        isResponseStatusNotFound: (status) => {
            return status === 404;
        },

        // Kiểm tra trạng thái có phải 500 không
        isResponseStatusServerError: (status) => {
            return status === 500;
        }
    },

    // Khai báo dữ liệu phân trang mặc định
    RECORD:{
        // trang hiện tại 
        CURRENT_PAGE: 1,
        // Số trang hiển thị
        MAX_VISIBLE_PAGE: 3,
        // Số bản ghi trên trang
        RECORD_DEFAULT : 20,
        // Các option phân trang
        RECORD_OPTIONS : [10, 20, 30, 50, 100],
        // Chỉ số của trang đang được chọn
        INDEX_SELECTED_DEFAULT: 1,
    },

    // Giới tính
    GENDER:{
        // Nam
        Male: 0,
        // Nữ
        Female: 1,
        // Khác
        Other: 2
    },

    // Trạng thái của form detail của các obj
    FORM_MODE: {
        // Thêm
        Add: 1,
        // Sửa
        Edit: 2,
        // Xem
        View: 3
    },

    // Mã ASCII
    KEY_CODE:{
        // Phím di chuyển lên
        DOWN: 40,
        // Phím di chuyển xuống
        UP: 38,
        // Phím Enter
        ENTER: 13
    },

    // Check 1 trạng thái checkbox có là khách hàng trong form employee
    CUSTOMER: 1,
    // Check 1 trạng thái checkbox có là nhà cung cấp trong form employee
    PROVIDER: 1,

    // Trạng thái đúng sai
    BOOL: {
        TRUE: 1,
        FALSE: 0
    },
    
    // Đối tượng tài khoản trong form system account detail
    OBJ_ACCOUNT: {
        // Khách hàng
        Customer: 1,
        // Nhà cung cấp
        Provider: 2,
        // Nhân viên
        Employee: 3
    }
} 

export default MISAEnum;
