import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import PreviewIcon from "@mui/icons-material/Preview";
import StarIcon from "@mui/icons-material/Star";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import { IBook } from "../../types/interfaces";
import Icon from "@mui/material/Icon";
import { useDispatch } from "react-redux";
import { startDeleteBook } from "../../actions/books/booksActions";
import { Button, CardActionArea } from "@mui/material";
import { useHistory } from "react-router";

interface Props {
    book: IBook;
}

const COLOR_STATUS: { [k: string]: string } = {
    completed: "success.main",
    "to be read": "info.main",
    reading: "secondary.main",
};

const BookCard: React.FC<Props> = ({ book }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const { title, author, additionalInfo, status } = book;
    const {
        description,
        thumbnail,
        previewLink,
        averageRating,
        categories,
        textSnippet,
    } = additionalInfo;

    return (
        <Card
            sx={{ maxWidth: 345, display: "flex", flexDirection: "column" }}
            key={title}>
            <CardActionArea onClick={() => history.push(`book/${book._id}`)}>
                <CardMedia
                    component='img'
                    height='140'
                    image={thumbnail}
                    alt={title}
                />
                <CardContent>
                    <Typography gutterBottom variant='h5' component='div'>
                        {title}
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        {textSnippet}
                    </Typography>
                </CardContent>
            </CardActionArea>
            <CardActions sx={{ mt: "auto" }}>
                <IconButton
                    onClick={() => dispatch(startDeleteBook(book._id))}
                    size='small'
                    color='error'>
                    <DeleteIcon />
                </IconButton>
            </CardActions>
        </Card>
    );
};

export default BookCard;
