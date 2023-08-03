import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// CONTEXT
import { ThemeContext } from "./contexts/ThemeContext";

// COMPONENTS
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";

// PAGES
import Home from "./pages/Home";
import BlackList from "./pages/BlackList";
import Chart from "./pages/Chart";
import Chat from "./pages/Chat";
import Develope from "./pages/Develope";
import GroupChat from "./pages/GroupChat";
import Install from "./pages/Install";
import Operators from "./pages/Operators";
import Setting from "./pages/Setting";
import Team from "./pages/Team";
import WebHook from "./pages/WebHook";
import WhatsApp from "./pages/WhatsApp";

// STYLES
import "./styles/app.css";

const App: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={`App ${theme.darkMode ? "App-dark" : "App-light"}`}>
      <Header />
      <main>
        <Sidebar />
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/black-list" element={<BlackList />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/develope" element={<Develope />} />
            <Route path="/group-chat" element={<GroupChat />} />
            <Route path="/install" element={<Install />} />
            <Route path="/operators" element={<Operators />} />
            <Route path="/setting" element={<Setting />} />
            <Route path="/team" element={<Team />} />
            <Route path="/web-hook" element={<WebHook />} />
            <Route path="/whatsapp" element={<WhatsApp />} />

            <Route path="*" element={<> not found</>} />
          </Routes>
        </div>
      </main>
    </div>
  );
};

export default App;
