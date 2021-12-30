import axiosClient from "./axiosClient";

const truckApi = {
  getTruck: (): Promise<any> => {
    return axiosClient.get(`truck`);
  },
  addTruck: (truck:any): Promise<any> => {
    return axiosClient.post(`truck`,truck);
  },
  deleteTruck: (id:any): Promise<any> => {
    return axiosClient.delete(`truck/${id}`);
  },
  editTruck: (truck:any): Promise<any> => {
    return axiosClient.put(`truck/${truck.id}`,truck);
  },
};

export default truckApi;