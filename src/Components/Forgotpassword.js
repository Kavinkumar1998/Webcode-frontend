import { Button, Card, CardContent, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useHistory } from "react-router-dom";
import * as yup from "yup";

const formValidationSchema = yup.object({
  email: yup.string().email().required("Email address is required"),
});

export const Forgetpassword = () => {
  const history = useHistory();
  const { handleSubmit, handleChange, handleBlur, values, touched, errors } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: formValidationSchema,
      onSubmit: async (values) => {
        const data = await fetch(`https://wecode-backend.vercel.app/api/forgetpassword`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(values),
        });
        console.log(data);
        if (data.status === 200) {
          history.push("/verifyotp");
        } else {
          alert("user not found");
        }
      },
    });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h4 className="header">Trouble with logging in ?</h4>
        <p>Enter your email address and we will send OTP</p>
        <CardContent className="card-content">
          <TextField
            name="email"
            value={values.email}
            onChange={handleChange}
            label="Enter Your Email Address"
            variant="outlined"
            onBlur={handleBlur}
            error={touched.email && errors.email}
            helperText={touched.email && errors.email ? errors.email : null}
          />
          <Button color="secondary" type="submit" variant="contained">
            Send OTP
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};