import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";

export default function Booking() {
  const [bookings, setBookings] = useState([]);
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 10;

  let token = localStorage.getItem('token');

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/booking");
        const sortedBookings = response.data.booking.sort(
          (a, b) =>
            new Date(b.booking_date_and_time) - new Date(a.booking_date_and_time)
        );
        setBookings(sortedBookings);
      } catch (error) {
        console.error("ไม่สามารถดึงข้อมูลการจองได้:", error);
      }
    };

    fetchBookings();
  }, [reload]);

  const formatDateTime = (dateString) => {
    const date = parseISO(dateString);
    return format(date, "EEEE, d MMMM yyyy, HH:mm", { locale: th });
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleApproval = (bookingId) => {
    Swal.fire({
      title: "คุณแน่ใจหรือไม่?",
      text: "คุณต้องการอนุมัติการจองนี้หรือไม่?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ใช่, อนุมัติเลย!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateStatus(bookingId);
      }
    });
  };

  const handleCancellation = async (bookingId) => {
    Swal.fire({
      title: "ยกเลิกการจอง",
      text: "กรุณาระบุเหตุผลในการยกเลิก:",
      input: 'text',
      inputPlaceholder: 'เหตุผลในการยกเลิก',
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยกเลิกการจอง",
      cancelButtonText: "ยกเลิก",
    }).then(async (result) => {  // เปลี่ยนฟังก์ชันเป็น async ในนี้
      if (result.isConfirmed) {
        const note = result.value;
        alert(note)
        if (note) {
          try {
            const rs = await axios.patch(
              `http://localhost:8889/admin/bookings/status/${bookingId}`,
              { status: "cancel", note },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            if (rs.status === 200) {
              Swal.fire({
                title: "สำเร็จ!",
                text: "การอัปเดตข้อมูลเสร็จสมบูรณ์",
                icon: "success",
                confirmButtonText: "ตกลง",
                confirmButtonColor: "#3085d6",
              });
              setReload(!reload); // โหลดข้อมูลใหม่
            }
          } catch (error) {
            console.log(error)
            Swal.fire("ข้อผิดพลาด", "ไม่สามารถยกเลิกการจองได้", "error");
          }
        }
      }
    });
  };

  const updateStatus = async (id, note = "") => {
    try {
      const rs = await axios.patch(`http://localhost:8889/admin/bookings/status/${id}`, { status: "approve", note }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (rs.status === 200) {
        Swal.fire({
          title: "สำเร็จ!",
          text: "การอัปเดตข้อมูลเสร็จสมบูรณ์",
          icon: "success",
          confirmButtonText: "ตกลง",
          confirmButtonColor: "#3085d6",
        });
        setReload(!reload); // โหลดข้อมูลใหม่
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="overflow-x-auto text-xl mt-20 border-2 min-w-[1200px] max-w-xs items-center rounded-md w-5/6 mx-auto p-4 gap-6">
      <table className="table-auto w-full text-left border-collapse">
        <thead className="bg-gray-200 text-base font-bold">
          <tr>
            <th className="px-4 py-2 border">รหัสการจอง</th>
            <th className="px-4 py-2 border">ชื่อ</th>
            <th className="px-4 py-2 border">จำนวนโต๊ะ</th>
            <th className="px-4 py-2 border">ราคา</th>
            <th className="px-4 py-2 border">วันที่จัดงาน</th>
            <th className="px-4 py-2 border">สถานที่จัดงาน</th>
            <th className="px-4 py-2 border">สถานะการจอง</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.booking_id}>
              <td className="px-4 py-2 border">{booking.booking_id}</td>
              <td className="px-4 py-2 border">{booking.User.firstname}</td>
              <td className="px-4 py-2 border">{booking.Numberoftables}</td>
              <td className="px-4 py-2 border">
                {booking.Numberoftables * parseInt(booking.Tables?.tabes_price)}
              </td>
              <td className="px-4 py-2 border">
                {formatDateTime(booking.booking_date_and_time)}
              </td>
              <td className="px-4 py-2 border">{booking.location}</td>
              <td className="px-4 py-2 border">
                {booking.bookingstatus === "Waiting" ? (
                  <div className="flex space-x-2">
                    <button
                      className="px-4 py-2 bg-amber-500 text-black rounded-md hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
                      onClick={() => handleApproval(booking.booking_id)}
                    >
                      รออนุมัติ
                    </button>
                    <button
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition duration-200"
                      onClick={() => handleCancellation(booking.booking_id)}
                    >
                      ยกเลิก
                    </button>
                  </div>
                ) : booking.bookingstatus === "cancel" ? (
                  <span className="text-red-600">ยกเลิกแล้ว</span>
                ) : (
                  <span className="text-green-600">อนุมัติแล้ว</span>
                )}
              </td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
