import React, { useEffect, useState } from "react";
import {
  Users,
  Search,
  Mail,
  Shield,
  Calendar,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      // Simulated data for demonstration
      const mockUsers = [
        {
          _id: "1",
          name: "John Doe",
          email: "john@example.com",
          role: "Admin",
          createdAt: "2024-01-15",
        },
        {
          _id: "2",
          name: "Jane Smith",
          email: "jane@example.com",
          role: "User",
          createdAt: "2024-02-20",
        },
        {
          _id: "3",
          name: "Mike Johnson",
          email: "mike@example.com",
          role: "Manager",
          createdAt: "2024-03-10",
        },
        {
          _id: "4",
          name: "Sarah Williams",
          email: "sarah@example.com",
          role: "User",
          createdAt: "2024-04-05",
        },
      ];

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 800));
      setUsers(mockUsers);

      // Uncomment below for real API call
      // const res = await axios.get("http://localhost:5000/api/users");
      // setUsers(res.data);
    } catch (error) {
      setError("Failed to fetch users. Please try again later.");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

  const getRoleBadgeColor = (role) => {
    const colors = {
      Admin: "bg-purple-100 text-purple-700 border-purple-200",
      Manager: "bg-blue-100 text-blue-700 border-blue-200",
      User: "bg-gray-100 text-gray-700 border-gray-200",
    };
    return colors[role] || colors.User;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  User Management
                </h1>
                <p className="text-gray-500 text-sm">
                  Manage and view all users
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">{users.length}</p>
              <p className="text-sm text-gray-500">Total Users</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, email, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* User Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-500">Loading users...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                <p className="text-red-600 font-medium">{error}</p>
                <button
                  onClick={fetchUsers}
                  className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      User
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Role
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Joined Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user._id}
                        className="hover:bg-gray-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0">
                              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-semibold">
                                {user.name.charAt(0).toUpperCase()}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user.name}
                              </div>
                            </div>
                          </div>
                        </td>
                        <tr onClick={() => navigate(`/user/${user._id}`)}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                        </tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Mail className="w-4 h-4 mr-2 text-gray-400" />
                            {user.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeColor(
                              user.role
                            )}`}
                          >
                            <Shield className="w-3 h-3 mr-1" />
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center text-sm text-gray-600">
                            <Calendar className="w-4 h-4 mr-2 text-gray-400" />
                            {new Date(user.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="px-6 py-20 text-center">
                        <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                        <p className="text-gray-500 font-medium">
                          No users found
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm
                            ? "Try adjusting your search"
                            : "Add users to get started"}
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Stats */}
        {!loading && !error && users.length > 0 && (
          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>
                Showing{" "}
                <span className="font-medium text-gray-900">
                  {filteredUsers.length}
                </span>{" "}
                of{" "}
                <span className="font-medium text-gray-900">
                  {users.length}
                </span>{" "}
                users
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;
