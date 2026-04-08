import React from "react";

const Loader = ({ text = "Loading..." }) => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      
      {/* Spinner */}
      <div className="w-16 h-16 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>

      {/* Text */}
      <p className="mt-4 text-white text-lg font-semibold animate-pulse">
        {text}
      </p>
    </div>
  );
};

export default Loader;