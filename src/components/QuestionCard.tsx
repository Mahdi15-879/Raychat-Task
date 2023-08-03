import { useContext, ReactNode, FC } from "react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

interface Icard {
  children: ReactNode;
  onClick: () => void;
}

const QuestionCard: FC<Icard> = ({ children, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`QuestionCard ${theme.darkMode && "QuestionCard-dark"}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default QuestionCard;
