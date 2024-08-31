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
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage:
          "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/1576454796.33f5f6f008cb670c65db22947764611f.jpg)",
      }}
    >
      <div className=" flex flex-col items-center justify-center text-neutral-content text-center p-8 bg-opacity-70 rounded-lg shadow-lg bg-gray-200">
        <div className="max-w-md ">
          <h1 className="mb-5 text-4xl font-bold text-black">สวัสดีแอดมิน!</h1>
          <p className="mb-5 text-xl text-slate-800 font-bold">
            ยินดีต้อนรับเข้าสู่หน้าหลักของแอดมิน โปรดตรวจสอบและจัดการข้อมูลของลูกค้า
          </p>
          <p className="mb-5 text-lg text-slate-800 font-bold">
            ในหน้านี้คุณสามารถจัดการข้อมูลผู้ใช้ สินค้า และการจองต่าง ๆ ได้อย่างง่ายดาย
          </p>
          <p className="mb-5 text-lg text-slate-800 font-bold">
            หากต้องการดูข้อมูลเพิ่มเติมกรุณาเลือกจากเมนูด้านบน
          </p>
          <div>
            </div>
        </div>
      </div>
    </div>
  );
}
