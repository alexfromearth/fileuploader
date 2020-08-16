import React, {useEffect}  from 'react';
import StartScreen from "./components/StartScreen";
import {BrowserRouter , Switch, Route} from "react-router-dom";
import {Provider} from 'react-redux';
import store from "./redux/store";
function App() {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <StartScreen/>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
