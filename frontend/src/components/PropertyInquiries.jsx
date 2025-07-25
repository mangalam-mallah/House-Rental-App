// src/components/PropertyInquiries.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const PropertyInquiries = ({ propertyId }) => {
  const [inquiries, setInquiries] = useState([]);
  const [show, setShow] = useState(false);

  const fetchInquiries = async () => {
    try {
      const res = await axios.get(`/api/inquiries/${propertyId}`);
      setInquiries(res.data.inquries);
    } catch (err) {
      console.error("Error fetching inquiries", err);
    }
  };

  const toggleInquiries = () => {
    if (!show) fetchInquiries(); // fetch only when showing
    setShow(!show);
  };

  return (
    <div className="mt-2">
      <button
        onClick={toggleInquiries}
        className="text-sm text-blue-600 hover:underline"
      >
        {show ? "Hide Inquiries" : "View Inquiries"}
      </button>

      {show && (
        <div className="mt-2 bg-gray-100 p-2 rounded">
          {inquiries.length === 0 ? (
            <p className="text-sm text-gray-500">No inquiries found.</p>
          ) : (
            <ul className="space-y-2">
              {inquiries.map((inq) => (
                <li key={inq._id} className="text-sm bg-white p-2 rounded shadow">
                  <p><strong>Name:</strong> {inq.name}</p>
                  <p><strong>Email:</strong> {inq.email}</p>
                  <p><strong>Message:</strong> {inq.message}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default PropertyInquiries;
