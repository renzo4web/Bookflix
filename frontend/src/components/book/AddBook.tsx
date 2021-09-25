import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { startRegister } from "../../actions/auth/registerActions";
import { IAddBook } from "../../types/interfaces";

interface FormikValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const AddBook = () => {
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
        name: Yup.string().required("Name is required"),
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Confirm Password is required"),
      })}
      onSubmit={(fields) => {
        console.log(fields);
      }}
    >
      {() => (
        <Form>
          <Stack>
            <Field
              name="title"
              type="text"
              label="Book Title"
              component={TextField}
            />
            <Field
              name="author"
              type="text"
              label="Author"
              component={TextField}
            />
            <Field
              name="year"
              type="number"
              label="Year"
              component={TextField}
            />
            <Field
              name="year"
              type="number"
              label="Year"
              component={TextField}
            />
          </Stack>
          <Button type="submit" variant="contained">
            Add
          </Button>
          <Button type="reset" variant="outlined">
            Reset
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default AddBook;
