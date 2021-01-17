const app = require('./app')
const port = process.env.npm_config_port || process.env.PORT || 3000
// start command with port: npm --port=${your port} run start
app.listen(port, () => {
  console.log(`App is running on port ${port}`)
})
