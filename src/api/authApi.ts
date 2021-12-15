import axiosClient from "./axiosClient";

const authApi = {
  signIn: (data: any): Promise<any> => {
    return axiosClient.post("user", {
      user: data,
    });
  },
};

export default authApi;
