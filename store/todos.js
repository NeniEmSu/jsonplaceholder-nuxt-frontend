import axios from 'axios'
const URL = `${process.env.BACKEND_ENDPOINT}`
const config = {
  headers: {
    'Content-type': 'application/json; charset=UTF-8'
  }
}

export const state = () => ({
  todos: [],
  errors: [],
  loading: false
})

export const actions = {
  async getAllTodos({ commit, dispatch, rootState }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${URL}/todos`, config)
      const data = await response.data
      if (rootState.users.users.length <= 0) {
        await dispatch('users/getAllUsers', {}, { root: true })
      }
      commit('SET_TODOS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async getLimitedTodos({ commit }, amount) {
    try {
      const response = await axios.get(`${URL}/todos?_limit=${amount}`, config)
      const data = await response.data
      commit('SET_TODOS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async getSpecificUserTodos({ commit }, userId) {
    try {
      const response = await axios.get(`${URL}/todos?userId=${userId}`, config)
      const data = await response.data
      commit('SET_TODOS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async addTodo({ commit }, title) {
    try {
      const response = await axios.post(
        `${URL}/todos`,
        {
          title,
          userId: 4,
          completed: false
        },
        config
      )
      const data = await response.data
      commit('ADD_NEW_TODO', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async deleteSingleTodo({ commit }, id) {
    try {
      await axios.delete(`${URL}/todos/${id}`, config)

      commit('REMOVE_DELETED_TODO', id)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async updateTodo({ commit }, updatedTodo) {
    try {
      const response = await axios.put(
        `${URL}/todos/${updatedTodo.id}`,
        updatedTodo,
        config
      )
      const data = response.data
      // eslint-disable-next-line no-console
      console.log(data)

      commit('UPDATE_TODO', data)
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

  ADD_NEW_TODO(state, data) {
    state.todos.unshift(data)
  },

  UPDATE_TODO(state, updatedTodo) {
    const index = state.todos.findIndex((todo) => todo.id === updatedTodo.id)
    if (index !== -1) {
      state.todos.splice(index, 1, updatedTodo)
    }
  },

  REMOVE_DELETED_TODO(state, id) {
    state.todos = state.todos.filter((todo) => todo.id !== id)
  }
}

export const getters = {}
