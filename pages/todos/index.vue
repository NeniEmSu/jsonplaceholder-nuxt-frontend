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
      <div class="legends">
        <div class="legend">
          <div class="bg-success"></div>
          <h5>Completed</h5>
        </div>
        <div class="legend">
          <div class="bg-secondary"></div>
          <h5>Uncompleted</h5>
        </div>
      </div>
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

          <div class="d-flex justify-content-around">
            <b-icon
              class="edit-icon"
              icon="pencil"
              font-scale="1.5"
              @click="editTodo(todo.id)"
            ></b-icon>

            <b-icon
              class="delete-icon"
              icon="trash-fill"
              color="danger"
              variant="danger"
              font-scale="1.5"
              @click="deleteUser(todo.id)"
            ></b-icon>
          </div>
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

  @media screen and (max-width: 573px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: 335px) {
    grid-template-columns: repeat(1, 1fr);
  }
}

.delete-icon,
.edit-icon {
  cursor: pointer;
}

.legends {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  .legend {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-content: center;
    div {
      margin: auto 5px;
      height: 10px;
      width: 10px;
      align-self: center;
    }
  }
}
</style>
