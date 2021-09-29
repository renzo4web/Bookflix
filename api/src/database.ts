import mongoose, { ConnectOptions } from "mongoose";
import config from "./config"

(async () => {

  try {
      const db = await mongoose.connect(config.CNN_STRING);
      console.log(`Database connected to: ${db.connection.name}`);
  } catch (error) {
      console.error(error);
      process.exit(0);
  }

})();
