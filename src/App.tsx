import { useEffect } from "react";
import { Routes, Route, useNavigationType, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import DashboardScreen from "./pages/DashboardScreen";
import Login from "./pages/Login";
import InsertData from "./pages/InsertData";
import Registrazione from "./pages/Registrazione";
import MonthlyDataScreen from "./components/MonthlyDataScreen";

function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "Dashboard";
        metaDescription = "Dashboard description";
        break;
      case "/login":
        title = "Login";
        metaDescription = "Login description";
        break;
      case "/insertdata":
        title = "Insert Data";
        metaDescription = "Insert data description";
        break;
        case "/monthlydatascreen":
          title = "Monthly Data Screen";
          metaDescription = "Monthly Data Screen";
          break;
      case "/registrazione":
        title = "Registrazione";
        metaDescription = "Registrazione description";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag: HTMLMetaElement | null = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<DashboardScreen />} />
        <Route path="insertdata" element={<InsertData />} />
        <Route path="monthlydatascreen" element={<MonthlyDataScreen />} />
      </Route>
      <Route path="/registrazione" element={<Registrazione />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
