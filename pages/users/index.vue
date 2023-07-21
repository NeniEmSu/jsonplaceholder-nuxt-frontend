<template>
  <section class="mt-5">
    <div class="container">
      <h1>
        Users
      </h1>

      <template v-if="usersLoading">
        <content-placeholders>
          <content-placeholders-text class="mt-5" :lines="10" />
        </content-placeholders>
      </template>

      <template v-else>
        <section class="mt-2 container">
          <UserForm
            v-if="addState"
            :adding="adding"
            :user-details="userDetails"
            @Call-Get-Fuction="callGetUsers"
            @Reset-State="resetFormState"
            @Close-Form="addState = false"
          />
          <div class="my-2">
            <div class="d-flex">
              <button class="btn btn-info my-3" @click="initForm">
                {{ addState ? 'Cancel' : 'Add User' }}
              </button>
              <b-form-group class="col-sm ml-auto my-auto">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="search" font-scale="1.5"> </b-icon>
                  </b-input-group-prepend>
                  <b-input
                    v-model="search"
                    type="text"
                    placeholder="Search by Username"
                    required
                    name="Search"
                  />
                </b-input-group>
              </b-form-group>
            </div>

            <b-table
              striped
              hover
              responsive
              :fields="fields"
              :sort-by.sync="sortBy"
              :sort-desc.sync="sortDesc"
              sticky-header="600px"
              :items="items"
            >
              <template v-slot:thead-top="">
                <b-tr>
                  <b-th colspan="1" variant="primary">Index</b-th>
                  <b-th colspan="4" variant="secondary">
                    User Data
                  </b-th>
                  <b-th colspan="2" variant="success">
                    Action
                  </b-th>
                </b-tr>
              </template>
              <template v-slot:cell(username)="data">
                <nuxt-link
                  :to="{
                    name: 'users-id-username',
                    params: { id: data.item.id, username: data.item.username }
                  }"
                  >{{ data.item.username }}</nuxt-link
                >
              </template>
              <template v-slot:cell(email)="data">
                <a :href="`mailto:${data.item.email}`">{{ data.item.email }}</a>
              </template>
              <template v-slot:cell(phone)="data">
                <a :href="`tel:+${data.item.phone}`">{{ data.item.phone }}</a>
              </template>
              <template v-slot:cell(view)="data">
                <b-button
                  class="ml-auto"
                  variant="light"
                  :to="{
                    name: 'users-id-username',
                    params: { id: data.item.id, username: data.item.username }
                  }"
                >
                  <b-icon
                    icon="box-arrow-in-up-right"
                    color="primary"
                    variant="primary"
                    font-scale="1.5"
                  ></b-icon>
                </b-button>
              </template>
              <template v-slot:cell(delete)="data">
                <span
                  v-if="deleteLoading"
                  class="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                <b-button
                  v-else
                  class="ml-auto"
                  variant="light"
                  :disabled="deleteLoading"
                  @click="deleteUser(data.item.id)"
                >
                  <b-icon
                    icon="trash-fill"
                    color="danger"
                    variant="danger"
                    font-scale="1.5"
                  ></b-icon>
                </b-button>
              </template>
            </b-table>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import UserForm from '~/components/partials/UserForm'

export default {
  name: 'Users',
  components: {
    UserForm
  },
  data() {
    return {
      userDetails: {
        name: null,
        email: null,
        username: null,
        website: null,
        phone: null,
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
      search: '',
      adding: true,
      filteredData: [],
      isValid: false,
      addLoading: false,
      addState: false,
      sortBy: 'Total',
      sortDesc: true,
      deleteLoading: false,
      fields: [
        { key: 'No', stickyColumn: true, isRowHeader: true, sortable: true },
        {
          key: 'username',
          stickyColumn: true,
          sortable: false
        },
        {
          key: 'name',
          sortable: false
        },
        {
          key: 'email',
          sortable: false
        },

        {
          key: 'phone',
          sortable: false
        },
        {
          key: 'view',
          sortable: false
        },
        {
          key: 'delete',
          sortable: false
        }
      ]
    }
  },

  computed: {
    allUsers() {
      return this.$store.state.users.users
    },
    usersLoading() {
      return this.$store.state.users.loading
    },
    items() {
      return this.filteredData.map((user, index) => {
        return {
          No: index + 1,
          id: user.id,
          username: user.username,
          name: user.name,
          email: user.email,
          phone: user.phone,
          view: '',
          delete: ''
        }
      })
    },

    isDisabled() {
      if (
        this.userDetails.email === '' ||
        this.userDetails.userName === '' ||
        this.userDetails.password === '' ||
        this.userDetails.repeat_password === ''
      )
        return !this.isValid

      return this.isValid
    }
  },

  watch: {
    allUsers() {
      this.getfilteredData()
    },
    search: _.debounce(async function(value) {
      const route = {
        name: 'users'
      }
      if (this.search !== '') {
        route.query = {
          search: this.search
        }
      }
      await this.$router.push(route)
    }, 1500),
    '$route.query.search': {
      immediate: true,
      handler(value) {
        this.search = value
        this.getfilteredData(value)
      }
    }
  },

  created() {
    // this.getAllUsers()
    this.$store.dispatch('users/getAllUsers')
  },

  mounted() {
    this.getfilteredData(this.search)
  },

  methods: {
    resetFormState() {
      this.userDetails = {
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
      }
    },

    getfilteredData(search) {
      this.filteredData = this.allUsers
      let filteredDataBySearch = []

      if (search) {
        filteredDataBySearch = this.filteredData.filter((obj) =>
          obj.username.toUpperCase().match(search.toUpperCase())
        )
        this.filteredData = filteredDataBySearch
      }
    },

    callGetUsers() {
        this.$store.dispatch('users/getAllUsers')
      this.addState = false
    },

    initForm() {
      this.addState = !this.addState
    },

    deleteUser(id) {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      this.deleteLoading = true
      this.$swal({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`${process.env.BACKEND_ENDPOINT}/users/${id}`, config)
            .then((response) => {
              this.deleteLoading = false
              this.$store.dispatch('users/getAllUsers')
              this.$swal({
                text: "Poof! You've sucessfully deleted that user!",
                icon: 'success'
              })
            })
            .catch((error) => {
              this.deleteLoading = false
              this.$swal(
                'Error',
                `Somethimg went wrong, Error: ${error}`,
                'error'
              )
            })
        } else {
          this.deleteLoading = false
          this.$swal('The user detail is safe!')
        }
      })
    }
  },
  head() {
    return {
      title: 'Users',
      titleTemplate: '%s - Json Placeholder Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'View a list of users, search a user by username, add a new user, navigate to edit an existing user, delete a user.'
        }
      ]
    }
  }
}
</script>

<style lang="scss"></style>
