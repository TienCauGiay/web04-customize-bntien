const helperCommon = {
  /**
   * Mô tả: Hàm xử lí chuỗi thành định dạng ngày tháng năm (dd/MM/yyyy)
   * created by : BNTIEN
   * created date: 04-06-2023 19:13:03
   */
    formatDate: (value) => {
        try {
          value = value.substring(0, 10);
          const dates = value.split("-");
          const res = `${dates[2]}/${dates[1]}/${dates[0]}`;
          return res;
        } catch (error) {
          return "";
        }
    },
    /**
     * Mô tả: Hàm xóa dấu tiếng việt
     * created by : BNTIEN
     * created date: 04-06-2023 19:13:39
     */
    removeVietnameseAccents: (str) => {
      return str
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D");
    },
    /**
     * Mô tả: Hàm kiểm tra ngày hợp lệ
     * created by : BNTIEN
     * created date: 08-06-2023 03:22:05
     */
    isInvalidDate: (value) => {
      const dob = new Date(value);      
      const dateToday = new Date();
      if(dob > dateToday){
        return false;
      }
      else{
        return true;
      }
    }
}

export default helperCommon;