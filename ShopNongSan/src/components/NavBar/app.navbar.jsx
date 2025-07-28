import NavBarBetween from "./app.navbar.between";
import NavBarTop from "./app.navbar.top";
import "./app.navbar.css";
const NavBar = () => {
  return (
    <div>
      <NavBarTop />
      <NavBarBetween />
    </div>
  );
};

export default NavBar;
