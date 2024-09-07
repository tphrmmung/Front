import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userAuth from "../hooks/userAuth";
import Swal from "sweetalert2";

export default function Booking() {
  const navigate = useNavigate();
  const { user } = userAuth();
  const Tablesid = location.pathname.split("/")[2];

  const [input, setInput] = useState({
    booking_date_and_time: "",
    status: "",
    User_id: +user.user_id,
    Tables_id: Tablesid,
    Numberoftables: "",
    location: "",
    booking_address: "",
    booking_amount: ""
  });

  const handleChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ตรวจสอบว่ามีข้อมูลที่จำเป็นครบถ้วนหรือไม่
    if (!input.booking_date_and_time || !input.Numberoftables || !input.location) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ครบถ้วน",
        text: "กรุณากรอกข้อมูลให้ครบทุกช่อง",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    // ตรวจสอบจำนวนโต๊ะ
    const numberOfTables = parseInt(input.Numberoftables, 10);
    if (isNaN(numberOfTables) || numberOfTables < 25) {
      Swal.fire({
        icon: "warning",
        title: "จำนวนโต๊ะไม่ถูกต้อง",
        text: "กรุณากรอกจำนวนโต๊ะที่มากกว่า 25 และเป็นตัวเลขเท่านั้น",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    try {
      const rs = await axios.post("http://localhost:8889/admin/bookings", input);
      if (rs.status === 200) {
        const id = rs.data.booking.booking_id;
        navigate("/WaittingPayment/");
        Swal.fire({
          icon: "success",
          title: "การจองเสร็จสิ้น",
          text: "ดูประวัติการจอง",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถจองได้",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
      }
    } catch (error) {
      console.error("Error submitting booking:", error);
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาดในการจอง",
        text: "กรุณาลองใหม่อีกครั้ง",
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  return (
    <div className="card shadow-xl mt-20 mx-auto w-96 bg-gray-200 backdrop-blur-lg rounded-lg">
      <div className="p-8">
        <div className="text-3xl text-center text-blue-950 mb-6">รายละเอียดการจอง</div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <label className="flex flex-col">
            <span className="label-text-alt text-base font-bold mb-2">วันที่/เวลาการการจัดงาน</span>
            <input
              type="datetime-local"
              name="booking_date_and_time"
              min={new Date().toISOString().slice(0, -8)}
              value={input.booking_date_and_time}
              onChange={handleChange}
              className="input input-bordered w-full p-2 rounded-lg border-2 border-gray-300"
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text-alt text-base font-bold">จำนวนโต๊ะ (25 โต๊ะ ขึ้นไป)</span>
            </div>
            <input
              type="number"
              min="25"
              placeholder="จำนวนโต๊ะ"
              className="input input-bordered w-full"
              name="Numberoftables"
              value={input.Numberoftables}
              onChange={handleChange}
            />
          </label>
          <label className="form-control w-full">
            <div className="label">
              <span className="label-text-alt text-base font-bold">สถานที่จัดงาน :</span>
            </div>
            <input
              type="text"
              placeholder="สถานที่จัดงาน"
              className="input input-bordered w-full"
              name="location"
              value={input.location}
              onChange={handleChange}
            />
          </label>
          <button className="btn btn-outline btn-info">ตกลง</button>
        </form>
      </div>
    </div>
  );
}
