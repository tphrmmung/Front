import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function recipt_user() {
  const[recipt_user, setrecipt_user] = useState([])
  const navigate = useNavigate();


  useEffect(() => {
    const getrecipt_user = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/recipt_user");
        setrecipt_user(response.data.recipt);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    getrecipt_user();
  }, []);
 

  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5 mx-auto p-4 gap-6 mt-10"
      onSubmit={hdlSubmit}
    >
      <div className="form-control text-center text-3xl mb-2">รายละเอียดการจอง</div>
      <label>
      <div className="label">
            <span className="label-text-alt text-base font-bold">
              วันที่/เวลาการการจัดงาน
            </span>
          </div>
          <input
            className="btn btn-primary"
            type="datetime-local"
            name="booking_date_and_time"
            value={input.booking_date_and_time}
            onChange={hdlChange}
          />
        </label>
      
      <label className="form-control w-full ">
      
        <div className="label">
            <span className="label-text-alt text-base font-bold">จำนวนโต๊ะ : </span>
        </div>
        <input
          type="text"
          placeholder="จำนวนโต๊ะ"
          className="input input-bordered w-full"
          name="Numberoftables"
          value={input.Numberoftables}
          onChange={hdlChange}
        />
      </label>
      
      <label className="form-control w-full ">
        <div className="label">
            <span className="label-text-alt text-base font-bold">สถานที่จัดงาน :</span>
        </div>
        <input
          type="text"
          placeholder="สถานที่จัดงาน "
          className="input input-bordered w-full"
          name="location"
          value={input.location}
          onChange={hdlChange}
        />
      </label>
      
      <button className="btn btn-outline btn-info">จอง</button>
</form>
        
)
  

}