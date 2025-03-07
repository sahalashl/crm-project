const app = require("./app");
const connectDB = require("./src/config/db");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

connectDB();
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});