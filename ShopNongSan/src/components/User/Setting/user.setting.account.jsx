import { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import { useUser } from "../../../UseContext/UserContext";
import "./user.setting.account.css";
function UserSettingAccount(props) {
  const { userInfo } = useUser();
  const { username, email, avatar } = userInfo;
  console.log("User Info:", userInfo);
  const userId = userInfo._id;
  const [name, setName] = useState(username);
  const [emailUser, setEmail] = useState(email);
  const formData = new FormData();
  const [avatarFile, setAvatarFile] = useState(null);
  const inputRef = useRef();
  if (!userId) {
    return <div>Loading...</div>;
  }
  formData.append("username", name);
  formData.append("email", emailUser);
  if (avatarFile) {
    formData.append("avatar", avatarFile);
  }
  // PUT the data
  const UpdateUser = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/update-user/${userId}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      alert("Failed to update user information.");
      return;
    }

    alert("User information updated successfully!");
    props.onHide();
    window.location.reload();
  };

  return (
    <div className="user-setting-account">
      <div className="user-setting-account-header">
        <h4>Account Settings</h4>
      </div>
      <form onSubmit={UpdateUser} className="user-setting-account-form">
        <div>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={emailUser}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <Button variant="primary" onClick={UpdateUser}>
            Update
          </Button>
        </div>
        <div className="user-avatar-section">
          <img
            src={`${import.meta.env.VITE_DATABASE_URL}${avatar}`}
            alt="Profile"
            style={{ width: "150px", height: "150px", borderRadius: "50%" }}
          />
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              id="avatar"
              onChange={(e) => setAvatarFile(e.target.files[0])}
              ref={inputRef}
            />

            <Button variant="primary" onClick={() => inputRef.current.click()}>
              Choose Image
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserSettingAccount;
