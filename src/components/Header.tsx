import { useContext, useState, useEffect } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

// COMPONENTS
import MenuModal from "./Modal/MenuModal";

// STYLES
import "../styles/header.css";

// ICONS
import { BiSolidBellRing } from "react-icons/bi";
import { IoIosArrowDown } from "react-icons/io";
import { RiMenu3Fill } from "react-icons/ri";

// LOGO SOURCE
const logo: string = require("../images/Full-Logo.svg").default;
const user: string = require("../images/user.png");
const iran: string = require("../images/iran.png");
const usa: string = require("../images/usa.png");

const Header = () => {
  const [lang, setLang] = useState<string>("fa");
  const [screenSize, setScreenSize] = useState(getCurrentDimension());
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const { theme } = useContext(ThemeContext);
  const { language, setLanguage } = useContext(LanguageContext);

  useEffect(() => {
    const updateDimension = () => {
      setScreenSize(getCurrentDimension());
    };
    window.addEventListener("resize", updateDimension);

    return () => {
      window.removeEventListener("resize", updateDimension);
    };
  }, [screenSize]);

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

        {screenSize.width < 992 && (
          <RiMenu3Fill
            size={30}
            cursor={"pointer"}
            color={theme.darkMode ? "#0068D2" : "#000"}
            onClick={handleOpenModal}
          />
        )}
      </figure>

      {screenSize.width < 992 && (
        <MenuModal showModal={showModal} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default Header;

function getCurrentDimension() {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}
