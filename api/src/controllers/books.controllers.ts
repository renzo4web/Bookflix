import { Response, Request, RequestHandler } from "express";
import { getISBN } from "../helpers/getISBN";
import Book, { Book as IBook } from "../models/Book";

const message = {
    errorDb: "DB error contact your db administrator",
};

interface IRequest extends Request {
    uid: string;
}

export const addBook: RequestHandler = async (req: IRequest | any, res) => {
    const book = new Book(req.body as IBook);
    const uid = req.uid;

    try {
        if (!req.body) {
            return res.status(400).json({
                ok: false,
                msg: "content POST request not provided",
            });
        }

        book.user = uid;
        const additionalInfo = await getISBN(book.title);

        book.additionalInfo = additionalInfo;

        const doc = await book.save();

        return res.status(201).json({
            ok: true,
            msg: "Book saved",
            doc,
        });
    } catch (error) {
        console.log(error);
        return res.json({
            ok: false,
            msg: message.errorDb,
        });
    }
};

export const updateBook: RequestHandler<{ id: string }> = async (req, res) => {
    const bookId = req.params.id;
    const { uid } = req;

    try {
        const book = await Book.findOne({ id: bookId })!;

        if (!book) {
            return res.status(204).json({
                ok: false,
                msg: "Book not found",
            });
        }

        if (book.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User unauthorized no update",
            });
        }

        const additionalInfo = await getISBN(book.title);

        const bookToUpdate = {
            ...(req.body as IBook),
            additionalInfo,
        };

        const updated = await Book.findByIdAndUpdate(bookId, bookToUpdate, {
            new: true,
            lean: true,
        });

        return res.status(201).json({
            ok: true,
            updated,
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: message.errorDb,
        });
    }
};

export const deleteBook: RequestHandler<{ id: string }> = async (req, res) => {
    const bookId = req.params.id;
    const { uid } = req;

    console.log("UID", uid);

    try {
        const book = await Book.findOne({ id: bookId })!;

        if (!book) {
            return res.status(204).json({
                ok: false,
                msg: "Book not found",
            });
        }

        console.log("USER", book.user.id);
        if (book.user !== uid) {
            return res.status(401).json({
                ok: false,
                msg: "User unauthorized no delete",
            });
        }

        const bookRemoved = await Book.findByIdAndDelete(bookId);

        return res.status(201).json({
            ok: true,
            remove: bookRemoved,
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: message.errorDb,
        });
    }
};

export const getBooks: RequestHandler = async (req, res) => {
    try {
        const books = await Book.find({ user: req.uid });

        if (!books) {
            return res.status(204).json({
                ok: false,
                msg: "Book not found",
            });
        }

        return res.status(201).json({
            ok: true,
            books,
        });
    } catch (error) {
        console.error(error);
        return res.status(401).json({
            ok: false,
            msg: message.errorDb,
        });
    }
};
