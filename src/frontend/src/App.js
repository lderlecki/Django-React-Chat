import React, {Component} from "react";
import {Provider} from 'react-redux';
import store from "./store";
import AppRouter from "./Routers/Router";

const App = () => (
    <Provider store={store}>
        <AppRouter />
    </Provider>
);

export default App;
