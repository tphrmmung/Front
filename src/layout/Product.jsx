import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaInstagram, FaLine } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { ImTwitter } from "react-icons/im";
import { BiPhoneCall } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsEnvelopeOpen } from "react-icons/bs";
import Swal from "sweetalert2";

export default function Product() {
  const [product, setProduct] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const productsPerPage = 6;
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    const getProduct = async () => {
      try {
        const response = await axios.get("http://localhost:8889/admin/Product");
        setProduct(response.data.Product);
      } catch (error) {
        console.error("Error fetching tables:", error);
      }
    };
    getProduct();
  }, []);

  const hdlbooking = async (id) => {
    if(token){
      try{
        const rs = await axios.get(`http://localhost:8889/admin/booking/table/${id}`);
        if(rs.status === 200){
          navigate(`/Booking_details/${id}`);
        }
      }catch(err){
        Swal.fire({
          icon: 'warning',
          text: err.response.data.message,
          title: 'เกิดข้อผิดพลาด',
        });
      }
    }else{
      Swal.fire({
        icon: 'info',
        title: "กรุณาเข้าสู่ระบบ",
        text: "กรุณาเข้าสู่ระบบหรือสมัคสมาชิก"
      }).then((res) => {
        if(res.isConfirmed){
          navigate('/login');
        }
      });
    }
  };

  const openModal = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const openImageModal = (imgUrl) => {
    setSelectedImage(imgUrl);
  };

  const closeImageModal = () => {
    setSelectedImage(null);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = product.slice(indexOfFirstProduct, indexOfLastProduct);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(product.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="w-full">
      <div className="relative min-w-fit h-80 object-cover rounded-t-3xl"
        style={{
          backgroundImage: "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/14Wedding_Special-Thai-Table_BOT_Sai_20-11-16-21.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>
      <div className="divider divider-primary">รับจัดโต๊ะจีน งานเลี้ยง</div>
      <div className="max-w-[90rem] mx-auto gap-12 flex flex-wrap mt-6 justify-around">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
          {currentProducts.map((product) => (
            <div key={product.Tables_id} className="bg-white rounded-xl shadow-xl w-[300px] border border-black">
              <figure className="px-5 pt-5">
                <img
                  src={product.Tables_img}
                  className="rounded-t-xl w-full h-60 object-cover cursor-pointer transition-transform duration-150 ease-in-out hover:scale-105"
                  onClick={() => openImageModal(product.Tables_img)}
                  alt="Product"
                />
              </figure>
              <div className="p-4">
                <p className="text-xl mb-2 overflow-wrap break-words font-normal">ราคา : {product.tabes_price}/ต่อโต๊ะ</p>
                <div
                  className="text-gray-600 mb-2 cursor-pointer"
                  onClick={() => openModal(product)}
                >
                  ดูรายละเอียดโต๊ะ
                </div>
                <p className="text-lg font-bold mb-2">{product.Tables_price}</p>
                <p className="text-lg mb-2 overflow-wrap break-words font-semibold text-blue-600 ">
                  มัดจำ : {product.deposit}%
                </p>
                <div className="flex justify-center">
                  <p onClick={() => hdlbooking(product.Tables_id)} className="btn btn-outline btn-success font-semibold py-4 px-6 rounded-lg">
                    จอง
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedProduct && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center mt-20 z-50">
            <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
              <h2 className="text-2xl mb-4">รายละเอียดโต๊ะเเละอาหาร :</h2>
              <p className="text-lg mb-2"> {selectedProduct.Tables_details}</p>
              <p className="text-lg font-bold mb-4">{selectedProduct.Tables_price}</p>
              <div className="flex justify-end">
                <button onClick={closeModal} className="btn btn-outline btn-danger font-semibold py-2 px-4 rounded-lg mr-2">ปิด</button>
              </div>
            </div>
          </div>
        )}

        {selectedImage && (
          <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300">
            <div className="relative">
              <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-screen rounded-lg shadow-lg" />
              <button onClick={closeImageModal} className="absolute top-2 right-2 text-white text-2xl">&times;</button>
            </div>
          </div>
        )}

        <div className="w-full mt-8">
          <div className="flex flex-col items-center">
            <nav aria-label="Page navigation">
              <ul className="inline-flex items-center -space-x-px">
                <li>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>
                </li>
                {pageNumbers.map(number => (
                  <li key={number}>
                    <button
                      onClick={() => paginate(number)}
                      className={`px-3 py-1 text-sm font-medium border rounded-lg ${currentPage === number ? 'bg-blue-600 text-white' : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'}`}
                    >
                      {number}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageNumbers.length))}
                    className="px-3 py-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
                    disabled={currentPage === pageNumbers.length}
                  >
                    &raquo;
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="w-full">
          <div className="flex justify-between bg-red-900 text-white p-8 w-full">
            <div>
              <h2 className="text-xl font-bold mb-2">FOLLOW US</h2>
              <div className="flex gap-8 items-center">
                <a
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaInstagram size={30} />
                  <span className="text-lg">: instagram</span>
                </a>
              </div>
              <div className="flex gap-8 items-center mt-2">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <IoLogoFacebook size={30} />
                  <span className="text-lg">: facebook</span>
                </a>
              </div>
              <div className="flex gap-8 items-center mt-2">
                <a
                  href="https://line.me/en/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FaLine size={30} />
                  <span className="text-lg">: Line</span>
                </a>
              </div>
              <div className="flex gap-8 items-center mt-2">
                <a
                  href="https://twitter.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ImTwitter size={30} />
                  <span className="text-lg">: Twitter</span>
                </a>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">CONTACT US</h2>
              <div className="flex gap-8 items-center">
                <CiLocationOn size={30} />
                <span className="text-lg">123 Your Address, City, Country</span>
              </div>
              <div className="flex gap-8 items-center mt-2">
                <BiPhoneCall size={30} />
                <span className="text-lg">+123-456-7890</span>
              </div>
              <div className="flex gap-8 items-center mt-2">
                <BsEnvelopeOpen size={30} />
                <span className="text-lg">email@example.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
