import mongoose, { ConnectOptions } from "mongoose";
import config from "./config"

(async () => {

  try {
    const mongooseOptions: ConnectOptions = {
        user: config.DB.USER,
        pass: config.DB.PASSWORD,
    };

    const db = await mongoose.connect(
        `mongodb://${config.DB.HOST}/${config.DB.NAME}`
    );
    console.log(`Database connected to: ${db.connection.name}`);
  } catch (error) {
    console.error(error);
    process.exit(0)
  }

})();
