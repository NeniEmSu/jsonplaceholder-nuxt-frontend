<template>
  <b-form-group class="">
    <b-input-group>
      <b-input-group-prepend is-text>
        <b-icon icon="plus-circle" font-scale="1.5"> </b-icon>
      </b-input-group-prepend>
      <b-input
        v-model="$v.title.$model"
        type="text"
        placeholder="Add todo"
        required
        name="title"
        :class="[
          !$v.title.$error && $v.title.$model && $v.title.minLength
            ? 'is-valid'
            : '',
          $v.title.$error && !$v.title.minLength ? 'is-invalid' : ''
        ]"
        :state="$v.title.$dirty ? !$v.title.$error : null"
        @keyup.enter="addTodo"
      />

      <b-button
        :disabled="!title"
        class="btn btn-success"
        type="submit"
        @click="addTodo"
        >Add</b-button
      >
    </b-input-group>
    <small v-if="!$v.title.required && $v.title.$dirty" class="text-danger"
      >Todo text is required.</small
    >
    <small v-if="!$v.title.minLength" class="text-danger"
      >Title must have at least
      {{ $v.title.$params.minLength.min }}
      letters.</small
    >
  </b-form-group>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  data() {
    return {
      title: null
    }
  },
  validations: {
    title: {
      required,
      minLength: minLength(4)
    }
  },
  methods: {
    async addTodo() {
      if (!this.title)
        return this.$swal(
          'Be advised!',
          'Todo text is required to add a todo!',
          'warning'
        )
      await this.$store.dispatch('todos/addTodo', this.title)
      this.title = null
      this.$v.$reset()
    }
  }
}
</script>

<style lang="scss" scoped></style>
