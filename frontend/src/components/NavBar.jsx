import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Navigation bar component
const NavBar = () => {
  const { user } = useAuth();

  return (
    <nav className="top-bar">
      <Link to="/dashboard" className="brand">🏦 VIT Bank</Link>
      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/account">Account</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/profile">Profile ({user?.name?.split(" ")[0]})</Link>
      </div>
    </nav>
  );
};

export default NavBar;
