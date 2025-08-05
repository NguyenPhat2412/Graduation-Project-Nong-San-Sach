import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import "./LiveChat.css";

const LiveChat = ({ isOpen }) => {
  const [roomId, setRoomId] = useState(localStorage.getItem("roomId") || "");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_DATABASE_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });

    const socket = socketRef.current;
    const handleRoomCreated = (roomId) => {
      localStorage.setItem("roomId", roomId);
      setRoomId(roomId);
    };

    const handleNewMessage = (msg) => {
      console.log(msg);
      setMessages((prev) => [...prev, msg]);
    };

    const handleChatEnded = () => {
      alert("Chat has ended. You can start a new chat.");
      setMessages([]);
      localStorage.removeItem("roomId");
      setRoomId(null);
    };

    socket.on("room_created", handleRoomCreated);
    socket.on("new_message", handleNewMessage);
    socket.on("chat_ended", handleChatEnded);

    return () => {
      socket.off("room_created", handleRoomCreated);
      socket.off("new_message", handleNewMessage);
      socket.off("chat_ended", handleChatEnded);
    };
  }, []);

  const sendMessage = () => {
    if (!input.trim() || !socketRef.current.connected) return;
    socketRef.current.emit("client_message", { roomId, message: input });
    setInput("");
  };

  return (
    <div className={`live-chat-container ${isOpen ? "open" : "closed"}`}>
      <div className="live-chat-box">
        <div className="live-chat-header">
          <div className="live-chat-title">Customer Support</div>
          <div className="live-chat-subtitle">Let's Chat App</div>
        </div>
        <div className="live-chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`live-chat-message ${msg.sender}`}>
              {msg.sender === "client"
                ? `You: ${msg.message}`
                : msg.sender === "bot"
                  ? `${msg.message}`
                  : `Admin: ${msg.message}`}
            </div>
          ))}
        </div>
        <div className="live-chat-input-area">
          <input
            className="live-chat-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter Message!"
          />
          <button className="icon-button">
            <i className="fa-solid fa-paperclip"></i>
          </button>
          <button className="icon-button">
            <i className="fa-solid fa-face-smile"></i>
          </button>
          <button className="icon-button send" onClick={sendMessage}>
            <i className="fa-solid fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;
