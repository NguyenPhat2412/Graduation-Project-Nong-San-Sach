import { Button } from "react-bootstrap";
import "./user.setting.password.css";
const UserSettingPassword = () => {
  return (
    <div className="user-setting-password">
      <div className="user-setting-password-header">
        <h4>Password Settings</h4>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            required
          />
        </div>
      </form>
      <Button variant="primary" type="submit">
        Update Password
      </Button>
    </div>
  );
};

export default UserSettingPassword;
