// import { useState, useContext } from "react";

// import { ThemeContext } from "../contexts/Context";

// // STYLES
// import "../styles/sidebar.css";

// // ICONS
// import {
//   logo,
//   home,
//   users,
//   down,
//   happy,
//   remove,
//   shopping,
//   arrow_up,
//   chart,
//   whatsapp,
//   user_info,
//   message,
//   arrow_down,
//   fish_hook,
//   setting,
// } from "../icons/IconsPath";

// const Sidebar: React.FC = () => {
//   const [isOpen, setIsOpen] = useState<boolean>(false);

//   //   const { theme, setTheme } = useContext(ThemeContext);

//   return (
//     <div className="sidebar">
//       <figure className="logo">
//         <img src={logo} alt="Logo" />
//       </figure>

//       <div className="sidebar-body">
//         <div className="sidebar-body_active">
//           <figure>
//             <img src={home} alt="Home" />
//           </figure>
//           <a href="#">داشبورد</a>
//         </div>

//         <div>
//           <figure>
//             <img src={users} alt="Users" />
//           </figure>
//           <a href="#">اپراتورها</a>
//         </div>

//         <div>
//           <figure>
//             <img src={down} alt="Down" />
//           </figure>
//           <a href="#">نصب و راه اندازی</a>
//         </div>

//         <div>
//           <figure>
//             <img src={happy} alt="Happy" />
//           </figure>
//           <a href="#">پنل گفتگوی آنلاین</a>
//         </div>

//         <div>
//           <figure>
//             <img src={remove} alt="Remove" />
//           </figure>
//           <a href="#">لیست سیاه</a>
//         </div>

//         <div
//           className="sidebar-body_submenu"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <figure>
//             <img src={shopping} alt="Shopping" />
//           </figure>
//           <div>
//             تمدید یا ارتقا پکیج
//             {isOpen ? (
//               <div>
//                 <a href="#">خرید شارژ مکالمه</a>
//                 <a href="#">لیست صورتحساب‌ها</a>
//               </div>
//             ) : null}
//           </div>
//           <figure>
//             <img src={isOpen ? arrow_up : arrow_down} alt="Arrow Up" />
//           </figure>
//         </div>

//         <div>
//           <figure>
//             <img src={chart} alt="Chart" />
//           </figure>
//           <a href="#">آمار و ارقام</a>
//         </div>

//         <div>
//           <figure>
//             <img src={whatsapp} alt="Whatsapp" />
//           </figure>
//           <a href="#">اتصال واتساپ</a>
//         </div>

//         <div>
//           <figure>
//             <img src={user_info} alt="User Info" />
//           </figure>
//           <a href="#">تنظیمات تیم</a>
//         </div>

//         <div>
//           <figure>
//             <img src={message} alt="Message" />
//           </figure>
//           <a href="#">پیام گروهی</a>
//         </div>

//         <div>
//           <figure>
//             <img src={fish_hook} alt="Fish Hook" />
//           </figure>
//           <a href="#">وب هوک</a>
//           <figure>
//             <img src={arrow_down} alt="Arrow Down" />
//           </figure>
//         </div>
//       </div>

//       <div className="setting">
//         <figure>
//           <img src={setting} alt="Setting" />
//         </figure>
//         <a href="#">تنظیمات رایچت</a>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

//.....................................................................................
import { useState, useContext, FC, useEffect } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";

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
    <div className={`sidebar ${theme.darkMode ? "dark" : "light"}`}>
      <div
        className={`${
          theme.darkMode ? "sidebar-body_dark" : "sidebar-body_light"
        }`}
      >
        <ul>
          <li>
            <Link to="/">داشبورد</Link>
            <RiHome6Fill size={25} />
          </li>
          <li>
            <Link to="/operators">اپراتورها</Link>
            <MdPeopleAlt size={25} />
          </li>
          <li>
            <Link to="/install">نصب و راه اندازی</Link>
            <PiArrowSquareDownFill size={25} />
          </li>
          <li>
            <Link to="/chat">پنل گفتگوی آنلاین</Link>
            <RiChatSmile3Fill size={25} />
          </li>
          <li>
            <Link to="/black-list">لیست سیاه</Link>
            <RiProhibitedLine size={25} />
          </li>
          <li className="menu-with-submenu">
            <span>
              {isSubMenuOpen ? (
                <IoIosArrowUp size={25} />
              ) : (
                <IoIosArrowDown size={25} />
              )}
              <Link
                to="/develope"
                onClick={() => setIsSubMenuOpen(!isSubMenuOpen)}
              >
                تمدید یا ارتقا پکیچ
              </Link>
              <BiSolidShoppingBagAlt size={25} />
            </span>
            {isSubMenuOpen ? (
              <ul>
                <li>خرید شارژ مکالمه</li>
                <li>لیست صورت حساب‌ها</li>
              </ul>
            ) : null}
          </li>
          <li>
            <Link to="/chart">آمار و ارقام</Link>
            <MdInsertChart size={25} />
          </li>
          <li>
            <Link to="/whatsapp">اتصال واتساپ</Link>
            <RiWhatsappFill size={25} />
          </li>
          <li>
            <Link to="/team">تنظیمات تیم</Link>
            <BsPersonVcardFill size={25} />
          </li>
          <li>
            <Link to="/group-chat">پیام گروهی</Link>
            <BsFillSendFill size={25} />
          </li>
          <li>
            <Link to="/web-hook">وب هوک</Link>
            <TbFishHook size={25} />
          </li>
        </ul>
      </div>

      <div
        className={`${
          theme.darkMode ? "sidebar-footer_dark" : "sidebar-footer_light"
        }`}
      >
        <ul>
          <li>
            <Link to="/setting">تنظیمات رایچت</Link>
            <MdSettings size={25} />
          </li>
          <li>
            <button onClick={ToggleTheme}>toggle</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
