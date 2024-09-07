import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function Payment() {
  const [payments, setPayments] = useState([]);
  const [ dataModal, setDataModal ] = useState([]);
  const [confiemId, setConfirmId] = useState("")

  const [paymentPrice, setPaymentPrice] = useState("")
  const [searchTerm, setSearchTerm] = useState("");
  const [reload, setReload] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStatus, setSelectedStatus] = useState("Pending");
  const itemsPerPage = 10;
  const { status } = useParams(); // Get status from URL

  const fileInput = useRef();

  useEffect(() => {
    const getPayments = async () => {
      try {
        const rs = await axios.get("http://localhost:8889/admin/payment");
        const sortedPayments = rs.data.payment.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
        );
        setPayments(sortedPayments);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    getPayments();
  }, [reload]);

  useEffect(() => {
    // Set selectedStatus based on URL parameter
    if (status === "pending" || status === "paid") {
      setSelectedStatus(status.charAt(0).toUpperCase() + status.slice(1));
    }
  }, [status]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const chgstatus = async (status, ID) => {
    try {
      const currentPayment = payments.find(
        (payment) => payment.Payment_id === ID
      );
      if (currentPayment.paymentstatus === "Paid" && status === "Pending") {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเปลี่ยนสถานะได้",
          text: "การชำระเงินที่ชำระแล้วไม่สามารถเปลี่ยนกลับเป็นรอตรวจได้",
        });
        return;
      }

      let token = localStorage.getItem("token");
      const rs = await axios.patch(
        `http://localhost:8889/admin/payment/${ID}`,
        { status },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (rs.status === 200) {
        setPayments((prevPayments) =>
          prevPayments.map((payment) =>
            payment.Payment_id === ID
              ? { ...payment, paymentstatus: status }
              : payment
          )
        );
      }
    } catch (err) {
      console.log("Error changing status:", err);
    }
  };

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

  const filteredPayments = payments.filter(
    (p) =>
      p.Payment_id.toString().includes(searchTerm) &&
      p.paymentstatus === selectedStatus
  );

  const indexOfLastPayment = currentPage * itemsPerPage;
  const indexOfFirstPayment = indexOfLastPayment - itemsPerPage;
  const currentPayments = filteredPayments.slice(
    indexOfFirstPayment,
    indexOfLastPayment
  );

  const totalPages = Math.ceil(filteredPayments.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  
  const hdlConfirmPay = async () => {

    try {
      const file = fileInput.current?.files[0];

      if (!file) {
        return alert("กรุณาแนบรูปภาพ");
      }

      if (!paymentPrice){
        return alart("กรุณากรอกข้อมูล");
      }

      const formData = new FormData();

      if (file) {
        formData.append("image", file);
      }

      formData.append("Payment_Price", paymentPrice);
      formData.append("Payment_id", confiemId);

      const rs = await axios.post("http://localhost:8889/admin/confirm/payment", formData)

      if(rs.status === 200){
        document.getElementById("my_modal_3").close()
        return Swal.fire({
          icon: 'success',
          title: "บันทึกข้อมูลเรียบร้อยแล้ว"
        })
      }

    }catch(err){
      console.log(err)
      // document.getElementById("my_modal_3").close()
    }
  }

  return (
    <div className="overflow-x-auto mt-20 px-2">
      <div className="flex justify-between mb-2">
        <input
          type="text"
          placeholder="ค้นหา id การชำระเงิน"
          value={searchTerm}
          onChange={handleSearch}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="overflow-x-auto text-xl mt-7 border-2 min-w-[1200px] max-w-xs items-center rounded-md w-5/6 mx-auto p-4 gap-6">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200 text-base font-bold">
            <tr>
              <th className="px-4 py-2 border">id การชำระเงิน</th>
              <th className="px-4 py-2 border">วิธีการชำระเงิน</th>
              <th className="px-4 py-2 border">ราคาเต็ม</th>
              <th className="px-4 py-2 border">เงินมัดจำ</th>
              <th className="px-4 py-2 border">คงเหลือ</th>
              <th className="px-4 py-2 border">สถานะ</th>
              <th className="px-4 py-2 border">หลักฐานมัดจำ</th>
              <th className="px-4 py-2 border">หลักฐานการชำระเงิน</th>
              <th className="px-4 py-2 border">ชำระเงิน</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment.Payment_id}
                className="border-b hover:bg-gray-100"
              >
                <td className="px-4 py-2 border">{payment.Payment_id}</td>
                <td className="px-4 py-2 border">{payment.paymentmethod}</td>
                <td className="px-4 py-2 border">{payment.paymentamount}</td>
                <td className="px-4 py-2 border">{payment.deposit_amount}</td>
                <td className="px-4 py-2 border">{payment.remain}</td>
                <td className="px-4 py-2 border">
                  {payment.paymentstatus === "Pending" ? (
                    <td
                      className=" text-black py-2 px-4   transition duration-300"
                      onClick={() =>
                        { document.getElementById("my_modal_4").showModal(); setDataModal(payment) }
                      }
                    >
                      รอตรวจสอบ
                    </td>
                  ) : payment.paymentstatus === "Paid" ? (
                    <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
                      ตรวจสอบแล้ว
                    </button>
                  ) : payment.paymentstatus === "Work" ? "เสร็จสิ้น" : ""}
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={payment.payment_img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    ดูข้อมูล
                  </a>
                </td>
                <td className="px-4 py-2 border">
                  <a
                    href={payment.total_pay_img}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    ดูข้อมูล
                  </a>
                </td>
                <td className="px-4 py-2 border text-center">
                  <button
                    disabled={payment.paymentstatus === "Work"}
                    className="bg-green-500 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition duration-300"
                    onClick={() =>
                      { document.getElementById("my_modal_3").showModal(); setConfirmId(payment.Payment_id); setDataModal(payment) }
                    }
                  >
                    ชำระเงิน
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          } rounded`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 mx-1 ${
              currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
            } rounded`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages
              ? "bg-gray-300"
              : "bg-blue-500 text-white"
          } rounded`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
      </div>
      
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">ชำระเงิน</h3>
          <form className="flex flex-col gap-6">
            <label className="flex flex-col">
              <th className="px-4 py-2">ยอดเงินคงเหลือที่ต้องชำระ {dataModal.remain}</th>
              <span className="text-lg font-semibold mb-1">แนปสลิป</span>
              <input
                type="file"
                ref={fileInput}
                className="file-input file-input-bordered file-input-error w-full max-w-xs"
                accept="image/*"
              />
              <span className="text-lg font-semibold mb-1 p-2">
                กรอกจำนวนเงิน
              </span>
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-md w-48"
                name="tabes_price"
                onChange={ (e) => setPaymentPrice(e.target.value)}
              />
            </label>
          </form>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              onClick={ () => hdlConfirmPay() }
            >
              ตกลง
            </button>
          </div>
        </div>
      </dialog>

      {/* <dialog id="my_modal_4" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <div className="flex justify-center">
            <h3 className="font-bold text-lg">ตรวจสอบข้อมูล</h3>
          </div>
          <div className="p-0">
            {" "}
            <div className="flex justify-between items-center gap-8">
              {" "}
              <p className="py-2">ชื่อผู้จอง : {dataModal.booking?.User?.firstname}</p>
              <p className="py-2">เบอร์โทร : {dataModal.booking?.User?.phone} </p>
            </div>
          </div>
          <div className="p-0">
            {" "}
            <div className="flex justify-between items-center gap-8">
              {" "}
              <p className="py-2">วันที่จัดงาน : {dataModal.booking?.User?.Userid?.booking_date_and_time}</p>
              <p className="py-2">จำนวนโต๊ะ : </p>
             
            </div>
          </div>
            <div className="flex justify-between items-center gap-8">
              {" "}
              <p className="py-2">สถานที่จัดงาน</p>
          </div>
          <div className="flex justify-center">
            <h3 className="font-bold text-lg">ข้อมูลการชำระเงิน</h3>
          </div>
          <div className="p-0">
            {" "}
            <div className="flex justify-between items-center gap-8">
              {" "}
              <p className="py-2">ราคาเต็ม</p>
              <p className="py-2">เงินมัดจำ : </p>
            </div>
          </div>
          <div className="p-0">
            {" "}
            <div className="flex justify-between items-center gap-8">
              {" "}
              <p className="py-2">รูปสลิป</p>
             
            </div>
          </div>
          <div className="flex justify-end">
            <button
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
              onClick={() => {
                alert("ตรวจสอบข้อมูลเรียบร้อย");
              }}
            >
              ตกลง
            </button>
          </div>
        </div>
      </dialog> */}
    </div>
  );
}
