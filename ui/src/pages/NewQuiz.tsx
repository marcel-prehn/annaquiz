import React, {useState} from "react";
import {Box, Button, Heading, Main, TextInput} from "grommet";
import {Notification} from "../components/Notification";

export const NewQuiz = () => {
    const [quiz, setQuiz] = useState({
        uuid: "",
        creator: "",
        questions: [
            {uuid: "", text: ""},
            {uuid: "", text: ""},
            {uuid: "", text: ""},
        ],
    })
    const [isHidden, setHidden] = useState(true)
    const [submitDisabled, setSubmitDisabled] = useState(true)

    const addQuestion = (index: number, text: string) => {
        const current = [...quiz.questions]
        current[index].text = text
        setQuiz({...quiz, questions: current})
        check()
    }

    const check = () => {
        if (quiz.questions.filter(q => q.text === "").length === 0 && quiz.creator !== "") {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }

    const post = () => {
        fetch("/api/quiz", {
            method: "POST",
            body: JSON.stringify(quiz)
        })
            .then(res => res.json())
            .then(res => setQuiz({...quiz, uuid: res}))
        setHidden(false)
        console.log(JSON.stringify(quiz))
    }

    return (
        <Main pad="large">
            <Heading size={"small"}>Name</Heading>
            <Box margin={"small"}>
                <TextInput placeholder="Name"
                           required
                           value={quiz.creator}
                           onChange={event => {
                               setQuiz({...quiz, creator: event.target.value})
                               check()
                           }}/>
            </Box>
            <Heading size={"small"}>Questions</Heading>
            {quiz.questions.map((question, index) => {
                return (
                    <Box margin={"small"} key={`box-${index}`}>
                        <TextInput placeholder={`Question #${index + 1}`}
                                   required
                                   key={`question-${index}`}
                                   value={question.text}
                                   onChange={event => {
                                       addQuestion(index, event.target.value)
                                   }}/>
                    </Box>
                )
            })}
            <Box direction={"row"} margin={"small"} gap={"large"}>
                <Button type={"submit"} label={"Send"} size={"large"} primary onClick={post} disabled={submitDisabled}/>
                <Notification text={"Annaquiz created!"} target={`/quiz/${quiz.uuid}`} isHidden={isHidden}/>
            </Box>
        </Main>
    )
}