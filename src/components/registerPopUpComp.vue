<template>
    <section class="register_back">
        <div class="register_container">
            <div class="register_title">
                <p>Registro</p>
                <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" @click="$emit('disableRegisterPopUp', false)">
                    <path d="M1.293 1.293a1 1 0 0 1 1.414 0L8 6.586l5.293-5.293a1 1 0 1 1 1.414 1.414L9.414 8l5.293 5.293a1 1 0 0 1-1.414 1.414L8 9.414l-5.293 5.293a1 1 0 0 1-1.414-1.414L6.586 8 1.293 2.707a1 1 0 0 1 0-1.414z"/>
                </svg>
            </div>
            <form v-on:submit.prevent="registerUser()">
                <input type="text" placeholder="Nombre" v-model="name">
                <input type="email" placeholder="Email" v-model="email">
                <input type="password" placeholder="Contraseña" v-model="password">
                <input type="password" placeholder="Confirmar contraseña" v-model="confirmPassword">
                <button type="submit">Registrarse</button>
            </form>
        </div>
    </section>
</template>

<script>

//Utilidades y Librerias
import axios from "axios";
import swal from "sweetalert";
import useVuelidate from "@vuelidate/core";

//Validaciones necesarias
import { required } from "@vuelidate/validators";

export default {
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            name: null,
            email: null,
            password: null,
            confirmPassword: null,
        };
    },
    validations() {
        return {
            name : {
                required
            },
            email: {
                required,
            },
            password: {
                required,
            },
        };
    },
    methods : {
        async registerUser() {
            //Vuelidate
            this.v$.$touch();

            if (this.v$.$invalid) {
                swal("Error", "Todos los campos deben ser diligenciados", "error");
                return false;
            }

            if (this.password != this.confirmPassword) {
                swal("Error", "Las contraseñas deben ser iguales", "error");
                return false;
            }

            const newUser = {
                name: this.name,
                email: this.email,
                password: this.password
            }

            await axios
                .post(import.meta.env.VITE_API_ROUTE + "/user/register", newUser)
                .then(async (response) => {
                    if (response.status == 201) {
                    swal("Operación Exitosa", "Te has registrado correctamente", "success");
                    this.$emit('disableRegisterPopUp', false)
                    }
                })
                .catch((error) => {
                    swal("Operación Fallida", "Se ha generado un error al intentar registrarte", "error");
                    console.log(error);
                });

            
        },
    }
};
</script>

<style>
@import "../assets/css/style.css";
</style>
