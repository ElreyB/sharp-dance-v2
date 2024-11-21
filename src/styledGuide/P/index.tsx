import React from 'react';

interface PProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const P: React.FC<PProps> = ({ children, ...props }) => {
  return <p {...props}>{children}</p>;
};
