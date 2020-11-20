import { SyntheticEvent } from 'react';

type ButtonProps = {
  onClick: (e: SyntheticEvent) => void;
  text: string;
};

export const Button: React.FC<ButtonProps> = ({ onClick, text }) => (
  <button
    type="submit"
    onClick={onClick}
    className="py-4 mt-4 mb-20 font-sans text-xl leading-tight text-center text-white bg-yellow-600 rounded px-17 md:px-12 md:py-4 md:text-base"
  >
    {text}
  </button>
);

export default Button;
