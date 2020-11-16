import React, {useEffect, useState} from "react"
import {useParams} from "react-router-dom"
import {Answer, Quiz} from "../models/Quiz";
import {Box, Button, Card, CardBody, CardFooter, CardHeader, Heading, Main, Text} from "grommet";
import Moment from "react-moment";

export const ShowAnswers = () => {
  const {uuid} = useParams<{ uuid: string }>()
  const [quiz, setQuiz] = useState({} as Quiz)
  const [answers, setAnswers] = useState([] as Answer[])
  const [isHidden, setIsHidden] = useState(true)

  useEffect(() => {
    fetch(`/api/quiz/${uuid}`)
      .then(res => res.json())
      .then(res => {
        setQuiz(res)
      })
    fetch(`/api/quiz/${uuid}/answers`)
      .then(res => res.json())
      .then(res => {
        setAnswers(res)
      })
  }, [uuid])

  return (
    <Main pad="large">
      <Heading size={"small"}>Answers for Quiz by {quiz.creator}</Heading>
      <Text size={"xsmall"}>Created at <Moment format={"D.M.yyyy hh:mm:ss"}>{quiz.timestamp}</Moment></Text>
      <Heading size={"small"}>Questions</Heading>
      {quiz.questions ? quiz.questions.map(((question, qindex) => {
        return (
          <Card background={"light-1"} margin={"medium"} key={`card-${qindex}`}>
            <CardHeader pad={"small"}>
              <Text size={"xlarge"} key={`text-${qindex}`} weight={"bold"}>{question.text}</Text>
            </CardHeader>
            <CardBody pad={"small"}>
              {answers ?
                answers.filter(answer => answer.questionUuid === question.uuid)
                  .map((answer, aindex) => {
                    return (
                      <Box direction={"row"}>
                        <Box direction={"column"} width={"small"}>
                          <Text key={`answer-username-${aindex}`}>{`${answer.username}:`}</Text>
                        </Box>
                        <Box direction={"column"}>
                          <Text key={`answer-text-${aindex}`} weight={"bold"}>{`${answer.text}`}</Text>
                        </Box>
                      </Box>
                    )
                  }) : "no answers found"}
            </CardBody>
          </Card>
        )
      })) : "no questions found"}
    </Main>
  )
};
