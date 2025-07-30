import { notification } from "antd";
import { createContext, useContext, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();
  const [type, setType] = useState(null);
  const [message, setMessage] = useState(null);
  const openNotification = (type, message) => {
    api[type]({
      message: "Notification Title",
      description: message,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        openNotification,
        api,
        type,
        setType,
        message,
        setMessage,
        contextHolder,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
