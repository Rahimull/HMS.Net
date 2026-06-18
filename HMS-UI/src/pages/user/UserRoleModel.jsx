import { useEffect, useState } from "react";
import RolesApi from "@/api/user/RolesApi";
import UserApi from "@/api/user/UserApi";
import Modal from "@/components/common/modal/Modal";
import Button from "@/components/common/Button";
import { toast } from "react-toastify";

const UserRoleModal = ({ open, onClose, user }) => {
  const [roles, setRoles] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  /* ================= LOAD DATA ================= */
  useEffect(() => {
    if (!open || !user?.id) return;

    const load = async () => {
      try {
        setLoading(true);

        const rolesRes = await RolesApi.getAll();
        setRoles(rolesRes?.data ?? []);

        const userRolesRes = await UserApi.getRoles(user.id);

        const mapped = (userRolesRes ?? []).map((r) => r.id);
        setSelected(mapped);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open, user]);

  /* ================= TOGGLE ROLE ================= */
  const toggleRole = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  /* ================= SAVE ================= */
  const handleSave = async () => {
    if (!user?.id) {
      toast.error("No user selected");
      return;
    }

    try {
      setLoading(true);

      await UserApi.assignRoles(user.id, {
        roleIds: selected,
      });

      toast.success("Roles assigned successfully");
      onClose();
    } catch (err) {
      console.error(err);
      toast.error("Failed to assign roles");
    } finally {
      setLoading(false);
    }
  };

  /* ================= GUARD ================= */
  if (!open || !user?.id) return null;

  return (
    <Modal open={open} onClose={onClose} title="Assign Roles">
      <div className="space-y-2">
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          roles.map((role) => (
            <label key={role.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selected.includes(role.id)}
                onChange={() => toggleRole(role.id)}
              />
              {role.name}
            </label>
          ))
        )}
      </div>

      <div className="flex justify-end gap-2 mt-6">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>

        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </div>
    </Modal>
  );
};

export default UserRoleModal;