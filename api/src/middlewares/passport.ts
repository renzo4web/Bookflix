import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import config from "../config";
import User, { IUser } from "../models/User";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

export default new Strategy(opts, async (payload: IUser, done) => {
  try {
    const user = await User.findById(payload.id);
    const { id, name } = user as IUser;
    return user
      ? done(null, { id, name })
      : done(null, false, {
          message: "User doesn not have authorized properly",
        });
  } catch (error) {
    console.log(error);
  }
});
