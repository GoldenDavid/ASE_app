import React, { useState } from "react"
import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
  Link,
  Box,
  Alert
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Icon from "@mui/material/Icon"
import { useNavigate } from "react-router-dom"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from "../Services/axiosInterceptor"

function Login() {
  const navigate = useNavigate()
  const [fail, setFail] = useState("")
  const ggIcon = (
    <Icon style={{ marginBottom: "10px" }}>
      <img alt="" src="google_icon.svg" width="25" height="25" />
    </Icon>
  )
  const paperStyle = {
    padding: 20,
    height: "60vh",
    width: 300,
    margin: "100px auto"
  }
  const colorPaper = { backgroundColor: "#eaf1f4" }
  const avatarStyle = { backgroundColor: "#1bbd7e" }
  const btnstyle = { marginTop: "20px" }
  const ggBtnStyle = { marginTop: "15px" }
  const textStyle = { marginTop: "12px" }
  const typoStyle = { marginTop: "10px" }
  const initialValues = {
    email: "",
    password: ""
  }
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("password is required")
  })
  const onSubmit = async (values, props) => {
    const response = await axios.post("/api/auth/login", values)
    try {
      if (response.status === 201) {
        if (response.data.message === "Successfully login") {
          localStorage.setItem("token", response.data.token)
          localStorage.setItem("name", response.data.name)
          navigate("/")
        } else {
          setTimeout(() => {
            props.resetForm()
            setFail(response.data.message)
          }).then(() => {
            props.setSubmitting(false)
          }, 2000)
        }
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  return (
    <Grid>
      <Paper elevation={10} style={{ ...paperStyle, ...colorPaper }}>
        <Grid align="center">
          <Avatar style={avatarStyle}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h4" style={typoStyle}>
            Sign in
          </Typography>
        </Grid>
        {fail && <Alert severity="error">{fail}</Alert>}
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {props => (
            <Form>
              <Field
                as={TextField}
                label="Email"
                name="email"
                placeholder="Enter email"
                variant="standard"
                fullWidth
                required
                style={textStyle}
                helperText={<ErrorMessage name="email" />}
              />
              <Field
                as={TextField}
                label="Password"
                name="password"
                placeholder="Enter password"
                variant="standard"
                type="password"
                fullWidth
                required
                style={textStyle}
                helperText={<ErrorMessage name="password" />}
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                disabled={props.isSubmitting}
                style={btnstyle}
                fullWidth
              >
                {props.isSubmitting ? "Loading" : "Sign in"}
              </Button>
              <Box textAlign="center">
                <Button
                  variant="outlined"
                  startIcon={ggIcon}
                  style={ggBtnStyle}
                  align="center"
                >
                  Continue with google
                </Button>
              </Box>
            </Form>
          )}
        </Formik>
        <Typography style={typoStyle}>
          Do you have an account ?<Link href="/register">Sign Up</Link>
        </Typography>
      </Paper>
    </Grid>
  )
}

export default Login
