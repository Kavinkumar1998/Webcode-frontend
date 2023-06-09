import { Button, Card, CardContent, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { useHistory } from 'react-router-dom'
import * as yup from "yup";
import React from 'react';



const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("password required").min(8),
});

export const Loginpage = () => {
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const data = await fetch(`https://wecode-backend.vercel.app/api/login`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });

        if (data.status === 401) {
          alert("invalid Credantials");
        } else {
          const result = await data.json();
          localStorage.setItem("Name", result.Name);
          localStorage.setItem("Email", result.Email);
          localStorage.setItem("token", result.token);
          localStorage.setItem("role", result.role);
          history.push("/Home");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h4 className="header">Welcome </h4>
        <CardContent className="card-content">
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            label="Email"
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
            type="password"
            variant="outlined"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          <Button type="submit" variant="contained">
            Login
          </Button>
          <small
            style={{ cursor: "pointer" }}
            onClick={() =>   history.push("/forgetpassword")}
          >
            forget password?
            <hr style={{ opacity: 0.5, width: "70%" }} />
          </small>

          <Button
            style={{ width: "50%", margin: "0px auto" }}
            onClick={() =>   history.push("/signup")}
            variant="contained"
            color="success"
          >
            Create Account
          </Button>
        </CardContent>
        <Typography  component="h2" variant="h6">Email:kavinajith1498@gmail.com</Typography>
        <Typography  component="h2" variant="h6"> Password: 123456789 </Typography>
      </Card>
    </form>
  );
};