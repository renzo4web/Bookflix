import { IAddBook, IBook } from "../types/interfaces";

type BooksAction = AddNewBook | GetBooks | DeleteBook | UpdateBook;

export type GetBooks = {
    type: "GET_BOOKS_FROM_DB";
    payload: IBook[];
};

export type AddNewBook = {
    type: "ADD_NEW_BOOK_TO_DB";
    payload: IAddBook;
};

export type UpdateBook = {
    type: "UPDATE_BOOK";
    payload: IBook;
};

export type DeleteBook = {
    type: "DELETE_BOOK";
    payload: string;
};

export interface BookState {
    books: IBook[];
}

const initialState: BookState = {
    books: [] as IBook[],
};

export const booksReducer = (
    state: BookState = initialState,
    action: BooksAction
) => {
    switch (action.type) {
        case "GET_BOOKS_FROM_DB":
            return {
                ...state,
                books: action.payload,
            };

        case "ADD_NEW_BOOK_TO_DB":
            return {
                ...state,
                books: [...state.books, action.payload],
            };

        case "UPDATE_BOOK":
            console.log(action.payload);
            return {
                ...state,
                books: state.books.map((book) =>
                    book._id === action.payload._id ? action.payload : book
                ),
            };

        case "DELETE_BOOK":
            return {
                ...state,
                books: state.books.filter(
                    (book) => book._id !== action.payload
                ),
            };

        default:
            return state;
    }
};
