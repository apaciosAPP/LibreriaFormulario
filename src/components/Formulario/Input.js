import React, {useContext} from 'react'
import {FormContext} from '../../context/FormularioContext'

function Input({
  type,
  className,
  name,
  id,
  placeholder,
  autocomplete,
  input,
  comboList,
  small,
  span,
  datos,
  options,
  combo,
  selectedOptions,
}) {
  const {
    handleBlur,
    handleFocus,
    handleChange,
    handleKeyUp,
    handleClick,
    handleInput,
    handleKeyDown,
  } = useContext(FormContext)

  return (
    <input
      type={`${type}`}
      className={`${className}`}
      name={`${name}`}
      id={`${id}`}
      aria-activedescendant=""
      aria-autocomplete="none"
      aria-controls="listbox3"
      aria-expanded="false"
      aria-haspopup="listbox"
      aria-labelledby="combo3-label combo3-selected"
      role="combobox"
      ref={input}
      placeholder={`${placeholder}`}
      autoComplete={`${autocomplete}`}
      onFocus={e => handleFocus(e, input)}
      onBlur={e => handleBlur(e, input, small, comboList)}
      onChange={e =>
        handleChange(
          e,
          input,
          small,
          span,
          options,
          comboList,
          combo,
          selectedOptions,
        )
      }
      onInput={e => handleInput(e, input, options, combo, selectedOptions)}
      onKeyUp={e => handleKeyUp(e, input, small)}
      onClick={e => handleClick(e, options, input, combo, selectedOptions)}
      onKeyDown={e => handleKeyDown(e, options, input, combo, selectedOptions)}
      value={datos}
    />
  )
}

export default Input
