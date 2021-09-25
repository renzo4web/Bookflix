import { Container } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookStartLoading } from "../../actions/books/booksActions";
import { RootState } from "../../reducers/rootReducer";
import AddBook from "./AddBook";

interface Props {}

const BookScreen = (props: Props) => {
  const dispatch = useDispatch();
  const { books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(bookStartLoading());
  }, [dispatch]);

  return (
    <div>
      <h1>BooksScreen</h1>
      {books.length > 0 && books.map((book) => <h2>{book.title}</h2>)}

      <Container>
        <AddBook />
      </Container>
    </div>
  );
};

export default BookScreen;
