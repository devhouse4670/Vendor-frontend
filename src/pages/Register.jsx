import React, { useState } from "react";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMsg("");

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setMsg(data.error || "Failed to add user");
      } else {
        setMsg("User created successfully!");
        setForm({ name: "", email: "", password: "", role: "user" });
      }
    } catch (error) {
      setMsg("Something went wrong");
    }

    setLoading(false);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New User</h2>

      {msg && (
        <p
          className={`font-semibold mb-3 ${
            msg.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {msg}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Name */}
        <div>
          <label className="block font-semibold mb-1">Full Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold mb-1">Email Address</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block font-semibold mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block font-semibold mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
          >
            <option value="user">User</option>
            <option value="manager">Manager</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-all"
        >
          {loading ? "Adding User..." : "Create User"}
        </button>

      </form>
    </div>
  );
};

export default Register;
