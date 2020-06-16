<template>
  <b-navbar toggleable="sm" type="dark" variant="dark">
    <b-container>
      <b-navbar-brand to="/"
        ><b-img src="https://edicasoft.com/static/public/favicon.ico"></b-img>
        Test Task</b-navbar-brand
      >
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item to="/todos">Todos</b-nav-item>
          <b-nav-item to="/blogs">Blogs</b-nav-item>
          <b-nav-item to="/users">Users</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>
