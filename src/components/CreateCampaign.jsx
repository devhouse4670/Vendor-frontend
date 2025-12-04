import React, { useState, useEffect } from "react";

const CreateCampaign = ({ vendorId, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const [campaign, setCampaign] = useState({
    campaignId: "",
    vendorId: vendorId || "",
    title: "",
    startDate: "",
    endDate: "",
    budget: "",
    status: "Active",
  });

  
  // Generate Campaign ID
  const generateCampaignId = () => {
    return "CAMP-" + Math.floor(1000 + Math.random() * 9000);
  };

  useEffect(() => {
    setCampaign((prev) => ({
      ...prev,
      vendorId,
      campaignId: generateCampaignId(),
    }));
  }, [vendorId]);


  

  const handleChange = (e) => {
    setCampaign({ ...campaign, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!campaign.vendorId) {
      setMsg({ text: "Vendor ID missing!", type: "error" });
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/data/campaigns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(campaign),
      });

      const result = await res.json();

      if (res.ok) {
        setMsg({ text: "Campaign added successfully!", type: "success" });

        setTimeout(() => {
          onClose(); // Close popup
        }, 1000);
      } else {
        setMsg({ text: result.message || "Error adding campaign", type: "error" });
      }
    } catch (error) {
      setMsg({ text: error.message, type: "error" });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md max-w-xl mx-auto mt-10 border">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Add Campaign</h2>

        <button
          onClick={onClose}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
        >
          Close
        </button>
      </div>

      {/* Message */}
      {msg.text && (
        <div
          className={`p-3 mb-3 rounded-lg ${
            msg.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {msg.text}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Campaign ID */}
        <div>
          <label className="text-gray-700 font-medium">Campaign ID</label>
          <input
            type="text"
            value={campaign.campaignId}
            readOnly
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        {/* Title */}
        <div>
          <label className="text-gray-700 font-medium">Campaign Title</label>
          <input
            type="text"
            name="title"
            value={campaign.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
            placeholder="Enter campaign title"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-gray-700 font-medium">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={campaign.startDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium">End Date</label>
            <input
              type="date"
              name="endDate"
              value={campaign.endDate}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        {/* Budget */}
        <div>
          <label className="text-gray-700 font-medium">Budget</label>
          <input
            type="number"
            name="budget"
            value={campaign.budget}
            onChange={handleChange}
            required
            placeholder="Enter budget amount"
            className="w-full p-2 border rounded"
          />
        </div>

        {/* Status */}
        <div>
          <label className="text-gray-700 font-medium">Status</label>
          <select
            name="status"
            value={campaign.status}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="Active">Active</option>
            <option value="Paused">Paused</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
        >
          {loading ? "Adding..." : "Create Campaign"}
        </button>
      </form>
    </div>
  );
};

export default CreateCampaign;
