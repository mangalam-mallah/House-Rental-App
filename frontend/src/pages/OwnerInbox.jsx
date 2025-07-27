import { useEffect, useState } from "react";
import {
  getAllOwnerInquiries,
  approveInquiry,
  rejectInquiry,
} from "../services/inquiryService.js";
import { toast } from "react-toastify";

const OwnerInbox = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const data = await getAllOwnerInquiries();
        console.log("Fetched inquiries:", data.inquiries);
        setInquiries(data.inquiries);
      } catch (error) {
        console.error("Error while fetching inquiry");
      } finally {
        setLoading(false);
      }
    };

    fetchInquiries();
  }, []);

  const handleApprove = async (id) => {
    try {
      await approveInquiry(id);
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id ? { ...inq, status: "approved" } : inq
        )
      );
      toast.success("Inquiry approved");
    } catch (err) {
      toast.error("Failed to approve inquiry");
    }
  };

  const handleReject = async (id) => {
    try {
      await rejectInquiry(id);
      setInquiries((prev) =>
        prev.map((inq) =>
          inq._id === id ? { ...inq, status: "rejected" } : inq
        )
      );
      toast.success("Inquiry rejected");
    } catch (err) {
      toast.error("Failed to reject inquiry");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8 px-4 sm:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Your Inquiry Inbox
          </h2>
          <p className="text-gray-600">Manage property inquiries from potential renters</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Loading inquiries...</p>
            </div>
          </div>
        ) : inquiries.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No inquiries yet</h3>
            <p className="text-gray-600">You haven't received any inquiries from potential renters.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {inquiries.map((inq) => (
              <div
                key={inq._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">
                        {inq.propertyId?.title || "Unknown Property"}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        inq.status === "approved"
                          ? "bg-green-100 text-green-800"
                          : inq.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {inq.status.charAt(0).toUpperCase() + inq.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>Received on {new Date(inq.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-4 mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{inq.renterId?.name}</p>
                      <p className="text-gray-600 text-sm">{inq.renterId?.email}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h4 className="text-sm font-semibold text-gray-700 mb-2">Message:</h4>
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-gray-800 leading-relaxed">{inq.message}</p>
                  </div>
                </div>

                {inq.status === "pending" && (
                  <div className="flex gap-3 pt-4 border-t border-gray-200">
                    <button
                      onClick={() => handleApprove(inq._id)}
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(inq._id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>
                  </div>
                )}

                {inq.status !== "pending" && (
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      This inquiry has been {inq.status}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OwnerInbox;