import React from 'react';
import { useRouter } from '../../context/RouterContext';

interface LinkProps {
  to: string;
  children: React.ReactNode;
  className?: string;
}

const Link: React.FC<LinkProps> = ({ to, children, className }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default Link;

