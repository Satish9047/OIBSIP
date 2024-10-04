import { appConfig } from "./configs/app.config";
import app from "./app";
import { connectDb } from "./db/database";

connectDb()
  .then(() => {
    app.listen(appConfig.port, () => {
      console.log(`Server is running on port ${appConfig.port}....`);
    });
  })
  .catch((error: Error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
