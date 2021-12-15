import axiosClient from "./axiosClient";

const cargoTypeApi = {
    getCargoType: (): Promise<any> => {
    return axiosClient.get(`cargoType`);
  },
  addCargoType: (cargoType:any): Promise<any> => {
    return axiosClient.post(`cargoType`,cargoType);
  },
  deleteCargoType: (id:any): Promise<any> => {
    return axiosClient.delete(`cargoType/${id}`);
  },
  editCargoType: (cargoType:any): Promise<any> => {
    return axiosClient.put(`cargoType/${cargoType.id}`,cargoType);
  },
 
};

export default cargoTypeApi;