import axios from "axios";

/**
 * Mô tả: tạo class cha để thực hiện kế thừa khi call api
 * created by : BNTIEN
 * created date: 02-06-2023 22:07:04
 */
class BaseServices {
    BASE_URL = "https://localhost:7166/api/v1";
    controller = "";

    getBaseUrl(){
        return `${this.BASE_URL}/${this.controller}`;
    }

    /**
     * Mô tả: trả về toàn bộ dữ liệu của 1 table trong database
     * created by : BNTIEN
     * created date: 02-06-2023 22:07:48
     */
    async getAll(){
        try {
            const response = await axios.get(this.getBaseUrl());
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Mô tả: trả về bản trong database có code là tham số truyền vào
     * created by : BNTIEN
     * created date: 02-06-2023 22:09:41
     */
    async getByCode(code){
        try {
            const response = await axios.get(`${this.getBaseUrl()}/code/${code}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Mô tả: thêm mới 1 bản ghi vào database
     * created by : BNTIEN
     * created date: 02-06-2023 22:10:13
     */
    async create(obj){
        try {
            const response = await axios.post(this.getBaseUrl(), obj);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Mô tả: cập nhật thông tin 1 bản ghi có id là tham số truyền vào
     * created by : BNTIEN
     * created date: 02-06-2023 22:10:45
     */
    async update(id, obj){
        try {
            const response = await axios.put(`${this.getBaseUrl()}/${id}`, obj);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
    
    /**
     * Mô tả: xóa 1 bản ghi theo id
     * created by : BNTIEN
     * created date: 02-06-2023 22:11:02
     */
    async delete(id){
        try {
            const response = await axios.delete(`${this.getBaseUrl()}/${id}`);
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    /**
     * Mô tả: xóa nhiều bản ghi theo danh sách id
     * created by : BNTIEN
     * created date: 27-06-2023 23:05:28
     */
    async deleteMutiple(ids){
        try{
            const response = await axios.delete(`${this.getBaseUrl()}/ids`, {data:ids});
            return response;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    /**
     * Mô tả: Tìm kiếm phân trang
     * created by : BNTIEN
     * created date: 17-06-2023 03:50:28
     */ 
    async getFilter(pageSize, pageNumber, textSearch){
        try{
            const response = await axios.get(`${this.getBaseUrl()}/filter`, {
                params: {
                  pageSize: pageSize,
                  pageNumber: pageNumber,
                  textSearch: textSearch
                }
              });
            return response;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }
}

export default BaseServices;