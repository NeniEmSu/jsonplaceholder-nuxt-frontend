import axios from 'axios'
const URL = `${process.env.BACKEND_ENDPOINT}`

export const state = () => ({
  todos: [],
  users: [],
  loading: false
})

export const actions = {
  async getAllTodos({ commit, dispatch }, context, state) {
    commit('SET_LOADING')
    const response = await axios.get(`${URL}/todos`)
    const data = await response.data
    await dispatch('getAuthors')
    commit('SET_TODOS', data)
  },

  async getAuthors({ commit }, state) {
    const response = await axios.get(`${URL}/users`)
    const data = await response.data
    commit('SET_USERS', data)
  }
}

export const mutations = {
  SET_LOADING(state) {
    state.loading = true
  },

  SET_TODOS(state, data) {
    state.todos = data
    state.loading = false
  },

  SET_USERS(state, data) {
    state.users = data
  }
}

export const getters = {}
