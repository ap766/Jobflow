import React from "react";
import Sidebar from "./Sidebar";
import Kanban from "./Kanban";
import { useAuthContext } from '../hooks/useAuthContext'


const Combined = () => {
  const { user } = useAuthContext()

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Kanban />
    </div>
  );
};

export default Combined;
