import { useEffect, useMemo, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarClock,
  FileText,
  Stethoscope,
  ClipboardList,
  Pill,
  ListChecks,
  CalendarDays,
  Search,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Briefcase,
  Wallet,
  Receipt,
  CreditCard,
  Package,
  Boxes,
  ShoppingCart,
  Truck,
  FlaskConical,
  BadgeDollarSign,
  Layers,
} from "lucide-react";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState("");
  const location = useLocation();

  // ✅ nested route support: /patient/edit/1 should keep /patient active
  const isPathActive = (itemLink) => {
    const path = location.pathname.toLowerCase();
    const link = itemLink.toLowerCase();
    if (link === "/") return path === "/";
    return path === link || path.startsWith(link + "/");
  };

  const groups = useMemo(
    () => [
      {
        key: "overview",
        title: "Overview",
        items: [{ name: "Dashboard", link: "/", icon: LayoutDashboard }],
      },
      {
        complate: 1,
        key: "reception",
        title: "Reception",
        items: [
          { name: "Patident Appointment", link: "/patientAppointmentUi", icon: Users },
          { name: "OK--->  Patident", link: "/patient", icon: Users },
          { name: `OK--->  Department` , link: "/department", icon: Building2 },
          { name: "OK---> Appointment", link: "/appointment", icon: CalendarClock },
          { name: "OK---> Medical Record", link: "/medicalrecord", icon: FileText },
        ],
      },
      {
        key: "doctors",
        title: "Doctors",
        items: [
          { name: "Appointment test Ui", link: "/appointmentsUi", icon: CalendarClock },
          { name: "OK---> Doctors", link: "/doctors", icon: Stethoscope },
          { name: "OK---> Consultations", link: "/consultations", icon: ClipboardList },
          { name: "OK---> Diagnosis", link: "/diagnosis", icon: ListChecks },
          { name: "OK---> Prescription", link: "/prescription", icon: Pill },
          { name: "OK---> Prescription Details", link: "/prescriptiondetails", icon: Layers },
          { name: "OK---> Schedule", link: "/schedule", icon: CalendarDays },
        ],
      },
      {
        key: "hr",
        title: "HR",
        items: [
          { name: "OK---> Employees", link: "/hr/employees", icon: Briefcase },
          { name: "OK---> Payroll", link: "/hr/payroll", icon: Wallet },
          { name: "OK---> Shifts", link: "/hr/shifts", icon: CalendarDays },
        ],
      },
      {
        key: "finance",
        title: "Finance",
        items: [
          { name: "Invoices", link: "/finance/invoices", icon: Receipt },
          { name: "Invoice Details", link: "/finance/invoice-details", icon: FileText },
          { name: "Payments", link: "/finance/payments", icon: CreditCard },
        ],
      },
      {
        key: "store",
        title: "Store",
        items: [
          { name: "StockManagement", link: "/store/StockManagement", icon: Package },
          { name: "PurchasesUi", link: "/store/PurchasesUi", icon: Package },
          { name: "OK---> Items", link: "/store/items", icon: Package },
          { name: "OK---> Item Stocks", link: "/store/item-stocks", icon: Boxes },
          { name: "OK---> Purchases", link: "/store/purchases", icon: ShoppingCart },
          { name: "OK---> Purchase Details", link: "/store/purchase-details", icon: Layers },
          { name: "OK---> Suppliers", link: "/store/suppliers", icon: Truck },
        ],
      },
      {
        key: "pharmacy",
        
        title: "Pharmacy",
        items: [
          { name: "PharmacyPageUi", link: "/pharmacy/PharmacyPageUi", icon: FlaskConical },
          { name: "OK--->  Medicines", link: "/pharmacy/medicines", icon: FlaskConical },
          { name: "OK--->  Medicine Stocks", link: "/pharmacy/medicine-stocks", icon: Boxes },
          { name: "OK---> Sales", link: "/pharmacy/sales", icon: BadgeDollarSign },
          { name: "OK---> Sale Details", link: "/pharmacy/sale-details", icon: FileText },
        ],
      },
    ],
    []
  );

  // ✅ open/close state for dropdown groups
  const [openGroups, setOpenGroups] = useState(() => {
    const obj = {};
    groups.forEach((g) => (obj[g.key] = true));
    return obj;
  });

  // ✅ open active group automatically when route changes
  useEffect(() => {
    const activeGroup = groups.find((g) => g.items.some((it) => isPathActive(it.link)));
    if (activeGroup) {
      setOpenGroups((prev) => ({ ...prev, [activeGroup.key]: true }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const toggleGroup = (key) => {
    setOpenGroups((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // ✅ search filtering
  const filteredGroups = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return groups;

    return groups
      .map((g) => ({
        ...g,
        items: g.items.filter(
          (it) => it.name.toLowerCase().includes(q) || it.link.toLowerCase().includes(q)
        ),
      }))
      .filter((g) => g.items.length > 0);
  }, [groups, query]);

  const NavItem = ({ item }) => {
    const Icon = item.icon;
    return (
      <NavLink
        to={item.link}
        className={({ isActive }) =>
          [
            "group relative flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
            "focus:outline-none focus:ring-2 focus:ring-blue-300/60",
            isActive
              ? "bg-blue-600 text-white shadow-sm"
              : "text-blue-50/90 hover:bg-blue-800/60 hover:text-white",
          ].join(" ")
        }
      >
        {/* Active indicator */}
        <span
          className={[
            "absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r",
            isPathActive(item.link) ? "bg-white" : "bg-transparent",
          ].join(" ")}
        />
        <Icon className="h-4 w-4 shrink-0 opacity-90" />
        {!collapsed && <span className="truncate">{item.name}</span>}
        {collapsed && (
          <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-lg bg-slate-900 px-2 py-1 text-xs text-white shadow-lg group-hover:block">
            {item.name}
          </span>
        )}
      </NavLink>
    );
  };

  return (
    <aside
      className={[
        "h-screen bg-blue-900 text-white flex flex-col border-r border-blue-800/60",
        collapsed ? "w-20" : "w-72",
        "transition-all duration-200",
      ].join(" ")}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 p-4 border-b border-blue-800/60">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-white/10 grid place-items-center font-bold">
            HMS
          </div>
          {!collapsed && (
            <div className="leading-tight">
              <div className="text-base font-semibold">HMS System</div>
              <div className="text-xs text-blue-200/80">Admin Dashboard</div>
            </div>
          )}
        </div>

        <button
          onClick={() => setCollapsed((v) => !v)}
          className="rounded-xl p-2 hover:bg-blue-800/60 transition"
          aria-label="Toggle sidebar"
          title="Toggle sidebar"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-blue-200/80" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={collapsed ? "..." : "Search menu..."}
            className={[
              "w-full rounded-xl bg-white/10 border border-white/10",
              "pl-9 pr-3 py-2 text-sm text-white placeholder:text-blue-200/70",
              "focus:outline-none focus:ring-2 focus:ring-blue-300/60",
            ].join(" ")}
          />
        </div>
      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-auto px-4 pb-4 space-y-4">
        {filteredGroups.map((group) => {
          const searching = query.trim().length > 0;
          const isOpen = searching ? true : !!openGroups[group.key];

          return (
            <div key={group.key} className="space-y-2">
              <button
                type="button"
                onClick={() => toggleGroup(group.key)}
                className={[
                  "w-full flex items-center justify-between rounded-xl px-3 py-2 transition",
                  "bg-white/10 hover:bg-white/15",
                  "focus:outline-none focus:ring-2 focus:ring-blue-300/60",
                ].join(" ")}
              >
                <span className="text-xs font-semibold uppercase tracking-wide text-blue-200/90">
                  {collapsed ? group.title.charAt(0) : group.title}
                </span>

                {!collapsed && (
                  <ChevronDown
                    className={[
                      "h-4 w-4 transition-transform",
                      isOpen ? "rotate-180" : "",
                    ].join(" ")}
                  />
                )}
              </button>

              <div
                className={[
                  "grid transition-all duration-200",
                  isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                ].join(" ")}
              >
                <div className="overflow-hidden space-y-1">
                  {group.items.map((item) => (
                    <NavItem  key={item.link} item={item} />
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-blue-800/60">
        <div className="rounded-xl bg-white/10 p-3">
          {!collapsed ? (
            <div className="text-sm">
              <div className="font-semibold">Logged in</div>
              <div className="text-blue-200/80 text-xs">Admin</div>
            </div>
          ) : (
            <div className="text-center text-xs text-blue-200/80">Admin</div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;