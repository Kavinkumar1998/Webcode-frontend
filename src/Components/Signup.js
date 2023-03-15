import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { Button, Card, CardContent, TextField } from "@mui/material";

const formValidationSchema = yup.object({
  FirstName: yup.string().required("required"),
  LastName: yup.string().required("required"),
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required").min(8),
});

export const SignupPage = () => {
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        FirstName: "",
        LastName: "",
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: (values) => {
        fetch(`https://wecode-backend.vercel.app/api/signup`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        })
          .then((response) => response.json())
          .then((data) => console.log(data));
          history.push("/login");
          console.log("saved")
      },
    });

  const reDirect = () => {
    history.push("/login")
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h2>Sign up</h2>
        <CardContent className="card-content">
          <TextField
            name="FirstName"
            value={values.FirstName}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
            error={touched.FirstName && errors.FirstName}
            helperText={touched.FirstName && errors.FirstName ? errors.FirstName : null}
          />
           <TextField
            name="LastName"
            value={values.LastName}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Name"
            variant="outlined"
            error={touched.LastName && errors.LastName}
            helperText={touched.LastName && errors.LastName ? errors.LastName : null}
          />
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="email"
            variant="outlined"
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <TextField
            name="password"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            label="password"
            variant="outlined"
            type="password"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          <Button type="submit" color="success" variant="contained">
            Register
          </Button>
          <small style={{ opacity: 0.5 }}>already registered ?</small>
          <h5 className="signin" onClick={() => reDirect()}>
            sign in
          </h5>
        </CardContent>
      </Card>
    </form>
  );
};