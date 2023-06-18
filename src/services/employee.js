import axios from "axios";
import BaseServices from "./base";

class EmployeeService extends BaseServices {
    controller = "Employees";

    /**
     * Mô tả: Lấy mã nhân viên lớn nhất trong hệ thống
     * created by : BNTIEN
     * created date: 17-06-2023 05:36:33
     */
    async getCodeMax(){
        try{
            var response = await axios.get(`${this.getBaseUrl()}/maxcode`);
            return response;
        } catch  {
            return {data: null};
        }
    }
}

export default new EmployeeService();