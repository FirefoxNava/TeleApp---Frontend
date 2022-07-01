<template>
    <navbarComp></navbarComp>
    <commentsPopUpComp v-if="commentsPopUpState" :articleData="articleInfo" @disableCommentsPopUp="disableComments()"></commentsPopUpComp>
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
            articles: null,
            articleState: false,
            commentsPopUpState: false,
            articleInfo: null
        };
    },
    methods: {
        async getArticles() {
            await axios
                .get(import.meta.env.VITE_API_ROUTE + "/article/articles", {headers: this.headers,})
                .then((response) => {
                if (response.status == 200) {
                    this.articles = response.data.articles;
                    console.log(this.articles)
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
