import axios from "axios";
import { useEffect, useState } from "react";

export default function Receipt() {
  const [receipts, setReceipts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  let token = localStorage.getItem("token");

  useEffect(() => {
    const getReceipts = async () => {
      try {
        const rs = await axios.get("http://localhost:8889/admin/recipt", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReceipts(rs.data.recipt);
      } catch (err) {
        console.error("Failed to fetch receipts", err);
      }
    };

    getReceipts();
  }, [token]);

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

  const filteredReceipts = receipts.filter((r) =>
    r.Recipt_id.toString().includes(searchTerm)
  );

  // Pagination logic
  const indexOfLastReceipt = currentPage * itemsPerPage;
  const indexOfFirstReceipt = indexOfLastReceipt - itemsPerPage;
  const currentReceipts = filteredReceipts.slice(indexOfFirstReceipt, indexOfLastReceipt);

  const totalPages = Math.ceil(filteredReceipts.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="overflow-x-auto mt-20 px-4">
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="ค้นหา ID ใบเสร็จ"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div className="container mx-auto mt-4">
        <div className="overflow-x-auto text-xl border-2 min-w-[1200px] rounded-md w-full mx-auto p-4">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-gray-200 text-base font-bold">
              <tr>
                <th className="px-4 py-2 border">ID ใบเสร็จ</th>
                <th className="px-4 py-2 border">ชื่อผู้จอง</th>
                <th className="px-4 py-2 border">เบอร์โทร</th>
                <th className="px-4 py-2 border">จำนวนโต๊ะ</th>
                <th className="px-4 py-2 border">ราคารวม</th>
              </tr>
            </thead>
            <tbody>
              {currentReceipts.map((receipt) => (
                <tr key={receipt.Recipt_id} className="border-t">
                  <td className="px-4 py-2 border">{receipt.Recipt_id}</td>
                  <td className="px-4 py-2 border">{receipt?.Payment?.booking?.User?.firstname}</td>
                  <td className="px-4 py-2 border">{receipt?.Payment?.booking?.User?.phone }</td>
                  <td className="px-4 py-2 border">{receipt?.Payment?.booking?.Numberoftables }</td>
                  <td className="px-4 py-2 border">
                    {receipt?.Payment?.booking?.Numberoftables * (receipt?.Payment?.booking?.Tables?.tabes_price || 0)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <button
          className={`px-4 py-2 mx-1 ${currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          ก่อนหน้า
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'} rounded`}
            onClick={() => handlePageChange(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className={`px-4 py-2 mx-1 ${currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 text-white'} rounded`}
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          ถัดไป
        </button>
      </div>
    </div>
  );
}
