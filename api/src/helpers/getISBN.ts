import axios, { AxiosResponse } from "axios";
import { GoogleAPIBook } from "../types/interfaces";

export const getISBN = async (title: string): Promise<any> => {
    return axios
        .get(`https://www.googleapis.com/books/v1/volumes?q=intitle:${title}`)
        .then((response: AxiosResponse<GoogleAPIBook>) => {
            const {
                averageRating,
                categories,
                pageCount,
                description,
                previewLink,
                imageLinks: { thumbnail },
            } = response.data.items[0].volumeInfo;

            const { textSnippet } = response.data.items[0].searchInfo;

            const aditionalInfo = {
                thumbnail,
                categories,
                pageCount,
                description,
                previewLink,
                averageRating,
                textSnippet,
            };

            return aditionalInfo;
        })
        .catch((error) => {
            console.log(error);
            return {};
        });
};
