import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import "@splidejs/react-splide/css/core";
import { FaInstagram } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { FaLine } from "react-icons/fa6";
import { ImTwitter } from "react-icons/im";
import { BiPhoneCall } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsEnvelopeOpen } from "react-icons/bs";

export default function UserHome() {
  const [todos, setTodos] = useState([]);

  function FormatDate(dateString) {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options);
  }

  const imageArr = [
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/3%E0%B8%AA%E0%B9%80%E0%B8%95%E0%B9%87%E0%B8%81%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%A1%E0%B8%B0%E0%B8%99%E0%B8%B2%E0%B8%A7-%E0%B8%84%E0%B8%B0%E0%B8%99%E0%B9%89%E0%B8%B2%E0%B8%AA%E0%B8%94-768x512.jpg",
      alt: "image-01",
      title: "สเต็กหมูมะนาว-คะน้าสด",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/2%E0%B9%81%E0%B8%81%E0%B8%87%E0%B8%A1%E0%B8%B1%E0%B8%AA%E0%B8%AB%E0%B8%A1%E0%B8%B1%E0%B9%88%E0%B8%99%E0%B9%84%E0%B8%81%E0%B9%88--768x511.jpg",
      alt: "image-02",
      title: "แกงมัสหมั่นไก่",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/10%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%8A%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B8%9C%E0%B8%B1%E0%B8%94%E0%B8%9A%E0%B8%A5%E0%B9%87%E0%B8%AD%E0%B8%81%E0%B9%82%E0%B8%84%E0%B8%A5%E0%B8%B5%E0%B9%88--768x512.jpg",
      alt: "image-03",
      title: "ลูกชิ้นกุ้งผัดบล็อกโคลี่",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/11/19Thai-Set-Individual_icon-siam_3-10-61-105.jpg",
      alt: "image-03",
      title: "ผัดไทยกุ้งสด",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/11%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B8%A5%E0%B8%B2%E0%B8%A2%E0%B9%80%E0%B8%AA%E0%B8%B7%E0%B8%AD%E0%B8%97%E0%B8%AD%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B9%80%E0%B8%97%E0%B8%B5%E0%B8%A2%E0%B8%A1%E0%B8%9E%E0%B8%A3%E0%B8%B4%E0%B8%81%E0%B9%84%E0%B8%97%E0%B8%A2--768x512.jpg",
      alt: "image-03",
      title: "กุ้งลายเสือทอดกระเทียมพริกไทย",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/1%E0%B9%81%E0%B8%81%E0%B8%87%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B8%AB%E0%B8%A7%E0%B8%B2%E0%B8%99%E0%B8%A5%E0%B8%B9%E0%B8%81%E0%B8%8A%E0%B8%B4%E0%B9%89%E0%B8%99%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B2%E0%B8%A2--768x512.jpg",
      alt: "image-03",
      title: "แกงเขียวหวานลูกชิ้นปลากราย",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/8%E0%B8%AB%E0%B8%A1%E0%B8%B9%E0%B8%97%E0%B8%AD%E0%B8%94%E0%B9%83%E0%B8%9A%E0%B8%A1%E0%B8%B0%E0%B8%81%E0%B8%A3%E0%B8%B9%E0%B8%94%E0%B8%81%E0%B8%A3%E0%B8%AD%E0%B8%9A--768x512.jpg",
      alt: "image-03",
      title: "หมูทอดใบมะกรูดกาอบ",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/6%E0%B8%AB%E0%B9%88%E0%B8%AD%E0%B8%AB%E0%B8%A1%E0%B8%81%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B9%83%E0%B8%9A%E0%B8%A2%E0%B8%AD--768x512.jpg",
      alt: "image-03",
      title: "ห่อหมกปลาใบยอ",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/5%E0%B8%9F%E0%B8%B4%E0%B9%80%E0%B8%A5%E0%B9%88%E0%B8%9B%E0%B8%A5%E0%B8%B2%E0%B8%81%E0%B8%A3%E0%B8%B0%E0%B8%9E%E0%B8%87%E0%B8%97%E0%B8%AD%E0%B8%94%E0%B8%A3%E0%B8%B2%E0%B8%94%E0%B8%AA%E0%B8%B2%E0%B8%A1%E0%B8%A3%E0%B8%AA--768x512.jpg",
      alt: "image-03",
      title: "ฟิเล่ปลากระพงทอดราดสามรส",
    },
    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/12/9%E0%B8%82%E0%B8%99%E0%B8%A1%E0%B8%88%E0%B8%B5%E0%B8%99%E0%B8%99%E0%B9%89%E0%B8%B3%E0%B8%9E%E0%B8%A3%E0%B8%B4%E0%B8%81-%E0%B8%81%E0%B8%B8%E0%B9%89%E0%B8%87%E0%B8%97%E0%B8%AD%E0%B8%94-%E0%B8%9C%E0%B8%B1%E0%B8%81%E0%B8%97%E0%B8%AD%E0%B8%94-%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B9%80%E0%B8%AB%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%94--768x512.jpg",
      alt: "image-03",
      title: "ขนมจีนน้ำพริก",
    },

    {
      src: "https://sawsamsaicatering.com/wp-content/uploads/2021/07/Premium-Cocktail-1.jpg",
      alt: "image-03",
      title: "ขนมไทย ต่างๆ",
    },
  ];

  return (
    <div
      className="relative min-w-fit h-96 rounded-t-xl text-center"
      style={{
        backgroundImage:
          "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/29Wedding_Premium-Thai-Table_De-Bua_Am_2-8-61-45.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content mx-auto">
        <div className="w-full p-4 text-center bg-red-900">
          <h1 className="text-3xl font-bold mb-4">รับจัดโต๊ะจีน งานเลี้ยง</h1>
          <p className="mb-6">
            รับจัดโต๊ะจีน การจัดงานเลี้ยงแบบ “โต๊ะจีน”
            รับจัดโต๊ะจีนนอกสถานที่เพื่อความสุขของท่าน
            โต๊ะจีนจัดเลี้ยงนอกสถานที่สามารถทำได้ทุกรูปแบบของงานจัดเลี้ยง
            ไม่ว่าจะเป็น งานทำบุญบ้าน งานแต่งงาน งานพิธีทางการ งานบวช
            งานเลี้ยงบริษัท งานปีใหม่ หรืองานตรุษจีน คุ้มค่า คุ้มราคา
          </p>
        </div>
      </div>

      <div className="hero-content text-center text-neutral-content">
        <div className="p-2 bg-white">
          <h1 className="text-2xl font-bold mb-2  text-red-900">
            {" "}
            รูปอาหารต่างๆ...การันตีความอร่อย
          </h1>
        </div>
      </div>
      <div className="max-w-[50rem] mx-auto">
        <Splide
          options={{
            rewind: true,
            autoplay: true,
            perPage: 3,
            perMove: 1,
            speed: 500,
            gap: "1rem",
            fucus: "conter",
            type: "loop",
            pagination: true,
          }}
          aria-ladel="slide images"
        >
          {imageArr.map((el, index) => (
            <SplideSlide>
              <div className="h-[220px] flex justify-between items-center flex-col">
                <img className="" src={el.src} alt={el.alt} />
                <p className="bg-slate-400 w-full text-center py-1">
                  {el.title}
                </p>
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className="hero-content text-center text-neutral-content">
        <div className="p-2 bg-white">
          <h1 className="text-2xl font-bold mb-2  text-red-900">
            รูปสถานที่ เเละ บรรยากาศภายในงาน
          </h1>
        </div>
      </div>
      <div className="flex justify-center space-x-1 p-1 ">
        <div className="relative w-64 h-44 overflow-hidden   ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2022/01/2022-01-09_0022-scaled.jpg)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-44 overflow-hidden ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/1494460304.1da0a1e22a8844a4e8ffc462272f755c.jpg)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-44 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2022/02/Chinese-Table_Ayutthaya_19-7-56-117-scaled.jpg)",
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center px-10 space-x-1 ">
        <div className="relative w-64 h-44 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/1494460309.46954e2ff395a625c47157e4b665b47c.jpg)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-44 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/1494986898.ca6b6217fb36a43a946484695175fef5.jpg.webp)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-44 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/Thai-Table.jpg.webp)",
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-center px-11 space-x-1 p-1 ">
        <div className="relative w-64 h-64 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2022/02/Wedding_Premium-Cocktail_Varavela_New_28-12-59-32-scaled.jpg)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-64 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2022/02/Wedding_Chinese-Table_Post-Office_Ying_17-8-61-110-scaled.jpg)",
            }}
          ></div>
        </div>
        <div className="relative w-64 h-64 overflow-hidden  ">
          <div
            className="w-full h-full bg-cover bg-center transition-transform duration-300 ease-in-out transform hover:scale-110"
            style={{
              backgroundImage:
                "url(https://sawsamsaicatering.com/wp-content/uploads/2022/02/Chinese-table_At-Lake_K-jaruwan-1-11-63-129-scaled.jpg)",
            }}
          ></div>
        </div>
      </div>
      <div className="flex justify-between bg-red-900 text-white p-8">
        <div>
          <h2 className="text-xl font-bold mb-2">FOLLOW US</h2>
          <div className="flex gap-8 items-center">
            {" "}
            {/* Flex container */}
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaInstagram size={30} /> {/* Instagram icon */}
              <span className="text-lg">: instagram</span> {/* Text */}
            </a>
          </div>
          <div className="flex gap-8 items-center mt-2">
            {" "}
            {/* Flex container */}
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <IoLogoFacebook size={30} /> {/* Facebook icon */}
              <span className="text-lg">: facebook</span> {/* Text */}
            </a>
          </div>
          <div className="flex gap-8 items-center mt-2">
            {" "}
            {/* Flex container */}
            <a
              href="https://www.google.com/search?q=line&oq=&gs_lcrp=EgZjaHJvbWUqCQgBECMYJxjqAjIJCAAQIxgnGOoCMgkIARAjGCcY6gIyCQgCECMYJxjqAjIJCAMQIxgnGOoCMgkIBBAjGCcY6gIyCQgFECMYJxjqAjIJCAYQIxgnGOoCMgkIBxAjGCcY6gLSAQkxNTMyajBqMTWoAgiwAgE&sourceid=chrome&ie=UTF-8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <FaLine size={30} /> {/* Line icon */}
              <span className="text-lg">: Line</span> {/* Text */}
            </a>
          </div>
          <div className="flex gap-8 items-center mt-2 ">
            {" "}
            {/* Flex container */}
            <a
              href="https://x.com/home?lang=th"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <ImTwitter size={30} /> {/* Twitter icon */}
              <span className="text-lg">: twitter</span> {/* Text */}
            </a>
          </div>
        </div>

        <div className="flex flex-col items-end">
          <div>
            <h2 className="text-xl font-bold mb-2">CONTACT</h2>
            <div className="flex items-center mb-2">
              <CiLocationOn size={20} />{" "}
              <span className="ml-2">SAWSAMSAI CATERING SERVICE</span>
            </div>
            <div className="flex items-center mb-2">
              <CiLocationOn size={20} />{" "}
              <span className="ml-2">
                บริษัท ซอสามสาย อาร์ติซัน แอนด์ เคเตอร์อิ้ง จำกัด
              </span>
            </div>
            <div className="flex items-center mb-2">
              <CiLocationOn size={20} />{" "}
              <span className="ml-2">
                25/1 ซอยอ่อนนุช 53 แขวงประเวศ เขตประเวศ กรุงเทพมหานคร 10250
              </span>
            </div>
            <div className="flex items-center mb-2">
              <BiPhoneCall size={20} />{" "}
              <span className="ml-2">
                โทร 02-321-3913 / 061-917-9000 / 081-974-9170
              </span>
            </div>
            <div className="flex items-center mb-2">
              <BsEnvelopeOpen size={20} />{" "}
              <span className="ml-2">อีเมล: tphrmmung@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
