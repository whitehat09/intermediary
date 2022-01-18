import axiosClient from "./axiosClient";

const truckApi = {
  read:  (): Promise<any> => {
    return axiosClient.get(`truck`);
  },
  readItem:  (id: string): Promise<any> => {
    return axiosClient.get(`truck/${id}`);
  },
  create: (truck:any): Promise<any> => {
    return axiosClient.post(`truck`,truck);
  },
  update: (truck:any): Promise<any> => {
    return axiosClient.put(`truck/${truck.id}`,truck);
  },
  delete: (id:string): Promise<any> => {
    return axiosClient.delete(`truck/${id}`);
  },
};

export default truckApi;
