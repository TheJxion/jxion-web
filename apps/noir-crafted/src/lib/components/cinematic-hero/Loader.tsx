import React, { useEffect, useState } from 'react';

interface LoaderProps {
  isLoading: boolean;
  className?: string;
  classNameLoader?: string;
}

export default function Loader({
  isLoading,
  className = '',
  classNameLoader = '',
}: LoaderProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // Delay hiding to allow animation to complete
      const timer = setTimeout(() => setShow(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show) return null;

  return (
    <div
      className={`fixed inset-0 z-[10000] transition-opacity duration-500 ${className} ${
        isLoading ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100px] h-[1px] ${classNameLoader}`}
      >
        <style>{`
          @keyframes loader-anim {
            0% { width: 0; left: 50%; }
            50% { width: 100px; left: 50%; }
            100% { width: 0; left: 50%; }
          }
        `}</style>
        <div
          style={{
            width: '100%',
            height: '100%',
            animation: 'loader-anim 2s infinite ease-in-out',
            background: 'currentColor',
          }}
        />
      </div>
    </div>
  );
}
