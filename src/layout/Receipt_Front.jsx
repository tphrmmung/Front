import axios from "axios";
import { useEffect, useState } from "react";

function Receipt_Front() {
  const id = location.pathname.split("/")[2];

  const [receipt, setReceipt] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const getReceipt = async () => {
      try {
        const rs = await axios.get(`http://localhost:8889/admin/receipt/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setReceipt(rs.data.recipt);
      } catch (err) {
        console.log(err.message);
      }
    };
    getReceipt();
  }, [id]);
;


  if (!receipt) {
    return <div className="mt-20">Loading...</div>;
  }

  // const componentRef = useRef();
  // const hdlprint = useReactToPrint({
  //   content: () => componentRef.current,
  // documentTitle:`ใบเสร็จ ${user.class.class_name}`,
  // });

  return (
    <>
      <div className="max-w-[30rem] mx-auto mt-20 p-8 bg-slate-200 shadow-lg rounded-md" id="receipt">
        
        <p className="text-center font-bold text-2xl">ใบเสร็จ</p>
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-center font-semibold text-md mt-1 underline underline-offset-2">
              เลขที่ใบเสร็จ {id}
            </p>
            <hr />
            <div className="flex justify-between font-bold mt-3">
              <p>ชื่อผู้จอง :{receipt?.Payment?.booking?.User?.firstname} </p>
              <div className="flex gap-10"></div>
            </div>
            <div className="flex justify-between font-bold ">
              <p>สถานที่ :  {receipt?.Payment?.booking?.location}</p>
              <div className="flex gap-10 ml-27">
                <p>ชื่อร้าน: TarnTip เซ็นเตอร์โต๊ะจีน </p>
              </div>
            </div>
            <div className="flex justify-between font-bold mt-3">
              <p>เบอร์ติดต่อ: {receipt?.Payment?.booking?.User?.phone} </p>

              <div className="flex gap-10"></div>
              <p>เบอร์ทางร้าน: 098-765-5432</p>
            </div>
            <div className="flex justify-between font-bold mt-3">
              <p>วันที่จัดงาน: {(receipt?.Payment?.booking?.booking_date_and_time).split('T')[0]} </p>
              <div className="flex gap-10"></div>
            </div>
            <hr />
            <div className="flex justify-between font-bold mt-3">
              <p>รายการสินค้า</p>
              <div className="flex gap-10">
                <p>จำนวน</p>
                <p>ราคา</p>
              </div>
            </div>
            <div className="flex justify-between font-bold mt-3">
              <div className="flex gap-2">
                <img
                  className="max-w-[90px] max-h-[90px] rounded-md shadow-md"
                  src={receipt?.Payment?.booking?.Tables?.Tables_img}
                  alt="table_image"
                />
                <p>
                  ราคาโต๊ะละ {receipt?.Payment?.booking?.Tables?.tabes_price} บาท
                </p>
              </div>
              <div className="flex gap-10">
                <p>{receipt?.Payment?.booking?.Numberoftables}</p>
                <p>{receipt?.Payment?.paymentamount}</p>
              </div>
            </div>
          </div>
          <div className="my-2 mt-10">
            <hr />
            <p className="font-bold">รวมราคาสินค้า</p>
            <div className="flex justify-between">
              <p className="ml-[2rem] font-bold">ราคา</p>
              <p className="font-bold text-lg">฿ {receipt?.Payment?.paymentamount}</p>
            </div>
            <div className="flex justify-between">
              <p className="ml-[2rem] font-bold">มัดจำ</p>
              <p className="font-bold text-lg">฿ {receipt?.Payment?.deposit_amount}</p>
            </div>
            <div className="flex justify-between">
              <p className="ml-[2rem] font-bold">ราคาสุทธิ</p>
              <p className="font-bold text-lg">฿ {receipt?.Payment?.paymentamount}</p>
            </div>
          </div>
        </div>
      </div>
      {/* <button onClick={handleDownload} className="mt-4 p-2 bg-blue-500 text-white rounded">Download Receipt</button> */}
    </>
  );
}

export default Receipt_Front;
