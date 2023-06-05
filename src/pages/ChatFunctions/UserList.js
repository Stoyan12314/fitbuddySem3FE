import React, { useEffect, useState } from "react";
import UserService from "../../apis/register";
import { useNavigate } from "react-router-dom";
import styles from "../../pages/ChatFunctions/userList.module.css";
import useAuth from "../../hooks/useAuth";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { auth, setAuth, loading } = useAuth();
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const handleNextClick = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevClick = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await UserService.getAllUsers(page, size);
      console.log("The response is : " + response);
      if (Array.isArray(response.users)) {
        setUsers(response.users);
        console.log("Total pages : " + response.totalPages);
        setTotalPages(response.totalPages);
      } else {
        console.error(
          "Unexpected response from UserService.getAllUsers",
          response
        );
      }
    } catch (err) {
      console.error("Error calling UserService.getAllUsers", err);
    }
  };

  const fetchUsersByEmail = async () => {
    try {
      const response = await UserService.getUsersByEmail(
        searchQuery,
        page,
        size
      );
      console.log("The response is : " + response);
      if (Array.isArray(response.users)) {
        setUsers(response.users);
        setTotalPages(response.totalPages);
      } else {
        console.error(
          "Unexpected response from UserService.getUsersByEmail",
          response
        );
      }
    } catch (err) {
      console.error("Error calling UserService.getUsersByEmail", err);
    }
  };

  useEffect(() => {
    if (isSearching) {
      fetchUsersByEmail();
    } else {
      fetchUsers();
    }
  }, [page]);

  const handleUserClick = (id) => {
    navigate(`/trainerPage/${id}`);
  };

  const handleSearchClick = () => {
    setIsSearching(true);
    fetchUsersByEmail();
  };

  const handleResetClick = () => {
    setPage(0);
    setIsSearching(false);
    setSearchQuery("");
    fetchUsers();
  };

  return (
    <div className={styles.userListContainer}>
      <h1>User List</h1>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search by email"
      />
      <button className={styles.searchButton} onClick={handleSearchClick}>
        Search
      </button>
      <button className={styles.resetButton} onClick={handleResetClick}>
        Reset
      </button>
      <ul>
        {users.map(
          (user) =>
            user.id !== auth.id && (
              <li
                className={styles.userListItem}
                key={user.id}
                onClick={() => handleUserClick(user.id)}
              >
                {user.email} {user.firstName} {user.lastName}
              </li>
            )
        )}
      </ul>
      <div className={styles.paginationContainer}>
        <button className={styles.paginationButton} onClick={handlePrevClick}>
          Previous
        </button>
        <button className={styles.paginationButton} onClick={handleNextClick}>
          Next
        </button>
      </div>
    </div>
  );
};

export default UserList;
