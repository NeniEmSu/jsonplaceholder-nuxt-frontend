import axios from 'axios'
const BACKEND_ENDPOINT = `${process.env.BACKEND_ENDPOINT}`

export const state = () => ({
  users: [],
  errors: [],
  loading: false
})

export const actions = {
  async getAllUsers({ commit, dispatch }, context, state) {
    try {
      commit('SET_LOADING')
      commit('CLEAR_ERRORS')
      const response = await axios.get(`${BACKEND_ENDPOINT}/users`)
      const data = await response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
      this.$swal('Error', error, 'error')
    }
  },

  async getLimitedUsers({ commit }, amount) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/users?_limit=${amount}`)
      const data = await response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async getAuthors({ commit }, state) {
    try {
      const response = await axios.get(`${BACKEND_ENDPOINT}/users`)
      const data = await response.data
      commit('SET_USERS', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async addUser({ commit }, title) {
    try {
      const response = await axios.post(`${BACKEND_ENDPOINT}/users`, {
        title,
        userId: 4,
        completed: false
      })
      const data = await response.data
      commit('ADD_NEW_USER', data)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async deleteSingleUser({ commit }, id) {
    try {
      await axios.delete(`${BACKEND_ENDPOINT}/users/${id}`)

      commit('REMOVE_DELETED_USER', id)
    } catch (error) {
      commit('SET_ERRORS', error)
    }
  },

  async updateUser({ commit }, updatedUser) {
    try {
      await axios.put(`${BACKEND_ENDPOINT}/users/${updatedUser.id}`)

      commit('UPDATE_USER', updatedUser)
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

  SET_USERS(state, data) {
    state.users = data
    state.loading = false
  },

  ADD_NEW_USER(state, data) {
    state.users.unshift(data)
  },

  UPDATE_USER(state, updatedUser) {
    const index = state.users.findIndex((todo) => todo.id === updatedUser.id)
    if (index !== -1) {
      state.users.splice(index, 1, updatedUser)
    }
  },

  REMOVE_DELETED_USER(state, id) {
    state.users = state.users.filter((todo) => todo.id !== id)
  }
}

export const getters = {
  getAuthorById: (state) => (id) => {
    return state.users.find((user) => user.id === id)
  }
}
