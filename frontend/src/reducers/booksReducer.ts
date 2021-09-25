import { IBook } from "../types/interfaces";

type BooksAction = { type: "ADD_BOOK"; payload: any } | getBooks;

export type getBooks = {
  type: "GET_BOOKS";
  payload: IBook[];
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
    case "GET_BOOKS":
      return {
        ...state,
        books: action.payload,
      };

    default:
      return state;
  }
};
