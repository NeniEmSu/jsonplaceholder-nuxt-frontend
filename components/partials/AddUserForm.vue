<template>
  <div class="mb-4">
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <div class="card-body">
            <div class="card-title mb-4">
              <h3>Add User</h3>
            </div>
            <form class="row" @submit.prevent="addNewUser">
              <!-- <b-form-group label="Name:" label-for="name" class="col-sm-6">
                <b-form-input
                  id="name"
                  v-model="userDetails.name"
                  type="text"
                  placeholder="Enter name"
                ></b-form-input>
              </b-form-group> -->

              <b-form-group
                label="UserName:*"
                label-for="name"
                class="col-sm-6"
              >
                <b-form-input
                  id="name"
                  v-model="userDetails.username"
                  type="text"
                  required
                  placeholder="Enter your name"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Email:*" label-for="email" class="col-sm-6">
                <b-form-input
                  id="email"
                  v-model="userDetails.email"
                  type="text"
                  required
                  placeholder="Enter your email"
                ></b-form-input>
              </b-form-group>
              <!--<b-form-group label="Phone:" label-for="phone" class="col-sm-6">
                <b-form-input
                  id="phone"
                  v-model="userDetails.phone"
                  type="number"
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
              </b-form-group> -->

              <!-- <div class="address col-12">
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

                  <b-form-group label="Suit:" label-for="suit" class="col-sm-6">
                    <b-form-input
                      id="suit"
                      v-model="userDetails.address.suit"
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
                      id="street"
                      v-model="userDetails.company.compName"
                      type="text"
                      placeholder="Enter your home company name"
                    ></b-form-input>
                  </b-form-group>

                  <b-form-group
                    label="Catch phrase:"
                    label-for="catchphrase"
                    class="col-sm-6"
                  >
                    <b-form-input
                      id="catchphrase"
                      v-model="userDetails.company.catchphrase"
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
                      id="city"
                      v-model="userDetails.company.bs"
                      type="text"
                      placeholder="Enter your companies business statement"
                    ></b-form-input>
                  </b-form-group>
                </div>
              </div> -->

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
export default {
  data() {
    return {
      userDetails: {
        // name: '',
        email: null,
        username: null
        // website: null,
        // phone: null,
        // address: {
        //   street: null,
        //   suit: null,
        //   zipcode: null,
        //   city: null
        // },
        // company: {
        //   compName: null,
        //   bs: null,
        //   catchphrase: null
        // }
      },
      isValid: false,
      addLoading: false
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
    addNewUser() {
      // const formData = new FormData()
      // formData.append('name', this.userDetails.name)
      // formData.append('username', this.userDetails.userName)
      // formData.append('phone', this.userDetails.phone)
      // formData.append('email', this.userDetails.email)
      // formData.append('website', this.userDetails.website)
      // formData.append('street', this.userDetails.subCategory)
      // formData.append('suit', this.userDetails.subCategory)

      this.addLoading = true
      this.$axios
        .$post(`${process.env.BACKEND_USERS_ENDPOINT}`, this.userDetails)
        .then((response) => {
          this.addLoading = false
          this.userDetails = {
            // name: '',
            username: '',
            // website: null,
            // phone: null,
            email: null
            // address: {
            //   street: null,
            //   suit: null,
            //   zipcode: null,
            //   city: null
            // },
            // company: {
            //   compName: null,
            //   bs: null,
            //   catchphrase: null
            // }
          }
          this.$emit('Call-Get-Fuction')
          this.addLoading = false
          this.$swal('Success', 'New User Added Successfully', 'success')
        })
        .catch((err) => {
          this.addLoading = false
          this.$swal('Error', `Something Went wrong, \n Error: ${err}`, 'error')
        })
    }
  }
}
</script>

<style lang="scss" scoped></style>
