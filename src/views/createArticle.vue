<template>
    <navbarComp></navbarComp>
    <div class="create_container">
        <div class="create_title">
            <p>Crear una Publicación</p>
        </div>
        <form v-on:submit.prevent="createArticle()">
            <textarea name="" id="" cols="30" rows="5" placeholder="Contenido" v-model="content"></textarea>
            <input type="text" placeholder="URL Imagen" v-model="imageUrl">
            <button type="submit">Publicar</button>
        </form>
    </div>
</template>

<script>
//Componentes
import navbarComp from '../components/navbarComp.vue';

//Librerias
import axios from "axios";
import swal from "sweetalert";
import useVuelidate from "@vuelidate/core";

//Validaciones necesarias
import { required } from "@vuelidate/validators";

export default {
    components: {
        navbarComp
    },
    setup() {
        return {
            v$: useVuelidate(),
        };
    },
    data() {
        return {
            userData: JSON.parse(localStorage.getItem("userData")),
            content: null,
            imageUrl: null,
            headers: {API_KEY: localStorage.token}
        };
    },
    validations() {
        return {
            content: {
                required
            },
        };
    },
    methods : {
        async createArticle() {
            //Vuelidate
            this.v$.$touch();

            if (this.v$.$invalid) {
                swal("Error", "Todos los campos deben ser diligenciados", "error");
                return false;
            }

            const newArticle = {
                content : this.content,
                authorName : this.userData.name,
                authorId : this.userData._id,
                image : this.imageUrl
            }

            await axios
                .post(import.meta.env.VITE_API_ROUTE + "/article/save", newArticle, { headers: this.headers })
                .then(async (response) => {
                    if (response.status == 201) {
                        this.content = ""
                        this.imageUrl = ""
                        swal("Operación Exitosa", "La publicación se ha creado de forma correcta", "success");
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
