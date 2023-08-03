import React, { ReactNode, useContext } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";

import "../styles/team.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { theme } = useContext(ThemeContext);

  const modalStyle: React.CSSProperties = {
    display: isOpen ? "block" : "none",
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
  };

  const modalContentStyle: React.CSSProperties = {
    backgroundColor: theme.darkMode ? "rgb(18, 8, 77)" : "#fff",
    padding: "20px",
    borderRadius: "8px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div style={modalStyle} onClick={onClose} className="AddTeam-Modal">
      <div style={modalContentStyle} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
