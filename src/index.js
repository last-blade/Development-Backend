import { app } from "./app.js";
import { connectDB } from "./database/index.js";

connectDB()
  .then(() => {
    const port = process.env.PORT || 8000;
    const host = process.env.NODE_ENV === "production"
      ? `https://developmentbackend.onrender.com`
      : `http://localhost:${port}`;

    app.listen(port, () => {
      console.log(`Server is running on ${host}`);
    });
  })
  .catch((error) => {
    console.log("Error while connecting to database", error.message);
  });
