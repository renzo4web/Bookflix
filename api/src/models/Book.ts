import { Schema, model, Document, PopulatedDoc } from "mongoose";
import { IUser } from "./User";

export interface Book extends Document {
    title: string;
    author: string;
    additionalInfo: AdditionalInfo;
    year: number;
    status: "completed" | "to be read" | "reading";
    user: PopulatedDoc<IUser>;
}

export interface AdditionalInfo {
    thumbnail: string;
    categories: string[];
    pageCount: number;
    description: string;
    previewLink: string;
    averageRating: number;
    textSnippet: string;
}

const additionalInfoSchema = new Schema({
    thumbnail: String,

    categories: [
        {
            type: String,
        },
    ],
    pageCount: Number,
    description: String,
    previewLink: String,
    averageRating: Number,
    textSnippet: String,
});

const BookScheme = new Schema<Book>(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        additionalInfo: additionalInfoSchema,

        author: {
            type: String,
            trim: true,
        },

        year: {
            type: Number,
        },

        status: {
            type: String,
            trim: true,
        },

        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            get: (v: any) => v.toString(),
            required: true,
        },
    },
    { timestamps: true, versionKey: false }
);

export default model<Book>("Book", BookScheme);
