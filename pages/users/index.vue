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
          />
          <div class="my-2">
            <div class="d-flex">
              <button class="btn btn-info my-3" @click="initForm">
                {{ addState ? 'Cancel' : 'Add New User' }}
              </button>
              <b-form-group class="col-sm ml-auto my-auto">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="search" font-scale="1.5"> </b-icon>
                  </b-input-group-prepend>
                  <b-input
                    v-model="search"
                    type="text"
                    placeholder="Search by song title, artist, album or genre"
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
                  <b-th colspan="3" variant="secondary">
                    User Data
                  </b-th>
                  <b-th colspan="3" variant="success">
                    Action
                  </b-th>
                </b-tr>
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
                <b-button
                  class="ml-auto"
                  variant="light"
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
/* eslint-disable no-console */
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
          suit: null,
          zipcode: null,
          city: null
        },
        company: {
          compName: null,
          bs: null,
          catchPhrase: null
        }
      },
      search: '',
      adding: true,
      allUsers: [],
      filteredData: [],
      usersLoading: false,
      isValid: false,
      addLoading: false,
      addState: false,
      sortBy: 'Total',
      sortDesc: true,
      fields: [
        { key: 'No', stickyColumn: true, isRowHeader: true, sortable: true },
        {
          key: 'name',
          stickyColumn: true,
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
      // eslint-disable-next-line no-console
      console.log(value)
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
        this.getAllUsers(value)
      }
    }
  },

  created() {
    this.getAllUsers()
  },

  mounted() {
    this.getfilteredData()
  },

  methods: {
    getfilteredData() {
      this.filteredData = this.allUsers
      let filteredDataBySearch = []

      if (this.search) {
        filteredDataBySearch = this.filteredData.filter((obj) =>
          obj.username.toUpperCase().match(this.search.toUpperCase())
        )
        this.filteredData = filteredDataBySearch
      }
    },
    async getAllUsers() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      this.usersLoading = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_USERS_ENDPOINT}`,
          config
        )
        const response = await data
        this.allUsers = response
        this.usersLoading = false
      } catch (error) {
        this.usersLoading = false
        this.$swal('Error', error.response.data.error, 'error')
      }
    },

    callGetUsers() {
      this.getAllUsers()
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
            .$delete(`${process.env.BACKEND_USERS_ENDPOINT}/${id}`, config)
            .then((response) => {
              this.getAllUsers()
              this.$swal({
                text: "Poof! You've sucessfully deleted that user!",
                icon: 'success'
              })
            })
            .catch((err) => {
              this.$swal(
                'Error',
                `Somethimg went wrong, Error: ${err}`,
                'error'
              )
            })
        } else {
          this.$swal('The user detail is safe!')
        }
      })
    }
  },
  head() {
    return {
      title: 'Users.',
      titleTemplate: 'ETT - %s!',
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
