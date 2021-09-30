import { Box, Link, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bookStartLoading } from "../../actions/books/booksActions";
import { RootState } from "../../reducers/rootReducer";
import PrimarySearchBar from "../ui/PrimarySearchBar";
import AddBook from "./AddBook";
import BookCard from "./BookCard";

interface Props {}

const HomeScreen = (props: Props) => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { books } = useSelector((state: RootState) => state.books);

  useEffect(() => {
    dispatch(bookStartLoading());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        height: "100%",
      }}
    >
      <PrimarySearchBar
        handleSearchValue={(value: string) => setSearch(value)}
      />
      <div className="home_container">
        <div className="grid_container">
          {books
            .filter((book) =>
              search.length > 2
                ? book.title.toLowerCase().includes(search.toLowerCase()) &&
                  book
                : book
            )
            .map((book) => (
              <BookCard key={book._id} book={book} />
            ))}
        </div>
        <AddBook />
      </div>
      <footer className="footer">
        <Typography
          variant="caption"
          component="p"
          sx={{ textAlign: "center" }}
        >
          Crafted by{" "}
          <Link underline="hover" href="https://github.com/renzo4web">
            Renzo
          </Link>
          , to motivate me to read more, I hope you find it useful.
        </Typography>
      </footer>
    </Box>
  );
};

export default HomeScreen;
