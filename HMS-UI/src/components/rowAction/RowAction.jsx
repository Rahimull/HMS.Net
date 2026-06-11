import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { MoreVertical } from "lucide-react";

const RowActions = ({ row, actions = [] }) => {
  if (!actions.length) return null;

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center transition">
          <MoreVertical size={16} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={6}
          align="end"
          className="min-w-[180px] bg-white border border-gray-200 rounded-xl shadow-lg p-1 z-50"
        >
          {actions.map((action) => (
            <DropdownMenu.Item
              key={action.label}
              onSelect={(e) => {
                e.preventDefault();
                if (!action.disabled) action.onClick?.(row);
              }}
              className={`
                px-3 py-2 text-sm rounded-lg cursor-pointer outline-none flex items-center gap-2
                transition
                ${
                  action.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "hover:bg-gray-100"
                }
                ${action.className || ""}
                ${action.disabled ? "opacity-50 pointer-events-none" : ""}
              `}
            >
              {action.icon}
              <span>{action.label}</span>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

export default RowActions;