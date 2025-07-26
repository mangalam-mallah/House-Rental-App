import { useEffect, useState } from "react";
import axios from "axios";

const OwnerInbox = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token"); // Adjust this if using context

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const res = await axios.get("/api/inquiries/owner", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setInquiries(res.data.inquiries || []); // Ensure correct field
      } catch (error) {
        console.error("Failed to fetch inquiries", error);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchInquiries();
    }
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-indigo-700">
          📬 Your Inquiry Inbox
        </h2>

        {loading ? (
          <div className="text-center text-gray-600">Loading inquiries...</div>
        ) : inquiries.length === 0 ? (
          <div className="text-center text-gray-500 text-lg">
            You haven’t received any inquiries yet.
          </div>
        ) : (
          <div className="grid gap-6">
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                className="bg-white rounded-xl shadow-md p-6 border border-gray-200 hover:shadow-lg transition"
              >
                <div className="mb-2 text-sm text-gray-500">
                  Sent on {new Date(inq.timestamp).toLocaleString()}
                </div>
                <h3 className="text-xl font-semibold text-indigo-600 mb-1">
                  Property: {inq.propertyId?.title || "Unknown"}
                </h3>
                <p className="text-gray-800 mb-3">{inq.message}</p>
                <div className="text-sm text-gray-600">
                  <span className="font-medium">From:</span>{" "}
                  {inq.senderId?.name} ({inq.senderId?.email})
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerInbox;
