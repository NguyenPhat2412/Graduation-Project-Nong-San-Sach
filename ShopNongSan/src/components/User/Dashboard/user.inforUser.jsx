import { Container } from "react-bootstrap";
import { useUser } from "../../../UseContext/UserContext";
import "./user.inforUser.css";
import { useState } from "react";
import UpdateUser from "./Update/user.updateUser";
const InformationUser = () => {
  const { userInfo } = useUser();
  const [show, setShow] = useState(false);

  if (!userInfo) {
    return <div>Loading...</div>;
  }
  const userId = userInfo._id;

  const { username, email, avatar } = userInfo;

  // const handleUpdate = async () => {
  //   if (!avatarFile) {
  //     alert("Please select an avatar file to upload.");
  //     return;
  //   }

  //   const formData = new FormData();
  //   formData.append("avatar", avatarFile);

  //   try {
  //     const response = await fetch(`${import.meta.env.VITE_DATABASE_URL}/api/client/user/avatar`, {
  //       method: "POST",
  //       body: formData,
  //       credentials: "include",
  //     });

  //     if (!response.ok) {
  //       throw new Error("Failed to update avatar");
  //     }

  //     const data = await response.json();
  //     console.log("Avatar updated successfully:", data);
  //     alert("Avatar updated successfully!");
  //   } catch (error) {
  //     console.error("Error updating avatar:", error);
  //     alert("Failed to update avatar. Please try again.");
  //   }
  // }

  return (
    <div className="information-user">
      <img
        src={`${import.meta.env.VITE_DATABASE_URL}${avatar}`}
        alt="Profile"
        style={{ width: "150px", height: "150px" }}
      />

      <p>
        <strong> {username}</strong>
      </p>
      <p>{email}</p>
      <button onClick={() => setShow(true)}>Update Information</button>
      <UpdateUser
        show={show}
        onHide={() => setShow(false)}
        profile={{ userId, username, email, avatar }}
      />
    </div>
  );
};
export default InformationUser;
