import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.jsx";

//* Global-store
import store from "./data/store.ts";

//* Global-styles
import "./assets/global-styles.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", () => {
//     navigator.serviceWorker.register("/sw.js").then(
//       (registration) => {
//         console.log(
//           "ServiceWorker registration successful with scope: ",
//           registration.scope
//         );
//       },
//       (err) => {
//         console.log("ServiceWorker registration failed: ", err);
//       }
//     );
//   });
// }
