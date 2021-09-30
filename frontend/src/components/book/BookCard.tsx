import * as React from "react";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import { IBook } from "../../types/interfaces";
import { useDispatch } from "react-redux";
import { startDeleteBook } from "../../actions/books/booksActions";
import { useHistory } from "react-router";
import CardActionArea from "@mui/material/CardActionArea";

interface Props {
  book: IBook;
}

const BookCard: React.FC<Props> = ({ book }) => {
  const history = useHistory();
  const dispatch = useDispatch();

  const { title, additionalInfo, status } = book;
  const { thumbnail, pageCount, textSnippet } = additionalInfo;

  return (
    <Card sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}>
      <CardActionArea onClick={() => history.push(`book/${book._id}`)}>
        <CardMedia component="img" height="140" image={thumbnail} alt={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {textSnippet}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions
        sx={{
          mt: "auto",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Page count: {pageCount}
        </Typography>
        <Typography variant="overline" color="text.primary">
          Status: {status}
        </Typography>
        <IconButton
          onClick={() => dispatch(startDeleteBook(book._id))}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default BookCard;
