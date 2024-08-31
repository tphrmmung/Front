import axios from "axios";
import { useEffect, useState, useMemo } from "react";
import { BiEdit } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";
import Swal from 'sweetalert2'; // Import SweetAlert2

export default function Product_details() {
  const [Product, setProduct] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null); // Track the product being edited
  const [isModalOpen, setIsModalOpen] = useState(false); // Track the modal state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Function to sort products by updated date
  const sortProductsByDate = (products) => {
    return products.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
  };

  useEffect(() => {
    const getProduct = async () => {
      try {
        const rs = await axios.get("http://localhost:8889/admin/Product");
        setProduct(sortProductsByDate(rs.data.Product));
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    getProduct();
  }, []);

  const hdlDelete = async (e, Tables_id) => {
    try {
      e.stopPropagation();
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8889/admin/deleteProduct_details/${Tables_id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Update the state after deletion
      const updatedProducts = Product.filter((item) => item.Tables_id !== Tables_id);
      setProduct(sortProductsByDate(updatedProducts)); // Sort after deletion

      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'ลบข้อมูลโต๊ะสำเร็จ',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    } catch (err) {
      console.error("Error deleting product:", err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ลบข้อมูลโต๊ะไม่สำเร็จ',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    }
  };

  const hdlEdit = (pro) => {
    setEditingProduct(pro);
    setIsModalOpen(true);
  };

  const hdlSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Sending Data:", editingProduct);

      // Convert price to integer
      const updatedProduct = {
        ...editingProduct,
        tabes_price: parseInt(editingProduct.tabes_price, 10), // Convert to integer
      };

      const response = await axios.patch(`http://localhost:8889/admin/updateProduct/${updatedProduct.Tables_id}`, updatedProduct, {
        headers: { Authorization: `Bearer ${token}` }
      });

      console.log("Server Response:", response.data);

      // Update and sort products
      const updatedProducts = Product.map((item) => 
        item.Tables_id === updatedProduct.Tables_id ? updatedProduct : item
      );
      setProduct(sortProductsByDate(updatedProducts)); // Sort after update

      setIsModalOpen(false);
      
      Swal.fire({
        icon: 'success',
        title: 'สำเร็จ',
        text: 'อัปเดตข้อมูลโต๊ะสำเร็จ',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-success",
        },
      });
    } catch (err) {
      console.error("Error during product save:", err);
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถอัปเดตข้อมูลโต๊ะได้',
        confirmButtonText: 'ตกลง',
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    }
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = useMemo(() => Product.slice(indexOfFirstProduct, indexOfLastProduct), [Product, currentPage]);

  const totalPages = Math.ceil(Product.length / itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="overflow-x-auto text-xl mt-20 border-2 min-w-[1200px] items-center rounded-md w-full mx-auto p-4 gap-6">
        <table className="table-auto w-full text-left border-collapse">
          <thead className="bg-gray-200 text-base font-bold">
            <tr>
              <th className="px-4 py-2 text-left">ภาพ</th>
              <th className="px-4 py-2 text-left">ราคา</th>
              <th className="px-4 py-2 text-left">รายละเอียดโต๊ะ</th>
              <th className="px-4 py-2 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((pro) => (
              <tr key={pro.Tables_id} className="border-t">
                <td className="px-4 py-2 text-left">
                  <figure><img src={pro.Tables_img} className="max-w-32 rounded-lg" alt="Table" /></figure>
                </td>
                <td className="px-4 py-2 text-left">{pro.tabes_price}</td>
                <td className="px-4 py-2 text-left truncate-lines">{pro.Tables_details}</td>
                <td className="px-4 py-2 text-left flex space-x-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => hdlEdit(pro)}
                  >
                    <BiEdit />
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => hdlDelete(e, pro.Tables_id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination (outside the table) */}
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

      {/* Modal for Editing Product */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">แก้ไขรายละเอียดโต๊ะ</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">ราคา</label>
              <input
                type="number"
                value={editingProduct.tabes_price}
                onChange={(e) => setEditingProduct({ ...editingProduct, tabes_price: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">รายละเอียดโต๊ะ</label>
              <textarea
                value={editingProduct.Tables_details}
                onChange={(e) => setEditingProduct({ ...editingProduct, Tables_details: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                rows="4"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setIsModalOpen(false)}
              >
                ยกเลิก
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                onClick={hdlSave}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
