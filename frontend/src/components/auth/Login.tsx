import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { startLogin } from "../../actions/auth";

interface FormikValues {
  email: string;
  password: string;
}

const Login = () => {
  const dispatch = useDispatch();

  const formValues: FormikValues = {
    email: "",
    password: "",
  };

  return (
    <Formik
      initialValues={formValues}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email("Email is invalid")
          .required("Email is required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      })}
      onSubmit={({ email, password }) => {
        dispatch(startLogin(email, password));
      }}
    >
      {() => (
        <Form>
          <Stack>
            <Field
              name="email"
              type="text"
              label="Email"
              component={TextField}
            />
            <Field
              name="password"
              type="password"
              label="Password"
              component={TextField}
            />
          </Stack>
          <Button type="submit" variant="contained">
            Login
          </Button>
          <Button type="reset" variant="outlined">
            Reset
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default Login;