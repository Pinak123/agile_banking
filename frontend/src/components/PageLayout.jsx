import NavBar from "./NavBar.jsx";

const PageLayout = ({ children }) => (
  <div className="app-shell">
    <NavBar />
    <main className="container">{children}</main>
  </div>
);

export default PageLayout;
