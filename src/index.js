import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from "./routing/AppRouter";
import {BrowserRouter} from "react-router-dom";

function Index() {
    return (
        <>
            <AppRouter />
        </>
    );
}

ReactDOM.render(
        <BrowserRouter>
            <Index />
        </BrowserRouter>, document.getElementById('root'));

