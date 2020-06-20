<template>
  <section class="container mt-5">
    <h1>Todos</h1>
    <template v-if="todos.errors.length > 0">
      <strong>Something Went wrong:</strong>
      <b-alert
        v-for="(error, index) in todos.errors"
        :key="index"
        variant="danger"
      ></b-alert>
    </template>
    <template v-if="todos.loading">
      <content-placeholders class="my-3 ">
        <content-placeholders-heading />
        <div class="todos mt-3">
          <content-placeholders-img
            v-for="(n, index) in 8"
            :key="index"
            class="todo"
          />
        </div>
      </content-placeholders>
    </template>
    <template v-else>
      <AddTodoForm />
      <FilterTofoAmout />
      <div class="legends mt-3">
        <div class="legend">
          <h5>Double click/tap toggle completion.</h5>
        </div>
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
          :header="
            `By: ${todos.users[todo.userId ? todo.userId - 1 : 5].username}`
          "
          class=""
          @dblclick="setToCompleted(todo)"
        >
          <b-card-text class="d-flex justify-content-between">
            {{ todo.title }}
            <div>
              <b-icon
                class="delete-icon"
                icon="trash-fill"
                color="danger"
                variant="danger"
                font-scale="1.5"
                @click="deleteTodo(todo.id)"
              ></b-icon>
            </div>
          </b-card-text>
        </b-card>
      </div>
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AddTodoForm from '~/components/partials/AddTodoForm'
import FilterTofoAmout from '~/components/partials/FilterTodoAmout'
export default {
  name: 'Todos',
  components: {
    AddTodoForm,
    FilterTofoAmout
  },
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
  methods: {
    deleteTodo(id) {
      this.$store.dispatch('todos/deleteSingleTodo', id)
    },
    setToCompleted(todo) {
      const updatedTodo = {
        id: todo.id,
        title: todo.title,
        completed: !todo.completed,
        userId: todo.userId
      }
      this.$store.dispatch('todos/updateTodo', updatedTodo)
    }
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

  @media screen and (max-width: 767px) {
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
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;

  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(2, 1fr);
  }

  .legend {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-self: center;

    &:first-child {
      @media screen and (max-width: 767px) {
        width: 100%;
      }
    }

    div {
      margin: auto 5px;
      height: 10px;
      width: 10px;
      align-self: center;
    }

    h5 {
      align-self: center;
      align-content: center;
    }
  }
}
</style>
