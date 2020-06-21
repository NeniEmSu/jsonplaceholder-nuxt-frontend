<template>
  <section class="container mt-5">
    <div>
      <h1>
        Blogs
      </h1>

      <template v-if="blogsLoading">
        <content-placeholders v-for="(n, index) in 5" :key="index" class="my-3">
          <content-placeholders-heading class="mt-2 mb-1" />
          <b-media right-align vertical-align="center">
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
        <section class="mt-2">
          <BlogForm
            v-if="addState"
            :adding="adding"
            :blog-details="blogDetails"
            @Call-Get-Fuction="callGetBlogs"
            @Reset-State="resetFormState"
            @Close-Form="addState = false"
          />
          <div class="my-2">
            <div class="d-flex">
              <button class="btn btn-info my-3" @click="initForm">
                {{ addState ? 'Cancel' : 'Add Blog' }}
              </button>
              <b-form-group class="col-sm ml-auto my-auto">
                <b-input-group>
                  <b-input-group-prepend is-text>
                    <b-icon icon="search" font-scale="1.5"> </b-icon>
                  </b-input-group-prepend>
                  <b-input
                    v-model="search"
                    type="text"
                    placeholder="Search by Title"
                    required
                    name="Search"
                  />
                </b-input-group>
              </b-form-group>
            </div>

            <div v-for="blog in filteredData" :key="blog.id">
              <b-media class="my-2" right-align vertical-align="center">
                <template v-slot:aside>
                  <b-img
                    blank
                    blank-color="#ccc"
                    width="80"
                    alt="placeholder"
                  ></b-img>
                </template>
                <h4 class="mt-1 mb-1">
                  {{ blog.title | truncate(25, '...') }}
                </h4>
                <div class="mb-2">{{ blog.body | truncate(60, '...') }}</div>
                <nuxt-link
                  class="ml-auto"
                  variant="light"
                  :aria-label="`Link to ${blog.title} `"
                  :to="{
                    name: 'blogs-id-title',
                    params: { id: blog.id, title: blog.title }
                  }"
                >
                  Read More
                </nuxt-link>
              </b-media>
            </div>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script>
import _ from 'lodash'
import BlogForm from '~/components/partials/BlogForm'

export default {
  name: 'Blogs',
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
      blogDetails: {
        title: null,
        body: null
      },
      search: '',
      adding: true,
      allBlogs: [],
      filteredData: [],
      blogsLoading: false,
      deleteLoading: false,
      addState: false
    }
  },

  computed: {},

  watch: {
    allBlogs() {
      this.getfilteredData()
    },
    search: _.debounce(async function(value) {
      const route = {
        name: 'blogs'
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
    this.getAllBlogs()
  },

  mounted() {
    this.getfilteredData(this.search)
  },

  methods: {
    initForm() {
      this.addState = !this.addState
    },

    resetFormState() {
      this.blogDetails = {
        title: null,
        body: null
      }
    },

    getfilteredData(search) {
      this.filteredData = this.allBlogs
      let filteredDataBySearch = []

      if (search) {
        filteredDataBySearch = this.filteredData.filter((obj) =>
          obj.title.toUpperCase().match(search.toUpperCase())
        )
        this.filteredData = filteredDataBySearch
      }
    },
    async getAllBlogs() {
      const config = {
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        }
      }
      this.blogsLoading = true
      try {
        const data = await this.$axios.$get(
          `${process.env.BACKEND_POSTS_ENDPOINT}`,
          config
        )
        const response = await data
        this.allBlogs = response
        this.blogsLoading = false
      } catch (error) {
        this.blogsLoading = false
        this.$swal('Error', error.response.data.error, 'error')
      }
    },

    callGetBlogs() {
      this.getAllBlogs()
      this.addState = false
    }
  },
  head() {
    return {
      title: 'Blogs',
      titleTemplate: '%s - Json Placeholder Nuxt Frontend!',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content:
            'View a list of blogs, search a blog by blogname, add a new blog, navigate to edit an existing blog, delete a blog.'
        }
      ]
    }
  }
}
</script>

<style lang="scss">
.content p {
  width: 250px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
