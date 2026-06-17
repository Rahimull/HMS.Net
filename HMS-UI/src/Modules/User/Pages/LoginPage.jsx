import { useState } from "react";
import Api from "@/api/Api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const res = await Api.post("/auth/login", form);

      const token = res.data.token;

      localStorage.setItem("token", token);

      toast.success("Login successful");

      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-6 border rounded w-96 space-y-4">
        <h2 className="text-xl font-bold">Login</h2>

        <input
          name="userName"
          placeholder="Username"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full border p-2"
          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full p-2"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;