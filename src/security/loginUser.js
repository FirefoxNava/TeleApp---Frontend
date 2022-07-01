"use strict";

//Importaciones

import axios from "axios";

export async function loginUser(email, password) {
  //Creación Formulario
  var user = {
    email: email,
    password: password,
  };

  //Conexión Api
  //Verificación Usuario y Administrador

  return await axios
    .post(import.meta.env.VITE_API_ROUTE + "/user/login", user)
    .then((response) => {
      if (response.status == 201) {
        localStorage.rol = "user";
        localStorage.token = response.headers.api_key;
        const parsed = JSON.stringify(response.data.user);
        localStorage.userData = parsed;
        return true;
      } else return false;
    })
    .catch((error) => {
      //console.clear();
      switch (error) {
        case error.response:
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          break;
        case error.request:
          console.log(error.request);
          break;
        default:
          console.log("Error", error.message);
      }

      return false;
    });
}
