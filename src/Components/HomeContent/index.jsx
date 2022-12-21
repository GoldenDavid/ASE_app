import React from "react"
import { useNavigate } from "react-router-dom"

function HomeContent({ data }) {
  const nav = useNavigate()
  const handleClickPresentation = presentationId => {
    nav(`./presentation/${presentationId}`)
  }
  return (
    <div>
      {data.map(item => {
        return (
          <button
            type="button"
            key={item.id}
            onClick={() => handleClickPresentation(item.id)}
          >
            {item.name}
          </button>
        )
      })}
    </div>
  )
}

export default HomeContent
