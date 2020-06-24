<template>
  <aside>
    <template v-if="loading">
      <div class="username-heading loading">
        <content-placeholders>
          <content-placeholders-heading :img="true" />
        </content-placeholders>
      </div>
      <div class="info">
        <content-placeholders>
          <content-placeholders-text :lines="3" />
        </content-placeholders>
      </div>
    </template>
    <template v-else-if="error">
      <inline-error-block :error="error" />
    </template>
    <template v-else>
      <nuxt-link
        class="username-heading"
        :to="{
          name: 'username',
          params: { username: author.username }
        }"
        tag="div"
      >
        <nuxt-link
          :to="{
            name: 'users-id-username',
            params: { id: author.id, username: author.username }
          }"
        >
          <img
            src="https://www.mobileworldlive.com/wp-content/uploads/2015/10/Dorsey-iamge.png"
            width="60"
            :alt="author.name"
          />
        </nuxt-link>
        <div class="text">
          <nuxt-link
            :to="{
              name: 'users-id-username',
              params: { id: author.id, username: author.username }
            }"
          >
            <span>{{ author.name }}</span>
          </nuxt-link>
          <nuxt-link
            :to="{
              name: 'users-id-username',
              params: { id: author.id, username: author.username }
            }"
          >
            <span>@{{ author.username }}</span>
          </nuxt-link>
        </div>
      </nuxt-link>
      <nuxt-link
        :to="{
          name: 'users-id-username',
          params: { id: author.id, username: author.username }
        }"
        class="f-button"
      >
        See profile
      </nuxt-link>
      <div class="info">
        <div v-if="author.email">
          <div class="title">contact</div>
          <div class="content">{{ author.email }}</div>
        </div>
        <div v-if="author.address">
          <div class="title">location</div>
          <div class="content">
            <span v-if="author.address.street">{{
              author.address.street
            }}</span>
            <span v-if="author.address.suite">{{ author.address.suite }}</span>
            <span v-if="author.address.city">{{ author.address.city }}</span>
          </div>
        </div>
        <div v-if="author.company">
          <div class="title">works for</div>
          <div class="content">{{ author.company.name }}</div>
        </div>
      </div>
    </template>
  </aside>
</template>

<script>
export default {
  props: {
    userId: {
      default: 1,
      type: Number
    },
    loading: {
      default: false,
      type: Boolean
    },
    error: {
      default: false,
      type: Boolean
    }
  },
  computed: {
    author() {
      return this.$store.getters['users/getAuthorById'](this.userId)
    }
  }
}
</script>

<style lang="scss" scoped>
$body-font-family: 'Inter';
$body-font-weight: 400;
$bold-body-font-weight: 500;
$body-font-feature-settings: 'normal';
$display-font-family: 'Inter';
$display-font-weight: 600;
$display-font-feature-settings: 'normal';
$primary-color: #6e87d2;
$primary-dark: #d4dfe8;
$surface-color: #eff4f7;
$on-surface-color: #000000;
$hovered-surface-color: linear-gradient(
  135deg,
  rgba(0, 0, 0, 0.09),
  rgba(255, 255, 255, 0)
);
$elevated-surface-color: #dfe8ef;
$on-elevated-surface-color: yellow;
$gray-color: #999999;
$shadow: -9px -9px 16px #f8fafe, 9px 9px 16px #ced2db;
$inner-shadow: inset -9px -9px 16px #f0f3f9, inset 9px 9px 16px #ced2db;
$small-shadow: -4px -4px 8px #f8fafe, 4px 4px 8px #ced2db;
$small-inner-shadow: inset -4px -4px 8px #f0f3f9, inset 4px 4px 8px #ced2db,
  inset -1px -1px 4px #8e8e8e;
$screen-sm: 640px;
$screen-md: 834px;
$screen-lg: 1024px;
$screen-xl: 1280px;
$text-ssss: 0.333333rem;
$text-sss: 0.5rem;
$text-ss: 0.666666rem;
$text-xs: 0.75rem;
$text-sm: 0.875rem;
$text-base: 1rem;
$text-lg: 1.125rem;
$text-xl: 1.25rem;
$text-2xl: 1.5rem;
$text-3xl: 1.875rem;
$text-4xl: 2.25rem;
$-ls5: 5 * -0.0125rem;
$-ls4: 4 * -0.0125rem;
$-ls3: 3 * -0.0125rem;
$-ls2: 2 * -0.0125rem;
$-ls1: -0.0125rem;
$ls1: 0.0125rem;
$ls2: 2 * 0.0125rem;
$ls3: 3 * 0.0125rem;
$ls4: 4 * 0.0125rem;
$ls5: 5 * 0.0125rem;
$sans-serif-fallback-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI',
  Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
  'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
aside {
  padding: 1rem;
  background-color: $elevated-surface-color;
  border-radius: 1rem;
  .username-heading {
    display: flex;
    margin-bottom: 1rem;
    &:hover {
      color: $primary-color;
    }
    img {
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      margin-right: 1rem;
    }
    .text {
      display: flex;
      flex-direction: column;
      justify-content: center;
      a {
        line-height: 1;
      }
      a:first-child {
        font-size: $text-xl;
        font-weight: $bold-body-font-weight;
        letter-spacing: $-ls2;
        margin-bottom: 0.25rem;
      }
      a:last-child {
        color: $gray-color;
        font-size: $text-sm;
        // font-weight: $bold-body-font-weight;
      }
    }
    &.loading {
      display: block;
    }
  }
  .f-button {
    display: block;
    width: 100%;
    padding: 0.5rem;
    border-radius: 0.5rem;
    box-shadow: $small-shadow;
    text-transform: uppercase;
    text-align: center;
    font-weight: $display-font-weight;
    letter-spacing: $-ls2;
    margin-bottom: 1rem;
    &:hover {
      background: $hovered-surface-color;
    }
    &:active {
      background: transparent;
      box-shadow: $small-inner-shadow;
    }
  }
  .info {
    > div {
      margin-bottom: 0.5rem;
    }
    .title {
      font-size: $text-ss;
      letter-spacing: $-ls1;
      font-weight: $bold-body-font-weight;
      color: $gray-color;
      text-transform: uppercase;
      margin-bottom: 0.1rem;
    }
    .content {
      font-size: $text-sm;
      line-height: 1.4;

      & > span + span:before {
        display: inline;
        content: ', ';
        margin-left: 1px;
        margin-right: 3px;
        color: #666;
        border-bottom: 1px solid #fff;
      }
    }
  }
}
</style>
