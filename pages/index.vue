<template>
  <div class="container">
    <div class="mt-5">
      <h1 class="title">
        JsonPlaceHolder + Nuxt Frontend.
      </h1>
      <p class="subtitle">
        Consuming Json Placehosder to get interface that allows to:
      </p>
      <ul>
        <li>view a list of users</li>
        <li>Search a user by username</li>
        <li>Add a new user</li>
        <li>Edit an existing user</li>
        <li>Delete a user</li>
      </ul>
      <b-button to="/users" class="btn btn-info">Try it out</b-button>
    </div>

    <div class="mt-3">
      <h3>Notable technologies and libs used:</h3>
      <p>Nuxt.js to utilize universal mode for seo.</p>
      <p>Bootstrap vue for basic ui</p>
      <P>Axios for http requests.</P>
      <p>Vuex for some state management</p>
      <p>Dot Env to protect secrete data</p>
      <p>Vuelidate for form validation</p>
      <p>Lodash to utilize debounce for search</p>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  head() {
    return {
      title: 'Home',
      titleTemplate: '%s - Json Placeholder Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'An interface that allows to: View a list of users, search a user by username, add a new user, navigate to edit an existing user, delete a user.'
        }
      ]
    }
  }
}
</script>
