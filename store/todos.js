import axios from 'axios'
const URL = `${process.env.BACKEND_ENDPOINT}`

export const state = () => ({
  todos: [],
  users: [],
  errors: [],
  loading: false
})

export const actions = {
  async getAllTodos({ commit, dispatch }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${URL}/todos`)
      const data = await response.data
      await dispatch('getAuthors')
      commit('SET_TODOS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async deleteSingleTodo({ commit }, id) {
    try {
      await axios.delete(`${URL}/todos/${id}`)

      commit('REMOVE_DELETED_TODO', id)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async getAuthors({ commit }, state) {
    try {
      const response = await axios.get(`${URL}/users`)
      const data = await response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  }
}

export const mutations = {
  CLEAR_ERRORS(state, error) {
    state.errors = []
  },

  SET_ERRORS(state, error) {
    state.errors.push(error)
    state.loading = false
  },

  SET_LOADING(state) {
    state.loading = true
  },

  SET_TODOS(state, data) {
    state.todos = data
    state.loading = false
  },

  REMOVE_DELETED_TODO(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  },

  SET_USERS(state, data) {
    state.users = data
  }
}

export const getters = {}
