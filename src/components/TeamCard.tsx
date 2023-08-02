import { useState, useContext } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

// COMPONENTS
import EditTeam from "../components/EditTeam";

// STYLES
import "../styles/team_card.css";

// ICONS
import { MdDelete } from "react-icons/md";
import { LuEdit } from "react-icons/lu";

interface TeamInfo {
  id: number;
  teamName: string;
  operators: string[];
  pictureSrc: string;
}

interface CardProps {
  teamInfo: TeamInfo;
  onDelete: (id: number) => void;
}

const Card: React.FC<CardProps> = ({ teamInfo, onDelete }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const { theme } = useContext(ThemeContext);

  return (
    <div className={`TeamCard ${theme.darkMode && "TeamCard_dark"}`}>
      <div className="TeamCard_infos">
        <section>
          <h2>{teamInfo.teamName}</h2>
          <p>{teamInfo.operators.length} اپراتور</p>
        </section>
        <figure>
          <img src={teamInfo.pictureSrc} alt="Team" />
        </figure>
      </div>

      <div className="TeamCard_icons">
        <LuEdit size={18} color="#909090" cursor={"pointer"} />
        <MdDelete
          size={18}
          color="#909090"
          cursor={"pointer"}
          onClick={() => onDelete(teamInfo.id)}
        />
      </div>
    </div>
  );
};

export default Card;
