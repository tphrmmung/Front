import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function WaittingPayment() {
  const [booking, setBooking] = useState([]);
  const navigate = useNavigate()

  let token = localStorage.getItem("token");

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const rs = await axios.get(
        `http://localhost:8889/admin/booking/wait/payment`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (rs.status === 200) {
        setBooking(rs.data.booking);
      }
    } catch (err) {
      console.log(err);
    }
  };

  console.log(booking)

  return (
    <div className="flex justify-center items-center mt-20 w-full mx-auto px-4">
      <div className="w-full max-w-screen-lg">
        <p className="text-center font-bold text-3xl mb-8 text-blue-600">ประวัติการจอง</p>
        {booking.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mx-auto">
            {booking.map((el, index) => (
              <div
                key={index}
                className="border border-gray-300 rounded-lg p-6 bg-white shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-between">
                  <h3 className="font-bold text-lg text-gray-800 mb-4">ไอดีการจอง: {el.booking_id}</h3>
                  <h3 className="font-bold text-lg text-gray-800 mb-4">สถานะ : {el.bookingstatus === "Waiting" ? <label className="text-amber-400">รอการอนุมัติ</label> : el.bookingstatus === "approve" ? <label className="text-green-600">อนุมัติแล้ว</label> : el.bookingstatus === "cancel" ? <label className="text-red-600">ยกเลิก</label> : <label className="text-green-500">เสร็จสิ้น</label>}</h3>
                </div>
                <p className="text-gray-700 mb-2"><strong className="text-blue-500">ชื่อผู้จอง:</strong> {el.User?.firstname}</p>
                <p className="text-gray-700 mb-2"><strong className="text-blue-500">วันที่จัดงาน:</strong> {new Date(el.booking_date_and_time).toLocaleString('th-TH')}</p>
                <p className="text-gray-700 mb-2"><strong className="text-blue-500">จำนวนโต๊ะ:</strong> {el.Numberoftables}</p>
                <p className="text-gray-700 mb-2"><strong className="text-blue-500">ราคา:</strong> {Number(el.Tables?.tabes_price) * Number(el.Numberoftables)} บาท</p>
                <p className="text-gray-700"><strong className="text-blue-500">รายการอาหาร:</strong> {el?.Tables?.Tables_details}</p>
                <button type="button" onClick={ () => navigate(`/payment_user/${el.booking_id}`) } className="disabled:opacity-70 w-full p-2 bg-blue-600 rounded-md text-white shadow-sm" disabled={el.bookingstatus !== "approve"}>ชำระเงิน</button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No bookings found</p>
        )}
      </div>
    </div>
  );
  
  
  
}
