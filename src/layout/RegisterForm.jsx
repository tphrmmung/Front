import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export default function RegisterForm() {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    firstname: '',
    lastname: '',
    email: '',
    phone: '',
    address: '',
  });

  const hdlChange = (e) => {
    const { name, value } = e.target;
    setInput(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!input.username || !input.password || !input.confirmPassword || !input.firstname || !input.lastname || !input.email || !input.phone || !input.address) {
      return Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาด',
        text: 'กรุณากรอกข้อมูลให้ครบถ้วน',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-green-500 text-white'
        }
      });
    }
  
    if (input.password !== input.confirmPassword) {
      return Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาด',
        text: 'กรุณาตรวจสอบรหัสผ่านยืนยัน',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-green-500 text-white'
        }
      });
    }
  
    if (input.password.length < 6) {
      return Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาด',
        text: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-green-500 text-white'
        }
      });
    }
  
    if (!/^\d{10}$/.test(input.phone)) {
      return Swal.fire({
        icon: 'error',
        title: 'ข้อผิดพลาด',
        text: 'เบอร์โทรต้องเป็นตัวเลข 10 หลัก',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: 'bg-green-500 text-white'
        }
      });
    }
  
    try {
      const rs = await axios.post('http://localhost:8889/auth/register', input);
      if (rs.status === 200) {
        Swal.fire({
          icon: 'success',
          title: 'สำเร็จ',
          text: 'สมัครสมาชิกสำเร็จ',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'bg-green-500 text-white'
          }
        }).then(() => navigate('/login'));
      }
    } catch (err) {
      if (err.response) {
        // if (err.response.status === 409) {
        //   Swal.fire({
        //     icon: 'error',
        //     title: 'ข้อผิดพลาด',
        //     text: 'ชื่อผู้ใช้นี้มีอยู่แล้ว กรุณาเลือกชื่อผู้ใช้อื่น',
        //     confirmButtonText: 'ตกลง',
        //     customClass: {
        //       confirmButton: 'bg-green-500 text-white'
        //     }
        //   });
        // } else 
        if (err.response.status === 422) {
          Swal.fire({
            icon: 'error',
            title: 'ข้อผิดพลาด',
            text: 'อีเมลนี้ถูกลงทะเบียนไว้แล้ว',
            confirmButtonText: 'ตกลง',
            customClass: {
              confirmButton: 'bg-green-500 text-white'
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาด',
          text: 'ไม่สามารถสมัครสมาชิกได้',
          confirmButtonText: 'ตกลง',
          customClass: {
            confirmButton: 'bg-green-500 text-white'
          }
        });
      }
      console.log(err.message);
    }
  };
  

  return (
    <div
      className="hero min-h-screen"
      style={{
        backgroundImage:
          'url(https://www.weddinglist.co.th/wp-content/uploads/2017/08/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99-The-Banquet-Hall-at-Nathong-16.jpg.webp)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div className="card shadow-xl mt-24 mx-auto bg-white/10 backdrop-blur-lg rounded-lg p-8" style={{ maxWidth: '600px' }}>
        <div className="text-3xl text-center text-blue-950 mb-6">สมัครสมาชิก</div>
        <form onSubmit={hdlSubmit}>
          <div className="grid grid-cols-2 gap-6">
            {/* Input fields */}
            <div className="form-control">
              <label className="label-text text-blue-950">ชื่อผู้ใช้งาน</label>
              <input
                placeholder="กรอกชื่อผู้ใช้"
                type="text"
                className="input input-primary"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">รหัสผ่าน</label>
              <input
                placeholder="กรอกรหัสผ่าน"
                type="password"
                className="input input-primary"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">ยืนยันรหัสผ่าน</label>
              <input
                placeholder="กรอกรหัสผ่านอีกครั้ง"
                type="password"
                className="input input-primary"
                name="confirmPassword"
                value={input.confirmPassword}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">ชื่อ</label>
              <input
                placeholder="กรอกชื่อ"
                type="text"
                className="input input-primary"
                name="firstname"
                value={input.firstname}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">สกุล</label>
              <input
                placeholder="กรอกสกุล"
                type="text"
                className="input input-primary"
                name="lastname"
                value={input.lastname}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">อีเมล</label>
              <input
                placeholder="กรอกอีเมล"
                type="email"
                className="input input-primary"
                name="email"
                value={input.email}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">เบอร์โทร</label>
              <input
                placeholder="กรอกเบอร์โทร"
                type="tel"
                className="input input-primary"
                name="phone"
                value={input.phone}
                onChange={hdlChange}
              />
            </div>
            <div className="form-control">
              <label className="label-text text-blue-950">ที่อยู่</label>
              <input
                placeholder="กรอกที่อยู่"
                type="text"
                className="input input-primary"
                name="address"
                value={input.address}
                onChange={hdlChange}
              />
            </div>
          </div>
          <button className="btn bg-indigo-400 hover:bg-indigo-900 text-white rounded-full mt-6 w-full py-3">
            สมัครสมาชิก
          </button>
        </form>
      </div>
    </div>
  );
}