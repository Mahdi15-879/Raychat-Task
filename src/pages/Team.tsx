import { useContext, useState, FC, FormEvent, ChangeEvent } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

// COMPONENTS
import AddTeam from "../components/AddTeam";

// STYLES
import "../styles/team.css";

// ICONS
import { MdPersonAddAlt1 } from "react-icons/md";

const user: string = require("../images/user.png");

// INTERFACES
export interface ITeamsInfo {
  id: number;
  teamName: string;
  pictureSrc: string;
  operators: string[];
}

const Team: FC = () => {
  const { theme } = useContext(ThemeContext);

  const [modalOpen, setModalOpen] = useState(false);
  const [baseCode, setBaseCode] = useState<string[]>([user]);
  const [operators, setOperators] = useState<string[]>([]);
  const [teamName, setTeamName] = useState<string>("");
  const [operatorName, setOperatorName] = useState<string>("");
  const [teams, setTeams] = useState<ITeamsInfo[]>([]);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const fileChangeHandler = (event: ChangeEvent<HTMLInputElement>): void => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      getBase(file);
    }
  };

  const getBase = (file: File): void => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      if (reader.result) {
        setBaseCode([reader.result.toString()]);
      }
    };
  };

  const handleAddOperator = () => {
    if (operatorName != "") {
      setOperators([...operators, operatorName]);
      setOperatorName("");
    }
  };

  const handleResetState = (): void => {
    setBaseCode([user]);
    setOperators([]);
    setTeamName("");
  };

  const clickAddHandler = () => {
    if (!teamName) {
      return alert("نام تیم الزامی می‌باشد!");
    }

    if (operators.length == 0) {
      return alert("افزودن حداقل یک عضو به تیم الزامی می‌باشد!");
    }

    setTeams([
      ...teams,
      {
        id: Math.floor(Math.random() * 1000000),
        teamName,
        operators,
        pictureSrc: baseCode[0],
      },
    ]);

    handleResetState();
    setModalOpen(false);
  };

  console.log(teams);

  return (
    <div className={`Team ${theme.darkMode && "Team-dark"}`}>
      <section className="Team-header">
        <button onClick={handleOpenModal}>ایجاد تیم جدید</button>

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

      <AddTeam isOpen={modalOpen} onClose={handleCloseModal}>
        <h3>ایجاد تیم</h3>

        <section className="title-profile">
          <input
            type="text"
            placeholder="نام تیم را وارد کنید"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
          <div className="image-container">
            <label htmlFor="fileInput">
              <figure>
                <img src={baseCode[0]} alt="User Profile" />
              </figure>
              <input
                id="fileInput"
                type="file"
                accept=".png, .jpg, .jpeg"
                onChange={fileChangeHandler}
              />
            </label>
          </div>
        </section>

        <section className="add-operators">
          <MdPersonAddAlt1 size={20} onClick={handleAddOperator} />
          <input
            type="text"
            placeholder="اپراتورهای خود را به این تیم اضافه کنید"
            value={operatorName}
            onChange={(e) => setOperatorName(e.target.value)}
          />
        </section>

        <section className="operators-list">
          <h4>اپراتورها</h4>
          <div>
            {operators.length > 0 ? (
              operators.map((operator) => <h5>{operator}</h5>)
            ) : (
              <h5>اپراتوری افزوده نشده است</h5>
            )}
          </div>
        </section>

        <section className="Btn-container">
          <button onClick={clickAddHandler}>تایید</button>

          <button onClick={() => setModalOpen(false)}>انصراف</button>
        </section>
      </AddTeam>
    </div>
  );
};

export default Team;
