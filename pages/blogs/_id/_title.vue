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

    <template v-if="blogLoading">
      <content-placeholders rounded>
        <content-placeholders-heading class="my-5" :lines="1" />
        <content-placeholders-text :lines="3" />
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

            <BlogForm
              v-if="editState"
              :blog-details="blogDetails"
              @Call-Get-Fuction="callGetBlog"
              @Close-Form="editState = false"
            />
          </div>
        </div>
      </div>
      <div class="d-block d-sm-flex align-items-center mb-2">
        <h1 class="text-capitalize">{{ blog.title }}</h1>
        <b-button class="ml-4" variant="light" @click="editState = !editState">
          <b-icon icon="pencil-square" font-scale="1.5"> </b-icon>
        </b-button>

        <b-button
          class="ml-auto"
          variant="light"
          :disabled="deleteLoading"
          @click="deleteBlog(blog.id)"
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
      <strong class="mt-4"
        >By: {{ `${author.name} (${author.username})` }}</strong
      >
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div class="mt-4" v-html="blog.body"></div>
    </template>

    <div class="comments mt-5">
      <h3>Comments:</h3>
      <template v-if="loadingComments">
        <content-placeholders v-for="(n, index) in 5" :key="index" class="my-3">
          <b-media>
            <template v-slot:aside>
              <b-img
                blank
                blank-color="#ccc"
                width="80"
                alt="placeholder"
              ></b-img>
            </template>
            <content-placeholders-heading class="mt-2 mb-1" />
            <content-placeholders-text :lines="2" class="mt-1 mb-2" />
          </b-media>
        </content-placeholders>
      </template>
      <template v-else>
        <b-card v-for="comment in comments" :key="comment.id" class="my-3">
          <b-media>
            <template v-slot:aside>
              <b-img
                blank
                blank-color="#ccc"
                width="64"
                alt="placeholder"
              ></b-img>
            </template>

            <h5 class="mt-0 text-capitalize">{{ comment.name }}</h5>
            <small> By: {{ comment.email }}</small>
            <p class="mb-0">
              {{ comment.body }}
            </p>
          </b-media>
        </b-card>
      </template>
    </div>
  </section>
</template>

<script>
import BlogForm from '~/components/partials/BlogForm'
export default {
  components: {
    BlogForm
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
      blogDetails: {},
      author: {},
      comments: [],
      error: '',
      editState: false,
      blogLoading: false,
      loadingComments: false
    }
  },
  created() {
    this.getBlog()
    this.getComments()
  },
  methods: {
    goBack() {
      this.$router.back()
    },
    onHidden() {
      // Return focus to the button once hidden
      this.$refs.button.focus()
    },
    callGetBlog() {
      this.getBlog()
      this.editState = false
    },
    async getAuthor() {
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_USERS_ENDPOINT}/${this.blog.userId}`
        )
        this.author = await data
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
    },
    async getComments() {
      this.loadingComments = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_USERS_ENDPOINT}/${this.$route.params.id}/comments`
        )
        this.comments = await data
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.loadingComments = false
    },
    async getBlog() {
      this.blogLoading = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_POSTS_ENDPOINT}/${this.$route.params.id}`
        )
        this.blog = await data
        this.blogDetails = await data
        await this.getAuthor()
      } catch (error) {
        this.$swal('Error', error.response.data.error, 'error')
      }
      this.blogLoading = false
    },
    deleteBlog(id) {
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
            .$delete(`${process.env.BACKEND_POSTS_ENDPOINT}/${id}`)
            .then((response) => {
              this.deleteLoading = false
              this.$router.push('/blogs')
              this.$swal({
                text: "Poof! You've sucessfully deleted that blog!",
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
          this.$swal('That blog post is safe!')
        }
      })
    }
  },
  head() {
    return {
      title: this.$route.params.title,
      titleTemplate: 'ETT - %s!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.$route.params.id
        }
      ]
    }
  }
}
</script>
