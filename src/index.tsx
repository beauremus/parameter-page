import React from 'react';
import ReactDOM from 'react-dom';
import Framework, { AcnetContext } from "@fnal/app-framework";
import "@fnal/app-framework/components/Framework/fnal-app.css";
import App from './App';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Framework title="Parameter Page">
        <AcnetContext.Consumer>
            {
                acnetContext => {
                    if (acnetContext) {
                        return <App acnet={acnetContext.acnet}></App>
                    }

                    return 'loading...'
                }
            }
        </AcnetContext.Consumer>
    </Framework>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
