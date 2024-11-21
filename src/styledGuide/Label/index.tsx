import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode; // Ensures the component has children
}

export const Label: React.FC<LabelProps> = ({ children, ...props }) => {
  return <label {...props}>{children}</label>;
};
