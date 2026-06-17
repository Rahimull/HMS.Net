// src/components/common/Modal.jsx

const Modal = ({ open, onClose, title, children }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">
            {title}
          </h2>

          <button onClick={onClose}>
            ✖
          </button>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Modal;