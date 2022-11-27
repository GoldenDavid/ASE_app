import React, { useState } from "react"
import {
  Grid,
  Paper,
  Avatar,
  Typography,
  TextField,
  Button,
  Link,
  Alert
} from "@mui/material"
import CircleOutlined from "@mui/icons-material/AddCircleOutlineOutlined"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from "../Services/axiosInterceptor"

function Register() {
  const [success, setSuccess] = useState("")
  const [fail, setFail] = useState("")
  const paperStyle = {
    padding: "30px 40px",
    width: 300,
    margin: "100px auto"
  }
  const avatarStyle = { backgroundColor: "#1bbd7e" }
  const btnStyle = { marginTop: "15px" }
  const colorPaper = { backgroundColor: "#eaf1f4" }
  const typoStyle = { marginTop: "10px" }
  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  }
  const validationSchema = yup.object({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("password"), null], "Password must match")
  })
  const onSubmit = async (values, props) => {
    const respone = await axios.post("/api/auth/register", values)
    try {
      if (respone.status === 201) {
        if (respone.data.message === "Successfully registered") {
          props.resetForm()
          setSuccess("Register successfully, please activation your gmail")
          setFail("")
          props.setSubmitting(false)
        } else {
          props.resetForm()
          setFail(respone.data.message)
          setSuccess("")
          props.setSubmitting(false)
        }
      }
    } catch (error) {
      console.log(error.respone.data.message)
    }
    return respone.json()
  }
  return (
    <Grid>
      <Paper elavation={10} style={{ ...paperStyle, ...colorPaper }}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <CircleOutlined />
          </Avatar>
          <Typography variant="h4">Sign up</Typography>
          <Typography variant="caption">
            Please fill this form to create account
          </Typography>
        </Grid>
        {success && <Alert severity="success">{success}</Alert>}
        {fail && <Alert severity="error">{fail}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          git
          onSubmit={onSubmit}
        >
          {props => (
            <Form>
              <Field
                as={TextField}
                fullWidth
                label="Name"
                name="name"
                placeholder="Enter user name"
                variant="standard"
                required
                helperText={<ErrorMessage name="name" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Email"
                name="email"
                placeholder="Enter email"
                variant="standard"
                required
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Password"
                name="password"
                placeholder="Enter password"
                type="password"
                variant="standard"
                required
                helperText={<ErrorMessage name="password" />}
              />
              <Field
                as={TextField}
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                placeholder="Enter confirm password"
                type="password"
                variant="standard"
                required
                helperText={<ErrorMessage name="confirmPassword" />}
              />
              <Button
                type="Submit"
                variant="contained"
                color="primary"
                fullWidth
                style={btnStyle}
                disabled={props.isSubmitting}
              >
                {props.isSubmitting ? "Loading" : "Sign up"}
              </Button>
            </Form>
          )}
        </Formik>
        <Typography style={typoStyle}>
          Already have an account ?<Link href="/login">Login</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Register
