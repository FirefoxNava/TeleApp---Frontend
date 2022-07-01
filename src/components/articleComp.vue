<template>
    <div class="article">
            <div class="article_author">
                <a>{{ articleData.authorName }}</a>
                <p>{{ dateTime(articleData.date) }}</p>
            </div>
            <p>{{ articleData.content }}</p>
            <img :src=" articleData.image " alt="Imagen">
            <button>
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <title>comment</title>
                    <path class="cls-1" d="M21.5,8v6A4.505,4.505,0,0,1,17,18.5H6.829a1.491,1.491,0,0,0-1.061.439L3.354,21.354A.5.5,0,0,1,3,21.5a.512.512,0,0,1-.191-.038A.5.5,0,0,1,2.5,21V8A4.505,4.505,0,0,1,7,3.5H17A4.505,4.505,0,0,1,21.5,8Z" data-name="comment-Filled"/>
                </svg>
                <p @click="$emit('showCommentsPopUp', [true, articleData])">Comentar</p>
            </button>
    </div>
</template>

<script>

//Librerias
import moment from "moment/min/moment-with-locales";

export default {
    props: ["articleData"],
    methods: {
        dateTime(value) {
            return moment(value).locale("es").format("dddd DD [de] MMMM [de] YYYY");
        },
    },
};
</script>

<style>
@import "../assets/css/style.css";
</style>
