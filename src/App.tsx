import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import DashboardScreen from "./pages/DashboardScreen";
import Login from "./pages/Login";
import InsertData from "./pages/InsertData";
import Registrazione from "./pages/Registrazione";

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
        title = "";
        metaDescription = "";
        break;
      case "/login":
        title = "";
        metaDescription = "";
        break;
      case "/insertdata":
        title = "";
        metaDescription = "";
        break;
      case "/registrazione":
        title = "";
        metaDescription = "";
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
      <Route path="/" element={<DashboardScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/insertdata" element={<InsertData />} />
      <Route path="/registrazione" element={<Registrazione />} />
    </Routes>
  );
}
export default App;
