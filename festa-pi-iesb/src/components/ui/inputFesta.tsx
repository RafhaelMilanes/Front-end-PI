import React from 'react';

export const Input = ({ label, placeholder, icon, value, onChange, type = "text", error }) => {
  return (
    <div className="mb-4">
      <label className="block mb-2 font-medium">{label}</label>
      <div className="flex items-center h-14 rounded-xl border-2 bg-[#D9D9D9] transition-colors duration-200 focus-within:border-[#97A2D7]">
        {icon && <i className={`fa ${icon} pl-4`}></i>} 
        <input
          className="flex-1 outline-none h-full px-4 rounded-xl bg-[#D9D9D9] border-none"
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      {error && <p className="mt-1 text-red-500 text-sm">{error}</p>}
    </div>
  );
};
