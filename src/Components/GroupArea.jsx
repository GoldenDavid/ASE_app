import React from "react"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import Drawer from "@mui/material/Drawer"
import Typography from "@mui/material/Typography"

function GroupArea({ group }) {
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
    </Drawer>
  )
}

export default GroupArea
