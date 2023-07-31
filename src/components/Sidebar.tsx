import { useState } from "react";

// STYLES
import "../styles/sidebar.css";

// ICONS PATH
const logo: string = require("../icons/Full-Logo.svg").default;

const Sidebar = () => {

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo" />
    </div>
  );
};

export default Sidebar;
