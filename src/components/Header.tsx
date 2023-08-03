import { useContext, useState } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

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
  const { language, setLanguage } = useContext(LanguageContext);

  const langHandler = () => {
    if (lang === "fa") {
      setLang("en");
      setLanguage({
        isFa: false,
      });
    } else {
      setLang("fa");
      setLanguage({
        isFa: true,
      });
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
          {language.isFa ? "پروفایل کاربری" : "User Profile"}
          <figure>
            <img src={user} alt="User" />
          </figure>
        </div>

        <BiSolidBellRing
          size={18}
          color={theme.darkMode ? "#0068D2" : "#000"}
        />

        <figure
          onClick={langHandler}
          title={`${language.isFa ? "زبان" : "Language"}`}
        >
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
