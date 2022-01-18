import axiosClient from "./axiosClient";

const usersApi = {
  read:  (): Promise<any> => {
    return axiosClient.get(`user`);
  },
  readItem:  (id:string): Promise<any> => {
    return axiosClient.get(`user/${id}`);
  },
  create: (user:any): Promise<any> => {
    return axiosClient.post(`user`,user);
  },
  update: (user:any): Promise<any> => {
    return axiosClient.put(`user/${user.id}`,user);
  },
  delete: (id:string): Promise<any> => {
    return axiosClient.delete(`user/${id}`);
  },
};

export default usersApi;
