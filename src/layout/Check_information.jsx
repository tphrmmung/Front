import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Check_information() {
  const[ Check_information , setCheck_information] = useState([])


  useEffect(() => {
    const fetchCheck_information = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8889/admin/Check_information', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCheck_information(response.data.booking);
      } catch (error) {
        console.error('Error fetching Check_information:', error);
      }
    };

    fetchCheck_information();
  }, []);
  
  return (
    <form
      className="flex flex-col min-w-[600px] border rounded w-5 mx-auto p-4 gap-6 "
      onSubmit={Check_information}
    >
      
      <Link to="/#" className="btn btn-outline btn-info">จอง</Link>
    </form>
      )
}