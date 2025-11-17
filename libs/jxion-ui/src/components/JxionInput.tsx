import React from 'react';

export interface JxionInputProps {
  label: string;
  type?: 'text' | 'email' | 'password' | 'tel' | 'number';
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  className?: string;
}

export const JxionInput: React.FC<JxionInputProps> = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  disabled = false,
  className = '',
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label 
        className="block text-sm font-medium mb-2" 
        style={{ color: 'var(--color-noir-text)' }}
      >
        {label}
        {required && (
          <span style={{ color: 'var(--color-noir-primary)' }}> *</span>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full px-4 py-2 rounded-lg border transition-colors focus:outline-none focus:ring-2"
        style={{
          backgroundColor: 'var(--color-noir-background-secondary)',
          borderColor: error ? '#ef4444' : 'var(--color-noir-border)',
          color: 'var(--color-noir-text)',
          borderWidth: '1px',
        }}
        onFocus={(e) => {
          if (!error) {
            e.target.style.borderColor = 'var(--color-noir-primary)';
          }
        }}
        onBlur={(e) => {
          if (!error) {
            e.target.style.borderColor = 'var(--color-noir-border)';
          }
        }}
      />
      {error && (
        <p className="mt-1 text-sm" style={{ color: '#ef4444' }}>
          {error}
        </p>
      )}
    </div>
  );
};

