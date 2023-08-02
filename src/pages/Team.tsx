import { useContext, useState } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

// STYLES
import "../styles/team.css";

const Team = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className={`Team ${theme.darkMode && "Team-dark"}`}>
      <section className="Team-header">
        <button>ایجاد تیم جدید</button>

        <h2>ایجاد تیم</h2>
      </section>

      <section className="Team-body">
        <label htmlFor="websites">
          برای انجام تنظیمات روی تیم‌ها ابتدا وبسایت مورد نظر خود را انتخاب کنید
        </label>

        <select id="websites">
          <option value="volvo">رایچت</option>
          <option value="saab">دیجی‌کالا</option>
          <option value="opel">ازکی</option>
        </select>
      </section>
    </div>
  );
};

export default Team;
