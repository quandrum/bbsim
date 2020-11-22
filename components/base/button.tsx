import { ButtonHTMLAttributes } from 'react';

export const Button: React.FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  disabled,
  onClick,
  type = 'button',
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className="py-4 mt-4 mb-20 font-sans text-xl leading-tight text-center text-white bg-yellow-600 rounded px-17 md:px-12 md:py-4 md:text-base"
  >
    {children}
  </button>
);
