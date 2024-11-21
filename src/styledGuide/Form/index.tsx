import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  children: React.ReactNode; // Ensures that children are provided
}

export const Form: React.FC<FormProps> = ({ children, ...props }) => {
  return <form {...props}>{children}</form>;
};
