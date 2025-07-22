import { useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  const handleLogout = () => {
    setUser(null);
    setShowRegister(false);
  };

  if (!user) {
    return (
      <div className="text-center mt-10">
        {showRegister ? (
          <>
            <Register />
            <p className="mt-4">
              Already have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(false)}
              >
                Login
              </button>
            </p>
          </>
        ) : (
          <>
            <Login setUser={setUser} />
            <p className="mt-4">
              Don't have an account?{" "}
              <button
                className="text-blue-600 underline"
                onClick={() => setShowRegister(true)}
              >
                Register
              </button>
            </p>
          </>
        )}
      </div>
    );
  }

  if (user.role === "admin")
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Admin Dashboard</h2>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
        <AdminDashboard />
      </div>
    );

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold">Welcome, {user.role}</h2>
      <p>
        You're logged in as <strong>{user.username}</strong>
      </p>
      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
