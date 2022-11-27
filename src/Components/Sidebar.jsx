import React, { useState, useEffect } from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import axios from "../Services/axiosInterceptor"

export default function Sidebar({ handleClickGroupTag }) {
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
        Group
      </Typography>
      <List>
        {groups.map(group => (
          <ListItem key={group.name} disablePadding>
            <ListItemButton
              onClick={() => {
                handleClickGroupTag(group)
              }}
            >
              <ListItemText primary={group.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Button variant="contained" size="medium">
        Create_group
      </Button>
    </Drawer>
  )
}
