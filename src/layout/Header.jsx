import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/userAuth";

const guestNav = [
  { to: "/home", text: "หน้าหลัก" },
  { to: "/", text: "เข้าสู่ระบบ" },
];

const userNav = [
  { to: "/home", text: "หน้าหลัก" },
  { to: "/product", text: "รายการโต๊ะ" },
  { to: "/ReservationForm_user", text: "ประวัติการจอง" },
  { to: "/ContactForm", text: "ติดต่อเรา" }
];

const adminNav = [
  { to: "/Product_details", text: "รายละเอียดโต๊ะ" },
  { to: "/NewTodoForm", text: "เพิ่มข้อมูลโต๊ะ" },
  { to: "/Customer_information", text: "ข้อมูลลูกค้า" },
  { to: "/Reservation", text: "ข้อมูลการจอง" },
  { to: "/payment", text: "ข้อมูลการชำระเงิน" },
  { to: "/recipt", text: "ข้อมูลใบเสร็จ" },
];

export default function Header() {
  const { user, logout } = useAuth();
  const finalNav = user?.user_id
    ? user.role === "ADMIN"
      ? adminNav
      : userNav
    : guestNav;

  const navigate = useNavigate();

  const hdlLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="navbar fixed top-0 left-0 right-0 z-10 bg-white py-2 px-4 border-b border-gray-300 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown text-sm">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost text-black"
          >
            {/* Optional: Add an icon or label here */}
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-40 text-red-900"
          >
            {finalNav.map((el) => (
              <li key={el.to}>
                <Link to={el.to} className="text-red-900 hover:text-black">{el.text}</Link>
              </li>
            ))}
          </ul>
        </div>
        <a className="label-text-alt text-sm font-bold text-red-900">
          {user?.user_id ? `สวัสดี ${user.username}` : "สวัสดีคุณ"}
        </a>
      </div>
      <div className="navbar-center hidden lg:flex text-sm">
        <ul className="menu menu-horizontal px-1">
          {finalNav.map((el) => (
            <li key={el.to}>
              <Link to={el.to} className="text-red-900 bg-white">{el.text}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="list-none navbar-end label-text-alt text-sm font-bold">
        {user?.user_id && (
          <li>
            <Link to="/" onClick={hdlLogout} className="text-red-900 bg-white">
              ออกจากระบบ
            </Link>
          </li>
        )}
      </div>
    </div>
  );
}
