import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router";
import { startUpdateBook } from "../../actions/books/booksActions";
import { RootState } from "../../reducers/rootReducer";

interface Props {}

const BookScreen = (props: Props) => {
    const dispatch = useDispatch();
    const { books } = useSelector((state: RootState) => state.books);
    const { id } = useParams<{ id: string }>();

    const book = books.find((book) => book._id === id);
    const [status, setStatus] = useState(() => book?.status || "reading");

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        // only dispatch if the status is diferent to the previous
        if (book?.status !== status) {
            dispatch(startUpdateBook(id, { status }));
        }
    };

    if (!book) {
        return <Redirect to='/' />;
    }

    return (
        <div>
            <h1>{id}</h1>
            <h2>{book.title}</h2>
            <h2>Status:{book.status}</h2>
            <form onSubmit={handleSubmit}>
                <InputLabel>Status</InputLabel>
                <NativeSelect
                    value={status}
                    onChange={({ target }) => setStatus(target.value)}>
                    <option value={"reading"}>Reading</option>
                    <option value={"to be read"}>To be read</option>
                    <option value={"completed"}>Completed</option>
                </NativeSelect>
                <Button type='submit'>update status</Button>
            </form>
        </div>
    );
};

export default BookScreen;
