import React, { useState, useEffect } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import TextField from "@mui/material/TextField"
import Alert from "@mui/material/Alert"
import Divider from "@mui/material/Divider"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as yup from "yup"
import axios from "../Services/axiosInterceptor"

export default function Sidebar({ handleClickGroupTag }) {
  const [success, setSuccess] = useState("")
  const textStyle = { marginTop: "12px" }
  const btnstyle = { marginTop: "20px" }
  const initialValues = {
    group_name: ""
  }
  const validationSchema = yup.object({
    groupName: yup.string().required("Group name is required")
  })
  const onSubmit = async (values, props) => {
    const response = await axios.post("/groups", values, {
      headers: { token: localStorage.getItem("token") }
    })
    try {
      if (response.status === 201) {
        if (response.data.success === true) {
          setTimeout(() => {
            props.resetForm()
            setSuccess("Create group successfully")
          }).then(() => {
            props.setSubmitting(false)
          }, 2000)
        }
      }
    } catch (error) {
      console.log(error.response.data.message)
    }
  }
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

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const [groups, setGroup] = useState([])
  const getGroup = async () => {
    return (
      await axios.get("/groups", {
        headers: {
          token: localStorage.getItem("token")
        }
      })
    ).data.list
  }
  useEffect(() => {
    getGroup().then(res => {
      setGroup(res)
    })
  }, [])
  return (
    <Drawer
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box"
        },
        ".css-12i7wg6-MuiPaper-root-MuiDrawer-paper": {
          top: "auto"
        }
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h4" align="center">
        User group
      </Typography>
      <List>
        {groups.map(group => (
          <>
            <Divider variant="middle" />
            <ListItem key={group.name} disablePadding>
              <ListItemButton
                onClick={() => {
                  handleClickGroupTag(group)
                }}
              >
                <ListItemText primary={group.name} />
              </ListItemButton>
            </ListItem>
          </>
        ))}
      </List>
      <Button variant="contained" size="medium" onClick={handleOpen}>
        Create_group
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Group form
          </Typography>
          {success && <Alert severity="success">{success}</Alert>}
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={validationSchema}
          >
            {props => (
              <Form>
                <Field
                  as={TextField}
                  label="groupName"
                  name="groupName"
                  placeholder="Enter group name"
                  variant="standard"
                  fullWidth
                  required
                  style={textStyle}
                  helperText={<ErrorMessage name="groupName" />}
                />
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={props.isSubmitting}
                  style={btnstyle}
                  onClick={handleClose}
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
