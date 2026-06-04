import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = '', 
  ...props 
}) => {
  const baseClass = `${styles.btn} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`;
  
  return (
    <button className={baseClass.trim()} {...props}>
      {children}
    </button>
  );
};
