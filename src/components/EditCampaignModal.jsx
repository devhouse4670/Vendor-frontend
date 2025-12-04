import React, { useEffect, useState } from "react";
import axios from "axios";

const EditCampaignModal = ({ campaignId }) => {
  const [form, setForm] = useState({
    vendorId: "",
    campaignName: "",
    platform: "",
    brand: "",
    handler: "",
    kpi: "",
    kpiAchieved: "",
    btag: "",
    btagLogin: "",
    btagPassword: "",
    budget: "",
    duration: "",
    startDate: "",
    endDate: "",
    bankDetails: "",
    uploadDoc: "",
    utr: "",
    msg: "",
    extra: "",
    extraMsg: "",
    campaignLinks: [],
    payments: [],
  });

  // Fetch Data
  useEffect(() => {
    axios.get(`http://localhost:5000/api/data/vendors/${vendor._id}`).then((res) => {
      setForm(res.data);
    });
  }, [campaignId]);

  // Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add Link
  const addLink = () => {
    setForm({
      ...form,
      campaignLinks: [...form.campaignLinks, { heading: "", url: "" }],
    });
  };

  // Update Link
  const updateLink = (index, key, value) => {
    const updated = [...form.campaignLinks];
    updated[index][key] = value;
    setForm({ ...form, campaignLinks: updated });
  };

  // Remove Link
  const removeLink = (index) => {
    const updated = [...form.campaignLinks];
    updated.splice(index, 1);
    setForm({ ...form, campaignLinks: updated });
  };

  // Add Payment
  const addPayment = () => {
    setForm({
      ...form,
      payments: [...form.payments, { date: "", amount: "" }],
    });
  };

  // Update Payment
  const updatePayment = (index, key, value) => {
    const updated = [...form.payments];
    updated[index][key] = value;
    setForm({ ...form, payments: updated });
  };

  // Remove Payment
  const removePayment = (index) => {
    const updated = [...form.payments];
    updated.splice(index, 1);
    setForm({ ...form, payments: updated });
  };

  // Submit Update
  const submitForm = async () => {
    try {
      await axios.put(`http://localhost:5000/api/campaign/${campaignId}`, form)
;
      alert("Campaign Updated Successfully!");
    } catch (error) {
      console.log(error);
      alert("Error updating campaign");
    }
  };

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <h2>Edit Campaign</h2>

      {/* Basic Fields */}
      <input type="text" name="vendorId" value={form.vendorId} onChange={handleChange} placeholder="Vendor ID" />
      <input type="text" name="campaignName" value={form.campaignName} onChange={handleChange} placeholder="Campaign Name" />
      <input type="text" name="platform" value={form.platform} onChange={handleChange} placeholder="Platform" />
      <input type="text" name="brand" value={form.brand} onChange={handleChange} placeholder="Brand" />
      <input type="text" name="handler" value={form.handler} onChange={handleChange} placeholder="Handler" />
      <input type="text" name="kpi" value={form.kpi} onChange={handleChange} placeholder="KPI" />
      
      {/* Dropdown yes/no */}
      <select name="kpiAchieved" value={form.kpiAchieved} onChange={handleChange}>
        <option value="">KPI Achieved?</option>
        <option value="yes">Yes</option>
        <option value="no">No</option>
      </select>

      <input type="text" name="btag" value={form.btag} onChange={handleChange} placeholder="BTAG" />
      <input type="text" name="btagLogin" value={form.btagLogin} onChange={handleChange} placeholder="BTAG Login" />
      <input type="text" name="btagPassword" value={form.btagPassword} onChange={handleChange} placeholder="BTAG Password" />

      <input type="number" name="budget" value={form.budget} onChange={handleChange} placeholder="Budget" />

      <input type="text" name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" />
      <input type="date" name="startDate" value={form.startDate} onChange={handleChange} />
      <input type="date" name="endDate" value={form.endDate} onChange={handleChange} />

      <textarea name="bankDetails" value={form.bankDetails} onChange={handleChange} placeholder="Bank Details" />

      <input type="text" name="uploadDoc" value={form.uploadDoc} onChange={handleChange} placeholder="Upload Doc Link" />
      <input type="text" name="utr" value={form.utr} onChange={handleChange} placeholder="UTR" />
      <input type="text" name="msg" value={form.msg} onChange={handleChange} placeholder="Message" />
      <input type="text" name="extra" value={form.extra} onChange={handleChange} placeholder="Extra" />
      <input type="text" name="extraMsg" value={form.extraMsg} onChange={handleChange} placeholder="Extra Message" />

      <hr />

      {/* Campaign Links Section */}
      <h3>Campaign Links</h3>
      {form.campaignLinks.map((link, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            type="text"
            value={link.heading}
            onChange={(e) => updateLink(i, "heading", e.target.value)}
            placeholder="Heading"
          />
          <input
            type="text"
            value={link.url}
            onChange={(e) => updateLink(i, "url", e.target.value)}
            placeholder="URL"
          />
          <button onClick={() => removeLink(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addLink}>+ Add Link</button>

      <hr />

      {/* Payments Section */}
      <h3>Payments</h3>
      {form.payments.map((p, i) => (
        <div key={i} style={{ marginBottom: 10 }}>
          <input
            type="date"
            value={p.date}
            onChange={(e) => updatePayment(i, "date", e.target.value)}
          />
          <input
            type="number"
            value={p.amount}
            onChange={(e) => updatePayment(i, "amount", e.target.value)}
            placeholder="Amount"
          />
          <button onClick={() => removePayment(i)}>Remove</button>
        </div>
      ))}
      <button onClick={addPayment}>+ Add Payment</button>

      <hr />

      {/* Submit */}
      <button onClick={submitForm} style={{ marginTop: 20 }}>
        Update Campaign
      </button>
    </div>
  );
};

export default EditCampaignModal;
