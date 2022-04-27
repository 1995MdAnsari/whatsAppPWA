import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import '../node_modules/font-awesome/css/font-awesome.min.css'; 
import "../node_modules/bootstrap/dist/css/bootstrap.css";
// import MainComponent from "./Components/mainCom";
// import SimpleKeyEvent from "./eventCom/event"
// import MainComponent from "./whatsAppCom/mainCom"
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import MainWhatsApp from "./clone/app";
import swDev from "./clone/swDev";

// import MathExpression from "./mathExpComp/mathExp";


ReactDOM.render(
  <React.StrictMode>
    {/* <MathExpression /> */}

    {/* <MainComponent /> */}
    {/* <SimpleKeyEvent/> */}
      <MainWhatsApp />
  </React.StrictMode>,
  document.getElementById('root')
);

swDev();

// serviceWorkerRegistration.register();


