interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  className?: string;
  disabled?: boolean;
}

export default function Button({ 
  children = "Solicita una propuesta", 
  onClick,
  type = "button",
  className = "",
  disabled = false
}: ButtonProps) {
  return (
    <button 
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`button-component ${className} ${disabled ? 'is-disabled' : ''}`}
    >
      {/* Content wrapper - ensures content stays above gradient overlay */}
      <span className="button-content">
        {/* Left Arrow */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          viewBox="0 0 8 12" 
          fill="none" 
          className="link-arrow is--left"
        >
          <path 
            d="M1.93616 11.0245C1.88666 11.1236 1.83914 11.2188 1.79294 11.3101L1.06487 10.8964C1.08048 10.8651 1.09635 10.8332 1.11244 10.8009L1.1175 10.7907C1.49122 10.0402 2.05155 8.91856 2.82816 7.96549C3.78652 6.7894 5.14644 5.74774 7.10039 5.5947L7.10039 6.44668C5.4615 6.59529 4.31281 7.46888 3.465 8.50931C2.75989 9.37462 2.30768 10.2804 1.94298 11.0108L1.93616 11.0245Z" 
            stroke="currentColor"
          />
          <path 
            d="M1.82733 0.743952C1.81724 0.724897 1.80725 0.706045 1.79737 0.687395L1.07113 1.10009C1.47071 1.85795 2.08884 3.02295 2.95135 4.04076C3.93204 5.19802 5.28171 6.23907 7.10039 6.4024L7.10039 5.54938C5.60391 5.39037 4.46167 4.52744 3.5778 3.48444C2.78071 2.54382 2.2355 1.51454 1.83418 0.756886L1.82733 0.743952Z" 
            stroke="currentColor"
          />
        </svg>

        {/* Text */}
        <p className="button-text">{children}</p>

        {/* Right Arrow */}
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="100%" 
          viewBox="0 0 8 12" 
          fill="none" 
          className="link-arrow is--right"
        >
          <path 
            d="M1.93616 11.0245C1.88666 11.1236 1.83914 11.2188 1.79294 11.3101L1.06487 10.8964C1.08048 10.8651 1.09635 10.8332 1.11244 10.8009L1.1175 10.7907C1.49122 10.0402 2.05155 8.91856 2.82816 7.96549C3.78652 6.7894 5.14644 5.74774 7.10039 5.5947L7.10039 6.44668C5.4615 6.59529 4.31281 7.46888 3.465 8.50931C2.75989 9.37462 2.30768 10.2804 1.94298 11.0108L1.93616 11.0245Z" 
            stroke="currentColor"
          />
          <path 
            d="M1.82733 0.743952C1.81724 0.724897 1.80725 0.706045 1.79737 0.687395L1.07113 1.10009C1.47071 1.85795 2.08884 3.02295 2.95135 4.04076C3.93204 5.19802 5.28171 6.23907 7.10039 6.4024L7.10039 5.54938C5.60391 5.39037 4.46167 4.52744 3.5778 3.48444C2.78071 2.54382 2.2355 1.51454 1.83418 0.756886L1.82733 0.743952Z" 
            stroke="currentColor"
          />
        </svg>
      </span>

      {/* Hover Block - Animated gradient border overlay */}
      <span className="button-hover-ring" aria-hidden="true" />
    </button>
  );
}