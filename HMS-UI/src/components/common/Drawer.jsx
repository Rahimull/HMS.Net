export default function Drawer({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  width = "max-w-md"
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 z-50 flex justify-end">

      <div className={`w-full ${width} bg-white h-full shadow-2xl p-6 overflow-y-auto`}>

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">

          <div>
            {title && (
              <h2 className="text-xl font-bold">{title}</h2>
            )}

            {subtitle && (
              <p className="text-sm text-gray-500">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>

        </div>

        {/* CONTENT */}
        {children}

      </div>
    </div>
  );
}