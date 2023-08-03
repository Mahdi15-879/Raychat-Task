import { useState, useContext, FormEvent, useRef, useMemo } from "react";
import Switch from "react-switch";
import { v4 as uuidv4 } from "uuid";
import JoditEditor from "jodit-react";

// CONTEXT
import { ThemeContext } from "../contexts/Context";

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
  const [checked, setChecked] = useState(false);
  const [questionTitle, setQuestionTitle] = useState<string>("");
  const [questionDesc, setQuestionDesc] = useState<string>("");
  const [questions, setQuestions] = useState<Iquestion[]>([]);

  const [isCardClicked, setIsCardClicked] = useState<boolean>(true);
  const [isClickedID, setIsClickedID] = useState<string>("");
  const [placeholder, setPlaceholder] = useState("");

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
      }
    });
  };

  const saveQuestionHandler = (id: string) => {
    questions.map((question) => {
      if (question.id === id) {
        question.questionDesc = content;
        setContent("");
      }
    });
    setIsCardClicked(!isCardClicked);
    console.log(isCardClicked);
  };

  return (
    <div className={`Home ${theme.darkMode && "Home-dark"}`}>
      <section className="Home-form">
        <h3>افزودن</h3>

        <p>
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده
          از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و
          سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز و کاربردهای
          متنوع با هدف بهبود ابزارهای کاربردی می باشد کتابهای زیادی در شصت و سه
          درصد گذشته حال و آینده شناخت فراوان جامعه و متخصصان را می طلبد تا با
          نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
          خلاقی
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
            وضعیت
            <input
              type="text"
              placeholder="عنوان سوال"
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
          ></textarea>

          <button type="submit">
            افزودن
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
                <>
                  <div>
                    <h2>{question.questionTitle}</h2>

                    <span>
                      <IoIosArrowDown size={18} />
                      <RiDeleteBin7Line size={18} />
                    </span>
                  </div>

                  <div>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      onBlur={(newContent) => setContent(newContent)}
                    />
                  </div>

                  <button onClick={() => saveQuestionHandler(question.id)}>
                    ذخیره
                  </button>
                </>
              ) : (
                <>
                  <div>
                    <PiDotsSixVerticalBold size={18} />
                    <h4>{question.questionTitle}</h4>
                  </div>

                  <div>
                    <IoIosArrowDown size={18} />
                    <RiDeleteBin7Line size={18} />
                  </div>
                </>
              )}
            </QuestionCard>
          ))}
      </section>
    </div>
  );
};

export default Home;
