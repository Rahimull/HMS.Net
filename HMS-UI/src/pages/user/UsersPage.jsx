import { useEffect, useState } from "react";
import UserApi from "@/api/user/UserApi";
import FilterCard from "@/components/filter/FilterCard";
import DataTable from "@/components/common/DataTable";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";
import UserModal from "./UserModal";
import UserRoleModal from "./UserRoleModel";

// بعداً می‌سازیم
// import UserModal from "../components/UserModal";

const UserPage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [sorting, setSorting] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [openRoleModal, setOpenRoleModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  /* ================= LOAD DATA ================= */
  const loadData = async () => {
    setLoading(true);

    try {
      const res = await UserApi.getPaged({
        pagination: {
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
        },
        sorting: sorting
          ? {
              sortBy: sorting.id,
              isDescending: sorting.desc,
            }
          : {
              sortBy: "id",
              isDescending: true,
            },
        search: {
          searchTerm: search,
        },
      });

      const pagedData = res;

      setUsers(pagedData?.data ?? []);
      setTotalCount(pagedData?.totalCount ?? 0);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(loadData, 300);

    return () => clearTimeout(timer);
  }, [pagination.pageIndex, pagination.pageSize, sorting, search]);

  /* ================= ACTIONS ================= */

  const handleCreate = () => {
    setSelectedUser(null);
    setOpenModal(true);
  };
  const handleAssignRole = (row) => {
    setSelectedUser(row);
    setOpenRoleModal(true);
  };

  const handleEdit = (row) => {
    setSelectedUser(row);
    setOpenModal(true);
  };

  const handleToggle = async (row) => {
    try {
      await UserApi.toggleStatus(row.id);

      toast.success("User status updated");

      loadData();
    } catch (err) {
      console.error(err);
      toast.error("Failed to update user status");
    }
  };

  /* ================= TABLE COLUMNS ================= */

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "fullName",
      header: "Full Name",
    },
    {
      accessorKey: "userName",
      header: "Username",
    },
    {
      accessorKey: "departmentName",
      header: "Department",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "isActive",
      header: "Status",
      cell: ({ row }) => (
        <span
          className={
            row.original.isActive
              ? "text-green-600 font-medium"
              : "text-red-600 font-medium"
          }
        >
          {row.original.isActive ? "Active" : "Inactive"}
        </span>
      ),
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
      label: "Status",
      className: "text-orange-600",
      icon: "🔄",
      onClick: (row) => handleToggle(row),
    },
    {
      label: "Roles",
      className: "text-purple-600",
      icon: "🧩",
      onClick: (row) => handleAssignRole(row),
    },
  ];

  return (
    <>
      <FilterCard>
        <Input
          placeholder="Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button onClick={handleCreate}>Add User</Button>
      </FilterCard>

      <DataTable
        columns={columns}
        data={users}
        loading={loading}
        totalCount={totalCount}
        actions={actions}
        pagination={pagination}
        onPaginationChange={setPagination}
        tableTitle="Users"
        subTitle="Users List"
      />

      {/* بعداً اضافه می‌کنیم */}

      <UserModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        user={selectedUser}
        onSuccess={loadData}
      />

      <UserRoleModal 
        open={openRoleModal}
        onClose={() => setOpenRoleModal(false)}
        user={selectedUser}
        onSuccess={loadData}
      />
    </>
  );
};

export default UserPage;
