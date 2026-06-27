import { useEffect, useState } from "react";

import RolesApi from "@/api/user/RolesApi";

import Modal from "@/components/modal/Modal";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

import { toast } from "react-toastify";

const RoleModal = ({
  open,
  onClose,
  role,
  onSuccess,
}) => {
  const isEdit = !!role;

  const [form, setForm] = useState({
    name: "",
  });

  useEffect(() => {
    if (!open) return;

    if (role) {
      setForm({
        name: role.name ?? "",
      });
    } else {
      setForm({
        name: "",
      });
    }
  }, [open, role]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      if (!form.name.trim()) {
        toast.warning("Role name is required");
        return;
      }

      if (isEdit) {
        await RolesApi.update(role.id, form);

        toast.success("Role updated successfully");
      } else {
        await RolesApi.create(form);

        toast.success("Role created successfully");
      }

      onSuccess?.();
      onClose();
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data ??
        "Operation failed"
      );
    }
  };

  if (!open) return null;

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit Role" : "Create Role"}
    >
      <div className="space-y-4">
        <Input
          label="Role Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
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

export default RoleModal;