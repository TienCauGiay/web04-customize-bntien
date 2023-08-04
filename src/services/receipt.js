import BaseServices from "./base";

class ReceiptService extends BaseServices {
    controller = "Receipts";

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
}

export default new ReceiptService();