import axiosClient from "./axiosClient";

const signInApi = {
  signIn: (data: any): Promise<any> => {
    return axiosClient.post("1", {
        method: 'POST',
        body: JSON.stringify({
          email: 'emailA@gmail.com',
          name: 'Nguyễn Văn A',
          accountType:'user'
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
  },
};

export default signInApi;
