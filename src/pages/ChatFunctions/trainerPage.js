import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatService from "../../apis/ChatService";
import useAuth from "../../hooks/useAuth";
import styles from "../../pages/ChatFunctions/trainerPage.module.css";
import register from "../../apis/register";

function Chat() {
  const { id: userId } = useParams();
  const { auth, setAuth, loading } = useAuth();
  const trainerId = auth.id;
  const [users, setUsers] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [stompClient, setStompClient] = useState(null);
  const [trainerHasMessaged, setTrainerHasMessaged] = useState(false);

  const [customerName, setCustomerName] = useState(false);
  const [trainerName, setTrainerName] = useState(false);

  useEffect(() => {
    register
      .getUser(userId)
      .then((user) => {
        setCustomerName(`${user.firstName}`);
      })
      .catch((error) => {
        console.error("Error while getting the customer's name:", error);
      });
  }, [userId]);

  useEffect(() => {
    if (trainerId) {
      register
        .getUser(trainerId)
        .then((user) => {
          setTrainerName(`${user.firstName}`);
        })
        .catch((error) => {
          console.error("Error while getting the trainer's name:", error);
        });
    }
  }, [trainerId]);

  useEffect(() => {
    if (trainerId) {
      ChatService.getChatHistory(userId, trainerId)
        .then((response) => {
          console.log(
            "response data : " + JSON.stringify(response.data, null, 2)
          );
          const sortedChatHistory = response.data.sort(
            (a, b) => new Date(a.date) - new Date(b.date)
          );
          setChatHistory(sortedChatHistory);
          const hasTrainerMessaged = response.data.some(
            (message) => message.senderId === trainerId
          );
          setTrainerHasMessaged(hasTrainerMessaged);
        })
        .catch((error) => {
          console.error("Error while fetching chat history:", error);
        });
    }
  }, [userId, trainerId]);

  useEffect(() => {
    ChatService.getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
      });

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/user/${trainerId}/private`, (messageOutput) => {
        setChatHistory((prevChat) => [
          ...prevChat,
          JSON.parse(messageOutput.body),
        ]);
      });
    });

    setStompClient(stompClient);
    console.log("The trainer id is  : " + trainerId);
    console.log("The user id is  : " + userId);
    ChatService.getChatHistory(userId, trainerId)
      .then((response) => {
        const sortedChatHistory = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        setChatHistory(sortedChatHistory);
      })
      .catch((error) => {
        console.error("Error while fetching chat history:", error);
      });
    console.log("Chat history is : " + chatHistory);
    return () => {
      stompClient.disconnect();
    };
  }, [userId, trainerId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    const message = {
      senderId: trainerId,
      receiverId: userId,
      message: newMessage,
      date: new Date().toISOString(),
      status: "SENT",
    };

    console.log("The trainer id is  : " + trainerId);
    console.log("The message is : " + newMessage);
    console.log("The user id is  : " + userId);

    setChatHistory((prevChat) => [...prevChat, { ...message }]);

    stompClient.send(`/app/private-message`, {}, JSON.stringify(message));
    ChatService.sendMessage(newMessage, userId)
      .then((response) => {
        stompClient.send(
          `/app/private-message`,
          {},
          JSON.stringify({
            senderId: trainerId,
            receiverId: userId,
            message: newMessage,
            date: new Date().toISOString(),
            status: "SENT",
          })
        );
        setNewMessage("");
      })
      .catch((error) => {
        console.error("Error while sending message:", error);
        setChatHistory((prevChat) =>
          prevChat.filter((chatMessage) => chatMessage !== message)
        );
      });
  };

  return (
    <div className={styles.chatContainer}>
      <h1>Chat history</h1>
      <div>
        {chatHistory.map((message, index) => (
          <div key={index} className={styles.messageContainer}>
            <p className={styles.senderId}>
              {message.senderId === userId ? customerName : trainerName}
            </p>
            <p>
              Receiver:{" "}
              {message.receiverId === userId ? customerName : trainerName}
            </p>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className={styles.newMessageContainer}>
        <input
          type="text"
          value={newMessage}
          onChange={handleNewMessageChange}
          placeholder="Write your message..."
          className={styles.input}
        />
        <button onClick={handleSendMessage} className={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;
