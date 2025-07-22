import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/admin/users").then((res) => {
      setUsers(res.data);
    });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold text-[#008080] mb-4">
        Admin Dashboard
      </h2>
      <div className="overflow-auto">
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead className="bg-[#4ECDC4] text-white">
            <tr>
              <th className="p-2 border">Username</th>
              <th className="p-2 border">Role</th>
              <th className="p-2 border">Last Login</th>
              <th className="p-2 border">IP</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id} className="text-center">
                <td className="p-2 border">{u.username}</td>
                <td className="p-2 border">{u.role}</td>
                <td className="p-2 border">
                  {u.lastLogin
                    ? new Date(u.lastLogin).toLocaleString()
                    : "Never"}
                </td>
                <td className="p-2 border">{u.ip || "N/A"}</td>
                <td className="p-2 border">
                  <span
                    className={`font-semibold ${
                      u.isOnline ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {u.isOnline ? "Online" : "Offline"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
