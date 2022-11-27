import React, { useState } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Drawer from "@mui/material/Drawer"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Modal from "@mui/material/Modal"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from "../Services/axiosInterceptor"

function GroupArea({ group }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const onSubmit = async (values, props) => {
    /* eslint no-underscore-dangle: 0 */
    const response = await axios.post(
      "/groups/invite",
      { email: values.email, groupId: group._id },
      {
        headers: { token: localStorage.getItem("token") }
      }
    )
    console.log(response)
    try {
      if (response.status === 201) {
        if (response.data.success === true) {
          setTimeout(() => {
            props.resetForm()
          }).then(() => {
            props.setSubmitting(false)
          }, 2000)
          handleClose()
        }
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
  const textStyle = { marginTop: "12px" }
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
  const initialValues = {
    email: ""
  }
  const validationSchema = yup.object({
    email: yup.string().email("Invalid email").required("Email is required")
  })
  const btnstyle = { marginTop: "20px" }
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box"
        },
        ".css-18sg6k4-MuiPaper-root-MuiDrawer-paper": {
          top: "auto"
        }
      }}
      variant="permanent"
      anchor="right"
    >
      <Typography variant="h4" align="center">
        List of member in group
      </Typography>
      <Typography variant="h6" align="center">
        *Owner:
      </Typography>
      <List>
        <ListItem key={group.owner} disablePadding>
          <ListItemText primary={group.owner.name} />
        </ListItem>
      </List>
      <Divider variant="middle" />
      <Typography variant="h6" align="center">
        *Co-owner:
      </Typography>
      <List>
        {group.co_owners.map(CoOwner => (
          <ListItem key={CoOwner.userId} disablePadding>
            <ListItemText primary={CoOwner.name} />
          </ListItem>
        ))}
      </List>
      <Divider variant="middle" />
      <Typography variant="h6" align="center">
        *Member:
      </Typography>
      <List>
        {group.members.map(member => (
          <ListItem key={member.userId} disablePadding>
            <ListItemText primary={member.name} />
          </ListItem>
        ))}
      </List>
      <Button
        type="submit"
        color="primary"
        variant="contained"
        style={btnstyle}
        fullWidth
        onClick={handleOpen}
      >
        Add new user
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Add email of user to invite to the group {group.name}
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {props => (
              <Form>
                <Field
                  as={TextField}
                  label="email"
                  name="email"
                  placeholder="Enter email of user"
                  variant="standard"
                  fullWidth
                  required
                  style={textStyle}
                  helperText={<ErrorMessage name="email" />}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  fullWidth
                >
                  {props.isSubmitting ? "Loading" : "Submit"}
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </Drawer>
  )
}

export default GroupArea
