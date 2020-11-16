import React from 'react';
import {Box, Text} from "grommet";
import {Link} from "react-router-dom";

interface NotificationProps {
    text: string,
    target: string,
    isHidden: boolean,
}

export const Notification = (props: NotificationProps) => {
    return (
        <Box style={props.isHidden ? {display: "none"} : {display: ""}}
             round={"medium"}
             direction={"row"}
             pad={"small"}
             background={"status-ok"}>
            <Box margin={{horizontal: "small"}}>
                <Text color={"light-1"}>{props.text}</Text>
            </Box>
            <Box margin={{horizontal: "small"}}>
                <Link to={props.target}>Open</Link>
            </Box>
        </Box>
    )
}