import { useRef, useContext } from "react";
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
  const avatarUpload = useRef(null);
  const span = useRef(null);
  const smallUpload = useRef(null);
  const nombre = useRef(null);
  const smallNombre = useRef(null);
  const rol = useRef(null);
  const smallRol = useRef(null);
  const email = useRef(null);
  const smallEmail = useRef(null);
  const apellidos = useRef(null);
  const smallApellidos = useRef(null);
  const password = useRef(null);
  const smallPass = useRef(null);

  const button = useRef(null);

  function checkInputs() {
    // trim to remove the whitespaces
    const nombreValue = nombre.current.value.trim();
    const apellidosValue = apellidos.current.value.trim();
    const rolValue = rol.current.value;
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
    if (nombreValue === "") {
      setErrorFor(
        nombre,
        "No puede dejar el email en blanco",
        smallNombre.current
      );
    } else {
      setSuccessFor(nombre);
    }
    if (apellidosValue === "") {
      setErrorFor(
        apellidos,
        "No puede dejar el email en blanco",
        smallApellidos.current
      );
    } else {
      setSuccessFor(apellidos);
    }
    if (rolValue === "") {
      setErrorFor(rol, "No puede dejar el email en blanco", smallRol.current);
    } else {
      setSuccessFor(rol);
    }
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
  const { showLoginForm } = useContext(AuthFormContext);
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
      <FormTitle className="container__header">RegisterForm</FormTitle>
      <Formulario
        checkInputs={checkInputs}
        button={button}
        email={email}
        password={password}
        nombre={nombre}
        apellidos={apellidos}
        rol={rol}
        span={span}
        avatarUpload={avatarUpload}
        type="RegistrarUsuario"
      >
        <FormGroup className="form__conteiner">
          <Label htmlFor="input" className="form__conteiner__upload">
            <span ref={span} id="span">
              Upload
            </span>
            <Input
              name="archivo"
              className="form__conteiner__input"
              input={avatarUpload}
              small={smallUpload}
              span={span}
              type="file"
              id="input"
            />
            <IconSuccess className="form__successicon" />
            <IconError className="form__erroricon" />
          </Label>
          <Message className="form__conteiner__message" small={smallUpload} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="nombre" className="form__label">
            Nombre
          </Label>
          <Input
            type="text"
            className="form__input form__username"
            name="nombre"
            id="nombre"
            input={nombre}
            small={smallNombre}
            placeholder="Ingrese el Nombre"
            autocomplete="off"
            datos={formValues.nombre}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallNombre} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="apellidos" className="form__label">
            Apellidos
          </Label>
          <Input
            type="text"
            className="form__input form__username"
            name="apellidos"
            id="apellidos"
            input={apellidos}
            small={smallApellidos}
            placeholder="Ingrese el apellidos"
            autocomplete="off"
            datos={formValues.apellidos}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallApellidos} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="rol" className="form__label">
            rol
          </Label>
          <Input
            type="text"
            className="form__input form__username"
            name="rol"
            id="rol"
            input={rol}
            small={smallRol}
            placeholder="Ingrese el rol"
            autocomplete="off"
            datos={formValues.rol}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallRol} />
        </FormGroup>
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
          go={showLoginForm}
        >
          Login
        </Button>
      </Formulario>
    </MyForm>
  );
}

export const RegisterForm = withControlledForm(CompoundComponentPage, {
  nombre: "",
  apellidos: "",
  correo: "",
  rol: "USER_ROLE",
  password: "",
  archivo: []
});
