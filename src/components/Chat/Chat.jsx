import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../../utils/constants";

const Chat = () => {
  const lastMessageRef = useRef(null);
  const { targetUserId } = useParams();
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const sendMessage = () => {
    const socket = createSocketConnection();

    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  const getMessages = async () => {
    try {
      const res = await axios.post(
        `${BASE_URL}/chat/messages`,
        {
          userId,
          targetUserId,
        },
        { withCredentials: true }
      );

      if (res.data.success) {
        const chatMessages = res?.data?.data?.messages.map((msg) => {
          return {
            firstName: msg?.senderId?.firstName,
            text: msg.text,
          };
        });
        setMessages(chatMessages);
        scrollToLastMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const scrollToLastMessage = () => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    // As soon as the page loads, join the chat
    socket.emit("joinChat", {
      firstName: user.firstName,
      targetUserId,
      userId,
    });

    socket.on("getMessage", ({ firstName, newMessage: text }) => {
      setMessages((prevMessages) => [...prevMessages, { firstName, text }]);
      scrollToLastMessage();
    });

    getMessages();
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  return (
    <div className="w-3/4 mx-auto border border-gray-600 m-5 h-[75vh] flex flex-col">
      <h1 className="p-5 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-y-scroll p-5">
        {messages.map((msg, index) => {
          return (
            <div
              key={index}
              ref={index === messages.length - 1 ? lastMessageRef : null}
            >
              <div
                className={
                  msg?.firstName === user?.firstName
                    ? "chat chat-end"
                    : "chat chat-start"
                }
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="Tailwind CSS chat bubble component"
                      src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                    />
                  </div>
                </div>
                <div className="chat-header">
                  {msg.firstName}
                  <time className="text-xs opacity-50">12:45</time>
                </div>
                <div className="chat-bubble">{msg.text}</div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 broder border-gray-500 text-black rounded p-2 bg-slate-400"
        />
        <button onClick={sendMessage} className="btn btn-primary">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
