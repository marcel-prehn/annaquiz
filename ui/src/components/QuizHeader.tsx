import React from "react"
import {Box, Button, Header, Heading, Nav} from "grommet";
import {AddCircle, CircleQuestion} from "grommet-icons";
import {Link} from "react-router-dom";

export const QuizHeader = () => (
    <Header background={"brand"} direction={"row"} align={"center"} justify={"start"}>
        <Box>
            <Heading margin={"medium"}>
                <Link to={"/"}>Annaquiz</Link>
            </Heading>
        </Box>
        <Nav direction="row" background={"brand"}>
            <Link to={"/"}><Button icon={<AddCircle/>} hoverIndicator/></Link>
            <Link to={"/"}><Button icon={<CircleQuestion/>} hoverIndicator/></Link>
        </Nav>
    </Header>
)