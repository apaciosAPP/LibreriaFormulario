import React, { useContext } from "react";
import { FormContext } from "../../context/FormularioContext";

function Formulario({
  children,
  checkInputs,
  button,
  email,
  password,
  nombre,
  apellidos,
  rol,
  span,
  avatarUpload,
  type,
  Autenticarse
}) {
  const { handleSubmit } = useContext(FormContext);
  return (
    <form
      className="form"
      onSubmit={(e) =>
        handleSubmit(
          e,
          checkInputs,
          button,
          email,
          password,
          nombre,
          apellidos,
          rol,
          span,
          avatarUpload,
          type,
          Autenticarse
        )
      }
    >
      {children}
    </form>
  );
}
export default Formulario;
