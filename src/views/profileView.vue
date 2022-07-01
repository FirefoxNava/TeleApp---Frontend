<template>
    <navbarComp></navbarComp>
    <commentsPopUpComp v-if="commentsPopUpState" :articleData="articleInfo" @disableCommentsPopUp="disableComments()"></commentsPopUpComp>
    <section class="profile_container">
        <div class="profile_picture">
            <img :src="userData.profilePicture" alt="Perfil">
        </div>
        <div class="profile_data">
            <p>{{userData.name}}</p>
            <svg enable-background="new 0 0 56 56" version="1.1" viewBox="0 0 56 56" xml:space="preserve" xmlns="http://www.w3.org/2000/svg">
                <path d="m28 0c-15.439 0-28 12.561-28 28s12.561 28 28 28 28-12.561 28-28-12.561-28-28-28zm12 41h-24c-1.104 0-2-0.896-2-2s0.896-2 2-2h24c1.104 0 2 0.896 2 2s-0.896 2-2 2zm0-11h-24c-1.104 0-2-0.896-2-2s0.896-2 2-2h24c1.104 0 2 0.896 2 2s-0.896 2-2 2zm0-11h-24c-1.104 0-2-0.896-2-2s0.896-2 2-2h24c1.104 0 2 0.896 2 2s-0.896 2-2 2z"/>
            </svg>
        </div>
    </section>
    <section class="home" v-if="articleState">
        <articleComp v-for="article in articles" :key="article._id" :articleData="article" @showCommentsPopUp="showComments"></articleComp>
    </section>
</template>

<script>
//Componentes
import navbarComp from '../components/navbarComp.vue';
import articleComp from '../components/articleComp.vue';
import commentsPopUpComp from '../components/commentsPopUpComp.vue';

//Librerias
import axios from "axios";
import swal from "sweetalert";

export default {
    components: {
        navbarComp,
        articleComp,
        commentsPopUpComp
    },
    data() {
        return {
            headers: {API_KEY: localStorage.token},
            userData: JSON.parse(localStorage.getItem("userData")),
            articles: null,
            articleState: false,
            commentsPopUpState: false,
            articleInfo: null
         };
    },
    methods: {
        async getArticles() {
            await axios
                .get(import.meta.env.VITE_API_ROUTE + "/article/articleAuthor/" + this.userData._id, {headers: this.headers,})
                .then((response) => {
                if (response.status == 200) {
                    this.articles = response.data.articles;
                    this.articleState = true
                }
                })
                .catch((error) => {
                swal("Operación Fallida", "Se ha generado un error al solicitar las publicaciones", "error");
                console.log(error);
                });
        },
        showComments(n) {
            this.commentsPopUpState = n[0]
            this.articleInfo = n[1]
        },
        disableComments() {
            this.commentsPopUpState = false
            this.articleInfo = null
        }
    },
    mounted() {
        this.getArticles()
    }
};
</script>

<style>
@import "../assets/css/style.css";
</style>
