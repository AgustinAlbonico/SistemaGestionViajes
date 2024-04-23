import ReactDOM from "react-dom/client";
import "./index.css";

import "react-toastify/dist/ReactToastify.css";

import App from "./App.tsx";
import { ReactQueryClientProvider } from "./components/ReactQueryComponent.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ReactQueryClientProvider>
    <App />
  </ReactQueryClientProvider>
);
