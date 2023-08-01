import { useState, useContext, FC } from "react";
import { Link } from "react-router-dom";

// STYLES
import "../styles/sidebar.css";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

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
              <Link to="/">داشبورد</Link>
              <RiHome6Fill size={18} color="#841474" />
            </li>
            <li>
              <Link to="/operators">اپراتورها</Link>
              <MdPeopleAlt
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/install">نصب و راه اندازی</Link>
              <PiArrowSquareDownFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/chat">پنل گفتگوی آنلاین</Link>
              <RiChatSmile3Fill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/black-list">لیست سیاه</Link>
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
                  تمدید یا ارتقا پکیچ
                </Link>
                <BiSolidShoppingBagAlt
                  size={18}
                  color={theme.darkMode ? "#0068D2" : "#000"}
                />
              </span>
              {isSubMenuOpen ? (
                <ul className="submenu">
                  <li>
                    <a href="#">خرید شارژ مکالمه</a>
                  </li>
                  <li>
                    <a href="#">لیست صورت حساب‌ها</a>
                  </li>
                </ul>
              ) : null}
            </li>
            <li>
              <Link to="/chart">آمار و ارقام</Link>
              <MdInsertChart
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/whatsapp">اتصال واتساپ</Link>
              <RiWhatsappFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/team">تنظیمات تیم</Link>
              <BsPersonVcardFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/group-chat">پیام گروهی</Link>
              <BsFillSendFill
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li>
              <Link to="/web-hook">وب هوک</Link>
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
              <Link to="/setting">تنظیمات رایچت</Link>
              <MdSettings
                size={18}
                color={theme.darkMode ? "#0068D2" : "#000"}
              />
            </li>
            <li className="theme-toggle">
              {!theme.darkMode ? (
                <button onClick={ToggleTheme}>
                  تاریک
                  <FiMoon
                    size={18}
                    color={theme.darkMode ? "#0068D2" : "#000"}
                  />
                </button>
              ) : (
                <button onClick={ToggleTheme}>
                  روشن
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
