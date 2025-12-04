import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddCampaign from "./AddCampaign";
import EditCampaign from "./EditCampaign";

const VendorCampaigns = () => {
  const { vendorId } = useParams();
  const [vendor, setVendor] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [showAddCampaign, setShowAddCampaign] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    fetchData();
  }, [vendorId]);

  const fetchData = async () => {
    setLoading(true);
    await Promise.all([fetchVendor(), fetchCampaigns()]);
    setLoading(false);
  };

  const fetchVendor = async () => {
    try {
      const response = await fetch(`https://winexch.blog/api/vendors/${vendorId}`);
      
      const data = await response.json();
      setVendor(data);
    } catch (error) {
      console.log("Error loading vendor:", error);
    }
  };

  const fetchCampaigns = async () => {
    try {
      const res = await fetch(
        `https://winexch.blog/api/campaigns/vendor/${vendorId}`
      );
      const data = await res.json();
      setCampaigns(data);
    } catch (err) {
      console.log("Failed to load campaigns", err);
    }
  };

  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.campaignName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    campaign.platform?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return "bg-blue-100 text-blue-700 border-blue-200";
    if (now > end) return "bg-gray-100 text-gray-700 border-gray-200";
    return "bg-green-100 text-green-700 border-green-200";
  };

  const handleEditClick = (campaign) => {
    setSelectedCampaign(campaign);
    setModalOpen(true);
  };

  const handleUpdate = async (updatedData) => {
    try {
      const response = await fetch(
        `https://winexch.blog/api/campaigns/${selectedCampaign._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (response.ok) {
        console.log("Campaign updated successfully");
        setModalOpen(false);
        fetchCampaigns(); // Refresh the campaigns list
      } else {
        console.error("Failed to update campaign");
      }
    } catch (error) {
      console.error("Error updating campaign:", error);
    }
  };

  const getStatusText = (startDate, endDate) => {
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (now < start) return "Upcoming";
    if (now > end) return "Completed";
    return "Active";
  };

  const displayValue = (value) => {
    if (!value) return <span className="text-gray-400 italic">Not provided</span>;
    return value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">

      {loading && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600 text-lg">Loading campaigns...</p>
          </div>
        </div>
      )}

      {!loading && !vendor && <p className="p-4">Vendor not found</p>}

      {!loading && vendor && (
        <>
          {/* HEADER */}
          <div className="bg-white border-b shadow-sm">
            <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <button
                  onClick={() => window.history.back()}
                  className="p-2 hover:bg-gray-100 rounded-lg transition"
                >
                  <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white text-2xl font-bold">
                  {vendor.name?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h1 className="text-3xl font-bold">{vendor.name}</h1>
                  <p className="text-gray-500 mt-1">Vendor ID: {vendor.vendorId}</p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-bold text-purple-600">{campaigns.length}</p>
                <p className="text-sm text-gray-500">Total Campaigns</p>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-8">

            {/* SEARCH + ADD BUTTON */}
            <div className="bg-white rounded-xl shadow-sm border p-4 mb-6 flex gap-4">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search campaigns..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 border rounded-lg"
                />
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0" />
                </svg>
              </div>

              <button
                onClick={() => {
                  setSelectedCampaign(null);
                  setShowAddCampaign(true);
                }}
                className="px-6 py-2.5 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                + Add Campaign
              </button>
            </div>

            {showAddCampaign && (
              <AddCampaign
                vendorId={vendor.vendorId}
                vendorName={vendor.name}
                existing={selectedCampaign}
                onClose={() => {
                  setShowAddCampaign(false);
                  fetchCampaigns();
                }}
              />
            )}

            {/* CAMPAIGN CARDS */}
            {filteredCampaigns.length > 0 ? (
              <div className="space-y-4">
                {filteredCampaigns.map((campaign) => (
                  <div key={campaign._id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition">

                    {/* HEADER */}
                    <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-4 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="text-xl font-bold">{campaign.campaignName}</h3>
                          <p className="text-purple-100 text-sm">ID: {campaign.campaignId}</p>
                        </div>

                        <div className="flex gap-2">
                          {campaign.kpiAchieved && (
                            <span className={`px-3 py-1 rounded-full text-sm ${
                              campaign.kpiAchieved.toLowerCase() === 'yes'
                                ? 'bg-green-500'
                                : 'bg-red-500'
                            }`}>
                              KPI: {campaign.kpiAchieved}
                            </span>
                          )}

                          <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(campaign.startDate, campaign.endDate)}`}>
                            {getStatusText(campaign.startDate, campaign.endDate)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="p-6 space-y-6">

                      {/* FIRST ROW */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Platform & Brand */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Platform & Brand</p>
                          <p className="font-medium">{displayValue(campaign.platform)}</p>
                          <p className="font-medium">{displayValue(campaign.brand)}</p>
                        </div>

                        {/* Budget & Duration */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Budget & Duration</p>
                          <p className="font-medium">
                            {campaign.budget ? `₹${parseFloat(campaign.budget).toLocaleString()}` : displayValue(campaign.budget)}
                          </p>
                          <p className="font-medium">{displayValue(campaign.duration)}</p>
                        </div>

                        {/* Dates */}
                        <div>
                          <p className="text-xs font-medium text-gray-500 uppercase mb-2">Timeline</p>
                          <p>{campaign.startDate ? new Date(campaign.startDate).toLocaleDateString() : displayValue(campaign.startDate)}</p>
                          <p>{campaign.endDate ? new Date(campaign.endDate).toLocaleDateString() : displayValue(campaign.endDate)}</p>
                        </div>
                      </div>

                      {/* SECOND ROW */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">

                        <div className="space-y-2">
                          <p><span className="text-gray-600">Handler:</span> {displayValue(campaign.handler)}</p>
                          <p><span className="text-gray-600">KPI:</span> {displayValue(campaign.kpi)}</p>
                          <p><span className="text-gray-600">Btag:</span> {displayValue(campaign.btag)}</p>
                        </div>

                        <div className="space-y-2">
                          <p><span className="text-gray-600">Btag Login:</span> {displayValue(campaign.btagLogin)}</p>
                          <p><span className="text-gray-600">Btag Password:</span> {displayValue(campaign.btagPassword)}</p>
                          <p><span className="text-gray-600">Bank Details:</span> {displayValue(campaign.bankDetails)}</p>
                        </div>
                      </div>

                      {/* LINKS SECTION */}
                      {campaign.campaignLinks?.length > 0 && (
                        <div className="p-4 bg-blue-50 rounded-lg border">
                          <p className="font-medium text-gray-700 mb-2">Campaign Links</p>

                          <div className="space-y-2">
                            {campaign.campaignLinks.map((link, index) => (
                              <div key={index} className="bg-white p-2 rounded flex justify-between items-center">
                                <span className="font-medium text-gray-700">
                                  {link.heading || `Link ${index + 1}`}
                                </span>

                                <a
                                  href={link.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 underline hover:text-blue-800"
                                >
                                  Open Link
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* EDIT BUTTON */}
                      <div className="flex justify-end pt-4 border-t">
                        <button
                          onClick={() => handleEditClick(campaign)}
                          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                          Edit Campaign
                        </button>
                        <EditCampaign
  isOpen={modalOpen}
  onClose={() => setModalOpen(false)}
  campaign={selectedCampaign}
  onSubmit={handleUpdate}
/>
                      </div>

                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg">No campaigns found</p>
                {searchTerm && (
                  <p className="text-gray-400 text-sm mt-2">Try adjusting your search</p>
                )}
              </div>
            )}
          </div>
        </>
      )}

     
    </div>
  );
};

export default VendorCampaigns;