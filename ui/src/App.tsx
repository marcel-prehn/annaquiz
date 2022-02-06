import React from "react";
import { Route } from "react-router-dom";
import { QuizHeader } from "./components/QuizHeader";
import { AboutPage } from "./pages/About";
import { NewQuiz } from "./pages/NewQuiz";
import { ShowAnswers } from "./pages/ShowAnswers";
import { ShowQuiz } from "./pages/ShowQuiz";
import { ShowRandomAnswers } from "./pages/ShowRandomAnswers";
import "./style/style.css";

const App = () => {
  return (
    <>
      <QuizHeader />
      <Route exact path={"/"} children={<NewQuiz />} />
      <Route path={"/about"} children={<AboutPage />} />
      <Route exact path={"/quiz/:uuid"} children={<ShowQuiz />} />
      <Route path={"/quiz/:uuid/answers"} children={<ShowAnswers />} />
      <Route path={"/quiz/:uuid/random"} children={<ShowRandomAnswers />} />
    </>
  );
};

export default App;
