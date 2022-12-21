import React from "react"

function PresentationOverview({ slides, handleChoiceSlide }) {
  return (
    <ol>
      {slides.map((slide, index) => {
        return (
          <button type="button" onClick={() => handleChoiceSlide(index)}>
            <li
              className="slide-item"
              // eslint-disable-next-line no-underscore-dangle
              key={slide._id}
            >
              <div className="slide-overview">
                {`${slide.type} ${slide.question}`}
              </div>
            </li>
          </button>
        )
      })}
    </ol>
  )
}

export default PresentationOverview
