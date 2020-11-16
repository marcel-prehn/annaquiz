import React from 'react';
import "./style/style.css"
import {Route} from "react-router-dom"
import {QuizHeader} from "./components/QuizHeader";
import {NewQuiz} from "./pages/NewQuiz";
import {ShowQuiz} from "./pages/ShowQuiz";
import {ShowAnswers} from "./pages/ShowAnswers";
import {ShowRandomAnswers} from "./pages/ShowRandomAnswers";

const App = () => {
  return (
    <>
      <QuizHeader/>
      <Route exact path={"/"} children={<NewQuiz/>}/>
      <Route exact path={"/quiz/:uuid"} children={<ShowQuiz/>}/>
      <Route path={"/quiz/:uuid/answers"} children={<ShowAnswers/>}/>
      <Route path={"/quiz/:uuid/random"} children={<ShowRandomAnswers/>}/>
    </>
  );
}

export default App;
