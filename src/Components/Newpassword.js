import { Button, Card, CardContent, TextField } from "@mui/material";
import { useFormik } from "formik";
import {useHistory} from "react-router-dom";
import * as yup from "yup";


const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
  password: yup.string().required("New password required").min(8),
});

export const NewPassword = () => {
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const data = await fetch(`https://wecode-backend.vercel.app/api/login/setpassword`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });

        if (data.status === 401) {
          console.log("error");
        } else {
          history.push("/login");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h4>Reset your Password</h4>
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
            label="Enter New password"
            variant="outlined"
            error={touched.password && errors.password}
            helperText={
              touched.password && errors.password ? errors.password : null
            }
          />
          <Button color="secondary" type="submit" variant="contained">
            Confirm
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};