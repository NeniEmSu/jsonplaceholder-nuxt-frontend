<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-4 d-flex">
              <h3 v-if="adding">Add User</h3>
              <h3 v-else>Edit User</h3>
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
            <form class="row" @submit.prevent="mutateUser">
              <b-form-group label="Name:" label-for="name" class="col-sm-6">
                <b-form-input
                  id="name"
                  v-model="userDetails.name"
                  type="text"
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="UserName:*"
                label-for="username"
                class="col-sm-6"
              >
                <b-form-input
                  id="username"
                  v-model="$v.userDetails.username.$model"
                  type="text"
                  required
                  placeholder="Enter your username"
                  :class="[
                    !$v.userDetails.username.$error &&
                    $v.userDetails.username.$model &&
                    $v.userDetails.username.minLength
                      ? 'is-valid'
                      : '',
                    $v.userDetails.username.$error &&
                    !$v.userDetails.username.minLength
                      ? 'is-invalid'
                      : ''
                  ]"
                  :state="
                    $v.userDetails.username.$dirty
                      ? !$v.userDetails.username.$error
                      : null
                  "
                ></b-form-input>
                <small
                  v-if="
                    !$v.userDetails.username.required &&
                      $v.userDetails.username.$dirty
                  "
                  class="text-danger"
                  >Username is required.</small
                >
                <small
                  v-if="!$v.userDetails.username.minLength"
                  class="text-danger"
                  >username must have at least
                  {{ $v.userDetails.username.$params.minLength.min }}
                  letters.</small
                >
              </b-form-group>

              <b-form-group label="Email:*" label-for="email" class="col-sm-6">
                <!-- v-model="userDetails.email" -->
                <b-form-input
                  id="email"
                  v-model="$v.userDetails.email.$model"
                  type="text"
                  required
                  placeholder="Enter your email"
                  :class="[
                    !$v.userDetails.email.$error &&
                    $v.userDetails.email.$model &&
                    $v.userDetails.email.minLength
                      ? 'is-valid'
                      : '',
                    $v.userDetails.email.$error &&
                    !$v.userDetails.email.minLength
                      ? 'is-invalid'
                      : ''
                  ]"
                  :state="
                    $v.userDetails.email.$dirty
                      ? !$v.userDetails.email.$error
                      : null
                  "
                ></b-form-input>
                <small
                  v-if="
                    !$v.userDetails.email.required &&
                      $v.userDetails.email.$dirty
                  "
                  class="text-danger"
                  >Email is required.</small
                >
                <small
                  v-if="!$v.userDetails.email.minLength"
                  class="text-danger"
                  >Email must have at least
                  {{ $v.userDetails.email.$params.minLength.min }}
                  letters.</small
                >
              </b-form-group>

              <b-form-group label="Phone:" label-for="phone" class="col-sm-6">
                <b-form-input
                  id="phone"
                  v-model="userDetails.phone"
                  type="text"
                  placeholder="Enter your phone number"
                ></b-form-input>
              </b-form-group>

              <b-form-group
                label="Website:"
                label-for="website"
                class="col-sm-6"
              >
                <b-form-input
                  id="website"
                  v-model="userDetails.website"
                  type="text"
                  placeholder="Enter your Website address"
                ></b-form-input>
              </b-form-group>

              <div class="address col-12">
                <p>Adress:</p>
                <div class="row">
                  <b-form-group
                    label="Street:"
                    label-for="street"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="street"
                      v-model="userDetails.address.street"
                      type="text"
                      placeholder="Enter your home street address"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="suite:"
                    label-for="suite"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="suite"
                      v-model="userDetails.address.suite"
                      type="text"
                      placeholder="Apt. 0000"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group label="City:" label-for="city" class="col-sm-6">
                    <b-form-input
                      id="city"
                      v-model="userDetails.address.city"
                      type="text"
                      placeholder="Enter your city"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="zip Code:"
                    label-for="zipcode"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="zipcode"
                      v-model="userDetails.address.zipcode"
                      type="text"
                      placeholder="Enter your zipcode"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>

              <div class="company col-12">
                <p>Company:</p>
                <div class="row">
                  <b-form-group
                    label="Name:"
                    label-for="compName"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="compName"
                      v-model="userDetails.company.name"
                      type="text"
                      placeholder="Enter your company name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Catch phrase:"
                    label-for="catchPhrase"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="catchPhrase"
                      v-model="userDetails.company.catchPhrase"
                      type="text"
                      placeholder="Your companies catch phrase"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Business Statement:"
                    label-for="bs"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="bs"
                      v-model="userDetails.company.bs"
                      type="text"
                      placeholder="Enter your companies business statement"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div>

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
    userDetails: {
      // eslint-disable-next-line vue/require-valid-default-prop
      default: {
        name: null,
        username: null,
        website: null,
        phone: null,
        email: null,
        address: {
          street: null,
          suite: null,
          zipcode: null,
          city: null
        },
        company: {
          name: null,
          bs: null,
          catchPhrase: null
        }
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
    userDetails: {
      username: {
        required,
        minLength: minLength(4)
      },

      email: {
        required,
        minLength: minLength(4)
      }
    }
  },

  computed: {
    isDisabled() {
      if (this.userDetails.username === '' || this.userDetails.email === null) {
        return !this.isValid
      }
      return this.isValid
    }
  },

  methods: {
    closeForm() {
      this.$emit('Close-Form')
    },

    mutateUser() {
      if (this.adding) return this.addNewUser()
      return this.editUser()
    },

    async addNewUser() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BACKEND_USERS_ENDPOINT}`,
            this.userDetails,
            config
          )
          .then((response) => {
            this.$emit('Reset-State')
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `New User: ${response.username}, with email address: ${response.email} Added Successfully`,
              'success'
            )
          })
      } catch (error) {
        this.$swal('Error', `Something Went wrong, \n Error: ${error}`, 'error')
      }
      this.addLoading = false
    },

    async editUser() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      try {
        this.addLoading = true
        await this.$axios
          .$post(
            `${process.env.BACKEND_USERS_ENDPOINT}/${this.userDetails.id}`,
            this.userDetails,
            config
          )
          .then((response) => {
            this.$store.dispatch('toast/setToast', {
              name: 'Success',
              variant: 'success',
              text: `${response.username} updated sucessfully.`,
              delay: 5000
            })
            this.$emit('Call-Get-Fuction')
            this.$swal(
              'Success',
              `${response.username} updated Successfully`,
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
