import { AnchorHTMLAttributes } from 'react';

// TODO turn in button for a11y
export const Link: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  onClick,
  children,
}) => (
  <a
    href="#"
    className="mb-6 mr-auto text-base leading-normal text-white font-roboto hover:underline"
    onClick={onClick}
  >
    {children}
  </a>
);
