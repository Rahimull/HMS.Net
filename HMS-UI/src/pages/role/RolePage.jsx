import { useEffect, useState } from "react";

import RolesApi from "@/api/user/RolesApi";

import Button from "@/components/common/Button";
import DataTable from "@/components/common/DataTable";

import RoleModal from "./RoleModal";

import { toast } from "react-toastify";

const RolePage = () => {
  const [roles, setRoles] = useState([]);

  const [openModal, setOpenModal] = useState(false);

  const [selectedRole, setSelectedRole] = useState(null);
const [loading, setLoading] = useState(false);
  const loadData = async () => {
    setLoading(true);
    try {
      const res = await RolesApi.getAll();

      setRoles(res.data ?? []);
      setLoading(false)
    } catch (err) {
      console.log(err);
    setLoading(true)
      toast.error("Failed to load roles");
    }
  };

  console.log(roles)

  useEffect(() => {
    loadData();
  }, []);

  const handleCreate = () => {
    setSelectedRole(null);

    setOpenModal(true);
  };

  const handleEdit = (row) => {
    setSelectedRole(row);

    setOpenModal(true);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Delete role "${row.name}" ?`
    );

    if (!confirmDelete) return;

    try {
      await RolesApi.delete(row.id);

      toast.success(
        "Role deleted successfully"
      );

      loadData();
    } catch (err) {
      console.log(err);

      toast.error(
        err?.response?.data ??
        "Delete failed"
      );
    }
  };

  const columns = [
    {
      header: "id",
      accessorKey: "id",
    },
    {
      header: "Role Name",
      accessorKey: "name",
    },
    {
      header: "Users",
      accessorKey: "userCount",
    },
  ];

   const actions = [
    {
      label: "Edit",
      className: "text-blue-600",
      icon: "✏️",
      onClick: (row) => handleEdit(row),
    },
    {
      label: "Delete",
      className: "text-red-600",
      icon: "🔄",
      onClick: (row) => handleDelete(row),
    },
  ];

  return (
    <div className="space-y-4">

      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Roles
        </h2>

        <Button onClick={handleCreate}>
          Add Role
        </Button>
      </div>

      <DataTable
        columns={columns}
        data={roles}
        actions={actions}
        
      />

      <RoleModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        role={selectedRole}
        onSuccess={loadData}
      />
    </div>
  );
};

export default RolePage;