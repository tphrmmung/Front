import axios from "axios";
import { useEffect, useState } from "react";

export default function CustomerInformation() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // หน้าปัจจุบัน
  const itemsPerPage = 10; // จำนวนรายการต่อหน้า

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/users");
        // Sorting users by user_id in descending order
        const sortedUsers = response.data.users.sort((a, b) => b.user_id - a.user_id);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    getUsers();
  }, []);

  function formatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  }

  // ฟังก์ชันสำหรับแบ่งหน้าข้อมูล
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="container mx-auto mt-20">
      {/* Div สำหรับตาราง */}
      <div className="overflow-x-auto text-xl border-2 min-w-[1200px] max-w-xs items-center rounded-md w-5/6 mx-auto p-4 gap-6">
        <table className="table-auto w-full text-left border-collapse ">
          <thead>
            <tr className="bg-gray-200 text-gray-600 text-sm font-semibold uppercase">
              <th className="py-3 px-6 text-left">No</th>
              <th className="py-3 px-6 text-left">ชื่อผู้ใช้งาน</th>
              <th className="py-3 px-6 text-left">อีเมล</th>
              <th className="py-3 px-6 text-left">ชื่อ</th>
              <th className="py-3 px-6 text-left">เบอร์โทร</th>
              <th className="py-3 px-6 text-left">ตำแหน่ง</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {currentUsers
              .filter((user) => user.role === "USER")
              .map((user, index) => (
                <tr key={user.user_id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    {user.user_id}
                  </td>
                  <td className="py-3 px-6 text-left">{user.username}</td>
                  <td className="py-3 px-6 text-left">{user.email}</td>
                  <td className="py-3 px-6 text-left">{user.firstname}</td>
                  <td className="py-3 px-6 text-left">{user.phone}</td>
                  <td className="py-3 px-6 text-left">{user.role}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (อยู่ภายนอก div ของตาราง) */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
          } rounded`}
          onClick={() => setCurrentPage(currentPage - 1)}
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
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 ${
            currentPage === totalPages ? "bg-gray-300" : "bg-blue-500 text-white"
          } rounded`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
