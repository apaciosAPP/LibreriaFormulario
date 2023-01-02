import React, { useRef } from "react";
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
import Option from "../components/Formulario/Option";
import Select from "../components/Formulario/Select";
import DropDown from "../components/Formulario/DropDown";
import { telephoneCheck } from "../utils/funciones";

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
  setSuccessFor,
  array,
  horario
}) {
  const email = useRef(null);
  const smallEmail = useRef(null);
  const password = useRef(null);
  const smallPass = useRef(null);
  const date = useRef(null);
  const smallDate = useRef(null);
  const hora = useRef(null);
  const smallHora = useRef(null);
  const button = useRef(null);
  const avatarUpload = useRef(null);
  const span = useRef(null);
  const smallUpload = useRef(null);
  const categoria = useRef(null);
  const smallCategoria = useRef(null);
  const tel = useRef(null);
  const smallTel = useRef(null);
  const usuario = useRef(null);
  const smallUsuario = useRef(null);
  const productos = useRef(null);
  const smallProductos = useRef(null);
  const selectedOptions = useRef(null);
  const combo = useRef(null);
  const comboList = useRef(null);

  const options = [
    "Apple",
    "Banana",
    "Blueberry",
    "Boysenberry",
    "Cherry",
    "Durian",
    "Eggplant",
    "Fig",
    "Grape",
    "Guava",
    "Huckleberry"
  ];
  function checkInputs() {
    // trim to remove the whitespaces
    const emailValue = email.current.value.trim();
    const passwordValue = password.current.value.trim();
    const avatarUploadValue = avatarUpload.current.value;

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
    if (
      categoria.current.value <= 0 ||
      categoria.current.value === "Elige Una Categoria"
    ) {
      setErrorFor(
        categoria,
        "No puede dejar el campo en blanco",
        smallCategoria.current
      );
    } else {
      setSuccessFor(categoria);
    }
    if (avatarUploadValue === "") {
      setErrorFor(avatarUpload, "El campo no puede estar vacio", smallUpload);
    } else {
      setSuccessFor(avatarUpload);
    }
    if (date.current.value === "") {
      setErrorFor(date, "El acampo no puede estar vacio", smallDate);
    } else {
      const validarFecha = array.filter(
        (fecha) => fecha.fecha === date.current.value
      );
      if (validarFecha.length > 2) {
        setErrorFor(date, "¡Fecha  no válida  esta agotada", smallDate);
        return;
      }
      setSuccessFor(date);
    }
    if (hora.current.value === "") {
      setErrorFor(hora, "El campo no puede estar vacio", smallHora.current);
    } else {
      const min = "13:00";
      const max = "22:30";
      if (hora.current.value < min) {
        setErrorFor(
          hora,
          "Hora valida posterior 13:00 y antes de las 23:30",
          smallHora.current
        );
      }
      if (hora.current.value > max) {
        setErrorFor(hora, "Hora permitida anterior 22:30", smallHora.current);
      }
      if (!horario.includes(hora.current.value)) {
        const valorHora = hora.current.value.split(":");
        let valorItemHorario;
        const arrayRango = [];
        // encontrar el rango mas cercano
        // eslint-disable-next-line array-callback-return
        horario.map((hora) => {
          valorItemHorario = hora.split(":");
          if (valorHora[0] === valorItemHorario[0]) {
            arrayRango.push(valorItemHorario);
          }
        });
        setErrorFor(
          hora,
          `Rango mas cercano valido es entre ${arrayRango[0]} y ${arrayRango[1]} `,
          smallHora.current
        );
      } else {
        const coincidencias = [];
        // eslint-disable-next-line array-callback-return
        array.map((h) => {
          if (h.hora === hora.current.value && h.fecha === formValues.date) {
            coincidencias.push(h.hora);
          }
        });
        if (coincidencias.length > 0) {
          setErrorFor(
            hora,
            "La hora esta tomada para ese dia, coloque otra",
            smallHora.current
          );
        } else {
          setSuccessFor(hora);
        }
        setSuccessFor(hora);
      }
    }
    if (usuario.current.name === "usuario") {
      if (usuario.current.value === "") {
        setErrorFor(
          usuario,
          "El campo no puede estar vacio",
          smallUsuario.current
        );
      } else {
        if (usuario.current.value <= 2) {
          setErrorFor(
            usuario,
            "No ingreso un nombre válido",
            smallUsuario.current
          );
        }
        setSuccessFor(usuario);
      }
    }
    if (productos.current.name === "productos") {
      if (formValues.productos.length <= 0) {
        while (comboList.current.firstChild) {
          comboList.current.removeChild(comboList.current.firstChild);
        }
        setErrorFor(
          productos,
          "El campo no puede estar vacio",
          smallProductos.current
        );
      } else {
        setSuccessFor(productos);
      }
    }
    if (tel.current.name === "tel") {
      if (tel.current.value === "") {
        setErrorFor(tel, "El campo no puede estar vacio", smallTel.current);
      } else {
        if (!telephoneCheck(tel.current.value)) {
          setErrorFor(tel, "No ingreso un telefono válido", smallTel.current);
        }
        setSuccessFor(tel);
      }
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
      array={array}
      horario={horario}
    >
      <FormTitle className="container__header">Formulario</FormTitle>
      <Formulario
        // eslint-disable-next-line react/jsx-no-bind
        checkInputs={checkInputs}
        button={button}
        email={email}
        password={password}
        span={span}
        avatarUpload={avatarUpload}
        categoria={categoria}
        date={date}
        hora={hora}
        tel={tel}
      >
        <FormGroup className="form__conteiner">
          <Label htmlFor="input" className="form__conteiner__upload">
            <span ref={span} id="span">
              Upload
            </span>
            <Input
              name="avatarUpload"
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
          <Select
            className="form__input"
            name="categoria"
            id="categoria"
            input={categoria}
            small={smallCategoria}
            datos={formValues.categoria}
          >
            <Option>Elige Una Categoria</Option>
            <Option value="pdf">PDF</Option>
            <Option value="pdf">PDF</Option>
            <Option value="pdf">PDF</Option>
          </Select>
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallCategoria} />
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
          <Label htmlFor="date" className="form__label">
            Fecha
          </Label>
          <Input
            type="date"
            className="form__input form__username"
            name="date"
            id="date"
            input={date}
            small={smallDate}
            autocomplete="off"
            datos={formValues.date}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallDate} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="hora" className="form__label">
            Hora
          </Label>
          <Input
            type="time"
            className="form__input"
            name="hora"
            id="hora"
            input={hora}
            small={smallHora}
            autocomplete="off"
            datos={formValues.hora}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallHora} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="usuario" className="form__label">
            Usuario
          </Label>
          <Input
            type="text"
            className="form__input"
            name="usuario"
            id="usuario"
            input={usuario}
            small={smallUsuario}
            placeholder="Ingrese el Usuario"
            autocomplete="off"
            datos={formValues.usuario}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallUsuario} />
        </FormGroup>
        <FormGroup className="form__group">
          <Label htmlFor="tel" className="form__label">
            tel
          </Label>
          <Input
            type="text"
            className="form__input"
            name="tel"
            id="tel"
            input={tel}
            small={smallTel}
            placeholder="Ingrese el Usuario"
            autocomplete="off"
            datos={formValues.tel}
          />
          <IconSuccess className="form__successicon" />
          <IconError className="form__erroricon" />
          <Message className="form__message" small={smallTel} />
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
        <FormGroup className="form__group">
          <DropDown
            selectedOptions={selectedOptions}
            combo={combo}
            comboList={comboList}
            options={options}
          >
            <Input
              type="productos"
              className="combo-input"
              name="productos"
              id="productos"
              input={productos}
              comboList={comboList}
              selectedOptions={selectedOptions}
              small={smallProductos}
              placeholder="Ingrese el Producto"
              autocomplete="off"
              options={options}
              combo={combo}
            />
            <IconSuccess className="form__successicon" />
            <IconError className="form__erroricon" />
            <Message className="form__message" small={smallProductos} />
          </DropDown>
        </FormGroup>
        <Button button={button} type="submit" className="form__button">
          Submit
        </Button>
      </Formulario>
    </MyForm>
  );
}

const MyFormAControlled = withControlledForm(CompoundComponentPage, {
  correo: "",
  password: ""
});
export default MyFormAControlled;
