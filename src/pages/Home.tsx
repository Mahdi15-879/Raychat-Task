import { useState, useContext, FormEvent, useRef, useMemo } from "react";
import Switch from "react-switch";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";

// CONTEXT
import { ThemeContext } from "../contexts/ThemeContext";
import { LanguageContext } from "../contexts/LanguageContext";

import QuestionCard from "../components/QuestionCard";

// STYLES
import "../styles/home.css";

// ICONS
import { IoIosAdd, IoIosArrowDown } from "react-icons/io";
import { PiDotsSixVerticalBold } from "react-icons/pi";
import { RiDeleteBin7Line } from "react-icons/ri";

// INTERFACES
interface Iquestion {
  id: string;
  questionTitle: string;
  questionDesc: string;
}

const Home = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);

  const [checked, setChecked] = useState(false);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionDesc, setQuestionDesc] = useState<string>("");
  const [questions, setQuestions] = useState<Iquestion[]>([]);

  const [isCardClicked, setIsCardClicked] = useState<boolean>(true);
  const [isClickedID, setIsClickedID] = useState<string>("");
  const [placeholder, setPlaceholder] = useState("");
  const [titleEdit, setTitleEdit] = useState("");

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: "Start typings...",
    }),
    [placeholder]
  );

  const handleChange = () => {
    setChecked(!checked);
  };

  const submitHandler = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (questionTitle != "" && questionDesc != "") {
      setQuestions([
        ...questions,
        {
          id: uuidv4(),
          questionTitle,
          questionDesc,
        },
      ]);

      setQuestionTitle("");
      setQuestionDesc("");
    }
  };

  const clickHandler = (id: string) => {
    setIsClickedID(id);
    setIsCardClicked(true);

    questions.map((question) => {
      if (question.id === id) {
        setContent(question.questionDesc);
        setTitleEdit(question.questionTitle);
      }
    });
  };

  const saveQuestionHandler = (id: string) => {
    questions.map((question) => {
      if (question.id === id) {
        question.questionDesc = content;
        question.questionTitle = titleEdit;
        setContent("");
      }
    });
    setIsCardClicked(!isCardClicked);
    console.log(isCardClicked);
  };

  const handleDeleteQuestion = (id: string): void => {
    const filteredQuestions: Iquestion[] = questions.filter(
      (question) => question.id != id
    );
    setQuestions(filteredQuestions);
  };

  return (
    <div className={`Home ${theme.darkMode && "Home-dark"}`}>
      <section className="Home-form">
        <h3>{language.isFa ? "افزودن" : "Add"}</h3>

        <p>
          {language.isFa
            ? `
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی
          `
            : `Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto officia ab ut neque, dolore, veniam illo, repellat eius quae voluptas deserunt. Minus, iure neque quasi repellat unde, expedita distinctio aliquam laboriosam odio consequatur deserunt labore sit maxime beatae sapiente voluptates a fuga cum ea nobis nisi iste tenetur. Odit, tempore!`}
        </p>

        <form onSubmit={submitHandler}>
          <span>
            <Switch
              checked={checked}
              onChange={handleChange}
              onColor="#841474"
              onHandleColor="#fff"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              boxShadow="0px 1px 5px rgba(0, 0, 0, 0.6)"
              activeBoxShadow="0px 0px 1px 10px rgba(0, 0, 0, 0.2)"
              height={20}
              width={50}
              className="react-switch"
              id="material-switch"
            />
            {language.isFa ? "وضعیت" : "Status"}
            <input
              type="text"
              placeholder={language.isFa ? "عنوان سوال" : "Question Title"}
              value={questionTitle}
              onChange={(e) => setQuestionTitle(e.target.value)}
            />
          </span>

          <textarea
            id="question-holder"
            cols={110}
            rows={12}
            value={questionDesc}
            onChange={(e) => setQuestionDesc(e.target.value)}
            placeholder={language.isFa ? "توضیحات" : "Description"}
          ></textarea>

          <button type="submit">
            {language.isFa ? "افزودن" : "Add"}
            <IoIosAdd size={18} color="#fff" />
          </button>
        </form>
      </section>

      <section className="question-card_container">
        {questions.length > 0 &&
          questions.map((question) => (
            <QuestionCard
              key={question.id}
              onClick={() => clickHandler(question.id)}
            >
              {question.id === isClickedID && isCardClicked ? (
                <div className="QuestionCard-edit">
                  <div className="QuestionCard-edit_title">
                    <span>
                      <IoIosArrowDown
                        size={18}
                        color={theme.darkMode ? "#0068D2" : "#7e7e7e"}
                      />
                      <RiDeleteBin7Line
                        size={18}
                        color={theme.darkMode ? "#0068D2" : "#7e7e7e"}
                        onClick={() => handleDeleteQuestion(question.id)}
                        cursor={"pointer"}
                      />
                    </span>

                    <input
                      type="text"
                      value={titleEdit}
                      onChange={(e) => setTitleEdit(e.target.value)}
                    />
                  </div>

                  <div className="QuestionCard-edit_body">
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <button
                    onClick={() => saveQuestionHandler(question.id)}
                    className="QuestionCard-edit_btn"
                  >
                    {language.isFa ? "ذخیره" : "Save"}
                  </button>
                </div>
              ) : (
                <div className="QuestionCard-normal">
                  <div>
                    <IoIosArrowDown
                      size={18}
                      color={theme.darkMode ? "#0068D2" : "#7e7e7e"}
                    />
                    <RiDeleteBin7Line
                      size={18}
                      color={theme.darkMode ? "#0068D2" : "#7e7e7e"}
                      onClick={() => handleDeleteQuestion(question.id)}
                      cursor={"pointer"}
                    />
                  </div>

                  <div>
                    <h4>{question.questionTitle}</h4>
                    <PiDotsSixVerticalBold
                      size={22}
                      color={theme.darkMode ? "#0068D2" : "#7e7e7e"}
                    />
                  </div>
                </div>
              )}
            </QuestionCard>
          ))}
      </section>
    </div>
  );
};

export default Home;
