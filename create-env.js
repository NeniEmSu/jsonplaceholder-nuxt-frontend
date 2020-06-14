const fs = require('fs')
fs.writeFileSync(
  './.env',
  `
  BACKEND_USERS_ENDPOINT=${process.env.BACKEND_USERS_ENDPOINT}\n
  BACKEND_POSTS_ENDPOINT=${process.env.BACKEND_POSTS_ENDPOINT}\n
  BASE_URL=${process.env.BASE_URL}
`
)
