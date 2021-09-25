import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    comparePassword: (password: string) => Promise<boolean>;
}

const userScheme = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        password: {
            type: String,
            required: true,
            minlength: 6,
        },
    },
    { versionKey: false }
);

userScheme.pre<IUser>("save", async function (next) {
    const user = this;

    if (!user.isModified("password")) return next();

    const salt = await bcrypt.genSalt();

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash;

    next();
});

userScheme.methods.comparePassword = async function (
    password: string
): Promise<boolean> {
    const user: IUser = this;
    return await bcrypt.compare(password, user.password);
};

export default model<IUser>("User", userScheme);
