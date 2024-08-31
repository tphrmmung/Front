import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import QRCodeGenerate from "../layout/QRCode";
import Swal from 'sweetalert2';

export default function PaymentUser() {
  const [booking, setBooking] = useState({});
  const [price, setPrice] = useState(0);
  const [payBooking, setPayBooking] = useState([])
  const fileinput = useRef(null);
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const token = location.pathname.split("/")[3];
  const amount = booking?.Numberoftables ? booking?.Numberoftables * price : 0;

  const deposit_amount = (amount * booking?.Tables?.deposit) / 100

  const [input, setInput] = useState({
    paymentmethod: "โอน",
    paymentamount: "",
  });

  if(localStorage.getItem('token') === "undefined"){
    localStorage.setItem('token', token)
  }

  const navigate = useNavigate();

  useEffect(() => {
    const getPaymentUser = async () => {
      try {
        const rs = await axios.get("http://localhost:8889/admin/booking/" + id);
        setBooking(rs.data.bookingID);
        setPrice(rs.data.bookingID.Tables.tabes_price);
      } catch (error) {
        console.error(error);
      }
    };
    getPaymentUser();


    const checkPayment = async () => {
      try {
        const rs = await axios.get("http://localhost:8889/admin/payment/" + id);
        if(rs.status === 200){
          setPayBooking(rs.data.payment)
        }
      }catch(err){
        console.log(err)
      }
    }

    checkPayment();

  }, [id, token]);



  if(payBooking.length > 0){
    return (
      <>
        <div className="max-w-[80rem] mx-auto my-4 mt-20">
          <div className="max-w-[30rem] shadow-md mx-auto border-md p-4 rounded-md">
            <div >
              <img className="max-w-[200px] rounded-full shadow-sm mx-auto"src="https://static.vecteezy.com/system/resources/previews/015/876/264/original/success-payment-in-hand-illustration-in-flat-style-approved-money-illustration-on-isolated-background-successful-pay-sign-business-concept-vector.jpg" alt="Logo" />
            </div>
            <p className="font-bold text-center">การชำระเงินเสร็จสิ้น</p>
            <p></p>
          </div>
        </div>
      </>
    )
  }

  function currencyFormat(num) {
    return num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const hdlChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*\.?\d*$/.test(value)) {
      setInput((prev) => ({ ...prev, [name]: value }));
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    
    // ตรวจสอบข้อมูลที่กรอก
    const enteredAmount = parseFloat(input.paymentamount);
    if (!input.paymentamount || !fileinput.current?.files[0]) {
      Swal.fire({
        icon: 'warning',
        title: 'ข้อมูลไม่ครบถ้วน',
        text: 'กรุณากรอกจำนวนเงินและแนบสลิปการโอนเงิน',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    if (enteredAmount !== deposit_amount) {
      Swal.fire({
        icon: 'warning',
        title: 'จำนวนเงินไม่ตรง',
        text: 'จำนวนเงินที่ชำระไม่ตรงกับจำนวนเงินที่ต้องชำระ กรุณาตรวจสอบอีกครั้ง',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      return;
    }

    try {
      const file = fileinput.current?.files[0];
      const formData = new FormData();
   
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("image", file);
      }
      formData.append("deposit_amount", deposit_amount);
      formData.append("amount", amount);
   
      const token = localStorage.getItem("token");
      const rs = await axios.post(
        `http://localhost:8889/admin/payment/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const PayId = rs.data.payment.Payment_id;
      const payment = { Payment_id: PayId };
      
      const rs2 = await axios.post("http://localhost:8889/admin/receipt", payment);
      if (rs2.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'ชำระเงินเสร็จสิ้น',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: "btn btn-success",
          },
        });
        navigate(`/receipt/${rs2.data.receipt.Recipt_id}`);
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: err.message,
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    }
  };

  return (
    <div className="container mx-auto py-10">
      <div className="hero-content flex-col lg:flex-row"></div>
      <form
        className="max-w-3xl mx-auto mt-10 p-5 bg-slate-200 shadow-lg rounded-md"
        onSubmit={hdlSubmit}
      >
        <div className="form-control text-center">
          <div className="text-3xl btn-info mb-6 font-bold">ชำระเงิน</div>
          <div className="label-text-alt text-lg font-bold mb-1">รายละเอียดการโอนเงิน</div>
          <p className="font-bold text-lg">วางมัดจำ {booking?.Tables?.deposit} %</p>
        </div>
        <div className="label-text-alt text-lg font-bold mt-1 text-center ">
          เลขที่บัญชี: 020-345-5556-6 ธนาคารกรุงไทย
        </div>
        <div className="form-control text-center flex lg:flex-row flex-col items-center justify-between">         
          <QRCodeGenerate price={amount} />
          <div className="ml-4 mt-4 lg:mt-0 w-full lg:w-1/2">
            <label className="form-control w-full">
              <div className="label-text-alt text-lg font-bold mb-1">รายละเอียดการโอนเงิน</div>
              <div className="label-text-alt text-lg font-bold mb-1">
                จำนวนยอดเงินทั้งหมด: {currencyFormat(amount)} บาท
              </div>
              <div className="label-text-alt text-lg font-bold mb-1">
                จำนวนเงินที่จะต้องวางมัดจำ: {currencyFormat(deposit_amount)} บาท
              </div>
              <div className="label">
                <span className="label-text-alt text-lg font-bold mb-1">กรอกจำนวนเงิน </span>
              </div>
              <input
                type="text"
                placeholder="ใส่จำนวนที่ชำระ"
                className="input input-bordered w-full input-info max-w-xs"
                name="paymentamount"
                value={input.paymentamount}
                onChange={hdlChange}
              />
            </label>
            <label className="form-control w-full mt-1">
              <div className="label">
                <span className="label-text-alt text-lg font-bold mb-1">เเนบสลิป</span>
              </div>
              <input
                type="file"
                className="file-input file-input-bordered file-input-accent w-full max-w-xs"
                accept="image/*"
                ref={fileinput}
              />
            </label>
            <div className="flex justify-end items-end mt-6">
              <button className="btn btn-info" type="submit" style={{ width: '100%' }}>เสร็จสิ้น</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
