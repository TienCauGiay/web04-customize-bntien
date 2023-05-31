const helperCommon = {
    formatDate: (value) => {
        try {
          value = value.substring(0, 10);
          const dates = value.split("-");
          const res = dates[2] + "/" + dates[1] + "/" + dates[0];
          return res;
        } catch (error) {
          return "";
        }
    },
}

export default helperCommon;