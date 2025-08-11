import { Button } from "react-bootstrap";
import "./user.setting.password.css";
import { useState } from "react";
import { useUser } from "../../../UseContext/UserContext";
import { notification } from "antd";
const UserSettingPassword = () => {
  const { userInfo } = useUser();
  const userId = userInfo ? userInfo?._id : null;
  const [currentPassword, setCurrentPassword] = useState();
  const [newPassword, setNewPassword] = useState();

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      message: "Notification",
      description: message,
    });
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (!userId) {
      openNotification("error", "Bạn cần đăng nhập để thực hiện hành động này");
      return;
    }
    if (currentPassword === "" || newPassword === "") {
      openNotification("error", "Vui lòng điền tất cả các trường.");
      return;
    }

    if (currentPassword === newPassword) {
      openNotification(
        "error",
        "Mật khẩu mới không thể giống mật khẩu hiện tại."
      );
      return;
    }
    const formData = new FormData();
    formData.append("password", newPassword);
    fetch(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/update-user/${userId}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update password");
        }
        return response.json();
      })
      .then((data) => {
        openNotification("success", "Mật khẩu đã được cập nhật thành công!");
        setCurrentPassword("");
        setNewPassword("");
      })
      .catch((error) => {
        console.error("Error updating password:", error);
        openNotification("error", "Vui lòng thử lại nhé!");
      });
  };

  return (
    <>
      {contextHolder}
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
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
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
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
        </form>
        <Button variant="primary" type="submit" onClick={handlePasswordChange}>
          Update Password
        </Button>
      </div>
    </>
  );
};

export default UserSettingPassword;
