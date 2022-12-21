import React, { useEffect, useState } from "react"
import io from "socket.io-client"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useParams } from "react-router-dom"

const socket = io("localhost:8080")
function AnonymousPage() {
  const [question, setQuestion] = useState("")
  const [options, setOptions] = useState([])
  const { presentationId } = useParams()
  const [result, setResult] = useState([])
  useEffect(() => {
    axios
      .get("http://localhost:8080/presentation", {
        params: { presentationId }
      })
      .then(res => {
        const { showingSlide } = res.data.presentation
        setQuestion(res.data.presentation.slides[showingSlide].question)
        setOptions(res.data.presentation.slides[showingSlide].options)
      })
  }, [])

  useEffect(() => {
    socket.on("connect", () => {})

    socket.on("disconnect", () => {})

    socket.on("server-send-question", data => {
      setQuestion(data)
    })

    socket.on("server-send-options", data => {
      setOptions(data)
    })

    socket.on("server-send-result", data => {
      setResult(data)
    })
    return () => {
      socket.off("connect")
      socket.off("disconnect")
      socket.off("server-send-question")
      socket.off("server-send-options")
      socket.off("server-send-result")
    }
  }, [question, options, result])

  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    socket.emit("clients-send-result", {
      presentationId,
      result: data.option
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>{question}</p>
        {options.map(option => (
          <div key={Math.random()}>
            <input
              type="radio"
              id={option.index}
              value={option.index}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register("option")}
            />
            <label htmlFor={option.index}>{option.content}</label>
          </div>
        ))}
        <input type="submit" value="Submit" />
      </form>

      <p>RESULT</p>

      {result.map(item => (
        <div
          key={Math.random()}
        >{`Item index: ${item.index} Item content: ${item.content} Item status: ${item.status} `}</div>
      ))}
    </>
  )
}

export default AnonymousPage
