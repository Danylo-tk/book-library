import { MouseEvent, ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  isBorderActive?: boolean;
}

export const Button = ({ children, onClick, isBorderActive }: ButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2 px-4 text-xl font-fivo text-gray-600 bg-white rounded-sm border border-solid ${
        isBorderActive ? "border-acidGreen" : "border-gray-600"
      } hover:text-gray-950 hover:border-acidGreen active:text-acidGreen`}
    >
      {children}
    </button>
  );
};
