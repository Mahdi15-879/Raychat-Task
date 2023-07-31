import { useState } from "react";

// STYLES
import "../styles/sidebar.css";

// ICONS
import {
  logo,
  home,
  users,
  down,
  happy,
  remove,
  shopping,
  arrow_up,
  chart,
  whatsapp,
  user_info,
  message,
  arrow_down,
  fish_hook,
  setting,
} from "../icons/IconsPath";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div className="sidebar">
      <figure className="logo">
        <img src={logo} alt="Logo" />
      </figure>

      <div className="sidebar-body">
        <div className="sidebar-body_active">
          <figure>
            <img src={home} alt="Home" />
          </figure>
          <a href="#">داشبورد</a>
        </div>

        <div>
          <figure>
            <img src={users} alt="Users" />
          </figure>
          <a href="#">اپراتورها</a>
        </div>

        <div>
          <figure>
            <img src={down} alt="Down" />
          </figure>
          <a href="#">نصب و راه اندازی</a>
        </div>

        <div>
          <figure>
            <img src={happy} alt="Happy" />
          </figure>
          <a href="#">پنل گفتگوی آنلاین</a>
        </div>

        <div>
          <figure>
            <img src={remove} alt="Remove" />
          </figure>
          <a href="#">لیست سیاه</a>
        </div>

        <div
          className="sidebar-body_submenu"
          onClick={() => setIsOpen(!isOpen)}
        >
          <figure>
            <img src={shopping} alt="Shopping" />
          </figure>
          <div>
            تمدید یا ارتقا پکیج
            {isOpen ? (
              <div>
                <a href="#">خرید شارژ مکالمه</a>
                <a href="#">لیست صورتحساب‌ها</a>
              </div>
            ) : null}
          </div>
          <figure>
            <img src={isOpen ? arrow_up : arrow_down} alt="Arrow Up" />
          </figure>
        </div>

        <div>
          <figure>
            <img src={chart} alt="Chart" />
          </figure>
          <a href="#">آمار و ارقام</a>
        </div>

        <div>
          <figure>
            <img src={whatsapp} alt="Whatsapp" />
          </figure>
          <a href="#">اتصال واتساپ</a>
        </div>

        <div>
          <figure>
            <img src={user_info} alt="User Info" />
          </figure>
          <a href="#">تنظیمات تیم</a>
        </div>

        <div>
          <figure>
            <img src={message} alt="Message" />
          </figure>
          <a href="#">پیام گروهی</a>
        </div>

        <div>
          <figure>
            <img src={fish_hook} alt="Fish Hook" />
          </figure>
          <a href="#">وب هوک</a>
          <figure>
            <img src={arrow_down} alt="Arrow Down" />
          </figure>
        </div>
      </div>

      <div className="setting">
        <figure>
          <img src={setting} alt="Setting" />
        </figure>
        <a href="#">تنظیمات رایچت</a>
      </div>
    </div>
  );
};

export default Sidebar;
