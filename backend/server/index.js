const app = require('./app');
const port = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Inventory Server is listening on port ${PORT}`);
});
