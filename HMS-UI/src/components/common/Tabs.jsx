import { useState } from "react";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(tabs[0]?.key);

  return (
    <div>
      <div className="flex gap-2 border-b mb-4">
        {tabs.map(t => (
          <button
            key={t.key}
            className={`px-3 py-2 text-sm rounded-t ${
              active === t.key ? "bg-blue-600 text-white" : "bg-gray-100"
            }`}
            onClick={() => setActive(t.key)}
            type="button"
          >
            {t.title}
          </button>
        ))}
      </div>

      <div>
        {tabs.map(t => active === t.key ? <div key={t.key}>{t.content}</div> : null)}
      </div>
    </div>
  );
}