# edicasoft-vue-test-task

> an interface that allows to view a list of users, search a user by username, add a new user, edit an existing user, delete a user.

1. Deploy command
   Build command:

```bash
   .env
  BACKEND_USERS_ENDPOINT='link to api required'
  BASE_URL='link to front-end required'
```

```bash
   npm run generate
  #  for netlify build
   node ./create-env.js && npm run generate
```

also add the necessary environment variables
2. If the ./create-env.js command is used make sure to add env variables to the site server.
3. Deployed dirctory: dist
4. Build for production shoukd be ready.

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
