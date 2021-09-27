import { Stack } from "@mui/material";
import Button from "@mui/material/Button";
import { Formik, Field, Form } from "formik";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { startRegister } from "../../actions/auth/registerActions";

interface FormikValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const dispatch = useDispatch();

  const formValues: FormikValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
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
          onSubmit={({ name, email, password }) => {
              dispatch(startRegister(name, email, password));
          }}>
          {() => (
              <Form>
                  <Stack>
                      <Field
                          name='name'
                          type='text'
                          label='Name'
                          component={TextField}
                      />
                      <Field
                          name='email'
                          type='text'
                          label='Email'
                          component={TextField}
                      />
                      <Field
                          name='password'
                          type='password'
                          label='Password'
                          component={TextField}
                      />
                      <Field
                          name='confirmPassword'
                          label='Confirm Password'
                          type='password'
                          component={TextField}
                      />
                  </Stack>
                  <Button
                      type='submit'
                      variant='contained'
                      sx={{ mr: 2, mt: 2 }}>
                      Register
                  </Button>
                  <Button type='reset' variant='outlined' sx={{ mr: 2, mt: 2 }}>
                      Reset
                  </Button>
              </Form>
          )}
      </Formik>
  );
};

export default Register;
