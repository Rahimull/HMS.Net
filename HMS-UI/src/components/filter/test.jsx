
import { useState } from "react";

const FilterCard = ({
  title = "Smart Filters",
  subtitle = "Advanced filtering system",
  children,
  onReset,
  onApply,
}) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="relative overflow-hidden rounded-[32px] border border-white/20 bg-white/10 backdrop-blur-2xl shadow-[0_20px_80px_rgba(0,0,0,0.15)] p-7 mb-6">

      {/* PREMIUM BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-white/10 to-white/5"></div>

      <div className="absolute -top-24 -right-24 w-72 h-72 bg-cyan-400/30 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>

      <div className="relative z-10">

        {/* HEADER */}
        <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-6">

          {/* TITLE */}
          <div>
            <div className="flex items-center gap-3 mb-2">

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg text-xl">
                💊
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight text-gray-800">
                  {title}
                </h1>

                <p className="text-sm text-gray-500 mt-1">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* ACTIONS */}
          <div className="flex flex-wrap gap-3">

            <button
              onClick={onApply}
              className="group relative overflow-hidden px-6 py-3 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-600 text-white text-sm font-semibold shadow-xl hover:scale-105 transition-all duration-500"
            >
              <span className="relative z-10 flex items-center gap-2">
                ⚡ Apply
              </span>
            </button>

            <button
              onClick={onReset}
              className="px-6 py-3 rounded-2xl bg-white/60 backdrop-blur-xl border border-white/40 text-gray-700 text-sm font-semibold hover:bg-white/80 hover:scale-105 transition-all duration-300 shadow-lg"
            >
              🔄 Reset
            </button>

            {/* COLLAPSE BUTTON */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="px-6 py-3 rounded-2xl bg-gray-900 text-white text-sm font-semibold hover:bg-black hover:scale-105 transition-all duration-300 shadow-xl"
            >
              {collapsed ? "⬇ Expand" : "⬆ Collapse"}
            </button>
          </div>
        </div>

        {/* COLLAPSIBLE BODY */}
        <div
          className={`grid transition-all duration-500 ease-in-out overflow-hidden ${
            collapsed
              ? "grid-rows-[0fr] opacity-0 mt-0"
              : "grid-rows-[1fr] opacity-100 mt-8"
          }`}
        >
          <div className="overflow-hidden">

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
              {children}
            </div>

            {/* QUICK FILTERS */}
            <div className="flex flex-wrap items-center gap-4 mt-8">

              <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                Quick Filters
              </span>

              <button className="px-5 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-semibold shadow-lg hover:scale-110 hover:shadow-2xl transition-all duration-300">
                Today
              </button>

              <button className="px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 text-gray-700 text-xs font-semibold shadow-lg hover:bg-emerald-100 hover:text-emerald-700 hover:scale-110 transition-all duration-300">
                This Week
              </button>

              <button className="px-5 py-2.5 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 text-gray-700 text-xs font-semibold shadow-lg hover:bg-purple-100 hover:text-purple-700 hover:scale-110 transition-all duration-300">
                This Month
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterCard;
```

---

# Example Usage

```jsx
import FilterCard from "@/components/common/FilterCard";

<FilterCard
  title="Sales Filters"
  subtitle="Filter pharmacy sales"
  onApply={() => console.log("Apply")}
  onReset={() => console.log("Reset")}
>

  {/* SEARCH */}
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
      Search
    </label>

    <input
      type="text"
      placeholder="Invoice / Patient"
      className="w-full rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 text-sm text-gray-800 shadow-lg outline-none"
    />
  </div>

  {/* STATUS */}
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
      Status
    </label>

    <select
      className="w-full rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 text-sm text-gray-800 shadow-lg outline-none"
    >
      <option>All</option>
      <option>Paid</option>
      <option>Unpaid</option>
    </select>
  </div>

  {/* FROM DATE */}
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
      From Date
    </label>

    <input
      type="date"
      className="w-full rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 text-sm text-gray-800 shadow-lg outline-none"
    />
  </div>

  {/* TO DATE */}
  <div>
    <label className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 block">
      To Date
    </label>

    <input
      type="date"
      className="w-full rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl px-5 py-4 text-sm text-gray-800 shadow-lg outline-none"
    />
  </div>

</FilterCard>

