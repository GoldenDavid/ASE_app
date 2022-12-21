import { useForm } from "react-hook-form"
import { TiDeleteOutline } from "react-icons/ti"
import { BsPlusLg } from "react-icons/bs"
import React, { useEffect } from "react"

function PresentationContentEditor({ slide, handleChangeSlides }) {
  const { register, getValues, unregister } = useForm()
  const { question, options } = slide

  useEffect(() => {
    unregister("question")
    options.forEach(option => {
      unregister(option.index)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options])

  const handleAddOption = e => {
    e.preventDefault()

    const isIndexExist =
      options.findIndex(option => {
        return option.index === `option ${Object.keys(options).length + 1}`
      }) >= 0

    options.push({
      index: !isIndexExist
        ? `option ${Object.keys(options).length + 1}`
        : `option ${Object.keys(options).length + 1} duplicate`,
      content: "",
      status: 0
    })

    handleChangeSlides({ ...slide, options })
  }

  const handleDeleteOption = index => {
    unregister(options[index].index)
    options.splice(index, 1)
    handleChangeSlides({ ...slide, options })
  }

  const handleBlur = e => {
    if (e.target.name === "question") {
      handleChangeSlides({ ...slide, question: getValues(e.target.name) })
    } else if (e.target.name.startsWith("option")) {
      const index = options.findIndex(
        option => option.index.toString() === e.target.name
      )
      options[index].content = getValues(e.target.name)
      handleChangeSlides({ ...slide, options })
    }
  }
  return (
    <form className="slide-editor">
      <label htmlFor="slideType">
        Slide type
        <select
          id="slideType"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("slideType")}
        >
          <option value="mutipleChoice">Mutiple Choice</option>
        </select>
      </label>
      <p>Content</p>
      <label htmlFor="question">
        Your question
        <input
          id="question"
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...register("question", { value: question })}
          onBlur={handleBlur}
        />
      </label>

      <h4>Options</h4>

      {options.map(option => {
        return (
          <div key={Math.random()}>
            <input
              placeholder={option.index}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(option.index, { value: option.content })}
              onBlur={handleBlur}
            />
            <TiDeleteOutline
              className="delete-button"
              onClick={() => handleDeleteOption(Math.random())}
            />
          </div>
        )
      })}

      <button type="button" onClick={e => handleAddOption(e)}>
        <BsPlusLg className="new-option-btn" />
        New slide
      </button>
    </form>
  )
}

export default PresentationContentEditor
