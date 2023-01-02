import { FormContext } from "../../context/FormularioContext";

function MyForm({
  children,
  formValues,
  handleChange,
  handleBlur,
  handleFocus,
  handleKeyUp,
  handleSubmit,
  handleClick,
  handleKeyDown,
  handleInput,
  isPass,
  isEmail,
  setErrorFor,
  setSuccessFor
}) {
  const valuesProvider = {
    formValues,
    handleChange,
    handleSubmit,
    handleBlur,
    handleKeyUp,
    handleClick,
    handleKeyDown,
    handleInput,
    handleFocus,
    isPass,
    isEmail,
    setErrorFor,
    setSuccessFor
  };
  const { Provider } = FormContext;
  return (
    <div className="container">
      <Provider value={valuesProvider}>{children}</Provider>
    </div>
  );
}

export default MyForm;
