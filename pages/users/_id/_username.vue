<template>
  <section class="container">
    <nav class="mt-3">
      <b-button class="ml-auto" variant="light" @click="goBack()">
        <b-icon
          icon="arrow90deg-left"
          color="danger"
          variant="danger"
          font-scale="1.5"
        ></b-icon>
      </b-button>
    </nav>

    <template v-if="userLoading">
      <content-placeholders rounded>
        <content-placeholders-heading class="my-5" :lines="1" />
        <div class="mt-2">
          <div class="row">
            <div class="col-xs-12 col-sm-3 center">
              <content-placeholders-img class="mb-2" />

              <div class="space space-4"></div>

              <content-placeholders-text :lines="1" />

              <content-placeholders-text :lines="1" />
            </div>

            <div class="col-xs-12 col-sm-9">
              <content-placeholders-text :lines="1" />

              <content-placeholders-text :lines="1" />

              <content-placeholders-text :lines="1" />

              <content-placeholders-text :lines="1" />
            </div>
          </div>

          <div class="space-20"></div>

          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <div class="widget-box transparent">
                <content-placeholders-text
                  :lines="3"
                  class="widget-header widget-header-small"
                />

                <content-placeholders-text :lines="3" class="widget-body" />
              </div>
            </div>
          </div>
        </div>
      </content-placeholders>
    </template>

    <template v-else-if="error">
      <b-alert v-if="error" show variant="danger">
        <h4 class="alert-heading">
          Error
        </h4>
        <p>{{ error }}</p>
      </b-alert>
    </template>

    <template v-else>
      <div class="container my-2">
        <div class="row">
          <div class="col-sm-12">
            <b-alert v-if="error" show variant="danger">
              <h4 class="alert-heading">
                Error
              </h4>
              <p>{{ error }}</p>
            </b-alert>

            <UserForm
              v-if="editState"
              :user-details="userDetails"
              @Call-Get-Fuction="callGetUser"
              @Close-Form="editState = false"
            />
          </div>
        </div>
      </div>
      <div class="d-block d-sm-flex align-items-center">
        <h1>More About {{ user.username }}</h1>
        <b-button class="ml-4" variant="light" @click="editState = !editState">
          <b-icon icon="pencil-square" font-scale="1.5"> </b-icon>
        </b-button>

        <b-button
          class="ml-auto"
          variant="light"
          :disabled="deleteLoading"
          @click="deleteUser(user.id)"
        >
          <span
            v-if="deleteLoading"
            class="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          <b-icon
            v-else
            icon="trash-fill"
            color="danger"
            variant="danger"
            font-scale="1.5"
          >
          </b-icon>
        </b-button>
      </div>
      <div class="mt-2">
        <div class="row">
          <div class="col-xs-12 col-sm-3 center">
            <span class="profile-picture">
              <b-img
                id="avatar2"
                blank
                blank-color="#ccc"
                width="200"
                fluid
                editable
                img-responsive
                :alt="`${user.username}'s Avatar placeholder`"
              ></b-img>
            </span>

            <div class="space space-4"></div>

            <b-button
              class="btn btn-sm btn-block btn-success"
              @click="editState = !editState"
              ><b-icon class="bigger-120" icon="pencil-square" font-scale="1.5">
              </b-icon>
              <span class="bigger-110">
                Update {{ user.username | truncate(5, '...') }}'s details.</span
              >
            </b-button>

            <b-button
              class="btn btn-sm btn-block btn-danger"
              @click="editState = !editState"
              ><b-icon class="bigger-120" icon="trash-fill" font-scale="1.5">
              </b-icon>
              <span
                v-if="deleteLoading"
                class="spinner-border spinner-border-sm"
                role="status"
                aria-hidden="true"
              ></span>
              <span v-else class="bigger-110">
                Delete {{ user.username | truncate(5, '...') }}.</span
              >
            </b-button>
          </div>

          <div class="col-xs-12 col-sm-9">
            <h4 class="blue">
              <span class="middle">{{ user.name }}</span>

              <span class="label label-purple arrowed-in-right">
                <i class="ace-icon fa fa-circle smaller-80 align-middle"></i>
                online
              </span>
            </h4>

            <div class="profile-user-info">
              <div class="profile-info-row">
                <div class="profile-info-name">Username</div>

                <div class="profile-info-value">
                  <span>{{ user.username }}</span>
                </div>
              </div>

              <div class="profile-info-row">
                <div class="profile-info-name">Location</div>

                <div class="profile-info-value">
                  <i class="fa fa-map-marker light-orange bigger-110"></i>
                  <span>{{ user.address.street }}</span>
                  <span>{{ user.address.suitee }}</span>
                  <span>{{ user.address.city }}</span>
                </div>
              </div>

              <div class="profile-info-row">
                <div class="profile-info-name">Joined</div>

                <div class="profile-info-value">
                  <span>----/--/--</span>
                </div>
              </div>
            </div>

            <div class="hr hr-8 dotted"></div>

            <div class="profile-user-info">
              <div class="profile-info-row">
                <div class="profile-info-name">Website</div>

                <div class="profile-info-value">
                  <a :href="user.website" target="_blank">{{ user.website }}</a>
                </div>
              </div>
            </div>

            <div class="profile-user-info">
              <div class="profile-info-row">
                <div class="profile-info-name">Email</div>

                <div class="profile-info-value">
                  <a :href="`mailto:${user.email}`">{{ user.email }}</a>
                </div>
              </div>
            </div>

            <div class="profile-user-info">
              <div class="profile-info-row">
                <div class="profile-info-name">phone</div>

                <div class="profile-info-value">
                  <a :href="`tel:+${user.phone}`">{{ user.phone }}</a>
                </div>
              </div>
            </div>

            <div class="hr hr-8 dotted"></div>

            <div class="profile-user-info">
              <div class="profile-info-row">
                <div class="profile-info-name">Company</div>

                <div class="profile-info-value">
                  {{ user.company.name }}
                </div>
              </div>
            </div>
          </div>
          <!-- /.col -->
        </div>
        <!-- /.row -->

        <div class="space-20"></div>

        <div class="row">
          <div class="col-xs-12 col-sm-6">
            <div class="widget-box transparent">
              <div class="widget-header widget-header-small">
                <h4 class="widget-title smaller">
                  <i class="ace-icon fa fa-check-square-o bigger-110"></i>
                  About {{ user.company.name }}
                </h4>
              </div>

              <div class="widget-body">
                <div class="widget-main">
                  <p>
                    <strong>Business Statement: </strong>{{ user.company.bs }}
                  </p>
                  <p>
                    {{ user.company.catchPhrase }}
                  </p>

                  <p>
                    Thanks for visiting my profile.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<script>
import UserForm from '~/components/partials/UserForm'
export default {
  components: {
    UserForm
  },
  filters: {
    truncate(text, length, suffix) {
      if (text.length > length) {
        return text.substring(0, length) + suffix
      } else {
        return text
      }
    }
  },
  data() {
    return {
      deleteLoading: false,
      userDetails: {},
      form: {
        name: ''
      },
      error: '',
      editState: false,
      userLoading: false
    }
  },
  created() {
    this.getUser()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    callGetUser() {
      this.getUser()
      this.editState = false
    },
    async getUser() {
      this.userLoading = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_USERS_ENDPOINT}/${this.$route.params.id}`
        )
        this.user = await data
        this.userDetails = await data
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.userLoading = false
    },
    deleteUser(id) {
      this.deleteLoading = true
      this.$swal({
        name: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Yes, delete it!'
      }).then((willDelete) => {
        if (willDelete.value) {
          this.$axios
            .$delete(`${process.env.BACKEND_USERS_ENDPOINT}/${id}`)
            .then((response) => {
              this.deleteLoading = false
              this.$router.push('/users')
              this.$swal({
                text: "Poof! You've sucessfully deleted that user!",
                icon: 'success'
              })
            })
            .catch((error) => {
              this.deleteLoading = false
              this.$swal({
                name: 'Somethimg went wrong!',
                text: error,
                icon: 'error'
              })
            })
        } else {
          this.deleteLoading = false
          this.$swal("That user's data is safe!")
        }
      })
    }
  },
  head() {
    return {
      title: this.$route.params.username,
      titleTemplate: '%s - Json Placeholder Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'An interface that allows to: View a list of users, search a user by username, add a new user, navigate to edit an existing user, delete a user.'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
body {
  margin-top: 20px;
}

.align-center,
.center {
  text-align: center !important;
}

.profile-user-info {
  display: table;
  width: 98%;
  width: calc(100% - 24px);
  margin: 0 auto;
}

.profile-info-row {
  display: table-row;
}

.profile-info-name,
.profile-info-value {
  display: table-cell;
  border-top: 1px dotted #d5e4f1;
}

.profile-info-name {
  text-align: right;
  padding: 6px 10px 6px 4px;
  font-weight: 400;
  color: #667e99;
  background-color: transparent;
  width: 110px;
  vertical-align: middle;
}

.profile-info-value {
  padding: 6px 4px 6px 6px;
}

.profile-info-value > span + span:before {
  display: inline;
  content: ',';
  margin-left: 1px;
  margin-right: 3px;
  color: #666;
  border-bottom: 1px solid #fff;
}

.profile-info-value > span + span.editable-container:before {
  display: none;
}

.profile-info-row:first-child .profile-info-name,
.profile-info-row:first-child .profile-info-value {
  border-top: none;
}

.profile-user-info-striped {
  border: 1px solid #dcebf7;
}

.profile-user-info-striped .profile-info-name {
  color: #336199;
  background-color: #edf3f4;
  border-top: 1px solid #f7fbff;
}

.profile-user-info-striped .profile-info-value {
  border-top: 1px dotted #dcebf7;
  padding-left: 12px;
}

.profile-picture {
  border: 1px solid #ccc;
  background-color: #fff;
  padding: 4px;
  display: inline-block;
  max-width: 100%;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
}

.profile-activity {
  padding: 10px 4px;
  border-bottom: 1px dotted #d0d8e0;
  position: relative;
  border-left: 1px dotted #fff;
  border-right: 1px dotted #fff;
}

.profile-activity:first-child {
  border-top: 1px dotted transparent;
}

.profile-activity:first-child:hover {
  border-top-color: #d0d8e0;
}

.profile-activity:hover {
  background-color: #f4f9fd;
  border-left: 1px dotted #d0d8e0;
  border-right: 1px dotted #d0d8e0;
}

.profile-activity img {
  border: 2px solid #c9d6e5;
  border-radius: 100%;
  max-width: 40px;
  margin-right: 10px;
  margin-left: 0;
  box-shadow: none;
}

.profile-activity .thumbicon {
  background-color: #74abd7;
  display: inline-block;
  border-radius: 100%;
  width: 38px;
  height: 38px;
  color: #fff;
  font-size: 18px;
  text-align: center;
  line-height: 38px;
  margin-right: 10px;
  margin-left: 0;
  text-shadow: none !important;
}

.profile-activity .time {
  display: block;
  margin-top: 4px;
  color: #777;
}

.profile-activity a.user {
  font-weight: 700;
  color: #9585bf;
}

.profile-activity .tools {
  position: absolute;
  right: 12px;
  bottom: 8px;
  display: none;
}

.profile-activity:hover .tools {
  display: block;
}

.user-profile .ace-thumbnails li {
  border: 1px solid #ccc;
  padding: 3px;
  margin: 6px;
}

.user-profile .ace-thumbnails li .tools {
  left: 3px;
  right: 3px;
}

.user-profile .ace-thumbnails li:hover .tools {
  bottom: 3px;
}

.user-title-label:hover {
  text-decoration: none;
}

.user-title-label + .dropdown-menu {
  margin-left: -12px;
}

.profile-contact-links {
  padding: 4px 2px 5px;
  border: 1px solid #e0e2e5;
  background-color: #f8fafc;
}

.btn-link:hover .ace-icon {
  text-decoration: none !important;
}

.profile-social-links > a:hover > .ace-icon,
.profile-users .memberdiv .name a:hover .ace-icon,
.profile-users .memberdiv .tools > a:hover {
  text-decoration: none;
}

.profile-social-links > a {
  text-decoration: none;
  margin: 0 1px;
}

.profile-skills .progress {
  height: 26px;
  margin-bottom: 2px;
  background-color: transparent;
}

.profile-skills .progress .progress-bar {
  line-height: 26px;
  font-size: 13px;
  font-weight: 700;
  font-family: 'Open Sans';
  padding: 0 8px;
}

.profile-users .user {
  display: block;
  position: static;
  text-align: center;
  width: auto;
}

.profile-users .user img {
  padding: 2px;
  border-radius: 100%;
  border: 1px solid #aaa;
  max-width: none;
  width: 64px;
  -webkit-transition: all 0.1s;
  -o-transition: all 0.1s;
  transition: all 0.1s;
}

.profile-users .user img:hover {
  -webkit-box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.33);
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.33);
}

.profile-users .memberdiv {
  background-color: #fff;
  width: 100px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  border: none;
  text-align: center;
  margin: 0 8px 24px;
}

.profile-users .memberdiv .body {
  display: inline-block;
  margin: 8px 0 0;
}

.profile-users .memberdiv .popover {
  visibility: hidden;
  min-width: 0;
  max-height: 0;
  max-width: 0;
  margin-left: 0;
  margin-right: 0;
  top: -5%;
  left: auto;
  right: auto;
  opacity: 0;
  display: none;
  position: absolute;
  -webkit-transition: opacity 0.2s linear 0s, visibility 0s linear 0.2s,
    max-height 0s linear 0.2s, max-width 0s linear 0.2s,
    min-width 0s linear 0.2s;
  -o-transition: opacity 0.2s linear 0s, visibility 0s linear 0.2s,
    max-height 0s linear 0.2s, max-width 0s linear 0.2s,
    min-width 0s linear 0.2s;
  transition: opacity 0.2s linear 0s, visibility 0s linear 0.2s,
    max-height 0s linear 0.2s, max-width 0s linear 0.2s,
    min-width 0s linear 0.2s;
}

.profile-users .memberdiv .popover.right {
  left: 100%;
  right: auto;
  display: block;
}

.profile-users .memberdiv .popover.left {
  left: auto;
  right: 100%;
  display: block;
}

.profile-users .memberdiv > :first-child:hover .popover {
  visibility: visible;
  opacity: 1;
  z-index: 1060;
  max-height: 250px;
  max-width: 250px;
  min-width: 150px;
  -webkit-transition-delay: 0s;
  -moz-transition-delay: 0s;
  -o-transition-delay: 0s;
  transition-delay: 0s;
}

.profile-users .memberdiv .tools {
  position: static;
  display: block;
  width: 100%;
  margin-top: 2px;
}

.profile-users .memberdiv .tools > a {
  margin: 0 2px;
}

.user-status {
  display: inline-block;
  width: 11px;
  height: 11px;
  background-color: #fff;
  border: 3px solid #aaa;
  border-radius: 100%;
  vertical-align: middle;
  margin-right: 1px;
}

.user-status.status-online {
  border-color: #8ac16c;
}

.user-status.status-busy {
  border-color: #e07f69;
}

.user-status.status-idle {
  border-color: #ffb752;
}

.tab-content.profile-edit-tab-content {
  border: 1px solid #ddd;
  padding: 8px 32px 32px;
  -webkit-box-shadow: 1px 1px 0 0 rgba(0, 0, 0, 0.2);
  box-shadow: 1px 1px 0 0 rgba(0, 0, 0, 0.2);
  background-color: #fff;
}

@media only screen and (max-width: 480px) {
  .profile-info-name {
    width: 80px;
  }
  .profile-user-info-striped .profile-info-name {
    float: none;
    width: auto;
    text-align: left;
    padding: 6px 4px 6px 10px;
    display: block;
  }
  .profile-user-info-striped .profile-info-value {
    margin-left: 10px;
    display: block;
  }
  .user-profile .memberdiv {
    width: 50%;
    margin-left: 0;
    margin-right: 0;
  }
}

.itemdiv {
  padding-right: 3px;
  min-height: 66px;
}

.itemdiv > .user {
  display: inline-block;
  width: 42px;
  position: absolute;
  left: 0;
}

.itemdiv > .user > .img,
.itemdiv > .user > img {
  border-radius: 100%;
  border: 2px solid #5293c4;
  max-width: 40px;
  position: relative;
}

.itemdiv > .user > .img {
  padding: 2px;
}

.itemdiv > .body {
  width: auto;
  margin-left: 50px;
  margin-right: 12px;
  position: relative;
}

.itemdiv > .body > .time {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #666;
  position: absolute;
  right: 9px;
  top: 0;
}

.itemdiv > .body > .time .ace-icon {
  font-size: 14px;
  font-weight: 400;
}

.itemdiv > .body > .name {
  display: block;
  color: #999;
}

.itemdiv > .body > .name > b {
  color: #777;
}

.itemdiv > .body > .text {
  display: block;
  position: relative;
  margin-top: 2px;
  padding-bottom: 19px;
  padding-left: 7px;
  font-size: 13px;
}

.itemdiv.dialogdiv:before,
.itemdiv.dialogdiv > .body:before,
.itemdiv > .body > .text:after {
  content: '';
  position: absolute;
}

.itemdiv > .body > .text:after {
  display: block;
  height: 1px;
  font-size: 0;
  overflow: hidden;
  left: 16px;
  right: -12px;
  margin-top: 9px;
  border-top: 1px solid #e4ecf3;
}

.itemdiv > .body > .text > .ace-icon:first-child {
  color: #dce3ed;
  margin-right: 4px;
}

.itemdiv:last-child > .body > .text {
  border-bottom-width: 0;
}

.itemdiv:last-child > .body > .text:after {
  display: none;
}

.itemdiv.dialogdiv {
  padding-bottom: 14px;
}

.itemdiv.dialogdiv:before {
  display: block;
  top: 0;
  bottom: 0;
  left: 19px;
  width: 3px;
  max-width: 3px;
  background-color: #e1e6ed;
  border: 1px solid #d7dbdd;
  border-width: 0 1px;
}

.itemdiv.dialogdiv:last-child {
  padding-bottom: 0;
}

.itemdiv.dialogdiv:last-child:before {
  display: none;
}

.itemdiv.dialogdiv > .user > img {
  border-color: #c9d6e5;
}

.itemdiv.dialogdiv > .body {
  border: 1px solid #dde4ed;
  padding: 5px 8px 8px;
  border-left-width: 2px;
  margin-right: 1px;
}

.itemdiv.dialogdiv > .body:before {
  display: block;
  left: -7px;
  top: 11px;
  width: 8px;
  height: 8px;
  border: 2px solid #dde4ed;
  border-width: 2px 0 0 2px;
  background-color: #fff;
  -webkit-box-sizing: content-box;
  -moz-box-sizing: content-box;
  box-sizing: content-box;
  -webkit-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

.itemdiv.dialogdiv > .body > .time {
  position: static;
  float: right;
}

.itemdiv.dialogdiv > .body > .text {
  padding-left: 0;
  padding-bottom: 0;
}

.itemdiv.dialogdiv > .body > .text:after {
  display: none;
}

.itemdiv.dialogdiv .tooltip-inner {
  word-break: break-all;
}

.itemdiv.memberdiv {
  width: 175px;
  padding: 2px;
  margin: 3px 0;
  float: left;
  border-bottom: 1px solid #e8e8e8;
}

@media (min-width: 992px) {
  .itemdiv.memberdiv {
    max-width: 50%;
  }
}

@media (max-width: 991px) {
  .itemdiv.memberdiv {
    min-width: 33.333%;
  }
}

.itemdiv.memberdiv > .user > img {
  border-color: #dce3ed;
}

.itemdiv.memberdiv > .body > .time {
  position: static;
}

.itemdiv.memberdiv > .body > .name {
  line-height: 18px;
  height: 18px;
  margin-bottom: 0;
}

.itemdiv.memberdiv > .body > .name > a {
  display: inline-block;
  max-width: 100px;
  max-height: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
}

.itemdiv .tools {
  position: absolute;
  right: 5px;
  bottom: 10px;
  display: none;
}

.item-list > li > .checkbox,
.item-list > li > label.inline,
.itemdiv:hover .tools {
  display: inline-block;
}

.itemdiv .tools .btn {
  border-radius: 36px;
  margin: 1px 0;
}

.itemdiv .body .tools {
  bottom: 4px;
}

.itemdiv.commentdiv .tools {
  right: 9px;
}

.item-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.item-list > li {
  padding: 9px;
  background-color: #fff;
  margin-top: -1px;
  position: relative;
}

.item-list > li.selected {
  color: #8090a0;
  background-color: #f4f9fc;
}

.item-list > li.selected .lbl,
.item-list > li.selected label {
  text-decoration: line-through;
  color: #8090a0;
}

.item-list > li label {
  font-size: 13px;
}

.item-list > li .percentage {
  font-size: 11px;
  font-weight: 700;
  color: #777;
}

.ace-thumbnails > li,
.ace-thumbnails > li > :first-child {
  display: block;
  position: relative;
}

.ace-thumbnails {
  list-style: none;
  margin: 0;
  padding: 0;
}

.ace-thumbnails > li {
  float: left;
  overflow: hidden;
  margin: 2px;
  border: 2px solid #333;
}

.ace-thumbnails > li > :first-child:focus {
  outline: 0;
}

.ace-thumbnails > li .tags {
  display: inline-block;
  position: absolute;
  bottom: 0;
  right: 0;
  overflow: visible;
  direction: rtl;
  padding: 0;
  margin: 0;
  height: auto;
  width: auto;
  background-color: transparent;
  border-width: 0;
  vertical-align: inherit;
}

.ace-thumbnails > li .tags > .label-holder {
  opacity: 0.92;
  filter: alpha(opacity=92);
  display: table;
  margin: 1px 0 0;
  direction: ltr;
  text-align: left;
}

.ace-thumbnails > li > .tools,
.ace-thumbnails > li > :first-child > .text {
  position: absolute;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.55);
}

.ace-thumbnails > li .tags > .label-holder:hover {
  opacity: 1;
  filter: alpha(opacity=100);
}

.ace-thumbnails > li > .tools {
  top: 0;
  bottom: 0;
  left: -30px;
  width: 24px;
  vertical-align: middle;
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.ace-thumbnails > li > .tools.tools-right {
  left: auto;
  right: -30px;
}

.ace-thumbnails > li > .tools.tools-bottom {
  width: auto;
  height: 28px;
  left: 0;
  right: 0;
  top: auto;
  bottom: -30px;
}

.ace-thumbnails > li > .tools.tools-top {
  width: auto;
  height: 28px;
  left: 0;
  right: 0;
  top: -30px;
  bottom: auto;
}

.ace-thumbnails > li:hover > .tools {
  left: 0;
  right: 0;
}

.ace-thumbnails > li:hover > .tools.tools-bottom {
  top: auto;
  bottom: 0;
}

.ace-thumbnails > li:hover > .tools.tools-top {
  bottom: auto;
  top: 0;
}

.ace-thumbnails > li:hover > .tools.tools-right {
  left: auto;
  right: 0;
}

.ace-thumbnails > li > .in.tools {
  left: 0;
  right: 0;
}

.ace-thumbnails > li > .in.tools.tools-bottom {
  top: auto;
  bottom: 0;
}

.ace-thumbnails > li > .in.tools.tools-top {
  bottom: auto;
  top: 0;
}

.ace-thumbnails > li > .in.tools.tools-right {
  left: auto;
  right: 0;
}

.ace-thumbnails > li > .tools > a,
.ace-thumbnails > li > :first-child .inner a {
  display: inline-block;
  color: #fff;
  font-size: 18px;
  font-weight: 400;
  padding: 0 4px;
}

.ace-thumbnails > li > .tools > a:hover,
.ace-thumbnails > li > :first-child .inner a:hover {
  text-decoration: none;
  color: #c9e2ea;
}

.ace-thumbnails > li .tools.tools-bottom > a,
.ace-thumbnails > li .tools.tools-top > a {
  display: inline-block;
}

.ace-thumbnails > li > :first-child > .text {
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  color: #fff;
  opacity: 0;
  filter: alpha(opacity=0);
  -webkit-transition: all 0.2s ease;
  -o-transition: all 0.2s ease;
  transition: all 0.2s ease;
}

.dialogs,
.itemdiv {
  position: relative;
}

.ace-thumbnails > li > :first-child > .text:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: 0;
}

.ace-thumbnails > li > :first-child > .text > .inner {
  padding: 4px 0;
  margin: 0;
  display: inline-block;
  vertical-align: middle;
  max-width: 90%;
}

.ace-thumbnails > li:hover > :first-child > .text {
  opacity: 1;
  filter: alpha(opacity=100);
}

@media only screen and (max-width: 480px) {
  .ace-thumbnails {
    text-align: center;
  }
  .ace-thumbnails > li {
    float: none;
    display: inline-block;
  }
}

.tab-content {
  border: 1px solid #c5d0dc;
  padding: 16px 12px;
  position: relative;
}

.tab-content.no-padding {
  padding: 0;
}

.tab-content.no-border {
  border: none;
  padding: 12px;
}

.tab-content.padding-32 {
  padding: 32px 24px;
}

.tab-content.no-border.padding-32 {
  padding: 32px;
}

.tab-content.padding-30 {
  padding: 30px 23px;
}

.tab-content.no-border.padding-30 {
  padding: 30px;
}

.tab-content.padding-28 {
  padding: 28px 21px;
}

.tab-content.no-border.padding-28 {
  padding: 28px;
}

.tab-content.padding-26 {
  padding: 26px 20px;
}

.tab-content.no-border.padding-26 {
  padding: 26px;
}

.tab-content.padding-24 {
  padding: 24px 18px;
}

.tab-content.no-border.padding-24 {
  padding: 24px;
}

.tab-content.padding-22 {
  padding: 22px 17px;
}

.tab-content.no-border.padding-22 {
  padding: 22px;
}

.tab-content.padding-20 {
  padding: 20px 15px;
}

.tab-content.no-border.padding-20 {
  padding: 20px;
}

.tab-content.padding-18 {
  padding: 18px 14px;
}

.tab-content.no-border.padding-18 {
  padding: 18px;
}

.tab-content.padding-16 {
  padding: 16px 12px;
}

.tab-content.no-border.padding-16 {
  padding: 16px;
}

.tab-content.padding-14 {
  padding: 14px 11px;
}

.tab-content.no-border.padding-14 {
  padding: 14px;
}

.tab-content.padding-12 {
  padding: 12px 9px;
}

.tab-content.no-border.padding-12 {
  padding: 12px;
}

.tab-content.padding-10 {
  padding: 10px 8px;
}

.tab-content.no-border.padding-10 {
  padding: 10px;
}

.tab-content.padding-8 {
  padding: 8px 6px;
}

.tab-content.no-border.padding-8 {
  padding: 8px;
}

.tab-content.padding-6 {
  padding: 6px 5px;
}

.tab-content.no-border.padding-6 {
  padding: 6px;
}

.tab-content.padding-4 {
  padding: 4px 3px;
}

.tab-content.no-border.padding-4 {
  padding: 4px;
}

.tab-content.no-border.padding-2,
.tab-content.padding-2 {
  padding: 2px;
}

.tab-content.no-border.padding-0,
.tab-content.padding-0 {
  padding: 0;
}

.nav.nav-tabs.padding-28 {
  padding-left: 28px;
}

.tabs-left > .nav.nav-tabs.padding-28,
.tabs-right > .nav.nav-tabs.padding-28 {
  padding-left: 0;
  padding-top: 28px;
}

.nav.nav-tabs.padding-26 {
  padding-left: 26px;
}

.tabs-left > .nav.nav-tabs.padding-26,
.tabs-right > .nav.nav-tabs.padding-26 {
  padding-left: 0;
  padding-top: 26px;
}

.nav.nav-tabs.padding-24 {
  padding-left: 24px;
}

.tabs-left > .nav.nav-tabs.padding-24,
.tabs-right > .nav.nav-tabs.padding-24 {
  padding-left: 0;
  padding-top: 24px;
}

.nav.nav-tabs.padding-22 {
  padding-left: 22px;
}

.tabs-left > .nav.nav-tabs.padding-22,
.tabs-right > .nav.nav-tabs.padding-22 {
  padding-left: 0;
  padding-top: 22px;
}

.nav.nav-tabs.padding-20 {
  padding-left: 20px;
}

.tabs-left > .nav.nav-tabs.padding-20,
.tabs-right > .nav.nav-tabs.padding-20 {
  padding-left: 0;
  padding-top: 20px;
}

.nav.nav-tabs.padding-18 {
  padding-left: 18px;
}

.tabs-left > .nav.nav-tabs.padding-18,
.tabs-right > .nav.nav-tabs.padding-18 {
  padding-left: 0;
  padding-top: 18px;
}

.nav.nav-tabs.padding-16 {
  padding-left: 16px;
}

.tabs-left > .nav.nav-tabs.padding-16,
.tabs-right > .nav.nav-tabs.padding-16 {
  padding-left: 0;
  padding-top: 16px;
}

.nav.nav-tabs.padding-14 {
  padding-left: 14px;
}

.tabs-left > .nav.nav-tabs.padding-14,
.tabs-right > .nav.nav-tabs.padding-14 {
  padding-left: 0;
  padding-top: 14px;
}

.nav.nav-tabs.padding-12 {
  padding-left: 12px;
}

.tabs-left > .nav.nav-tabs.padding-12,
.tabs-right > .nav.nav-tabs.padding-12 {
  padding-left: 0;
  padding-top: 12px;
}

.nav.nav-tabs.padding-10 {
  padding-left: 10px;
}

.tabs-left > .nav.nav-tabs.padding-10,
.tabs-right > .nav.nav-tabs.padding-10 {
  padding-left: 0;
  padding-top: 10px;
}

.nav.nav-tabs.padding-8 {
  padding-left: 8px;
}

.tabs-left > .nav.nav-tabs.padding-8,
.tabs-right > .nav.nav-tabs.padding-8 {
  padding-left: 0;
  padding-top: 8px;
}

.nav.nav-tabs.padding-6 {
  padding-left: 6px;
}

.tabs-left > .nav.nav-tabs.padding-6,
.tabs-right > .nav.nav-tabs.padding-6 {
  padding-left: 0;
  padding-top: 6px;
}

.nav.nav-tabs.padding-4 {
  padding-left: 4px;
}

.tabs-left > .nav.nav-tabs.padding-4,
.tabs-right > .nav.nav-tabs.padding-4 {
  padding-left: 0;
  padding-top: 4px;
}

.nav.nav-tabs.padding-2 {
  padding-left: 2px;
}

.tabs-left > .nav.nav-tabs.padding-2,
.tabs-right > .nav.nav-tabs.padding-2 {
  padding-left: 0;
  padding-top: 2px;
}

.nav-tabs {
  border-color: #c5d0dc;
  margin-bottom: 0 !important;
  position: relative;
  top: 1px;
}

.nav-tabs > li > a {
  padding: 7px 12px 8px;
}

.nav-tabs > li > a,
.nav-tabs > li > a:focus {
  border-radius: 0 !important;
  border-color: #c5d0dc;
  background-color: #f9f9f9;
  color: #999;
  margin-right: -1px;
  line-height: 18px;
  position: relative;
}

.nav-tabs > li > a:hover {
  background-color: #fff;
  color: #4c8fbd;
  border-color: #c5d0dc;
}

.nav-tabs > li > a:active,
.nav-tabs > li > a:focus {
  outline: 0 !important;
}

.nav-tabs > li.active > a,
.nav-tabs > li.active > a:focus,
.nav-tabs > li.active > a:hover {
  color: #576373;
  border-color: #c5d0dc #c5d0dc transparent;
  border-top: 2px solid #4c8fbd;
  background-color: #fff;
  z-index: 1;
  line-height: 18px;
  margin-top: -1px;
  box-shadow: 0 -2px 3px 0 rgba(0, 0, 0, 0.15);
}

.tabs-below > .nav-tabs {
  top: auto;
  margin-bottom: 0;
  margin-top: -1px;
  border-color: #c5d0dc;
  border-bottom-width: 0;
}

.tabs-below > .nav-tabs > li > a,
.tabs-below > .nav-tabs > li > a:focus,
.tabs-below > .nav-tabs > li > a:hover {
  border-color: #c5d0dc;
}

.tabs-below > .nav-tabs > li.active > a,
.tabs-below > .nav-tabs > li.active > a:focus,
.tabs-below > .nav-tabs > li.active > a:hover {
  border-color: transparent #c5d0dc #c5d0dc;
  border-top-width: 1px;
  border-bottom: 2px solid #4c8fbd;
  margin-top: 0;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.15);
}

.tabs-left > .nav-tabs > li > a,
.tabs-right > .nav-tabs > li > a {
  min-width: 60px;
}

.tabs-left > .nav-tabs {
  top: auto;
  margin-bottom: 0;
  border-color: #c5d0dc;
  float: left;
}

.tabs-left > .nav-tabs > li {
  float: none !important;
}

.tabs-left > .nav-tabs > li > a,
.tabs-left > .nav-tabs > li > a:focus,
.tabs-left > .nav-tabs > li > a:hover {
  border-color: #c5d0dc;
  margin: 0 -1px 0 0;
}

.tabs-left > .nav-tabs > li.active > a,
.tabs-left > .nav-tabs > li.active > a:focus,
.tabs-left > .nav-tabs > li.active > a:hover {
  border-color: #c5d0dc transparent #c5d0dc #c5d0dc;
  border-top-width: 1px;
  border-left: 2px solid #4c8fbd;
  margin: 0 -1px;
  -webkit-box-shadow: -2px 0 3px 0 rgba(0, 0, 0, 0.15) !important;
  box-shadow: -2px 0 3px 0 rgba(0, 0, 0, 0.15) !important;
}

.tabs-right > .nav-tabs {
  top: auto;
  margin-bottom: 0;
  border-color: #c5d0dc;
  float: right;
}

.tabs-right > .nav-tabs > li {
  float: none !important;
}

.tabs-right > .nav-tabs > li > a,
.tabs-right > .nav-tabs > li > a:focus,
.tabs-right > .nav-tabs > li > a:hover {
  border-color: #c5d0dc;
  margin: 0 -1px;
}

.tabs-right > .nav-tabs > li.active > a,
.tabs-right > .nav-tabs > li.active > a:focus,
.tabs-right > .nav-tabs > li.active > a:hover {
  border-color: #c5d0dc #c5d0dc #c5d0dc transparent;
  border-top-width: 1px;
  border-right: 2px solid #4c8fbd;
  margin: 0 -2px 0 -1px;
  -webkit-box-shadow: 2px 0 3px 0 rgba(0, 0, 0, 0.15);
  box-shadow: 2px 0 3px 0 rgba(0, 0, 0, 0.15);
}

.nav-tabs > li > a .badge {
  padding: 1px 5px;
  line-height: 15px;
  opacity: 0.75;
  vertical-align: initial;
}

.nav-tabs > li > a .ace-icon {
  opacity: 0.75;
}

.nav-tabs > li.active > a .ace-icon,
.nav-tabs > li.active > a .badge {
  opacity: 1;
}

.nav-tabs li .ace-icon {
  width: 1.25em;
  display: inline-block;
  text-align: center;
}

.nav-tabs > li.open .dropdown-toggle {
  background-color: #4f99c6;
  border-color: #4f99c6;
  color: #fff;
}

.nav-tabs > li.open .dropdown-toggle > .ace-icon {
  color: #fff !important;
}

.tabs-left .tab-content,
.tabs-right .tab-content {
  overflow: auto;
}

.dark {
  color: #333 !important;
}

.white {
  color: #fff !important;
}

.red {
  color: #dd5a43 !important;
}

.red2 {
  color: #e08374 !important;
}

.light-red {
  color: #f77 !important;
}

.blue {
  color: #478fca !important;
}

.light-blue {
  color: #93cbf9 !important;
}

.green {
  color: #69aa46 !important;
}

.light-green {
  color: #b0d877 !important;
}

.orange {
  color: #ff892a !important;
}

.orange2 {
  color: #feb902 !important;
}

.light-orange {
  color: #fcac6f !important;
}

.purple {
  color: #a069c3 !important;
}

.pink {
  color: #c6699f !important;
}

.pink2 {
  color: #d6487e !important;
}

.brown {
  color: brown !important;
}

.grey {
  color: #777 !important;
}
</style>
