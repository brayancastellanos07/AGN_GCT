import React, { useState, useEffect } from "react";
import { getAccessToken } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";
import ListUsers from "../../../components/admin/Users/listUsers";
import "./Users.scss";

export default function Users() {
  const [usersActive, setUsersActive] = useState([]);
  const [userInActive, setUserInActive] = useState([]);
  const token = getAccessToken();

 
  useEffect(() => {
    getUsersActiveApi(token, true).then((response) => {
      setUsersActive(response.data);
    
    
    });
    getUsersActiveApi(token, false).then((response) => {
      setUserInActive(response.data);
      
    });
  }, [token]);

  return (
    <div className="users">
      <ListUsers usersActive={usersActive} userInActive={userInActive} />
    </div>
  );
}
