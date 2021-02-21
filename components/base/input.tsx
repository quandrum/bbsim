import { ReactNode, InputHTMLAttributes } from 'react';

type InputProps = {
  preIcon: ReactNode;
  postIcon?: ReactNode;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: React.FC<InputProps> = ({
  postIcon,
  preIcon,
  ...props
}) => (
  <div className="relative flex flex-wrap items-center w-full pr-10 mb-6 bg-white rounded h-15">
    <div className="flex justify-center p-4 -mr-px w-15">
      <span className="flex items-center px-3 text-2xl leading-normal text-gray-600 bg-white border-0 rounded rounded-r-none">
        {preIcon}
      </span>
    </div>
    <input
      {...props}
      className="relative self-center flex-1 flex-grow flex-shrink w-px h-10 px-3 text-xl leading-normal border-0 rounded rounded-l-none outline-none border-grey-light font-roboto"
    />
    {postIcon}
  </div>
);
