import BaseServices from "./base";
import axios from "axios";

class DepartmentService extends BaseServices{
    controller = "Departments"

    /**
     * Mô tả: tìm kiếm theo tên
     * created by : BNTIEN
     * created date: 21-06-2023 15:17:53
     */
    async getByName(departmentName){
        try{
            const response = await axios.get(`${this.getBaseUrl()}/name/`, {
                params: {
                    departmentName: departmentName,
                }
              });
            return response;
        } catch(error){
            console.log(error);
            throw error;
        }
    }
}
export default new DepartmentService();