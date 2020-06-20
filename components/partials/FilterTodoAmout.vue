<template>
  <div>
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="filter" font-scale="1.5"> </b-icon>
      </b-input-group-prepend>
      <b-form-select
        v-model="selected"
        :options="options"
        @change="filterTodo"
      ></b-form-select>
    </b-input-group>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      options: [
        {
          value: null,
          disabled: true,
          text: 'Please select amount of todos to display'
        },
        { value: 200, text: 200 },
        { value: 100, text: 100 },
        { value: 50, text: 50 },
        { value: 25, text: 25 },
        { value: 10, text: 10 },
        { value: 5, text: 5 }
      ]
    }
  },
  methods: {
    filterTodo() {
      this.$store.dispatch('todos/getLimitedTodos', this.selected)
    }
  }
}
</script>
