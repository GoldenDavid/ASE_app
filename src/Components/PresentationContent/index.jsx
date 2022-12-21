import React from "react"

function PresentationContent({ slide }) {
  const { question, options } = slide
  return (
    <div className="slide-result">
      <p>{question}</p>
      {options.map(option => (
        <div key={Math.random()}>{option.content}</div>
      ))}
    </div>
  )
}

export default PresentationContent
