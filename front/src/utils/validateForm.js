export const validateChangePassword = (values) => {
  let errors = {};
  if (!values.password || !values.confirmPassword) {
    errors.password = "Ambos campos son obligatorios";
  } else if (values.password.length < 8 || values.confirmPassword.length < 8) {
    errors.password = "Su contraseña necesita un mínimo de 8 caracteres";
  } else if (values.password !== values.confirmPassword) {
    errors.password = "Las contraseñas deben ser iguales";
  }
  return errors;
};

export const validateEmail = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "Debe ingresar un correo";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }
  return errors;
};

export const validateLogin = (values) => {
  let errors = {};
  if (!values.email) {
    errors.email = "El email es obligatorio";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "El email no es válido";
  }
  if (!values.password) {
    errors.password = "La contraseña es obligatoria";
  } else if (values.password.length < 8) {
    errors.password = "Su contraseña debe poseer 8 caracteres";
  }
  return errors;
};

export const validateRegister = (values) => {
  let errors = {};
  if (values.email.trim() === ""){errors.email = "El email no puede estar vacio"} 
  else if(values.password.trim() === ""){errors.email = "La contraseña no puede estar vacia"} 
  else if(values.confirmPassword.trim() === ""){errors.confirmPassword = "La confirmación de contraseña no puede estar vacia"}
  else if(values.email.trim().length > 30 ) {errors.email = "El email no puede superar los 30 caracteres"}
  else if(values.password.trim().length < 8 || values.password.trim().length > 30 ) {errors.password = "La contraseña debe tener entre 8 y 30 caracteres"}
  else if(values.confirmPassword.trim().length < 8 || values.confirmPassword.trim().length > 30 ) {errors.confirmPassword = "La confirmación de contraseña debe tener entre 8 y 30 caracteres"}
  
  else if(values.password.trim() !== values.confirmPassword.trim()){
    errors.confirmPassword=("La contraseña y su confirmación no coinciden");
  }
  return errors;
};

export const validateProject = (values) => {
  let errors = {};
  if (values.title.trim() === ""){errors.title = "El título no puede estar vacio"} 
  
  return errors;
};

export const validateMeeting = (values) => {
  let errors = {};
  if(values.initHourOfDaily.trim()==="") { errors.initHourOfDaily = "Se debe seleccionar una hora" }
  return errors;
};

export const validateOrganization = (values) => {
  let errors = {};
  if(values.organization.trim() === '') {
    errors.organization = 'El nombre de su organización es obligatorio';
  } else if (values.organization.length < 3) {
    errors.organization = 'El nombre de su organización debe poseer más de tres caracteres';
  } else if (/^[0-9]*$/gm.test(values.organization)) {
    errors.organization = 'El nombre de su organización debe poseer al menos una letra';
  } else if (/[,.=#!_?<>'"*+¿/;`%]/.test(values.organization)) {
    errors.organization = 'No se permite añadir caracteres extraños';
  }
  return errors
}
