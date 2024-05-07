//This is the two combined

import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Kanban from "./Kanban";
import InitialPopup from "./InitialPopup";

const Combined = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  //Only rendered once , the first time
  useEffect(() => {
    setIsPopupOpen(true);
  }, []);


  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Kanban />
      <InitialPopup isOpen={isPopupOpen}  />
    </div>
  );
};

export default Combined;
