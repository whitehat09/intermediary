import React from "react";
import {useQuery } from "react-query";

const fetchData = async () => {
  const res = await fetch(
    "https://61b7085ac95dd70017d411a2.mockapi.io/truck/api/truck"
  );
  return res.json();
};
export const EX = () => {
  const { data, status } = useQuery("repoData", fetchData);
  if (status === "loading") return <div>Đang tải...</div>;
  if (status === "error") return <div>Lỗi khi tìm nạp dữ liệu...</div>;
  console.log(data);
  return (
    <>
      {/* {status === "loading" && <div>Đang tải...</div>} */}
      {/* {status === "error" && <div>Lỗi khi tìm nạp dữ liệu...</div>} */}
      {status === "success" && <div>{data.map((item:any)=>
        <p>{item.truckType}</p>
      )}</div>}
    </>
  );
};
