import { useState, useContext, FC } from "react";
import { Link } from "react-router-dom";

// STYLES
import "../styles/sidebar.css";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

// ICONS
import {
  RiHome6Fill,
  RiChatSmile3Fill,
  RiWhatsappFill,
  RiProhibitedLine,
} from "react-icons/ri";
import { MdPeopleAlt, MdInsertChart, MdSettings } from "react-icons/md";
import { PiArrowSquareDownFill } from "react-icons/pi";
import { BsPersonVcardFill, BsFillSendFill } from "react-icons/bs";
import { TbFishHook } from "react-icons/tb";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { BiSolidShoppingBagAlt } from "react-icons/bi";
import { FiSun, FiMoon } from "react-icons/fi";

const Sidebar: FC = () => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState<boolean>(false);

  const { theme, setTheme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const ToggleTheme = () => {
    if (theme.darkMode) {
      setTheme({
        darkMode: false,
      });
    } else {
      setTheme({
        darkMode: true,
      });
    }
  };

  return (
    <div className={`sidebar ${theme.darkMode && "sidebar-dark"}`}>
      <div className="sidebar-container">
        <div
          className={`sidebar-body ${theme.darkMode && "sidebar-body_dark"}`}
        >
          <ul>
            <li className="active">
              <Link to="/">{language.isFa ? "داشبورد" : "Dashboard"}</Link>
              <RiHome6Fill size={18} color="#841474" />
            </li>
            <li>
              <Link to="/operators">
                {language.isFa ? "اپراتورها" : "Operators"}
              </Link>
              <MdPeopleAlt
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/install">
                {language.isFa ? "نصب و راه اندازی" : "Installation"}
              </Link>
              <PiArrowSquareDownFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/chat">
                {language.isFa
                  ? "پنل گفتگوی آنلاین"
                  : "Online Discussion Panel"}
              </Link>
              <RiChatSmile3Fill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/black-list">
                {language.isFa ? "لیست سیاه" : "Black List"}
              </Link>
              <RiProhibitedLine
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li className="menu-with-submenu">
              <span>
                {isSubMenuOpen ? (
                  <IoIosArrowUp
                    size={18}
                    color={theme.darkMode ? "#0068D2" : "#000"}
                  />
                ) : (
                  <IoIosArrowDown
                    size={18}
                    color={theme.darkMode ? "#0068D2" : "#000"}
                  />
                )}
                <Link
                  to="/develope"
                  onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
                >
                  {language.isFa
                    ? "تمدید یا ارتقا پکیچ"
                    : "Upgrading the Package"}
                </Link>
                <BiSolidShoppingBagAlt
                  size={18}
                  color={theme.darkMode ? "#0068D2" : "#000"}
                />
              </span>
              {isSubMenuOpen ? (
                <ul className="submenu">
                  <li>
                    <a href="#">
                      {language.isFa ? "خرید شارژ مکالمه" : "Buy Call Charges"}
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      {language.isFa ? "لیست صورت حساب‌ها" : "List of Bills"}
                    </a>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              <Link to="/chart">
                {language.isFa ? "آمار و ارقام" : "Facts and Figures"}
              </Link>
              <MdInsertChart
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/whatsapp">
                {language.isFa ? "اتصال واتساپ" : "WhatsApp Connection"}
              </Link>
              <RiWhatsappFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/team">
                {language.isFa ? "تنظیمات تیم" : "Team Settings"}
              </Link>
              <BsPersonVcardFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/group-chat">
                {language.isFa ? "پیام گروهی" : "Group Message"}
              </Link>
              <BsFillSendFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/web-hook">{language.isFa ? "وب هوک" : "Webhook"}</Link>
              <TbFishHook
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
          </ul>
        </div>

        <div
          className={`sidebar-footer ${
            theme.darkMode && "sidebar-footer_dark"
          }`}
        >
          <ul>
            <li>
              <Link to="/setting">
                {language.isFa ? "تنظیمات رایچت" : "Raychat Settings"}
              </Link>
              <MdSettings
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li className="theme-toggle">
              {!theme.darkMode ? (
                <button onClick={ToggleTheme}>
                  {language.isFa ? "تاریک" : "Dark"}
                  <FiMoon
                    size={18}
                    color={theme.darkMode ? "#0068D2" : "#000"}
                  />
                </button>
              ) : (
                <button onClick={ToggleTheme}>
                  {language.isFa ? "روشن" : "Light"}
                  <FiSun
                    size={18}
                    color={theme.darkMode ? "#0068D2" : "#000"}
                  />
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
