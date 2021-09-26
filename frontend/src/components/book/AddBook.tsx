import { Select, Stack } from "@mui/material/";

import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { IAddBook } from "../../types/interfaces";
import InputLabel from "@material-ui/core/InputLabel";
import { startAddNewBook } from "../../actions/books/booksActions";
import { useState } from "react";
import NativeSelect from "@material-ui/core/NativeSelect";

export type SelectNative = "reading" | "to be read" | "completed";

const AddBook = () => {
    const [status, setStatus] = useState("reading");
    const dispatch = useDispatch();

    const formValues: IAddBook = {
        title: "",
        year: 2000,
        author: "",
        status: "reading",
    };

    return (
        <Formik
            initialValues={formValues}
            validationSchema={Yup.object().shape({
                title: Yup.string()
                    .min(2, "Too Short!")
                    .max(50, "Too Long!")
                    .required("title is required"),
                author: Yup.string().min(2, "Too Short!").max(50, "Too Long!"),
                year: Yup.number().max(new Date().getFullYear()),
            })}
            onSubmit={(fields, { resetForm }) => {
                dispatch(
                    startAddNewBook({
                        ...fields,
                        status: status as SelectNative,
                    })
                );
                resetForm(formValues);
            }}>
            {() => (
                <Form>
                    <Stack>
                        <Field
                            name='title'
                            type='text'
                            label='Book Title'
                            component={TextField}
                        />
                        <Field
                            name='author'
                            type='text'
                            label='Author'
                            component={TextField}
                        />
                        <Field
                            name='year'
                            type='number'
                            label='Year'
                            component={TextField}
                        />

                        <InputLabel>Status</InputLabel>
                        <NativeSelect
                            value={status}
                            onChange={({ target }) => setStatus(target.value)}>
                            <option value={"reading"}>Reading</option>
                            <option value={"to be read"}>To be read</option>
                            <option value={"completed"}>Completed</option>
                        </NativeSelect>
                    </Stack>
                    <Button type='submit' variant='contained'>
                        Add
                    </Button>
                    <Button type='reset' variant='outlined'>
                        Reset
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default AddBook;
