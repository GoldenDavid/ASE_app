import React, { useEffect, useState } from "react"
import axios from "axios"
import HomeHeader from "../../Components/HomeHeader"
import HomeSideBar from "../../Components/HomeSideBar"
import HomeContent from "../../Components/HomeContent"

function HomePage() {
  const [listPresentations, setListPresentations] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:8080/presentation/list", {
        params: {
          userId: "63662940320c05ef9c92515f"
        }
      })
      .then(res => {
        setListPresentations(res.data.listPresentations)
      })
  }, [])
  return (
    <>
      <HomeHeader />
      <HomeSideBar />
      <HomeContent data={listPresentations} />
    </>
  )
}

export default HomePage
