import React, { useState, useRef, useEffect } from "react";
import debounce from "lodash.debounce";
import cn from "classnames";

const Bar = ({ onSelectChannel }) => {
  const [isActive, setActive] = useState("");

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const listRef = useRef(null);

  const checkForScrollPosition = () => {
    const { current } = listRef;
    if (current) {
      const { scrollLeft, scrollWidth, clientWidth } = current;
      const isAtEnd = Math.abs(scrollWidth - clientWidth - scrollLeft) <= 1;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(!isAtEnd);
    }
  };

  const debounceCheckForScrollPosition = debounce(checkForScrollPosition, 200);

  const scrollContainerBy = (distance) =>
    listRef.current?.scrollBy({ left: distance, behavior: "smooth" });

  useEffect(() => {
    const { current } = listRef;
    checkForScrollPosition();
    current?.addEventListener("scroll", debounceCheckForScrollPosition);

    return () => {
      current?.removeEventListener("scroll", debounceCheckForScrollPosition);
      debounceCheckForScrollPosition.cancel();
    };
  }, [debounceCheckForScrollPosition]);

  const fetchHistory = async (channel) => {
    if (channel === "common") {
      try {
        onSelectChannel(channel, null, true);
        const response = await fetch(
          "http://localhost:8000/api/messages?skip=0&limit=10"
        );
        const jsonData = await response.json();

        onSelectChannel(channel, jsonData, false);
      } catch (error) {
        console.error("Failed to fetch chat history:", error);
      }
    } else {
      onSelectChannel(channel, null, false);
    }
  };

  const handleChannelSelect = (channel) => {
    setActive(channel);

    fetchHistory(channel);
  };

  return (
    <div className="chat-options-bar">
      <div className="scrollableContainer">
        <ul className="list" ref={listRef}>
          <li className="item">
            <button
              className={cn("item-button", { active: isActive === "common" })}
              onClick={() => handleChannelSelect("common")}
            >
              ОБЩИЙ
            </button>
          </li>
          <li className="item">
            <button
              className={cn("item-button", { active: isActive === "clan" })}
              onClick={() => handleChannelSelect("clan")}
            >
              КЛАН
            </button>
          </li>
          <li className="item">
            <button
              className={cn("item-button", { active: isActive === "friends" })}
              onClick={() => handleChannelSelect("friends")}
            >
              ДРУЗЬЯ
            </button>
          </li>
          <li className="item">
            <button
              className={cn("item-button", { active: isActive === "news" })}
              onClick={() => handleChannelSelect("news")}
            >
              НОВОСТИ
            </button>
          </li>
        </ul>
        <button
          type="button"
          disabled={!canScrollLeft}
          onClick={() => scrollContainerBy(-60)}
          className={cn("button", "buttonLeft", {
            "button--hidden": !canScrollLeft,
          })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 11L3 6L8 1"
              stroke="#ACACAC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          disabled={!canScrollRight}
          onClick={() => scrollContainerBy(60)}
          className={cn("button", "buttonRight", {
            "button--hidden": !canScrollRight,
          })}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 1L9 6L4 11"
              stroke="#ACACAC"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
      <div className="chat-language-container">
        <select>
          <option>RU</option>
          <option>EN</option>
        </select>
      </div>
      <div className="chat-control-container">
        <div className="control-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_133_1433)">
              <circle cx="9" cy="9" r="9" fill="white" fillOpacity="0.2" />
              <path
                d="M9 6H12V9"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 12L6 12L6 9"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_133_1433">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div className="control-button">
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_133_1432)">
              <circle cx="9" cy="9" r="9" fill="white" fillOpacity="0.2" />
              <path
                d="M5 9L13 9"
                stroke="#ACACAC"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_133_1432">
                <rect width="18" height="18" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Bar;
