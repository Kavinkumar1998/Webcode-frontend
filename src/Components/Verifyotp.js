import { Button, Card, TextField } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useFormik } from "formik";
import {useHistory } from "react-router-dom";


export const Verifyotp = () => {
  const history = useHistory();
  const { handleSubmit, handleChange, values } = useFormik({
    initialValues: {
      OTP: "",
    },
    onSubmit: async (values) => {
      const data = await fetch(`https://wecode-backend.vercel.app/api/login/verifyotp`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });

      if (data.status === 401) {
        alert("Invalid Otp");
      } else {
        history.push("/setpassword");
      }
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <Card className="login-container">
        <h4>OTP verification</h4>
        <p>Enter the OTP, that we sent to your registerd Email</p>
        <CardContent className="card-content">
          <TextField
            name="OTP"
            value={values.OTP}
            onChange={handleChange}
            label="Enter OTP"
            variant="outlined"
          />
          <Button color="success" type="submit" variant="contained">
            Verify Otp
          </Button>
        </CardContent>
      </Card>
    </form>
  );
};