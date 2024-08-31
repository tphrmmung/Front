import axios from "axios";
import { useEffect, useState } from "react";
import { format, parseISO } from "date-fns";
import { th } from "date-fns/locale";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function Booking() {
  const [booking, setBooking] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const bookingsPerPage = 10;

  useEffect(() => {
    const getBooking = async () => {
      const rs = await axios.get("http://localhost:8889/admin/bookinguser");
      const sortedBookings = rs.data.booking.sort(
        (a, b) =>
          new Date(b.booking_date_and_time) - new Date(a.booking_date_and_time)
      );

      const bookingsWithApprovalState = sortedBookings.map((b) => ({
        ...b,
        isApproved: false,
      }));

      setBooking(bookingsWithApprovalState);
    };

    getBooking();
  }, []);

  function formatDateTime(dateString) {
    const date = parseISO(dateString);
    return format(date, "EEEE, d MMMM yyyy, HH:mm", { locale: th });
  }

  const handleApprovalToggle = (bookingId) => {
    setBooking((prevBooking) =>
      prevBooking.map((b) =>
        b.booking_id === bookingId ? { ...b, isApproved: !b.isApproved } : b
      )
    );

    const updatedBooking = booking.find((b) => b.booking_id === bookingId);

    Swal.fire({
      icon: updatedBooking.isApproved ? "success" : "warning",
      title: updatedBooking.isApproved
        ? "การจองได้รับการอนุมัติแล้ว"
        : "การจองถูกตั้งค่าให้รออนุมัติ",
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = booking.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const hdlPay = (id) => {
    navigate(`/payment_user/${id}`);
  };

  return (
    <div className="overflow-x-auto text-xl mt-20 border-2 min-w-[1300px] max-w-xs items-center rounded-w w-5/6 mx-auto p-4 gap-6">
      <table className="table">
        <thead className="label-text-alt text-base font-bold">
          <tr>
            <th>รหัสการจอง</th>
            <th>จำนวนโต๊ะ</th>
            <th>ราคาโต๊ะ</th>
            <th>ราคารวม</th>
            <th>วันที่จัดงาน</th>
            <th>สถานที่จัดงาน</th>
            <th>สถานะ</th>
            <th>หมายเหตุ</th>
            <th>ชำระเงินมัดจำ</th>
            <th>ใบเสร็จ</th>
          </tr>
        </thead>
        <tbody>
          {currentBookings.map((booking) => (
            <tr key={booking.booking_id}>
              <th>{booking.booking_id}</th>
              <th>{booking.Numberoftables}</th>
              <th>{booking.Tables?.tabes_price}</th>
              <th>
                {booking.Numberoftables * parseInt(booking.Tables?.tabes_price)}
              </th>
              <th>{formatDateTime(booking.booking_date_and_time)}</th>
              <th>{booking.location}</th>
              <th>
                {booking.bookingstatus === "Waiting" ? (
                  <span className="text-amber-500">รอการอนุมัติ</span>
                ) : booking.bookingstatus === "approve" ? (
                  <span className="text-green-600">อนุมัติแล้ว</span>
                ) : booking.bookingstatus === "cancel" ? (
                  <span className="text-red-600">ยกเลิกแล้ว</span>
                ) : booking.bookingstatus === "success" ? (
                  "สำเร็จ"
                ) : (
                  ""
                )}
              </th>
              <th style={{ textAlign: "center" }}>{booking.note || "-"}</th>
              <th className="px-4 py-2 text-left">
                {booking.bookingstatus === "approve" && (
                  <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
                    onClick={() => hdlPay(booking.booking_id)}
                  >
                    ชำระเงิน
                  </button>
                )}
              </th>
              <th>
              {booking.bookingstatus === "approve" && (
                <button
                  className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded shadow-md transition duration-300"
                  onClick={() => navigate(`/receipt/${booking.booking_id}`)}
                >
                  ใบเสร็จ
                </button>
              )}
              </th>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
