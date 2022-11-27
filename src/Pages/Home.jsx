import React, { useState } from "react"
import Navbar from "../Components/Navbar"
import Sidebar from "../Components/Sidebar"
import GroupArea from "../Components/GroupArea"

export default function Home() {
  const [group, setGroup] = useState()
  const handleClickGroupTag = a => {
    setGroup(a)
  }

  return (
    <>
      <Navbar />
      <Sidebar handleClickGroupTag={handleClickGroupTag} />
      {group && <GroupArea group={group} />}
    </>
  )
}
