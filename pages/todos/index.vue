<template>
  <section class="container mt-5">
    <h1>Todos</h1>
    <template v-if="todos.loading">
      <content-placeholders class="my-3 todos">
        <content-placeholders-img
          v-for="(n, index) in 8"
          :key="index"
          class="todo"
        />
      </content-placeholders>
    </template>
    <template v-else>
      <div class="todos mt-2">
        <b-card
          v-for="todo in todos.todos"
          :key="todo.id"
          :bg-variant="todo.completed ? 'success' : 'secondary'"
          text-variant="white"
          :header="`By: ${todos.users[todo.userId - 1].username}`"
          class="text-center"
        >
          <b-card-text>
            {{ todo.title }}
          </b-card-text>
        </b-card>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'Todos',
  data() {
    return {}
  },
  computed: {
    ...mapState(['todos'])
  },
  created() {
    this.$store.dispatch('todos/getAllTodos')
    // this.$store.dispatch('todos/getAuthors')
  },
  head() {
    return {
      title: 'Todos',
      titleTemplate: '%s - Json Placeholder Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'View a list of blogs, search a blog by blogname, add a new blog, navigate to edit an existing blog, delete a blog.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.todos {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}
</style>
