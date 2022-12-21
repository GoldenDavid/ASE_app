/* eslint-disable no-underscore-dangle */
import "./PresentationPage.css"
import { useParams } from "react-router-dom"
import React, { useEffect, useState } from "react"
import axios from "axios"
import io from "socket.io-client"

import PresentationHeader from "../../Components/PresentationHeader"
import PresentationOverview from "../../Components/PresentationOverview"
import PresentationContent from "../../Components/PresentationContent"
import PresentationContentEditor from "../../Components/PresentationContentEditor"

const socket = io("localhost:8080")
function PresentationPage() {
  const [slides, setSlides] = useState([])
  const [indexSlideEdit, setIndexSlideEdit] = useState(0)
  const [slidePresent, setSlidePresent] = useState("")
  const { presentationId } = useParams()

  const handleChangeSlideEdit = index => {
    setIndexSlideEdit(index)
  }

  const handleChangeSlides = slide => {
    slides[indexSlideEdit] = slide
    setSlides([...slides])
  }

  const handleChangeSlidePresent = () => {
    socket.emit("admin-send-change-showingSlide", {
      presentationId,
      slideId: slides[indexSlideEdit]._id
    })
    setSlidePresent(slides[indexSlideEdit]._id)
  }

  const handleAddNewSlide = () => {
    setSlides([...slides.push({})])
  }

  useEffect(() => {
    axios
      .get("http://localhost:8080/presentation", {
        params: { presentationId }
      })
      .then(res => {
        setSlides(res.data.presentation.slides)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    socket.on("connect", () => {})

    socket.on("disconnect", () => {})

    if (slides[indexSlideEdit]) {
      socket.emit("admin-send-question", {
        presentationId,
        question: slides[indexSlideEdit].question
      })

      socket.emit("admin-send-options", {
        presentationId,
        options: slides[indexSlideEdit].options
      })
    }

    if (slidePresent !== "") {
      socket.emit("admin-send-slide-present", slides[indexSlideEdit])
    }

    return () => {
      socket.off("connect")
      socket.off("disconnect")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides, slidePresent])

  useEffect(() => {
    if (slidePresent !== "") {
      socket.emit("admin-send-slide-present", slides[indexSlideEdit])
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slidePresent])

  return (
    <>
      <PresentationHeader
        handleChangeSlidePresent={handleChangeSlidePresent}
        handleAddNewSlide={handleAddNewSlide}
      />
      <div className="slide-container">
        <PresentationOverview
          slides={slides}
          handleChoiceSlide={handleChangeSlideEdit}
        />
        {slides[indexSlideEdit] && (
          <>
            <PresentationContent slide={slides[indexSlideEdit]} />
            <PresentationContentEditor
              slide={slides[indexSlideEdit]}
              handleChangeSlides={handleChangeSlides}
            />
          </>
        )}
      </div>
    </>
  )
}
export default PresentationPage
