<template>
  <b-form-group class="row d-flex">
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="plus" font-scale="1.5"> </b-icon>
      </b-input-group-prepend>
      <b-input
        v-model="title"
        type="text"
        placeholder="Add todo"
        required
        name="title"
      />
      <b-button class="btn btn-success" type="submit" @click="addTodo"
        >Add</b-button
      >
    </b-input-group>
  </b-form-group>
</template>

<script>
export default {
  data() {
    return {
      title: null
    }
  },
  methods: {
    async addTodo() {
      await this.$store.dispatch('todos/addTodo', this.title)
      this.title = null
    }
  }
}
</script>

<style lang="scss" scoped></style>
