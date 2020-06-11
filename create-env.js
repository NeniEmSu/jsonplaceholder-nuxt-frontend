const fs = require('fs')
fs.writeFileSync(
  './.env'`
  BACKEND_USERS_ENDPOINT${process.env.BACKEND_USERS_ENDPOINT}
`
)
