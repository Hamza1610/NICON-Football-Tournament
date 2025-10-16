import { ReactNode } from 'react';

interface CardProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  hoverable?: boolean;
}

export default function Card({
  title,
  subtitle,
  children,
  className = '',
  hoverable = false
}: CardProps) {
  return (
    <div
      className={`
        bg-nicon-slate rounded-xl p-6
        ${hoverable ? 'hover:shadow-lg hover:shadow-nicon-green/20 transition-all duration-300 cursor-pointer' : ''}
        ${className}
      `}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && <h3 className="text-xl font-bold text-white">{title}</h3>}
          {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
