import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import NavBar from "../components/NavBar/navbar";
const socket = io("http://localhost:5000", {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const AdminPanel = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    socket.emit("get_rooms");

    const interval = setInterval(() => {
      socket.emit("get_rooms");
    }, 5000); // Fetch room list every 5 seconds

    socket.on("rooms_list", (roomList) => {
      console.log("Received rooms list:", roomList); // ✅ thêm log kiểm tra

      // Thêm vào localStorage hoặc mongoDB
      localStorage.setItem("rooms", JSON.stringify(roomList));
      // Hoặc nếu bạn muốn lưu vào MongoDB, bạn có thể gọi API ở đây
      // fetch(`${import.meta.env.VITE_API_URL}/api/admin/rooms`, {
      setRooms(roomList);
    });
    socket.on("new_message", (msg) => {
      if (msg.roomId === selectedRoom) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    return () => {
      socket.off();
      clearInterval(interval);
    };
  }, [selectedRoom]);

  const sendMessage = () => {
    socket.emit("admin_message", {
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
          <h2>Admin Panel</h2>
          <ul>
            {rooms.map((room) => (
              <li
                key={room}
                onClick={() => {
                  setSelectedRoom(room);
                  setMessages([]); // Clear messages when switching rooms
                  socket.emit("join_room", { roomId: room });
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
              <h3>Room: {selectedRoom}</h3>
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
                Send
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default AdminPanel;
