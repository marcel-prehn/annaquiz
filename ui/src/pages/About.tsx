import React, {useState} from "react";
import {Box, Button, Heading, Main, TextInput} from "grommet";
import {Notification} from "../components/Notification";
import {useForm} from "react-hook-form";
import {Quiz} from "../models/Quiz";

export const NewQuiz = () => {
  const MAX_QUESTIONS = 3
  const [quizUuid, setQuizUuid] = useState("")
  const [isHidden, setHidden] = useState(true)
  const {register, handleSubmit, errors} = useForm()

  const onSubmit = (values: any) => {
    const quiz: Quiz = {
      creator: values.username,
      questions: [
        {text: values.question0},
        {text: values.question1},
        {text: values.question2},
      ],
    }

    fetch("/api/quiz", {
      method: "POST",
      body: JSON.stringify(quiz)
    })
      .then(res => res.json())
      .then(res => setQuizUuid(res))
    setHidden(false)
    console.log(JSON.stringify(quiz))
  }

  return (
    <Main pad="large">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size={"small"}>Name</Heading>
        <Box margin={"small"}>
          <TextInput placeholder="Name"
                     name={"username"}
                     maxLength={20}
                     ref={register({required: true})}/>
        </Box>
        <Heading size={"small"}>Questions</Heading>
        {Array.from({length: MAX_QUESTIONS}).map((item, index) => {
          return (
            <Box margin={"small"} key={`box-${index}`}>
              <TextInput placeholder={`Question #${index + 1}`}
                         name={`question${index}`}
                         ref={register({required: true})}
                         key={`question-${index}`}/>
            </Box>
          )
        })}
        <Box direction={"row"} margin={"small"} gap={"large"}>
          <Button type={"submit"} label={"Send"} size={"large"} primary/>
          <Notification text={"Annaquiz created!"} target={`/quiz/${quizUuid}`} isHidden={isHidden}/>
        </Box>
      </form>
    </Main>
  )
}