import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

export default function Login({ setUser }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!form.username || !form.password) {
      return setError("All fields are required.");
    }

    setLoading(true);
    setError("");

    try {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const ipData = await ipRes.json();

      const res = await axios.post("http://localhost:5000/api/login", {
        ...form,
        ip: ipData.ip,
      });

      // Set user object with _id, role, username
      setUser({
        _id: res.data.userId,
        role: res.data.role,
        username: form.username,
      });
    } catch (err) {
      console.error(err);
      setError("Invalid credentials");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#008080]">
          Login
        </h2>
        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full p-2 mb-4 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        {error && <p className="text-red-500 mb-2">{error}</p>}
        <Button onClick={handleLogin} disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </div>
    </div>
  );
}
