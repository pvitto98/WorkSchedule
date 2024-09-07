import { FunctionComponent, useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Breadcrumb from "../components/Breadcrumb";
import styles from "./Layout.module.css";
import { UserContext } from "../UserContext";

const Layout: FunctionComponent = () => {
  const { user } = useContext(UserContext); // Assuming UserContext provides an object with a 'user' property
  const navigate = useNavigate();

  useEffect(() => {
    if (user.userId === "") {
      // Redirect to /login if not logged in
      navigate("/login");
    }
  }, [user, navigate]); // Depend on user and navigate to avoid re-running on every render

  // If user is not logged in, render nothing until redirect happens
  if (user.userId === "") {
    return null; // Or you can return a loading indicator
  }

  return (
    <div className={styles.layout}>
      <Sidebar />
      <main className={styles.content}>
        <div className={styles.breadcrumb}>
          <Breadcrumb />
        </div>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
