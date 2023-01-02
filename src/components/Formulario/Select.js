import React, {useContext} from 'react'
import {FormContext} from '../../context/FormularioContext'

function Select({children, className, name, id, input, small, datos}) {
  const {handleBlur, handleFocus, handleChange} = useContext(FormContext)
  return (
    <select
      className={`${className}`}
      name={`${name}`}
      id={`${id}`}
      ref={input}
      onChange={handleChange}
      onFocus={e => handleFocus(e, input)}
      onBlur={e => handleBlur(e, input, small)}
      // eslint-disable-next-line react/no-unknown-property
      datos={datos}
    >
      {children}
    </select>
  )
}
export default Select
