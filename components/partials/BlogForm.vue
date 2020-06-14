<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-4 d-flex">
              <h3 v-if="adding">Add Blog</h3>
              <h3 v-else>Edit Blog</h3>
              <b-button
                class="ml-auto d-none d-sm-block"
                variant="light"
                @click="closeForm()"
              >
                <b-icon
                  icon="x-circle-fill"
                  color="danger"
                  variant="danger"
                  font-scale="1.5"
                >
                </b-icon>
              </b-button>
            </div>
            <form class="row" @submit.prevent="mutateBlog">
              <b-form-group label="Title:" label-for="title" class="col-12">
                <b-form-input
                  id="title"
                  v-model="blogDetails.title"
                  type="text"
                  placeholder="Enter title"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Body:" label-for="body" class="col-12">
                <b-form-textarea
                  id="body"
                  v-model="blogDetails.body"
                  placeholder="Enter the blogs post content here."
                  rows="8"
                ></b-form-textarea>
              </b-form-group>

              <b-form-group class="col-sm-6">
                <span
                  v-if="addLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <button v-else class="btn btn-primary" :disabled="isDisabled">
                  Submit
                </button>
              </b-form-group>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators'
export default {
  props: {
    adding: {
      default: false,
      type: Boolean
    },
    blogDetails: {
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        title: null,
        body: null
      },
      type: Object
    }
  },
  data() {
    return {
      isValid: false,
      addLoading: false,
      errors: []
    }
  },

  validations: {
    blogDetails: {
      title: {
        required,
        minLength: minLength(4)
      },

      body: {
        required,
        minLength: minLength(4)
      }
    }
  },

  computed: {
    isDisabled() {
      if (this.blogDetails.title === '' || this.blogDetails.body === null) {
        return !this.isValid
      }
      return this.isValid
    }
  },

  methods: {
    closeForm() {
      this.$emit('Close-Form')
    },

    mutateBlog() {
      if (this.adding) return this.addNewBlog()
      return this.editBlog()
    },

    async addNewBlog() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BACKEND_POSTS_ENDPOINT}`,
            this.blogDetails,
            config
          )
          .then((response) => {
            this.$emit('Reset-State')
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `New Blog post: ${response.title}, was added successfully`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, \n Error: ${error}`, 'error')
      }
      this.addLoading = false
    },

    async editBlog() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BACKEND_POSTS_ENDPOINT}/${this.blogDetails.id}`,
            this.blogDetails,
            config
          )
          .then((response) => {
            this.$store.dispatch('toast/setToast', {
              name: 'Success',
              variant: 'success',
              text: `${response.title} updated sucessfully.`,
              delay: 5000
            })
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `${response.title} updated Successfully`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, \n Error: ${error}`, 'error')
      }
      this.addLoading = false
    }
  }
}
</script>

<style lang="scss" scoped></style>
