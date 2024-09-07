import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiArrowLongRight } from "react-icons/hi2";

export default function UserHome() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  function FormatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage:
          "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/1576454796.33f5f6f008cb670c65db22947764611f.jpg)",
      }}
    >
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-xl shadow-lg max-w-lg w-full mx-4 border border-gray-300">
        <h1 className="mb-4 text-3xl font-extrabold text-gray-900">
          สวัสดีแอดมิน!
        </h1>
        <p className="mb-4 text-lg text-gray-700 font-semibold">
          ยินดีต้อนรับเข้าสู่หน้าหลักของแอดมิน
          โปรดตรวจสอบและจัดการข้อมูลของลูกค้า
        </p>
        <p className="mb-4 text-md text-gray-600">
          ในหน้านี้คุณสามารถจัดการข้อมูลผู้ใช้ สินค้า และการจองต่าง ๆ
          ได้อย่างง่ายดาย
        </p>
        <p className="text-md text-gray-600">
          หากต้องการดูข้อมูลเพิ่มเติมกรุณาเลือกจากเมนูด้านบน
        </p>
      </div>
    </div>
  );
}
