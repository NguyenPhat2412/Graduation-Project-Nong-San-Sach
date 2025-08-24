import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { UserProvider } from "./UseContext/UserContext.jsx";
import { store } from "./components/Home/Redux/store.js";
import { Provider } from "react-redux";
import { CategoryProvider } from "./UseContext/CategoryContext.jsx";
import { NotificationProvider } from "./UseContext/NotificationContext.jsx";
import "./i18n";
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <UserProvider>
      <CategoryProvider>
        <NotificationProvider>
          <App />
        </NotificationProvider>
      </CategoryProvider>
    </UserProvider>
  </Provider>
);
