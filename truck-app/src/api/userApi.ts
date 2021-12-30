import axiosClient from "./axiosClient";

const userApi = {
    getUser: (): Promise<any> => {
    return axiosClient.get(`user`);
  },
  addUser: (user:any): Promise<any> => {
    return axiosClient.post(`user`,user);
  },
  deleteUser: (id:any): Promise<any> => {
    return axiosClient.delete(`user/${id}`);
  },
  editUser: (user:any): Promise<any> => {
    return axiosClient.put(`user/${user.id}`,user);
  },
 
};

export default userApi;