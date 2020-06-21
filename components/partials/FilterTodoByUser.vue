<template>
  <b-input-group class="mt-3">
    <b-input-group-prepend is-text>
      <b-icon icon="filter" font-scale="1.5"> </b-icon>
    </b-input-group-prepend>
    <b-form-select
      v-model="selected"
      :options="options"
      @change="filterTodo"
    ></b-form-select>
  </b-input-group>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      defaultOptions: [
        {
          value: null,
          disabled: true,
          text: "Please select username to todos you'd like to filter"
        },
        { value: 0, text: 'All' }
      ]
    }
  },
  computed: {
    users() {
      return this.$store.state.users.users
    },
    options() {
      return this.defaultOptions.concat(
        this.users.map((user) => {
          return { value: user.id, text: user.username }
        })
      )
    }
  },
  methods: {
    filterTodo() {
      if (this.selected === 0) return this.$store.dispatch('todos/getAllTodos')
      this.$store.dispatch('todos/getSpecificUserTodos', this.selected)
    }
  }
}
</script>
