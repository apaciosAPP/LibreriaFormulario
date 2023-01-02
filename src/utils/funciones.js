export const array = [
  {
    nombre: "Juan",
    comenzales: 4,
    fecha: "2022-12-24",
    hora: "13:30"
  },
  {
    nombre: "Carlos",
    comenzales: 4,
    fecha: "2022-12-24",
    hora: "14:00"
  },
  {
    nombre: "Manuel",
    comenzales: 4,
    fecha: "2022-12-24",
    hora: "15:00"
  },
  {
    nombre: "Alejandro",
    comenzales: 4,
    fecha: "2022-12-25",
    hora: "15:30"
  }
];
export const horario = [
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "15:00",
  "15:30",
  "16:00",
  "16:30",
  "17:00",
  "17:30",
  "18:00",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
  "22:30"
];

export function validateFile(e, input, small) {
  const allowedExtensions = ["jpg", "jpeg", "png"];
  const sizeLimit = 1000000; // 1 megabyte

  const { name: fileName, size: fileSize } = e.target.files[0];
  const fileExtension = fileName.split(".").pop();

  if (!allowedExtensions.includes(fileExtension)) {
    setErrorFor(
      input,
      "Por favor las extensines permitidas son: jpg, jpeg, png",
      small
    );
    return false;
  }
  if (fileSize > sizeLimit) {
    setErrorFor(input, "El archivo es demasiado grande", small);
    return false;
  }
  setSuccessFor(input, small);
  return true;
}
export function setErrorFor(input, message, small) {
  const formControl = input.current.parentElement;
  formControl.classList.remove("form__success");
  formControl.classList.add("form__error");
  small.innerHTML = message;
  if (input.current.name === "avatarUpload") {
    formControl.style.border = "1px solid #e74c3c";
    small.current.innerHTML = message;
  }
  if (input.current.name === "categoria") {
    input.current.style.border = "1px solid #e74c3c";
  }
  if (input.current.name === "date") {
    small.current.innerHTML = message;
  }
}
export function setSuccessFor(input) {
  const formControl = input.current.parentElement;
  formControl.classList.remove("form__error");
  formControl.classList.add("form__success");
  if (input.current.name === "avatarUpload") {
    formControl.style.border = "1px solid #2ecc71";
  }
  if (input.current.name === "categoria") {
    input.current.style.border = "1px solid #2ecc71";
  }
}
export function isPass(password, small) {
  const isLowerCase = /(?=[a-z])/.test(password.current.value);
  const isUpperCase = /(?=[A-Z])/.test(password.current.value);
  const isNumber = /(?=\d)/.test(password.current.value);
  const isSpecialChar = /(?=\W)/.test(password.current.value);
  const isLongEnough = /.{8,}/.test(password.current.value);

  if (!isNumber) {
    setErrorForPass(password, "El campo debe contener Numeros", small.current);
    return;
  }
  setSuccessForPass(password);

  if (!isLowerCase) {
    setErrorForPass(password, "El campo debe contener mnuscula", small.current);
    return;
  }
  setSuccessForPass(password);

  if (!isUpperCase) {
    setErrorForPass(
      password,
      "El Campo debe Contener Mayusculas",
      small.current
    );
    return;
  }
  setSuccessForPass(password);

  if (!isSpecialChar) {
    setErrorForPass(
      password,
      "El campo debe contener caracteres Especiales",
      small.current
    );
    return;
  }
  setSuccessForPass(password);

  if (!isLongEnough) {
    setErrorForPass(
      password,
      "El campo debe contener mas de 8 caracteres",
      small.current
    );
  } else {
    setSuccessForPass(password);
  }
}
// eslint-disable-next-line prettier/prettier

export function isEmail(email) {
  return /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(
    email
  );
}
export function telephoneCheck(str) {
  const REGEXFIJO = /(\+34|0034|34)?[ -]*(8|9)[ -]*([0-9][ -]*){8}/;
  const REGEXMOVIL = /(\+34|0034|34)?[ -]*(6|7)[ -]*([0-9][ -]*){8}/;
  return REGEXMOVIL.test(str) || REGEXFIJO.test(str);
}
export function setErrorForPass(input, message, small) {
  const formControl = input.current.parentElement;
  formControl.classList.remove("form__success");
  formControl.classList.add("form__error");
  small.innerHTML = message;
}
export function setSuccessForPass(input) {
  const formControl = input.current.parentElement;
  formControl.classList.remove("form__error");
  formControl.classList.add("form__success");
}
/* submit */

export function validateFileEmpty(formValues) {
  if (formValues.archivo.length === 0) {
    return false;
  }
  return true;
}
export function isPassSubmit(password) {
  const isLowerCase = /(?=[a-z])/.test(password.current.value);
  const isUpperCase = /(?=[A-Z])/.test(password.current.value);
  const isNumber = /(?=\d)/.test(password.current.value);
  const isSpecialChar = /(?=\W)/.test(password.current.value);
  const isLongEnough = /.{8,}/.test(password.current.value);
  if (!isLowerCase) {
    return false;
  }
  if (!isUpperCase) {
    return;
  }
  if (!isNumber) {
    return false;
  }
  if (!isSpecialChar) {
    return;
  }
  if (!isLongEnough) {
    return false;
  }
  return true;
}
export function validarTelefono(tel) {
  if (tel === "") {
    return false;
  }
  if (!telephoneCheck(tel)) {
    return false;
  }
  return true;
}
export function validarDate(date) {
  if (date === "") {
    return false;
  }
  const validarFecha = array.filter((fecha) => fecha.fecha === date);
  if (validarFecha.length > 2) {
    return false;
  }
  return true;
}
export function validarHora(hora) {
  if (hora === "") {
    return false;
  }
  const min = "13:00";
  const max = "22:30";
  if (hora < min) {
    return false;
  }
  if (hora > max) {
    return false;
  }
  if (!horario.includes(hora)) {
    const valorHora = hora.split(":");
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
    return false;
  }

  return true;
}
export function validarComensales(comensales) {
  if (comensales === "") {
    return false;
  }
  return true;
}
