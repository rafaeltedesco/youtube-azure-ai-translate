const app = require('./app');

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server up and listening on PORT ${PORT}`);
})