import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPropertyById, updateProperty } from "../services/propertyService";
import { toast } from "react-toastify";
import { createInquiry } from "../services/inquiryService";
import { useAuth } from "../context/AuthContext";

const PropertyDetailsPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [property, setProperty] = useState(null);
  const [inquiryMessage, setInquiryMessage] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    rent: "",
    description: "",
    bathroom: "",
    bedroom: "",
    image: null,
  });

  const [loading, setLoading] = useState(true);
  const wantsEdit = new URLSearchParams(location.search).get("edit") === "true";
  const isOwner = property?.ownerId?._id === user?._id;
  const isEditMode = wantsEdit && isOwner;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPropertyById(id);
        setProperty(data);
        setFormData({
          title: data.title,
          location: data.location,
          rent: data.rent,
          description: data.description,
          bedroom: data.bedroom,
          bathroom: data.bathroom,
          image: null,
        });
      } catch (err) {
        toast.error("Failed to load property.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  useEffect(() => {
    if (wantsEdit && !isOwner && !loading) {
      navigate(`/property/${id}`);
    }
  }, [wantsEdit, isOwner, loading, navigate, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleUpdate = async () => {
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    try {
      await updateProperty(id, data);
      toast.success("✅ Property updated!");
      navigate(`/property/${id}`);
    } catch (err) {
      console.error(err);
      toast.error("❌ Update failed.");
    }
  };

  const handleSendInquiry = async () => {
    if (!inquiryMessage.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    try {
      await createInquiry({
        propertyId: id,
        message: inquiryMessage,
      });
      toast.success("Inquiry sent successfully!");
      setInquiryMessage("");
    } catch (error) {
      console.error("Failed to send inquiry:", error);
      toast.error("Failed to send inquiry.");
    }
  };

  if (loading) {
    return <div className="p-10 text-center">Loading...</div>;
  }

  if (!property) {
    return <div className="p-10 text-center">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span>Properties</span>
            <span className="mx-2">›</span>
            <span className="text-purple-600 font-medium">
              {isEditMode ? "Edit Property" : "Property Details"}
            </span>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {isEditMode ? (
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Property</h1>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
                    <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                  </div>
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Rent (per month)</label>
                    <input type="number" name="rent" value={formData.rent} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                  </div>
                   <div className="grid grid-cols-2 gap-4">
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2">Bedrooms</label>
                       <input type="number" name="bedroom" value={formData.bedroom} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                     </div>
                     <div>
                       <label className="block text-sm font-semibold text-gray-700 mb-2">Bathrooms</label>
                       <input type="number" name="bathroom" value={formData.bathroom} onChange={handleChange} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                     </div>
                   </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} rows={5} className="w-full border-2 border-gray-200 rounded-xl p-3 focus:border-purple-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Update Image (Optional)</label>
                    <input type="file" name="image" onChange={handleFileChange} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"/>
                  </div>
                  <div className="flex justify-end gap-4 pt-4">
                    <button onClick={() => navigate(`/property/${id}`)} className="bg-gray-200 text-gray-800 py-3 px-6 rounded-xl font-semibold hover:bg-gray-300 transition">
                      Cancel
                    </button>
                    <button onClick={handleUpdate} className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="relative group mb-6">
                  <div className="aspect-[16/10] w-full bg-gradient-to-r from-gray-100 to-gray-200 rounded-2xl overflow-hidden shadow-2xl">
                    <img src={property.image} alt={property.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">Featured Property</span>
                  </div>
                </div>
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="flex items-start justify-between mb-6">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
                      <div className="flex items-center text-gray-600 mb-4">
                        <svg className="w-5 h-5 mr-2 text-purple-600" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                        <span className="text-lg">{property.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-3 rounded-xl shadow-lg">
                        <span className="text-2xl font-bold">₹{property.rent}</span>
                        <span className="text-sm opacity-90 block">per month</span>
                      </div>
                    </div>
                  </div>
                  <div className="mb-8">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Description</h3>
                    <p className="text-gray-700 leading-relaxed text-lg italic bg-gray-50 p-4 rounded-xl border-l-4 border-purple-500">"{property.description}"</p>
                  </div>
                <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Property Features
                  </h3>

                  <div className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 21l4-4 4 4"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bedrooms</p>
                      <p className="text-blue-600 font-bold text-lg">
                        {property.bedroom || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                    <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 2.5L12 2l1.5.5L15 2l1.5.5L18 2v4l-1.5.5L15 6l-1.5.5L12 6l-1.5.5L9 6l-1.5.5L6 6V2l1.5.5L9 2l1.5.5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Bathrooms</p>
                      <p className="text-purple-600 font-bold text-lg">
                        {property.bathroom || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Additional Info
                  </h3>

                  <div className="flex items-center p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-100">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mr-4">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        Monthly Rent
                      </p>
                      <p className="text-green-600 font-bold text-lg">
                        ₹{property.rent || "Not specified"}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-100">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                        <svg
                          className="w-6 h-6 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          Property Type
                        </p>
                        <p className="text-amber-600 font-bold">Residential</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                </div>
              </>
            )}
          </div>

          {!isEditMode && (
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4"><svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg></div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Interested?</h3>
                    <p className="text-gray-600">Send an inquiry to the owner</p>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">Your Message</label>
                      <textarea placeholder="Hi, I'm interested in this property..." value={inquiryMessage} onChange={(e) => setInquiryMessage(e.target.value)} rows={5} className="w-full border-2 border-gray-200 rounded-xl p-4 focus:border-purple-500 transition"/>
                    </div>
                    <button onClick={handleSendInquiry} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition flex items-center justify-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                      <span>Send Inquiry</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsPage;