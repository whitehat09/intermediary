import axiosClient from "./axiosClient";

const cargoTypeApi = {
  read:  (): Promise<any> => {
    return axiosClient.get(`cargoType`);
  },
  readItem:  (id:string): Promise<any> => {
    return axiosClient.get(`cargoType/${id}`);
  },
  create: (user:any): Promise<any> => {
    return axiosClient.post(`cargoType`,user);
  },
  update: (value:any): Promise<any> => {
    return axiosClient.put(`cargoType/${value.id}`,value);
  },
  delete: (id:string): Promise<any> => {
    return axiosClient.delete(`cargoType/${id}`);
  },
};

export default cargoTypeApi;