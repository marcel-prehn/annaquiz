import { Box, Button, Card, CardBody, CardHeader, Heading, Main, Text, TextInput } from "grommet";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Moment from "react-moment";
import { useParams } from "react-router-dom";
import { Notification } from "../components/Notification";
import { Answer, Quiz } from "../models/Quiz";

export const ShowQuiz = () => {
  const { register, handleSubmit } = useForm();
  const { uuid } = useParams<{ uuid: string }>();
  const [quiz, setQuiz] = useState({} as Quiz);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    fetch(`/api/quiz/${uuid}`)
      .then((res) => res.json())
      .then((res) => {
        setQuiz(res);
      });
  }, [uuid]);

  const onSubmit = (values: any) => {
    const answers: Answer[] = [
      {
        questionUuid: quiz.questions[0].uuid!,
        text: values.answer0 + "",
        username: values.username,
      },
      {
        questionUuid: quiz.questions[1].uuid!,
        text: values.answer1 + "",
        username: values.username,
      },
      {
        questionUuid: quiz.questions[2].uuid!,
        text: values.answer2 + "",
        username: values.username,
      },
    ];
    fetch(`/api/quiz/${quiz.uuid}/answers`, { method: "POST", body: JSON.stringify(answers) }).then((res) => console.log(res.status));
    setIsHidden(false);
  };

  return (
    <Main pad="large">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Heading size={"small"}>Quiz by {quiz.creator}</Heading>
        <Text size={"xsmall"}>
          Created at <Moment format={"D.M.yyyy hh:mm:ss"}>{quiz.timestamp}</Moment>
        </Text>

        <Card background={"light-1"} margin={"medium"} key={`card-name`}>
          <CardHeader pad={"small"}>
            <Text key={`text-name`} margin={"xsmall"} size={"xlarge"} weight={"bold"}>
              Your Name
            </Text>
          </CardHeader>
          <CardBody pad={"small"}>
            <TextInput placeholder="Name" maxLength={20} {...register("username", { required: true })} />
          </CardBody>
        </Card>
        <Heading size={"small"}>Questions</Heading>
        {quiz.questions
          ? quiz.questions.map((question, index) => {
              return (
                <Card background={"light-1"} margin={"medium"} key={`card-${index}`}>
                  <CardHeader pad={"small"}>
                    <Text key={`text-${index}`} margin={"xsmall"} size={"xlarge"} weight={"bold"}>
                      {question.text}
                    </Text>
                  </CardHeader>
                  <CardBody pad={"small"}>
                    <TextInput color={"light-3"} maxLength={50} {...register(`answer${index}`, { required: true })} key={`input-answer-${index}`} placeholder={`Answer #${index + 1}`} />
                  </CardBody>
                </Card>
              );
            })
          : ""}
        <Box direction={"row"} margin={"medium"} gap={"large"}>
          <Button type={"submit"} label={"Send"} size={"large"} primary />
          <Notification text={"Answers saved!"} target={`/quiz/${quiz.uuid}/random`} isHidden={isHidden} />
        </Box>
      </form>
    </Main>
  );
};
