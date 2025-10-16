interface LoaderProps {
  variant?: 'ball' | 'spinner' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
}

export default function Loader({ variant = 'spinner', size = 'md' }: LoaderProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  if (variant === 'ball') {
    return (
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-3 h-3 bg-nicon-green rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.1}s` }}
          />
        ))}
      </div>
    );
  }

  if (variant === 'pulse') {
    return (
      <div className={`${sizes[size]} bg-nicon-green rounded-full animate-pulse-glow`} />
    );
  }

  return (
    <div className={`${sizes[size]} border-4 border-gray-700 border-t-nicon-green rounded-full animate-spin`} />
  );
}
