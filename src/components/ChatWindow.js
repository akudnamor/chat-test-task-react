import ChatBox from "./ChatBox";

// v3.1: const { io } = require("socket.io-client");
// v2: import io from 'socket.io-client';
import io from "socket.io-client";

// v3: wss://chat-backend.fabg.space
// v2: ws://localhost:8000
const socket = io("ws://localhost:8000", {
  transports: ["websocket"],
  upgrade: false,
});

const ChatWindow = ({ channel, data, isLoading, username }) => {
  if (channel === "") {
    return <></>;
  } else if (isLoading && channel !== "") {
    return <>Loading {channel}</>;
  } else if (!isLoading && channel !== "" && data === null) {
    return <>{channel} is empty</>;
  } else {
    return (
      <>
        <ChatBox data={data} socket={socket} username={username} />
      </>
    );
  }
};

export default ChatWindow;
