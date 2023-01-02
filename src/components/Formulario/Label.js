function Label({children, htmlFor, className, id}) {
  return (
    <div className="form_conteiner">
      <label htmlFor={`${htmlFor}`} className={`${className}`} id={`${id}`}>
        {children}
      </label>
    </div>
  )
}
export default Label
