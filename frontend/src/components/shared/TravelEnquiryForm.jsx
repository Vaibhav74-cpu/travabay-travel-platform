import { useState } from "react";

function EnquiryForm({ package: pkg, onClose }) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    message: pkg.title, // Pre-fill with package name
    whatsapp: false,
    additionalDetails: ""
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    onClose();
  };

  return (
    <div className="p-5">
      {/* Header */}
      <div className="mb-6 pt-4">
        <h4 className="text-xs text-gray-400 text-left mb-1">TRAVABAY HOLIDAYS</h4>
        <h2 className="text-xl font-bold text-gray-900 text-left">Quick Enquiry</h2>
        <p className="text-sm text-gray-600 mt-1 text-left">
          Share your details and we'll send the best itinerary on WhatsApp and email.
        </p>
        <hr className='mt-4' />
      </div>

      {/* Package Details Summary */}
      <div className="bg-gray-50 rounded-lg mb-6 text-left">
        <h3 className="font-bold text-gray-900 text-sm mb-1">{pkg.title}</h3>
        <div className="flex gap-3 text-xs text-gray-600">
          <span>{pkg.days}</span>
          <span>• {pkg.destinations} Destinations</span>
          <span>• ₹{typeof pkg.price === 'string' ? pkg.price : pkg.price.toLocaleString()}</span>
        </div>
      </div>
      <hr className='mb-4' />

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Full Name*"
            required
            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Phone with country code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <div className="flex gap-2">
            <select className="w-20 px-2 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400">
              <option>IN +91 India</option>
              <option>Af +93 Afghanistan</option>
              <option>VN +94 Vietnam</option>
              <option>UK +44 United Kingdom</option>
              <option>UK +380 Ukraine</option>
              <option>TR +90 Turkey</option>
              <option>TH +66 Thailand</option>
              <option>CH +1 Switzerland</option>
            </select>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number*"
              required
              className="flex-1 px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email ID"
            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* Package Message */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1"></label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="3"
            className="w-full px-3 py-2 border text-sm border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        {/* WhatsApp Checkbox */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="whatsapp"
            checked={formData.whatsapp}
            onChange={handleChange}
            id="whatsapp"
            className="w-3 h-3"
          />
          <label htmlFor="whatsapp" className="text-xs text-gray-700">
            Receive itinerary on <span className="text-green-600 font-medium">WhatsApp</span>
          </label>
        </div>

        {/* Additional Details */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Additional Details
          </label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="Would you like to share more info? It will help us curate the best tours for you."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-yellow-300 hover:bg-yellow-500 text-black text-sm py-2 rounded-full transition-colors mt-6" >
          Submit Enquiry
        </button>
      </form>
    </div>
  );
}

export default EnquiryForm;