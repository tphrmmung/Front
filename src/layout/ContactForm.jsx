import { faEnvelopeOpen } from "@fortawesome/free-regular-svg-icons";
import {
  faLocationDot,
  faPhoneVolume,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaInstagram } from "react-icons/fa";
import { IoLogoFacebook } from "react-icons/io";
import { FaLine } from "react-icons/fa6";
import { ImTwitter } from "react-icons/im";
import { BiPhoneCall } from "react-icons/bi";
import { CiLocationOn } from "react-icons/ci";
import { BsEnvelopeOpen } from "react-icons/bs";

export default function ContactForm() {
  const [ContactForm, setContactForm] = useState([]);
  const navigate = useNavigate();

  return (
    <div
      className="relative min-w-fit h-80 object-cover rounded-t-xl"
      style={{
        backgroundImage:
          "url(https://sawsamsaicatering.com/wp-content/uploads/2021/07/Wedding-Premium-Thai-Table-4.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="hero-overlay bg-opacity-30"></div>
      <div className="hero-content text-center text-neutral-content"></div>
      <div className="p-4 text-center">
        <h2 className="text-2xl font-bold mb-2">ติดต่อบริการจัดเลี้ยง</h2>
        <p className="mb-4 text-lg text-[#dcb079]">tphrmmung@gmail.com</p>
        <div className="flex justify-center space-x-4">
          <button
            className="bg-green-500 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              (window.location.href = "https://line.me/ti/p/~yourlineid")
            }
          >
            ADD LINE
          </button>
          <button
            className="bg-[#dcb079] text-white font-bold py-2 px-4 rounded"
            onClick={() => (window.location.href = "tel:+0986201506")}
          >
            โทรสอบถามข้อมูล
          </button>
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
