import React, { useState } from "react"
import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import { useNavigate } from "react-router-dom"
import axios from "../Services/axiosInterceptor"

export default function Navbar() {
  const initialValues = {
    newName: "",
    newPassword: "",
    confirmPassword: ""
  }
  const validationSchema = yup.object({
    newName: yup.string().required("Group name is required"),
    newPassword: yup
      .string()
      .required("Password is required")
      .matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"
      ),
    confirmPassword: yup
      .string()
      .required("Confirm password is required")
      .oneOf([yup.ref("newPassword"), null], "Password must match")
  })
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
  }
  const textStyle = { marginTop: "12px" }
  const btnstyle = { marginTop: "20px" }
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("name")
    navigate("/login")
  }
  const onSubmit = async values => {
    const response = await axios.put("/api/auth", values, {
      headers: { token: localStorage.getItem("token") }
    })
    try {
      if (response.status === 201) {
        if (response.data.success === true) {
          localStorage.setItem("name", values.newName)
        }
        handleClose()
      }
    } catch (error) {
      console.log(error.data.message)
    }
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Homepage
          </Typography>
          <Button variant="contained" size="medium" onClick={handleOpen}>
            Manage profile
          </Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={modalStyle}>
              <Typography id="modal-modal-title" variant="h4" component="h2">
                Welcome {localStorage.getItem("name")}
              </Typography>
              <Typography
                id="modal-modal-description"
                variant="h6"
                component="h2"
              >
                Manage account
              </Typography>
              <Formik
                initialValues={initialValues}
                onSubmit={onSubmit}
                validationSchema={validationSchema}
              >
                {props => (
                  <Form>
                    <Typography variant="h6">Name</Typography>
                    <Field
                      as={TextField}
                      label="newName"
                      name="newName"
                      placeholder="Enter new name"
                      variant="standard"
                      fullWidth
                      required
                      style={textStyle}
                      helperText={<ErrorMessage name="newName" />}
                    />
                    <Typography variant="h6">New password</Typography>
                    <Field
                      as={TextField}
                      label="newPassword"
                      name="newPassword"
                      placeholder="Enter new password"
                      variant="standard"
                      fullWidth
                      required
                      type="password"
                      style={textStyle}
                      helperText={<ErrorMessage name="newPassword" />}
                    />
                    <Typography variant="h6">Confirm password</Typography>
                    <Field
                      as={TextField}
                      label="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter confirm password"
                      variant="standard"
                      fullWidth
                      required
                      type="password"
                      style={textStyle}
                      helperText={<ErrorMessage name="confirmPassword" />}
                    />
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      disabled={props.isSubmitting}
                      style={btnstyle}
                      fullWidth
                    >
                      {props.isSubmitting ? "Loading" : "Change"}
                    </Button>
                  </Form>
                )}
              </Formik>
            </Box>
          </Modal>
          <Button onClick={handleLogout} color="inherit">
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
