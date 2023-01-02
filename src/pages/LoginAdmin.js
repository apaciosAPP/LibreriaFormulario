import { useRef } from "react";
import withControlledForm from "../HOC/withControlledForm";
import MyForm from "../components/Formulario/MyForm";
import Button from "../components/Formulario/Button";
import FormGroup from "../components/Formulario/FormGroup.js";
import FormTitle from "../components/Formulario/FormTitle";
import Formulario from "../components/Formulario/Formulario";
import IconError from "../components/Formulario/IconError";
import IconSuccess from "../components/Formulario/IconSuccess";
import Input from "../components/Formulario/Input";
import Label from "../components/Formulario/Label";
import Message from "../components/Formulario/Message";

function CompoundComponentPage({
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
}) {
  const email = useRef(null);
  const smallEmail = useRef(null);
  const password = useRef(null);
  const smallPass = useRef(null);

  const button = useRef(null);

  function checkInputs() {
    // trim to remove the whitespaces
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();

    if (emailValue === "") {
      setErrorFor(
        email,
        "No puede dejar el email en blanco",
        smallEmail.current
      );
    } else if (!isEmail(emailValue)) {
      setErrorFor(email, "No ingreso un email válido", smallEmail.current);
    } else {
      setSuccessFor(email);
    }
    if (passwordValue === "") {
      setErrorFor(
        password,
        "Password no debe ingresar en blanco.",
        smallPass.current
      );
    } else {
      isPass(password);
    }
  }
  return (
    <MyForm
      formValues={formValues}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handleBlur={handleBlur}
      handleKeyUp={handleKeyUp}
      handleClick={handleClick}
      handleKeyDown={handleKeyDown}
      handleInput={handleInput}
      setErrorFor={setErrorFor}
      setSuccessFor={setSuccessFor}
      isEmail={isEmail}
      isPass={isPass}
      handleFocus={handleFocus}
    >
      <FormTitle className="container__header">Formulario</FormTitle>
      <Formulario
        // eslint-disable-next-line react/jsx-no-bind
        checkInputs={checkInputs}
        button={button}
        email={email}
        password={password}
      >
        <FormGroup className="form__group">
          <Label htmlFor="correo" className="form__label">
            Correo
          </Label>
          <Input
            type="email"
            className="form__input form__username"
            name="correo"
            id="correo"
            input={email}
            small={smallEmail}
            placeholder="Ingrese el Email"
            autocomplete="off"
            datos={formValues.correo}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallEmail} />
        </FormGroup>

        <FormGroup className="form__group">
          <Label htmlFor="correo" className="form__label">
            Password
          </Label>
          <Input
            type="password"
            className="form__input"
            name="password"
            id="password"
            input={password}
            small={smallPass}
            placeholder="Ingrese el Email"
            autocomplete="off"
            datos={formValues.password}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallPass} />
        </FormGroup>

        <Button button={button} type="submit" className="form__button">
          Submit
        </Button>
      </Formulario>
    </MyForm>
  );
}

export const LoginAdmin = withControlledForm(CompoundComponentPage, {
  correo: "",
  password: ""
});
