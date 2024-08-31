import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import userAuth from '../hooks/userAuth';

export default function LoginForm() {
  const navigate = useNavigate();
  const { setUser } = userAuth();
  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const hdlChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();

    try {
      const rs = await axios.post('http://localhost:8889/auth/login', input);
      localStorage.setItem('token', rs.data.token);

      const rs1 = await axios.get('http://localhost:8889/auth/me', {
        headers: { Authorization: `Bearer ${rs.data.token}` },
      });

      // Notify user of successful login
      Swal.fire({
        icon: 'success',
        title: 'เข้าสู่ระบบสำเร็จ',
        text: 'คุณได้เข้าสู่ระบบเรียบร้อยแล้ว',
        customClass: {
          confirmButton: 'btn btn-success'  // Add this line to customize the button
        },
        confirmButtonText: 'ตกลง'
      }).then(() => {
        navigate('/');
        setUser(rs1.data);
      });
    } catch (err) {
      // Notify user of failed login
      if (err.response && err.response.status === 401) {
        // Assuming 401 is used for invalid credentials
        Swal.fire({
          icon: 'error',
          title: 'ข้อผิดพลาด',
          text: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง',
          customClass: {
            confirmButton: 'btn btn-success'  // Add this line to customize the button
          },
          confirmButtonText: 'ตกลง'
        });
      } else {
        // Assuming other errors indicate no account
        Swal.fire({
          icon: 'warning',
          title: 'ยังไม่มีบัญชี',
          text: 'คุณยังไม่มีบัญชีผู้ใช้งาน กรุณาลงทะเบียน',
          customClass: {
            confirmButton: 'btn btn-success'  // Add this line to customize the button
          },
          confirmButtonText: 'ตกลง'
        });
      }
    }
  };

  return (
    <div className="hero min-h-screen w-900 h-96" style={{ backgroundImage: 'url(https://www.weddinglist.co.th/wp-content/uploads/2017/08/%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%99%E0%B8%97%E0%B8%B5%E0%B9%88%E0%B9%81%E0%B8%95%E0%B9%88%E0%B8%87%E0%B8%87%E0%B8%B2%E0%B8%99-The-Banquet-Hall-at-Nathong-16.jpg.webp)', backgroundSize: 'cover' }}>
      <div className="card shadow-xl mt-10 mx-auto w-96 bg-white/10 backdrop-blur-lg rounded-lg">
        <div className="p-8">
          <div className="text-3xl text-center text-blue-950 mb-6">เข้าสู่ระบบ</div>
          <form className="flex flex-col gap-4" onSubmit={hdlSubmit}>
            <label className="form-control w-full">
              <span className="label-text text-blue-950">ชื่อผู้ใช้งาน</span>
              <input
                placeholder="กรอกชื่อผู้ใช้"
                type="text"
                className="input input-primary w-full"
                name="username"
                value={input.username}
                onChange={hdlChange}
              />
            </label>
            <label className="form-control w-full">
              <span className="label-text text-blue-950">รหัสผ่าน</span>
              <input
                placeholder="กรอกรหัสผ่าน"
                type="password"
                className="input input-primary w-full"
                name="password"
                value={input.password}
                onChange={hdlChange}
              />
            </label>
            <button className="btn bg-indigo-400 hover:bg-indigo-900 text-white rounded-full mt-6">เข้าสู่ระบบ</button>
            <p className="text-center text-blue-950 mt-4">
              ยังไม่มีบัญชีใช่หรือไม่? 
              <Link className="link link-info" to="/Register">ลงทะเบียน</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
