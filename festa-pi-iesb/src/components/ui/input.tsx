"use client";

import {
  faEye,
  faEyeSlash,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

type Props = {
  placeholder: string;
  value?: string;
  password?: boolean;
  label?: string;
  icon?: IconDefinition;
  onChange?: (newValue: string) => void;
};

export const Input = ({
  placeholder,
  value,
  onChange,
  password,
  label,
  icon,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <>
      {label && (
        <div>
          <label>{label}</label>
        </div>
      )}

      <div className="flex items-center h-14 rounded-3xl border-2 transition-colors duration-200 focus-within:border-[#97A2D7]">
        <input
          type={password && !showPassword ? "password" : "text"}
          className="flex-1 outline-none h-full px-4 bg-transparent border-none"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
        />
        {icon && <FontAwesomeIcon icon={icon} className="size-6 mr-4" />}
        {password && (
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? faEye : faEyeSlash}
            className="cursor-pointer mr-4 size-6 "
          />
        )}
      </div>
    </>
  );
};
