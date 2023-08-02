import { useContext, useState, FC, FormEvent, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

// COMPONENTS
import AddTeam from "../components/AddTeam";
import TeamCard from "../components/TeamCard";
import EditTeam from "../components/EditTeam";

// STYLES
import "../styles/team.css";

// ICONS
import { MdPersonAddAlt1, MdPersonRemoveAlt1 } from "react-icons/md";

const user: string = require("../images/user.png");

// INTERFACES
interface ITeamsInfo {
  id: string;
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
  const [teams, setTeams] = useState<ITeamsInfo[]>([
    {
      id: uuidv4(),
      teamName: "رایچت",
      pictureSrc: user,
      operators: ["علی", "محمد"],
    },
  ]);

  // Edit Info
  const [editID, setEditID] = useState<string>();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editTeamIndex, setEditTeamIndex] = useState<number>(0);
  const [editTeamName, setEditTeamName] = useState<string>(
    teams[editTeamIndex]?.teamName
  );
  const [editBaseCode, setEditBaseCode] = useState<string[]>([
    teams[editTeamIndex]?.pictureSrc,
  ]);
  const [editOperatorName, setEditOperatorName] = useState<string>("");
  const [editOperators, setEditOperators] = useState<string[]>(
    teams[editTeamIndex]?.operators
  );

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenEditModal = () => {
    setEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setEditModalOpen(false);
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
        setEditBaseCode([reader.result.toString()]);
      }
    };
  };

  const handleAddOperator = (isEdit: boolean) => {
    if (isEdit) {
      if (editOperatorName != "") {
        setEditOperators([...editOperators, editOperatorName]);
        setEditOperatorName("");
      }
    } else {
      if (operatorName != "") {
        setOperators([...operators, operatorName]);
        setOperatorName("");
      }
    }
  };

  const handleRemoveOperator = () => {
    const filteredList = editOperators.filter(
      (operator) => operator != editOperatorName
    );
    setEditOperators(filteredList);
    setEditOperatorName("");
  };

  const handleResetState = (): void => {
    setEditBaseCode([user]);
    setEditOperators([]);
    setEditTeamName("");

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
        id: uuidv4(),
        teamName,
        operators,
        pictureSrc: baseCode[0],
      },
    ]);

    handleResetState();
    setModalOpen(false);
  };

  const clickEditHandler = () => {
    if (!editTeamName) {
      return alert("نام تیم الزامی می‌باشد!");
    }

    if (editOperators.length == 0) {
      return alert("افزودن حداقل یک عضو به تیم الزامی می‌باشد!");
    }

    teams.map((team) => {
      if (team.id === editID) {
        team.operators = editOperators;
        team.pictureSrc = editBaseCode[0];
        team.teamName = editTeamName;
      }
    });

    handleResetState();
    setEditModalOpen(false);
  };

  const handleDeleteCard = (id: string): void => {
    if (teams.length > 1) {
      const filteredTeams: ITeamsInfo[] = teams.filter((team) => team.id != id);
      setTeams(filteredTeams);
    } else {
      return alert(
        "در حال حاظر یک تیم وجود دارد ، به همین دلیل امکان پاک کردن وجود ندارد!"
      );
    }
  };

  const handleEditCard = (id: string): void => {
    const index: number = teams.findIndex((team) => team.id === id);
    setEditTeamIndex(index);

    setEditID(id);
    teams.map((team) => {
      if (team.id === id) {
        setEditBaseCode([team.pictureSrc]);
        setEditOperators(team.operators);
        setEditTeamName(team.teamName);
      }
    });

    handleOpenEditModal();
  };

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
        <div className="modal-title">
          <h3>ایجاد تیم</h3>
        </div>

        <section
          className={`title-profile ${theme.darkMode && "title-profile_dark"}`}
        >
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

        <section
          className={`add-operators ${theme.darkMode && "add-operators_dark"}`}
        >
          <MdPersonAddAlt1
            size={20}
            onClick={() => handleAddOperator(false)}
            cursor={"pointer"}
            color={theme.darkMode ? "#0068D2" : "#000"}
          />
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

      <EditTeam isOpen={editModalOpen} onClose={handleCloseEditModal}>
        <div className="modal-title">
          <h3>ویرایش تیم</h3>
        </div>

        <section
          className={`title-profile ${theme.darkMode && "title-profile_dark"}`}
        >
          <input
            type="text"
            placeholder="نام تیم را وارد کنید"
            value={editTeamName}
            onChange={(e) => setEditTeamName(e.target.value)}
          />
          <div className="image-container">
            <label htmlFor="fileInput">
              <figure>
                <img src={editBaseCode[0]} alt="User Profile" />
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

        <section
          className={`add-operators ${theme.darkMode && "add-operators_dark"}`}
        >
          <span>
            <MdPersonAddAlt1
              size={20}
              onClick={() => handleAddOperator(true)}
              cursor={"pointer"}
              color={theme.darkMode ? "#0068D2" : "#000"}
            />

            <MdPersonRemoveAlt1
              size={20}
              onClick={handleRemoveOperator}
              cursor={"pointer"}
              color="red"
            />
          </span>
          <input
            type="text"
            placeholder="اپراتورهای خود را به این تیم اضافه کنید"
            value={editOperatorName}
            onChange={(e) => setEditOperatorName(e.target.value)}
          />
        </section>

        <section className="operators-list">
          <h4>اپراتورها</h4>
          <div>
            {editOperators.length > 0 ? (
              editOperators.map((operator) => <h5>{operator}</h5>)
            ) : (
              <h5>اپراتوری افزوده نشده است</h5>
            )}
          </div>
        </section>

        <section className="Btn-container">
          <button onClick={clickEditHandler}>تایید</button>

          <button onClick={() => setEditModalOpen(false)}>انصراف</button>
        </section>
      </EditTeam>

      <section
        className={`TeamCard-container ${
          theme.darkMode && "TeamCard-container_dark"
        }`}
      >
        {teams.map((team) => (
          <TeamCard
            key={team.id}
            teamInfo={team}
            onDelete={handleDeleteCard}
            onEdit={handleEditCard}
          />
        ))}
      </section>
    </div>
  );
};

export default Team;
