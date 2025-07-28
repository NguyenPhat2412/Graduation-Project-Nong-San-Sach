import { Container } from "react-bootstrap";
import NavBar from "../../NavBar/app.navbar";
import AppUserBoard from "../app.user.board";
import AppFooter from "../../Footer/app.footer";
import UserSettingAccount from "./user.setting.account";
import { useUser } from "../../../UseContext/UserContext";
import UserSettingPassword from "./user.setting.password";

const UserSetting = () => {
  const { userInfo } = useUser();
  console.log("User Info:", userInfo);
  return (
    <>
      <Container>
        <NavBar />
      </Container>
      <div>
        <img
          src="../../../public/Image/Login/Breadcrumbs (1).png"
          alt="Logo"
        ></img>
      </div>
      <Container className="user-history-container">
        <AppUserBoard />
        <div>
          <UserSettingAccount />
          <UserSettingPassword />
        </div>
      </Container>
      <AppFooter />
    </>
  );
};

export default UserSetting;
