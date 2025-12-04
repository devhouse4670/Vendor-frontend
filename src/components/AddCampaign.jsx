import { useState } from "react";
import axios from "axios";

const AddCampaign = ({ vendorId, vendorName, onClose }) => {
  const [form, setForm] = useState({
    campaignId: "",
    campaignName: "",
    platform: "",
    brand: "",
    handler: "",
    kpi: "",
    kpiAchieved: "no",
    btag: "",
    btagLogin: "",
    btagPassword: "",
    budget: "",
    duration: "",
    startDate: "",
    endDate: "",
    bankDetails: "",
    msg: "",
    extra: "",
    payments: [{ date: "", amount: "" }],
    campaignLinks: [{ heading: "", url: "" }]
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addPaymentRow = () => {
    setForm({
      ...form,
      payments: [...form.payments, { date: "", amount: "" }]
    });
  };

  const removePaymentRow = (index) => {
    const updated = form.payments.filter((_, i) => i !== index);
    setForm({ ...form, payments: updated });
  };

  const handlePaymentChange = (index, field, value) => {
    const updated = [...form.payments];
    updated[index][field] = value;
    setForm({ ...form, payments: updated });
  };

  const addLinkRow = () => {
    setForm({
      ...form,
      campaignLinks: [...form.campaignLinks, { heading: "", url: "" }]
    });
  };

  const removeLinkRow = (index) => {
    const updated = form.campaignLinks.filter((_, i) => i !== index);
    setForm({ ...form, campaignLinks: updated });
  };

  const handleLinkChange = (index, field, value) => {
    const updated = [...form.campaignLinks];
    updated[index][field] = value;
    setForm({ ...form, campaignLinks: updated });
  };

  const saveCampaign = async () => {
    // Validation
    if (!form.campaignName.trim()) {
      alert("Campaign Name is required!");
      return;
    }

    if (!form.campaignId.trim()) {
      alert("Campaign ID is required!");
      return;
    }

    try {
      setLoading(true);

      // Filter out empty payment rows
      const validPayments = form.payments.filter(
        p => p.date && p.amount
      );

      // Filter out empty link rows
      const validLinks = form.campaignLinks.filter(
        link => link.heading && link.url
      );

      const campaignData = {
        ...form,
        vendorId,
        payments: validPayments,
        campaignLinks: validLinks
      };

      const res = await axios.post(
        "http://localhost:5000/api/campaigns",
        campaignData
      );

      alert("Campaign Created Successfully!");
      onClose();
    } catch (err) {
      console.error("Error creating campaign:", err);
      
      if (err.response?.data?.message) {
        alert(`Error: ${err.response.data.message}`);
      } else {
        alert("Error Creating Campaign. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl w-[700px] overflow-y-scroll max-h-[90vh] shadow-2xl">
        <div className="sticky top-0 bg-white pb-4 border-b mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Add Campaign for {vendorName}
          </h2>
        </div>

        {/* Basic Info */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Campaign ID <span className="text-red-500">*</span>
            </label>
            <input
              name="campaignId"
              placeholder="e.g., CAMP-001"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={handleChange}
              value={form.campaignId}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Campaign Name <span className="text-red-500">*</span>
            </label>
            <input
              name="campaignName"
              placeholder="Campaign Name"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={handleChange}
              value={form.campaignName}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Platform</label>
              <input
                name="platform"
                placeholder="Platform"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.platform}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Brand</label>
              <input
                name="brand"
                placeholder="Brand"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.brand}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Handler</label>
              <input
                name="handler"
                placeholder="Handler"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.handler}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">KPI</label>
              <input
                name="kpi"
                placeholder="KPI"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.kpi}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">KPI Achieved</label>
            <select
              name="kpiAchieved"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              onChange={handleChange}
              value={form.kpiAchieved}
            >
              <option value="no">No</option>
              <option value="yes">Yes</option>
            </select>
          </div>

          {/* B-Tag Section */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-700 mb-3">B-Tag Details</h3>
            <div className="space-y-3">
              <input
                name="btag"
                placeholder="B-Tag"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.btag}
              />

              <input
                name="btagLogin"
                placeholder="B-Tag Login ID"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.btagLogin}
              />

              <input
                name="btagPassword"
                placeholder="B-Tag Login Password"
                type="password"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.btagPassword}
              />
            </div>
          </div>

          {/* Budget & Duration */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Budget</label>
              <input
                name="budget"
                type="number"
                placeholder="Budget"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.budget}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
              <input
                name="duration"
                placeholder="e.g., 3 months"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.duration}
              />
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                name="startDate"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.startDate}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                name="endDate"
                className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                onChange={handleChange}
                value={form.endDate}
              />
            </div>
          </div>

          {/* Bank Details */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Bank Account Details</label>
            <textarea
              name="bankDetails"
              placeholder="Bank Account Details"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="3"
              onChange={handleChange}
              value={form.bankDetails}
            />
          </div>

          {/* Extra Messages */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Message</label>
            <textarea
              name="msg"
              placeholder="Extra Message"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="2"
              onChange={handleChange}
              value={form.msg}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Extra Notes</label>
            <textarea
              name="extra"
              placeholder="Extra Notes"
              className="border border-gray-300 p-2.5 w-full rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              rows="2"
              onChange={handleChange}
              value={form.extra}
            />
          </div>

          {/* Links Section */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-700 mb-3">Links (Drive / Sheet)</h3>

            {form.campaignLinks.map((link, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  placeholder="Heading"
                  className="border border-gray-300 p-2.5 flex-1 rounded-lg"
                  value={link.heading}
                  onChange={(e) => handleLinkChange(i, "heading", e.target.value)}
                />
                <input
                  placeholder="URL"
                  className="border border-gray-300 p-2.5 flex-1 rounded-lg"
                  value={link.url}
                  onChange={(e) => handleLinkChange(i, "url", e.target.value)}
                />
                {form.campaignLinks.length > 1 && (
                  <button
                    onClick={() => removeLinkRow(i)}
                    className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addLinkRow}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              + Add Link
            </button>
          </div>

          {/* Payment Section */}
          <div className="border-t pt-4 mt-4">
            <h3 className="font-bold text-gray-700 mb-3">Payment Schedule</h3>

            {form.payments.map((p, i) => (
              <div key={i} className="flex gap-2 mb-2">
                <input
                  type="date"
                  className="border border-gray-300 p-2.5 flex-1 rounded-lg"
                  value={p.date}
                  onChange={(e) => handlePaymentChange(i, "date", e.target.value)}
                />

                <input
                  type="number"
                  placeholder="Amount"
                  className="border border-gray-300 p-2.5 flex-1 rounded-lg"
                  value={p.amount}
                  onChange={(e) => handlePaymentChange(i, "amount", e.target.value)}
                />

                {form.payments.length > 1 && (
                  <button
                    onClick={() => removePaymentRow(i)}
                    className="bg-red-500 text-white px-3 rounded-lg hover:bg-red-600"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addPaymentRow}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              + Add Payment
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between mt-6 pt-4 border-t sticky bottom-0 bg-white">
          <button
            className="bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 transition"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            className="bg-green-600 text-white px-6 py-2.5 rounded-lg hover:bg-green-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
            onClick={saveCampaign}
            disabled={loading}
          >
            {loading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
            )}
            {loading ? "Saving..." : "Save Campaign"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddCampaign;