import { AnchorHTMLAttributes } from 'react';
import cx from 'classnames';

// TODO turn into button for a11y
export const Link: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  onClick,
  children,
  className,
}) => (
  <a
    href="#"
    className={cx(
      'mb-6 text-base leading-normal text-white font-roboto hover:underline',
      className
    )}
    onClick={onClick}
  >
    {children}
  </a>
);
