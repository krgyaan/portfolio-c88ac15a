import { ReactNode } from "react";

interface BorderedContainerProps {
  children: ReactNode;
  className?: string;
}

export function BorderedContainer({ children, className = "" }: BorderedContainerProps) {
  return (
    <div className={`bordered-container content-container py-6 ${className}`}>
      {children}
    </div>
  );
}
