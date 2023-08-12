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

    /**
     * Mô tả: Tìm kiếm danh sách con theo accountNumber cha
     * created by : BNTIEN
     * created date: 21-07-2023 11:27:18
     */
    async getAllChildren(accountNumber){
        const response = await this.entity.get(`${this.getBaseUrl()}/children`, {params:{accountNumber: accountNumber}});
        return response;
    }

    /**
     * Mô tả: Lấy danh sách tài khoản khi bấm mở rộng
     * created by : BNTIEN
     * created date: 12-08-2023 00:29:44
     */
    async getExpand(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/expand`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch
            }
        });
        return response;
    }

    /**
     * Mô tả: Tìm kiếm tài khoản theo số tài khoản, tên tài khoản
     * created by : BNTIEN
     * created date: 01-08-2023 10:11:46
     */
    async getCodeOrName(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/codeorname`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
            }
        });
        return response;
    }

    /**
     * Mô tả: Hàm cập nhật trạng thái tài khoản
     * created by : BNTIEN
     * created date: 26-07-2023 16:17:00
     */
    async updateState(account, state, isUpdateChildren){
        const response = await this.entity.put(`${this.getBaseUrl()}/state`, account, {
            params:{
                state: state, 
                isUpdateChildren: isUpdateChildren
            }
        });
        return response;
    }

    /**
     * Mô tả: Lấy danh sách tài khoản công nợ phải thu
     * created by : BNTIEN
     * created date: 01-08-2023 10:11:46
     */
    async getReceivable(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/recevable`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
            }
        });
        return response;
    }

        /**
     * Mô tả: Lấy danh sách tài khoản công nợ phải thu
     * created by : BNTIEN
     * created date: 01-08-2023 10:11:46
     */
    async getPayable(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/payable`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
            }
        });
        return response;
    }

    /**
     * Mô tả: Lấy danh sách tài khoản nợ
     * created by : BNTIEN
     * created date: 01-08-2023 10:11:46
     */
    async getDebt(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/debt`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
            }
        });
        return response;
    }

    /**
     * Mô tả: Lấy danh sách tài khoản có
     * created by : BNTIEN
     * created date: 01-08-2023 10:11:46
     */
    async getBalance(pageSize, pageNumber, textSearch){
        const response = await this.entity.get(`${this.getBaseUrl()}/balance`, {
            params: {
                pageSize: pageSize,
                pageNumber: pageNumber,
                textSearch: textSearch,
            }
        });
        return response;
    }
}

export default new AccountService();