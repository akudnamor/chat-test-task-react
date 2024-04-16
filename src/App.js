import Bar from "./components/Bar";
import ChatWindow from "./components/ChatWindow";
import React, { useState } from "react";

function App({ username }) {
  const [selectedChannel, setChannel] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [data, setData] = useState(null);

  const setSelectChannel = (c, d, l) => {
    setChannel(c);
    setData(d);
    setIsLoading(l);
  };

  

  return (
    <div className="chat-container">
      <div className="chat-window">
        <Bar onSelectChannel={setSelectChannel} />
        <ChatWindow
          channel={selectedChannel}
          data={data}
          isLoading={isLoading}
          username={username}
        />
      </div>
    </div>
  );
}

export default App;
