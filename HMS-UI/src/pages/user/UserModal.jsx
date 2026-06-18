import { useEffect, useState } from "react";
import UserApi from "@/api/user/UserApi";
import DepartmentApi from "@/api/DepartmentApi";
import RolesApi from "@/api/user/RolesApi";

import Modal from "@/components/common/modal/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { toast } from "react-toastify";

const UserModal = ({
  open,
  onClose,
  user,
  onSuccess,
}) => {
  const isEdit = !!user;

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);

  const [form, setForm] = useState({
    fullName: "",
    userName: "",
    email: "",
    phoneNumber: "",
    password: "",
    departmentId: "",
    role: "",
  });

  /* ================= LOAD DROPDOWNS ================= */

const loadLookups = async () => {
  try {
    
   

    const [depRes, roleRes] = await Promise.all([
      DepartmentApi.getPaged({
        pagination: { pageIndex: 0, pageSize: 100 },
      }),
      RolesApi.getAll(),
    ]);

    

    const depData = depRes

setDepartments(depData.data?.data?.data ?? []);
      
    setRoles(roleRes.data ?? []);
  } catch (err) {
    console.log("LOOKUP ERROR:", err.response?.status, err.message);
  }
};

  /* ================= EDIT MODE ================= */

  useEffect(() => {
    if (!open) return;

    loadLookups();

    if (user) {
      setForm({
        fullName: user.fullName ?? "",
        userName: user.userName ?? "",
        email: user.email ?? "",
        phoneNumber: user.phoneNumber ?? "",
        password: "",
        departmentId: user.departmentId ?? "",
        role: "",
      });
    } else {
      setForm({
        fullName: "",
        userName: "",
        email: "",
        phoneNumber: "",
        password: "",
        departmentId: "",
        role: "",
      });
    }
  }, [open, user]);

  /* ================= CHANGE ================= */

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  /* ================= SAVE ================= */

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await UserApi.update(user.id, form);

        toast.success("User updated successfully");
      } else {
        console.log("Form: ", form)
        await UserApi.create(form);

        toast.success("User created successfully");
      }

      onSuccess?.();

      onClose();
    } catch (err) {
      console.log(err);

      toast.error("Operation failed");
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit User" : "Create User"}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <Input
          label="Full Name"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
        />

        <Input
          label="Username"
          name="userName"
          value={form.userName}
          onChange={handleChange}
          disabled={isEdit}
        />

        <Input
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />

        <Input
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={handleChange}
        />

        {!isEdit && (
          <Input
            type="password"
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        )}

        <div>
          <label className="block mb-1">
            Department
          </label>

          <select
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            className="w-full border rounded-lg p-2"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((d) => (
              <option
                key={d.id}
                value={d.id}
              >
                {d.name}
              </option>
            ))}
          </select>
        </div>

        {!isEdit && (
          <div>
            <label className="block mb-1">
              Role
            </label>

            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded-lg p-2"
            >
              <option value="">
                Select Role
              </option>

              {roles.map((r) => (
                <option
                  key={r.id}
                  value={r.name}
                >
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          Cancel
        </Button>

        <Button onClick={handleSubmit}>
          {isEdit ? "Update" : "Create"}
        </Button>
      </div>
    </Modal>
  );
};

export default UserModal;