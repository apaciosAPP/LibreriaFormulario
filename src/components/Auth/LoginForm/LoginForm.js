import { useRef, useContext } from "react";
import { toast } from "react-toastify";
import withControlledForm from "../../../HOC/withControlledForm";
import MyForm from "../../Formulario/MyForm";
import Button from "../../Formulario/Button";
import FormGroup from "../../Formulario/FormGroup.js";
import FormTitle from "../../Formulario/FormTitle";
import Formulario from "../../Formulario/Formulario";
import IconError from "../../Formulario/IconError";
import IconSuccess from "../../Formulario/IconSuccess";
import Input from "../../Formulario/Input";
import Label from "../../Formulario/Label";
import Message from "../../Formulario/Message";
import { AuthFormContext } from "../../../context/AuthFormContext";
import { loginApi } from "../../../api/user";
import { useAuth } from "../../../Hooks";
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
  const { login } = useAuth();
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
  const Autenticarse = async (formData) => {
    try {
      const response = await loginApi(formData);
      if (!navigator.onLine) {
        toast.error("Error de conexión, intente más tarde ");
        return;
      }
      if (response.err) {
        toast.error(response.err);
      } else {
        const { token } = response;
        login(token);
        toast.success(response.msg);
      }
    } catch (error) {
      console.log("error catch");
    }
  };
  const { showRegisterForm } = useContext(AuthFormContext);
  return (
    <MyForm
      showRegisterForm={showRegisterForm}
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
      <FormTitle className="container__header">LoginForm</FormTitle>
      <Formulario
        checkInputs={checkInputs}
        Autenticarse={Autenticarse}
        button={button}
        email={email}
        password={password}
        type="Login"
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
        <Button
          button={button}
          type="submit"
          className="form__button"
          go={showRegisterForm}
        >
          Registrarse
        </Button>
      </Formulario>
    </MyForm>
  );
}

export const LoginForm = withControlledForm(CompoundComponentPage, {
  correo: "",
  password: ""
});
