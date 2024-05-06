// Combined.js
import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Sidebar from "./Sidebar";
import Kanban from "./Kanban";
import InitialPopup from "./InitialPopup";
import { useAuthContext } from '../hooks/useAuthContext';

const Combined = () => {
  const { user } = useAuthContext();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  useEffect(() => {
    setIsPopupOpen(true);
  }, []);

  const closePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <Kanban />
      <InitialPopup isOpen={isPopupOpen} onClose={closePopup} />
    </div>
  );
};

export default Combined;
