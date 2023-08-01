import { useContext, useState } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

// STYLES
import "../styles/header.css";

// ICONS
import { BiSolidBellRing } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";

// LOGO SOURCE
const logo: string = require("../images/Full-Logo.svg").default;
const user: string = require("../images/user.png");
const iran: string = require("../images/iran.png");
const usa: string = require("../images/usa.png");

const Header = () => {
  const [lang, setLang] = useState<string>("fa");
  const { theme } = useContext(ThemeContext);

  const langHandler = () => {
    if (lang === "fa") {
      setLang("en");
    } else {
      setLang("fa");
    }
  };

  return (
    <div className={`header ${theme.darkMode && "header-dark"}`}>
      <section>
        <div>
          <IoIosArrowDown
            size={18}
            color={theme.darkMode ? "#0068D2" : "#000"}
          />
          پروفایل کاربری
          <figure>
            <img src={user} alt="User" />
          </figure>
        </div>

        <BiSolidBellRing
          size={18}
          color={theme.darkMode ? "#0068D2" : "#000"}
        />

        <figure onClick={langHandler} title="زبان">
          <img src={lang === "fa" ? iran : usa} alt="Language" />
        </figure>
      </section>

      <figure className="Logo">
        <img src={logo} alt="Logo" />
      </figure>
    </div>
  );
};

export default Header;
