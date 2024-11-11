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
  onEnter?: () => void;
};

export const Input = ({
  placeholder,
  value,
  onChange,
  password,
  label,
  icon,
  onEnter,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleKeyUp = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code.toLowerCase() === "enter" && onEnter) {
      onEnter();
    }
  };
  return (
    <div className="">
      {label && <label className="">{label}</label>}

      <div className="flex items-center h-14 rounded-xl border-2 bg-[#D9D9D9] transition-colors duration-200 focus-within:border-[#97A2D7]">
        <input
          type={password && !showPassword ? "password" : "text"}
          className="flex-1 outline-none h-full px-4 rounded-xl bg-[#D9D9D9] border-none"
          value={value}
          onChange={(e) => onChange && onChange(e.target.value)}
          onKeyUp={handleKeyUp}
        />
        {icon && (
          <FontAwesomeIcon icon={icon} className="size-6 mr-4 bg-[#D9D9D9]" />
        )}
        {password && (
          <FontAwesomeIcon
            onClick={() => setShowPassword(!showPassword)}
            icon={showPassword ? faEye : faEyeSlash}
            className="cursor-pointer mr-4 size-6 bg-[#D9D9D9]"
          />
        )}
      </div>
    </div>
  );
};
