import { Container, Grid, ImageList, ImageListItem } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookStartLoading } from "../../actions/books/booksActions";
import { RootState } from "../../reducers/rootReducer";
import AddBook from "./AddBook";
import BookCard from "./BookCard";

interface Props {}

const HomeScreen = (props: Props) => {
    const dispatch = useDispatch();
    const { books } = useSelector((state: RootState) => state.books);

    useEffect(() => {
        dispatch(bookStartLoading());
    }, [dispatch]);

    return (
        <Container>
            <div className='grid_container'>
                {books.map((book) => (
                    <BookCard key={book._id} book={book} />
                ))}
            </div>

            <AddBook />
        </Container>
    );
};

export default HomeScreen;
