import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Layout", link: "/" },
    { name: "Dashboard", link: "/Dashboard" },
    { name: "Patient", link: "/patient" },
    { name: "Settings", link: "/settings" },
  ];

  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="p-4 text-xl font-bold border-b border-blue-700">
        HMS System
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.link}
            to={item.link}
            className={({ isActive }) =>
              `
              block p-2 rounded transition
              ${
                isActive
                  ? "bg-blue-600 font-semibold"
                  : "hover:bg-blue-700"
              }
              `
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;