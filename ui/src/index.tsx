import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {grommet, Grommet} from "grommet";
import {HashRouter} from "react-router-dom";

ReactDOM.render(
    <HashRouter>
        <Grommet theme={grommet}>
            <App/>
        </Grommet>
    </HashRouter>,
    document.getElementById('root')
);
