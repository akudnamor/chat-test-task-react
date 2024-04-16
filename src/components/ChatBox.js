import { useState } from "react";
import cn from "classnames";

const ChatBox = ({ data, socket, username }) => {
  const [msgs, setMsgs] = useState(data);

  socket.on("message", (msg) => {
    
    setMsgs((prevMsgs) => {
      if (prevMsgs.some((m) => m.id === msg.id)) {
        return prevMsgs;
      }
      return [msg, ...prevMsgs];
    });
  });

  //input
  const [textData, setTextData] = useState("");

  const inputHandle = (event) => {
    if (event.key === "Enter") {
      let d = new Date();
      const msg = {
        from: username,
        text: textData,
        createdAt: d,
      };
      
      socket.emit("message", msg, (err) => {
        if (err) {
          console.error(err);
        } else {
          setMsgs([msg, ...msgs]);
          setTextData("");
        }
      });
    }
  };

  const formatDate = (date) => {
    const d = new Date(Date.parse(date));
    const h = d.getHours().toString().padStart(2, "0");
    const m = d.getMinutes().toString().padStart(2, "0");
    const s = d.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <>
      <ul className="message-container">
        {data !== null &&
          msgs.map((msg, idx) => (
            <li
              className={cn(
                { message: msg.from !== username },
                { "message-from-me": msg.from === username }
              )}
              key={idx}
            >
              <div
                className={cn(
                  { "message-box": msg.from !== username },
                  { "message-box-from-me": msg.from === username }
                )}
              >
                {msg.from !== username ? (
                  <div className="user-info">
                    <div className="username">{msg.from}</div>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={cn(
                    { "message-text": msg.from !== username },
                    { "message-text-from-me": msg.from === username }
                  )}
                >
                  {msg.text}
                </div>
              </div>
              {msg.from !== username ? (
                <div className="message-time">{formatDate(msg.createdAt)}</div>
              ) : (
                <div className="message-time">{formatDate(msg.createdAt)}</div>
              )}
            </li>
          ))}
      </ul>

      <div className="input-container">
        <div className="text-input-container">
          <input
            type="text"
            className="message-input-area"
            autoComplete="off"
            placeholder="Напишите сообщение..."
            value={textData}
            onChange={(event) => {
              setTextData(event.target.value);
            }}
            onKeyDown={inputHandle}
          />
        </div>
        <div className="emoji-input-container">
          <div className="emoji-area">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.5" clipPath="url(#clip0_133_567)">
                <path
                  d="M10 0.75C15.1088 0.75 19.252 4.89226 19.252 10.002C19.252 15.1094 15.1091 19.25 10 19.25C4.89202 19.25 0.75 15.1096 0.75 10.002C0.75 4.89212 4.89231 0.75 10 0.75Z"
                  stroke="white"
                  strokeWidth="1.5"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M13.0029 10.002C12.4509 10.002 12.0029 9.10598 12.0029 8.00198C12.0029 6.89598 12.4509 6.00098 13.0029 6.00098C13.5549 6.00098 14.0029 6.89598 14.0029 8.00198C14.0029 9.10598 13.5549 10.002 13.0029 10.002ZM7.00191 10.002C6.44991 10.002 6.00391 9.10598 6.00391 8.00198C6.00391 6.89598 6.44991 6.00098 7.00191 6.00098C7.55391 6.00098 8.00391 6.89598 8.00391 8.00198C8.00391 9.10598 7.55391 10.002 7.00191 10.002Z"
                  fill="white"
                />
                <path
                  d="M14.0029 13.001C14.0029 13.001 12.9889 15 10.0019 15C7.01591 15 6.00391 13.001 6.00391 13.001"
                  stroke="white"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </g>
              <defs>
                <clipPath id="clip0_133_567">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBox;
