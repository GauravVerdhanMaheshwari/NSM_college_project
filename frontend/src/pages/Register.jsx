import { useState } from "react";
import axios from "axios";
import Button from "../components/Button";

export default function Register() {
  const [form, setForm] = useState({
    username: "",
    password: "",
    role: "user",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!form.username || !form.password) {
      return setMessage("All fields are required.");
    }

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/register", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage("Registration failed", err);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-[#008080]">
          Register
        </h2>

        <input
          className="w-full p-2 mb-2 border rounded"
          placeholder="Username"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          className="w-full p-2 mb-2 border rounded"
          type="password"
          placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
          className="w-full p-2 mb-4 border rounded"
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="user">User</option>
          <option value="seller">Seller</option>
          <option value="admin">Admin</option>
        </select>

        {message && <p className="text-green-600 mb-2">{message}</p>}

        <Button onClick={handleRegister} disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </Button>
      </div>
    </div>
  );
}
