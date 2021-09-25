//GET EVENTS FROM DB

import toast from "react-hot-toast";
import { ThunkDispatch } from "redux-thunk";
import { fetchWithToken } from "../../helpers/fetch";
import { getBooks } from "../../reducers/booksReducer";
import { IBook, IResponseGETBook } from "../../types/interfaces";

export const bookStartLoading = () => {
  return async (dispatch: ThunkDispatch<any, any, any>) => {
    try {
      const res = await fetchWithToken("book");
      const { ok, books, msg }: IResponseGETBook = await res.json();

      if (ok) {
        dispatch(addBooks(books));
        toast.success("Books Loaded");
      } else {
        msg && toast.error(msg);
      }
    } catch (error) {
      console.log(error);
    }
  };
};

const addBooks = (books: IBook[]): getBooks => ({
  type: "GET_BOOKS",
  payload: books,
});
