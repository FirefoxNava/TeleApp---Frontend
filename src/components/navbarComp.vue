<template>
  <nav>
        <div class="nav_title">
            <svg enable-background="new 0 0 32 32" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg"><path d="m26.87 12.49-10 18c-0.18 0.32-0.51 0.51-0.87 0.51-0.08 0-0.17-0.01-0.25-0.03-0.44-0.12-0.75-0.51-0.75-0.97v-11h-9c-0.34 0-0.65-0.17-0.84-0.45-0.18-0.28-0.21-0.64-0.08-0.95l7-16c0.16-0.36 0.52-0.6 0.92-0.6h6c0.33 0 0.64 0.16 0.83 0.44 0.18 0.27 0.22 0.62 0.1 0.93l-3.45 8.63h9.52c0.35 0 0.68 0.19 0.86 0.49 0.18 0.31 0.19 0.69 0.01 1z" fill="#FFB841"/></svg>
            <h2>TeleApp</h2>
        </div>
        <div class="nav_menu">
            <div class="nav_item">
                <p>Inicio</p>
            </div>
            <div class="nav_item">
                <p>Crear Publicación</p>
            </div>
            <div class="nav_item">
                <p>Perfil</p>
            </div>
            <div class="nav_item">
                <p>Cerrar Sesión</p>
            </div>
        </div>
    </nav>
</template>

<script>


export default {
  methods: {
    logOut() {
      localStorage.removeItem("rol");
      localStorage.removeItem("userData")
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
    goToCart() {
      this.$router.push("/cart");
    },
    goToOrders() {
      if (localStorage.rol == "user") {
        this.$router.push("/orders");
      } else {
        this.$router.push("/ordersAdmin");
      }
    },
    goToShop() {
      if (localStorage.rol == "user") {
        this.$router.push("/shop");
      } else {
        this.$router.push("/adminShop");
      }
    },
    goToHome() {
      if (localStorage.rol == "user") {
        this.$router.push("/home");
      } else {
        this.$router.push("/adminHome");
      }
    },
  },
};
</script>

<style>
@import "../assets/css/style.css";
</style>
