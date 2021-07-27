import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/js/all.js";
import "./scss/style.scss";
import { CookiesProvider } from "react-cookie";
import { Provider } from "react-redux";
import store from "../src/modules/index";
// import rootReducer from "./store";

// import ReduxThunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { createStore, applyMiddleware } from "redux";

// import { composeWithDevTools } from "redux-devtools-extension";
// import { createStore, applyMiddleware } from "redux";
// import { Provider } from "react-redux";
// import ReduxThunk from "redux-thunk";
// import rootReducer from "./store";

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(ReduxThunk))
// );

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider>
        <App></App>
      </CookiesProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
