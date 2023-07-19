import BaseServices from "./base";

class AccountService extends BaseServices {
    controller = "Accounts";

    /**
     * Mô tả: Tìm kiếm phân trang
     * created by : BNTIEN
     * created date: 19-07-2023 03:33:35
     */
    async getFilter(pageSize, pageNumber, textSearch, isRoot, grade, accountNumber){
        const response = await this.entity.get(`${this.getBaseUrl()}/filter`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
                isRoot: isRoot,
                grade: grade,
                accountNumber: accountNumber,
            }
        });
        return response;
    }
}

export default new AccountService();