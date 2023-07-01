import BaseServices from "./base";
import axios from "axios";

class EmployeeExcelServices extends BaseServices{
    controller = "EmployeeExcels"

    async ExportEmployees(employees){
        const response = await axios.post(`${this.getBaseUrl()}/export`,employees)
        return response;
    }
}
export default new EmployeeExcelServices();