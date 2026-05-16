function Button({ children, variant = 'primary', onClick, href, target, rel, className = '' }) {
  const variantClass = variant === 'primary' ? 'btn-primary' : 'btn-secondary';
  const fullClassName = `${variantClass} ${className}`;
  
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={fullClassName}>
        {children}
      </a>
    );
  }
  
  return (
    <button onClick={onClick} className={fullClassName}>
      {children}
    </button>
  );
}

export default Button;