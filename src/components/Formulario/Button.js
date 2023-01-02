function Button({ children, button, type, className, go }) {
  return (
    <button
      ref={button}
      id="buttonSubmit"
      type={`${type}`}
      className={`${className}`}
      onClick={go}
    >
      {children}
    </button>
  );
}
export default Button;
