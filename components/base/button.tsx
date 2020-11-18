import { SyntheticEvent } from 'react';

type ButtonProps = {
  action: (e: SyntheticEvent) => void;
  text: string;
};

export const Button: React.FC<ButtonProps> = ({ action, text }) => (
  <span className="hidden ml-3 rounded-md shadow-sm sm:block">
    <button
      type="button"
      className="inline-flex items-center px-4 py-2 text-sm font-medium leading-5 text-white transition duration-150 ease-in-out bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700"
      onClick={action}
    >
      {text}
    </button>
  </span>
);

export default Button;
