import mongoose, { ConnectOptions } from "mongoose";
import { Mockgoose } from "mockgoose";
import config from "./config";

(async () => {
  try {
    if (process.env.NODE_ENV === "test") {
      let mockgoose: Mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage().then(async () => {
        await mongoose.connect(config.CNN_STRING);
        await mongoose.connection.on("connected", () => {
          console.log("db connection is now open");
        });
      });
    } else {
      const db = await mongoose.connect(config.CNN_STRING);
      console.log(`Database connected to: ${db.connection.name}`);
    }
  } catch (error) {
    console.error(error);
    process.exit(0);
  }
})();
