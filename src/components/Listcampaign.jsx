import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function AddCampaigns() {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/campaigns")
      .then((res) => setCampaigns(res.data))
      .catch((err) => console.error(err));
  }, []);

  const deleteCampaign = (id) => {
    axios
      .delete(`http://localhost:5000/api/campaigns/${id}`)
      .then(() => setCampaigns(campaigns.filter((c) => c._id !== id)))
      .catch((err) => console.error(err));
  };

  return (
  
      <div className="bg-white shadow-md rounded-xl p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-semibold text-gray-800">
            Campaign List
          </h2>

          <Link
            to="/campaign/add"
            className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            + Add New Campaign
          </Link>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-900 text-white">
              <tr>
                <th className="p-3 text-left">Title</th>
                <th className="p-3 text-left">Client</th>
                <th className="p-3 text-left">Budget</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {campaigns.length === 0 ? (
                <tr>
                  <td
                    colSpan="5"
                    className="text-center p-5 text-gray-500 italic"
                  >
                    No campaigns found.
                  </td>
                </tr>
              ) : (
                campaigns.map((c) => (
                  <tr
                    key={c._id}
                    className="border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{c.title}</td>
                    <td className="p-3">{c.clientName}</td>
                    <td className="p-3">₹{c.budget}</td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-white text-sm ${
                          c.status === "Active"
                            ? "bg-green-600"
                            : c.status === "Pending"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="p-3 text-center flex gap-3 justify-center">
                      <Link
                        to={`/campaign/edit/${c._id}`}
                        className="px-4 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => deleteCampaign(c._id)}
                        className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    
  );
}

export default AddCampaigns;
