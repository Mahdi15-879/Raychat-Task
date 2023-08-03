import { useContext, useState, FC, ChangeEvent } from "react";
import { v4 as uuidv4 } from "uuid";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

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
  const { language } = useContext(LanguageContext);

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
      return alert(
        language.isFa ? "نام تیم الزامی می‌باشد!" : "Team name is required!"
      );
    }

    if (operators.length == 0) {
      return alert(
        language.isFa
          ? "افزودن حداقل یک عضو به تیم الزامی می‌باشد!"
          : "Adding at least one member to the team is required!"
      );
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
      return alert(
        language.isFa ? "نام تیم الزامی می‌باشد!" : "Team name is required!"
      );
    }

    if (editOperators.length == 0) {
      return alert(
        language.isFa
          ? "افزودن حداقل یک عضو به تیم الزامی می‌باشد!"
          : "Adding at least one member to the team is required!"
      );
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
        language.isFa
          ? "در حال حاظر یک تیم وجود دارد ، به همین دلیل امکان پاک کردن وجود ندارد!"
          : "There is currently a team, so it is not possible to delete!"
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
        <button onClick={handleOpenModal}>
          {language.isFa ? "ایجاد تیم جدید" : "Create a New Team"}
        </button>

        <h2>{language.isFa ? "ایجاد تیم" : "Create a Team"}</h2>
      </section>

      <section className="Team-body">
        <label htmlFor="websites">
          {language.isFa
            ? "برای انجام تنظیمات روی تیم‌ها ابتدا وبسایت مورد نظر خود را انتخاب کنید"
            : "To make settings on teams, first select your desired website"}
        </label>

        <select id="websites">
          <option value="volvo">{language.isFa ? "رایچت" : "Raychat"}</option>
          <option value="saab">
            {language.isFa ? "دیجی‌کالا" : "Digikala"}
          </option>
          <option value="opel">{language.isFa ? "ازکی" : "Azki"}</option>
        </select>
      </section>

      <AddTeam isOpen={modalOpen} onClose={handleCloseModal}>
        <div className="modal-title">
          <h3>{language.isFa ? "ایجاد تیم" : "Create a Team"}</h3>
        </div>

        <section
          className={`title-profile ${theme.darkMode && "title-profile_dark"}`}
        >
          <input
            type="text"
            placeholder={
              language.isFa ? "نام تیم را وارد کنید" : "Enter Team Name"
            }
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
            placeholder={
              language.isFa
                ? "اپراتورهای خود را به این تیم اضافه کنید"
                : "Add your operators to this team"
            }
            value={operatorName}
            onChange={(e) => setOperatorName(e.target.value)}
          />
        </section>

        <section className="operators-list">
          <h4>{language.isFa ? "اپراتورها" : "Operators"}</h4>
          <div>
            {operators.length > 0 ? (
              operators.map((operator) => <h5>{operator}</h5>)
            ) : (
              <h5>
                {language.isFa
                  ? "اپراتوری افزوده نشده است"
                  : "The operator has not been added"}
              </h5>
            )}
          </div>
        </section>

        <section className="Btn-container">
          <button onClick={clickAddHandler}>
            {language.isFa ? "تایید" : "Confirmation"}
          </button>

          <button onClick={() => setModalOpen(false)}>
            {language.isFa ? "انصراف" : "Cancel"}
          </button>
        </section>
      </AddTeam>

      <EditTeam isOpen={editModalOpen} onClose={handleCloseEditModal}>
        <div className="modal-title">
          <h3>{language.isFa ? "ویرایش تیم" : "Edit Team"}</h3>
        </div>

        <section
          className={`title-profile ${theme.darkMode && "title-profile_dark"}`}
        >
          <input
            type="text"
            placeholder={
              language.isFa ? "نام تیم را وارد کنید" : "Enter Team Name"
            }
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
            placeholder={
              language.isFa
                ? "اپراتورهای خود را به این تیم اضافه کنید"
                : "Add your operators to this team"
            }
            value={editOperatorName}
            onChange={(e) => setEditOperatorName(e.target.value)}
          />
        </section>

        <section className="operators-list">
          <h4>{language.isFa ? "اپراتورها" : "Operators"}</h4>
          <div>
            {editOperators.length > 0 ? (
              editOperators.map((operator) => <h5>{operator}</h5>)
            ) : (
              <h5>
                {language.isFa
                  ? "اپراتوری افزوده نشده است"
                  : "The operator has not been added"}
              </h5>
            )}
          </div>
        </section>

        <section className="Btn-container">
          <button onClick={clickEditHandler}>
            {language.isFa ? "تایید" : "Confirmation"}
          </button>

          <button onClick={() => setEditModalOpen(false)}>
            {language.isFa ? "انصراف" : "Cancel"}
          </button>
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
