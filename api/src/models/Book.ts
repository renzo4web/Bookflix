import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface Book extends Document {
    title: string;
    author: string;
    cover?: string;
    year: number;
    status: "completed" | "to be read" | "reading";
    user: PopulatedDoc<IUser>;
}

const BookScheme = new Schema<Book>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        cover: {
            type: String,
            required: false,
            trim: true,
        },

        author: {
            type: String,
            required: true,
            trim: true,
        },

        year: {
            type: Number,
            required: true,
        },

        status: {
            type: String,
            required: true,
            trim: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default model<Book>("Book", BookScheme);
