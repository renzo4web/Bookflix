//GET EVENTS FROM DB

import toast from "react-hot-toast";
import { ThunkDispatch } from "redux-thunk";
import { fetchWithToken } from "../../helpers/fetch";
import {
    AddNewBook,
    ClearState,
    DeleteBook,
    GetBooks,
    UpdateBook,
} from "../../reducers/booksReducer";
import { IAddBook, IBook, IResponseGETBook } from "../../types/interfaces";

export const bookStartLoading = () => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await fetchWithToken("book");
            const { ok, books, msg }: IResponseGETBook = await res.json();

            if (ok) {
                dispatch(loadBooksFromDB(books));
            } else {
                msg && toast.error(msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 *
 *  CRUD Operations
 *
 */

export const startAddNewBook = (book: IAddBook) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await fetchWithToken("book", book, "POST");
            const body = await res.json();

            if (body.ok) {
                dispatch(addNewBook(body.doc));
            } else {
                toast.error(body.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

export const startDeleteBook = (id: string) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await fetchWithToken(`book/${id}`, {}, "DELETE");
            const body = await res.json();

            if (body.ok) {
                dispatch(deleteBook(body.remove._id));
            } else {
                toast.error(body.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

interface NewData {
    title?: string;
    status?: string;
}

export const startUpdateBook = (id: string, newData: NewData) => {
    return async (dispatch: ThunkDispatch<any, any, any>) => {
        try {
            const res = await fetchWithToken(
                `book/${id}`,
                { ...newData },
                "PUT"
            );
            const body = await res.json();

            if (body.ok) {
                dispatch(updateBook(body.updated));
            } else {
                toast.error(body.msg);
            }
        } catch (error) {
            console.log(error);
        }
    };
};

/**
 *  Sync Actions
 */

const addNewBook = (book: IAddBook): AddNewBook => ({
    type: "ADD_NEW_BOOK_TO_DB",
    payload: book,
});

const loadBooksFromDB = (books: IBook[]): GetBooks => ({
    type: "GET_BOOKS_FROM_DB",
    payload: books,
});

const updateBook = (book: IBook): UpdateBook => ({
    type: "UPDATE_BOOK",
    payload: book,
});

const deleteBook = (id: string): DeleteBook => ({
    type: "DELETE_BOOK",
    payload: id,
});

export const clearBooksState = (): ClearState => ({
    type: "CLEAR_BOOKS_STATE",
});
    


