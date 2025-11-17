import React from 'react';

export interface JxionButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}

export const JxionButton: React.FC<JxionButtonProps> = ({
  children,
  variant = 'primary',
  onClick,
  type = 'button',
  disabled = false,
  fullWidth = false,
  className = '',
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--color-noir-primary)',
          color: 'var(--color-noir-text)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--color-noir-secondary)',
          color: 'var(--color-noir-background-primary)',
        };
      case 'danger':
        return {
          backgroundColor: '#ef4444',
          color: 'var(--color-noir-text)',
        };
      default:
        return {
          backgroundColor: 'var(--color-noir-primary)',
          color: 'var(--color-noir-text)',
        };
    }
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        px-6 py-3 rounded-lg font-semibold transition-opacity
        ${fullWidth ? 'w-full' : ''} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90 active:opacity-75'}
        ${className}
      `}
      style={getVariantStyles()}
    >
      {children}
    </button>
  );
};

