<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/"
        ><b-img
          fluid
          class=" img-thumbnail"
          src="https://raw.githubusercontent.com/typicode/jsonplaceholder/master/public/favicon.ico"
        ></b-img>
        +
        <b-img
          width="26px"
          fluid
          class=" img-thumbnail"
          src="https://nuxtjs.org/logos/nuxt-icon.png"
        ></b-img>

        Frontend</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/">Home</b-nav-item>
          <b-nav-item to="/todos">Todos</b-nav-item>
          <b-nav-item to="/blogs">Blogs</b-nav-item>
          <b-nav-item to="/users">Users</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<style lang="scss" scoped>
.navbar-dark .navbar-nav .nav-link .nuxt-link-exact-active {
  color: rgba(255, 255, 255, 1) !important;
}
</style>
