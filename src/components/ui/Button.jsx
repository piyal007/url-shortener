export default function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  disabled = false,
  ...props 
}) {
  const baseStyles = 'font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transform';
  
  const variants = {
    primary: 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white hover:-translate-y-0.5',
    secondary: 'bg-slate-700 hover:bg-slate-800 text-white hover:-translate-y-0.5',
    outline: 'border-2 border-slate-300 hover:border-slate-400 text-slate-700 hover:bg-slate-50',
    google: 'bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 hover:shadow-xl',
  };
  
  const sizes = {
    sm: 'py-2 px-4 text-sm',
    md: 'py-3 px-6 text-base',
    lg: 'py-4 px-8 text-lg',
  };
  
  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
