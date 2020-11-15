import { SyntheticEvent } from 'react';

type ButtonProps = {
  action: (e: SyntheticEvent) => void;
  text: string;
};

export const Button: React.FC<ButtonProps> = ({ action, text }) => (
  <button
    className="w-24 p-1 m-1 text-white bg-blue-500 rounded-md"
    onClick={action}
  >
    {text}
  </button>
);

export default Button;
