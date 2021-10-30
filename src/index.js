import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "semantic-ui-css/semantic.min.css";
import "./i18n";

// loading component for suspense fallback
const Loader = () => (
    <div className="App">
      <div>loading...</div>
    </div>
  );

ReactDOM.render(
  <Suspense fallback={<Loader />}>
    <App />
  </Suspense>,
  document.getElementById("root")
);
