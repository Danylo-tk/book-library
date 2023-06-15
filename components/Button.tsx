import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isBorderActive?: boolean;
  type?: "button" | "submit";
  disabled?: boolean;
}

export const Button = ({
  children,
  onClick,
  isBorderActive,
  type = "button",
  disabled,
}: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`font-fivo rounded-sm border border-solid bg-white px-4 py-2 text-xl text-gray-600 ${
        isBorderActive ? "border-acidGreen" : "border-gray-600"
      } hover:border-acidGreen hover:text-gray-950 active:text-acidGreen`}
    >
      {children}
    </button>
  );
};
