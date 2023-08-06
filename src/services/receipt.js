import BaseServices from "./base";

class ReceiptService extends BaseServices {
    controller = "Receipts";

    /**
     * Mô tả: Lấy số chứng từ lớn nhất trong hệ thống
     * created by : BNTIEN
     * created date: 05-08-2023 00:33:45
     */
    async getCodeMax(){
        var response = await this.entity.get(`${this.getBaseUrl()}/maxcode`);
        return response;
    }

    /**
     * Mô tả: Tìm kiếm phân trang phiếu thu/chi
     * created by : BNTIEN
     * created date: 04-08-2023 05:39:31
     */

    async getFilter(pageSize, pageNumber, textSearch, keyFilter){
        const response = await this.entity.get(`${this.getBaseUrl()}/filter`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
                keyFilter: keyFilter
            }
        });
        return response;
    }

    /**
     * Mô tả: Hàm toggle trạng thái ghi sổ
     * created by : BNTIEN
     * created date: 06-08-2023 15:26:00
     */
    async updateNote(obj){
        const response = await this.entity.put(`${this.getBaseUrl()}/note`, obj);
        return response;
    }
}

export default new ReceiptService();