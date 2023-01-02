import { useState } from "react";
import {
  validateFile,
  setErrorFor,
  setSuccessFor,
  isPass,
  isEmail,
  telephoneCheck,
  validateFileEmpty,
  isPassSubmit,
  array,
  horario
} from "../utils/funciones";
import { registerApi } from "../api/user";
import { useAuth } from "../Hooks";

const withControlledForm = (Wrapped, initialState = {}) => {
  function ControlledForm() {
    const [formValues, setFormValues] = useState(initialState);
    const { login } = useAuth();
    window.addEventListener("load", function setAttr() {
      const d = new Date();
      let currDate = d.getDate();
      let currMonth = d.getMonth() + 1; // Months are zero based
      const fin = d.getMonth() + 1;
      let finMonth;
      let currYearFin;
      if (fin === 12) {
        finMonth = `0${d.getMonth() - 10}`;
        currYearFin = d.getFullYear() + 1;
      } else {
        finMonth = d.getMonth() + 2;
      }
      if (currMonth < 10) currMonth = `0${currMonth}`;
      if (currDate < 10) currDate = `0${currDate}`;

      const currYear = d.getFullYear();
      const d1 = `${currYear}-${currMonth}-${currDate}`;
      const d2 = `${currYearFin}-${finMonth}-${currDate}`;
      document.getElementById("date").setAttribute("min", d1);
      document.getElementById("date").setAttribute("max", d2);
    });
    let activeIndex = 0;
    let open = false;
    const Keys = {
      Backspace: "Backspace",
      Clear: "Clear",
      Down: "ArrowDown",
      End: "End",
      Enter: "Enter",
      Escape: "Escape",
      Home: "Home",
      Left: "ArrowLeft",
      PageDown: "PageDown",
      PageUp: "PageUp",
      Right: "ArrowRight",
      Space: " ",
      Tab: "Tab",
      Up: "ArrowUp"
    };
    const MenuActions = {
      Close: 0,
      CloseSelect: 1,
      First: 2,
      Last: 3,
      Next: 4,
      Open: 5,
      Previous: 6,
      Select: 7,
      Space: 8,
      Type: 9
    };
    // eslint-disable-next-line default-param-last
    function filterOptions(options = [], filter, exclude = []) {
      return options.filter((option) => {
        const matches =
          option.toLowerCase().indexOf(filter.toLowerCase()) === 0;
        return matches && exclude.indexOf(option) < 0;
      });
    }
    function updateMenuState(open, input, combo, callFocus = true) {
      // eslint-disable-next-line no-self-assign
      open = open;
      input.current.setAttribute("aria-expanded", `${open}`);
      // eslint-disable-next-line no-unused-expressions
      open
        ? combo.current.classList.add("open")
        : combo.current.classList.remove("open");
      // eslint-disable-next-line no-unused-expressions
      callFocus && input.current.focus();
    }
    function getActionFromKey(event, menuOpen, input, combo) {
      const { key, altKey, ctrlKey, metaKey } = event;

      // handle opening when closed
      if (
        !menuOpen &&
        (key === Keys.Down || key === Keys.Enter || key === Keys.Space)
      ) {
        return MenuActions.Open;
      }

      // handle keys when open
      if (key === Keys.Down) {
        return MenuActions.Next;
      }
      if (key === Keys.Up) {
        return MenuActions.Previous;
      }
      if (key === Keys.Home) {
        return MenuActions.First;
      }
      if (key === Keys.End) {
        return MenuActions.Last;
      }
      if (key === Keys.Escape) {
        return MenuActions.Close;
      }
      if (key === Keys.Enter) {
        if (open) {
          updateMenuState(false, input, combo, false);
        }
        return MenuActions.CloseSelect;
      }
      if (key === Keys.Space) {
        return MenuActions.Space;
      }
      if (
        key === Keys.Backspace ||
        key === Keys.Clear ||
        (key.length === 1 && !altKey && !ctrlKey && !metaKey)
      ) {
        return MenuActions.Type;
      }
    }

    function getUpdatedIndex(current, max, action) {
      switch (action) {
        case MenuActions.First:
          return 0;
        case MenuActions.Last:
          return max;
        case MenuActions.Previous:
          return Math.max(0, current - 1);
        case MenuActions.Next:
          return Math.min(max, current + 1);
        default:
          return current;
      }
    }
    function isScrollable(element) {
      return element && element.clientHeight < element.scrollHeight;
    }
    function maintainScrollVisibility(activeElement, scrollParent) {
      const { offsetHeight, offsetTop } = activeElement;
      const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

      const isAbove = offsetTop < scrollTop;
      const isBelow = offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

      if (isAbove) {
        scrollParent.scrollTo(0, offsetTop);
      } else if (isBelow) {
        scrollParent.scrollTo(0, offsetTop - parentOffsetHeight + offsetHeight);
      }
    }
    const PRODUCT_CART = "Productos";
    function getProducts() {
      const response = localStorage.getItem(PRODUCT_CART);
      return JSON.parse(response || "[]");
    }
    function addProduct(id) {
      const products = getProducts();
      products.push(id);
      localStorage.setItem(PRODUCT_CART, JSON.stringify(products));
    }
    /* function cleanProduct() {
      localStorage.removeItem(PRODUCT_CART);
    }*/
    function removeProduct(index) {
      const idProducts = getProducts();
      idProducts.splice(index, 1);
      localStorage.setItem(PRODUCT_CART, JSON.stringify(idProducts));
    }
    function removeOption(index, options, combo, input, selectedOptions) {
      // eslint-disable-next-line no-unused-vars
      const option = options[index];

      // update aria-selected
      const c = combo.current.querySelectorAll("[role=option]");
      c[index].setAttribute("aria-selected", "false");
      c[index].classList.remove("option-selected");

      // remove button
      const buttonEl = document.getElementById(
        `${input.current.id}-remove-${index}`
      );
      selectedOptions.current.removeChild(buttonEl.parentElement);
      removeProduct(index);
      const array = getProducts();
      setFormValues({ ...formValues, productos: array });
    }
    function selectOption(index, options, combo, input, selectedOptions) {
      const selected = options[index];
      activeIndex = index;

      // update aria-selected
      const c = combo.current.querySelectorAll("[role=option]");
      c[index].setAttribute("aria-selected", "true");
      c[index].classList.add("option-selected");

      // add remove option button
      const buttonEl = document.createElement("button");
      const listItem = document.createElement("li");
      buttonEl.className = "remove-option";
      buttonEl.type = "button";
      buttonEl.id = `${input.current.id}-remove-${index}`;
      buttonEl.setAttribute("aria-describedby", `${input.current.id}-remove`);
      buttonEl.addEventListener("click", () => {
        removeOption(index, options, combo, input, selectedOptions);
      });
      buttonEl.innerHTML = `${selected} `;

      listItem.appendChild(buttonEl);
      selectedOptions.current.appendChild(listItem);
      addProduct(listItem.innerText);
      const array = getProducts();
      setFormValues({ ...formValues, productos: array });
    }
    function onOptionChange(index, options, combo, input) {
      activeIndex = index;
      input.current.setAttribute(
        "aria-activedescendant",
        `${input.current.id}-${index}`
      );

      // update active style
      const c = combo.current.querySelectorAll("[role=option]");
      [...c].forEach((optionEl) => {
        optionEl.classList.remove("option-current");
      });
      c[index].classList.add("option-current");
      const listboxEl = combo.current.querySelector("[role=listbox]");
      if (open && isScrollable(listboxEl)) {
        maintainScrollVisibility(options[index], listboxEl);
      }
    }
    function updateOption(index, options, combo, input, selectedOptions) {
      const optionEl = combo.current.querySelectorAll("[role=option]")[index];
      const isSelected = optionEl.getAttribute("aria-selected") === "true";

      if (isSelected) {
        removeOption(index, options, combo, input, selectedOptions);
      } else {
        selectOption(index, options, combo, input, selectedOptions);
      }

      input.current.value = "";
    }
    function onOptionClick(index, options, combo, input, selectedOptions) {
      onOptionChange(index, options, combo, input, selectedOptions);
      updateOption(index, options, combo, input, selectedOptions);
      if (!open) {
        updateMenuState(false, input, combo, false);
      }
    }
    //eventos
    const handleClick = (e, options, input, combo, selectedOptions) => {
      if (e.target.name === "productos") {
        // eslint-disable-next-line array-callback-return
        options.map((option, index) => {
          const optionEl = document.createElement("div");
          optionEl.setAttribute("role", "option");
          optionEl.name = `${option}`;
          optionEl.id = `${input.current.id}-${index}`;
          optionEl.className =
            index === 0 ? "combo-option option-current" : "combo-option";
          optionEl.setAttribute("aria-selected", "false");
          optionEl.innerText = option;

          optionEl.addEventListener("click", () => {
            onOptionClick(index, options, combo, input, selectedOptions);
          });
          const listboxEl = combo.current.querySelector("[role=listbox]");
          listboxEl.appendChild(optionEl);
        });
        updateMenuState(true, input, combo);
      }
    };
    const handleKeyDown = (event, options, input, combo, selectedOptions) => {
      if (event.target.name === "productos") {
        // eslint-disable-next-line array-callback-return
        options.map((option, index) => {
          const optionEl = document.createElement("div");
          optionEl.setAttribute("role", "option");
          optionEl.name = `${option}`;
          optionEl.id = `${input.current.id}-${index}`;
          optionEl.className =
            index === 0 ? "combo-option option-current" : "combo-option";
          optionEl.setAttribute("aria-selected", "false");
          optionEl.innerText = option;

          optionEl.addEventListener("click", () => {
            onOptionClick(index, options, combo, input, selectedOptions);
          });
          const listboxEl = combo.current.querySelector("[role=listbox]");
          listboxEl.appendChild(optionEl);
        });
        const matches = filterOptions(options, event.target.value);
        const max = options.length - 1;

        open = true;
        if (event.target.value !== "") {
          updateMenuState(true, input, combo, false);
        }
        const action = getActionFromKey(event, open, input, combo);
        // eslint-disable-next-line default-case
        switch (action) {
          case MenuActions.Next:
          case MenuActions.Last:
          case MenuActions.First:
          case MenuActions.Previous:
            event.preventDefault();
            return onOptionChange(
              getUpdatedIndex(options.indexOf(matches[0]), max, action),
              options,
              combo,
              input,
              selectedOptions
            );
          case MenuActions.CloseSelect:
            event.preventDefault();
            return updateOption(
              options.indexOf(matches[0]),
              options,
              combo,
              input,
              selectedOptions
            );
          case MenuActions.Close:
            event.preventDefault();
            return updateMenuState(false, input, combo);
          case MenuActions.Open:
            return updateMenuState(true, input, combo);
        }
      }
    };
    const handleInput = (e, input, options, combo, selectedOptions) => {
      if (e.target.name === "productos") {
        // eslint-disable-next-line array-callback-return
        options.map((option, index) => {
          const optionEl = document.createElement("div");
          optionEl.setAttribute("role", "option");
          optionEl.name = `${option}`;
          optionEl.id = `${input.current.id}-${index}`;
          optionEl.className =
            index === 0 ? "combo-option option-current" : "combo-option";
          optionEl.setAttribute("aria-selected", "false");
          optionEl.innerText = option;
          optionEl.addEventListener("click", () => {
            onOptionClick(index, options, combo, input, selectedOptions);
          });

          const listboxEl = combo.current.querySelector("[role=listbox]");
          listboxEl.appendChild(optionEl);
        });
        const matches = filterOptions(options, e.target.value);
        const filterCurrentOption = matches.filter(
          (option) => option === options[activeIndex]
        );

        if (matches.length > 0 && !filterCurrentOption.length) {
          onOptionChange(
            options.indexOf(matches[0]),
            options,
            combo,
            input,
            selectedOptions
          );
        }

        const menuState = options.length > 0;
        if (open !== menuState) {
          updateMenuState(menuState, input, combo, false);
        }
      }
    };

    const handleChange = (e, input, small, span) => {
      if (e.target.name === "archivo") {
        if (validateFile(e, input, small)) {
          const file = URL.createObjectURL(e.target.files[0]);
          const image = `<img class="form__conteiner__img" id="img" src="${file}" alt="image">`;
          span.current.innerHTML = image;
          setFormValues({ ...formValues, [e.target.name]: e.target.files[0] });
        }
      } else {
        setFormValues({ ...formValues, [e.target.name]: e.target.value });
      }
    };
    const handleBlur = ({ target: { name } }, input, small) => {
      if (name === "correo") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no  estar vacio", small.current);
        } else if (!isEmail(input.current.value.trim())) {
          setErrorFor(input, "No ingreso un email válido", small.current);
        } else {
          setSuccessFor(input);
        }
      }
      if (name === "password") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no  estar vacio", small.current);
        } else {
          isPass(input, small);
        }
      }
      if (name === "categoria") {
        console.log(input.current.value);
        if (
          input.current.value <= 0 ||
          input.current.value === "Elige Una Categoria"
        ) {
          setErrorFor(input, "El campo no puede estar vacio", small);
        } else {
          setSuccessFor(input);
        }
      }
      if (name === "date") {
        if (input.current.value === "") {
          setErrorFor(input, "El acampo no puede estar vacio", small);
          return;
        }
        const validarFecha = array.filter(
          (fecha) => fecha.fecha === input.current.value
        );
        if (validarFecha.length > 2) {
          setErrorFor(input, "¡Fecha  no válida  esta agotada", small);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "hora") {
        if (input.current.value === "") {
          setErrorFor(input, "El acampo no puede estar vacio", small.current);
        } else {
          const min = "13:00";
          const max = "22:30";
          if (input.current.value < min) {
            setErrorFor(
              input,
              "Hora valida posterior 13:00 y antes de las 23:30",
              small.current
            );
            return;
          }
          if (input.current.value > max) {
            setErrorFor(input, "Hora permitida anterior 22:30", small.current);
            return;
          }
          if (!horario.includes(input.current.value)) {
            const valorHora = input.current.value.split(":");
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
              input,
              `Rango mas cercano valido es entre ${arrayRango[0]} y ${arrayRango[1]} `,
              small.current
            );
            return;
          }
          const coincidencias = [];
          // eslint-disable-next-line array-callback-return
          array.map((h) => {
            if (h.hora === input.current.value && h.fecha === formValues.date) {
              coincidencias.push(h.hora);
            }
          });
          if (coincidencias.length > 0) {
            setErrorFor(
              input,
              "La hora esta tomada para ese dia, coloque otra",
              small.current
            );
            return;
          }
          setSuccessFor(input);

          setSuccessFor(input);
        }
      }
      if (name === "nombre") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un nombre válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "apellidos") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un apellidos válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "rol") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un apellidos válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "tel") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
        } else {
          if (!telephoneCheck(input.current.value)) {
            setErrorFor(input, "No ingreso un telefono válido", small.current);
            return;
          }
          setSuccessFor(input);
        }
      }
    };
    const handleFocus = ({ target: { name } }, input) => {
      if (name === "correo") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "password") {
        if (input.current.value === "") {
          input.current.className = "focus__input";
        } else {
          input.current.className = "focus__input";
        }
      }
      if (name === "categoria") {
        if (input.current.value === "") {
          input.current.className = "focus__input";
        } else {
          input.current.className = "focus__input";
        }
      }
      if (name === "nombre") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "apellidos") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "rol") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "date") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "hora") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "tel") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
      if (name === "archivo") {
        if (input.current.value === "") {
          input.current.classList.add("focus__input");
        } else {
          input.current.classList.remove("from__input");
        }
      }
    };
    const handleKeyUp = ({ target: { name } }, input, small) => {
      if (name === "correo") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
        } else if (!isEmail(input.current.value.trim())) {
          setErrorFor(input, "No ingreso un email válido", small.current);
        } else {
          setSuccessFor(input);
        }
      }
      if (name === "password") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
        } else {
          isPass(input, small);
        }
      }

      if (name === "nombre") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un nombre válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "apellidos") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un apellidos válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "rol") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
          return;
        }
        if (input.current.value <= 2) {
          setErrorFor(input, "No ingreso un apellidos válido", small.current);
          return;
        }
        setSuccessFor(input);
      }
      if (name === "tel") {
        if (input.current.value === "") {
          setErrorFor(input, "El campo no puede estar vacio", small.current);
        } else {
          if (!telephoneCheck(input.current.value)) {
            setErrorFor(input, "No ingreso un telefono válido", small.current);
            return;
          }
          setSuccessFor(input);
        }
      }
    };
    const handleSubmit = (
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
    ) => {
      e.preventDefault();

      checkInputs();
      if (type === "Login") {
        if (isEmail(email.current.value.trim()) && isPassSubmit(password)) {
          const formData = new FormData();
          formData.append("correo", formValues.correo);
          formData.append("password", formValues.password);
          Autenticarse(formData);
          setFormValues({
            correo: "",
            password: ""
          });
          email.current.value = "";
          password.current.value = "";
          return;
        }
        return;
      }
      if (type === "RegistrarUsuario") {
        if (
          rol.current.value !== "" &&
          apellidos.current.value !== "" &&
          nombre.current.value !== "" &&
          validateFileEmpty(formValues, avatarUpload) &&
          isEmail(email.current.value.trim()) &&
          isPassSubmit(password)
        ) {
          const formData = new FormData();
          formData.append("nombre", formValues.nombre);
          formData.append("apellidos", formValues.apellidos);
          formData.append("rol", formValues.rol);
          formData.append("archivo", formValues.archivo);
          formData.append("correo", formValues.correo);
          formData.append("password", formValues.password);
          const Registrarse = async (formData) => {
            try {
              const response = await registerApi(formData);
              const spiner = document.createElement("i");
              spiner.classList.add("fa", "fa-spinner", "fa-spin");
              button.current.appendChild(spiner);
              if (!navigator.onLine) {
                console.log("No hay conexion");
                return;
              }
              if (response.err) {
                console.log("error");
              } else {
                const { token } = response;
                login(token);
              }
            } catch (error) {
              console.log("error catch");
            }
          };
          Registrarse(formData);
          setFormValues({
            correo: "",
            password: "",
            archivo: [],
            nombre: "",
            apellidos: "",
            rol: "USER_ROLE"
          });
          nombre.current.value = "";
          apellidos.current.value = "";
          rol.current.value = "";
          email.current.value = "";
          password.current.value = "";
          return;
        }
        return;
      }
    };
    return (
      <Wrapped
        formValues={formValues}
        handleChange={handleChange}
        handleBlur={handleBlur}
        handleFocus={handleFocus}
        handleKeyUp={handleKeyUp}
        handleSubmit={handleSubmit}
        handleClick={handleClick}
        handleKeyDown={handleKeyDown}
        handleInput={handleInput}
        setErrorFor={setErrorFor}
        setSuccessFor={setSuccessFor}
        isEmail={isEmail}
        isPass={isPass}
        array={array}
        horario={horario}
      />
    );
  }

  return ControlledForm;
};
export default withControlledForm;
