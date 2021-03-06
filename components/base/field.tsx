import { Field } from 'formik';
import { ReactNode, InputHTMLAttributes } from 'react';

type InputProps = {
  label: String;
} & InputHTMLAttributes<HTMLInputElement>;

export const InputField = ({ label = "", ...props }: InputProps): JSX.Element => (
  <div>
    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="mt-1 relative rounded-md shadow-sm">
      <Field
        {...props}
        className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md"
      />
    </div>
  </div>
);
