import axios from "axios";
import React, { useRef, useState } from "react";
import Swal from "sweetalert2";

export default function NewTodoForm() {
  const [input, setInput] = useState({
    Tables_img: "",
    Tables_details: "",
    tabes_price: "",
    deposit: "",
  });

  const [loading, setLoading] = useState(false);
  const fileinput = useRef(null);
  const hdlChange = (e) => {
    if (e.target.name === "Tables_img") {
      setInput((prev) => ({ ...prev, Tables_img: e.target.files[0] }));
    } else {
      setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const hdlSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validate fields
    let errors = [];
    if (!input.Tables_details) {
      errors.push("กรุณากรอกรายละเอียดสินค้าและอาหาร");
    }
    const price = parseFloat(input.tabes_price);
    if (isNaN(price) || price <= 0) {
      errors.push("กรุณากรอกราคาให้ถูกต้อง");
    }

    if (errors.length > 0) {
      Swal.fire({
        icon: "warning",
        title: "ข้อมูลไม่ครบถ้วน",
        html: errors.join("<br />"),
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn btn-warning",
        },
      });
      setLoading(false);
      return;
    }

    try {
      const file = fileinput.current?.files[0];
      if (!file) {
        return alert("กรุณาแนบรูปภาพ");
      }
      const formData = new FormData();
      Object.entries(input).forEach(([key, value]) => {
        formData.append(key, value);
      });
      if (file) {
        formData.append("image", file);
      }

      const token = localStorage.getItem("token");
      console.log("Sending data:", {
        token,
        Tables_details: input.Tables_details,
        tables_price: price,
      });

      const response = await axios.post(
        "http://localhost:8889/admin/createTodo",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "เพิ่มสินค้าสำเร็จ",
          text: "สินค้าถูกเพิ่มเรียบร้อยแล้ว",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "btn btn-success",
          },
        }).then(() => {
          setInput({
            Tables_img: null,
            Tables_details: "",
            tabes_price: "",
          });
          setLoading(false);
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "ไม่สามารถเพิ่มสินค้าได้",
          text: "กรุณาลองใหม่อีกครั้ง",
          confirmButtonText: "ตกลง",
          customClass: {
            confirmButton: "btn btn-danger",
          },
        });
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "เกิดข้อผิดพลาด",
        text: "เกิดข้อผิดพลาดในการเพิ่มสินค้า: " + err.message,
        confirmButtonText: "ตกลง",
        customClass: {
          confirmButton: "btn btn-danger",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-gray-100 shadow-lg rounded-lg">
      <h1 className="text-center text-2xl font-bold mb-6">เพิ่มสินค้า</h1>
      <form className="flex flex-col gap-6" onSubmit={hdlSubmit}>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-1">รูปสินค้า</span>
          <input
            type="file"
            className="file-input file-input-bordered file-input-accent w-full max-w-xs"
            name="Table_img"
            accept="image/*"
            ref={fileinput}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-1">
            รายละเอียดสินค้าและอาหาร
          </span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            name="Tables_details"
            value={input.Tables_details}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-1">ราคา</span>
          <input
            type="text"
            className="p-2 border border-gray-300 rounded-md"
            name="tabes_price"
            value={input.tabes_price}
            onChange={hdlChange}
          />
        </label>
        <label className="flex flex-col">
          <span className="text-lg font-semibold mb-1">ค่ามัดจำ</span>
          <div className="flex">
            <input
              type="deposit"
              className="p-2 border border-gray-300 rounded-l-md w-11/12"
              name="deposit"
              value={input.deposit}
              onChange={hdlChange}
            />
            <input
              type="deposit"
              value={"%"}
              className="p-2 border border-gray-300 rounded-r-md w-1/12"
              name="deposit"
              disabled
            />
          </div>
        </label>
        <button
          className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          {loading ? "กำลังเพิ่มสินค้า..." : "เพิ่มสินค้า"}
        </button>
      </form>
    </div>
  );
}
