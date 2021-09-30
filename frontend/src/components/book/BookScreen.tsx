/* eslint-disable no-sparse-arrays */
import { Divider, Link, ListItemText } from "@material-ui/core";
import Box from "@material-ui/core/Box";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import NativeSelect from "@material-ui/core/NativeSelect";
import { Button, Typography } from "@mui/material";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router";
import { startUpdateBook } from "../../actions/books/booksActions";
import { RootState } from "../../reducers/rootReducer";

interface Props {}

const BookScreen = (props: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { books } = useSelector((state: RootState) => state.books);
  const { id } = useParams<{ id: string }>();

  const book = books.find((book) => book._id === id);
  const [newStatus, setNewStatus] = useState(() => book?.status || "reading");

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    // only dispatch if the status is diferent to the previous
    if (book?.status !== newStatus) {
      dispatch(startUpdateBook(id, { status: newStatus }));
    }
  };

  if (!book) {
    return <Redirect to="/" />;
  }

  const { title, status } = book;
  const {
    thumbnail,
    description,
    categories,
    pageCount,
    averageRating,
    previewLink,
  } = book.additionalInfo;

  return (
      <div className='book_screen'>
          <Box
              sx={{
                  bgcolor: "orange",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "2em",
                  width: "100%",
                  maxWidth: [, , "600px"],
                  flexGrow: 1,
              }}>
              <img src={thumbnail} alt={title} />
          </Box>
          <Box
              sx={{
                  flexGrow: 1,
                  padding: 10,
                  marginX: "auto",
                  maxWidth: "64ch",
                  overflow: "scroll",
              }}>
              <Typography component='h1' variant='h4' sx={{ paddingX: 2 }}>
                  {title}
              </Typography>
              <Typography
                  component='p'
                  variant='subtitle1'
                  sx={{ paddingX: 2 }}>
                  Categories:
                  <Typography component='strong' variant='body1'>
                      {categories}
                  </Typography>
              </Typography>
              <Typography
                  component='h2'
                  variant='h5'
                  sx={{ paddingX: 2, marginY: 2 }}>
                  Current status:
                  <Typography
                      component='strong'
                      variant='h5'
                      sx={{ color: "green" }}>
                      {status}
                  </Typography>
              </Typography>

              <Typography component='p' variant='body1' sx={{ paddingX: 2 }}>
                  {description}
              </Typography>

              <List component='ul' aria-label='list book'>
                  <ListItem>
                      <ListItemText
                          primary='Page Count'
                          secondary={pageCount}
                      />
                  </ListItem>
                  <Divider />
                  <ListItem divider>
                      <ListItemText
                          primary='Average Rating'
                          secondary={averageRating}
                      />
                  </ListItem>
              </List>

              <Typography
                  component='p'
                  variant='body1'
                  sx={{ paddingX: 2, my: 4 }}>
                  <Link href={previewLink} underline='hover'>
                      Preview
                  </Link>
              </Typography>

              <Box
                  sx={{
                      my: "1em",
                      border: "2px solid #c1c1c1",
                      padding: 10,
                      borderRadius: 10,
                  }}>
                  <form onSubmit={handleSubmit}>
                      <InputLabel>Current status</InputLabel>
                      <NativeSelect
                          value={newStatus}
                          onChange={({ target }) => setNewStatus(target.value)}>
                          <option value={"reading"}>Reading</option>
                          <option value={"to be read"}>To be read</option>
                          <option value={"completed"}>Completed</option>
                      </NativeSelect>
                      <Button type='submit'>Update</Button>
                  </form>
              </Box>
              <Button
                  role='navigation'
                  sx={{ marginTop: "auto" }}
                  onClick={() => history.push("/")}
                  startIcon={<ArrowBackIcon />}>
                  Go back
              </Button>
          </Box>
      </div>
  );
};

export default BookScreen;
