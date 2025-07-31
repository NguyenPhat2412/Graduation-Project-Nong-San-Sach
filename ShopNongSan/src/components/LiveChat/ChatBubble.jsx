import "./ChatBubble.css";

const ChatBubble = ({ toggleChat, isOpen }) => {
  return (
    <button
      onClick={toggleChat}
      className={`chat-bubble ${isOpen ? "chat-close" : ""}`}
    >
      {isOpen ? (
        "❌"
      ) : (
        <div className="chat-icon">
          <i className="fa-brands fa-facebook-messenger"></i>
        </div>
      )}
    </button>
  );
};

export default ChatBubble;
