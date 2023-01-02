function Option({children, value}) {
  return (
    <option value={value} className="form__input--option">
      {children}
    </option>
  )
}
export default Option
