import { notification } from "antd";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function UpdateUser(props) {
  const { userId, username, email } = props.profile;
  const [name, setName] = useState(username);
  const [emailUser, setEmail] = useState(email);
  const formData = new FormData();
  const [avatarFile, setAvatarFile] = useState(null);
  if (!userId) {
    return <div>Loading...</div>;
  }

  const [api, holderContext] = notification.useNotification();

  const openNotification = (type, message) => {
    api[type]({
      description: message,
      placement: "topRight",
      message: "Thông báo",
    });
  };

  // PUT the data
  const UpdateUser = async (e) => {
    e.preventDefault();
    formData.append("username", name);
    formData.append("email", emailUser);
    console.log("data được gửi đi", formData);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }
    const response = await fetch(
      `${import.meta.env.VITE_DATABASE_URL}/api/client/update-user/${userId}`,
      {
        method: "PUT",
        body: formData,
        credentials: "include",
      }
    );
    const data = await response.json();

    if (!response.ok) {
      openNotification("error", "Failed to update user information.");
      return;
    }

    openNotification("success", data.message);
    props.onHide();
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {holderContext}
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update User Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={UpdateUser}>
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
          <div className="mb-3">
            <label htmlFor="avatar" className="form-label">
              Avatar URL
            </label>
            <input
              type="file"
              className="form-control"
              id="avatar"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          </div>
          <Button variant="primary" onClick={UpdateUser}>
            Update
          </Button>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default UpdateUser;
