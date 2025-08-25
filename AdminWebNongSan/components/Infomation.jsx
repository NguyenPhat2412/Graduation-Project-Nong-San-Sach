import { useState } from "react";
import { useEffect } from "react";

const Information = () => {
  const [info, setInfo] = useState("");
  const TOKEN = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/admin/users/info`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-auth-token": TOKEN,
          },
        }
      );
      const data = await response.json();
      if (TOKEN) setInfo(data);
    };
    fetchData();
  }, []);

  if (!TOKEN) {
    return (
      <div className="absolute top-8 left-1/2 -translate-x-1/2   text-2xl font-bold">
        Cần đăng nhập để truy cập trang chủ quản trị viên Nông Sản Sạch
      </div>
    );
  }

  return (
    <div className="absolute top-8 left-1/2 -translate-x-1/2   text-2xl font-bold">
      Chào mừng {info.username}! đến với trang quản trị viên
    </div>
  );
};

export default Information;
