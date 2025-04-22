import { app } from "./app.js";
import { connectDB } from "./database.js";

const PORT = process.env.PORT || 8000;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server is listening on http://localhost:${PORT}`)
    })
})
.catch((error) => {
    console.log(`Database connection failed!!! ${error.message}`);
});