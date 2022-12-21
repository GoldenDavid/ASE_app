import { BiArrowBack, BiPlay } from "react-icons/bi"
import { FcCheckmark } from "react-icons/fc"
import { BsPlusLg } from "react-icons/bs"
import React from "react"

function PresentationHeader({ handleChangeSlidePresent, handleAddNewSlide }) {
  const handleClickBackBtn = () => {}
  return (
    <>
      <div className="header-top">
        <div className="header-top-left">
          <BiArrowBack className="back-btn" onClick={handleClickBackBtn} />
          <h1>Name</h1>

          <span>
            <FcCheckmark />
            <p>Save</p>
          </span>
        </div>
        <div className="split" />
        <div className="header-top-right">
          <button type="button" onClick={handleChangeSlidePresent}>
            <BiPlay />
            Present
          </button>
        </div>
      </div>
      <div className="header-bottom">
        <button type="button" onClick={handleAddNewSlide}>
          <BsPlusLg className="new-slide-btn" />
          New slide
        </button>
      </div>
    </>
  )
}

export default PresentationHeader
