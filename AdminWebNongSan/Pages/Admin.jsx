import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NavBar from "../components/NavBar/navbar";
import { useRef } from "react";

const AdminPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const socketRef = useRef([]);
  const selectedRef = useRef(null);
  useEffect(() => {
    selectedRef.current = selectedRoom;
  }, [selectedRoom]);
  useEffect(() => {
    socketRef.current = io(import.meta.env.VITE_API_URL, {
      transports: ["websocket"],
      withCredentials: true,
    });
    const socket = socketRef.current;

    socket.emit("get_rooms");

    const interval = setInterval(() => {
      socket.emit("get_rooms");
    }, 5000);

    const handleRoomList = (roomList) => {
      localStorage.setItem("rooms", JSON.stringify(roomList));
      setRooms(roomList);
    };
    const handleNewMessage = (msg) => {
      if (msg.roomId === selectedRef.current) {
        setMessages((prev) => [...prev, msg]);
      }
    };
    socket.on("new_message", handleNewMessage);
    socket.on("room_list", handleRoomList);
    return () => {
      socket.off("new_message", handleNewMessage);
      socket.off("room_list", handleRoomList);
      clearInterval(interval);
    };
  }, []);

  const sendMessage = () => {
    socketRef.current.emit("admin_message", {
      roomId: selectedRoom,
      message: input,
    });
    setInput("");
  };
  return (
    <div className="dashboard-container-main min-h-screen flex bg-white">
      <div className="col-span-1 md:col-span-1">
        <NavBar />
      </div>
      <div
        className="col-span-1 md:col-span-4 p-6 dashboard-container"
        style={{ width: "100%" }}
      >
        <div
          className="transactions bg-white shadow-md rounded-lg p-7 shadow-md mt-6"
          style={{ width: "100%", height: "75vh" }}
        >
          <h2>Phòng trò chuyện quản trị viên</h2>
          <ul>
            {rooms.map((room) => (
              <li
                key={room}
                onClick={() => {
                  setSelectedRoom(room);
                  setMessages([]);
                  socketRef.current.emit("join_room", room);
                }}
                style={{
                  cursor: "pointer",
                  padding: "10px",
                  backgroundColor: selectedRoom === room ? "#f0f0f0" : "#fff",
                }}
              >
                {room}
              </li>
            ))}
          </ul>
          {selectedRoom && (
            <>
              <h3>Phòng: {selectedRoom}</h3>
              <div style={{ height: "530px", overflowY: "scroll" }}>
                {messages.map((msg, index) => (
                  <div key={index} style={{ margin: "10px 0" }}>
                    <strong>{msg.sender}:</strong> {msg.message}
                  </div>
                ))}
              </div>
              <input
                style={{ width: "300px", padding: "10px", marginTop: "10px" }}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
              />
              <button
                onClick={sendMessage}
                style={{
                  width: "100px",
                  padding: "10px 20px",
                  marginLeft: "10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "5px",
                }}
              >
                Gửi
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
