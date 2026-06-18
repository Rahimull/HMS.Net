import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      await login(form);

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Invalid username or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">

      {/* Left Side */}
      <div className="hidden lg:flex flex-1 bg-blue-700 text-white p-12 flex-col justify-center">
        <h1 className="text-5xl font-bold mb-4">
          HMS
        </h1>

        <p className="text-xl opacity-90 mb-6">
          Hospital Management System
        </p>

        <p className="max-w-md leading-relaxed text-blue-100">
          Manage patients, appointments, pharmacy,
          inventory, finance and staff operations from
          one centralized platform.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="font-semibold">Patients</h3>
            <p className="text-sm opacity-80">
              Registration & Records
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="font-semibold">Doctors</h3>
            <p className="text-sm opacity-80">
              Consultation Management
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="font-semibold">Pharmacy</h3>
            <p className="text-sm opacity-80">
              Sales & Inventory
            </p>
          </div>

          <div className="bg-white/10 p-4 rounded-xl">
            <h3 className="font-semibold">Finance</h3>
            <p className="text-sm opacity-80">
              Billing & Payments
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="flex-1 flex items-center justify-center bg-gray-50 px-6">
        <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">

          <div className="text-center mb-8">
            <div className="w-16 h-16 mx-auto bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              H
            </div>

            <h2 className="text-3xl font-bold mt-4">
              Welcome Back
            </h2>

            <p className="text-gray-500 mt-2">
              Sign in to continue
            </p>
          </div>

          <div className="space-y-4">
            <Input
              label="Username"
              name="userName"
              value={form.userName}
              onChange={handleChange}
            />

            <Input
              label="Password"
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
            />

            <Button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full"
            >
              {loading ? "Signing In..." : "Login"}
            </Button>
          </div>

          <div className="mt-6 text-center text-sm text-gray-500">
            HMS © 2026
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;