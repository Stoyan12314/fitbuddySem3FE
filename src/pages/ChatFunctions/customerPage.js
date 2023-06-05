import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import ChatService from "../../apis/ChatService";
import useAuth from "../../hooks/useAuth";
import styles from "../../pages/ChatFunctions/trainerPage.module.css";
import register from "../../apis/register";
function Chat() {
  const { auth, setAuth, loading } = useAuth();
  const userId = auth.id;
  const [trainerId, setTrainerId] = useState(null);
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
    console.log("User id is + " + userId);
    ChatService.getTrainerId(userId)
      .then((response) => {
        const myTrainerId = response.data;
        console.log("Trainer id : " + myTrainerId);
        setTrainerId(myTrainerId);
      })
      .catch((error) => {
        console.error("Error while fetching chat history:", error);
      });
  }, [userId]);

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
          //setChatHistory(response.data);
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
    if (!trainerId) return;

    register
      .getAllUsers()
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error while fetching users:", error);
      });

    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe(`/user/${userId}/private`, (messageOutput) => {
        setChatHistory((prevChat) => [
          ...prevChat,
          JSON.parse(messageOutput.body),
        ]);
      });
    });

    setStompClient(stompClient);
    return () => {
      stompClient.disconnect();
    };
  }, [userId, trainerId]);

  const handleNewMessageChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (!trainerHasMessaged) {
      return;
    }
    console.log("Trainer id is : " + trainerId);
    console.log("User id is : " + userId);

    const message = {
      senderId: trainerId,
      receiverId: userId,
      message: newMessage,
      date: new Date().toISOString(),
      status: "SENT",
    };

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
      });
  };

  return (
    <div className={styles.chatContainer}>
      <h1>Chat history</h1>
      <div>
        {!trainerHasMessaged ? (
          <p>No trainer assigned</p>
        ) : (
          chatHistory.map((message, index) => (
            <div key={index} className={styles.messageContainer}>
              <p className={styles.senderId}>
                Sender:{" "}
                {message.senderId === userId ? customerName : trainerName}
              </p>
              <p>
                Receiver:{" "}
                {message.receiverId === userId ? customerName : trainerName}
              </p>
              Message: <p>{message.message}</p>
            </div>
          ))
        )}
      </div>
      {trainerHasMessaged && (
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
      )}
    </div>
  );
}

export default Chat;
