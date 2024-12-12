import { appConfigured } from "./app";
import connectDB from "./database";

connectDB(); // connects to DB
appConfigured.listen(8000, () => console.log("Listening port 8000"));
