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
      <FilterTodoAmout />
      <FilterTodoByUser />
      <div class="legends mt-3">
        <div class="legend">
          <h6>Click/tap todo text to edit.</h6>
        </div>
        <div class="legend">
          <h6>Double click/tap toggle completion.</h6>
        </div>
        <div class="legend">
          <div class="bg-success"></div>
          <h6>Completed</h6>
        </div>
        <div class="legend">
          <div class="bg-secondary"></div>
          <h6>Uncompleted</h6>
        </div>
      </div>
      <template v-if="todos.todos.length === 0">
        <div class="text-center my-5">
          <p>
            Unfortunately no Todos match your current query, try adding one or
            consider trying another query parameter.
          </p>
        </div>
      </template>
      <template v-else>
        <div class="todos mt-2">
          <b-card
            v-for="(todo, index) in todos.todos"
            :key="todo.id"
            :bg-variant="todo.completed ? 'success' : 'secondary'"
            text-variant="white"
            :header="`By: ${users[todo.userId - 1].username}`"
            class=""
            @dblclick="setToCompleted(todo)"
          >
            <b-form-group
              v-if="updating.value === true && updating.number === index"
              label="Edit the Title:"
              label-for="edit-title"
            >
              <b-form-input
                id="edit-title"
                v-model="title"
                type="text"
                @keyup.enter="updateTodoTitle(todo)"
              ></b-form-input>
              <small id="edit-titile-form-helper"
                >Edit text & then click enter to update.</small
              >
            </b-form-group>

            <b-card-text v-else class="d-flex justify-content-between">
              <p class="todo-text" @click="selectTodoToUpdate(todo)">
                {{ todo.title }}
              </p>

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
    </template>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import AddTodoForm from '~/components/partials/AddTodoForm'
import FilterTodoAmout from '~/components/partials/FilterTodoAmout'
import FilterTodoByUser from '~/components/partials/FilterTodoByUser'
export default {
  name: 'Todos',
  components: {
    AddTodoForm,
    FilterTodoAmout,
    FilterTodoByUser
  },
  data() {
    return {
      title: null,
      updating: { value: false, number: null }
    }
  },
  computed: {
    ...mapState(['todos']),
    users() {
      return this.$store.state.users.users
    }
  },
  created() {
    this.$store.dispatch('todos/getAllTodos')
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
    },
    selectTodoToUpdate(specificTodo) {
      const index = this.todos.todos.findIndex(
        (todo) => todo.id === specificTodo.id
      )
      this.title = specificTodo.title
      this.updating.value = true
      this.updating.number = index
    },
    async updateTodoTitle(todo) {
      const updatedTodo = {
        id: todo.id,
        title: this.title,
        completed: todo.completed,
        userId: todo.userId
      }
      await this.$store.dispatch('todos/updateTodo', updatedTodo)
      this.updating.value = false
      this.updating.number = null
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
.todo-text {
  cursor: pointer;
}

.legends {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;

  .legend {
    display: flex;
    justify-content: center;
    justify-items: center;
    align-self: center;

    // &:first-child {
    //   @media screen and (max-width: 767px) {
    //     width: 100%;
    //   }
    // }

    div {
      margin: auto 5px;
      height: 8px;
      width: 8px;
    }

    h5 {
      align-self: center;
      align-content: center;
    }
  }
}
</style>
