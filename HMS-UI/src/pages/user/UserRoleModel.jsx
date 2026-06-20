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

  useEffect(() => {
    if (!open || !user?.id) return;

    const load = async () => {
      try {
        setLoading(true);

        const res = await RolesApi.getAll();
        setRoles(res.data ?? []);

        setSelected(user.roleIds ?? []);
      } catch (err) {
        toast.error("Failed to load roles");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [open, user]);

  const toggle = (id) => {
    setSelected((prev) =>
      prev.includes(id)
        ? prev.filter(x => x !== id)
        : [...prev, id]
    );
  };

  const handleSave = async () => {
    try {
      setLoading(true);

      await UserApi.assignRoles(user.id, {
        roleIds: selected,
      });

      toast.success("Roles updated");
      onClose();
    } catch (err) {
      toast.error("Failed to save roles");
    } finally {
      setLoading(false);
    }
  };

  if (!open || !user) return null;

  return (
    <Modal open={open} onClose={onClose} title="Assign Roles">

      <div className="space-y-2">
        {roles.map((r) => (
          <label key={r.id} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selected.includes(r.id)}
              onChange={() => toggle(r.id)}
            />
            {r.name}
          </label>
        ))}
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave}>
          Save
        </Button>
      </div>

    </Modal>
  );
};

export default UserRoleModal;