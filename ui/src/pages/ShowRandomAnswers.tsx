import { Card, CardBody, CardHeader, Heading, Main, Text } from "grommet";
import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { QuestionBox } from "../components/QuestionBox";
import { Answer, Quiz } from "../models/Quiz";

export const ShowRandomAnswers = () => {
  const { uuid } = useParams<{ uuid: string }>();
  const [quiz, setQuiz] = useState({} as Quiz);
  const [answers, setAnswers] = useState([] as Answer[]);

  useEffect(() => {
    fetch(`/api/quiz/${uuid}`)
      .then((res) => res.json())
      .then((res) => {
        setQuiz(res);
      });
    fetch(`/api/quiz/${uuid}/random`)
      .then((res) => res.json())
      .then((res) => {
        setAnswers(res);
      });
  }, [uuid]);

  return (
    <Main pad="large">
      <Heading size={"small"}>Answers for Quiz by {quiz.creator}</Heading>
      <Text size={"xsmall"}>
        Created at <Moment format={"D.M.yyyy hh:mm:ss"}>{quiz.timestamp}</Moment>
      </Text>
      <Heading size={"small"}>Questions</Heading>
      {quiz.questions
        ? quiz.questions.map((question, qindex) => {
            return (
              <Card background={"light-1"} margin={"medium"} key={`card-${qindex}`}>
                <CardHeader pad={"small"}>
                  <Text size={"xlarge"} key={`text-${qindex}`} weight={"bold"}>
                    {question.text}
                  </Text>
                </CardHeader>
                <CardBody pad={"small"}>
                  {answers
                    ? answers
                        .filter((answer) => answer.questionUuid === question.uuid)
                        .map((answer, aindex) => {
                          return <QuestionBox id={aindex} username={answer.username} text={answer.text} />;
                        })
                    : "no answers found"}
                </CardBody>
              </Card>
            );
          })
        : "no questions found"}
    </Main>
  );
};
