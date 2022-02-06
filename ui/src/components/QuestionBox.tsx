import {Box, Button, Text} from "grommet";
import {View} from "grommet-icons";
import React, {useState} from "react";

interface QuestionBoxProps {
  id: number,
  username: string,
  text: string,
}

export const QuestionBox = (props: QuestionBoxProps) => {
  const [usernameVisible, showUsername] = useState(false)
  return (
    <Box direction={"row"}>
      <Box direction={"column"} width={"xxsmall"}>
        <Button size={"small"} icon={<View/>} onClick={() => showUsername(prevState => !prevState)}/>
      </Box>
      <Box direction={"column"} width={"small"} justify={"center"} align={"start"}>
        <div className={`${usernameVisible ? "" : "usernameHidden"}`}>
          <Text key={`answer-username-${props.id}`}>{`${props.username}`}</Text>
        </div>
      </Box>
      <Box direction={"column"} justify={"center"}>
        <Text key={`answer-text-${props.id}`} weight={"bold"}>{`${props.text}`}</Text>
      </Box>
    </Box>
  )
}